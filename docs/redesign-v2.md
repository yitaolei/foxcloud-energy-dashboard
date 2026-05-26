# FoxCloud Dashboard Redesign v2

This is the redesign project stream for the existing FoxCloud Energy Dashboard.

Goal: make the dashboard more visual, easier to understand at a glance, and more useful
for daily household energy decisions without breaking the stable maintenance version.

## Status

- Branch: `codex/foxcloud-dashboard-redesign-v2`
- Stable production branch: `main`
- Production NAS path remains `/Volumes/Newhome/docker/foxcloud-dashboard`
- Do not sync this redesign branch to NAS production until a working v2 milestone is tested.

## Design Direction

The current dashboard is data-rich but still table/card heavy. v2 should feel more like an
energy command center:

- prominent real-time gauges for solar, battery, home load, and grid flow
- visual daily KPI cards for solar production, consumption, export, self-sufficiency, and estimated savings
- weather context near the top so users understand whether low solar production is expected
- simple status strip showing system, inverter, data source, and last update
- keep the existing daily energy data table mostly unchanged because it is still useful for checking exact values

## Priority Requirements

1. Weather forecast
   - Show today's local forecast and the next few days.
   - Show condition, temperature, rain probability/precipitation, and a simple solar outlook.
   - Recommended first provider: Open-Meteo forecast API because it needs no API key for non-commercial/open-source use.
   - Keep latitude/longitude in environment variables, not hard-coded home address text.

2. Visual dashboard cards and gauges
   - Convert top-level numbers into dashboard-style visuals inspired by the supplied examples.
   - Add gauge cards for:
     - solar power now
     - battery level and charge/discharge status
     - house load
     - grid import/export
   - Add KPI cards for:
     - daily solar
     - daily consumption
     - daily export
     - self-sufficiency
     - estimated savings
   - Keep the daily energy table unchanged unless a bug is found.

3. Estimated savings
   - Add user-configurable electricity tariff settings.
   - Default tariff requested by user:
     - Peak: 3:00pm to 8:59pm, A$0.30/kWh
     - Off peak: all other times, A$0.24/kWh
   - Calculate savings for:
     - today since midnight
     - current week
     - current month
     - last 3 months
     - last 6 months
     - last 12 months
     - all available data
   - Prefer interval-based calculations when live samples exist.
   - Fall back to daily blended estimates when interval samples are unavailable.
   - Keep tariff values editable by the user and persist them safely.
   - First visual pass implemented: the dashboard now shows today, this week, this month, last 3 months, last 6 months, and last 12 months savings cards.
   - Breakdown pass implemented: the period totals section now separates avoided grid import savings from feed-in/export credit.

4. Mobile-first dashboard mode
   - Keep the existing responsive table behavior.
   - Make gauge/KPI cards stack cleanly on iPhone.
   - Use a compact top status strip on mobile.

## Suggested v2 Architecture

### Weather

Backend-only fetch:

- New env values:
  - `WEATHER_ENABLED=true`
  - `WEATHER_PROVIDER=open-meteo`
  - `WEATHER_POSTCODE=2141`
  - `WEATHER_COUNTRY_CODE=AU`
  - `WEATHER_LOCATION_NAME=Lidcombe`
  - `WEATHER_LATITUDE=...`
  - `WEATHER_LONGITUDE=...`
  - `WEATHER_TIMEZONE=Australia/Sydney`
  - `WEATHER_CACHE_TTL_MS=1800000`

Location priority:

- Use `WEATHER_LATITUDE` and `WEATHER_LONGITUDE` first when configured.
- Otherwise resolve `WEATHER_POSTCODE` and optional `WEATHER_COUNTRY_CODE` with Open-Meteo geocoding, then Zippopotam.us as a postcode fallback.
- `WEATHER_LOCATION_NAME` is a display-only override for labels such as Lidcombe.
- Dashboard weather settings override `.env` defaults once saved.
- Do not hard-code the user's street address.

New backend endpoint:

- `GET /api/weather`
- `GET /api/weather-settings`
- `PUT /api/weather-settings`

Initial Open-Meteo query shape:

```text
https://api.open-meteo.com/v1/forecast
  ?latitude=...
  &longitude=...
  &current=temperature_2m,apparent_temperature,weather_code,cloud_cover,precipitation
  &hourly=temperature_2m,weather_code,cloud_cover,precipitation_probability,precipitation
  &daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset
  &timezone=auto
```

Solar outlook rule of thumb:

- `Excellent`: low cloud and low rain probability
- `Good`: partly cloudy, low rain probability
- `Poor`: high cloud, rain, storm, or high precipitation probability

### Savings

New tariff settings:

- `ELECTRICITY_CURRENCY=AUD`
- `ELECTRICITY_PEAK_START=15:00`
- `ELECTRICITY_PEAK_END=20:59`
- `ELECTRICITY_PEAK_RATE=0.30`
- `ELECTRICITY_OFF_PEAK_RATE=0.24`
- Optional future value:
  - `ELECTRICITY_FEED_IN_RATE=0`

Implemented API shape:

- `GET /api/dashboard` includes `todaySavings`
- `GET /api/energy-range` includes `savings`
- `GET /api/savings-overview` returns common savings ranges in one request
- `GET /api/tariff` returns the active tariff
- `PUT /api/tariff` saves validated tariff settings into SQLite

Current estimate:

- Avoided import kWh = `home usage - grid consumption`.
- Period totals use a weighted daily import rate because daily rows do not contain minute-by-minute tariff periods yet.
- Dashboard tariff settings override `.env` defaults once saved.

Initial savings formula:

- Interval mode:
  - avoided import value = household demand supplied by solar/battery during each time interval multiplied by that interval's tariff.
  - export credit can be shown separately if a feed-in rate is configured.
