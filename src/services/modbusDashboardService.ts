import { createRequire } from "node:module";

import { env } from "../config/env.js";
import {
  formatDateKey,
  fromMonthIndex,
  getLocalDateKey,
  getMonthCountForDateRange,
  getRangeEndDate,
  getRangeStartDate,
  toMonthIndex,
} from "../lib/dateRanges.js";
import { integratePowerSamples } from "../lib/energyMath.js";
import { buildEnergyTotals } from "../lib/energyTotals.js";
import { FoxCloudClient } from "../lib/foxcloudClient.js";
import {
  readScaledSignedRegisters,
  readScaledUnsignedRegisters,
} from "../lib/modbusRegisters.js";
import { calculateSavings } from "../lib/savings.js";
import { getModbusProfile, resolveModbusProfile } from "./modbus/profiles.js";
import type {
  DashboardDailyRow,
  DashboardPayload,
  EnergyRangePayload,
  FoxCloudHistoryDeviceResult,
  FoxCloudHistorySeries,
  SavingsOverviewPayload,
} from "../types/foxcloud.js";
import {
  type LiveSample,
  readDailyEnergyRowsByDateRange,
  readDailyEnergyRowsByMonth,
  readLiveSamplesSince,
  saveDailyEnergyRows,
  saveLiveSample,
} from "./sqliteStore.js";
import { getElectricityTariff } from "./tariffService.js";

const require = createRequire(import.meta.url);
const ModbusRTU = require("modbus-serial") as { new (): ModbusRTUClient };
const foxCloudClient = new FoxCloudClient({
  apiKey: env.foxCloud.apiKey,
  baseUrl: env.foxCloud.baseUrl,
  timeoutMs: env.foxCloud.timeoutMs,
});

const ENERGY_HISTORY_VARIABLES = [
  "pvPower",
  "loadsPower",
  "feedinPower",
  "gridConsumptionPower",
  "batChargePower",
  "batDischargePower",
] as const;
const SOLAR_ACTIVE_POWER_THRESHOLD_KW = 0.05;

interface ModbusRTUClient {
  setTimeout(timeoutMs: number): void;
  connectTCP(host: string, options: { port: number }): Promise<void>;
  setID(unitId: number): void;
  readHoldingRegisters(startAddress: number, count: number): Promise<{ data: number[] }>;
  close(callback: () => void): void;
}

const round = (value: number | null | undefined, decimals = 2): number => {
  const normalized = Number(value ?? 0);
  return Number(normalized.toFixed(decimals));
};

const isValidYearMonth = (year: number, month: number): boolean =>
  Number.isInteger(year) && Number.isInteger(month) && year >= 2020 && month >= 1 && month <= 12;

const validateModbusConfig = (): void => {
  if (!env.modbus.host) {
    throw new Error("MODBUS_HOST is missing. Add your inverter or datalogger LAN IP to .env.");
  }
};

class ModbusReader {
  private readonly client: ModbusRTUClient = new ModbusRTU();
  private readonly registers = new Map<number, number>();

  async connect(): Promise<void> {
    this.client.setTimeout(env.modbus.timeoutMs);
    await this.client.connectTCP(env.modbus.host, { port: env.modbus.port });
    this.client.setID(env.modbus.unitId);
  }

  async close(): Promise<void> {
    await new Promise<void>((resolve) => this.client.close(() => resolve()));
  }

  async readRange(startAddress: number, count: number): Promise<void> {
    const result = await this.client.readHoldingRegisters(startAddress, count);

    result.data.forEach((value: number, index: number) => {
      this.registers.set(startAddress + index, value);
    });
  }

  getInt(addresses: readonly number[], scale = 1): number {
    return readScaledSignedRegisters(this.registers, addresses, scale);
  }

  getUInt(addresses: readonly number[], scale = 1): number {
    return readScaledUnsignedRegisters(this.registers, addresses, scale);
  }
}

interface ModbusSnapshot {
  sampledAt: string;
  live: DashboardPayload["live"];
  today: DashboardPayload["today"];
}

interface ModbusDailyRegisters {
  solarEnergyTodayKwh: number;
  totalYieldTodayKwh: number;
  feedInTodayKwh: number;
  loadEnergyTodayKwh: number;
  gridConsumptionTodayKwh: number;
  batteryChargeTodayKwh: number;
  batteryDischargeTodayKwh: number;
}

