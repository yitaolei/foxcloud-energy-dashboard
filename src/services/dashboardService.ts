import { env } from "../config/env.js";
import {
  buildMonthList,
  daysInMonth,
  formatDateKey,
  fromMonthIndex,
  getCurrentWeekBounds,
  getLocalDateKey,
  toMonthIndex,
} from "../lib/dateRanges.js";
import { integratePowerSamples } from "../lib/energyMath.js";
import { buildEnergyTotals } from "../lib/energyTotals.js";
import { FoxCloudApiError, FoxCloudClient } from "../lib/foxcloudClient.js";
import { buildRebuildPlan } from "../lib/rebuildPlan.js";
import { calculateSavings } from "../lib/savings.js";
import type {
  DashboardDailyRow,
  DashboardPayload,
  EnergyRangePayload,
  FoxCloudDevice,
  FoxCloudHistoryDeviceResult,
  FoxCloudHistorySeries,
  FoxCloudRealtimeDataPoint,
  FoxCloudReportSeries,
  RebuildSummary,
  SavingsOverviewPayload,
} from "../types/foxcloud.js";
import { readLatestDashboardPayload, saveDashboardPayload } from "./cacheStore.js";
import {
  getModbusDashboardData,
  getModbusEnergyRangeData,
  getModbusSavingsOverviewData,
} from "./modbusDashboardService.js";
import {
  getLatestDailyEnergyUpdate,
  readDailyEnergyRowsByMonth,
  saveDailyEnergyRows,
} from "./sqliteStore.js";
import { getElectricityTariff } from "./tariffService.js";

const LIVE_VARIABLES = [
  "pvPower",
  "loadsPower",
  "feedinPower",
  "gridConsumptionPower",
  "batChargePower",
  "batDischargePower",
  "SoC",
  "SoC_1",
  "batTemperature",
  "batTemperature_1",
  "batTemperature_2",
  "invTemperation",
  "inverterTemperature",
] as const;

const REPORT_VARIABLES = [
  "generation",
  "PVEnergyTotal",
  "feedin",
  "loads",
  "gridConsumption",
  "chargeEnergyToTal",
  "dischargeEnergyToTal",
] as const;

const HISTORY_VARIABLES = ["SoC_1", "SoC", "loadsPower", "batDischargePower"] as const;
const ENERGY_HISTORY_VARIABLES = [
  "pvPower",
  "loadsPower",
  "feedinPower",
  "gridConsumptionPower",
  "batChargePower",
  "batDischargePower",
  "generation",
  "PVEnergyTotal",
  "feedin",
  "loads",
  "gridConsumption",
  "chargeEnergyToTal",
  "dischargeEnergyToTal",
] as const;
const CURRENT_MONTH_CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_REBUILD_DAYS = 31;
const SOLAR_ACTIVE_POWER_THRESHOLD_KW = 0.05;

const client = new FoxCloudClient({
  apiKey: env.foxCloud.apiKey,
  baseUrl: env.foxCloud.baseUrl,
  timeoutMs: env.foxCloud.timeoutMs,
});

const round = (value: number | null | undefined, decimals = 2): number => {
  const normalized = Number(value ?? 0);
  return Number(normalized.toFixed(decimals));
};

const toStatus = (status: 1 | 2 | 3): "online" | "fault" | "offline" => {
  if (status === 1) {
    return "online";
  }

  if (status === 2) {
    return "fault";
  }

  return "offline";
};

const isValidYearMonth = (year: number, month: number): boolean =>
  Number.isInteger(year) && Number.isInteger(month) && year >= 2020 && month >= 1 && month <= 12;

const getRealtimeValue = (data: FoxCloudRealtimeDataPoint[], variable: string): number | null => {
  const match = data.find((item) => item.variable === variable);
  return typeof match?.value === "number" ? match.value : null;
};

const getFirstRealtimeValue = (
  data: FoxCloudRealtimeDataPoint[],
  variables: readonly string[],
): number | null => {
  for (const variable of variables) {
    const value = getRealtimeValue(data, variable);

    if (value !== null) {
      return value;
    }
  }

  return null;
};

const getRealtimeTime = (data: FoxCloudRealtimeDataPoint[]): string | null => {
  return data[0]?.time ?? null;
};

const getSeriesValue = (
  seriesMap: Map<string, FoxCloudReportSeries>,
  variable: string,
  index: number,
): number => {
  const series = seriesMap.get(variable);
  const value = series?.values[index];
  return typeof value === "number" ? round(value) : 0;
};

const findHistorySeries = (
  series: FoxCloudHistorySeries[],
  variables: readonly string[],
): FoxCloudHistorySeries | null => {
  return series.find((item) => variables.includes(item.variable)) ?? null;
};

const toTimeLabel = (rawTime: string): string => {
  const match = rawTime.match(/\b(\d{2}:\d{2}):\d{2}\b/);
  return match?.[1] ?? rawTime;
};

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

const filterRowsByDateRange = (
  rows: DashboardDailyRow[],
  startDate: string | null,
  endDate: string | null,
): DashboardDailyRow[] =>
  rows.filter((row) => (!startDate || row.date >= startDate) && (!endDate || row.date <= endDate));

const parseDateKey = (dateKey: string): Date => {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const mergeRowsByDate = (
  baseRows: DashboardDailyRow[],
  preferredRows: DashboardDailyRow[],
): DashboardDailyRow[] => {
  const preferredByDate = new Map(preferredRows.map((row) => [row.date, row]));
  const merged = baseRows.map((row) => preferredByDate.get(row.date) ?? row);
  const baseDates = new Set(baseRows.map((row) => row.date));
  const extraRows = preferredRows.filter((row) => !baseDates.has(row.date));

  return [...merged, ...extraRows].sort((first, second) => first.date.localeCompare(second.date));
};

const parseYearMonthFromText = (value: string | null | undefined): { year: number; month: number } | null => {
  const match = value?.match(/(\d{4})-(\d{2})/);

  if (!match) {
    return null;
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]),
  };
};

const isCurrentMonth = (year: number, month: number): boolean => {
  const now = new Date();
  return now.getFullYear() === year && now.getMonth() + 1 === month;
};

