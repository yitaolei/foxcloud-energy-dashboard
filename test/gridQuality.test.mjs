import assert from "node:assert/strict";
import { after, test } from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import Database from "better-sqlite3";

const originalCwd = process.cwd();
const temporaryDir = mkdtempSync(path.join(tmpdir(), "grid-quality-"));
process.chdir(temporaryDir);
process.env.FOXCLOUD_DEMO_MODE = "true";
process.env.FOXCLOUD_API_KEY = "";
process.env.MODBUS_HOST = "fixture-only";
process.env.MODBUS_DEVICE_ID = "grid-quality-test";
process.env.MODBUS_PROFILE = "foxess-h3-smart";
const store = await import("../dist/services/sqliteStore.js");
const db = new Database(store.getDatabasePath());
after(() => {
  db.close();
  process.chdir(originalCwd);
  rmSync(temporaryDir, { recursive: true, force: true });
});

// Literal high-word/low-word fixtures, independent of the profile definitions.
const registers = new Map([
  [39123, 2301], [39124, 2402], [39125, 2503], [39139, 4999],
  [39126, 0], [39127, 12345], [39128, 65535], [39129, 53191],
  [39130, 1], [39131, 1],
  [39248, 0], [39249, 1234], [39250, 65535], [39251, 64302],
  [39252, 0], [39253, 1],
  [38814, 65535], [38815, 53190], [38816, 0], [38817, 12345],
  [38818, 65535], [38819, 65535], [38820, 0], [38821, 2],
]);
const expected = {
  grid_voltage_r_v: 230.1, grid_voltage_s_v: 240.2, grid_voltage_t_v: 250.3,
  grid_frequency_hz: 49.99,
  inverter_current_r_a: 12.345, inverter_current_s_a: -12.345, inverter_current_t_a: 65.537,
  inverter_power_r_kw: 1.234, inverter_power_s_kw: -1.234, inverter_power_t_kw: 0.001,
  grid_meter_power_r_kw: 1.2345, grid_meter_power_s_kw: -0.0001,
  grid_meter_power_t_kw: 0.0002, grid_meter_power_total_kw: -1.2346,
};
const require = createRequire(import.meta.url);
const ModbusRTU = require("modbus-serial");
let connections = 0;
let closes = 0;
let reads = [];
ModbusRTU.prototype.connectTCP = async () => { connections++; };
ModbusRTU.prototype.close = (callback) => { closes++; callback(); };
ModbusRTU.prototype.readHoldingRegisters = async (start, count) => {
  reads.push({ startAddress: start, count });
  return { data: Array.from({ length: count }, (_, index) => registers.get(start + index) ?? 0) };
};
const { sampleAndStoreModbusData, getModbusDashboardData } = await import("../dist/services/modbusDashboardService.js");
const { foxEssH3SmartProfile } = await import("../dist/services/modbus/profiles.js");

test("creates the nullable diagnostic schema with composite key and source default", () => {
  const columns = db.prepare("PRAGMA table_info(grid_quality_samples)").all();
  assert.deepEqual(columns.map(({ name }) => name), ["device_sn", "sampled_at", ...Object.keys(expected), "source"]);
  assert.deepEqual(columns.filter(({ pk }) => pk).map(({ name }) => name), ["device_sn", "sampled_at"]);
  for (const column of columns.filter(({ name }) => name in expected)) {
    assert.equal(column.type, "REAL");
    assert.equal(column.notnull, 0);
  }
  db.prepare("INSERT INTO grid_quality_samples (device_sn, sampled_at) VALUES (?, ?)").run("nullable", "2026-01-01T00:00:00.000Z");
  const [row] = store.readRecentGridQualitySamples("nullable");
  assert.equal(row.source, "modbus");
  assert.equal(row.grid_voltage_r_v, null);
});

test("persists one same-time diagnostic snapshot using one connection, preserving live/daily data and API shape", async () => {
  const snapshot = await sampleAndStoreModbusData();
  assert.equal(connections, 1);
  assert.equal(closes, 1);
  assert.deepEqual(reads, foxEssH3SmartProfile.readRanges);
  const [row] = store.readRecentGridQualitySamples("grid-quality-test");
  assert.equal(row.sampled_at, snapshot.sampledAt);
  for (const [key, value] of Object.entries(expected)) {
    assert.ok(Math.abs(row[key] - value) < 1e-10, `${key}: ${row[key]} != ${value}`);
  }
  const live = store.readLiveSamplesSince("grid-quality-test", snapshot.sampledAt);
  assert.equal(live.length, 1);
  assert.equal(live[0].sampled_at, row.sampled_at);
  assert.equal(live[0].grid_import_kw, 1.23);
  assert.equal(live[0].grid_export_kw, 0);
  const now = new Date();
  assert.equal(store.readDailyEnergyRowsByMonth("grid-quality-test", now.getFullYear(), now.getMonth() + 1).length, 1);
  const dashboard = await getModbusDashboardData(now.getFullYear(), now.getMonth() + 1);
  assert.equal("gridQuality" in dashboard, false);
  assert.equal("gridQuality" in dashboard.live, false);
  assert.equal(store.readRecentGridQualitySamples("grid-quality-test").length, 1);
  assert.equal(store.readLiveSamplesSince("grid-quality-test", "").length, 1);
});

test("upserts duplicates and reads bounded recent rows by device, preserving nulls and precision", async () => {
  const snapshot = await sampleAndStoreModbusData();
  const sample = { ...snapshot.gridQuality, sampledAt: "2026-01-01T00:00:00.000Z" };
  store.saveGridQualitySample("upsert", sample);
  store.saveGridQualitySample("upsert", { ...sample, gridMeterPowerRKw: -0.0003, inverterCurrentRA: null });
  const [row] = store.readRecentGridQualitySamples("upsert");
  assert.equal(store.readRecentGridQualitySamples("upsert").length, 1);
  assert.equal(row.grid_meter_power_r_kw, -0.0003);
  assert.equal(row.inverter_current_r_a, null);
  store.saveGridQualitySample("upsert", { ...sample, sampledAt: "2026-01-02T00:00:00.000Z" });
  assert.equal(store.readRecentGridQualitySamples("upsert", 1)[0].sampled_at, "2026-01-02T00:00:00.000Z");
  assert.equal(store.readRecentGridQualitySamples("absent").length, 0);
  assert.throws(() => store.readRecentGridQualitySamples("upsert", -1));
});
