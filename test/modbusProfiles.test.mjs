import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  foxEssH3SmartProfile,
  getModbusProfile,
  listModbusProfileIds,
  resolveModbusProfile,
} from "../dist/services/modbus/profiles.js";

describe("Modbus register profiles", () => {
  it("selects the FoxESS H3 Smart profile by label or id", () => {
    assert.equal(getModbusProfile("FoxESS H3 Smart").id, "foxess-h3-smart");
    assert.equal(getModbusProfile("foxess-h3-smart").label, "FoxESS H3 Smart");
    assert.equal(getModbusProfile(" FOXESS-H3-SMART ").id, "foxess-h3-smart");
  });

  it("falls back to the FoxESS H3 Smart profile for unknown models", () => {
    assert.equal(getModbusProfile("Unknown inverter"), foxEssH3SmartProfile);
    assert.equal(getModbusProfile(undefined), foxEssH3SmartProfile);
  });

  it("reports whether a profile selection matched or fell back", () => {
    assert.deepEqual(resolveModbusProfile("foxess-h3-smart"), {
      requestedProfile: "foxess-h3-smart",
      activeProfile: foxEssH3SmartProfile,
      matched: true,
    });

    assert.deepEqual(resolveModbusProfile("Unknown inverter"), {
      requestedProfile: "Unknown inverter",
      activeProfile: foxEssH3SmartProfile,
      matched: false,
    });
  });

  it("keeps expected read ranges for the current FoxESS H3 Smart map", () => {
    assert.deepEqual(foxEssH3SmartProfile.readRanges, [
      { startAddress: 37609, count: 28 },
      { startAddress: 38814, count: 26 },
      { startAddress: 39063, count: 80 },
      { startAddress: 39219, count: 20 },
      { startAddress: 39248, count: 6 },
      { startAddress: 39279, count: 8 },
      { startAddress: 39601, count: 32 },
    ]);
  });

  it("lists available profile ids for health checks and docs", () => {
    assert.deepEqual(listModbusProfileIds(), ["foxess-h3-smart"]);
  });

  it("documents key FoxESS H3 Smart register addresses", () => {
    assert.deepEqual(foxEssH3SmartProfile.live.gridCtPower, {
      addresses: [38815, 38814],
      scale: 0.0001,
    });
    assert.deepEqual(foxEssH3SmartProfile.live.batterySoc, {
      addresses: [37612],
    });
    assert.deepEqual(foxEssH3SmartProfile.daily.solarEnergyToday, {
      addresses: [39604, 39603],
      scale: 0.01,
    });
    assert.equal(foxEssH3SmartProfile.live.pvPowerInputs.length, 4);
  });
});
