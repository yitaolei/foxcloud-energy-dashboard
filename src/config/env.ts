import "dotenv/config";

const parsePort = (value: string | undefined): number => {
  const parsed = Number(value ?? "3000");

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error("PORT must be a positive integer.");
  }

  return parsed;
};

const parseHost = (value: string | undefined): string => {
  return value?.trim() || "0.0.0.0";
};

const parseBoolean = (value: string | undefined): boolean => {
  return ["1", "true", "yes", "on"].includes((value ?? "").trim().toLowerCase());
};

const parseTimeout = (value: string | undefined): number => {
  const parsed = Number(value ?? "15000");

  if (!Number.isInteger(parsed) || parsed < 1000) {
    throw new Error("FOXCLOUD_TIMEOUT_MS must be an integer greater than or equal to 1000.");
  }

  return parsed;
};

const parsePositiveInteger = (
  value: string | undefined,
  fallback: number,
  envName: string,
): number => {
  const parsed = Number(value ?? String(fallback));

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${envName} must be a positive integer.`);
  }

  return parsed;
};

const parseNonNegativeInteger = (
  value: string | undefined,
  fallback: number,
  envName: string,
): number => {
  const parsed = Number(value ?? String(fallback));

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${envName} must be a non-negative integer.`);
  }

  return parsed;
};

const parseOptionalNumber = (
  value: string | undefined,
  envName: string,
  min: number,
  max: number,
): number | null => {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  const parsed = Number(trimmed);

  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    throw new Error(`${envName} must be a number between ${min} and ${max}.`);
  }

  return parsed;
};

