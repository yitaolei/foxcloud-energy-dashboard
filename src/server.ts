import express, { type NextFunction, type Request, type Response } from "express";
import os from "node:os";
import path from "node:path";

import { env } from "./config/env.js";
import { hasMatchingCredential, parseBasicAuthHeader } from "./lib/basicAuth.js";
import { FoxCloudApiError } from "./lib/foxcloudClient.js";
import { BadRequestError, parseMonth, parseRange, parseYear } from "./lib/requestParams.js";
import {
  getDashboardData,
  getEnergyRangeData,
  getSavingsOverviewData,
  previewRebuildEnergyRangeCache,
  rebuildEnergyRangeCache,
} from "./services/dashboardService.js";
import { listModbusProfileIds, resolveModbusProfile } from "./services/modbus/profiles.js";
import { startModbusSampler } from "./services/modbusSampler.js";
import { clearSolarForecastCache, getSolarForecast } from "./services/solarForecastService.js";
import { getSqliteBackupStatus, startSqliteBackupScheduler } from "./services/sqliteBackup.js";
import {
  getElectricityTariff,
  saveElectricityTariff,
  TariffValidationError,
} from "./services/tariffService.js";
import { clearWeatherCache, getWeatherForecast } from "./services/weatherService.js";
import {
  getWeatherSettings,
  saveWeatherSettings,
  WeatherSettingsValidationError,
} from "./services/weatherSettingsService.js";

const app = express();
const publicDir = path.resolve(process.cwd(), "public");
const chartJsDir = path.resolve(process.cwd(), "node_modules/chart.js/dist");
const startedAt = new Date();

const isModbusConnectionError = (message: string): boolean => {
  const normalized = message.toLowerCase();
  return env.dataProvider === "modbus" && (
    normalized.includes("tcp") ||
    normalized.includes("timed out") ||
    normalized.includes("timeout") ||
    normalized.includes("econnrefused") ||
    normalized.includes("ehostunreach") ||
    normalized.includes("enetunreach")
  );
};

const buildModbusDiagnostic = (message: string) => {
  if (!isModbusConnectionError(message)) {
    return null;
  }

  return {
    kind: "modbus_connection",
    target: `${env.modbus.host || "missing-host"}:${env.modbus.port}`,
    host: env.modbus.host,
    port: env.modbus.port,
    unitId: env.modbus.unitId,
    timeoutMs: env.modbus.timeoutMs,
    profile: env.modbus.profile,
    readOnly: env.modbus.readOnly,
  };
};

const getAppVersion = (): string => {
  return process.env.APP_VERSION?.trim() || process.env.npm_package_version || "0.1.0";
};

const getGitSha = (): string | null => {
  const gitSha = process.env.GIT_SHA?.trim();

  return gitSha || null;
};

const getLanUrls = (): string[] => {
  const interfaces = Object.values(os.networkInterfaces()).flat();

  return interfaces
    .filter((item): item is os.NetworkInterfaceInfo => Boolean(item))
    .filter((item) => item.family === "IPv4" && !item.internal)
    .map((item) => `http://${item.address}:${env.port}`);
};

const requireDashboardAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!env.dashboardAuth.enabled) {
    next();
    return;
  }

  const credential = parseBasicAuthHeader(req.headers.authorization);

  if (credential) {
    if (hasMatchingCredential(env.dashboardAuth.users, credential.username, credential.password)) {
      next();
      return;
    }
  }

  res.setHeader("WWW-Authenticate", 'Basic realm="FoxCloud Dashboard"');
  res.status(401).send("Authentication required.");
};

app.use(express.json());

app.get("/api/livez", (_req, res) => {
  res.json({
    ok: true,
    timestamp: new Date().toISOString(),
  });
});

app.use(requireDashboardAuth);
app.use(express.static(publicDir));
app.use("/vendor/chartjs", express.static(chartJsDir));

app.get("/api/health", (_req, res) => {
  const modbusProfile = resolveModbusProfile(env.modbus.profile);

  res.json({
    ok: true,
    timestamp: new Date().toISOString(),
    version: getAppVersion(),
    gitSha: getGitSha(),
    startedAt: startedAt.toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
    dataProvider: env.dataProvider,
    baseUrl: env.foxCloud.baseUrl,
    dashboardTimeZone: env.dashboardTimeZone,
    demoMode: env.foxCloud.demoMode,
    hasConfiguredDeviceSn: Boolean(env.foxCloud.deviceSn),
    usingApiKeyAuth: env.dataProvider === "foxcloud",
    modbusConfigured: env.dataProvider === "modbus" && Boolean(env.modbus.host),
    modbusTarget: env.dataProvider === "modbus" && env.modbus.host
      ? `${env.modbus.host}:${env.modbus.port}`
      : null,
    modbusTimeoutMs: env.modbus.timeoutMs,
    modbusReadOnly: env.modbus.readOnly,
    configuredModbusProfile: env.modbus.profile,
    activeModbusProfile: modbusProfile.activeProfile.id,
    modbusProfileMatched: modbusProfile.matched,
    availableModbusProfiles: listModbusProfileIds(),
    sqliteBackup: getSqliteBackupStatus(),
    dashboardAuthEnabled: env.dashboardAuth.enabled,
    dashboardAuthUserCount: env.dashboardAuth.users.length,
  });
});