const parseHistoryTime = (rawTime: string): number => {
  const match = rawTime.match(
    /(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?/,
  );

  if (!match) {
    const fallback = new Date(rawTime).getTime();
    return Number.isNaN(fallback) ? 0 : fallback;
  }

  const [, year, month, day, hour, minute, second = "0"] = match;
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  ).getTime();
};

const getHistorySeries = (
  historyResults: FoxCloudHistoryDeviceResult[],
  variable: string,
): FoxCloudHistorySeries | null => {
  const series = historyResults[0]?.datas ?? [];
  return series.find((item) => item.variable === variable || item.variable === `${variable}_1`) ?? null;
};

const getHistoryPointsSince = (series: FoxCloudHistorySeries | null, sinceMs: number) => {
  return (series?.data ?? [])
    .map((point) => ({
      timeMs: parseHistoryTime(point.time),
      value: Number(point.value),
    }))
    .filter((point) => point.timeMs >= sinceMs && Number.isFinite(point.value))
    .sort((first, second) => first.timeMs - second.timeMs);
};

const normalizePower = (value: number, threshold = 0): number => {
  const normalized = Math.max(Number(value) || 0, 0);
  return normalized >= threshold ? normalized : 0;
};

const buildPointMap = (
  historyResults: FoxCloudHistoryDeviceResult[],
  variable: string,
): Map<number, number> => {
  const points = getHistoryPointsSince(getHistorySeries(historyResults, variable), 0);

  return new Map(points.map((point) => [point.timeMs, point.value]));
};

const averageIntervalValue = (
  pointMap: Map<number, number>,
  previousTimeMs: number,
  currentTimeMs: number,
): number => {
  const previous = pointMap.get(previousTimeMs);
  const current = pointMap.get(currentTimeMs);

  if (previous === undefined || current === undefined) {
    return 0;
  }

  return (previous + current) / 2;
};

const buildAnalysisTotalsFromHistory = (
  historyResults: FoxCloudHistoryDeviceResult[],
  dayStart: number,
): DashboardPayload["today"] | null => {
  const pvPoints = getHistoryPointsSince(getHistorySeries(historyResults, "pvPower"), dayStart);

  if (pvPoints.length < 2) {
    return null;
  }

  const maps = {
    feedIn: buildPointMap(historyResults, "feedinPower"),
    load: buildPointMap(historyResults, "loadsPower"),
    grid: buildPointMap(historyResults, "gridConsumptionPower"),
    charge: buildPointMap(historyResults, "batChargePower"),
    discharge: buildPointMap(historyResults, "batDischargePower"),
  };
  const totals = pvPoints.slice(1).reduce(
    (accumulator, point, index) => {
      const previous = pvPoints[index];
      const hours = (point.timeMs - previous.timeMs) / 3_600_000;

      if (hours <= 0 || hours > 1) {
        return accumulator;
      }

      const pvKw = normalizePower(
        (previous.value + point.value) / 2,
        SOLAR_ACTIVE_POWER_THRESHOLD_KW,
      );
      const feedInKw = normalizePower(
        averageIntervalValue(maps.feedIn, previous.timeMs, point.timeMs),
        SOLAR_ACTIVE_POWER_THRESHOLD_KW,
      );
      const homeKw = normalizePower(averageIntervalValue(maps.load, previous.timeMs, point.timeMs));
      const gridKw = normalizePower(averageIntervalValue(maps.grid, previous.timeMs, point.timeMs));
      const dischargeKw = normalizePower(averageIntervalValue(maps.discharge, previous.timeMs, point.timeMs));
      const isSolarActive = pvKw > 0 || feedInKw > 0;
      const chargeKw = isSolarActive
        ? normalizePower(averageIntervalValue(maps.charge, previous.timeMs, point.timeMs))
        : 0;
      const selfConsumptionKw = isSolarActive
        ? Math.max(homeKw + chargeKw - dischargeKw - gridKw, 0)
        : 0;

      accumulator.returnToGrid += feedInKw * hours;
      accumulator.selfConsumption += selfConsumptionKw * hours;
      accumulator.homeUsage += homeKw * hours;
      accumulator.gridConsumption += gridKw * hours;
      accumulator.batteryCharged += chargeKw * hours;
      accumulator.batteryDischarged += dischargeKw * hours;

      return accumulator;
    },
    {
      returnToGrid: 0,
      selfConsumption: 0,
      homeUsage: 0,
      gridConsumption: 0,
      batteryCharged: 0,
      batteryDischarged: 0,
    },
  );

  const solarProductionKwh = round(totals.selfConsumption + totals.returnToGrid);

  if (solarProductionKwh <= 0) {
    return null;
  }

  return {
    solarProductionKwh,
    selfConsumptionKwh: round(totals.selfConsumption),
    returnToGridKwh: round(totals.returnToGrid),
    homeUsageKwh: round(totals.homeUsage),
    gridConsumptionKwh: round(totals.gridConsumption),
    energyGoingIntoBatteryKwh: round(totals.batteryCharged),
    energyComingOutOfBatteryKwh: round(totals.batteryDischarged),
  };
};