const parseNonNegativeNumber = (
  value: string | undefined,
  fallback: number,
  envName: string,
): number => {
  const parsed = Number(value ?? String(fallback));

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${envName} must be a non-negative number.`);
  }

  return parsed;
};

const parseClockTime = (value: string | undefined, fallback: string, envName: string): string => {
  const normalized = (value ?? fallback).trim();

  if (!/^\d{1,2}:\d{2}$/.test(normalized)) {
    throw new Error(`${envName} must use HH:mm format.`);
  }

  const [hours, minutes] = normalized.split(":").map(Number);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error(`${envName} must be a valid 24-hour time.`);
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const parseUrl = (value: string | undefined, fallback: string, envName: string): string => {
  const baseUrl = value?.trim() || fallback;

  try {
    return new URL(baseUrl).toString().replace(/\/$/, "");
  } catch {
    throw new Error(`${envName} must be a valid URL.`);
  }
};

const parseBaseUrl = (value: string | undefined): string =>
  parseUrl(value, "https://www.foxesscloud.com", "FOXCLOUD_BASE_URL");

const parseOptionalIsoPeriod = (value: string | undefined, fallback: string, envName: string): string => {
  const normalized = (value ?? fallback).trim().toUpperCase();

  if (!/^PT(?=.*(?:H|M))(?:[1-9]\d*H)?(?:[1-9]\d*M)?$/.test(normalized)) {
    throw new Error(`${envName} must be an ISO 8601 time period such as PT30M or PT1H.`);
  }

  return normalized;
};

interface DashboardCredential {
  username: string;
  password: string;
}

const parseDashboardUsers = (value: string | undefined): DashboardCredential[] => {
  return (value ?? "")
    .split(/[,\n]/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const separatorIndex = entry.search(/[:=]/);

      if (separatorIndex <= 0) {
        throw new Error(
          "DASHBOARD_USERS entries must use username=password or username:password.",
        );
      }

      return {
        username: entry.slice(0, separatorIndex).trim(),
        password: entry.slice(separatorIndex + 1).trim(),
      };
    })
    .filter((credential) => credential.username && credential.password);
};

const dashboardTimeZone = process.env.DASHBOARD_TIME_ZONE?.trim() || "Australia/Sydney";
process.env.TZ = dashboardTimeZone;

const dataProvider = (process.env.DATA_PROVIDER?.trim().toLowerCase() || "foxcloud") as
  | "foxcloud"
  | "modbus";
const demoMode = parseBoolean(process.env.FOXCLOUD_DEMO_MODE);
const apiKey = process.env.FOXCLOUD_API_KEY?.trim();
const foxCloudDeviceSn = process.env.FOXCLOUD_DEVICE_SN?.trim() || "";
const dashboardUsername = process.env.DASHBOARD_USERNAME?.trim() || "";
const dashboardPassword = process.env.DASHBOARD_PASSWORD?.trim() || "";

if (!["foxcloud", "modbus"].includes(dataProvider)) {
  throw new Error("DATA_PROVIDER must be either foxcloud or modbus.");
}

if (!apiKey && !demoMode && dataProvider === "foxcloud") {
  throw new Error(
    "FOXCLOUD_API_KEY is missing. Add it to your local .env file before starting the server, or set FOXCLOUD_DEMO_MODE=true.",
  );
}

const legacyDashboardCredential =
  dashboardUsername && dashboardPassword
    ? [
        {
          username: dashboardUsername,
          password: dashboardPassword,
        },
      ]
    : [];

const dashboardUsers = [
  ...legacyDashboardCredential,
  ...parseDashboardUsers(process.env.DASHBOARD_USERS),
];

export const env = {
  port: parsePort(process.env.PORT),
  host: parseHost(process.env.HOST),
  dashboardTimeZone,
  dataProvider,
  dashboardAuth: {
    users: dashboardUsers,
    enabled: dashboardUsers.length > 0,
  },
  foxCloud: {
    demoMode,
    apiKey: apiKey ?? "",
    baseUrl: parseBaseUrl(process.env.FOXCLOUD_BASE_URL),
    username: process.env.FOXCLOUD_USERNAME?.trim() || "",
    password: process.env.FOXCLOUD_PASSWORD?.trim() || "",
    deviceSn: foxCloudDeviceSn,
    timeoutMs: parseTimeout(process.env.FOXCLOUD_TIMEOUT_MS),
  },
  modbus: {
    host: process.env.MODBUS_HOST?.trim() || "",
    port: parsePositiveInteger(process.env.MODBUS_PORT, 502, "MODBUS_PORT"),
    unitId: parsePositiveInteger(process.env.MODBUS_UNIT_ID, 1, "MODBUS_UNIT_ID"),
    timeoutMs: parsePositiveInteger(process.env.MODBUS_TIMEOUT_MS, 3000, "MODBUS_TIMEOUT_MS"),
    sampleIntervalMs: parsePositiveInteger(
      process.env.MODBUS_SAMPLE_INTERVAL_MS,
      60_000,
      "MODBUS_SAMPLE_INTERVAL_MS",
    ),
    deviceId: process.env.MODBUS_DEVICE_ID?.trim() || foxCloudDeviceSn || "local-modbus-inverter",
    stationName: process.env.MODBUS_STATION_NAME?.trim() || "Local Modbus inverter",
    profile:
      process.env.MODBUS_PROFILE?.trim() ||
      process.env.MODBUS_INVERTER_MODEL?.trim() ||
      "foxess-h3-smart",
    inverterModel: process.env.MODBUS_INVERTER_MODEL?.trim() || "FoxESS H3 Smart",
    readOnly: !["0", "false", "no", "off"].includes(
      (process.env.MODBUS_READ_ONLY ?? "true").trim().toLowerCase(),
    ),
  },
  sqliteBackup: {
    enabled: !["0", "false", "no", "off"].includes(
      (process.env.SQLITE_BACKUP_ENABLED ?? "true").trim().toLowerCase(),
    ),
    dir: process.env.SQLITE_BACKUP_DIR?.trim() || "data/backups",
    intervalMs: parsePositiveInteger(
      process.env.SQLITE_BACKUP_INTERVAL_MS,
      60 * 60 * 1000,
      "SQLITE_BACKUP_INTERVAL_MS",
    ),
    retentionCount: parseNonNegativeInteger(
      process.env.SQLITE_BACKUP_RETENTION_COUNT,
      72,
      "SQLITE_BACKUP_RETENTION_COUNT",
    ),
  },
  weather: {
    enabled: parseBoolean(process.env.WEATHER_ENABLED),
    provider: process.env.WEATHER_PROVIDER?.trim() || "open-meteo",
    locationName: process.env.WEATHER_LOCATION_NAME?.trim() || "",
    latitude: parseOptionalNumber(process.env.WEATHER_LATITUDE, "WEATHER_LATITUDE", -90, 90),
    longitude: parseOptionalNumber(process.env.WEATHER_LONGITUDE, "WEATHER_LONGITUDE", -180, 180),
    postcode: process.env.WEATHER_POSTCODE?.trim() || "",
    countryCode: process.env.WEATHER_COUNTRY_CODE?.trim().toUpperCase() || "",
    timezone: process.env.WEATHER_TIMEZONE?.trim() || dashboardTimeZone,
    cacheTtlMs: parsePositiveInteger(
      process.env.WEATHER_CACHE_TTL_MS,
      30 * 60 * 1000,
      "WEATHER_CACHE_TTL_MS",
    ),
    timeoutMs: parsePositiveInteger(
      process.env.WEATHER_TIMEOUT_MS,
      10_000,
      "WEATHER_TIMEOUT_MS",
    ),
  },
  solcast: {
    enabled: parseBoolean(process.env.SOLCAST_ENABLED),
    apiKey: process.env.SOLCAST_API_KEY?.trim() || "",
    baseUrl: parseUrl(process.env.SOLCAST_BASE_URL, "https://api.solcast.com.au", "SOLCAST_BASE_URL"),
    capacityKw: parseOptionalNumber(process.env.SOLCAST_CAPACITY_KW, "SOLCAST_CAPACITY_KW", 0.1, 100),
    azimuthDegrees: parseOptionalNumber(process.env.SOLCAST_AZIMUTH_DEGREES, "SOLCAST_AZIMUTH_DEGREES", -180, 180),
    tiltDegrees: parseOptionalNumber(process.env.SOLCAST_TILT_DEGREES, "SOLCAST_TILT_DEGREES", 0, 90),
    lossFactor: parseOptionalNumber(process.env.SOLCAST_LOSS_FACTOR, "SOLCAST_LOSS_FACTOR", 0, 1) ?? 0.9,
    period: parseOptionalIsoPeriod(process.env.SOLCAST_PERIOD, "PT30M", "SOLCAST_PERIOD"),
    hours: parsePositiveInteger(process.env.SOLCAST_HOURS, 24, "SOLCAST_HOURS"),
    cacheTtlMs: parsePositiveInteger(
      process.env.SOLCAST_CACHE_TTL_MS,
      30 * 60 * 1000,
      "SOLCAST_CACHE_TTL_MS",
    ),
    timeoutMs: parsePositiveInteger(
      process.env.SOLCAST_TIMEOUT_MS,
      10_000,
      "SOLCAST_TIMEOUT_MS",
    ),
  },
  electricity: {
    currency: process.env.ELECTRICITY_CURRENCY?.trim().toUpperCase() || "AUD",
    peakRate: parseNonNegativeNumber(
      process.env.ELECTRICITY_PEAK_RATE,
      0.3,
      "ELECTRICITY_PEAK_RATE",
    ),
    offPeakRate: parseNonNegativeNumber(
      process.env.ELECTRICITY_OFF_PEAK_RATE,
      0.24,
      "ELECTRICITY_OFF_PEAK_RATE",
    ),
    peakStart: parseClockTime(
      process.env.ELECTRICITY_PEAK_START,
      "15:00",
      "ELECTRICITY_PEAK_START",
    ),
    peakEnd: parseClockTime(
      process.env.ELECTRICITY_PEAK_END,
      "20:59",
      "ELECTRICITY_PEAK_END",
    ),
    feedInRate: parseNonNegativeNumber(
      process.env.ELECTRICITY_FEED_IN_RATE,
      0,
      "ELECTRICITY_FEED_IN_RATE",
    ),
  },
};
