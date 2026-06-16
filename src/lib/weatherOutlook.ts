export type WeatherConditionKey =
  | "clear"
  | "partly_cloudy"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "storm"
  | "unknown";

export type SolarOutlookKey = "excellent" | "good" | "fair" | "poor";

export const getWeatherConditionKey = (weatherCode: number | null | undefined): WeatherConditionKey => {
  const code = Number(weatherCode);

  if (!Number.isFinite(code)) {
    return "unknown";
  }

  if (code === 0) {
    return "clear";
  }

  if (code === 1 || code === 2) {
    return "partly_cloudy";
  }

  if (code === 3) {
    return "cloudy";
  }

  if (code === 45 || code === 48) {
    return "fog";
  }

  if ((code >= 51 && code <= 57) || (code >= 80 && code <= 82)) {
    return "drizzle";
  }

  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return "rain";
  }

  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return "snow";
  }

  if (code >= 95 && code <= 99) {
    return "storm";
  }

  return "unknown";
};

export const getWeatherDisplayConditionKey = (
  weatherCode: number | null | undefined,
  cloudCoverPercent: number | null | undefined,
  precipitationProbabilityPercent: number | null | undefined,
  precipitationMm: number | null | undefined,
): WeatherConditionKey => {
  const condition = getWeatherConditionKey(weatherCode);
  const cloudCover = Number(cloudCoverPercent);
  const rainProbability = Number(precipitationProbabilityPercent ?? 0);
  const precipitation = Number(precipitationMm ?? 0);
  const isDry = rainProbability <= 10 && precipitation < 0.2;

  if (!Number.isFinite(cloudCover) || !isDry) {
    return condition;
  }

  if (["clear", "partly_cloudy", "cloudy"].includes(condition)) {
    if (cloudCover <= 20) {
      return "clear";
    }

    if (cloudCover <= 50) {
      return "partly_cloudy";
    }
  }

  return condition;
};

export const getSolarOutlook = (
  weatherCode: number | null | undefined,
  cloudCoverPercent: number | null | undefined,
  precipitationProbabilityPercent: number | null | undefined,
  precipitationMm: number | null | undefined,
): SolarOutlookKey => {
  const condition = getWeatherDisplayConditionKey(
    weatherCode,
    cloudCoverPercent,
    precipitationProbabilityPercent,
    precipitationMm,
  );
  const cloudCover = Number(cloudCoverPercent ?? 100);
  const rainProbability = Number(precipitationProbabilityPercent ?? 0);
  const precipitation = Number(precipitationMm ?? 0);
  const wetCondition = ["drizzle", "rain", "snow", "storm", "fog"].includes(condition);

  if (condition === "storm" || precipitation >= 2 || rainProbability >= 60 || cloudCover >= 90) {
    return "poor";
  }

  if (wetCondition || precipitation >= 0.5 || rainProbability >= 40 || cloudCover >= 70) {
    return "fair";
  }

  if (condition === "clear" && cloudCover <= 20 && rainProbability <= 10) {
    return "excellent";
  }

  if (["clear", "partly_cloudy"].includes(condition) && cloudCover <= 50 && rainProbability <= 25) {
    return "good";
  }

  return "fair";
};