app.get("/api/dashboard", async (req, res, next) => {
  try {
    const now = new Date();
    const year = parseYear(req.query.year, now.getFullYear());
    const month = parseMonth(req.query.month, now.getMonth() + 1);
    const payload = await getDashboardData(year, month);

    res.json(payload);
  } catch (error) {
    next(error);
  }
});

app.get("/api/energy-range", async (req, res, next) => {
  try {
    const now = new Date();
    const year = parseYear(req.query.year, now.getFullYear());
    const month = parseMonth(req.query.month, now.getMonth() + 1);
    const range = parseRange(req.query.range);
    const payload = await getEnergyRangeData(range, year, month);

    res.json(payload);
  } catch (error) {
    next(error);
  }
});

app.get("/api/savings-overview", async (req, res, next) => {
  try {
    const now = new Date();
    const year = parseYear(req.query.year, now.getFullYear());
    const month = parseMonth(req.query.month, now.getMonth() + 1);
    const payload = await getSavingsOverviewData(year, month);

    res.json(payload);
  } catch (error) {
    next(error);
  }
});

app.get("/api/rebuild-cache/preview", async (req, res, next) => {
  try {
    const now = new Date();
    const year = parseYear(req.query.year, now.getFullYear());
    const month = parseMonth(req.query.month, now.getMonth() + 1);
    const range = parseRange(req.query.range);
    const payload = previewRebuildEnergyRangeCache(range, year, month);

    res.json(payload);
  } catch (error) {
    next(error);
  }
});

app.get("/api/weather", async (_req, res, next) => {
  try {
    const payload = await getWeatherForecast();

    res.json(payload);
  } catch (error) {
    next(error);
  }
});

app.get("/api/solar-forecast", async (_req, res, next) => {
  try {
    const payload = await getSolarForecast();

    res.json(payload);
  } catch (error) {
    next(error);
  }
});

app.get("/api/weather-settings", (_req, res) => {
  res.json({
    settings: getWeatherSettings(),
  });
});

app.put("/api/weather-settings", (req, res, next) => {
  try {
    const settings = saveWeatherSettings(req.body ?? {});
    clearWeatherCache();
    clearSolarForecastCache();

    res.json({ settings });
  } catch (error) {
    next(error);
  }
});

app.get("/api/tariff", (_req, res) => {
  res.json({
    tariff: getElectricityTariff(),
  });
});

app.put("/api/tariff", (req, res, next) => {
  try {
    res.json({
      tariff: saveElectricityTariff(req.body ?? {}),
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/rebuild-cache", async (req, res, next) => {
  try {
    const now = new Date();
    const year = parseYear(req.body?.year, now.getFullYear());
    const month = parseMonth(req.body?.month, now.getMonth() + 1);
    const range = parseRange(req.body?.range);
    const payload = await rebuildEnergyRangeCache(range, year, month);

    res.json(payload);
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    res.status(404).json({ error: "API endpoint not found." });
    return;
  }

  res.sendFile(path.join(publicDir, "index.html"));
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof FoxCloudApiError) {
    res.status(error.statusCode).json({
      error: error.message,
      errno: error.errno ?? null,
    });
    return;
  }

  if (error instanceof BadRequestError) {
    res.status(400).json({
      error: error.message,
    });
    return;
  }

  if (error instanceof TariffValidationError) {
    res.status(400).json({
      error: error.message,
    });
    return;
  }

  if (error instanceof WeatherSettingsValidationError) {
    res.status(400).json({
      error: error.message,
    });
    return;
  }

  const message = error instanceof Error ? error.message : "Unknown server error";
  const diagnostic = buildModbusDiagnostic(message);

  res.status(500).json({
    error: message,
    diagnostic,
  });
});

const server = app.listen(env.port, env.host, () => {
  console.log(`FoxCloud dashboard running locally at http://localhost:${env.port}`);

  if (env.host === "0.0.0.0" || env.host === "::") {
    const lanUrls = getLanUrls();

    if (lanUrls.length > 0) {
      console.log("LAN access URLs:");
      lanUrls.forEach((url) => console.log(`- ${url}`));
    }
  } else {
    console.log(`Listening on host ${env.host}`);
  }

  if (!env.dashboardAuth.enabled) {
    console.warn(
      "DASHBOARD_USERNAME and DASHBOARD_PASSWORD are not set. Do not expose this dashboard to the Internet without authentication.",
    );
  }

  if (env.foxCloud.demoMode) {
    console.log("FoxCloud demo mode is enabled. The dashboard is using sample data.");
  }

  startSqliteBackupScheduler();
  startModbusSampler();
});

server.on("error", (error) => {
  console.error("FoxCloud dashboard server failed:", error);
});
