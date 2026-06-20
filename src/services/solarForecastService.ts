import { env } from "../config/env.js";
import { normalizeSolcastForecasts, type SolcastRooftopForecastResponse } from "../lib/solcast.js";
import type { SolarForecastPayload } from "../types/foxcloud.js";

import { getWeatherForecast } from "./weatherService.js";

let cachedSolarForecast: { expiresAt: number; key: string; payload: SolarForecastPayload } | null = null;

const disabledPayload = async (warning: string): Promise<SolarForecastPayload> => {
  const weather = await getWeatherForecast().catch(() => null);

  return {
    enabled: false,
    source: "disabled",
    generatedAt: new Date().toISOString(),
    location: weather?.location ?? null,
    points: [],
    warning,
  };
};

const getSolcastCacheKey = (location: NonNullable<SolarForecastPayload["location"]>): string => JSON.stringify({
  latitude: location.latitude,
  longitude: location.longitude,
  capacityKw: env.solcast.capacityKw,
  azimuthDegrees: env.solcast.azimuthDegrees,
  tiltDegrees: env.solcast.tiltDegrees,
  lossFactor: env.solcast.lossFactor,
  period: env.solcast.period,
  hours: env.solcast.hours,
});

const buildSolcastUrl = (location: NonNullable<SolarForecastPayload["location"]>): string => {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    hours: String(env.solcast.hours),
    period: env.solcast.period,
    output_parameters: "pv_power_rooftop",
    capacity: String(env.solcast.capacityKw ?? 1),
    loss_factor: String(env.solcast.lossFactor),
    format: "json",
  });

  if (env.solcast.azimuthDegrees !== null) {
    params.set("azimuth", String(env.solcast.azimuthDegrees));
  }

  if (env.solcast.tiltDegrees !== null) {
    params.set("tilt", String(env.solcast.tiltDegrees));
  }

  return `${env.solcast.baseUrl}/data/forecast/rooftop_pv_power?${params.toString()}`;
};

export async function getSolarForecast(): Promise<SolarForecastPayload> {
  if (!env.solcast.enabled) {
    return disabledPayload("Solcast forecast is disabled. Set SOLCAST_ENABLED=true to enable it.");
  }

  if (!env.solcast.apiKey) {
    return disabledPayload("Solcast is enabled but SOLCAST_API_KEY is missing.");
  }

  if (env.solcast.capacityKw === null) {
    return disabledPayload("Solcast is enabled but SOLCAST_CAPACITY_KW is missing.");
  }

  const weather = await getWeatherForecast();
  const location = weather.location;

  if (!location) {
    return disabledPayload("Solcast needs a configured weather location before it can forecast solar output.");
  }

  const cacheKey = getSolcastCacheKey(location);

  if (cachedSolarForecast && cachedSolarForecast.key === cacheKey && cachedSolarForecast.expiresAt > Date.now()) {
    return cachedSolarForecast.payload;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.solcast.timeoutMs);

  try {
    const response = await fetch(buildSolcastUrl(location), {
      signal: controller.signal,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${env.solcast.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Solcast request failed with HTTP ${response.status}`);
    }

    const points = normalizeSolcastForecasts((await response.json()) as SolcastRooftopForecastResponse);
    const payload = {
      enabled: true,
      source: "solcast",
      generatedAt: new Date().toISOString(),
      location,
      points,
      warning: points.length === 0 ? "Solcast returned no forecast points." : null,
    } satisfies SolarForecastPayload;

    cachedSolarForecast = {
      expiresAt: Date.now() + env.solcast.cacheTtlMs,
      key: cacheKey,
      payload,
    };

    return payload;
  } finally {
    clearTimeout(timeout);
  }
}

export function clearSolarForecastCache(): void {
  cachedSolarForecast = null;
}