const expectedCachedRowsForMonth = (year: number, month: number): number => {
  if (isCurrentMonth(year, month)) {
    return new Date().getDate();
  }

  return daysInMonth(year, month);
};

const isFreshCurrentMonthCache = (deviceSn: string, year: number, month: number): boolean => {
  if (!isCurrentMonth(year, month)) {
    return true;
  }

  const latestUpdate = getLatestDailyEnergyUpdate(deviceSn, year, month);

  if (!latestUpdate) {
    return false;
  }

  return Date.now() - new Date(latestUpdate).getTime() < CURRENT_MONTH_CACHE_TTL_MS;
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

const getCumulativeDeltaSince = (
  historyResults: FoxCloudHistoryDeviceResult[],
  variable: string,
  sinceMs: number,
): number => {
  const points = getHistoryPointsSince(getHistorySeries(historyResults, variable), sinceMs);

  if (points.length < 2) {
    return 0;
  }

  return round(Math.max(points[points.length - 1].value - points[0].value, 0));
};

const integratePowerSince = (
  historyResults: FoxCloudHistoryDeviceResult[],
  variable: string,
  sinceMs: number,
): number => {
  const points = getHistoryPointsSince(getHistorySeries(historyResults, variable), sinceMs);

  if (points.length < 2) {
    return 0;
  }

  return integratePowerSamples(
    points.map((point) => ({ sampledAt: point.timeMs, kw: point.value })),
  );
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

const buildRowFromAnalysisHistory = (
  existing: DashboardDailyRow,
  historyResults: FoxCloudHistoryDeviceResult[],
  dayStart: number,
): DashboardDailyRow | null => {
  const pvPoints = getHistoryPointsSince(getHistorySeries(historyResults, "pvPower"), dayStart);

  if (pvPoints.length < 2) {
    return null;
  }

  const maps = {
    pv: buildPointMap(historyResults, "pvPower"),
    feedin: buildPointMap(historyResults, "feedinPower"),
    loads: buildPointMap(historyResults, "loadsPower"),
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
      const feedinKw = normalizePower(
        averageIntervalValue(maps.feedin, previous.timeMs, point.timeMs),
        SOLAR_ACTIVE_POWER_THRESHOLD_KW,
      );
      const homeKw = normalizePower(averageIntervalValue(maps.loads, previous.timeMs, point.timeMs));
      const gridKw = normalizePower(averageIntervalValue(maps.grid, previous.timeMs, point.timeMs));
      const dischargeKw = normalizePower(averageIntervalValue(maps.discharge, previous.timeMs, point.timeMs));
      const isSolarActive = pvKw > 0 || feedinKw > 0;
      const chargeKw = isSolarActive
        ? normalizePower(averageIntervalValue(maps.charge, previous.timeMs, point.timeMs))
        : 0;
      const selfConsumptionKw = isSolarActive
        ? Math.max(homeKw + chargeKw - dischargeKw - gridKw, 0)
        : 0;

      accumulator.pvEnergyTotal += pvKw * hours;
      accumulator.returnToGrid += feedinKw * hours;
      accumulator.selfConsumption += selfConsumptionKw * hours;
      accumulator.homeUsage += homeKw * hours;
      accumulator.gridConsumption += gridKw * hours;
      accumulator.batteryCharged += chargeKw * hours;
      accumulator.batteryDischarged += dischargeKw * hours;

      return accumulator;
    },
    {
      pvEnergyTotal: 0,
      returnToGrid: 0,
      selfConsumption: 0,
      homeUsage: 0,
      gridConsumption: 0,
      batteryCharged: 0,
      batteryDischarged: 0,
    },
  );
  const pvProduction = round(totals.selfConsumption + totals.returnToGrid);

  if (
    [
      pvProduction,
      totals.returnToGrid,
      totals.selfConsumption,
      totals.homeUsage,
      totals.gridConsumption,
      totals.batteryCharged,
      totals.batteryDischarged,
    ].every((value) => value <= 0)
  ) {
    return null;
  }

  return {
    ...existing,
    generation: round(totals.selfConsumption),
    pv_production: pvProduction,
    pv_energy_total: round(totals.pvEnergyTotal),
    daily_feedin: round(totals.returnToGrid),
    self_consumption: round(totals.selfConsumption),
    home_usage: round(totals.homeUsage),
    grid_consumption: round(totals.gridConsumption),
    daily_charged_energy_total: round(totals.batteryCharged),
    daily_discharged_energy_total: round(totals.batteryDischarged),
  };
};

const buildLast24Hours = (historyResults: FoxCloudHistoryDeviceResult[]): DashboardPayload["last24Hours"] => {
  const series = historyResults[0]?.datas ?? [];
  const batteryLevel = findHistorySeries(series, ["SoC_1", "SoC"]);
  const solarGenerated = findHistorySeries(series, ["pvPower"]);
  const homeUsage = findHistorySeries(series, ["loadsPower"]);
  const gridImport = findHistorySeries(series, ["gridConsumptionPower"]);
  const batteryDischarge = findHistorySeries(series, ["batDischargePower"]);
  const labels = Array.from(
    new Set(
      [batteryLevel, solarGenerated, homeUsage, gridImport, batteryDischarge]
        .filter((item): item is FoxCloudHistorySeries => Boolean(item))
        .flatMap((item) => item.data.map((point) => point.time)),
    ),
  );
  const valueMap = (item: FoxCloudHistorySeries | null): Map<string, number> =>
    new Map((item?.data ?? []).map((point) => [point.time, round(point.value)]));
  const batteryLevelMap = valueMap(batteryLevel);
  const solarGeneratedMap = valueMap(solarGenerated);
  const homeUsageMap = valueMap(homeUsage);
  const gridImportMap = valueMap(gridImport);
  const batteryDischargeMap = valueMap(batteryDischarge);

  return {
    labels: labels.map(toTimeLabel),
    batteryLevelPercent: labels.map((label) => batteryLevelMap.get(label) ?? null),
    solarGeneratedKw: labels.map((label) => solarGeneratedMap.get(label) ?? null),
    homeUsageKw: labels.map((label) => homeUsageMap.get(label) ?? null),
    gridImportKw: labels.map((label) => gridImportMap.get(label) ?? null),
    batteryDischargeKw: labels.map((label) => batteryDischargeMap.get(label) ?? null),
  };
};

const pickDevice = (devices: FoxCloudDevice[]): FoxCloudDevice => {
  if (devices.length === 0) {
    throw new FoxCloudApiError("No FoxCloud devices were found for this API key.", 404);
  }

  const configuredDevice = env.foxCloud.deviceSn
    ? devices.find((device) => device.deviceSN === env.foxCloud.deviceSn)
    : null;

  if (configuredDevice) {
    return configuredDevice;
  }

  return (
    devices.find((device) => device.hasBattery) ??
    devices.find((device) => device.hasPV) ??
    devices[0]
  );
};

const estimatePvProduction = (
  homeUsage: number,
  returnToGrid: number,
  batteryCharged: number,
  batteryDischarged: number,
  gridConsumption: number,
): number =>
  round(Math.max(homeUsage + returnToGrid + batteryCharged - batteryDischarged - gridConsumption, 0));

const getPvProduction = (
  pvEnergyTotal: number,
  generation: number,
  homeUsage: number,
  returnToGrid: number,
  batteryCharged: number,
  batteryDischarged: number,
  gridConsumption: number,
): number => {
  if (pvEnergyTotal > 0) {
    return round(pvEnergyTotal);
  }

  if (generation > 0) {
    return round(generation);
  }

  return estimatePvProduction(
    homeUsage,
    returnToGrid,
    batteryCharged,
    batteryDischarged,
    gridConsumption,
  );
};

const preferReportValue = (reportValue: number, fallbackValue: number): number =>
  reportValue > 0 ? reportValue : fallbackValue;

function buildDailyRows(
  year: number,
  month: number,
  reportSeries: FoxCloudReportSeries[],
): DashboardDailyRow[] {
  const seriesMap = new Map(reportSeries.map((series) => [series.variable, series]));
  const totalDays = daysInMonth(year, month);

  return Array.from({ length: totalDays }, (_, index) => {
    const day = index + 1;
    const generation = getSeriesValue(seriesMap, "generation", index);
    const pvEnergyTotal = getSeriesValue(seriesMap, "PVEnergyTotal", index);
    const returnToGrid = getSeriesValue(seriesMap, "feedin", index);
    const homeUsage = getSeriesValue(seriesMap, "loads", index);
    const gridConsumption = getSeriesValue(seriesMap, "gridConsumption", index);
    const batteryCharged = getSeriesValue(seriesMap, "chargeEnergyToTal", index);
    const batteryDischarged = getSeriesValue(seriesMap, "dischargeEnergyToTal", index);
    const pvProduction = getPvProduction(
      pvEnergyTotal,
      generation,
      homeUsage,
      returnToGrid,
      batteryCharged,
      batteryDischarged,
      gridConsumption,
    );

    return {
      day,
      date: formatDateKey(year, month, day),
      generation,
      pv_production: pvProduction,
      pv_energy_total: pvEnergyTotal,
      daily_feedin: returnToGrid,
      self_consumption: round(Math.max(pvProduction - returnToGrid, 0)),
      home_usage: homeUsage,
      grid_consumption: gridConsumption,
      daily_charged_energy_total: batteryCharged,
      daily_discharged_energy_total: batteryDischarged,
      solarProductionLabel: "Solar production",
      returnToGridLabel: "Return to grid",
      batteryChargeLabel: "Energy going into the battery",
      batteryDischargeLabel: "Energy coming out of the battery",
    };
  });
}

const filterRowsUpToToday = (rows: DashboardDailyRow[]): DashboardDailyRow[] => {
  const todayKey = getLocalDateKey(new Date());
  return rows.filter((row) => row.date <= todayKey);
};

const readUsableCachedMonthRows = (
  deviceSn: string,
  year: number,
  month: number,
): DashboardDailyRow[] | null => {
  const rows = filterRowsUpToToday(readDailyEnergyRowsByMonth(deviceSn, year, month));

  if (rows.length < expectedCachedRowsForMonth(year, month)) {
    return null;
  }

  if (!isFreshCurrentMonthCache(deviceSn, year, month)) {
    return null;
  }

  return rows;
};

const fetchMonthRowsWithCache = async (
  device: FoxCloudDevice,
  year: number,
  month: number,
  historyResults: FoxCloudHistoryDeviceResult[],
): Promise<DashboardDailyRow[]> => {
  const cachedRows = readUsableCachedMonthRows(device.deviceSN, year, month);

  if (cachedRows) {
    return cachedRows;
  }

  const report = await client.getReport({
    sn: device.deviceSN,
    year,
    month,
    dimension: "month",
    variables: [...REPORT_VARIABLES],
  });
  const freshRows = applyCurrentDayHistoryOverride(buildDailyRows(year, month, report), historyResults, year, month);
  const todayKey = getLocalDateKey(new Date());
  const cachedHistoricalRows = isCurrentMonth(year, month)
    ? readDailyEnergyRowsByMonth(device.deviceSN, year, month).filter((row) => row.date < todayKey)
    : [];
  const rows = mergeRowsByDate(freshRows, cachedHistoricalRows);
  const rowsToSave = isCurrentMonth(year, month)
    ? freshRows.filter((row) => row.date === todayKey)
    : rows;

  saveDailyEnergyRows(device.deviceSN, rowsToSave);

  return filterRowsUpToToday(rows);
};

const getRangeStartMonth = async (
  range: string,
  anchorYear: number,
  anchorMonth: number,
  device: FoxCloudDevice,
): Promise<{ year: number; month: number }> => {
  const anchorIndex = toMonthIndex(anchorYear, anchorMonth);
  const fixedRanges: Record<string, number> = {
    current_week: 1,
    current_month: 1,
    last_2_months: 2,
    last_3_months: 3,
    last_6_months: 6,
    last_12_months: 12,
  };

  if (range === "current_week") {
    const { startDate } = getCurrentWeekBounds();
    const [startYear, startMonth] = startDate.split("-").map(Number);
    return { year: startYear, month: startMonth };
  }

  if (range === "previous_month") {
    return fromMonthIndex(anchorIndex - 1);
  }

  if (range === "all") {
    try {
      const plantDetail = await client.getPlantDetail(device.stationID);
      return parseYearMonthFromText(plantDetail.createDate) ?? { year: anchorYear, month: anchorMonth };
    } catch {
      return fromMonthIndex(anchorIndex - 11);
    }
  }

  const monthCount = fixedRanges[range] ?? 1;
  return fromMonthIndex(anchorIndex - monthCount + 1);
};

const getRangeEndMonth = (range: string, anchorYear: number, anchorMonth: number): { year: number; month: number } => {
  if (range === "current_week") {
    const { endDate } = getCurrentWeekBounds();
    const [endYear, endMonth] = endDate.split("-").map(Number);
    return { year: endYear, month: endMonth };
  }

  if (range === "previous_month") {
    return fromMonthIndex(toMonthIndex(anchorYear, anchorMonth) - 1);
  }

  return { year: anchorYear, month: anchorMonth };
};

function applyCurrentDayHistoryOverride(
  rows: DashboardDailyRow[],
  historyResults: FoxCloudHistoryDeviceResult[],
  year: number,
  month: number,
): DashboardDailyRow[] {
  const now = new Date();
  const isCurrentMonth = now.getFullYear() === year && now.getMonth() + 1 === month;

  if (!isCurrentMonth) {
    return rows;
  }

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const todayIndex = now.getDate() - 1;
  const existing = rows[todayIndex];

  if (!existing) {
    return rows;
  }

  const analysisRow = buildRowFromAnalysisHistory(existing, historyResults, todayStart);

  if (analysisRow) {
    const updatedRows = [...rows];

    updatedRows[todayIndex] = analysisRow;

    return updatedRows;
  }

  const returnToGrid = getCumulativeDeltaSince(historyResults, "feedin", todayStart);
  const homeUsage = getCumulativeDeltaSince(historyResults, "loads", todayStart);
  const gridConsumption = getCumulativeDeltaSince(historyResults, "gridConsumption", todayStart);
  const batteryCharged = getCumulativeDeltaSince(historyResults, "chargeEnergyToTal", todayStart);
  const batteryDischarged = getCumulativeDeltaSince(historyResults, "dischargeEnergyToTal", todayStart);
  const generation = getCumulativeDeltaSince(historyResults, "generation", todayStart);
  const pvEnergyTotal = getCumulativeDeltaSince(historyResults, "PVEnergyTotal", todayStart);
  const hasHistoryData = [
    returnToGrid,
    homeUsage,
    gridConsumption,
    batteryCharged,
    batteryDischarged,
    generation,
    pvEnergyTotal,
  ].some((value) => value > 0);

  if (!hasHistoryData) {
    return rows;
  }

  const mergedReturnToGrid = preferReportValue(existing.daily_feedin, returnToGrid);
  const mergedHomeUsage = preferReportValue(existing.home_usage, homeUsage);
  const mergedGridConsumption = preferReportValue(existing.grid_consumption, gridConsumption);
  const mergedBatteryCharged = preferReportValue(existing.daily_charged_energy_total, batteryCharged);
  const mergedBatteryDischarged = preferReportValue(existing.daily_discharged_energy_total, batteryDischarged);
  const mergedGeneration = preferReportValue(existing.generation, generation);
  const mergedPvEnergyTotal = preferReportValue(existing.pv_energy_total, pvEnergyTotal);
  const pvProduction = getPvProduction(
    mergedPvEnergyTotal,
    mergedGeneration,
    mergedHomeUsage,
    mergedReturnToGrid,
    mergedBatteryCharged,
    mergedBatteryDischarged,
    mergedGridConsumption,
  );
  const updatedRows = [...rows];

  updatedRows[todayIndex] = {
    ...existing,
    generation: mergedGeneration,
    pv_production: pvProduction,
    pv_energy_total: mergedPvEnergyTotal,
    daily_feedin: mergedReturnToGrid,
    self_consumption: round(Math.max(pvProduction - mergedReturnToGrid, 0)),
    home_usage: mergedHomeUsage,
    grid_consumption: mergedGridConsumption,
    daily_charged_energy_total: mergedBatteryCharged,
    daily_discharged_energy_total: mergedBatteryDischarged,
  };

  return updatedRows;
}

function buildLastHour(historyResults: FoxCloudHistoryDeviceResult[]): DashboardPayload["lastHour"] {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;

  return {
    solarGeneratedKwh: integratePowerSince(historyResults, "pvPower", oneHourAgo),
    homeUsageKwh: integratePowerSince(historyResults, "loadsPower", oneHourAgo),
    gridImportKwh: integratePowerSince(historyResults, "gridConsumptionPower", oneHourAgo),
    gridExportKwh: integratePowerSince(historyResults, "feedinPower", oneHourAgo),
    batteryChargeKwh: integratePowerSince(historyResults, "batChargePower", oneHourAgo),
    batteryDischargeKwh: integratePowerSince(historyResults, "batDischargePower", oneHourAgo),
  };
}

function pickTodayRow(rows: DashboardDailyRow[], year: number, month: number): DashboardDailyRow {
  const now = new Date();
  const isCurrentMonth = now.getFullYear() === year && now.getMonth() + 1 === month;

  if (isCurrentMonth) {
    return rows[Math.max(now.getDate() - 1, 0)] ?? rows[rows.length - 1];
  }

  const latestPopulated = [...rows]
    .reverse()
    .find((row) =>
      [
        row.generation,
        row.pv_production,
        row.daily_feedin,
        row.self_consumption,
        row.home_usage,
        row.grid_consumption,
        row.daily_charged_energy_total,
        row.daily_discharged_energy_total,
      ].some((value) => value > 0),
    );

  return latestPopulated ?? rows[rows.length - 1];
}

function toPayload(
  device: FoxCloudDevice,
  liveData: FoxCloudRealtimeDataPoint[],
  dailyRows: DashboardDailyRow[],
  historyResults: FoxCloudHistoryDeviceResult[],
  requestedYear: number,
  requestedMonth: number,
): DashboardPayload {
  const todayRow = pickTodayRow(dailyRows, requestedYear, requestedMonth);

  return {
    generatedAt: new Date().toISOString(),
    isStale: false,
    warnings: [],
    source: "live",
    requestedPeriod: {
      year: requestedYear,
      month: requestedMonth,
    },
    device: {
      deviceSN: device.deviceSN,
      stationName: device.stationName,
      deviceType: device.deviceType,
      productType: device.productType,
      hasBattery: device.hasBattery,
      hasPV: device.hasPV,
      status: toStatus(device.status),
    },
    live: {
      solarGeneratedKw: round(getRealtimeValue(liveData, "pvPower")),
      gridImportKw: round(getRealtimeValue(liveData, "gridConsumptionPower")),
      gridExportKw: round(getRealtimeValue(liveData, "feedinPower")),
      homeUsageKw: round(getRealtimeValue(liveData, "loadsPower")),
      batteryChargeKw: round(getRealtimeValue(liveData, "batChargePower")),
      batteryDischargeKw: round(getRealtimeValue(liveData, "batDischargePower")),
      batterySocPercent: getFirstRealtimeValue(liveData, ["SoC", "SoC_1"]),
      batteryTemperatureCelsius: getFirstRealtimeValue(liveData, [
        "batTemperature",
        "batTemperature_1",
        "batTemperature_2",
      ]),
      batteryMinTemperatureCelsius: getFirstRealtimeValue(liveData, [
        "batTemperature",
        "batTemperature_1",
        "batTemperature_2",
      ]),
      batteryMaxTemperatureCelsius: null,
      batteryPackTemperatureCelsius: null,
      inverterTemperatureCelsius: getFirstRealtimeValue(liveData, [
        "invTemperation",
        "inverterTemperature",
      ]),
      updatedAt: getRealtimeTime(liveData),
    },
    today: {
      solarProductionKwh: round(todayRow.pv_production),
      selfConsumptionKwh: round(todayRow.self_consumption),
      returnToGridKwh: round(todayRow.daily_feedin),
      homeUsageKwh: round(todayRow.home_usage),
      gridConsumptionKwh: round(todayRow.grid_consumption),
      energyGoingIntoBatteryKwh: round(todayRow.daily_charged_energy_total),
      energyComingOutOfBatteryKwh: round(todayRow.daily_discharged_energy_total),
    },
    todaySavings: calculateSavings([todayRow], getElectricityTariff()),
    lastHour: buildLastHour(historyResults),
    chartSeries: {
      labels: dailyRows.map((row) => String(row.day)),
      solarProduction: dailyRows.map((row) => row.pv_production),
      returnToGrid: dailyRows.map((row) => row.daily_feedin),
      homeUsage: dailyRows.map((row) => row.home_usage),
      gridConsumption: dailyRows.map((row) => row.grid_consumption),
      energyGoingIntoBattery: dailyRows.map((row) => row.daily_charged_energy_total),
      energyComingOutOfBattery: dailyRows.map((row) => row.daily_discharged_energy_total),
    },
    last24Hours: buildLast24Hours(historyResults),
    dailyTable: dailyRows,
  };
}

const demoDevice: FoxCloudDevice = {
  deviceSN: "DEMO-FOX-ESS",
  moduleSN: "DEMO-MODULE",
  stationID: "DEMO-STATION",
  stationName: "Demo Home",
  status: 1,
  hasPV: true,
  hasBattery: true,
  deviceType: "Demo H3",
  productType: "Demo Battery",
};

const demoWave = (seed: number, day: number): number =>
  Math.sin(day * 0.73 + seed) + Math.sin(day * 0.21 + seed * 1.7) * 0.55;

const dayProgressMultiplier = (year: number, month: number, day: number): number => {
  const now = new Date();

  if (now.getFullYear() !== year || now.getMonth() + 1 !== month || now.getDate() !== day) {
    return 1;
  }

  return Math.max((now.getHours() + now.getMinutes() / 60) / 24, 0.05);
};

const buildDemoDailyRows = (year: number, month: number): DashboardDailyRow[] => {
  return Array.from({ length: daysInMonth(year, month) }, (_, index) => {
    const day = index + 1;
    const progress = dayProgressMultiplier(year, month, day);
    const solarProduction = round(Math.max(7, 38 + demoWave(1, day) * 14) * progress);
    const returnToGrid = round(Math.max(0.2, solarProduction * (0.22 + (demoWave(2, day) + 2) * 0.07)));
    const gridConsumption = round(Math.max(0.1, 0.35 + Math.max(demoWave(3, day), 0) * 1.2) * progress);
    const homeUsage = round(Math.max(8, 23 + demoWave(4, day) * 8) * progress);
    const batteryCharged = round(Math.max(1, solarProduction * (0.18 + (demoWave(5, day) + 2) * 0.04)));
    const batteryDischarged = round(Math.max(1, homeUsage * (0.2 + (demoWave(6, day) + 2) * 0.05)));
    const selfConsumption = round(Math.max(solarProduction - returnToGrid, 0));

    return {
      day,
      date: formatDateKey(year, month, day),
      generation: solarProduction,
      pv_production: solarProduction,
      pv_energy_total: solarProduction,
      daily_feedin: returnToGrid,
      self_consumption: selfConsumption,
      home_usage: homeUsage,
      grid_consumption: gridConsumption,
      daily_charged_energy_total: batteryCharged,
      daily_discharged_energy_total: batteryDischarged,
      solarProductionLabel: "Solar production",
      returnToGridLabel: "Return to grid",
      batteryChargeLabel: "Energy going into the battery",
      batteryDischargeLabel: "Energy coming out of the battery",
    };
  });
};

const buildDemoHistory = (): DashboardPayload["last24Hours"] => {
  const now = new Date();
  const points = Array.from({ length: 49 }, (_, index) => {
    const pointDate = new Date(now.getTime() - (48 - index) * 30 * 60 * 1000);
    const hour = pointDate.getHours() + pointDate.getMinutes() / 60;
    const solarWindow = Math.max(Math.sin(((hour - 6) / 12) * Math.PI), 0);
    const home = round(0.7 + Math.max(Math.sin(hour * 0.85), 0) * 1.1 + (hour > 17 && hour < 22 ? 1.3 : 0));
    const discharge = round(hour < 7 || hour > 18 ? Math.max(0.1, home * 0.55) : 0);
    const battery = round(Math.min(100, Math.max(18, 68 + solarWindow * 30 - (hour > 18 ? (hour - 18) * 3 : 0))));

    return {
      label: pointDate.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" }),
      battery,
      solar: round(solarWindow * 3.6),
      home,
      gridImport: round(Math.max(home - discharge - solarWindow * 2.2, 0)),
      discharge,
    };
  });

  return {
    labels: points.map((point) => point.label),
    batteryLevelPercent: points.map((point) => point.battery),
    solarGeneratedKw: points.map((point) => point.solar),
    homeUsageKw: points.map((point) => point.home),
    gridImportKw: points.map((point) => point.gridImport),
    batteryDischargeKw: points.map((point) => point.discharge),
  };
};

const buildDemoPayload = (year: number, month: number): DashboardPayload => {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  const sunlight = Math.max(Math.sin(((hour - 6) / 12) * Math.PI), 0);
  const dailyRows = filterRowsUpToToday(buildDemoDailyRows(year, month));
  const todayRow = pickTodayRow(dailyRows, year, month);
  const solarNow = round(sunlight * 6.2);
  const homeNow = round(0.65 + (hour > 17 && hour < 22 ? 2.1 : 0.55));
  const batteryChargeNow = round(Math.max(solarNow - homeNow, 0) * 0.55);
  const batteryDischargeNow = round(solarNow < homeNow ? (homeNow - solarNow) * 0.7 : 0);
  const gridExportNow = round(Math.max(solarNow - homeNow - batteryChargeNow, 0));
  const gridImportNow = round(Math.max(homeNow - solarNow - batteryDischargeNow, 0));
  const last24Hours = buildDemoHistory();

  return {
    generatedAt: new Date().toISOString(),
    isStale: false,
    warnings: [
      "Demo mode is enabled. These are sample values, not live FoxCloud data.",
    ],
    source: "demo",
    requestedPeriod: { year, month },
    device: {
      deviceSN: demoDevice.deviceSN,
      stationName: demoDevice.stationName,
      deviceType: demoDevice.deviceType,
      productType: demoDevice.productType,
      hasBattery: demoDevice.hasBattery,
      hasPV: demoDevice.hasPV,
      status: toStatus(demoDevice.status),
    },
    live: {
      solarGeneratedKw: solarNow,
      gridImportKw: gridImportNow,
      gridExportKw: gridExportNow,
      homeUsageKw: homeNow,
      batteryChargeKw: batteryChargeNow,
      batteryDischargeKw: batteryDischargeNow,
      batterySocPercent: last24Hours.batteryLevelPercent.at(-1) ?? 80,
      batteryTemperatureCelsius: 25.5,
      batteryMinTemperatureCelsius: 23.4,
      batteryMaxTemperatureCelsius: 28.1,
      batteryPackTemperatureCelsius: 25.5,
      inverterTemperatureCelsius: 31.2,
      updatedAt: now.toISOString(),
    },
    today: {
      solarProductionKwh: round(todayRow.pv_production),
      selfConsumptionKwh: round(todayRow.self_consumption),
      returnToGridKwh: round(todayRow.daily_feedin),
      homeUsageKwh: round(todayRow.home_usage),
      gridConsumptionKwh: round(todayRow.grid_consumption),
      energyGoingIntoBatteryKwh: round(todayRow.daily_charged_energy_total),
      energyComingOutOfBatteryKwh: round(todayRow.daily_discharged_energy_total),
    },
    todaySavings: calculateSavings([todayRow], getElectricityTariff()),
    lastHour: {
      solarGeneratedKwh: round(solarNow * 0.7),
      homeUsageKwh: round(homeNow * 0.7),
      gridImportKwh: round(gridImportNow * 0.7),
      gridExportKwh: round(gridExportNow * 0.7),
      batteryChargeKwh: round(batteryChargeNow * 0.7),
      batteryDischargeKwh: round(batteryDischargeNow * 0.7),
    },
    chartSeries: {
      labels: dailyRows.map((row) => String(row.day)),
      solarProduction: dailyRows.map((row) => row.pv_production),
      returnToGrid: dailyRows.map((row) => row.daily_feedin),
      homeUsage: dailyRows.map((row) => row.home_usage),
      gridConsumption: dailyRows.map((row) => row.grid_consumption),
      energyGoingIntoBattery: dailyRows.map((row) => row.daily_charged_energy_total),
      energyComingOutOfBattery: dailyRows.map((row) => row.daily_discharged_energy_total),
    },
    last24Hours,
    dailyTable: dailyRows,
  };
};

const getDemoRangeStartMonth = (range: string, anchorYear: number, anchorMonth: number): { year: number; month: number } => {
  const anchorIndex = toMonthIndex(anchorYear, anchorMonth);

  if (range === "current_week") {
    const { startDate } = getCurrentWeekBounds();
    const [startYear, startMonth] = startDate.split("-").map(Number);
    return { year: startYear, month: startMonth };
  }

  if (range === "previous_month") {
    return fromMonthIndex(anchorIndex - 1);
  }

  const monthCounts: Record<string, number> = {
    current_month: 1,
    last_2_months: 2,
    last_3_months: 3,
    last_6_months: 6,
    last_12_months: 12,
    all: 12,
  };

  return fromMonthIndex(anchorIndex - (monthCounts[range] ?? 1) + 1);
};

export async function getDashboardData(year: number, month: number): Promise<DashboardPayload> {
  if (!isValidYearMonth(year, month)) {
    throw new Error("The requested year or month is invalid.");
  }

  if (env.dataProvider === "modbus") {
    return getModbusDashboardData(year, month);
  }

  if (env.foxCloud.demoMode) {
    return buildDemoPayload(year, month);
  }

  try {
    const deviceList = await client.getDeviceList();
    const device = pickDevice(deviceList.data);
    const historyEnd = Date.now();
    const historyBegin = historyEnd - 24 * 60 * 60 * 1000;
    const [realtimeResults, reportResults, historyResults] = await Promise.all([
      client.getRealtimeData(device.deviceSN, [...LIVE_VARIABLES]),
      client.getReport({
        sn: device.deviceSN,
        year,
        month,
        dimension: "month",
        variables: [...REPORT_VARIABLES],
      }),
      client.getHistory({
        sn: device.deviceSN,
        variables: Array.from(new Set([...HISTORY_VARIABLES, ...ENERGY_HISTORY_VARIABLES])),
        begin: historyBegin,
        end: historyEnd,
      }),
    ]);

    const realtimeRecord = realtimeResults.find((item) => item.deviceSN === device.deviceSN);
    const freshRows = applyCurrentDayHistoryOverride(
      buildDailyRows(year, month, reportResults),
      historyResults,
      year,
      month,
    );
    const todayKey = getLocalDateKey(new Date());
    const cachedHistoricalRows = readDailyEnergyRowsByMonth(device.deviceSN, year, month)
      .filter((row) => row.date < todayKey);
    const dailyRows = mergeRowsByDate(freshRows, cachedHistoricalRows);
    const rowsToSave = isCurrentMonth(year, month)
      ? freshRows.filter((row) => row.date === todayKey)
      : freshRows.filter((row) => row.date <= todayKey && cachedHistoricalRows.length === 0);

    saveDailyEnergyRows(device.deviceSN, rowsToSave);
    const payload = toPayload(
      device,
      realtimeRecord?.datas ?? [],
      dailyRows,
      historyResults,
      year,
      month,
    );

    await saveDashboardPayload(payload);
    return payload;
  } catch (error) {
    const cachedPayload = await readLatestDashboardPayload();

    if (
      cachedPayload &&
      cachedPayload.requestedPeriod.year === year &&
      cachedPayload.requestedPeriod.month === month
    ) {
      return {
        ...cachedPayload,
        generatedAt: new Date().toISOString(),
        isStale: true,
        source: "cache",
        warnings: [
          "Showing the last successful cached response because the live FoxCloud request failed.",
          error instanceof Error ? error.message : "Unknown FoxCloud error",
        ],
      };
    }

    throw error;
  }
}

export async function getEnergyRangeData(
  range: string,
  year: number,
  month: number,
): Promise<EnergyRangePayload> {
  if (!isValidYearMonth(year, month)) {
    throw new Error("The requested year or month is invalid.");
  }

  if (env.dataProvider === "modbus") {
    return getModbusEnergyRangeData(range, year, month);
  }

  if (env.foxCloud.demoMode) {
    const startMonth = getDemoRangeStartMonth(range, year, month);
    const endMonth = getRangeEndMonth(range, year, month);
    const months = buildMonthList(startMonth, endMonth);
    const rows = months.flatMap((item) => buildDemoDailyRows(item.year, item.month));
    const weekBounds = range === "current_week" ? getCurrentWeekBounds() : null;
    const visibleRows = filterRowsByDateRange(
      filterRowsUpToToday(rows),
      weekBounds?.startDate ?? null,
      weekBounds?.endDate ?? null,
    );

    return {
      generatedAt: new Date().toISOString(),
      range,
      requestedPeriod: { year, month },
      monthCount: months.length,
      dailyTable: visibleRows,
      totals: buildEnergyTotals(visibleRows),
      savings: calculateSavings(visibleRows, getElectricityTariff()),
    };
  }

  const deviceList = await client.getDeviceList();
  const device = pickDevice(deviceList.data);
  const startMonth = await getRangeStartMonth(range, year, month, device);
  const endMonth = getRangeEndMonth(range, year, month);
  const months = buildMonthList(startMonth, endMonth);
  const now = new Date();
  const includesCurrentMonth = months.some(
    (item) => item.year === now.getFullYear() && item.month === now.getMonth() + 1,
  );
  const historyEnd = Date.now();
  const historyBegin = historyEnd - 24 * 60 * 60 * 1000;
  const historyResults = includesCurrentMonth
    ? await client.getHistory({
        sn: device.deviceSN,
        variables: Array.from(new Set(ENERGY_HISTORY_VARIABLES)),
        begin: historyBegin,
        end: historyEnd,
      })
    : [];
  const rowsByMonth = await Promise.all(
    months.map((item) => fetchMonthRowsWithCache(device, item.year, item.month, historyResults)),
  );
  const rows = rowsByMonth.flat();
  const weekBounds = range === "current_week" ? getCurrentWeekBounds() : null;
  const visibleRows = filterRowsByDateRange(
    filterRowsUpToToday(rows),
    weekBounds?.startDate ?? null,
    weekBounds?.endDate ?? null,
  );

  return {
    generatedAt: new Date().toISOString(),
    range,
    requestedPeriod: {
      year,
      month,
    },
    monthCount: months.length,
    dailyTable: visibleRows,
    totals: buildEnergyTotals(visibleRows),
    savings: calculateSavings(visibleRows, getElectricityTariff()),
  };
}

export async function getSavingsOverviewData(
  year: number,
  month: number,
): Promise<SavingsOverviewPayload> {
  if (!isValidYearMonth(year, month)) {
    throw new Error("The requested year or month is invalid.");
  }

  if (env.dataProvider === "modbus") {
    return getModbusSavingsOverviewData(year, month);
  }

  const ranges = [
    "current_week",
    "current_month",
    "last_3_months",
    "last_6_months",
    "last_12_months",
  ];
  const savingsByRange: SavingsOverviewPayload["ranges"] = {};

  for (const range of ranges) {
    try {
      const payload = await getEnergyRangeData(range, year, month);
      savingsByRange[range] = payload.savings;
    } catch {
      savingsByRange[range] = null;
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    requestedPeriod: { year, month },
    ranges: savingsByRange,
  };
}

export async function rebuildEnergyRangeCache(
  range: string,
  year: number,
  month: number,
): Promise<EnergyRangePayload & {
  rebuild: RebuildSummary;
  processedDays: number;
  rebuiltDays: number;
  skippedDays: number;
  omittedDays: number;
  limited: boolean;
  limitDays: number;
}> {
  if (!isValidYearMonth(year, month)) {
    throw new Error("The requested year or month is invalid.");
  }

  if (env.dataProvider === "modbus") {
    const payload = await getModbusEnergyRangeData(range, year, month);
    const plan = previewRebuildEnergyRangeCache(range, year, month);

    return {
      ...payload,
      rebuild: {
        requestedDays: payload.dailyTable.length,
        processedDays: payload.dailyTable.length,
        rebuiltDays: 0,
        skippedDays: 0,
        omittedDays: 0,
        limited: false,
        limitDays: 0,
        source: "modbus",
        estimatedHistoryCalls: plan.estimatedHistoryCalls,
        daysToRebuild: plan.daysToRebuild,
      },
      processedDays: payload.dailyTable.length,
      rebuiltDays: 0,
      skippedDays: 0,
      omittedDays: 0,
      limited: false,
      limitDays: 0,
    };
  }

  if (env.foxCloud.demoMode) {
    const payload = await getEnergyRangeData(range, year, month);
    const plan = previewRebuildEnergyRangeCache(range, year, month);
    return {
      ...payload,
      rebuild: {
        requestedDays: payload.dailyTable.length,
        processedDays: 0,
        rebuiltDays: 0,
        skippedDays: 0,
        omittedDays: 0,
        limited: false,
        limitDays: MAX_REBUILD_DAYS,
        source: "demo",
        estimatedHistoryCalls: plan.estimatedHistoryCalls,
        daysToRebuild: plan.daysToRebuild,
      },
      processedDays: 0,
      rebuiltDays: 0,
      skippedDays: 0,
      omittedDays: 0,
      limited: false,
      limitDays: MAX_REBUILD_DAYS,
    };
  }

  const deviceList = await client.getDeviceList();
  const device = pickDevice(deviceList.data);
  const startMonth = await getRangeStartMonth(range, year, month, device);
  const endMonth = getRangeEndMonth(range, year, month);
  const months = buildMonthList(startMonth, endMonth);
  const reportRowsByMonth = await Promise.all(
    months.map(async (item) => {
      const report = await client.getReport({
        sn: device.deviceSN,
        year: item.year,
        month: item.month,
        dimension: "month",
        variables: [...REPORT_VARIABLES],
      });

      return buildDailyRows(item.year, item.month, report);
    }),
  );
  const weekBounds = range === "current_week" ? getCurrentWeekBounds() : null;
  const baseRows = filterRowsByDateRange(
    filterRowsUpToToday(reportRowsByMonth.flat()),
    weekBounds?.startDate ?? null,
    weekBounds?.endDate ?? null,
  );
  const rowsToRebuild = baseRows.slice(-MAX_REBUILD_DAYS);
  const rebuiltRows: DashboardDailyRow[] = [];
  const omittedDays = baseRows.length - rowsToRebuild.length;
  let rebuiltDays = 0;
  let skippedDays = 0;

  for (const row of rowsToRebuild) {
    const dayStart = parseDateKey(row.date).getTime();
    const dayEnd = Math.min(dayStart + 24 * 60 * 60 * 1000 - 1, Date.now());
    const historyResults = await client.getHistory({
      sn: device.deviceSN,
      variables: Array.from(new Set(ENERGY_HISTORY_VARIABLES)),
      begin: dayStart,
      end: dayEnd,
    });
    const rebuiltRow = buildRowFromAnalysisHistory(row, historyResults, dayStart);

    if (rebuiltRow) {
      rebuiltRows.push(rebuiltRow);
      rebuiltDays += 1;
    } else {
      rebuiltRows.push(row);
      skippedDays += 1;
    }
  }

  const rebuiltByDate = new Map(rebuiltRows.map((row) => [row.date, row]));
  const visibleRows = baseRows.map((row) => rebuiltByDate.get(row.date) ?? row);

  saveDailyEnergyRows(device.deviceSN, visibleRows, "foxcloud-history-rebuild");

  return {
    generatedAt: new Date().toISOString(),
    range,
    requestedPeriod: { year, month },
    monthCount: months.length,
    processedDays: rebuiltRows.length,
    rebuiltDays,
    skippedDays,
    omittedDays,
    limited: baseRows.length > rowsToRebuild.length,
    limitDays: MAX_REBUILD_DAYS,
    rebuild: {
      requestedDays: baseRows.length,
      processedDays: rebuiltRows.length,
      rebuiltDays,
      skippedDays,
      omittedDays,
      limited: baseRows.length > rowsToRebuild.length,
      limitDays: MAX_REBUILD_DAYS,
      source: "foxcloud-history",
      estimatedHistoryCalls: rowsToRebuild.length,
      daysToRebuild: rowsToRebuild.length,
    },
    dailyTable: visibleRows,
    totals: buildEnergyTotals(visibleRows),
    savings: calculateSavings(visibleRows, getElectricityTariff()),
  };
}

export function previewRebuildEnergyRangeCache(
  range: string,
  year: number,
  month: number,
): RebuildSummary {
  const source = env.dataProvider === "modbus"
    ? "modbus"
    : env.foxCloud.demoMode
      ? "demo"
      : "foxcloud-history";
  const plan = buildRebuildPlan(range, year, month, {
    source,
    limitDays: source === "modbus" ? 0 : MAX_REBUILD_DAYS,
  });

  return {
    requestedDays: plan.requestedDays,
    processedDays: 0,
    rebuiltDays: 0,
    skippedDays: 0,
    omittedDays: plan.omittedDays,
    limited: plan.limited,
    limitDays: plan.limitDays,
    source: plan.source,
    estimatedHistoryCalls: plan.estimatedHistoryCalls,
    daysToRebuild: plan.daysToRebuild,
  };
}
