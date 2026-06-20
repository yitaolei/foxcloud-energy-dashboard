import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  integrateSolcastForecastKwh,
  normalizeSolcastForecasts,
  parseSolcastPeriodHours,
} from "../dist/lib/solcast.js";

describe("Solcast helpers", () => {
  it("parses Solcast ISO periods into hours", () => {
    assert.equal(parseSolcastPeriodHours("PT30M"), 0.5);
    assert.equal(parseSolcastPeriodHours("PT1H"), 1);
    assert.equal(parseSolcastPeriodHours("PT1H30M"), 1.5);
    assert.equal(parseSolcastPeriodHours("PT"), null);
    assert.equal(parseSolcastPeriodHours("not-a-period"), null);
  });

  it("normalizes valid rooftop forecast points and sorts them by period end", () => {
    const points = normalizeSolcastForecasts({
      forecasts: [
        {
          period_end: "2026-06-20T01:00:00.0000000Z",
          period: "PT30M",
          pv_power_rooftop: 2,
        },
        {
          period_end: "bad-date",
          period: "PT30M",
          pv_power_rooftop: 5,
        },
        {
          period_end: "2026-06-20T00:30:00.0000000Z",
          period: "PT30M",
          pv_power_rooftop: 1,
        },
      ],
    });

    assert.equal(points.length, 2);
    assert.equal(points[0].periodEnd, "2026-06-20T00:30:00.0000000Z");
    assert.equal(points[0].pvPowerKw, 1);
    assert.equal(points[1].periodEnd, "2026-06-20T01:00:00.0000000Z");
    assert.equal(points[1].periodHours, 0.5);
  });

  it("integrates only the overlapping part of Solcast forecast periods", () => {
    const points = normalizeSolcastForecasts({
      forecasts: [
        {
          period_end: "2026-06-20T00:30:00.0000000Z",
          period: "PT30M",
          pv_power_rooftop: 2,
        },
        {
          period_end: "2026-06-20T01:00:00.0000000Z",
          period: "PT30M",
          pv_power_rooftop: 4,
        },
      ],
    });

    const kwh = integrateSolcastForecastKwh(
      points,
      new Date("2026-06-20T00:15:00.000Z"),
      new Date("2026-06-20T00:45:00.000Z"),
    );

    assert.equal(kwh, 1.5);
  });
});
