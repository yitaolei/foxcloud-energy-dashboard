import assert from "node:assert/strict";
import { describe, it } from "node:test";

process.env.FOXCLOUD_DEMO_MODE = "true";

const { getSqliteBackupStatus } = await import("../dist/services/sqliteBackup.js");

describe("SQLite backup status", () => {
  it("exposes scheduler configuration and last-run state for health checks", () => {
    const status = getSqliteBackupStatus();

    assert.equal(typeof status.enabled, "boolean");
    assert.equal(typeof status.databasePath, "string");
    assert.equal(typeof status.backupDir, "string");
    assert.equal(Number.isInteger(status.intervalMs), true);
    assert.equal(Number.isInteger(status.retentionCount), true);
    assert.equal(status.schedulerStarted, false);
    assert.equal(status.nextRunAt, null);
    assert.equal(status.isRunning, false);
    assert.equal(status.lastAttemptAt, null);
    assert.equal(status.lastSuccessAt, null);
    assert.equal(status.lastSuccessPath, null);
    assert.equal(status.lastFailureAt, null);
    assert.equal(status.lastFailureMessage, null);
  });
});
