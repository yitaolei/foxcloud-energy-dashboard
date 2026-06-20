import type { SolarForecastPoint } from "../types/foxcloud.js";

export interface SolcastRooftopForecastResponse {
  forecasts?: Array<{
    period?: string;
    period_end?: string;
    pv_estimate?: number;
    pv_power_rooftop?: number;
  }>;
}

export const parseSolcastPeriodHours = (period: string | undefined): number | null => {
  const normalized = period?.trim().toUpperCase();

  if (!normalized) {
    return null;
  }

  const match = normalized.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);

  if (!match) {
    return null;
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const totalHours = hours + minutes / 60;

  return totalHours > 0 ? totalHours : null;
};

export const normalizeSolcastForecasts = (
  response: SolcastRooftopForecastResponse,
): SolarForecastPoint[] => {
  return (response.forecasts ?? [])
    .map((point): SolarForecastPoint | null => {
      const periodHours = parseSolcastPeriodHours(point.period);
      const periodEnd = point.period_end ?? "";
      const pvPowerKw = Number(point.pv_power_rooftop ?? point.pv_estimate);

      if (
        periodHours === null ||
        !periodEnd ||
        Number.isNaN(new Date(periodEnd).getTime()) ||
        !Number.isFinite(pvPowerKw)
      ) {
        return null;
      }

      return {
        periodEnd,
        period: point.period ?? "",
        periodHours,
        pvPowerKw: Math.max(0, pvPowerKw),
      };
    })
    .filter((point): point is SolarForecastPoint => point !== null)
    .sort((left, right) => new Date(left.periodEnd).getTime() - new Date(right.periodEnd).getTime());
};

export const integrateSolcastForecastKwh = (
  points: SolarForecastPoint[],
  start: Date,
  end: Date,
): number => {
  const startMs = start.getTime();
  const endMs = end.getTime();

  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
    return 0;
  }

  const total = points.reduce((sum, point) => {
    const periodEndMs = new Date(point.periodEnd).getTime();
    const periodStartMs = periodEndMs - point.periodHours * 3_600_000;
    const overlapMs = Math.max(0, Math.min(periodEndMs, endMs) - Math.max(periodStartMs, startMs));

    return sum + point.pvPowerKw * (overlapMs / 3_600_000);
  }, 0);

  return Number(total.toFixed(3));
};
