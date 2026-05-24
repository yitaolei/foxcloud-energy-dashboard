import fs from "node:fs/promises";
import path from "node:path";

import { env } from "../config/env.js";
import { backupDatabase, getDatabasePath } from "./sqliteStore.js";

let isBackingUp = false;
let backupInterval: ReturnType<typeof setInterval> | null = null;
let nextRunAt: string | null = null;

const backupFilePrefix = "foxcloud-dashboard-backup-";

export interface SqliteBackupStatus {
  enabled: boolean;
  databasePath: string;
  backupDir: string;
  intervalMs: number;
  retentionCount: number;
  schedulerStarted: boolean;
  nextRunAt: string | null;
  isRunning: boolean;
  lastAttemptAt: string | null;
  lastSuccessAt: string | null;
  lastSuccessPath: string | null;
  lastFailureAt: string | null;
  lastFailureMessage: string | null;
}

const backupStatus: Pick<
  SqliteBackupStatus,
  "lastAttemptAt" | "lastSuccessAt" | "lastSuccessPath" | "lastFailureAt" | "lastFailureMessage"
> = {
  lastAttemptAt: null,
  lastSuccessAt: null,
  lastSuccessPath: null,
  lastFailureAt: null,
  lastFailureMessage: null,
};

const toTimestamp = (date: Date): string =>
  date.toISOString().replace(/[:.]/g, "-");

const getBackupDir = (): string =>
  path.isAbsolute(env.sqliteBackup.dir)
    ? env.sqliteBackup.dir
    : path.resolve(process.cwd(), env.sqliteBackup.dir);

const pruneOldBackups = async (backupDir: string): Promise<void> => {
  if (env.sqliteBackup.retentionCount === 0) {
    return;
  }

  const entries = await fs.readdir(backupDir);
  const backupFiles = entries
    .filter((entry) => entry.startsWith(backupFilePrefix) && entry.endsWith(".sqlite"))
    .sort()
    .reverse();
  const filesToDelete = backupFiles.slice(env.sqliteBackup.retentionCount);

  await Promise.all(
    filesToDelete.map((fileName) => fs.rm(path.join(backupDir, fileName), { force: true })),
  );
};

const runBackup = async (reason: string): Promise<void> => {
  if (isBackingUp) {
    return;
  }

  isBackingUp = true;
  backupStatus.lastAttemptAt = new Date().toISOString();

  try {
    const backupDir = getBackupDir();
    await fs.mkdir(backupDir, { recursive: true });

    const backupPath = path.join(backupDir, `${backupFilePrefix}${toTimestamp(new Date())}.sqlite`);
    await backupDatabase(backupPath);
    await pruneOldBackups(backupDir);

    backupStatus.lastSuccessAt = new Date().toISOString();
    backupStatus.lastSuccessPath = backupPath;
    backupStatus.lastFailureMessage = null;
    console.log(`SQLite backup saved (${reason}): ${backupPath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown SQLite backup error";
    backupStatus.lastFailureAt = new Date().toISOString();
    backupStatus.lastFailureMessage = message;
    console.warn(`SQLite backup failed (${reason}): ${message}`);
  } finally {
    isBackingUp = false;
  }
};

export function getSqliteBackupStatus(): SqliteBackupStatus {
  return {
    enabled: env.sqliteBackup.enabled,
    databasePath: getDatabasePath(),
    backupDir: getBackupDir(),
    intervalMs: env.sqliteBackup.intervalMs,
    retentionCount: env.sqliteBackup.retentionCount,
    schedulerStarted: backupInterval !== null,
    nextRunAt,
    isRunning: isBackingUp,
    ...backupStatus,
  };
}

const setNextRunAt = (): void => {
  nextRunAt = new Date(Date.now() + env.sqliteBackup.intervalMs).toISOString();
};

export function startSqliteBackupScheduler(): void {
  if (!env.sqliteBackup.enabled) {
    console.log("SQLite backup scheduler is disabled.");
    return;
  }

  if (backupInterval) {
    console.log("SQLite backup scheduler is already running.");
    return;
  }

  console.log(
    `SQLite backup scheduler enabled: ${getDatabasePath()} -> ${getBackupDir()} every ${Math.round(
      env.sqliteBackup.intervalMs / 60000,
    )} minutes.`,
  );

  void runBackup("startup");
  setNextRunAt();
  backupInterval = setInterval(() => {
    setNextRunAt();
    void runBackup("interval");
  }, env.sqliteBackup.intervalMs);
  backupInterval.unref();
}
