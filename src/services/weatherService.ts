import { env } from "../config/env.js";
import { getSolarOutlook, getWeatherConditionKey } from "../lib/weatherOutlook.js";
import type { WeatherSettings } from "../lib/weatherSettings.js";
import type { WeatherPayload } from "../types/foxcloud.js";

import { getWeatherSettings } from "./weatherSettingsService.js";

interface WeatherLocation {
  latitude: number;
  longitude: number;
  timezone: string;
  name?: string | null;
  countryCode?: string | null;
  source: "coordinates" | "postcode";
}

interface OpenMeteoGeocodingResponse {
  results?: Array<{
    name?: string;
    latitude?: number;
    longitude?: number;
    country_code?: string;
    timezone?: string;
    admin1?: string;
  }>;
}

interface ZippopotamusResponse {
  "post code"?: string;
  country?: string;
  "country abbreviation"?: string;
  places?: Array<{
    "place name"?: string;
    longitude?: string;
    latitude?: string;
    state?: string;
    "state abbreviation"?: string;
  }>;
}

interface OpenMeteoResponse {
  timezone?: string;
  current?: {
    time?: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    weather_code?: number;
    cloud_cover?: number;
    precipitation?: number;
  };
  hourly?: {
    time?: string[];
    precipitation_probability?: number[];
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    cloud_cover_mean?: number[];
    precipitation_sum?: number[];
    precipitation_probability_max?: number[];
  };
}

let cachedWeather: { expiresAt: number; key: string; payload: WeatherPayload } | null = null;
let cachedLocation: { key: string; location: WeatherLocation | null } | null = null;

const round = (value: number | null | undefined, decimals = 1): number | null => {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) {
    return null;
  }

  return Number(Number(value).toFixed(decimals));
};

const getSettingsKey = (settings: WeatherSettings): string => JSON.stringify(settings);

const hasCoordinates = (settings: WeatherSettings): boolean =>
  settings.latitude !== null && settings.longitude !== null;

const resolveWeatherLocation = async (settings: WeatherSettings): Promise<WeatherLocation | null> => {
  const settingsKey = getSettingsKey(settings);

  if (hasCoordinates(settings)) {
    return {
      latitude: settings.latitude ?? 0,
      longitude: settings.longitude ?? 0,
      timezone: settings.timezone,
      name: settings.locationName || null,
      countryCode: settings.countryCode || null,
      source: "coordinates",
    };
  }

  if (cachedLocation && cachedLocation.key === settingsKey) {
    return cachedLocation.location;
  }

  if (!settings.postcode) {
    return null;
  }

  const params = new URLSearchParams({
    name: settings.postcode,
    count: "1",
    language: "en",
    format: "json",
  });

  if (settings.countryCode) {
    params.set("countryCode", settings.countryCode);
  }
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`, {
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Open-Meteo geocoding request failed with HTTP ${response.status}`);
  }

  const geocoding = (await response.json()) as OpenMeteoGeocodingResponse;
  const result = geocoding.results?.find(
    (item) => Number.isFinite(item.latitude) && Number.isFinite(item.longitude),
  );

  if (result && Number.isFinite(result.latitude) && Number.isFinite(result.longitude)) {
    const location = {
      latitude: result.latitude ?? 0,
      longitude: result.longitude ?? 0,
      timezone: result.timezone ?? settings.timezone,
      name: settings.locationName || [result.name, result.admin1].filter(Boolean).join(", ") || settings.postcode,
      countryCode: result.country_code ?? settings.countryCode ?? null,
      source: "postcode",
    } satisfies WeatherLocation;

    cachedLocation = { key: settingsKey, location };

    return location;
  }

  cachedLocation = {
    key: settingsKey,
    location: await resolvePostcodeWithZippopotamus(settings),
  };

  return cachedLocation.location;
};

