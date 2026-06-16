import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getSolarOutlook,
  getWeatherConditionKey,
  getWeatherDisplayConditionKey,
} from "../dist/lib/weatherOutlook.js";

describe("weather outlook helpers", () => {
  it("maps Open-Meteo weather codes to dashboard condition keys", () => {
    assert.equal(getWeatherConditionKey(0), "clear");
    assert.equal(getWeatherConditionKey(2), "partly_cloudy");
    assert.equal(getWeatherConditionKey(3), "cloudy");
    assert.equal(getWeatherConditionKey(63), "rain");
    assert.equal(getWeatherConditionKey(95), "storm");
    assert.equal(getWeatherConditionKey(undefined), "unknown");
  });

  it("rates clear low-cloud days as excellent for solar", () => {
    assert.equal(getSolarOutlook(0, 10, 5, 0), "excellent");
  });

  it("rates partly cloudy low-rain days as good for solar", () => {
    assert.equal(getSolarOutlook(2, 35, 20, 0), "good");
  });

  it("uses cloud cover to refine dry cloudy weather for display", () => {
    assert.equal(getWeatherDisplayConditionKey(3, 14, 0, 0), "clear");
    assert.equal(getWeatherDisplayConditionKey(3, 35, 0, 0), "partly_cloudy");
    assert.equal(getWeatherDisplayConditionKey(3, 75, 0, 0), "cloudy");
  });

  it("rates dry low-cloud overcast codes by the corrected display condition", () => {
    assert.equal(getSolarOutlook(3, 14, 0, 0), "excellent");
  });

  it("rates wet or very cloudy days lower for solar", () => {
    assert.equal(getSolarOutlook(61, 80, 55, 1), "fair");
    assert.equal(getSolarOutlook(95, 95, 80, 5), "poor");
  });
});