const buildAnalysisTotalsFromLiveSamples = (
  registers: ModbusDailyRegisters,
): DashboardPayload["today"] | null => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const samples = readLiveSamplesSince(env.modbus.deviceId, todayStart.toISOString());

  if (samples.length < 12) {
    return null;
  }

  const firstSampleTime = new Date(samples[0].sampled_at).getTime();

  if (firstSampleTime - todayStart.getTime() > 30 * 60 * 1000) {
    return null;
  }

  const solarProductionKwh = round(
    integrateSamples(samples, "grid_export_kw") +
      Math.max(
        integrateSamples(samples, "home_usage_kw") +
          integrateSamples(samples, "battery_charge_kw") -
          integrateSamples(samples, "battery_discharge_kw") -
          integrateSamples(samples, "grid_import_kw"),
        0,
      ),
  );

  if (solarProductionKwh <= registers.solarEnergyTodayKwh) {
    return null;
  }

  return {
    solarProductionKwh,
    selfConsumptionKwh: round(Math.max(solarProductionKwh - registers.feedInTodayKwh, 0)),
    returnToGridKwh: registers.feedInTodayKwh,
    homeUsageKwh: round(Math.max(integrateSamples(samples, "home_usage_kw"), registers.loadEnergyTodayKwh)),
    gridConsumptionKwh: round(
      Math.max(integrateSamples(samples, "grid_import_kw"), registers.gridConsumptionTodayKwh),
    ),
    energyGoingIntoBatteryKwh: round(
      Math.max(integrateSamples(samples, "battery_charge_kw"), registers.batteryChargeTodayKwh),
    ),
    energyComingOutOfBatteryKwh: round(
      Math.max(integrateSamples(samples, "battery_discharge_kw"), registers.batteryDischargeTodayKwh),
    ),
  };
};

const buildRegisterFallbackTotals = (
  registers: ModbusDailyRegisters,
): DashboardPayload["today"] => {
  const balanceProductionKwh = round(
    registers.feedInTodayKwh +
      Math.max(
        registers.loadEnergyTodayKwh +
          registers.batteryChargeTodayKwh -
          registers.batteryDischargeTodayKwh -
          registers.gridConsumptionTodayKwh,
        0,
      ),
  );
  const shouldUseBalance =
    registers.feedInTodayKwh > SOLAR_ACTIVE_POWER_THRESHOLD_KW &&
    balanceProductionKwh > registers.solarEnergyTodayKwh;
  const solarProductionKwh = shouldUseBalance
    ? balanceProductionKwh
    : registers.solarEnergyTodayKwh;

  return {
    solarProductionKwh,
    selfConsumptionKwh: round(Math.max(solarProductionKwh - registers.feedInTodayKwh, 0)),
    returnToGridKwh: registers.feedInTodayKwh,
    homeUsageKwh: registers.loadEnergyTodayKwh,
    gridConsumptionKwh: registers.gridConsumptionTodayKwh,
    energyGoingIntoBatteryKwh: registers.batteryChargeTodayKwh,
    energyComingOutOfBatteryKwh: registers.batteryDischargeTodayKwh,
  };
};