const resolvePostcodeWithZippopotamus = async (
  settings: WeatherSettings,
): Promise<WeatherLocation | null> => {
  if (!settings.countryCode) {
    return null;
  }

  const response = await fetch(
    `https://api.zippopotam.us/${encodeURIComponent(settings.countryCode)}/${encodeURIComponent(settings.postcode)}`,
    {
      headers: {
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const postcode = (await response.json()) as ZippopotamusResponse;
  const places = postcode.places ?? [];
  const coordinates = places
    .map((place) => ({
      latitude: Number(place.latitude),
      longitude: Number(place.longitude),
      name: place["place name"],
      state: place.state,
    }))
    .filter((place) => Number.isFinite(place.latitude) && Number.isFinite(place.longitude));

  if (coordinates.length === 0) {
    return null;
  }

  const latitude = coordinates.reduce((total, place) => total + place.latitude, 0) / coordinates.length;
  const longitude = coordinates.reduce((total, place) => total + place.longitude, 0) / coordinates.length;
  const first = coordinates[0];

  return {
    latitude,
    longitude,
    timezone: settings.timezone,
    name: settings.locationName || [first?.name, first?.state].filter(Boolean).join(", ") || settings.postcode,
    countryCode: postcode["country abbreviation"] ?? settings.countryCode,
    source: "postcode",
  };
};

const buildOpenMeteoUrl = (location: WeatherLocation, settings: WeatherSettings): string => {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: "temperature_2m,apparent_temperature,weather_code,cloud_cover,precipitation",
    hourly: "precipitation_probability",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,cloud_cover_mean,precipitation_sum,precipitation_probability_max",
    timezone: location.timezone || settings.timezone || "auto",
    forecast_days: "5",
  });

  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
};

const getCurrentPrecipitationProbability = (weather: OpenMeteoResponse): number | null => {
  const currentTime = weather.current?.time;
  const times = weather.hourly?.time ?? [];
  const values = weather.hourly?.precipitation_probability ?? [];

  if (!currentTime || times.length === 0 || values.length === 0) {
    return null;
  }

  const exactIndex = times.indexOf(currentTime);
  const index = exactIndex >= 0
    ? exactIndex
    : times.findIndex((time) => new Date(time).getTime() >= new Date(currentTime).getTime());

  return index >= 0 ? round(values[index], 0) : null;
};

const normalizeOpenMeteoResponse = (
  weather: OpenMeteoResponse,
  location: WeatherLocation,
): WeatherPayload => {
  const weatherCode = weather.current?.weather_code ?? null;
  const cloudCover = round(weather.current?.cloud_cover, 0);
  const precipitation = round(weather.current?.precipitation, 1);
  const precipitationProbability = getCurrentPrecipitationProbability(weather);
  const current = weather.current
    ? {
        time: weather.current.time ?? null,
        temperatureCelsius: round(weather.current.temperature_2m, 1),
        apparentTemperatureCelsius: round(weather.current.apparent_temperature, 1),
        weatherCode,
        conditionKey: getWeatherConditionKey(weatherCode),
        cloudCoverPercent: cloudCover,
        precipitationMm: precipitation,
        precipitationProbabilityPercent: precipitationProbability,
        solarOutlook: getSolarOutlook(
          weatherCode,
          cloudCover,
          precipitationProbability,
          precipitation,
        ),
      }
    : null;

  const dates = weather.daily?.time ?? [];
  const daily = dates.map((date, index) => {
    const dailyCode = weather.daily?.weather_code?.[index] ?? null;
    const dailyPrecipitation = round(weather.daily?.precipitation_sum?.[index], 1);
    const dailyRainProbability = round(weather.daily?.precipitation_probability_max?.[index], 0);

    return {
      date,
      weatherCode: dailyCode,
      conditionKey: getWeatherConditionKey(dailyCode),
      temperatureMaxCelsius: round(weather.daily?.temperature_2m_max?.[index], 1),
      temperatureMinCelsius: round(weather.daily?.temperature_2m_min?.[index], 1),
      cloudCoverMeanPercent: round(weather.daily?.cloud_cover_mean?.[index], 0),
      precipitationSumMm: dailyPrecipitation,
      precipitationProbabilityMaxPercent: dailyRainProbability,
      solarOutlook: getSolarOutlook(
        dailyCode,
        round(weather.daily?.cloud_cover_mean?.[index], 0),
        dailyRainProbability,
        dailyPrecipitation,
      ),
    };
  });

  return {
    enabled: true,
    source: "open-meteo",
    generatedAt: new Date().toISOString(),
    location: {
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: weather.timezone ?? location.timezone,
      name: location.name ?? null,
      countryCode: location.countryCode ?? null,
      source: location.source,
    },
    current,
    daily,
    warning: null,
  };
};

export async function getWeatherForecast(): Promise<WeatherPayload> {
  const settings = getWeatherSettings();
  const settingsKey = getSettingsKey(settings);

  if (!settings.enabled) {
    return {
      enabled: false,
      source: "disabled",
      generatedAt: new Date().toISOString(),
      location: null,
      current: null,
      daily: [],
      warning: "Weather is disabled. Set WEATHER_ENABLED=true and configure latitude/longitude to enable it.",
    };
  }

  if (settings.provider !== "open-meteo") {
    throw new Error("WEATHER_PROVIDER currently supports only open-meteo.");
  }

  if (cachedWeather && cachedWeather.key === settingsKey && cachedWeather.expiresAt > Date.now()) {
    return cachedWeather.payload;
  }

  const location = await resolveWeatherLocation(settings);

  if (!location) {
    return {
      enabled: false,
      source: "disabled",
      generatedAt: new Date().toISOString(),
      location: null,
      current: null,
      daily: [],
      warning: "Weather is enabled but no location is configured. Set WEATHER_POSTCODE, or set WEATHER_LATITUDE and WEATHER_LONGITUDE.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.weather.timeoutMs);

  try {
    const response = await fetch(buildOpenMeteoUrl(location, settings), {
      signal: controller.signal,
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Open-Meteo request failed with HTTP ${response.status}`);
    }

    const payload = normalizeOpenMeteoResponse((await response.json()) as OpenMeteoResponse, location);
    cachedWeather = {
      expiresAt: Date.now() + env.weather.cacheTtlMs,
      key: settingsKey,
      payload,
    };

    return payload;
  } finally {
    clearTimeout(timeout);
  }
}

export function clearWeatherCache(): void {
  cachedWeather = null;
  cachedLocation = null;
}
