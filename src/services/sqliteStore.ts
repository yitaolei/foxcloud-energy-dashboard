import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

import type { DashboardDailyRow } from "../types/foxcloud.js";

const dataDir = path.resolve(process.cwd(), "data");
const databasePath = path.join(dataDir, "foxcloud-dashboard.sqlite");

fs.mkdirSync(dataDir, { recursive: true });

const database = new Database(databasePath);

database.pragma("journal_mode = WAL");
database.pragma("foreign_keys = ON");

database.exec(`
  CREATE TABLE IF NOT EXISTS daily_energy (
    device_sn TEXT NOT NULL,
    date TEXT NOT NULL,
    day INTEGER NOT NULL,
    generation REAL NOT NULL DEFAULT 0,
    pv_production REAL NOT NULL DEFAULT 0,
    pv_energy_total REAL NOT NULL DEFAULT 0,
    daily_feedin REAL NOT NULL DEFAULT 0,
    self_consumption REAL NOT NULL DEFAULT 0,
    home_usage REAL NOT NULL DEFAULT 0,
    grid_consumption REAL NOT NULL DEFAULT 0,
    daily_charged_energy_total REAL NOT NULL DEFAULT 0,
    daily_discharged_energy_total REAL NOT NULL DEFAULT 0,
    source TEXT NOT NULL DEFAULT 'foxcloud',
    updated_at TEXT NOT NULL,
    PRIMARY KEY (device_sn, date)
  );

  CREATE INDEX IF NOT EXISTS idx_daily_energy_device_date
    ON daily_energy (device_sn, date);

  CREATE TABLE IF NOT EXISTS live_samples (
    device_sn TEXT NOT NULL,
    sampled_at TEXT NOT NULL,
    solar_generated_kw REAL NOT NULL DEFAULT 0,
    home_usage_kw REAL NOT NULL DEFAULT 0,
    grid_import_kw REAL NOT NULL DEFAULT 0,
    grid_export_kw REAL NOT NULL DEFAULT 0,
    battery_charge_kw REAL NOT NULL DEFAULT 0,
    battery_discharge_kw REAL NOT NULL DEFAULT 0,
    battery_soc_percent REAL,
    battery_temperature_celsius REAL,
    battery_min_temperature_celsius REAL,
    battery_max_temperature_celsius REAL,
    battery_pack_temperature_celsius REAL,
    inverter_temperature_celsius REAL,
    source TEXT NOT NULL DEFAULT 'modbus',
    PRIMARY KEY (device_sn, sampled_at)
  );

  CREATE INDEX IF NOT EXISTS idx_live_samples_device_time
    ON live_samples (device_sn, sampled_at);

  CREATE TABLE IF NOT EXISTS grid_quality_samples (
    device_sn TEXT NOT NULL,
    sampled_at TEXT NOT NULL,
    grid_voltage_r_v REAL,
    grid_voltage_s_v REAL,
    grid_voltage_t_v REAL,
    grid_frequency_hz REAL,
    inverter_current_r_a REAL,
    inverter_current_s_a REAL,
    inverter_current_t_a REAL,
    inverter_power_r_kw REAL,
    inverter_power_s_kw REAL,
    inverter_power_t_kw REAL,
    grid_meter_power_r_kw REAL,
    grid_meter_power_s_kw REAL,
    grid_meter_power_t_kw REAL,
    grid_meter_power_total_kw REAL,
    source TEXT NOT NULL DEFAULT 'modbus',
    PRIMARY KEY (device_sn, sampled_at)
  );

  CREATE TABLE IF NOT EXISTS app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

const ensureColumn = (tableName: string, columnName: string, definition: string): void => {
  const columns = database.prepare(`PRAGMA table_info(${tableName})`).all() as Array<{ name: string }>;

  if (!columns.some((column) => column.name === columnName)) {
    database.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
  }
};

ensureColumn("live_samples", "battery_min_temperature_celsius", "REAL");
ensureColumn("live_samples", "battery_max_temperature_celsius", "REAL");
ensureColumn("live_samples", "battery_pack_temperature_celsius", "REAL");

interface DailyEnergyRecord {
  date: string;
  day: number;
  generation: number;
  pv_production: number;
  pv_energy_total: number;
  daily_feedin: number;
  self_consumption: number;
  home_usage: number;
  grid_consumption: number;
  daily_charged_energy_total: number;
  daily_discharged_energy_total: number;
  updated_at: string;
}

const toDailyRow = (record: DailyEnergyRecord): DashboardDailyRow => ({
  day: record.day,
  date: record.date,
  generation: record.generation,
  pv_production: record.pv_production,
  pv_energy_total: record.pv_energy_total,
  daily_feedin: record.daily_feedin,
  self_consumption: record.self_consumption,
  home_usage: record.home_usage,
  grid_consumption: record.grid_consumption,
  daily_charged_energy_total: record.daily_charged_energy_total,
  daily_discharged_energy_total: record.daily_discharged_energy_total,
  solarProductionLabel: "Solar production",
  returnToGridLabel: "Return to grid",
  batteryChargeLabel: "Energy going into the battery",
  batteryDischargeLabel: "Energy coming out of the battery",
});

const upsertDailyRow = database.prepare(`
  INSERT INTO daily_energy (
    device_sn,
    date,
    day,
    generation,
    pv_production,
    pv_energy_total,
    daily_feedin,
    self_consumption,
    home_usage,
    grid_consumption,
    daily_charged_energy_total,
    daily_discharged_energy_total,
    source,
    updated_at
  )
  VALUES (
    @deviceSn,
    @date,
    @day,
    @generation,
    @pv_production,
    @pv_energy_total,
    @daily_feedin,
    @self_consumption,
    @home_usage,
    @grid_consumption,
    @daily_charged_energy_total,
    @daily_discharged_energy_total,
    @source,
    @updatedAt
  )
  ON CONFLICT(device_sn, date) DO UPDATE SET
    day = excluded.day,
    generation = excluded.generation,
    pv_production = excluded.pv_production,
    pv_energy_total = excluded.pv_energy_total,
    daily_feedin = excluded.daily_feedin,
    self_consumption = excluded.self_consumption,
    home_usage = excluded.home_usage,
    grid_consumption = excluded.grid_consumption,
    daily_charged_energy_total = excluded.daily_charged_energy_total,
    daily_discharged_energy_total = excluded.daily_discharged_energy_total,
    source = excluded.source,
    updated_at = excluded.updated_at
`);

const saveRowsTransaction = database.transaction(
  (deviceSn: string, rows: DashboardDailyRow[], source: string, updatedAt: string) => {
    for (const row of rows) {
      upsertDailyRow.run({
        deviceSn,
        date: row.date,
        day: row.day,
        generation: row.generation,
        pv_production: row.pv_production,
        pv_energy_total: row.pv_energy_total,
        daily_feedin: row.daily_feedin,
        self_consumption: row.self_consumption,
        home_usage: row.home_usage,
        grid_consumption: row.grid_consumption,
        daily_charged_energy_total: row.daily_charged_energy_total,
        daily_discharged_energy_total: row.daily_discharged_energy_total,
        source,
        updatedAt,
      });
    }
  },
);

export function saveDailyEnergyRows(
  deviceSn: string,
  rows: DashboardDailyRow[],
  source = "foxcloud",
): void {
  if (rows.length === 0) {
    return;
  }

  saveRowsTransaction(deviceSn, rows, source, new Date().toISOString());
}

export function readDailyEnergyRowsByMonth(
  deviceSn: string,
  year: number,
  month: number,
): DashboardDailyRow[] {
  const monthKey = `${year}-${String(month).padStart(2, "0")}`;
  const records = database
    .prepare(
      `
        SELECT *
        FROM daily_energy
        WHERE device_sn = ? AND date LIKE ?
        ORDER BY date ASC
      `,
    )
    .all(deviceSn, `${monthKey}-%`) as DailyEnergyRecord[];

  return records.map(toDailyRow);
}

export function readDailyEnergyRowsByDateRange(
  deviceSn: string,
  startDate: string,
  endDate: string,
): DashboardDailyRow[] {
  const records = database
    .prepare(
      `
        SELECT *
        FROM daily_energy
        WHERE device_sn = ? AND date >= ? AND date <= ?
        ORDER BY date ASC
      `,
    )
    .all(deviceSn, startDate, endDate) as DailyEnergyRecord[];

  return records.map(toDailyRow);
}

export function getLatestDailyEnergyUpdate(
  deviceSn: string,
  year: number,
  month: number,
): string | null {
  const monthKey = `${year}-${String(month).padStart(2, "0")}`;
  const record = database
    .prepare(
      `
        SELECT MAX(updated_at) AS updated_at
        FROM daily_energy
        WHERE device_sn = ? AND date LIKE ?
      `,
    )
    .get(deviceSn, `${monthKey}-%`) as { updated_at: string | null } | undefined;

  return record?.updated_at ?? null;
}

export interface LiveSample {
  sampled_at: string;
  solar_generated_kw: number;
  home_usage_kw: number;
  grid_import_kw: number;
  grid_export_kw: number;
  battery_charge_kw: number;
  battery_discharge_kw: number;
  battery_soc_percent: number | null;
  battery_temperature_celsius: number | null;
  battery_min_temperature_celsius: number | null;
  battery_max_temperature_celsius: number | null;
  battery_pack_temperature_celsius: number | null;
  inverter_temperature_celsius: number | null;
}

const insertLiveSample = database.prepare(`
  INSERT OR REPLACE INTO live_samples (
    device_sn,
    sampled_at,
    solar_generated_kw,
    home_usage_kw,
    grid_import_kw,
    grid_export_kw,
    battery_charge_kw,
    battery_discharge_kw,
    battery_soc_percent,
    battery_temperature_celsius,
    battery_min_temperature_celsius,
    battery_max_temperature_celsius,
    battery_pack_temperature_celsius,
    inverter_temperature_celsius,
    source
  )
  VALUES (
    @deviceSn,
    @sampledAt,
    @solarGeneratedKw,
    @homeUsageKw,
    @gridImportKw,
    @gridExportKw,
    @batteryChargeKw,
    @batteryDischargeKw,
    @batterySocPercent,
    @batteryTemperatureCelsius,
    @batteryMinTemperatureCelsius,
    @batteryMaxTemperatureCelsius,
    @batteryPackTemperatureCelsius,
    @inverterTemperatureCelsius,
    @source
  )
`);

export function saveLiveSample(
  deviceSn: string,
  sample: {
    sampledAt: string;
    solarGeneratedKw: number;
    homeUsageKw: number;
    gridImportKw: number;
    gridExportKw: number;
    batteryChargeKw: number;
    batteryDischargeKw: number;
    batterySocPercent: number | null;
    batteryTemperatureCelsius: number | null;
    batteryMinTemperatureCelsius: number | null;
    batteryMaxTemperatureCelsius: number | null;
    batteryPackTemperatureCelsius: number | null;
    inverterTemperatureCelsius: number | null;
  },
  source = "modbus",
): void {
  insertLiveSample.run({
    deviceSn,
    sampledAt: sample.sampledAt,
    solarGeneratedKw: sample.solarGeneratedKw,
    homeUsageKw: sample.homeUsageKw,
    gridImportKw: sample.gridImportKw,
    gridExportKw: sample.gridExportKw,
    batteryChargeKw: sample.batteryChargeKw,
    batteryDischargeKw: sample.batteryDischargeKw,
    batterySocPercent: sample.batterySocPercent,
    batteryTemperatureCelsius: sample.batteryTemperatureCelsius,
    batteryMinTemperatureCelsius: sample.batteryMinTemperatureCelsius,
    batteryMaxTemperatureCelsius: sample.batteryMaxTemperatureCelsius,
    batteryPackTemperatureCelsius: sample.batteryPackTemperatureCelsius,
    inverterTemperatureCelsius: sample.inverterTemperatureCelsius,
    source,
  });
}

export function readLiveSamplesSince(deviceSn: string, sinceIso: string): LiveSample[] {
  return database
    .prepare(
      `
        SELECT *
        FROM live_samples
        WHERE device_sn = ? AND sampled_at >= ?
        ORDER BY sampled_at ASC
      `,
    )
    .all(deviceSn, sinceIso) as LiveSample[];
}

export function getDatabasePath(): string {
  return databasePath;
}

export function readAppSetting(key: string): string | null {
  const record = database
    .prepare(
      `
        SELECT value
        FROM app_settings
        WHERE key = ?
      `,
    )
    .get(key) as { value: string } | undefined;

  return record?.value ?? null;
}

const upsertAppSetting = database.prepare(`
  INSERT INTO app_settings (key, value, updated_at)
  VALUES (@key, @value, @updatedAt)
  ON CONFLICT(key) DO UPDATE SET
    value = excluded.value,
    updated_at = excluded.updated_at
`);

export function writeAppSetting(key: string, value: string): void {
  upsertAppSetting.run({
    key,
    value,
    updatedAt: new Date().toISOString(),
  });
}

export async function backupDatabase(destinationPath: string): Promise<void> {
  await database.backup(destinationPath);
}

export interface GridQualityValues {
  gridVoltageRV: number | null;
  gridVoltageSV: number | null;
  gridVoltageTV: number | null;
  gridFrequencyHz: number | null;
  inverterCurrentRA: number | null;
  inverterCurrentSA: number | null;
  inverterCurrentTA: number | null;
  inverterPowerRKw: number | null;
  inverterPowerSKw: number | null;
  inverterPowerTKw: number | null;
  gridMeterPowerRKw: number | null;
  gridMeterPowerSKw: number | null;
  gridMeterPowerTKw: number | null;
  gridMeterPowerTotalKw: number | null;
}

export interface GridQualitySample {
  device_sn: string;
  sampled_at: string;
  grid_voltage_r_v: number | null;
  grid_voltage_s_v: number | null;
  grid_voltage_t_v: number | null;
  grid_frequency_hz: number | null;
  inverter_current_r_a: number | null;
  inverter_current_s_a: number | null;
  inverter_current_t_a: number | null;
  inverter_power_r_kw: number | null;
  inverter_power_s_kw: number | null;
  inverter_power_t_kw: number | null;
  grid_meter_power_r_kw: number | null;
  grid_meter_power_s_kw: number | null;
  grid_meter_power_t_kw: number | null;
  grid_meter_power_total_kw: number | null;
  source: string;
}

const upsertGridQualitySample = database.prepare(`
  INSERT INTO grid_quality_samples (
    device_sn, sampled_at,
    grid_voltage_r_v,
    grid_voltage_s_v,
    grid_voltage_t_v,
    grid_frequency_hz,
    inverter_current_r_a,
    inverter_current_s_a,
    inverter_current_t_a,
    inverter_power_r_kw,
    inverter_power_s_kw,
    inverter_power_t_kw,
    grid_meter_power_r_kw,
    grid_meter_power_s_kw,
    grid_meter_power_t_kw,
    grid_meter_power_total_kw,
    source
  ) VALUES (
    @deviceSn, @sampledAt,
    @gridVoltageRV,
    @gridVoltageSV,
    @gridVoltageTV,
    @gridFrequencyHz,
    @inverterCurrentRA,
    @inverterCurrentSA,
    @inverterCurrentTA,
    @inverterPowerRKw,
    @inverterPowerSKw,
    @inverterPowerTKw,
    @gridMeterPowerRKw,
    @gridMeterPowerSKw,
    @gridMeterPowerTKw,
    @gridMeterPowerTotalKw,
    @source
  )
  ON CONFLICT(device_sn, sampled_at) DO UPDATE SET
    grid_voltage_r_v = excluded.grid_voltage_r_v,
    grid_voltage_s_v = excluded.grid_voltage_s_v,
    grid_voltage_t_v = excluded.grid_voltage_t_v,
    grid_frequency_hz = excluded.grid_frequency_hz,
    inverter_current_r_a = excluded.inverter_current_r_a,
    inverter_current_s_a = excluded.inverter_current_s_a,
    inverter_current_t_a = excluded.inverter_current_t_a,
    inverter_power_r_kw = excluded.inverter_power_r_kw,
    inverter_power_s_kw = excluded.inverter_power_s_kw,
    inverter_power_t_kw = excluded.inverter_power_t_kw,
    grid_meter_power_r_kw = excluded.grid_meter_power_r_kw,
    grid_meter_power_s_kw = excluded.grid_meter_power_s_kw,
    grid_meter_power_t_kw = excluded.grid_meter_power_t_kw,
    grid_meter_power_total_kw = excluded.grid_meter_power_total_kw,
    source = excluded.source
`);

export function saveGridQualitySample(
  deviceSn: string,
  sample: GridQualityValues & { sampledAt: string },
  source = "modbus",
): void {
  upsertGridQualitySample.run({ ...sample, deviceSn, source });
}

export function readRecentGridQualitySamples(
  deviceSn: string,
  limit = 100,
): GridQualitySample[] {
  if (!Number.isSafeInteger(limit) || limit < 1) {
    throw new Error("Grid quality sample limit must be a positive integer.");
  }

  return database.prepare(`
    SELECT * FROM grid_quality_samples
    WHERE device_sn = ?
    ORDER BY sampled_at DESC
    LIMIT ?
  `).all(deviceSn, limit) as GridQualitySample[];
}