- Daily fallback mode:
  - estimate avoided import value using `self_consumption` and a blended peak/off-peak rate.
  - clearly label this as an estimate.

Important: avoid double-counting battery energy. Battery discharge is part of self-sufficiency,
but charging and discharging losses mean savings should be calculated from avoided grid import,
not by simply adding solar production plus battery discharge.

## Extra Redesign Ideas

- Self-sufficiency gauge: percentage of home usage supplied by solar/battery.
  - First pass implemented: the balance section now includes a circular self-sufficiency gauge with covered-vs-grid detail.
- Energy balance card: `PV produced = self-consumption + return to grid`.
  - Expanded pass implemented: the balance section now includes battery day balance and grid day balance cards.
- Savings forecast card: estimate likely savings if the selected period's daily average continues.
  - First pass implemented: the period panel now shows daily average, monthly run-rate, and annual run-rate estimates.
- Bill impact card: show the money story behind the energy totals.
  - First pass implemented: the period panel now compares estimated no-solar/no-battery grid cost, actual grid energy cost, export credit impact, and net benefit.
- Period highlights card: surface useful best-day callouts without asking users to scan the daily table.
  - First pass implemented: the period panel now highlights best solar day, highest usage day, best export day, and estimated best savings day.
- Battery performance card: explain selected-period battery behavior without digging through chart bars.
  - First pass implemented: the period panel now shows discharge/charge ratio, net battery balance, throughput, and a simple battery mode.
- Solar utilization card: show where selected-period solar production went.
  - First pass implemented: the period panel now shows self-used solar, exported solar, self-use rate, and export rate with a stacked bar.
- Solar forecast hint: compare today's production so far against expected weather.
  - First pass implemented: weather card now explains today's solar output against recent daily averages and weather outlook.
- Battery readiness card: whether the battery is likely to cover evening peak.
- Battery reserve plan: show how much battery remains above a practical safety floor, whether the battery is charging/discharging/idle, how much of the current home load is covered, and what action makes sense now.
  - First pass implemented: the top dashboard now includes a reserve plan with a SOC fill bar, usable-reserve meter, battery power, live coverage, and direct action hint.
- Flexible load planner: recommend when to run optional appliances by combining export headroom, battery reserve, current tariff window, and grid import/export state.
  - First pass implemented: the top dashboard now shows usable surplus power, a best-load window, avoid-now warning, and battery guard hint.
- Battery runway forecast: estimate how long the battery can stay above a 20% reserve floor using recent SOC trend and live battery state.
  - First pass implemented: the top dashboard now shows estimated time to 20%, recent SOC drain, reserve above floor, recent battery support, and overnight risk.
- Energy coach panel: combine today's energy verdict, peak plan, and tomorrow's solar outlook into simple action hints.
  - First pass implemented: the dashboard now shows a three-card energy coach using existing dashboard and weather data.
- Peak window countdown: show time until peak tariff starts/ends.
  - First visual pass implemented: the dashboard now shows a 24-hour electricity price timeline with the peak window and current time marker.
- Data quality indicator: live Modbus, FoxCloud, cache, demo, stale, or fallback profile.
  - First pass implemented: the dashboard now shows freshness, source, warning count, and response time in a dedicated data confidence panel.
- Export/import net card: whether the home is currently a net exporter or importer.
  - First pass implemented: the top KPI row now includes today's net grid position using return-to-grid minus grid consumption.
- Energy health score: combine self-sufficiency, battery state, grid flow, temperature, and weather into one visual score.
- Last-24-hours operational heatmap: visualize solar generation, home usage, battery discharge, and grid import intensity as horizontal time bands so the dashboard communicates patterns instead of only showing numeric totals.
- Monthly solar calendar and weekday profile: show daily solar strength, daily self-sufficiency, and weekday averages as visual cards/bars so recurring production and usage patterns are easier to scan.
- Evening peak readiness panel: score battery state, tariff timing, grid flow, and savings context so the dashboard gives a direct operational answer instead of another exploratory chart.
  - First pass implemented: the top dashboard now includes a 0-100 home energy score with factor chips.
- Daily comparison: today vs yesterday, and today vs same weekday last week.
  - First pass implemented: visual trend snapshot compares today's key metrics against the recent 7-day average.
- Battery protection hints: unusually high inverter/battery temperatures.
  - First pass implemented: the insight strip now watches the highest live temperature across battery min/max, battery pack, and inverter readings and flags normal/warm/hot states.
- Redesign-safe setting panel: user can edit tariff/weather location without touching `.env` later.
  - Tariff editing is implemented and persisted in SQLite.
  - Weather location editing is implemented and persisted in SQLite.

## First Implementation Milestones

1. Add weather backend endpoint and weather card.
2. Add tariff/savings calculation helper with tests.
3. Redesign top section into visual KPI cards and gauges.
   - First pass implemented: daily solar, consumption, export, self-sufficiency, estimated savings, and compact system status strip.
   - Second pass implemented: real-time semicircle gauge cards for solar power, battery, house load, and grid import/export.
4. Add self-sufficiency and estimated savings cards.
   - First pass implemented using `/api/dashboard` `today` and `todaySavings` values.
5. Improve mobile layout for the visual dashboard.
   - First pass implemented: tariff window countdown, battery peak readiness, grid mode, and smart hint cards.
   - Second pass implemented: PV distribution and home load coverage stacked bars.
6. Keep daily energy table stable and regression-test CSV sorting/export behavior.

## Non-Goals For v2 First Pass

- Do not remove the existing daily energy data table.
- Do not write inverter settings over Modbus.
- Do not expose private location text, API keys, passwords, or serial numbers in the frontend.
- Do not sync incomplete v2 work to NAS production.