const buildTodayTotals = async (
  registers: ModbusDailyRegisters,
): Promise<DashboardPayload["today"]> => {
  if (env.foxCloud.apiKey && env.foxCloud.deviceSn) {
    try {
      const dayStartDate = new Date();
      dayStartDate.setHours(0, 0, 0, 0);
      const historyResults = await foxCloudClient.getHistory({
        sn: env.foxCloud.deviceSn,
        variables: [...ENERGY_HISTORY_VARIABLES],
        begin: dayStartDate.getTime(),
        end: Date.now(),
      });
      const analysisTotals = buildAnalysisTotalsFromHistory(historyResults, dayStartDate.getTime());

      if (analysisTotals && analysisTotals.solarProductionKwh > registers.solarEnergyTodayKwh) {
        const returnToGridKwh = Math.max(analysisTotals.returnToGridKwh, registers.feedInTodayKwh);
        const solarProductionKwh = round(
          Math.max(analysisTotals.solarProductionKwh, analysisTotals.selfConsumptionKwh + returnToGridKwh),
        );

        return {
          ...analysisTotals,
          solarProductionKwh,
          selfConsumptionKwh: round(Math.max(solarProductionKwh - returnToGridKwh, 0)),
          returnToGridKwh,
          gridConsumptionKwh: Math.max(
            analysisTotals.gridConsumptionKwh,
            registers.gridConsumptionTodayKwh,
          ),
          energyGoingIntoBatteryKwh: Math.max(
            analysisTotals.energyGoingIntoBatteryKwh,
            registers.batteryChargeTodayKwh,
          ),
          energyComingOutOfBatteryKwh: Math.max(
            analysisTotals.energyComingOutOfBatteryKwh,
            registers.batteryDischargeTodayKwh,
          ),
        };
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown FoxCloud history error";
      console.warn(`Modbus daily totals could not be calibrated from FoxCloud history: ${message}`);
    }
  }

  return buildAnalysisTotalsFromLiveSamples(registers) ?? buildRegisterFallbackTotals(registers);
};

const readModbusSnapshot = async (): Promise<ModbusSnapshot> => {
  validateModbusConfig();

  const reader = new ModbusReader();
  const profile = getModbusProfile(env.modbus.profile);
  const signed = (value: { addresses: readonly number[]; scale?: number }): number =>
    reader.getInt(value.addresses, value.scale ?? 1);
  const unsigned = (value: { addresses: readonly number[]; scale?: number }): number =>
    reader.getUInt(value.addresses, value.scale ?? 1);

  try {
    await reader.connect();
    for (const { startAddress, count } of profile.readRanges) {
      await reader.readRange(startAddress, count);
    }

    const pvPowerKw = round(
      profile.live.pvPowerInputs.reduce(
        (total, value) => total + Math.max(signed(value), 0),
        0,
      ),
    );
    const gridCtKw = signed(profile.live.gridCtPower);
    const batteryPowerKw = signed(profile.live.batteryPower);
    const batteryPackTemperatureCelsius = signed(profile.live.batteryPackTemperature);
    const batteryMaxTemperatureCelsius = signed(profile.live.batteryMaxTemperature);
    const batteryMinTemperatureCelsius = signed(profile.live.batteryMinTemperature);
    const now = new Date().toISOString();

    const dailyRegisters: ModbusDailyRegisters = {
      solarEnergyTodayKwh: unsigned(profile.daily.solarEnergyToday),
      totalYieldTodayKwh: unsigned(profile.daily.totalYieldToday),
      feedInTodayKwh: unsigned(profile.daily.feedInToday),
      loadEnergyTodayKwh: unsigned(profile.daily.loadEnergyToday),
      gridConsumptionTodayKwh: unsigned(profile.daily.gridConsumptionToday),
      batteryChargeTodayKwh: unsigned(profile.daily.batteryChargeToday),
      batteryDischargeTodayKwh: unsigned(profile.daily.batteryDischargeToday),
    };

    return {
      sampledAt: now,
      live: {
        solarGeneratedKw: pvPowerKw,
        gridImportKw: round(Math.abs(Math.min(gridCtKw, 0))),
        gridExportKw: round(Math.max(gridCtKw, 0)),
        homeUsageKw: round(Math.max(signed(profile.live.homeUsagePower), 0)),
        batteryChargeKw: round(Math.abs(Math.min(batteryPowerKw, 0))),
        batteryDischargeKw: round(Math.max(batteryPowerKw, 0)),
        batterySocPercent: unsigned(profile.live.batterySoc),
        batteryTemperatureCelsius: batteryMinTemperatureCelsius,
        batteryMinTemperatureCelsius,
        batteryMaxTemperatureCelsius,
        batteryPackTemperatureCelsius,
        inverterTemperatureCelsius: signed(profile.live.inverterTemperature),
        updatedAt: now,
      },
      today: await buildTodayTotals(dailyRegisters),
    };
  } finally {
    await reader.close();
  }
};

const buildTodayRow = (snapshot: ModbusSnapshot): DashboardDailyRow => {
  const now = new Date();

  return {
    day: now.getDate(),
    date: getLocalDateKey(now),
    generation: snapshot.today.selfConsumptionKwh,
    pv_production: snapshot.today.solarProductionKwh,
    pv_energy_total: snapshot.today.solarProductionKwh,
    daily_feedin: snapshot.today.returnToGridKwh,
    self_consumption: snapshot.today.selfConsumptionKwh,
    home_usage: snapshot.today.homeUsageKwh,
    grid_consumption: snapshot.today.gridConsumptionKwh,
    daily_charged_energy_total: snapshot.today.energyGoingIntoBatteryKwh,
    daily_discharged_energy_total: snapshot.today.energyComingOutOfBatteryKwh,
    solarProductionLabel: "Solar production",
    returnToGridLabel: "Return to grid",
    batteryChargeLabel: "Energy going into the battery",
    batteryDischargeLabel: "Energy coming out of the battery",
  };
};

const filterRowsUpToToday = (rows: DashboardDailyRow[]): DashboardDailyRow[] => {
  const todayKey = getLocalDateKey(new Date());
  return rows.filter((row) => row.date <= todayKey);
};

const mergeRowsByDate = (rows: DashboardDailyRow[], preferredRows: DashboardDailyRow[]): DashboardDailyRow[] => {
  const merged = new Map(rows.map((row) => [row.date, row]));

  for (const row of preferredRows) {
    merged.set(row.date, row);
  }

  return [...merged.values()].sort((first, second) => first.date.localeCompare(second.date));
};

const integrateSamples = (
  samples: LiveSample[],
  key: keyof Omit<LiveSample, "sampled_at">,
): number => {
  return integratePowerSamples(
    samples.map((sample) => ({ sampledAt: sample.sampled_at, kw: Number(sample[key] ?? 0) })),
  );
};

const buildLast24Hours = (deviceSn: string): DashboardPayload["last24Hours"] => {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const samples = readLiveSamplesSince(deviceSn, since);

  return {
    labels: samples.map((sample) =>
      new Date(sample.sampled_at).toLocaleTimeString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    ),
    batteryLevelPercent: samples.map((sample) => sample.battery_soc_percent),
    solarGeneratedKw: samples.map((sample) => round(sample.solar_generated_kw)),
    homeUsageKw: samples.map((sample) => round(sample.home_usage_kw)),
    gridImportKw: samples.map((sample) => round(sample.grid_import_kw)),
    batteryDischargeKw: samples.map((sample) => round(sample.battery_discharge_kw)),
  };
};

const buildLastHour = (deviceSn: string): DashboardPayload["lastHour"] => {
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const samples = readLiveSamplesSince(deviceSn, since);

  return {
    solarGeneratedKwh: integrateSamples(samples, "solar_generated_kw"),
    homeUsageKwh: integrateSamples(samples, "home_usage_kw"),
    gridImportKwh: integrateSamples(samples, "grid_import_kw"),
    gridExportKwh: integrateSamples(samples, "grid_export_kw"),
    batteryChargeKwh: integrateSamples(samples, "battery_charge_kw"),
    batteryDischargeKwh: integrateSamples(samples, "battery_discharge_kw"),
  };
};

const currentMonthRows = (todayRow: DashboardDailyRow, year: number, month: number): DashboardDailyRow[] => {
  const cachedRows = filterRowsUpToToday(readDailyEnergyRowsByMonth(env.modbus.deviceId, year, month));

  return mergeRowsByDate(cachedRows, [todayRow]);
};

const getModbusProfileWarnings = (): string[] => {
  const selection = resolveModbusProfile(env.modbus.profile);

  if (selection.matched) {
    return [];
  }

  return [
    `Unknown MODBUS_PROFILE "${env.modbus.profile}". Falling back to ${selection.activeProfile.label} (${selection.activeProfile.id}). Check your .env if readings look wrong.`,
  ];
};

export async function sampleAndStoreModbusData(): Promise<ModbusSnapshot> {
  const snapshot = await readModbusSnapshot();
  const todayRow = buildTodayRow(snapshot);

  saveDailyEnergyRows(env.modbus.deviceId, [todayRow], "modbus");
  saveLiveSample(env.modbus.deviceId, {
    sampledAt: snapshot.sampledAt,
    solarGeneratedKw: snapshot.live.solarGeneratedKw,
    homeUsageKw: snapshot.live.homeUsageKw,
    gridImportKw: snapshot.live.gridImportKw,
    gridExportKw: snapshot.live.gridExportKw,
    batteryChargeKw: snapshot.live.batteryChargeKw,
    batteryDischargeKw: snapshot.live.batteryDischargeKw,
    batterySocPercent: snapshot.live.batterySocPercent,
    batteryTemperatureCelsius: snapshot.live.batteryTemperatureCelsius,
    batteryMinTemperatureCelsius: snapshot.live.batteryMinTemperatureCelsius,
    batteryMaxTemperatureCelsius: snapshot.live.batteryMaxTemperatureCelsius,
    batteryPackTemperatureCelsius: snapshot.live.batteryPackTemperatureCelsius,
    inverterTemperatureCelsius: snapshot.live.inverterTemperatureCelsius,
  });

  return snapshot;
}

export async function getModbusDashboardData(year: number, month: number): Promise<DashboardPayload> {
  if (!isValidYearMonth(year, month)) {
    throw new Error("The requested year or month is invalid.");
  }

  const snapshot = await sampleAndStoreModbusData();
  const todayRow = buildTodayRow(snapshot);
  const requestedMonthIsCurrent =
    todayRow.date.startsWith(`${year}-${String(month).padStart(2, "0")}`);
  const dailyRows = requestedMonthIsCurrent
    ? currentMonthRows(todayRow, year, month)
    : filterRowsUpToToday(readDailyEnergyRowsByMonth(env.modbus.deviceId, year, month));

  return {
    generatedAt: new Date().toISOString(),
    isStale: false,
    warnings: [
      "Using local read-only Modbus data. Historical daily rows are available after this dashboard has sampled and cached them locally.",
      ...getModbusProfileWarnings(),
    ],
    source: "modbus",
    requestedPeriod: { year, month },
    device: {
      deviceSN: env.modbus.deviceId,
      stationName: env.modbus.stationName,
      deviceType: env.modbus.inverterModel,
      productType: "Local Modbus TCP",
      hasBattery: true,
      hasPV: true,
      status: "online",
    },
    live: snapshot.live,
    today: snapshot.today,
    todaySavings: calculateSavings([todayRow], getElectricityTariff()),
    lastHour: buildLastHour(env.modbus.deviceId),
    chartSeries: {
      labels: dailyRows.map((row) => String(row.day)),
      solarProduction: dailyRows.map((row) => row.pv_production),
      returnToGrid: dailyRows.map((row) => row.daily_feedin),
      homeUsage: dailyRows.map((row) => row.home_usage),
      gridConsumption: dailyRows.map((row) => row.grid_consumption),
      energyGoingIntoBattery: dailyRows.map((row) => row.daily_charged_energy_total),
      energyComingOutOfBattery: dailyRows.map((row) => row.daily_discharged_energy_total),
    },
    last24Hours: buildLast24Hours(env.modbus.deviceId),
    dailyTable: dailyRows,
  };
}

export async function getModbusEnergyRangeData(
  range: string,
  year: number,
  month: number,
): Promise<EnergyRangePayload> {
  if (!isValidYearMonth(year, month)) {
    throw new Error("The requested year or month is invalid.");
  }

  const dashboard = await getModbusDashboardData(year, month);
  const startDate = getRangeStartDate(range, year, month);
  const rows = filterRowsUpToToday(
    readDailyEnergyRowsByDateRange(
      env.modbus.deviceId,
      startDate,
      getRangeEndDate(range, year, month),
    ),
  );

  return {
    generatedAt: new Date().toISOString(),
    range,
    requestedPeriod: dashboard.requestedPeriod,
    monthCount: getMonthCountForDateRange(startDate, year, month),
    dailyTable: rows,
    totals: buildEnergyTotals(rows),
    savings: calculateSavings(rows, getElectricityTariff()),
  };
}

export async function getModbusSavingsOverviewData(
  year: number,
  month: number,
): Promise<SavingsOverviewPayload> {
  if (!isValidYearMonth(year, month)) {
    throw new Error("The requested year or month is invalid.");
  }

  const ranges = [
    "current_week",
    "current_month",
    "last_3_months",
    "last_6_months",
    "last_12_months",
  ];
  const tariff = getElectricityTariff();
  const savingsByRange: SavingsOverviewPayload["ranges"] = {};

  for (const range of ranges) {
    const startDate = getRangeStartDate(range, year, month);
    const rows = filterRowsUpToToday(
      readDailyEnergyRowsByDateRange(
        env.modbus.deviceId,
        startDate,
        getRangeEndDate(range, year, month),
      ),
    );

    savingsByRange[range] = calculateSavings(rows, tariff);
  }

  return {
    generatedAt: new Date().toISOString(),
    requestedPeriod: { year, month },
    ranges: savingsByRange,
  };
}
