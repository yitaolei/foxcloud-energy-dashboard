const statusText = document.getElementById("statusText");
const refreshButton = document.getElementById("refreshButton");
const rebuildCacheButton = document.getElementById("rebuildCacheButton");
const exportPdfButton = document.getElementById("exportPdfButton");
const exportCsvButton = document.getElementById("exportCsvButton");
const saveTariffButton = document.getElementById("saveTariffButton");
const saveWeatherSettingsButton = document.getElementById("saveWeatherSettingsButton");
const monthPicker = document.getElementById("monthPicker");
const languageSelect = document.getElementById("languageSelect");
const tableRangeSelect = document.getElementById("tableRangeSelect");
const periodRangeSelect = document.getElementById("periodRangeSelect");
const warningBox = document.getElementById("warningBox");
const weatherPanel = document.getElementById("weatherPanel");
const dailyTableBody = document.getElementById("dailyTableBody");
const storageKeys = {
  language: "foxcloud-dashboard-language",
  tableRange: "foxcloud-dashboard-table-range",
};

const metricFields = {
  solarNow: document.getElementById("solarNow"),
  homeNow: document.getElementById("homeNow"),
  gridImportNow: document.getElementById("gridImportNow"),
  gridExportNow: document.getElementById("gridExportNow"),
  batteryChargeNow: document.getElementById("batteryChargeNow"),
  batteryDischargeNow: document.getElementById("batteryDischargeNow"),
  todaySolar: document.getElementById("todaySolar"),
  todaySelfConsumption: document.getElementById("todaySelfConsumption"),
  todayFeedin: document.getElementById("todayFeedin"),
  todayHome: document.getElementById("todayHome"),
  todayGrid: document.getElementById("todayGrid"),
  todayBatteryCharge: document.getElementById("todayBatteryCharge"),
  todayBatteryDischarge: document.getElementById("todayBatteryDischarge"),
  batterySoc: document.getElementById("batterySoc"),
  batteryTemp: document.getElementById("batteryTemp"),
  batteryMaxTemp: document.getElementById("batteryMaxTemp"),
  batteryPackTemp: document.getElementById("batteryPackTemp"),
  inverterTemp: document.getElementById("inverterTemp"),
  todaySavings: document.getElementById("todaySavings"),
  solarLastHour: document.getElementById("solarLastHour"),
  homeLastHour: document.getElementById("homeLastHour"),
  gridImportLastHour: document.getElementById("gridImportLastHour"),
  gridExportLastHour: document.getElementById("gridExportLastHour"),
  batteryChargeLastHour: document.getElementById("batteryChargeLastHour"),
  batteryDischargeLastHour: document.getElementById("batteryDischargeLastHour"),
  periodSolarProduction: document.getElementById("periodSolarProduction"),
  periodHomeUsage: document.getElementById("periodHomeUsage"),
  periodIntoBattery: document.getElementById("periodIntoBattery"),
  periodOutBattery: document.getElementById("periodOutBattery"),
  periodReturnToGrid: document.getElementById("periodReturnToGrid"),
  periodGridConsumption: document.getElementById("periodGridConsumption"),
  periodSelfConsumption: document.getElementById("periodSelfConsumption"),
  periodSavings: document.getElementById("periodSavings"),
  periodSavingsBreakdownTotal: document.getElementById("periodSavingsBreakdownTotal"),
  periodAvoidedImportSavings: document.getElementById("periodAvoidedImportSavings"),
  periodExportCredit: document.getElementById("periodExportCredit"),
  periodAvoidedImportKwh: document.getElementById("periodAvoidedImportKwh"),
  periodExportedKwh: document.getElementById("periodExportedKwh"),
  periodDailyAverageSavings: document.getElementById("periodDailyAverageSavings"),
  periodMonthlyForecast: document.getElementById("periodMonthlyForecast"),
  periodAnnualForecast: document.getElementById("periodAnnualForecast"),
  periodWithoutSolarCost: document.getElementById("periodWithoutSolarCost"),
  periodGridEnergyCost: document.getElementById("periodGridEnergyCost"),
  periodNetCostAfterExport: document.getElementById("periodNetCostAfterExport"),
  periodBillBenefit: document.getElementById("periodBillBenefit"),
  periodBestSolar: document.getElementById("periodBestSolar"),
  periodHighestUsage: document.getElementById("periodHighestUsage"),
  periodBestExport: document.getElementById("periodBestExport"),
  periodBestSavings: document.getElementById("periodBestSavings"),
  periodBatteryRatio: document.getElementById("periodBatteryRatio"),
  periodBatteryNet: document.getElementById("periodBatteryNet"),
  periodBatteryThroughput: document.getElementById("periodBatteryThroughput"),
  periodBatteryMode: document.getElementById("periodBatteryMode"),
  periodSolarSelfUsed: document.getElementById("periodSolarSelfUsed"),
  periodSolarExported: document.getElementById("periodSolarExported"),
  periodSolarUtilizationTotal: document.getElementById("periodSolarUtilizationTotal"),
  kpiDailySolar: document.getElementById("kpiDailySolar"),
  kpiDailyConsumption: document.getElementById("kpiDailyConsumption"),
  kpiDailyExport: document.getElementById("kpiDailyExport"),
  kpiNetGrid: document.getElementById("kpiNetGrid"),
  kpiSelfSufficiency: document.getElementById("kpiSelfSufficiency"),
  kpiEstimatedSavings: document.getElementById("kpiEstimatedSavings"),
  energyScoreValue: document.getElementById("energyScoreValue"),
  savingsOverviewToday: document.getElementById("savingsOverviewToday"),
  savingsOverviewWeek: document.getElementById("savingsOverviewWeek"),
  savingsOverviewMonth: document.getElementById("savingsOverviewMonth"),
  savingsOverviewLast3: document.getElementById("savingsOverviewLast3"),
  savingsOverviewLast6: document.getElementById("savingsOverviewLast6"),
  savingsOverviewLast12: document.getElementById("savingsOverviewLast12"),
  trendSolarToday: document.getElementById("trendSolarToday"),
  trendHomeToday: document.getElementById("trendHomeToday"),
  trendExportToday: document.getElementById("trendExportToday"),
  trendGridToday: document.getElementById("trendGridToday"),
  gaugeSolarValue: document.getElementById("gaugeSolarValue"),
  gaugeBatteryValue: document.getElementById("gaugeBatteryValue"),
  gaugeHomeValue: document.getElementById("gaugeHomeValue"),
  gaugeGridValue: document.getElementById("gaugeGridValue"),
};

const textFields = {
  currentDateTime: document.getElementById("currentDateTime"),
  deviceTitle: document.getElementById("deviceTitle"),
  deviceMeta: document.getElementById("deviceMeta"),
  liveMeta: document.getElementById("liveMeta"),
  periodTotalsMeta: document.getElementById("periodTotalsMeta"),
  todaySavingsMeta: document.getElementById("todaySavingsMeta"),
  periodSavingsMeta: document.getElementById("periodSavingsMeta"),
  badgeRow: document.getElementById("badgeRow"),
  weatherLocation: document.getElementById("weatherLocation"),
  weatherIcon: document.getElementById("weatherIcon"),
  weatherTemperature: document.getElementById("weatherTemperature"),
  weatherCondition: document.getElementById("weatherCondition"),
  weatherSolarOutlook: document.getElementById("weatherSolarOutlook"),
  weatherRainChance: document.getElementById("weatherRainChance"),
  weatherCloudCover: document.getElementById("weatherCloudCover"),
  weatherDaily: document.getElementById("weatherDaily"),
  solarPerformanceCard: document.getElementById("solarPerformanceCard"),
  solarPerformanceStatus: document.getElementById("solarPerformanceStatus"),
  solarPerformanceDetail: document.getElementById("solarPerformanceDetail"),
  solarPerformanceMeta: document.getElementById("solarPerformanceMeta"),
  kpiDailySolarMeta: document.getElementById("kpiDailySolarMeta"),
  kpiDailyConsumptionMeta: document.getElementById("kpiDailyConsumptionMeta"),
  kpiNetGridMeta: document.getElementById("kpiNetGridMeta"),
  kpiSelfSufficiencyMeta: document.getElementById("kpiSelfSufficiencyMeta"),
  kpiSystemStatus: document.getElementById("kpiSystemStatus"),
  kpiInverterStatus: document.getElementById("kpiInverterStatus"),
  kpiLastUpdate: document.getElementById("kpiLastUpdate"),
  kpiDataSource: document.getElementById("kpiDataSource"),
  energyScoreRing: document.getElementById("energyScoreRing"),
  energyScoreStatus: document.getElementById("energyScoreStatus"),
  energyScoreDetail: document.getElementById("energyScoreDetail"),
  energyScoreSelfFactor: document.getElementById("energyScoreSelfFactor"),
  energyScoreBatteryFactor: document.getElementById("energyScoreBatteryFactor"),
  energyScoreGridFactor: document.getElementById("energyScoreGridFactor"),
  energyScoreTempFactor: document.getElementById("energyScoreTempFactor"),
  energyScoreWeatherFactor: document.getElementById("energyScoreWeatherFactor"),
  dataQualityPanel: document.getElementById("dataQualityPanel"),
  dataQualityStatus: document.getElementById("dataQualityStatus"),
  dataQualityDetail: document.getElementById("dataQualityDetail"),
  dataQualityFreshness: document.getElementById("dataQualityFreshness"),
  dataQualitySource: document.getElementById("dataQualitySource"),
  dataQualityWarnings: document.getElementById("dataQualityWarnings"),
  dataQualityResponse: document.getElementById("dataQualityResponse"),
  tariffTimelineStatus: document.getElementById("tariffTimelineStatus"),
  tariffTimelineDetail: document.getElementById("tariffTimelineDetail"),
  tariffPeakSegmentA: document.getElementById("tariffPeakSegmentA"),
  tariffPeakSegmentB: document.getElementById("tariffPeakSegmentB"),
  tariffCurrentMarker: document.getElementById("tariffCurrentMarker"),
  tariffCurrentMarkerLabel: document.getElementById("tariffCurrentMarkerLabel"),
  tariffTimelinePeakRate: document.getElementById("tariffTimelinePeakRate"),
  tariffTimelineOffPeakRate: document.getElementById("tariffTimelineOffPeakRate"),
  tariffTimelineFeedInRate: document.getElementById("tariffTimelineFeedInRate"),
  savingsOverviewTodayMeta: document.getElementById("savingsOverviewTodayMeta"),
  savingsOverviewWeekMeta: document.getElementById("savingsOverviewWeekMeta"),
  savingsOverviewMonthMeta: document.getElementById("savingsOverviewMonthMeta"),
  savingsOverviewLast3Meta: document.getElementById("savingsOverviewLast3Meta"),
  savingsOverviewLast6Meta: document.getElementById("savingsOverviewLast6Meta"),
  savingsOverviewLast12Meta: document.getElementById("savingsOverviewLast12Meta"),
  trendSolarMeta: document.getElementById("trendSolarMeta"),
  trendHomeMeta: document.getElementById("trendHomeMeta"),
  trendExportMeta: document.getElementById("trendExportMeta"),
  trendGridMeta: document.getElementById("trendGridMeta"),
  trendSolarBar: document.getElementById("trendSolarBar"),
  trendHomeBar: document.getElementById("trendHomeBar"),
  trendExportBar: document.getElementById("trendExportBar"),
  trendGridBar: document.getElementById("trendGridBar"),
  operationalHeatmapGrid: document.getElementById("operationalHeatmapGrid"),
  operationalHeatmapMeta: document.getElementById("operationalHeatmapMeta"),
  solarCalendarGrid: document.getElementById("solarCalendarGrid"),
  solarCalendarMeta: document.getElementById("solarCalendarMeta"),
  weekdayProfileGrid: document.getElementById("weekdayProfileGrid"),
  weekdayProfileMeta: document.getElementById("weekdayProfileMeta"),
  gaugeSolarArc: document.getElementById("gaugeSolarArc"),
  gaugeBatteryArc: document.getElementById("gaugeBatteryArc"),
  gaugeHomeArc: document.getElementById("gaugeHomeArc"),
  gaugeGridArc: document.getElementById("gaugeGridArc"),
  gaugeSolarMode: document.getElementById("gaugeSolarMode"),
  gaugeBatteryMode: document.getElementById("gaugeBatteryMode"),
  gaugeHomeMode: document.getElementById("gaugeHomeMode"),
  gaugeGridMode: document.getElementById("gaugeGridMode"),
  gaugeSolarToday: document.getElementById("gaugeSolarToday"),
  gaugeBatteryDetail: document.getElementById("gaugeBatteryDetail"),
  gaugeHomeToday: document.getElementById("gaugeHomeToday"),
  gaugeGridToday: document.getElementById("gaugeGridToday"),
  insightTariffStatus: document.getElementById("insightTariffStatus"),
  insightTariffDetail: document.getElementById("insightTariffDetail"),
  insightBatteryReadiness: document.getElementById("insightBatteryReadiness"),
  insightBatteryDetail: document.getElementById("insightBatteryDetail"),
  insightGridMode: document.getElementById("insightGridMode"),
  insightGridDetail: document.getElementById("insightGridDetail"),
  temperatureInsightCard: document.getElementById("temperatureInsightCard"),
  insightTemperatureStatus: document.getElementById("insightTemperatureStatus"),
  insightTemperatureDetail: document.getElementById("insightTemperatureDetail"),
  insightSmartHint: document.getElementById("insightSmartHint"),
  insightSmartHintDetail: document.getElementById("insightSmartHintDetail"),
  coachVerdictCard: document.getElementById("coachVerdictCard"),
  coachVerdictStatus: document.getElementById("coachVerdictStatus"),
  coachVerdictDetail: document.getElementById("coachVerdictDetail"),
  coachPeakCard: document.getElementById("coachPeakCard"),
  coachPeakStatus: document.getElementById("coachPeakStatus"),
  coachPeakDetail: document.getElementById("coachPeakDetail"),
  coachWeatherCard: document.getElementById("coachWeatherCard"),
  coachWeatherStatus: document.getElementById("coachWeatherStatus"),
  coachWeatherDetail: document.getElementById("coachWeatherDetail"),
  balancePvTotal: document.getElementById("balancePvTotal"),
  balancePvSelf: document.getElementById("balancePvSelf"),
  balancePvExport: document.getElementById("balancePvExport"),
  balanceLoadTotal: document.getElementById("balanceLoadTotal"),
  balanceLoadSelf: document.getElementById("balanceLoadSelf"),
  balanceLoadGrid: document.getElementById("balanceLoadGrid"),
  balanceSelfRing: document.getElementById("balanceSelfRing"),
  balanceSelfValue: document.getElementById("balanceSelfValue"),
  balanceSelfDetail: document.getElementById("balanceSelfDetail"),
  balanceBatteryMode: document.getElementById("balanceBatteryMode"),
  balanceBatteryNet: document.getElementById("balanceBatteryNet"),
  balanceBatteryCharge: document.getElementById("balanceBatteryCharge"),
  balanceBatteryDischarge: document.getElementById("balanceBatteryDischarge"),
  balanceGridMode: document.getElementById("balanceGridMode"),
  balanceGridNet: document.getElementById("balanceGridNet"),
  balanceGridExport: document.getElementById("balanceGridExport"),
  balanceGridImport: document.getElementById("balanceGridImport"),
  balancePvSelfBar: document.getElementById("balancePvSelfBar"),
  balancePvExportBar: document.getElementById("balancePvExportBar"),
  balanceLoadSelfBar: document.getElementById("balanceLoadSelfBar"),
  balanceLoadGridBar: document.getElementById("balanceLoadGridBar"),
  balanceBatteryChargeBar: document.getElementById("balanceBatteryChargeBar"),
  balanceBatteryDischargeBar: document.getElementById("balanceBatteryDischargeBar"),
  balanceGridExportBar: document.getElementById("balanceGridExportBar"),
  balanceGridImportBar: document.getElementById("balanceGridImportBar"),
  periodAvoidedImportBar: document.getElementById("periodAvoidedImportBar"),
  periodExportCreditBar: document.getElementById("periodExportCreditBar"),
  periodSavingsForecastMeta: document.getElementById("periodSavingsForecastMeta"),
  periodBillImpactMeta: document.getElementById("periodBillImpactMeta"),
  periodBestSolarMeta: document.getElementById("periodBestSolarMeta"),
  periodHighestUsageMeta: document.getElementById("periodHighestUsageMeta"),
  periodBestExportMeta: document.getElementById("periodBestExportMeta"),
  periodBestSavingsMeta: document.getElementById("periodBestSavingsMeta"),
  periodBatteryRatioMeta: document.getElementById("periodBatteryRatioMeta"),
  periodBatteryNetMeta: document.getElementById("periodBatteryNetMeta"),
  periodBatteryModeMeta: document.getElementById("periodBatteryModeMeta"),
  periodSolarUtilizationMeta: document.getElementById("periodSolarUtilizationMeta"),
  periodSolarSelfUseRate: document.getElementById("periodSolarSelfUseRate"),
  periodSolarExportRate: document.getElementById("periodSolarExportRate"),
  periodSolarSelfUseBar: document.getElementById("periodSolarSelfUseBar"),
  periodSolarExportBar: document.getElementById("periodSolarExportBar"),
  tariffStatusText: document.getElementById("tariffStatusText"),
  tariffPeakStartInput: document.getElementById("tariffPeakStartInput"),
  tariffPeakEndInput: document.getElementById("tariffPeakEndInput"),
  tariffPeakRateInput: document.getElementById("tariffPeakRateInput"),
  tariffOffPeakRateInput: document.getElementById("tariffOffPeakRateInput"),
  tariffFeedInRateInput: document.getElementById("tariffFeedInRateInput"),
  weatherSettingsStatusText: document.getElementById("weatherSettingsStatusText"),
  weatherEnabledInput: document.getElementById("weatherEnabledInput"),
  weatherLocationNameInput: document.getElementById("weatherLocationNameInput"),
  weatherPostcodeInput: document.getElementById("weatherPostcodeInput"),
  weatherCountryCodeInput: document.getElementById("weatherCountryCodeInput"),
  weatherLatitudeInput: document.getElementById("weatherLatitudeInput"),
  weatherLongitudeInput: document.getElementById("weatherLongitudeInput"),
  weatherTimezoneInput: document.getElementById("weatherTimezoneInput"),
};

const flowFields = {
  solar: document.getElementById("flowSolar"),
  grid: document.getElementById("flowGrid"),
  gridMode: document.getElementById("flowGridMode"),
  home: document.getElementById("flowHome"),
  battery: document.getElementById("flowBattery"),
  batteryMode: document.getElementById("flowBatteryMode"),
  solarToHomePath: document.getElementById("solarToHomePath"),
  solarToBatteryPath: document.getElementById("solarToBatteryPath"),
  solarToGridPath: document.getElementById("solarToGridPath"),
  gridToHomePath: document.getElementById("gridToHomePath"),
  batteryToHomePath: document.getElementById("batteryToHomePath"),
  gridToBatteryPath: document.getElementById("gridToBatteryPath"),
};

let energyChart;
let batteryChart;
let last24HoursChart;
let currentRows = [];
let sortState = {
  key: "date",
  direction: "desc",
};
let lastPayload = null;
let lastRangePayload = null;
let lastSavingsOverview = null;
let lastWeatherPayload = null;
let lastTariff = null;
let lastWeatherSettings = null;
const REBUILD_LIMIT_DAYS = 31;

function getSelectValues(selectElement) {
  return new Set(Array.from(selectElement.options).map((option) => option.value));
}

function getStoredSelectValue(key, selectElement, fallback) {
  try {
    const storedValue = localStorage.getItem(key);

    return storedValue && getSelectValues(selectElement).has(storedValue) ? storedValue : fallback;
  } catch {
    return fallback;
  }
}

function setStoredValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Some browsers disable localStorage in private or restricted modes.
  }
}

let currentLanguage = getStoredSelectValue(storageKeys.language, languageSelect, "en");

const translations = {
  en: {
    appEyebrow: "FoxCloud Battery Dashboard",
    appTitle: "Home energy command center",
    waitingForFoxCloud: "Waiting for FoxCloud...",
    month: "Month",
    dashboardMonth: "Dashboard month",
    language: "Language",
    refresh: "Refresh",
    rebuildCache: "Rebuild cache",
    exportPdf: "Export PDF",
    exportCsv: "Export CSV",
    loading: "Loading dashboard data...",
    loaded: "Dashboard loaded successfully.",
    loadedCached: "Dashboard loaded from cached data because the live API call failed.",
    demoData: "Demo data",
    loadingRange: "Loading selected table range...",
    loadedRange: "Selected range loaded.",
    rebuildingCache: "Rebuilding selected range cache. This can take a little while...",
    rebuiltCache: "Cache rebuilt.",
    rebuildSummary: "{processed} days checked, {rebuilt} recalculated, {skipped} kept unchanged.",
    rebuildLimited: " Limited to the most recent {limit} days; {omitted} older days were not rebuilt.",
    rebuildCacheConfirm: "Rebuild the selected range using FoxCloud 5-minute history data? This may call the FoxCloud API many times and is limited to the most recent {limit} days.",
    rebuildCacheConfirmPreview: "Rebuild selected range? This will recalculate up to {days} day(s), estimate {calls} FoxCloud history API call(s), and is limited to the most recent {limit} days.",
    rebuildCacheConfirmLocal: "Refresh the selected range from local Modbus/SQLite data? This will not call FoxCloud.",
    rebuildCacheConfirmDemo: "Demo mode is enabled. Rebuild will not call FoxCloud or change live data. Continue?",
    unableToLoad: "Unable to load the dashboard",
    period: "Period",
    periodTotals: "Energy totals",
    periodTotalsHelp: "Choose a period to summarize daily energy data.",
    tableRange: "Table range",
    currentWeek: "This week",
    currentMonth: "This month",
    previousMonth: "Previous month",
    last2Months: "Last 2 months",
    last3Months: "Last 3 months",
    last6Months: "Last 6 months",
    last12Months: "Last 12 months",
    allData: "All data",
    totalSolarProduction: "Total solar production",
    totalHomeUsage: "Total home usage",
    totalIntoBattery: "Total into battery",
    totalOutBattery: "Total out of battery",
    totalReturnToGrid: "Total return to grid",
    totalGridConsumption: "Total grid consumption",
    totalSelfConsumption: "Total self-consumption",
    estimatedSavings: "Estimated savings",
    todaySavings: "Estimated savings today",
    savingsMeta: "{kwh} kWh avoided grid import at about {rate}/kWh",
    savingsBreakdown: "Savings breakdown",
    savingsBreakdownTitle: "Where the benefit comes from",
    avoidedImportSavings: "Avoided import",
    exportCredit: "Export credit",
    avoidedImportKwh: "Avoided import kWh",
    exportedKwh: "Exported kWh",
    savingsForecast: "Savings forecast",
    savingsForecastTitle: "Run-rate estimate",
    dailyAverageSavings: "Daily average",
    monthlyRunRate: "Monthly run-rate",
    annualRunRate: "Annual run-rate",
    savingsForecastMeta: "Based on {days} day(s) in {range}; this is an estimate, not a bill.",
    billImpact: "Bill impact",
    billImpactTitle: "Estimated electricity cost avoided",
    withoutSolarBattery: "Without solar/battery",
    gridEnergyCost: "Grid energy cost",
    netCostAfterExport: "Net after export credit",
    estimatedBenefit: "Estimated benefit",
    billImpactMeta: "Compares estimated grid cost if all home usage came from the grid against actual grid use and export credit.",
    periodHighlights: "Period highlights",
    periodHighlightsTitle: "Best days in this range",
    bestSolarDay: "Best solar day",
    highestUsageDay: "Highest usage day",
    bestExportDay: "Best export day",
    bestSavingsDay: "Best savings day",
    noPeriodData: "No data in selected range",
    batteryPerformance: "Battery performance",
    batteryPerformanceTitle: "How the battery behaved",
    batteryDischargeChargeRatio: "Discharge / charge ratio",
    batteryRatioEstimateMeta: "Estimate only. Start/end battery level can move this above or below true round-trip efficiency.",
    batteryNetBalance: "Net battery balance",
    batteryThroughput: "Battery throughput",
    batteryThroughputMeta: "Charge and discharge activity",
    batteryMode: "Battery mode",
    batteryNetCharged: "Net charged",
    batteryNetDischarged: "Net discharged",
    batteryNetBalanced: "Nearly balanced",
    batteryModeCharging: "Storing more",
    batteryModeDischarging: "Using stored energy",
    batteryModeBalanced: "Balanced cycling",
    batteryModeMeta: "Based on total charge minus total discharge in the selected range.",
    solarUtilization: "Solar utilization",
    solarUtilizationTitle: "Where the solar energy went",
    solarSelfUsed: "Self-used solar",
    solarExported: "Exported solar",
    solarUtilizationTotal: "Total solar",
    solarUtilizationTotalMeta: "Selected period production",
    solarUtilizationMeta: "{selfRate} self-used · {exportRate} exported",
    selfUseRateLabel: "{rate} self-use rate",
    exportRateLabel: "{rate} export rate",
    tariffSettings: "Electricity tariff",
    tariffSettingsTitle: "Savings settings",
    tariffSettingsHelp: "Edit your import and feed-in rates here. Settings are saved in SQLite and survive container rebuilds.",
    peakStart: "Peak start",
    peakEnd: "Peak end",
    peakRate: "Peak rate",
    offPeakRate: "Off-peak rate",
    feedInRate: "Feed-in rate",
    saveTariff: "Save tariff",
    tariffLoaded: "Tariff loaded.",
    tariffSaved: "Tariff saved. Savings updated.",
    tariffSaveFailed: "Unable to save tariff",
    kpiDailySolar: "Daily solar",
    kpiDailyConsumption: "Daily consumption",
    kpiDailyExport: "Daily export",
    kpiNetGrid: "Net grid",
    kpiSelfSufficiency: "Self sufficiency",
    kpiEstimatedSavings: "Est. savings",
    netGridExporting: "Net exporter today",
    netGridImporting: "Net importer today",
    energyScoreKicker: "Home energy score",
    energyScoreTitle: "Energy health score",
    energyScoreExcellent: "Excellent",
    energyScoreGood: "Good",
    energyScoreWatch: "Watch",
    energyScoreNeedsAttention: "Needs attention",
    energyScoreDetail: "Based on self-sufficiency, battery level, grid flow, temperature, and today's solar outlook.",
    energyScoreSelfFactor: "Self {value}",
    energyScoreBatteryFactor: "Battery {value}",
    energyScoreGridFactor: "Grid {value}",
    energyScoreTempFactor: "Temp {value}",
    energyScoreWeatherFactor: "Weather {value}",
    dataQualityKicker: "Data quality",
    dataQualityTitle: "Live data confidence",
    dataFreshness: "Data freshness",
    dataQualityFresh: "Fresh",
    dataQualityWatch: "Watch",
    dataQualityStale: "Stale",
    dataQualityFreshDetail: "Live data looks current and no dashboard warnings are active.",
    dataQualityWatchDetail: "Data is available, but one or more warnings or older timestamps need attention.",
    dataQualityStaleDetail: "Dashboard is using stale, cached, or missing live data. Check the container and data source.",
    dataAgeMinutes: "{minutes}m ago",
    dataAgeUnknown: "Unknown age",
    warningsLabel: "Warnings",
    warningsCount: "{count} warning(s)",
    noWarnings: "No warnings",
    tariffTimeline: "Electricity price timeline",
    tariffTimelineHelp: "Shows the peak price window and where the current time sits in the day.",
    currentTariff: "Current tariff",
    nowLabel: "Now",
    savingsOverview: "Savings overview",
    savingsOverviewHelp: "Estimated benefit from solar and battery usage across common time ranges.",
    savingsLoading: "Calculating...",
    todayVsRecent: "Today vs recent days",
    trendSnapshot: "Energy trend snapshot",
    todayVsRecentHelp: "Compares today with the recent 7-day average, excluding today.",
    operatingPattern: "Operating pattern",
    last24Heatmap: "Last 24-hour power heatmap",
    last24HeatmapHelp: "Color intensity shows when each part of the system was working hardest.",
    last24HeatmapMeta: "{points} samples across the last 24 hours. Darker cells mean higher power.",
    monthlyPattern: "Monthly pattern",
    solarCalendar: "Solar production calendar",
    solarCalendarHelp: "Daily color intensity shows stronger solar production, with self-sufficiency shown inside each day.",
    solarCalendarMeta: "{days} days shown. Best solar day: {bestDay} with {bestSolar}.",
    solarCalendarSelf: "{percent}% self",
    weeklyRhythm: "Weekly rhythm",
    weekdayProfile: "Weekday energy profile",
    weekdayProfileHelp: "Average daily solar, home use, and grid import grouped by weekday.",
    weekdayProfileMeta: "{days} days grouped. Best average solar: {bestDay}.",
    avgSolar: "Avg solar",
    avgHome: "Avg home",
    avgGrid: "Avg grid",
    trendMeta: "Recent avg {average} • {percent}% of average",
    exportedToGrid: "Exported to grid",
    ofYesterday: "{percent}% of yesterday",
    noYesterdayData: "No yesterday data",
    excellentStatus: "Excellent",
    goodStatus: "Good",
    needsGridSupport: "Needs grid support",
    systemStatus: "System status",
    inverter: "Inverter",
    lastUpdate: "Last update",
    dataSource: "Data source",
    gaugeSolarPower: "Solar power",
    gaugeBattery: "Battery",
    gaugeHouseLoad: "House load",
    gaugeGrid: "Grid",
    producing: "Producing",
    consuming: "Consuming",
    idle: "Idle",
    todayPrefix: "Today",
    chargePower: "{value} charging",
    dischargePower: "{value} discharging",
    netExportToday: "{value} exported today",
    netImportToday: "{value} imported today",
    tariffWindow: "Tariff window",
    batteryReadiness: "Battery readiness",
    gridModeNow: "Grid mode now",
    temperatureWatch: "Temperature watch",
    smartHint: "Smart hint",
    peakNow: "Peak now",
    offPeakNow: "Off-peak now",
    peakStartsIn: "Peak starts in {time}",
    peakEndsIn: "Peak ends in {time}",
    peakWindowDetail: "Peak {window} at {rate}/kWh",
    batteryReadyHigh: "Ready for peak",
    batteryReadyMedium: "Watch evening usage",
    batteryReadyLow: "Low for peak",
    batteryReadinessDetail: "Battery is {soc}; peak window is {window}",
    gridExportHint: "Exporting surplus solar",
    gridImportHint: "Importing from grid",
    gridNeutralHint: "Grid nearly balanced",
    gridDetail: "Import {importKw}, export {exportKw}",
    temperatureNormal: "Normal",
    temperatureWarm: "Warm",
    temperatureHot: "Hot",
    temperatureUnavailable: "No temperature data",
    temperatureNormalDetail: "Highest reading is {temperature} at {component}.",
    temperatureWarmDetail: "{component} is warm at {temperature}. Keep airflow and load in mind.",
    temperatureHotDetail: "{component} is hot at {temperature}. Check ventilation and inverter/battery status.",
    temperatureUnavailableDetail: "No live battery or inverter temperature is available yet.",
    batteryMinComponent: "battery min",
    batteryMaxComponent: "battery max",
    batteryPackComponent: "battery pack",
    inverterComponent: "inverter",
    smartHintExporting: "Good time to run flexible loads or keep charging battery.",
    smartHintPeak: "Peak tariff is active; battery support is most valuable now.",
    smartHintLowBattery: "Battery is below 50%; consider saving stored energy for peak hours.",
    smartHintNormal: "System looks steady. Keep an eye on weather and peak tariff window.",
    energyCoachKicker: "Energy coach",
    energyCoachTitle: "Actionable home energy tips",
    coachVerdictLabel: "Today verdict",
    coachPeakLabel: "Peak plan",
    coachWeatherLabel: "Tomorrow solar",
    coachVerdictExcellent: "Strong solar day",
    coachVerdictGood: "Balanced day",
    coachVerdictWatch: "Watch grid use",
    coachVerdictAlert: "Grid-heavy day",
    coachVerdictExportDetail: "Self-sufficiency {self} with net export {net}. Good day to shift flexible loads.",
    coachVerdictImportDetail: "Self-sufficiency {self} with net import {net}. Consider reducing flexible loads during peak.",
    coachPeakReady: "Ready for peak",
    coachPeakMedium: "Some peak cover",
    coachPeakLow: "Low battery for peak",
    coachPeakActive: "Peak tariff active",
    coachPeakDetail: "Battery {soc}. Peak window {window}. Current grid flow {grid}.",
    coachTomorrowExcellent: "Excellent solar chance",
    coachTomorrowGood: "Good solar chance",
    coachTomorrowFair: "Mixed solar day",
    coachTomorrowPoor: "Solar may be limited",
    coachWeatherUnavailable: "Forecast unavailable",
    coachWeatherDetail: "{date}: {condition}, {outlook} outlook, rain {rain}.",
    coachWeatherUnavailableDetail: "Weather forecast is not available yet. Check weather settings or refresh later.",
    energyBalance: "Energy balance",
    pvDistribution: "PV distribution",
    loadCoverage: "Load coverage",
    homeUsageSource: "Home usage source",
    solarBatteryCovered: "Solar + battery",
    selfSufficiency: "Self sufficiency",
    selfSufficiencyGauge: "Self-sufficiency gauge",
    coveredBySolarBattery: "covered",
    selfSufficiencyDetail: "{covered} covered by solar/battery • {grid} from grid",
    batteryDayBalance: "Battery day balance",
    gridDayBalance: "Grid day balance",
    netCharging: "Net charging",
    netDischarging: "Net discharging",
    netExporting: "Net exporting",
    netImporting: "Net importing",
    balanced: "Balanced",
    rangeSummary: "Showing",
    liveFlow: "Live Flow",
    energyDistribution: "Energy distribution",
    solar: "Solar",
    grid: "Grid",
    home: "Home",
    battery: "Battery",
    importing: "Importing",
    exporting: "Exporting",
    charging: "Charging",
    discharging: "Discharging",
    today: "Today",
    productionUsage: "Production and usage",
    solarProduction: "Solar production",
    pvProduced: "PV produced",
    pvProducedNote: "For today, PV produced follows FoxCloud Analysis: Self-consumption plus Export from the 5-minute power curve. Older days use the FoxCloud daily report values.",
    selfConsumption: "Self-consumption",
    returnToGrid: "Return to grid",
    homeUsage: "Home usage",
    gridConsumption: "Grid consumption",
    batteryLevel: "Battery level",
    intoBattery: "Into battery",
    outOfBattery: "Out of battery",
    batteryTemp: "Min battery temp",
    batteryMaxTemp: "Max battery temp",
    batteryPackTemp: "Battery pack temp",
    inverterTemp: "Inverter temp",
    last24Hours: "Last 24 Hours",
    last24Title: "Battery level, home usage, and battery discharge",
    system: "System",
    solarGeneratedNow: "Solar generated now",
    solarNowHelp: "Instant solar power, not hourly total",
    homeUsageNow: "Home usage now",
    homeNowHelp: "Instant household demand",
    gridImportNow: "Grid import now",
    gridImportHelp: "Instant power taken from grid",
    gridExportNow: "Grid export now",
    gridExportHelp: "Instant power sent to grid",
    batteryChargeNow: "Battery charge now",
    batteryChargeHelp: "Instant charging power",
    batteryDischargeNow: "Battery discharge now",
    batteryDischargeHelp: "Instant discharging power",
    lastHour: "Past Hour",
    lastHourTitle: "Energy over the last hour",
    lastHourHelp: "These are estimated kWh totals calculated from FoxCloud power samples over the last 60 minutes.",
    lastHourTotalHelp: "Estimated energy in the last 60 minutes",
    solarGeneratedLastHour: "Solar generated last hour",
    homeUsageLastHour: "Home usage last hour",
    gridImportLastHour: "Grid import last hour",
    gridExportLastHour: "Grid export last hour",
    batteryChargeLastHour: "Battery charge last hour",
    batteryDischargeLastHour: "Battery discharge last hour",
    chart: "Chart",
    dailyEnergyChart: "Daily solar, grid, and home usage",
    batteryChart: "Battery charge and discharge",
    table: "Table",
    dailyEnergyData: "Daily energy data",
    date: "Date",
    energyIntoBattery: "Energy going into the battery",
    energyOutBattery: "Energy coming out of the battery",
    unavailable: "Unavailable",
    noLiveTimestamp: "No live timestamp available",
    liveUpdated: "Live updated",
    responseGenerated: "Response generated",
    online: "Online",
    fault: "Fault",
    offline: "Offline",
    batteryEnabled: "Battery enabled",
    noBattery: "No battery",
    solarEnabled: "Solar enabled",
    noSolar: "No solar",
    cachedFallback: "Cached fallback",
    liveData: "Live data",
    dailyEnergyKwh: "Daily energy (kWh)",
    batteryEnergyKwh: "Battery energy (kWh)",
    batteryLevelPercent: "Battery level (%)",
    homeUsageKw: "Home usage (kW)",
    batteryDischargeKw: "Battery discharge (kW)",
    powerKw: "Power (kW)",
    noTableData: "No table data is available to export yet.",
    weather: "Weather",
    solarForecast: "Solar forecast",
    solarOutlook: "Solar outlook",
    solarPerformance: "Solar performance",
    solarPerformanceEarly: "Still early",
    solarPerformanceOnTrack: "On track",
    solarPerformanceWeatherLimited: "Weather limited",
    solarPerformanceWatch: "Worth watching",
    solarPerformanceLow: "Low for conditions",
    solarPerformanceNoBaseline: "Building baseline",
    solarPerformanceEarlyDetail: "Solar production is still ramping up. Check again later in the day.",
    solarPerformanceOnTrackDetail: "Today's solar production is broadly in line with recent days.",
    solarPerformanceWeatherDetail: "The forecast is not ideal for solar, so lower production may be weather-related.",
    solarPerformanceWatchDetail: "Production is below recent days. Keep an eye on shading, clouds, or inverter status.",
    solarPerformanceLowDetail: "Weather looks suitable, but production is much lower than recent days.",
    solarPerformanceNoBaselineDetail: "More daily history is needed before the dashboard can judge today's solar output.",
    solarPerformanceMeta: "Today {today} vs recent avg {average} ({percent}%)",
    rainChance: "Rain chance",
    cloudCover: "Cloud cover",
    weatherDisabled: "Weather forecast is not configured.",
    weatherLocationSettings: "Weather location",
    weatherLocationTitle: "Forecast settings",
    weatherLocationHelp: "Enter a postcode or precise coordinates. Settings are saved in SQLite and used for the solar forecast.",
    weatherEnabled: "Weather enabled",
    weatherDisplayName: "Display name",
    postcode: "Postcode",
    countryCode: "Country",
    latitude: "Latitude",
    longitude: "Longitude",
    timezone: "Timezone",
    saveWeatherSettings: "Save weather",
    weatherSettingsLoaded: "Weather settings loaded.",
    weatherSettingsSaved: "Weather settings saved. Forecast refreshed.",
    weatherSettingsSaveFailed: "Unable to save weather settings",
    clear: "Clear",
    partly_cloudy: "Partly cloudy",
    cloudy: "Cloudy",
    fog: "Fog",
    drizzle: "Showers",
    rain: "Rain",
    snow: "Snow",
    storm: "Storm",
    unknown: "Unknown",
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
  },
  zh: {
    appEyebrow: "FoxCloud 电池仪表板",
    appTitle: "家庭能源控制中心",
    waitingForFoxCloud: "正在等待 FoxCloud 数据...",
    month: "月份",
    dashboardMonth: "仪表板月份",
    language: "语言",
    refresh: "刷新",
    rebuildCache: "重算缓存",
    exportPdf: "导出 PDF",
    exportCsv: "导出 CSV",
    loading: "正在加载仪表板数据...",
    loaded: "仪表板数据加载成功。",
    loadedCached: "实时 API 请求失败，当前显示缓存数据。",
    demoData: "演示数据",
    loadingRange: "正在加载所选表格范围...",
    loadedRange: "所选范围已加载。",
    rebuildingCache: "正在按所选范围重算缓存，可能需要一点时间...",
    rebuiltCache: "缓存已重算。",
    rebuildSummary: "已检查 {processed} 天，成功重算 {rebuilt} 天，保留原值 {skipped} 天。",
    rebuildLimited: " 本次限制为最近 {limit} 天；较早的 {omitted} 天没有重算。",
    rebuildCacheConfirm: "确定要用 FoxCloud 5 分钟历史数据重算所选范围吗？这可能会调用较多 FoxCloud API，并且最多只重算最近 {limit} 天。",
    rebuildCacheConfirmPreview: "确定要重算所选范围吗？本次最多重算 {days} 天，预计调用 {calls} 次 FoxCloud history API，并限制为最近 {limit} 天。",
    rebuildCacheConfirmLocal: "确定要用本地 Modbus/SQLite 数据刷新所选范围吗？这不会调用 FoxCloud。",
    rebuildCacheConfirmDemo: "当前是演示模式。重算不会调用 FoxCloud，也不会改变真实数据。是否继续？",
    unableToLoad: "无法加载仪表板",
    period: "周期",
    periodTotals: "能源总计",
    periodTotalsHelp: "选择一个周期来汇总每日能源数据。",
    tableRange: "表格范围",
    currentWeek: "本周",
    currentMonth: "这个月",
    previousMonth: "上一个月",
    last2Months: "近 2 个月",
    last3Months: "近 3 个月",
    last6Months: "近 6 个月",
    last12Months: "近 1 年",
    allData: "全部数据",
    totalSolarProduction: "太阳能总发电量",
    totalHomeUsage: "家庭总用电量",
    totalIntoBattery: "充入电池总量",
    totalOutBattery: "电池放电总量",
    totalReturnToGrid: "回馈电网总量",
    totalGridConsumption: "电网取电总量",
    totalSelfConsumption: "自发自用总量",
    estimatedSavings: "预估节省电费",
    todaySavings: "今日预估节省",
    savingsMeta: "约 {kwh} kWh 未从电网取电，按约 {rate}/kWh 估算",
    savingsBreakdown: "节省金额构成",
    savingsBreakdownTitle: "收益来自哪里",
    avoidedImportSavings: "少买电节省",
    exportCredit: "回馈电网收益",
    avoidedImportKwh: "少买电量",
    exportedKwh: "回馈电量",
    savingsForecast: "节省金额预测",
    savingsForecastTitle: "按当前速度估算",
    dailyAverageSavings: "每日平均",
    monthlyRunRate: "月度预测",
    annualRunRate: "年度预测",
    savingsForecastMeta: "基于 {range} 的 {days} 天数据估算；这是预测，不是账单。",
    billImpact: "账单影响",
    billImpactTitle: "预估少花了多少电费",
    withoutSolarBattery: "没有太阳能/电池时",
    gridEnergyCost: "实际电网用电成本",
    netCostAfterExport: "扣除回馈收益后",
    estimatedBenefit: "预估收益",
    billImpactMeta: "对比“全部家庭用电都从电网购买”的估算成本，以及实际电网用电和回馈收益后的结果。",
    periodHighlights: "周期亮点",
    periodHighlightsTitle: "这个范围里的最佳日期",
    bestSolarDay: "发电最好的一天",
    highestUsageDay: "用电最高的一天",
    bestExportDay: "回馈最多的一天",
    bestSavingsDay: "最省钱的一天",
    noPeriodData: "所选范围暂无数据",
    batteryPerformance: "电池表现",
    batteryPerformanceTitle: "电池在这个周期里的状态",
    batteryDischargeChargeRatio: "放电 / 充电比例",
    batteryRatioEstimateMeta: "仅为估算。周期开始/结束电池电量不同，会让它高于或低于真实往返效率。",
    batteryNetBalance: "电池净平衡",
    batteryThroughput: "电池吞吐量",
    batteryThroughputMeta: "充电和放电活动量",
    batteryMode: "电池模式",
    batteryNetCharged: "净充入",
    batteryNetDischarged: "净放出",
    batteryNetBalanced: "基本平衡",
    batteryModeCharging: "更多在储能",
    batteryModeDischarging: "更多在用储能",
    batteryModeBalanced: "充放电平衡",
    batteryModeMeta: "根据所选范围内的总充电量减去总放电量估算。",
    solarUtilization: "太阳能利用率",
    solarUtilizationTitle: "太阳能去了哪里",
    solarSelfUsed: "自家用掉的太阳能",
    solarExported: "回馈电网的太阳能",
    solarUtilizationTotal: "太阳能总发电",
    solarUtilizationTotalMeta: "所选周期总发电量",
    solarUtilizationMeta: "自用 {selfRate} · 回馈 {exportRate}",
    selfUseRateLabel: "自用率 {rate}",
    exportRateLabel: "回馈率 {rate}",
    tariffSettings: "电价设置",
    tariffSettingsTitle: "节省金额设置",
    tariffSettingsHelp: "在这里修改用电电价和回馈电价。设置会保存到 SQLite，重建容器后仍会保留。",
    peakStart: "高峰开始",
    peakEnd: "高峰结束",
    peakRate: "高峰电价",
    offPeakRate: "非高峰电价",
    feedInRate: "回馈电价",
    saveTariff: "保存电价",
    tariffLoaded: "电价设置已加载。",
    tariffSaved: "电价已保存，节省金额已更新。",
    tariffSaveFailed: "无法保存电价",
    kpiDailySolar: "今日太阳能",
    kpiDailyConsumption: "今日用电",
    kpiDailyExport: "今日回馈",
    kpiNetGrid: "电网净流向",
    kpiSelfSufficiency: "自给率",
    kpiEstimatedSavings: "预估节省",
    netGridExporting: "今天净回馈电网",
    netGridImporting: "今天净从电网取电",
    energyScoreKicker: "家庭能源评分",
    energyScoreTitle: "能源健康评分",
    energyScoreExcellent: "优秀",
    energyScoreGood: "良好",
    energyScoreWatch: "需要留意",
    energyScoreNeedsAttention: "需要关注",
    energyScoreDetail: "根据自给率、电池电量、电网流向、温度和今天的发电天气综合估算。",
    energyScoreSelfFactor: "自给率 {value}",
    energyScoreBatteryFactor: "电池 {value}",
    energyScoreGridFactor: "电网 {value}",
    energyScoreTempFactor: "温度 {value}",
    energyScoreWeatherFactor: "天气 {value}",
    dataQualityKicker: "数据质量",
    dataQualityTitle: "实时数据可信度",
    dataFreshness: "数据新鲜度",
    dataQualityFresh: "实时正常",
    dataQualityWatch: "需要留意",
    dataQualityStale: "数据偏旧",
    dataQualityFreshDetail: "实时数据看起来是最新的，目前没有仪表板警告。",
    dataQualityWatchDetail: "数据可以读取，但有警告或更新时间偏旧，需要留意。",
    dataQualityStaleDetail: "仪表板正在使用缓存、偏旧或缺失的实时数据，请检查容器和数据来源。",
    dataAgeMinutes: "{minutes} 分钟前",
    dataAgeUnknown: "更新时间未知",
    warningsLabel: "警告",
    warningsCount: "{count} 个警告",
    noWarnings: "没有警告",
    tariffTimeline: "电价时间轴",
    tariffTimelineHelp: "显示高峰电价时段，以及当前时间在一天中的位置。",
    currentTariff: "当前电价",
    nowLabel: "现在",
    savingsOverview: "节省金额总览",
    savingsOverviewHelp: "按常用周期估算太阳能和电池带来的电费收益。",
    savingsLoading: "正在计算...",
    todayVsRecent: "今日 vs 最近几天",
    trendSnapshot: "能源趋势快照",
    todayVsRecentHelp: "将今天和最近 7 天平均值对比，不包含今天。",
    operatingPattern: "运行模式",
    last24Heatmap: "过去 24 小时功率热力图",
    last24HeatmapHelp: "颜色越深，表示该部分系统工作越强。",
    last24HeatmapMeta: "过去 24 小时共 {points} 个采样点。颜色越深表示功率越高。",
    monthlyPattern: "月度模式",
    solarCalendar: "太阳能发电日历",
    solarCalendarHelp: "每天颜色越深表示发电越强，格子里同时显示当天自给率。",
    solarCalendarMeta: "显示 {days} 天。最佳发电日：{bestDay}，{bestSolar}。",
    solarCalendarSelf: "自给 {percent}%",
    weeklyRhythm: "每周节奏",
    weekdayProfile: "星期能源画像",
    weekdayProfileHelp: "按星期汇总每日平均太阳能、家庭用电和电网取电。",
    weekdayProfileMeta: "已汇总 {days} 天。平均发电最好的星期：{bestDay}。",
    avgSolar: "平均发电",
    avgHome: "平均用电",
    avgGrid: "平均电网",
    trendMeta: "最近平均 {average} • 相当于平均值 {percent}%",
    exportedToGrid: "已回馈电网",
    ofYesterday: "相当于昨天 {percent}%",
    noYesterdayData: "暂无昨天数据",
    excellentStatus: "优秀",
    goodStatus: "良好",
    needsGridSupport: "需要电网补充",
    systemStatus: "系统状态",
    inverter: "逆变器",
    lastUpdate: "最后更新",
    dataSource: "数据来源",
    gaugeSolarPower: "太阳能功率",
    gaugeBattery: "电池",
    gaugeHouseLoad: "家庭负载",
    gaugeGrid: "电网",
    producing: "发电中",
    consuming: "用电中",
    idle: "待机",
    todayPrefix: "今日",
    chargePower: "{value} 充电",
    dischargePower: "{value} 放电",
    netExportToday: "今日回馈 {value}",
    netImportToday: "今日取电 {value}",
    tariffWindow: "电价时段",
    batteryReadiness: "电池晚高峰准备度",
    gridModeNow: "当前电网状态",
    temperatureWatch: "温度监控",
    smartHint: "智能建议",
    peakNow: "正在高峰电价",
    offPeakNow: "当前非高峰",
    peakStartsIn: "距离高峰还有 {time}",
    peakEndsIn: "距离高峰结束 {time}",
    peakWindowDetail: "高峰 {window}，约 {rate}/kWh",
    batteryReadyHigh: "适合应对晚高峰",
    batteryReadyMedium: "注意晚间用电",
    batteryReadyLow: "晚高峰电量偏低",
    batteryReadinessDetail: "当前电池 {soc}；高峰时段 {window}",
    gridExportHint: "正在输出多余太阳能",
    gridImportHint: "正在从电网取电",
    gridNeutralHint: "电网接近平衡",
    gridDetail: "输入 {importKw}，输出 {exportKw}",
    temperatureNormal: "温度正常",
    temperatureWarm: "温度偏热",
    temperatureHot: "温度过高",
    temperatureUnavailable: "暂无温度数据",
    temperatureNormalDetail: "当前最高温度为 {component} 的 {temperature}。",
    temperatureWarmDetail: "{component} 当前 {temperature}，偏热，建议留意通风和负载。",
    temperatureHotDetail: "{component} 当前 {temperature}，温度较高，建议检查通风、逆变器和电池状态。",
    temperatureUnavailableDetail: "暂时没有实时电池或逆变器温度数据。",
    batteryMinComponent: "电池最低温",
    batteryMaxComponent: "电池最高温",
    batteryPackComponent: "电池包",
    inverterComponent: "逆变器",
    smartHintExporting: "现在适合运行可延后的用电设备，或继续给电池充电。",
    smartHintPeak: "当前是高峰电价，电池支撑最有价值。",
    smartHintLowBattery: "电池低于 50%，建议尽量把电留给高峰时段。",
    smartHintNormal: "系统状态稳定，继续关注天气和高峰电价时段。",
    energyCoachKicker: "能源建议",
    energyCoachTitle: "可执行的家庭能源建议",
    coachVerdictLabel: "今天总结",
    coachPeakLabel: "高峰计划",
    coachWeatherLabel: "明日发电",
    coachVerdictExcellent: "太阳能表现强",
    coachVerdictGood: "整体平衡",
    coachVerdictWatch: "留意电网用电",
    coachVerdictAlert: "今天较依赖电网",
    coachVerdictExportDetail: "自给率 {self}，净回馈 {net}。适合安排可延后的用电。",
    coachVerdictImportDetail: "自给率 {self}，净取电 {net}。高峰时段可考虑减少可延后的用电。",
    coachPeakReady: "高峰准备充分",
    coachPeakMedium: "可覆盖部分高峰",
    coachPeakLow: "高峰电量偏低",
    coachPeakActive: "正在高峰电价",
    coachPeakDetail: "电池 {soc}。高峰时段 {window}。当前电网流向 {grid}。",
    coachTomorrowExcellent: "明天非常适合发电",
    coachTomorrowGood: "明天适合发电",
    coachTomorrowFair: "明天发电一般",
    coachTomorrowPoor: "明天发电可能受限",
    coachWeatherUnavailable: "暂无天气预报",
    coachWeatherDetail: "{date}：{condition}，发电天气 {outlook}，降雨 {rain}。",
    coachWeatherUnavailableDetail: "天气预报暂不可用，请检查天气设置或稍后刷新。",
    energyBalance: "能源平衡",
    pvDistribution: "光伏去向",
    loadCoverage: "用电来源",
    homeUsageSource: "家庭用电来源",
    solarBatteryCovered: "太阳能 + 电池",
    selfSufficiency: "自给率",
    selfSufficiencyGauge: "自给率仪表盘",
    coveredBySolarBattery: "已覆盖",
    selfSufficiencyDetail: "{covered} 由太阳能/电池覆盖 • {grid} 来自电网",
    batteryDayBalance: "电池日平衡",
    gridDayBalance: "电网日平衡",
    netCharging: "净充电",
    netDischarging: "净放电",
    netExporting: "净回馈",
    netImporting: "净取电",
    balanced: "接近平衡",
    rangeSummary: "当前显示",
    liveFlow: "实时流向",
    energyDistribution: "能源分布",
    solar: "太阳能",
    grid: "电网",
    home: "家庭",
    battery: "电池",
    importing: "从电网取电",
    exporting: "送回电网",
    charging: "充电中",
    discharging: "放电中",
    today: "今日",
    productionUsage: "发电与用电",
    solarProduction: "太阳能发电",
    pvProduced: "光伏总发电",
    pvProducedNote: "今天的光伏总发电按 FoxCloud Analysis 口径计算：5 分钟功率曲线里的自发自用 + 回馈电网。过去日期使用 FoxCloud 每日报表数据。",
    selfConsumption: "自发自用",
    returnToGrid: "回馈电网",
    homeUsage: "家庭用电",
    gridConsumption: "电网用电",
    batteryLevel: "电池电量",
    intoBattery: "充入电池",
    outOfBattery: "电池放电",
    batteryTemp: "最低电池温度",
    batteryMaxTemp: "最高电池温度",
    batteryPackTemp: "电池包温度",
    inverterTemp: "逆变器温度",
    last24Hours: "过去 24 小时",
    last24Title: "电池电量、家庭用电与电池放电",
    system: "系统",
    solarGeneratedNow: "当前太阳能输出",
    solarNowHelp: "实时太阳能功率，不是小时累计",
    homeUsageNow: "当前家庭用电",
    homeNowHelp: "实时家庭用电需求",
    gridImportNow: "当前电网输入",
    gridImportHelp: "实时从电网取电功率",
    gridExportNow: "当前电网输出",
    gridExportHelp: "实时送回电网功率",
    batteryChargeNow: "当前电池充电",
    batteryChargeHelp: "实时充电功率",
    batteryDischargeNow: "当前电池放电",
    batteryDischargeHelp: "实时放电功率",
    lastHour: "过去 1 小时",
    lastHourTitle: "过去 1 小时能源统计",
    lastHourHelp: "这些是根据 FoxCloud 最近 60 分钟功率采样估算出来的 kWh 累计值。",
    lastHourTotalHelp: "最近 60 分钟估算电量",
    solarGeneratedLastHour: "过去 1 小时太阳能发电",
    homeUsageLastHour: "过去 1 小时家庭用电",
    gridImportLastHour: "过去 1 小时电网输入",
    gridExportLastHour: "过去 1 小时电网输出",
    batteryChargeLastHour: "过去 1 小时电池充电",
    batteryDischargeLastHour: "过去 1 小时电池放电",
    chart: "图表",
    dailyEnergyChart: "每日太阳能、电网与家庭用电",
    batteryChart: "电池充电与放电",
    table: "表格",
    dailyEnergyData: "每日能源数据",
    date: "日期",
    energyIntoBattery: "充入电池的电量",
    energyOutBattery: "电池放出的电量",
    unavailable: "暂无数据",
    noLiveTimestamp: "没有实时更新时间",
    liveUpdated: "实时更新",
    responseGenerated: "响应生成",
    online: "在线",
    fault: "故障",
    offline: "离线",
    batteryEnabled: "已启用电池",
    noBattery: "无电池",
    solarEnabled: "已启用太阳能",
    noSolar: "无太阳能",
    cachedFallback: "缓存数据",
    liveData: "实时数据",
    dailyEnergyKwh: "每日电量 (kWh)",
    batteryEnergyKwh: "电池电量 (kWh)",
    batteryLevelPercent: "电池电量 (%)",
    homeUsageKw: "家庭用电 (kW)",
    batteryDischargeKw: "电池放电 (kW)",
    powerKw: "功率 (kW)",
    noTableData: "目前还没有可导出的表格数据。",
    weather: "天气",
    solarForecast: "太阳能天气预报",
    solarOutlook: "发电天气",
    solarPerformance: "太阳能表现",
    solarPerformanceEarly: "现在还早",
    solarPerformanceOnTrack: "表现正常",
    solarPerformanceWeatherLimited: "受天气影响",
    solarPerformanceWatch: "值得留意",
    solarPerformanceLow: "天气不错但偏低",
    solarPerformanceNoBaseline: "正在建立基准",
    solarPerformanceEarlyDetail: "太阳能发电还在爬升中，建议稍晚再看。",
    solarPerformanceOnTrackDetail: "今天太阳能发电大致符合最近几天水平。",
    solarPerformanceWeatherDetail: "今天发电天气一般或较差，产量偏低可能主要是天气原因。",
    solarPerformanceWatchDetail: "今天产量低于最近几天，可留意云层、遮挡或逆变器状态。",
    solarPerformanceLowDetail: "天气看起来适合发电，但产量明显低于最近几天。",
    solarPerformanceNoBaselineDetail: "需要更多每日历史数据，才能判断今天的太阳能表现。",
    solarPerformanceMeta: "今天 {today}，最近平均 {average}（{percent}%）",
    rainChance: "下雨概率",
    cloudCover: "云量",
    weatherDisabled: "天气预报尚未配置。",
    weatherLocationSettings: "天气位置",
    weatherLocationTitle: "预报位置设置",
    weatherLocationHelp: "输入邮编或精确经纬度。设置会保存到 SQLite，并用于太阳能天气预报。",
    weatherEnabled: "启用天气",
    weatherDisplayName: "显示名称",
    postcode: "邮政编码",
    countryCode: "国家",
    latitude: "纬度",
    longitude: "经度",
    timezone: "时区",
    saveWeatherSettings: "保存天气",
    weatherSettingsLoaded: "天气位置设置已加载。",
    weatherSettingsSaved: "天气位置已保存，预报已刷新。",
    weatherSettingsSaveFailed: "无法保存天气位置",
    clear: "晴天",
    partly_cloudy: "局部多云",
    cloudy: "多云",
    fog: "有雾",
    drizzle: "阵雨",
    rain: "下雨",
    snow: "下雪",
    storm: "雷暴",
    unknown: "未知",
    excellent: "非常适合",
    good: "适合",
    fair: "一般",
    poor: "较差",
  },
  th: {
    appEyebrow: "แดชบอร์ดแบตเตอรี่ FoxCloud",
    appTitle: "ศูนย์ควบคุมพลังงานในบ้าน",
    waitingForFoxCloud: "กำลังรอข้อมูลจาก FoxCloud...",
    month: "เดือน",
    dashboardMonth: "เดือนของแดชบอร์ด",
    language: "ภาษา",
    refresh: "รีเฟรช",
    rebuildCache: "สร้างแคชใหม่",
    exportPdf: "ส่งออก PDF",
    exportCsv: "ส่งออก CSV",
    loading: "กำลังโหลดข้อมูลแดชบอร์ด...",
    loaded: "โหลดข้อมูลแดชบอร์ดสำเร็จ",
    loadedCached: "คำขอ API แบบสดล้มเหลว กำลังแสดงข้อมูลแคช",
    demoData: "ข้อมูลตัวอย่าง",
    loadingRange: "กำลังโหลดช่วงตารางที่เลือก...",
    loadedRange: "โหลดช่วงที่เลือกแล้ว",
    rebuildingCache: "กำลังสร้างแคชของช่วงที่เลือกใหม่ อาจใช้เวลาสักครู่...",
    rebuiltCache: "สร้างแคชใหม่แล้ว",
    rebuildSummary: "ตรวจสอบ {processed} วัน คำนวณใหม่ {rebuilt} วัน เก็บค่าเดิม {skipped} วัน",
    rebuildLimited: " จำกัดเฉพาะ {limit} วันล่าสุด; ไม่ได้สร้างใหม่ {omitted} วันเก่ากว่านั้น",
    rebuildCacheConfirm: "ต้องการสร้างแคชของช่วงที่เลือกใหม่ด้วยข้อมูลประวัติทุก 5 นาทีจาก FoxCloud หรือไม่? การทำงานนี้อาจเรียก API หลายครั้งและจำกัดเฉพาะ {limit} วันล่าสุด",
    rebuildCacheConfirmPreview: "ต้องการสร้างแคชช่วงที่เลือกใหม่หรือไม่? จะคำนวณใหม่ได้สูงสุด {days} วัน เรียก FoxCloud history API ประมาณ {calls} ครั้ง และจำกัดเฉพาะ {limit} วันล่าสุด",
    rebuildCacheConfirmLocal: "ต้องการรีเฟรชช่วงที่เลือกจากข้อมูล Modbus/SQLite ในเครื่องหรือไม่? จะไม่เรียก FoxCloud",
    rebuildCacheConfirmDemo: "กำลังใช้โหมดตัวอย่าง การสร้างใหม่จะไม่เรียก FoxCloud หรือเปลี่ยนข้อมูลจริง ต้องการดำเนินการต่อหรือไม่?",
    unableToLoad: "ไม่สามารถโหลดแดชบอร์ดได้",
    period: "ช่วงเวลา",
    periodTotals: "ยอดรวมพลังงาน",
    periodTotalsHelp: "เลือกช่วงเวลาเพื่อสรุปข้อมูลพลังงานรายวัน",
    tableRange: "ช่วงของตาราง",
    currentWeek: "สัปดาห์นี้",
    currentMonth: "เดือนนี้",
    previousMonth: "เดือนก่อน",
    last2Months: "2 เดือนล่าสุด",
    last3Months: "3 เดือนล่าสุด",
    last6Months: "6 เดือนล่าสุด",
    last12Months: "12 เดือนล่าสุด",
    allData: "ข้อมูลทั้งหมด",
    totalSolarProduction: "ยอดผลิตโซลาร์รวม",
    totalHomeUsage: "ยอดใช้ไฟในบ้านรวม",
    totalIntoBattery: "พลังงานเข้าแบตเตอรี่รวม",
    totalOutBattery: "พลังงานออกจากแบตเตอรี่รวม",
    totalReturnToGrid: "ส่งกลับเข้ากริดรวม",
    totalGridConsumption: "ใช้ไฟจากกริดรวม",
    totalSelfConsumption: "ใช้เองจากโซลาร์รวม",
    estimatedSavings: "เงินที่ประหยัดโดยประมาณ",
    todaySavings: "ประหยัดวันนี้โดยประมาณ",
    savingsMeta: "หลีกเลี่ยงการใช้ไฟจากกริด {kwh} kWh ที่ประมาณ {rate}/kWh",
    savingsBreakdown: "รายละเอียดเงินที่ประหยัด",
    savingsBreakdownTitle: "ผลประโยชน์มาจากไหน",
    avoidedImportSavings: "ประหยัดจากการไม่ซื้อไฟ",
    exportCredit: "เครดิตส่งออกไฟ",
    avoidedImportKwh: "หลีกเลี่ยงนำเข้า kWh",
    exportedKwh: "ส่งออก kWh",
    savingsForecast: "พยากรณ์เงินที่ประหยัด",
    savingsForecastTitle: "ประมาณการตามอัตราปัจจุบัน",
    dailyAverageSavings: "เฉลี่ยต่อวัน",
    monthlyRunRate: "ประมาณการต่อเดือน",
    annualRunRate: "ประมาณการต่อปี",
    savingsForecastMeta: "อิงจากข้อมูล {days} วันใน {range}; เป็นการประมาณ ไม่ใช่บิลจริง",
    billImpact: "ผลต่อบิล",
    billImpactTitle: "ค่าไฟที่หลีกเลี่ยงโดยประมาณ",
    withoutSolarBattery: "ถ้าไม่มีโซลาร์/แบตเตอรี่",
    gridEnergyCost: "ค่าไฟจากกริด",
    netCostAfterExport: "สุทธิหลังเครดิตส่งออก",
    estimatedBenefit: "ผลประโยชน์โดยประมาณ",
    billImpactMeta: "เปรียบเทียบค่าไฟโดยประมาณหากใช้ไฟบ้านทั้งหมดจากกริด กับการใช้กริดจริงและเครดิตส่งออก",
    periodHighlights: "ไฮไลต์ช่วงเวลา",
    periodHighlightsTitle: "วันที่ดีที่สุดในช่วงนี้",
    bestSolarDay: "วันที่ผลิตโซลาร์ดีที่สุด",
    highestUsageDay: "วันที่ใช้ไฟสูงสุด",
    bestExportDay: "วันที่ส่งออกสูงสุด",
    bestSavingsDay: "วันที่ประหยัดสูงสุด",
    noPeriodData: "ไม่มีข้อมูลในช่วงที่เลือก",
    batteryPerformance: "ประสิทธิภาพแบตเตอรี่",
    batteryPerformanceTitle: "พฤติกรรมแบตเตอรี่ในช่วงนี้",
    batteryDischargeChargeRatio: "สัดส่วนคายไฟ / ชาร์จ",
    batteryRatioEstimateMeta: "เป็นค่าประมาณเท่านั้น ระดับแบตต้น/ปลายช่วงอาจทำให้ต่างจากประสิทธิภาพจริง",
    batteryNetBalance: "สมดุลสุทธิแบตเตอรี่",
    batteryThroughput: "พลังงานผ่านแบตเตอรี่",
    batteryThroughputMeta: "กิจกรรมการชาร์จและคายไฟ",
    batteryMode: "โหมดแบตเตอรี่",
    batteryNetCharged: "ชาร์จสุทธิ",
    batteryNetDischarged: "คายไฟสุทธิ",
    batteryNetBalanced: "เกือบสมดุล",
    batteryModeCharging: "เก็บพลังงานมากกว่า",
    batteryModeDischarging: "ใช้พลังงานที่เก็บไว้มากกว่า",
    batteryModeBalanced: "ชาร์จ/คายไฟสมดุล",
    batteryModeMeta: "อิงจากพลังงานชาร์จรวมลบพลังงานคายไฟรวมในช่วงที่เลือก",
    solarUtilization: "การใช้โซลาร์",
    solarUtilizationTitle: "พลังงานโซลาร์ไปที่ไหน",
    solarSelfUsed: "โซลาร์ที่ใช้เอง",
    solarExported: "โซลาร์ที่ส่งออก",
    solarUtilizationTotal: "โซลาร์ทั้งหมด",
    solarUtilizationTotalMeta: "การผลิตในช่วงที่เลือก",
    solarUtilizationMeta: "ใช้เอง {selfRate} · ส่งออก {exportRate}",
    selfUseRateLabel: "อัตราใช้เอง {rate}",
    exportRateLabel: "อัตราส่งออก {rate}",
    tariffSettings: "อัตราค่าไฟ",
    tariffSettingsTitle: "ตั้งค่าการประหยัด",
    tariffSettingsHelp: "แก้ไขอัตราค่าไฟนำเข้าและรับซื้อไฟคืนได้ที่นี่ ข้อมูลจะบันทึกใน SQLite และไม่หายเมื่อสร้างคอนเทนเนอร์ใหม่",
    peakStart: "เริ่มช่วงพีค",
    peakEnd: "จบช่วงพีค",
    peakRate: "ค่าไฟช่วงพีค",
    offPeakRate: "ค่าไฟนอกพีค",
    feedInRate: "อัตรารับซื้อไฟคืน",
    saveTariff: "บันทึกค่าไฟ",
    tariffLoaded: "โหลดค่าไฟแล้ว",
    tariffSaved: "บันทึกค่าไฟแล้ว อัปเดตเงินที่ประหยัดแล้ว",
    tariffSaveFailed: "ไม่สามารถบันทึกค่าไฟได้",
    kpiDailySolar: "โซลาร์วันนี้",
    kpiDailyConsumption: "ใช้ไฟวันนี้",
    kpiDailyExport: "ส่งออกวันนี้",
    kpiNetGrid: "กริดสุทธิ",
    kpiSelfSufficiency: "พึ่งพาตนเอง",
    kpiEstimatedSavings: "ประหยัดโดยประมาณ",
    netGridExporting: "วันนี้ส่งออกสุทธิ",
    netGridImporting: "วันนี้นำเข้าสุทธิ",
    energyScoreKicker: "คะแนนพลังงานบ้าน",
    energyScoreTitle: "คะแนนสุขภาพพลังงาน",
    energyScoreExcellent: "ยอดเยี่ยม",
    energyScoreGood: "ดี",
    energyScoreWatch: "ควรติดตาม",
    energyScoreNeedsAttention: "ควรดูแล",
    energyScoreDetail: "อิงจากการพึ่งพาตนเอง ระดับแบตเตอรี่ การไหลของกริด อุณหภูมิ และแนวโน้มโซลาร์วันนี้",
    energyScoreSelfFactor: "พึ่งตนเอง {value}",
    energyScoreBatteryFactor: "แบต {value}",
    energyScoreGridFactor: "กริด {value}",
    energyScoreTempFactor: "อุณหภูมิ {value}",
    energyScoreWeatherFactor: "อากาศ {value}",
    dataQualityKicker: "คุณภาพข้อมูล",
    dataQualityTitle: "ความมั่นใจข้อมูลสด",
    dataFreshness: "ความใหม่ของข้อมูล",
    dataQualityFresh: "สด",
    dataQualityWatch: "ควรติดตาม",
    dataQualityStale: "ข้อมูลเก่า",
    dataQualityFreshDetail: "ข้อมูลสดดูเป็นปัจจุบันและไม่มีคำเตือน",
    dataQualityWatchDetail: "มีข้อมูลแล้ว แต่มีคำเตือนหรือเวลาอัปเดตค่อนข้างเก่า",
    dataQualityStaleDetail: "แดชบอร์ดกำลังใช้ข้อมูลแคช เก่า หรือไม่มีข้อมูลสด ควรตรวจคอนเทนเนอร์และแหล่งข้อมูล",
    dataAgeMinutes: "{minutes} นาทีที่แล้ว",
    dataAgeUnknown: "ไม่ทราบอายุข้อมูล",
    warningsLabel: "คำเตือน",
    warningsCount: "{count} คำเตือน",
    noWarnings: "ไม่มีคำเตือน",
    tariffTimeline: "ไทม์ไลน์ค่าไฟ",
    tariffTimelineHelp: "แสดงช่วงค่าไฟพีคและตำแหน่งเวลาปัจจุบันของวัน",
    currentTariff: "ค่าไฟตอนนี้",
    nowLabel: "ตอนนี้",
    savingsOverview: "ภาพรวมเงินที่ประหยัด",
    savingsOverviewHelp: "ประเมินผลประโยชน์จากโซลาร์และแบตเตอรี่ตามช่วงเวลาที่ใช้บ่อย",
    savingsLoading: "กำลังคำนวณ...",
    todayVsRecent: "วันนี้เทียบช่วงล่าสุด",
    trendSnapshot: "ภาพรวมแนวโน้มพลังงาน",
    todayVsRecentHelp: "เปรียบเทียบวันนี้กับค่าเฉลี่ย 7 วันล่าสุด โดยไม่รวมวันนี้",
    operatingPattern: "รูปแบบการทำงาน",
    last24Heatmap: "ฮีตแมปกำลังไฟ 24 ชั่วโมงล่าสุด",
    last24HeatmapHelp: "สีเข้มแสดงช่วงที่แต่ละส่วนทำงานหนักกว่า",
    last24HeatmapMeta: "{points} จุดข้อมูลใน 24 ชั่วโมงล่าสุด สีเข้มหมายถึงกำลังไฟสูงกว่า",
    monthlyPattern: "รูปแบบรายเดือน",
    solarCalendar: "ปฏิทินการผลิตโซลาร์",
    solarCalendarHelp: "สีเข้มแสดงวันที่ผลิตโซลาร์มากกว่า พร้อมเปอร์เซ็นต์พึ่งพาตัวเองในแต่ละวัน",
    solarCalendarMeta: "แสดง {days} วัน วันที่โซลาร์ดีที่สุด: {bestDay} ด้วย {bestSolar}",
    solarCalendarSelf: "พึ่งตัวเอง {percent}%",
    weeklyRhythm: "จังหวะรายสัปดาห์",
    weekdayProfile: "โปรไฟล์พลังงานตามวัน",
    weekdayProfileHelp: "ค่าเฉลี่ยโซลาร์ การใช้ไฟในบ้าน และการนำเข้ากริด แยกตามวันในสัปดาห์",
    weekdayProfileMeta: "จัดกลุ่ม {days} วัน วันที่โซลาร์เฉลี่ยดีที่สุด: {bestDay}",
    avgSolar: "โซลาร์เฉลี่ย",
    avgHome: "บ้านเฉลี่ย",
    avgGrid: "กริดเฉลี่ย",
    trendMeta: "ค่าเฉลี่ยล่าสุด {average} • {percent}% ของค่าเฉลี่ย",
    exportedToGrid: "ส่งออกเข้ากริด",
    ofYesterday: "{percent}% ของเมื่อวาน",
    noYesterdayData: "ไม่มีข้อมูลเมื่อวาน",
    excellentStatus: "ยอดเยี่ยม",
    goodStatus: "ดี",
    needsGridSupport: "ต้องพึ่งกริด",
    systemStatus: "สถานะระบบ",
    inverter: "อินเวอร์เตอร์",
    lastUpdate: "อัปเดตล่าสุด",
    dataSource: "แหล่งข้อมูล",
    gaugeSolarPower: "กำลังโซลาร์",
    gaugeBattery: "แบตเตอรี่",
    gaugeHouseLoad: "โหลดบ้าน",
    gaugeGrid: "กริด",
    producing: "กำลังผลิต",
    consuming: "กำลังใช้",
    idle: "นิ่ง",
    todayPrefix: "วันนี้",
    chargePower: "ชาร์จ {value}",
    dischargePower: "คายประจุ {value}",
    netExportToday: "ส่งออกวันนี้ {value}",
    netImportToday: "นำเข้าวันนี้ {value}",
    tariffWindow: "ช่วงค่าไฟ",
    batteryReadiness: "ความพร้อมแบตเตอรี่",
    gridModeNow: "สถานะกริดตอนนี้",
    temperatureWatch: "ตรวจอุณหภูมิ",
    smartHint: "คำแนะนำ",
    peakNow: "ช่วงพีคตอนนี้",
    offPeakNow: "นอกช่วงพีค",
    peakStartsIn: "พีคเริ่มใน {time}",
    peakEndsIn: "พีคจบใน {time}",
    peakWindowDetail: "พีค {window} ที่ {rate}/kWh",
    batteryReadyHigh: "พร้อมสำหรับช่วงพีค",
    batteryReadyMedium: "เฝ้าดูการใช้ช่วงเย็น",
    batteryReadyLow: "แบตต่ำสำหรับช่วงพีค",
    batteryReadinessDetail: "แบตเตอรี่ {soc}; ช่วงพีค {window}",
    gridExportHint: "กำลังส่งโซลาร์ส่วนเกิน",
    gridImportHint: "กำลังใช้ไฟจากกริด",
    gridNeutralHint: "กริดเกือบสมดุล",
    gridDetail: "นำเข้า {importKw}, ส่งออก {exportKw}",
    temperatureNormal: "ปกติ",
    temperatureWarm: "ค่อนข้างร้อน",
    temperatureHot: "ร้อนเกินไป",
    temperatureUnavailable: "ไม่มีข้อมูลอุณหภูมิ",
    temperatureNormalDetail: "ค่าสูงสุดคือ {temperature} ที่ {component}",
    temperatureWarmDetail: "{component} อยู่ที่ {temperature} ค่อนข้างร้อน ควรดูการระบายอากาศและโหลด",
    temperatureHotDetail: "{component} อยู่ที่ {temperature} ร้อนสูง ควรตรวจการระบายอากาศ อินเวอร์เตอร์ และแบตเตอรี่",
    temperatureUnavailableDetail: "ยังไม่มีข้อมูลอุณหภูมิแบตเตอรี่หรืออินเวอร์เตอร์แบบสด",
    batteryMinComponent: "แบตเตอรี่ต่ำสุด",
    batteryMaxComponent: "แบตเตอรี่สูงสุด",
    batteryPackComponent: "แพ็กแบตเตอรี่",
    inverterComponent: "อินเวอร์เตอร์",
    smartHintExporting: "เหมาะกับการใช้โหลดที่ยืดหยุ่น หรือชาร์จแบตเตอรี่ต่อ",
    smartHintPeak: "ช่วงค่าไฟพีคกำลังทำงาน แบตเตอรี่ช่วยคุ้มที่สุดตอนนี้",
    smartHintLowBattery: "แบตเตอรี่ต่ำกว่า 50%; ควรเก็บไว้ใช้ช่วงพีค",
    smartHintNormal: "ระบบค่อนข้างนิ่ง ติดตามอากาศและช่วงค่าไฟพีคต่อไป",
    energyCoachKicker: "โค้ชพลังงาน",
    energyCoachTitle: "คำแนะนำพลังงานที่ทำได้จริง",
    coachVerdictLabel: "สรุปวันนี้",
    coachPeakLabel: "แผนช่วงพีค",
    coachWeatherLabel: "โซลาร์พรุ่งนี้",
    coachVerdictExcellent: "โซลาร์วันนี้แข็งแรง",
    coachVerdictGood: "วันนี้สมดุลดี",
    coachVerdictWatch: "ติดตามการใช้กริด",
    coachVerdictAlert: "วันนี้พึ่งกริดมาก",
    coachVerdictExportDetail: "พึ่งตนเอง {self} และส่งออกสุทธิ {net} เหมาะกับการย้ายโหลดที่ยืดหยุ่น",
    coachVerdictImportDetail: "พึ่งตนเอง {self} และนำเข้าสุทธิ {net} ควรลดโหลดที่ยืดหยุ่นช่วงพีค",
    coachPeakReady: "พร้อมสำหรับช่วงพีค",
    coachPeakMedium: "รองรับพีคได้บางส่วน",
    coachPeakLow: "แบตต่ำสำหรับช่วงพีค",
    coachPeakActive: "ค่าไฟพีคกำลังทำงาน",
    coachPeakDetail: "แบตเตอรี่ {soc} ช่วงพีค {window} การไหลกริดตอนนี้ {grid}",
    coachTomorrowExcellent: "โอกาสโซลาร์ดีมาก",
    coachTomorrowGood: "โอกาสโซลาร์ดี",
    coachTomorrowFair: "โซลาร์พอใช้",
    coachTomorrowPoor: "โซลาร์อาจถูกจำกัด",
    coachWeatherUnavailable: "ไม่มีพยากรณ์",
    coachWeatherDetail: "{date}: {condition}, แนวโน้ม {outlook}, ฝน {rain}",
    coachWeatherUnavailableDetail: "ยังไม่มีพยากรณ์อากาศ ตรวจการตั้งค่าอากาศหรือลองรีเฟรชภายหลัง",
    energyBalance: "สมดุลพลังงาน",
    pvDistribution: "การกระจาย PV",
    loadCoverage: "แหล่งจ่ายโหลด",
    homeUsageSource: "แหล่งพลังงานของบ้าน",
    solarBatteryCovered: "โซลาร์ + แบตเตอรี่",
    selfSufficiency: "พึ่งพาตนเอง",
    selfSufficiencyGauge: "เกจพึ่งพาตนเอง",
    coveredBySolarBattery: "ครอบคลุม",
    selfSufficiencyDetail: "{covered} จากโซลาร์/แบตเตอรี่ • {grid} จากกริด",
    batteryDayBalance: "สมดุลแบตวันนี้",
    gridDayBalance: "สมดุลกริดวันนี้",
    netCharging: "ชาร์จสุทธิ",
    netDischarging: "คายประจุสุทธิ",
    netExporting: "ส่งออกสุทธิ",
    netImporting: "นำเข้าสุทธิ",
    balanced: "ใกล้สมดุล",
    rangeSummary: "กำลังแสดง",
    liveFlow: "การไหลแบบสด",
    energyDistribution: "การกระจายพลังงาน",
    solar: "โซลาร์",
    grid: "กริด",
    home: "บ้าน",
    battery: "แบตเตอรี่",
    importing: "กำลังนำเข้าจากกริด",
    exporting: "กำลังส่งออกไปกริด",
    charging: "กำลังชาร์จ",
    discharging: "กำลังคายประจุ",
    today: "วันนี้",
    productionUsage: "การผลิตและการใช้งาน",
    solarProduction: "การผลิตไฟฟ้าจากโซลาร์",
    pvProduced: "ไฟฟ้าที่ผลิตจาก PV",
    pvProducedNote: "สำหรับวันนี้ PV produced ใช้วิธีเดียวกับ FoxCloud Analysis คือ Self-consumption + Export จากกราฟกำลังไฟทุก 5 นาที ส่วนวันก่อนหน้าใช้ค่ารายงานรายวันของ FoxCloud",
    selfConsumption: "ใช้เองจากโซลาร์",
    returnToGrid: "ส่งกลับเข้ากริด",
    homeUsage: "การใช้ไฟในบ้าน",
    gridConsumption: "การใช้ไฟจากกริด",
    batteryLevel: "ระดับแบตเตอรี่",
    intoBattery: "เข้าแบตเตอรี่",
    outOfBattery: "ออกจากแบตเตอรี่",
    batteryTemp: "อุณหภูมิแบตเตอรี่ต่ำสุด",
    batteryMaxTemp: "อุณหภูมิแบตเตอรี่สูงสุด",
    batteryPackTemp: "อุณหภูมิแพ็กแบตเตอรี่",
    inverterTemp: "อุณหภูมิอินเวอร์เตอร์",
    last24Hours: "24 ชั่วโมงที่ผ่านมา",
    last24Title: "ระดับแบตเตอรี่ การใช้ไฟในบ้าน และการคายประจุแบตเตอรี่",
    system: "ระบบ",
    solarGeneratedNow: "โซลาร์ตอนนี้",
    solarNowHelp: "กำลังไฟโซลาร์แบบทันที ไม่ใช่ยอดรวมรายชั่วโมง",
    homeUsageNow: "การใช้ไฟในบ้านตอนนี้",
    homeNowHelp: "ความต้องการใช้ไฟในบ้านแบบทันที",
    gridImportNow: "นำเข้าจากกริดตอนนี้",
    gridImportHelp: "กำลังไฟที่รับจากกริดแบบทันที",
    gridExportNow: "ส่งออกไปกริดตอนนี้",
    gridExportHelp: "กำลังไฟที่ส่งกลับเข้ากริดแบบทันที",
    batteryChargeNow: "ชาร์จแบตเตอรี่ตอนนี้",
    batteryChargeHelp: "กำลังชาร์จแบบทันที",
    batteryDischargeNow: "คายประจุแบตเตอรี่ตอนนี้",
    batteryDischargeHelp: "กำลังคายประจุแบบทันที",
    lastHour: "1 ชั่วโมงที่ผ่านมา",
    lastHourTitle: "พลังงานในช่วง 1 ชั่วโมงที่ผ่านมา",
    lastHourHelp: "เป็นยอด kWh โดยประมาณจากตัวอย่างกำลังไฟของ FoxCloud ในช่วง 60 นาทีล่าสุด",
    lastHourTotalHelp: "พลังงานโดยประมาณในช่วง 60 นาทีล่าสุด",
    solarGeneratedLastHour: "โซลาร์ผลิตใน 1 ชั่วโมงที่ผ่านมา",
    homeUsageLastHour: "บ้านใช้ไฟใน 1 ชั่วโมงที่ผ่านมา",
    gridImportLastHour: "นำเข้าจากกริดใน 1 ชั่วโมงที่ผ่านมา",
    gridExportLastHour: "ส่งออกไปกริดใน 1 ชั่วโมงที่ผ่านมา",
    batteryChargeLastHour: "ชาร์จแบตเตอรี่ใน 1 ชั่วโมงที่ผ่านมา",
    batteryDischargeLastHour: "คายประจุแบตเตอรี่ใน 1 ชั่วโมงที่ผ่านมา",
    chart: "กราฟ",
    dailyEnergyChart: "โซลาร์ กริด และการใช้ไฟในบ้านรายวัน",
    batteryChart: "การชาร์จและคายประจุแบตเตอรี่",
    table: "ตาราง",
    dailyEnergyData: "ข้อมูลพลังงานรายวัน",
    date: "วันที่",
    energyIntoBattery: "พลังงานที่เข้าแบตเตอรี่",
    energyOutBattery: "พลังงานที่ออกจากแบตเตอรี่",
    unavailable: "ไม่มีข้อมูล",
    noLiveTimestamp: "ไม่มีเวลาอัปเดตแบบสด",
    liveUpdated: "อัปเดตแบบสด",
    responseGenerated: "สร้างคำตอบเมื่อ",
    online: "ออนไลน์",
    fault: "ขัดข้อง",
    offline: "ออฟไลน์",
    batteryEnabled: "เปิดใช้งานแบตเตอรี่",
    noBattery: "ไม่มีแบตเตอรี่",
    solarEnabled: "เปิดใช้งานโซลาร์",
    noSolar: "ไม่มีโซลาร์",
    cachedFallback: "ข้อมูลแคช",
    liveData: "ข้อมูลสด",
    dailyEnergyKwh: "พลังงานรายวัน (kWh)",
    batteryEnergyKwh: "พลังงานแบตเตอรี่ (kWh)",
    batteryLevelPercent: "ระดับแบตเตอรี่ (%)",
    homeUsageKw: "การใช้ไฟในบ้าน (kW)",
    batteryDischargeKw: "การคายประจุแบตเตอรี่ (kW)",
    powerKw: "กำลังไฟ (kW)",
    noTableData: "ยังไม่มีข้อมูลตารางให้ส่งออก",
    weather: "อากาศ",
    solarForecast: "พยากรณ์โซลาร์",
    solarOutlook: "แนวโน้มโซลาร์",
    solarPerformance: "ประสิทธิภาพโซลาร์",
    solarPerformanceEarly: "ยังเช้าอยู่",
    solarPerformanceOnTrack: "เป็นไปตามปกติ",
    solarPerformanceWeatherLimited: "จำกัดโดยสภาพอากาศ",
    solarPerformanceWatch: "ควรติดตาม",
    solarPerformanceLow: "ต่ำกว่าสภาพอากาศ",
    solarPerformanceNoBaseline: "กำลังสร้างฐานข้อมูล",
    solarPerformanceEarlyDetail: "การผลิตโซลาร์ยังเพิ่มขึ้นอยู่ ลองตรวจอีกครั้งช่วงสายหรือบ่าย",
    solarPerformanceOnTrackDetail: "การผลิตวันนี้ใกล้เคียงกับช่วงไม่กี่วันที่ผ่านมา",
    solarPerformanceWeatherDetail: "สภาพอากาศไม่เหมาะกับโซลาร์ ผลิตได้น้อยอาจมาจากอากาศ",
    solarPerformanceWatchDetail: "การผลิตต่ำกว่าช่วงที่ผ่านมา ควรดูเมฆ เงาบัง หรือสถานะอินเวอร์เตอร์",
    solarPerformanceLowDetail: "อากาศดูเหมาะกับการผลิต แต่ผลผลิตต่ำกว่าช่วงที่ผ่านมามาก",
    solarPerformanceNoBaselineDetail: "ต้องมีข้อมูลรายวันมากขึ้นก่อนประเมินผลผลิตวันนี้ได้",
    solarPerformanceMeta: "วันนี้ {today} เทียบค่าเฉลี่ยล่าสุด {average} ({percent}%)",
    rainChance: "โอกาสฝน",
    cloudCover: "เมฆปกคลุม",
    weatherDisabled: "ยังไม่ได้ตั้งค่าพยากรณ์อากาศ",
    weatherLocationSettings: "ตำแหน่งอากาศ",
    weatherLocationTitle: "ตั้งค่าพยากรณ์",
    weatherLocationHelp: "กรอกรหัสไปรษณีย์หรือพิกัด ข้อมูลจะบันทึกใน SQLite และใช้กับพยากรณ์โซลาร์",
    weatherEnabled: "เปิดใช้อากาศ",
    weatherDisplayName: "ชื่อที่แสดง",
    postcode: "รหัสไปรษณีย์",
    countryCode: "ประเทศ",
    latitude: "ละติจูด",
    longitude: "ลองจิจูด",
    timezone: "เขตเวลา",
    saveWeatherSettings: "บันทึกอากาศ",
    weatherSettingsLoaded: "โหลดการตั้งค่าอากาศแล้ว",
    weatherSettingsSaved: "บันทึกตำแหน่งอากาศแล้ว รีเฟรชพยากรณ์แล้ว",
    weatherSettingsSaveFailed: "ไม่สามารถบันทึกตำแหน่งอากาศได้",
    clear: "ฟ้าใส",
    partly_cloudy: "มีเมฆบางส่วน",
    cloudy: "มีเมฆมาก",
    fog: "หมอก",
    drizzle: "ฝนปรอย",
    rain: "ฝน",
    snow: "หิมะ",
    storm: "พายุ",
    unknown: "ไม่ทราบ",
    excellent: "ยอดเยี่ยม",
    good: "ดี",
    fair: "พอใช้",
    poor: "ไม่ดี",
  },
};

function t(key) {
  return translations[currentLanguage][key] ?? translations.en[key] ?? key;
}

function interpolate(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function formatKwh(value) {
  return `${Number(value ?? 0).toFixed(2)} kWh`;
}

function formatMoney(value, currency = "AUD") {
  const normalizedCurrency = currency || "AUD";

  try {
    return new Intl.NumberFormat(currentLanguage === "zh" ? "zh-CN" : currentLanguage === "th" ? "th-TH" : "en-AU", {
      style: "currency",
      currency: normalizedCurrency,
      currencyDisplay: "narrowSymbol",
    }).format(Number(value ?? 0));
  } catch {
    return `${normalizedCurrency} ${Number(value ?? 0).toFixed(2)}`;
  }
}

function formatRate(value, currency = "AUD") {
  return `${formatMoney(value, currency)}`;
}

function formatSavingsMeta(savings) {
  if (!savings) {
    return "--";
  }

  return interpolate(t("savingsMeta"), {
    kwh: Number(savings.avoidedGridImportKwh ?? 0).toFixed(2),
    rate: formatRate(savings.blendedImportRate, savings.currency),
  });
}

function formatKw(value) {
  return `${Number(value ?? 0).toFixed(2)} kW`;
}

function formatPercent(value) {
  if (value === null || value === undefined) {
    return t("unavailable");
  }

  return `${Number(value).toFixed(0)}%`;
}

function formatTemperature(value) {
  if (value === null || value === undefined) {
    return t("unavailable");
  }

  return `${Number(value).toFixed(1)}°C`;
}

function formatOptionalPercent(value) {
  if (value === null || value === undefined) {
    return "--";
  }

  return `${Number(value).toFixed(0)}%`;
}

function formatIntegerPercent(value) {
  if (!Number.isFinite(Number(value))) {
    return "--";
  }

  return `${Math.round(Number(value))}`;
}

function formatYesterdayComparison(todayValue, yesterdayValue) {
  const baseline = Number(yesterdayValue ?? 0);

  if (!Number.isFinite(baseline) || baseline <= 0) {
    return t("noYesterdayData");
  }

  const percent = Math.round((Number(todayValue ?? 0) / baseline) * 100);
  return interpolate(t("ofYesterday"), { percent });
}

function getLatestDailyRows(rows) {
  return [...(rows ?? [])]
    .filter((row) => row?.date)
    .sort((first, second) => first.date.localeCompare(second.date));
}

function getSelfSufficiencyStatus(percent) {
  if (percent >= 90) {
    return t("excellentStatus");
  }

  if (percent >= 70) {
    return t("goodStatus");
  }

  return t("needsGridSupport");
}

function calculateSelfSufficiency(today = {}) {
  const homeUsage = Number(today.homeUsageKwh ?? today.home_usage ?? 0);
  const gridConsumption = Number(today.gridConsumptionKwh ?? today.grid_consumption ?? 0);

  if (!Number.isFinite(homeUsage) || homeUsage <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, ((homeUsage - gridConsumption) / homeUsage) * 100));
}

function getRecentSolarAverage(rows) {
  return getRecentAverage(rows, "pv_production");
}

function getRecentAverage(rows, key) {
  const todayKey = formatLocalDateKey();
  const historicalValues = getLatestDailyRows(rows)
    .filter((row) => row.date && row.date < todayKey)
    .slice(-7)
    .map((row) => Number(row[key] ?? 0))
    .filter((value) => Number.isFinite(value) && value > 0);

  if (historicalValues.length === 0) {
    return null;
  }

  const total = historicalValues.reduce((sum, value) => sum + value, 0);
  return total / historicalValues.length;
}

function getSolarPerformance(payload, weatherPayload) {
  const todaySolar = Number(payload?.today?.solarProductionKwh ?? 0);
  const recentAverage = getRecentSolarAverage(payload?.dailyTable ?? []);
  const outlook = weatherPayload?.current?.solarOutlook ?? "unknown";
  const hour = new Date().getHours();

  if (!recentAverage) {
    return {
      tone: "neutral",
      statusKey: "solarPerformanceNoBaseline",
      detailKey: "solarPerformanceNoBaselineDetail",
      recentAverage: null,
      percent: null,
    };
  }

  const percent = (todaySolar / recentAverage) * 100;

  if (hour < 10) {
    return {
      tone: "neutral",
      statusKey: "solarPerformanceEarly",
      detailKey: "solarPerformanceEarlyDetail",
      recentAverage,
      percent,
    };
  }

  if (["poor", "fair"].includes(outlook) && percent < 85) {
    return {
      tone: "weather",
      statusKey: "solarPerformanceWeatherLimited",
      detailKey: "solarPerformanceWeatherDetail",
      recentAverage,
      percent,
    };
  }

  if (["excellent", "good"].includes(outlook) && percent < 60) {
    return {
      tone: "alert",
      statusKey: "solarPerformanceLow",
      detailKey: "solarPerformanceLowDetail",
      recentAverage,
      percent,
    };
  }

  if (percent >= 80) {
    return {
      tone: "good",
      statusKey: "solarPerformanceOnTrack",
      detailKey: "solarPerformanceOnTrackDetail",
      recentAverage,
      percent,
    };
  }

  return {
    tone: "watch",
    statusKey: "solarPerformanceWatch",
    detailKey: "solarPerformanceWatchDetail",
    recentAverage,
    percent,
  };
}

function renderSolarPerformance(payload, weatherPayload = lastWeatherPayload) {
  if (!payload || !weatherPayload?.enabled || !weatherPayload.current) {
    return;
  }

  const performance = getSolarPerformance(payload, weatherPayload);
  textFields.solarPerformanceCard.dataset.tone = performance.tone;
  textFields.solarPerformanceStatus.textContent = t(performance.statusKey);
  textFields.solarPerformanceDetail.textContent = t(performance.detailKey);
  textFields.solarPerformanceMeta.textContent = interpolate(t("solarPerformanceMeta"), {
    today: formatKwh(payload.today?.solarProductionKwh),
    average: performance.recentAverage === null ? "--" : formatKwh(performance.recentAverage),
    percent: performance.percent === null ? "--" : formatIntegerPercent(performance.percent),
  });
}

function setTrendBar(element, todayValue, averageValue) {
  const percent = averageValue > 0 ? Math.max(0, Math.min(140, (todayValue / averageValue) * 100)) : 0;
  element.style.width = `${Math.min(percent, 100).toFixed(1)}%`;
}

function renderTrendMetric({ todayElement, metaElement, barElement, todayValue, averageValue }) {
  todayElement.textContent = formatKwh(todayValue);

  if (!averageValue) {
    metaElement.textContent = t("noYesterdayData");
    setTrendBar(barElement, 0, 0);
    return;
  }

  const percent = Math.round((todayValue / averageValue) * 100);
  metaElement.textContent = interpolate(t("trendMeta"), {
    average: formatKwh(averageValue),
    percent,
  });
  setTrendBar(barElement, todayValue, averageValue);
}

function renderTrendSnapshot(payload) {
  const rows = payload?.dailyTable ?? [];
  const today = payload?.today ?? {};

  renderTrendMetric({
    todayElement: metricFields.trendSolarToday,
    metaElement: textFields.trendSolarMeta,
    barElement: textFields.trendSolarBar,
    todayValue: Number(today.solarProductionKwh ?? 0),
    averageValue: getRecentAverage(rows, "pv_production"),
  });
  renderTrendMetric({
    todayElement: metricFields.trendHomeToday,
    metaElement: textFields.trendHomeMeta,
    barElement: textFields.trendHomeBar,
    todayValue: Number(today.homeUsageKwh ?? 0),
    averageValue: getRecentAverage(rows, "home_usage"),
  });
  renderTrendMetric({
    todayElement: metricFields.trendExportToday,
    metaElement: textFields.trendExportMeta,
    barElement: textFields.trendExportBar,
    todayValue: Number(today.returnToGridKwh ?? 0),
    averageValue: getRecentAverage(rows, "daily_feedin"),
  });
  renderTrendMetric({
    todayElement: metricFields.trendGridToday,
    metaElement: textFields.trendGridMeta,
    barElement: textFields.trendGridBar,
    todayValue: Number(today.gridConsumptionKwh ?? 0),
    averageValue: getRecentAverage(rows, "grid_consumption"),
  });
}

function createHeatmapCell({ label, value, maxValue, tone }) {
  const cell = document.createElement("span");
  const numericValue = Number(value ?? 0);
  const intensity = maxValue > 0 ? Math.max(0.08, Math.min(1, numericValue / maxValue)) : 0;

  cell.className = `operational-heatmap-cell heat-${tone}`;
  cell.style.setProperty("--heat-intensity", intensity.toFixed(3));
  cell.title = `${label}: ${formatKw(numericValue)}`;
  cell.setAttribute("aria-label", cell.title);

  return cell;
}

function renderOperationalHeatmap(payload) {
  const heatmap = payload?.last24Hours ?? {};
  const labels = heatmap.labels ?? [];
  const rows = [
    { label: t("solar"), tone: "solar", values: heatmap.solarGeneratedKw ?? [] },
    { label: t("home"), tone: "home", values: heatmap.homeUsageKw ?? [] },
    { label: t("battery"), tone: "battery", values: heatmap.batteryDischargeKw ?? [] },
    { label: t("grid"), tone: "grid", values: heatmap.gridImportKw ?? [] },
  ];
  const pointCount = labels.length;

  textFields.operationalHeatmapGrid.replaceChildren();
  textFields.operationalHeatmapGrid.style.setProperty("--heatmap-columns", String(Math.max(pointCount, 1)));
  textFields.operationalHeatmapMeta.textContent = interpolate(t("last24HeatmapMeta"), {
    points: pointCount,
  });

  if (pointCount === 0) {
    const empty = document.createElement("p");
    empty.className = "muted-copy";
    empty.textContent = t("dataAgeUnknown");
    textFields.operationalHeatmapGrid.append(empty);
    return;
  }

  const axis = document.createElement("div");
  axis.className = "operational-heatmap-axis";
  const startLabel = document.createElement("span");
  startLabel.textContent = labels[0] ?? "";
  const midLabel = document.createElement("span");
  midLabel.textContent = labels[Math.floor((pointCount - 1) / 2)] ?? "";
  const endLabel = document.createElement("span");
  endLabel.textContent = labels[pointCount - 1] ?? "";
  axis.append(startLabel, midLabel, endLabel);

  for (const row of rows) {
    const rowElement = document.createElement("div");
    rowElement.className = "operational-heatmap-row";

    const rowLabel = document.createElement("strong");
    rowLabel.className = "operational-heatmap-row-label";
    rowLabel.textContent = row.label;

    const cells = document.createElement("div");
    cells.className = "operational-heatmap-cells";
    const maxValue = Math.max(...row.values.map((value) => Number(value ?? 0)).filter(Number.isFinite), 0);

    labels.forEach((label, index) => {
      cells.append(createHeatmapCell({
        label,
        value: row.values[index],
        maxValue,
        tone: row.tone,
      }));
    });

    rowElement.append(rowLabel, cells);
    textFields.operationalHeatmapGrid.append(rowElement);
  }

  textFields.operationalHeatmapGrid.append(axis);
}

function getLocalWeekdayIndex(dateString) {
  const day = new Date(`${dateString}T00:00:00`).getDay();
  return (day + 6) % 7;
}

function getSelfSufficiencyPercentFromRow(row) {
  const homeUsage = Number(row?.home_usage ?? 0);
  const gridConsumption = Number(row?.grid_consumption ?? 0);

  if (!Number.isFinite(homeUsage) || homeUsage <= 0) {
    return null;
  }

  return Math.max(0, Math.min(100, ((homeUsage - gridConsumption) / homeUsage) * 100));
}

function createSolarCalendarDay(row, maxSolar) {
  const solar = Number(row?.pv_production ?? row?.generation ?? 0);
  const selfPercent = getSelfSufficiencyPercentFromRow(row);
  const intensity = maxSolar > 0 ? Math.max(0.08, Math.min(1, solar / maxSolar)) : 0;
  const day = document.createElement("article");
  const dayNumber = document.createElement("strong");
  const solarValue = document.createElement("span");
  const selfValue = document.createElement("small");

  day.className = "solar-calendar-day";
  day.style.setProperty("--solar-day-intensity", intensity.toFixed(3));
  day.title = `${row.date}: ${formatKwh(solar)} · ${selfPercent === null ? t("unavailable") : formatPercent(selfPercent)}`;
  dayNumber.textContent = String(row.day);
  solarValue.textContent = formatKwh(solar).replace(" kWh", "");
  selfValue.textContent = interpolate(t("solarCalendarSelf"), {
    percent: selfPercent === null ? "--" : Math.round(selfPercent),
  });

  day.append(dayNumber, solarValue, selfValue);
  return day;
}

function renderSolarCalendar(payload) {
  const rows = getLatestDailyRows(payload?.dailyTable ?? []);
  const visibleRows = rows.filter((row) => Number(row?.day ?? 0) > 0);

  textFields.solarCalendarGrid.replaceChildren();

  if (visibleRows.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted-copy";
    empty.textContent = t("noPeriodData");
    textFields.solarCalendarGrid.append(empty);
    textFields.solarCalendarMeta.textContent = t("solarCalendarHelp");
    return;
  }

  const locale = currentLanguage === "zh" ? "zh-CN" : currentLanguage === "th" ? "th-TH" : "en-AU";
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(Date.UTC(2026, 0, 5 + index));
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  });
  const maxSolar = Math.max(...visibleRows.map((row) => Number(row.pv_production ?? row.generation ?? 0)), 0);
  const bestRow = visibleRows.reduce((best, row) => {
    const current = Number(row.pv_production ?? row.generation ?? 0);
    const bestValue = Number(best?.pv_production ?? best?.generation ?? -1);
    return current > bestValue ? row : best;
  }, visibleRows[0]);
  const firstOffset = getLocalWeekdayIndex(visibleRows[0].date);

  weekdays.forEach((weekday) => {
    const label = document.createElement("span");
    label.className = "solar-calendar-weekday";
    label.textContent = weekday;
    textFields.solarCalendarGrid.append(label);
  });

  for (let index = 0; index < firstOffset; index += 1) {
    const spacer = document.createElement("span");
    spacer.className = "solar-calendar-spacer";
    textFields.solarCalendarGrid.append(spacer);
  }

  visibleRows.forEach((row) => {
    textFields.solarCalendarGrid.append(createSolarCalendarDay(row, maxSolar));
  });

  textFields.solarCalendarMeta.textContent = interpolate(t("solarCalendarMeta"), {
    days: visibleRows.length,
    bestDay: bestRow?.date ?? "--",
    bestSolar: formatKwh(bestRow?.pv_production ?? bestRow?.generation),
  });
}

function getWeekdayLabels() {
  const locale = currentLanguage === "zh" ? "zh-CN" : currentLanguage === "th" ? "th-TH" : "en-AU";

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(Date.UTC(2026, 0, 5 + index));
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  });
}

function renderWeekdayProfile(payload) {
  const rows = getLatestDailyRows(payload?.dailyTable ?? []).filter((row) => row?.date);
  const groups = Array.from({ length: 7 }, (_, index) => ({
    index,
    solar: 0,
    home: 0,
    grid: 0,
    count: 0,
  }));

  textFields.weekdayProfileGrid.replaceChildren();

  if (rows.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted-copy";
    empty.textContent = t("noPeriodData");
    textFields.weekdayProfileGrid.append(empty);
    textFields.weekdayProfileMeta.textContent = t("weekdayProfileHelp");
    return;
  }

  rows.forEach((row) => {
    const group = groups[getLocalWeekdayIndex(row.date)];
    group.solar += Number(row.pv_production ?? row.generation ?? 0);
    group.home += Number(row.home_usage ?? 0);
    group.grid += Number(row.grid_consumption ?? 0);
    group.count += 1;
  });

  const averagedGroups = groups.map((group) => ({
    ...group,
    solarAverage: group.count > 0 ? group.solar / group.count : 0,
    homeAverage: group.count > 0 ? group.home / group.count : 0,
    gridAverage: group.count > 0 ? group.grid / group.count : 0,
  }));
  const maxValue = Math.max(
    ...averagedGroups.flatMap((group) => [group.solarAverage, group.homeAverage, group.gridAverage]),
    1,
  );
  const labels = getWeekdayLabels();
  const bestSolarGroup = averagedGroups.reduce((best, group) =>
    group.solarAverage > best.solarAverage ? group : best,
  );

  averagedGroups.forEach((group) => {
    const card = document.createElement("article");
    const label = document.createElement("strong");
    const bars = document.createElement("div");
    const details = document.createElement("div");

    card.className = "weekday-profile-card";
    label.textContent = labels[group.index];
    bars.className = "weekday-profile-bars";
    details.className = "weekday-profile-details";

    [
      { key: "avgSolar", className: "weekday-solar", value: group.solarAverage },
      { key: "avgHome", className: "weekday-home", value: group.homeAverage },
      { key: "avgGrid", className: "weekday-grid", value: group.gridAverage },
    ].forEach((item) => {
      const bar = document.createElement("span");
      const detail = document.createElement("small");
      const height = Math.max(6, (item.value / maxValue) * 100);

      bar.className = item.className;
      bar.style.height = `${height.toFixed(1)}%`;
      bar.title = `${t(item.key)}: ${formatKwh(item.value)}`;
      detail.textContent = `${t(item.key)} ${formatKwh(item.value).replace(" kWh", "")}`;
      bars.append(bar);
      details.append(detail);
    });

    card.append(label, bars, details);
    textFields.weekdayProfileGrid.append(card);
  });

  textFields.weekdayProfileMeta.textContent = interpolate(t("weekdayProfileMeta"), {
    days: rows.length,
    bestDay: labels[bestSolarGroup.index],
  });
}

function setGauge(arcElement, value, max) {
  const normalized = Math.max(0, Math.min(1, Number(value ?? 0) / max));
  arcElement.style.setProperty("--gauge-degrees", `${Math.round(normalized * 180)}deg`);
}

function parseClockMinutes(time) {
  const [hours, minutes] = String(time ?? "00:00").split(":").map(Number);
  return (Number(hours) || 0) * 60 + (Number(minutes) || 0);
}

function formatDurationMinutes(minutes) {
  const normalized = Math.max(0, Math.round(minutes));
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  return `${hours}h ${String(mins).padStart(2, "0")}m`;
}

function getTariffStatus(savings) {
  const [peakStart = "15:00", peakEnd = "20:59"] = String(savings?.peakWindow ?? "15:00-20:59").split("-");
  const start = parseClockMinutes(peakStart);
  const end = parseClockMinutes(peakEnd);
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  const isPeak = start <= end
    ? current >= start && current <= end
    : current >= start || current <= end;
  const minutesUntilStart = current <= start ? start - current : 24 * 60 - current + start;
  const minutesUntilEnd = current <= end && current >= start ? end - current : 0;

  return {
    isPeak,
    peakWindow: `${peakStart}-${peakEnd}`,
    peakStart,
    peakEnd,
    startMinutes: start,
    endMinutes: end,
    currentMinutes: current,
    detailKey: isPeak ? "peakEndsIn" : "peakStartsIn",
    detailMinutes: isPeak ? minutesUntilEnd : minutesUntilStart,
  };
}

function setTimelineSegment(element, leftPercent, widthPercent) {
  if (widthPercent <= 0) {
    element.hidden = true;
    return;
  }

  element.hidden = false;
  element.style.left = `${leftPercent.toFixed(2)}%`;
  element.style.width = `${widthPercent.toFixed(2)}%`;
}

function renderTariffTimeline(savings) {
  const tariff = getTariffStatus(savings);
  const dayMinutes = 24 * 60;
  const startPercent = (tariff.startMinutes / dayMinutes) * 100;
  const endPercent = ((tariff.endMinutes + 1) / dayMinutes) * 100;
  const currentPercent = (tariff.currentMinutes / dayMinutes) * 100;

  if (tariff.startMinutes <= tariff.endMinutes) {
    setTimelineSegment(textFields.tariffPeakSegmentA, startPercent, Math.max(endPercent - startPercent, 0));
    setTimelineSegment(textFields.tariffPeakSegmentB, 0, 0);
  } else {
    setTimelineSegment(textFields.tariffPeakSegmentA, 0, endPercent);
    setTimelineSegment(textFields.tariffPeakSegmentB, startPercent, 100 - startPercent);
  }

  textFields.tariffCurrentMarker.style.left = `${currentPercent.toFixed(2)}%`;
  textFields.tariffCurrentMarkerLabel.textContent = t("nowLabel");
  textFields.tariffTimelineStatus.textContent = tariff.isPeak ? t("peakNow") : t("offPeakNow");
  textFields.tariffTimelineDetail.textContent = `${interpolate(t(tariff.detailKey), {
    time: formatDurationMinutes(tariff.detailMinutes),
  })} · ${interpolate(t("peakWindowDetail"), {
    window: tariff.peakWindow,
    rate: formatRate(savings?.peakRate, savings?.currency),
  })}`;
  textFields.tariffTimelinePeakRate.textContent = formatRate(savings?.peakRate, savings?.currency);
  textFields.tariffTimelineOffPeakRate.textContent = formatRate(savings?.offPeakRate, savings?.currency);
  textFields.tariffTimelineFeedInRate.textContent = formatRate(savings?.feedInRate, savings?.currency);
}

function renderGaugeCards(payload) {
  const live = payload.live ?? {};
  const today = payload.today ?? {};
  const solarKw = Number(live.solarGeneratedKw ?? 0);
  const homeKw = Number(live.homeUsageKw ?? 0);
  const batteryChargeKw = Number(live.batteryChargeKw ?? 0);
  const batteryDischargeKw = Number(live.batteryDischargeKw ?? 0);
  const batteryFlowKw = Math.max(batteryChargeKw, batteryDischargeKw);
  const gridImportKw = Number(live.gridImportKw ?? 0);
  const gridExportKw = Number(live.gridExportKw ?? 0);
  const gridFlowKw = Math.max(gridImportKw, gridExportKw);
  const batterySoc = live.batterySocPercent;

  setGauge(textFields.gaugeSolarArc, solarKw, 10);
  setGauge(textFields.gaugeBatteryArc, batterySoc ?? batteryFlowKw, batterySoc === null || batterySoc === undefined ? 8 : 100);
  setGauge(textFields.gaugeHomeArc, homeKw, 8);
  setGauge(textFields.gaugeGridArc, gridFlowKw, 8);

  metricFields.gaugeSolarValue.textContent = formatKw(solarKw);
  metricFields.gaugeBatteryValue.textContent = batterySoc === null || batterySoc === undefined
    ? formatKw(batteryFlowKw)
    : formatPercent(batterySoc);
  metricFields.gaugeHomeValue.textContent = formatKw(homeKw);
  metricFields.gaugeGridValue.textContent = formatKw(gridFlowKw);

  textFields.gaugeSolarMode.textContent = solarKw > 0.05 ? t("producing") : t("idle");
  textFields.gaugeBatteryMode.textContent = batteryChargeKw >= batteryDischargeKw
    ? t("charging")
    : t("discharging");
  textFields.gaugeHomeMode.textContent = t("consuming");
  textFields.gaugeGridMode.textContent = gridExportKw >= gridImportKw ? t("exporting") : t("importing");

  textFields.gaugeSolarToday.textContent = `${t("todayPrefix")}: ${formatKwh(today.solarProductionKwh)}`;
  textFields.gaugeBatteryDetail.textContent = interpolate(
    batteryChargeKw >= batteryDischargeKw ? t("chargePower") : t("dischargePower"),
    { value: formatKw(batteryFlowKw) },
  );
  textFields.gaugeHomeToday.textContent = `${t("todayPrefix")}: ${formatKwh(today.homeUsageKwh)}`;
  textFields.gaugeGridToday.textContent = interpolate(
    gridExportKw >= gridImportKw ? t("netExportToday") : t("netImportToday"),
    { value: formatKwh(gridExportKw >= gridImportKw ? today.returnToGridKwh : today.gridConsumptionKwh) },
  );
}

function getTemperatureReadings(live) {
  return [
    { key: "batteryMinComponent", value: live.batteryMinTemperatureCelsius ?? live.batteryTemperatureCelsius },
    { key: "batteryMaxComponent", value: live.batteryMaxTemperatureCelsius },
    { key: "batteryPackComponent", value: live.batteryPackTemperatureCelsius },
    { key: "inverterComponent", value: live.inverterTemperatureCelsius },
  ].filter((reading) => Number.isFinite(Number(reading.value)));
}

function getTemperatureInsight(live) {
  const readings = getTemperatureReadings(live);

  if (readings.length === 0) {
    return {
      tone: "normal",
      statusKey: "temperatureUnavailable",
      detailKey: "temperatureUnavailableDetail",
      component: "",
      temperature: "",
    };
  }

  const hottest = readings.reduce((maxReading, reading) => (
    Number(reading.value) > Number(maxReading.value) ? reading : maxReading
  ));
  const temperature = Number(hottest.value);

  if (temperature >= 65) {
    return {
      tone: "hot",
      statusKey: "temperatureHot",
      detailKey: "temperatureHotDetail",
      component: t(hottest.key),
      temperature: formatTemperature(temperature),
    };
  }

  if (temperature >= 50) {
    return {
      tone: "warm",
      statusKey: "temperatureWarm",
      detailKey: "temperatureWarmDetail",
      component: t(hottest.key),
      temperature: formatTemperature(temperature),
    };
  }

  return {
    tone: "normal",
    statusKey: "temperatureNormal",
    detailKey: "temperatureNormalDetail",
    component: t(hottest.key),
    temperature: formatTemperature(temperature),
  };
}

function renderTemperatureInsight(live) {
  const insight = getTemperatureInsight(live);

  textFields.temperatureInsightCard.dataset.tone = insight.tone;
  textFields.insightTemperatureStatus.textContent = t(insight.statusKey);
  textFields.insightTemperatureDetail.textContent = interpolate(t(insight.detailKey), {
    component: insight.component,
    temperature: insight.temperature,
  });
}

function renderEnergyInsights(payload) {
  const live = payload.live ?? {};
  const savings = payload.todaySavings ?? {};
  const tariff = getTariffStatus(savings);
  const batterySoc = Number(live.batterySocPercent ?? 0);
  const gridImportKw = Number(live.gridImportKw ?? 0);
  const gridExportKw = Number(live.gridExportKw ?? 0);

  textFields.insightTariffStatus.textContent = tariff.isPeak ? t("peakNow") : t("offPeakNow");
  textFields.insightTariffDetail.textContent = `${interpolate(t(tariff.detailKey), {
    time: formatDurationMinutes(tariff.detailMinutes),
  })} · ${interpolate(t("peakWindowDetail"), {
    window: tariff.peakWindow,
    rate: formatRate(savings.peakRate, savings.currency),
  })}`;

  const batteryKey = batterySoc >= 80
    ? "batteryReadyHigh"
    : batterySoc >= 50
      ? "batteryReadyMedium"
      : "batteryReadyLow";
  textFields.insightBatteryReadiness.textContent = t(batteryKey);
  textFields.insightBatteryDetail.textContent = interpolate(t("batteryReadinessDetail"), {
    soc: formatPercent(live.batterySocPercent),
    window: tariff.peakWindow,
  });

  const gridModeKey = gridExportKw > gridImportKw + 0.05
    ? "gridExportHint"
    : gridImportKw > gridExportKw + 0.05
      ? "gridImportHint"
      : "gridNeutralHint";
  textFields.insightGridMode.textContent = t(gridModeKey);
  textFields.insightGridDetail.textContent = interpolate(t("gridDetail"), {
    importKw: formatKw(gridImportKw),
    exportKw: formatKw(gridExportKw),
  });

  renderTemperatureInsight(live);

  const smartHintKey = tariff.isPeak
    ? "smartHintPeak"
    : batterySoc < 50
      ? "smartHintLowBattery"
      : gridExportKw > 1
        ? "smartHintExporting"
        : "smartHintNormal";
  textFields.insightSmartHint.textContent = t(smartHintKey);
  textFields.insightSmartHintDetail.textContent = formatSavingsMeta(savings);
}

function setCoachCard(card, tone, statusKey, detail) {
  card.dataset.tone = tone;
  const statusId = card.id.replace("Card", "Status");
  const detailId = card.id.replace("Card", "Detail");

  document.getElementById(statusId).textContent = t(statusKey);
  document.getElementById(detailId).textContent = detail;
}

function renderEnergyCoach(payload, weatherPayload = lastWeatherPayload) {
  if (!payload?.today || !payload?.live) {
    return;
  }

  const today = payload.today;
  const live = payload.live;
  const selfSufficiency = calculateSelfSufficiency(today) ?? 0;
  const netGridKwh = Number(today.returnToGridKwh ?? 0) - Number(today.gridConsumptionKwh ?? 0);
  const isNetExporter = netGridKwh >= 0;
  const verdictTone = selfSufficiency >= 70
    ? "good"
    : selfSufficiency >= 50
      ? "watch"
      : "alert";
  const verdictStatus = selfSufficiency >= 90 && isNetExporter
    ? "coachVerdictExcellent"
    : selfSufficiency >= 70
      ? "coachVerdictGood"
      : selfSufficiency >= 50
        ? "coachVerdictWatch"
        : "coachVerdictAlert";
  const verdictDetail = interpolate(
    t(isNetExporter ? "coachVerdictExportDetail" : "coachVerdictImportDetail"),
    {
      self: formatOptionalPercent(selfSufficiency),
      net: formatKwh(Math.abs(netGridKwh)),
    },
  );

  setCoachCard(textFields.coachVerdictCard, verdictTone, verdictStatus, verdictDetail);

  const tariff = getTariffStatus(payload.todaySavings ?? {});
  const batterySoc = Number(live.batterySocPercent ?? 0);
  const gridImportKw = Number(live.gridImportKw ?? 0);
  const gridExportKw = Number(live.gridExportKw ?? 0);
  const gridFlow = gridExportKw >= gridImportKw
    ? `${t("exporting")} ${formatKw(gridExportKw)}`
    : `${t("importing")} ${formatKw(gridImportKw)}`;
  const peakTone = batterySoc >= 70
    ? "good"
    : batterySoc >= 40
      ? "watch"
      : "alert";
  const peakStatus = tariff.isPeak
    ? "coachPeakActive"
    : batterySoc >= 70
      ? "coachPeakReady"
      : batterySoc >= 40
        ? "coachPeakMedium"
        : "coachPeakLow";

  setCoachCard(
    textFields.coachPeakCard,
    tariff.isPeak && batterySoc < 40 ? "alert" : peakTone,
    peakStatus,
    interpolate(t("coachPeakDetail"), {
      soc: formatPercent(live.batterySocPercent),
      window: tariff.peakWindow,
      grid: gridFlow,
    }),
  );

  const tomorrow = weatherPayload?.daily?.[1] ?? null;

  if (!weatherPayload?.enabled || !tomorrow) {
    setCoachCard(
      textFields.coachWeatherCard,
      "watch",
      "coachWeatherUnavailable",
      t("coachWeatherUnavailableDetail"),
    );
    return;
  }

  const weatherTone = tomorrow.solarOutlook === "excellent" || tomorrow.solarOutlook === "good"
    ? "good"
    : tomorrow.solarOutlook === "fair"
      ? "watch"
      : "alert";
  const weatherStatus = {
    excellent: "coachTomorrowExcellent",
    good: "coachTomorrowGood",
    fair: "coachTomorrowFair",
    poor: "coachTomorrowPoor",
  }[tomorrow.solarOutlook] ?? "coachTomorrowFair";

  setCoachCard(
    textFields.coachWeatherCard,
    weatherTone,
    weatherStatus,
    interpolate(t("coachWeatherDetail"), {
      date: formatWeatherDate(tomorrow.date),
      condition: t(tomorrow.conditionKey),
      outlook: t(tomorrow.solarOutlook),
      rain: formatOptionalPercent(tomorrow.precipitationProbabilityMaxPercent),
    }),
  );
}

function setBarWidth(element, value, total) {
  const percent = total > 0 ? Math.max(0, Math.min(100, (Number(value ?? 0) / total) * 100)) : 0;
  element.style.width = `${percent.toFixed(1)}%`;
}

function renderBalanceBars(payload) {
  const today = payload.today ?? {};
  const pvTotal = Number(today.solarProductionKwh ?? 0);
  const pvSelf = Math.max(Number(today.selfConsumptionKwh ?? 0), 0);
  const pvExport = Math.max(Number(today.returnToGridKwh ?? 0), 0);
  const homeTotal = Number(today.homeUsageKwh ?? 0);
  const gridConsumption = Math.max(Number(today.gridConsumptionKwh ?? 0), 0);
  const selfCovered = Math.max(homeTotal - gridConsumption, 0);
  const batteryCharge = Math.max(Number(today.energyGoingIntoBatteryKwh ?? 0), 0);
  const batteryDischarge = Math.max(Number(today.energyComingOutOfBatteryKwh ?? 0), 0);
  const batteryNet = batteryCharge - batteryDischarge;
  const gridNet = pvExport - gridConsumption;
  const nearZeroThreshold = 0.05;

  textFields.balancePvTotal.textContent = formatKwh(pvTotal);
  textFields.balancePvSelf.textContent = formatKwh(pvSelf);
  textFields.balancePvExport.textContent = formatKwh(pvExport);
  textFields.balanceLoadTotal.textContent = formatKwh(homeTotal);
  textFields.balanceLoadSelf.textContent = formatKwh(selfCovered);
  textFields.balanceLoadGrid.textContent = formatKwh(gridConsumption);
  textFields.balanceSelfValue.textContent = formatOptionalPercent(calculateSelfSufficiency(today));
  textFields.balanceSelfDetail.textContent = interpolate(t("selfSufficiencyDetail"), {
    covered: formatKwh(selfCovered),
    grid: formatKwh(gridConsumption),
  });
  textFields.balanceBatteryMode.textContent = Math.abs(batteryNet) <= nearZeroThreshold
    ? t("balanced")
    : t(batteryNet > 0 ? "netCharging" : "netDischarging");
  textFields.balanceBatteryNet.textContent = formatKwh(Math.abs(batteryNet));
  textFields.balanceBatteryCharge.textContent = formatKwh(batteryCharge);
  textFields.balanceBatteryDischarge.textContent = formatKwh(batteryDischarge);
  textFields.balanceGridMode.textContent = Math.abs(gridNet) <= nearZeroThreshold
    ? t("balanced")
    : t(gridNet > 0 ? "netExporting" : "netImporting");
  textFields.balanceGridNet.textContent = formatKwh(Math.abs(gridNet));
  textFields.balanceGridExport.textContent = formatKwh(pvExport);
  textFields.balanceGridImport.textContent = formatKwh(gridConsumption);

  setBarWidth(textFields.balancePvSelfBar, pvSelf, pvTotal || pvSelf + pvExport);
  setBarWidth(textFields.balancePvExportBar, pvExport, pvTotal || pvSelf + pvExport);
  setBarWidth(textFields.balanceLoadSelfBar, selfCovered, homeTotal);
  setBarWidth(textFields.balanceLoadGridBar, gridConsumption, homeTotal);
  setBarWidth(textFields.balanceBatteryChargeBar, batteryCharge, batteryCharge + batteryDischarge);
  setBarWidth(textFields.balanceBatteryDischargeBar, batteryDischarge, batteryCharge + batteryDischarge);
  setBarWidth(textFields.balanceGridExportBar, pvExport, pvExport + gridConsumption);
  setBarWidth(textFields.balanceGridImportBar, gridConsumption, pvExport + gridConsumption);
  textFields.balanceSelfRing.style.setProperty(
    "--self-percent",
    `${Math.max(0, Math.min(100, calculateSelfSufficiency(today) ?? 0)).toFixed(1)}%`,
  );
}

function renderTariffSettings(tariff) {
  if (!tariff) {
    return;
  }

  lastTariff = tariff;
  textFields.tariffPeakStartInput.value = tariff.peakStart ?? "15:00";
  textFields.tariffPeakEndInput.value = tariff.peakEnd ?? "20:59";
  textFields.tariffPeakRateInput.value = tariff.peakRate ?? 0;
  textFields.tariffOffPeakRateInput.value = tariff.offPeakRate ?? 0;
  textFields.tariffFeedInRateInput.value = tariff.feedInRate ?? 0;
  textFields.tariffStatusText.textContent = interpolate(t("peakWindowDetail"), {
    window: `${tariff.peakStart ?? "15:00"}-${tariff.peakEnd ?? "20:59"}`,
    rate: formatRate(tariff.peakRate, tariff.currency),
  });
}

async function loadTariffSettings() {
  const response = await fetch("/api/tariff");
  const payload = await response.json();

  if (!response.ok || payload.error) {
    throw new Error(payload.error || "Tariff request failed.");
  }

  renderTariffSettings(payload.tariff);
}

function collectTariffSettings() {
  return {
    currency: lastTariff?.currency ?? "AUD",
    peakStart: textFields.tariffPeakStartInput.value,
    peakEnd: textFields.tariffPeakEndInput.value,
    peakRate: Number(textFields.tariffPeakRateInput.value),
    offPeakRate: Number(textFields.tariffOffPeakRateInput.value),
    feedInRate: Number(textFields.tariffFeedInRateInput.value),
  };
}

async function saveTariffSettings() {
  saveTariffButton.disabled = true;
  textFields.tariffStatusText.textContent = t("loading");

  try {
    const response = await fetch("/api/tariff", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collectTariffSettings()),
    });
    const payload = await response.json();

    if (!response.ok || payload.error) {
      throw new Error(payload.error || "Tariff save failed.");
    }

    renderTariffSettings(payload.tariff);
    await loadDashboard();
    textFields.tariffStatusText.textContent = t("tariffSaved");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    textFields.tariffStatusText.textContent = `${t("tariffSaveFailed")}: ${message}`;
  } finally {
    saveTariffButton.disabled = false;
  }
}

function formatOptionalMillimetres(value) {
  if (value === null || value === undefined) {
    return "--";
  }

  return `${Number(value).toFixed(1)} mm`;
}

function formatTimestamp(value) {
  if (!value) {
    return t("noLiveTimestamp");
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString();
}

function formatCurrentDateTime() {
  const locale = {
    en: "en-AU",
    zh: "zh-CN",
    th: "th-TH",
  }[currentLanguage] ?? "en-AU";

  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date());
}

function formatLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getSelectedMonthLabel() {
  return monthPicker.value || formatLocalDateKey().slice(0, 7);
}

function applyLanguage() {
  const htmlLang = {
    en: "en",
    zh: "zh-CN",
    th: "th",
  }[currentLanguage] ?? "en";

  document.documentElement.lang = htmlLang;
  languageSelect.value = currentLanguage;
  periodRangeSelect.value = tableRangeSelect.value;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  textFields.currentDateTime.textContent = formatCurrentDateTime();

  if (lastWeatherPayload) {
    renderWeather(lastWeatherPayload);
    renderSolarPerformance(lastPayload, lastWeatherPayload);
  }

  if (lastTariff) {
    renderTariffSettings(lastTariff);
  }

  if (lastWeatherSettings) {
    renderWeatherSettings(lastWeatherSettings);
  }

  if (!lastPayload) {
    statusText.textContent = t("loading");
  }
}

function getWeatherIcon(conditionKey) {
  const icons = {
    clear: "☀",
    partly_cloudy: "⛅",
    cloudy: "☁",
    fog: "🌫",
    drizzle: "🌦",
    rain: "🌧",
    snow: "❄",
    storm: "⛈",
    unknown: "○",
  };

  return icons[conditionKey] ?? icons.unknown;
}

function formatWeatherDate(dateKey) {
  const parsed = new Date(`${dateKey}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return dateKey;
  }

  return new Intl.DateTimeFormat(
    { en: "en-AU", zh: "zh-CN", th: "th-TH" }[currentLanguage] ?? "en-AU",
    { weekday: "short", day: "numeric" },
  ).format(parsed);
}

function renderWeatherSettings(settings) {
  if (!settings) {
    return;
  }

  lastWeatherSettings = settings;
  textFields.weatherEnabledInput.checked = Boolean(settings.enabled);
  textFields.weatherLocationNameInput.value = settings.locationName ?? "";
  textFields.weatherPostcodeInput.value = settings.postcode ?? "";
  textFields.weatherCountryCodeInput.value = settings.countryCode ?? "";
  textFields.weatherLatitudeInput.value = settings.latitude === null || settings.latitude === undefined
    ? ""
    : settings.latitude;
  textFields.weatherLongitudeInput.value = settings.longitude === null || settings.longitude === undefined
    ? ""
    : settings.longitude;
  textFields.weatherTimezoneInput.value = settings.timezone ?? "Australia/Sydney";
  textFields.weatherSettingsStatusText.textContent = t("weatherSettingsLoaded");
}

async function loadWeatherSettings() {
  const response = await fetch("/api/weather-settings");
  const payload = await response.json();

  if (!response.ok || payload.error) {
    throw new Error(payload.error || "Weather settings request failed.");
  }

  renderWeatherSettings(payload.settings);
}

function collectWeatherSettings() {
  return {
    enabled: textFields.weatherEnabledInput.checked,
    provider: lastWeatherSettings?.provider ?? "open-meteo",
    locationName: textFields.weatherLocationNameInput.value,
    postcode: textFields.weatherPostcodeInput.value,
    countryCode: textFields.weatherCountryCodeInput.value,
    latitude: textFields.weatherLatitudeInput.value,
    longitude: textFields.weatherLongitudeInput.value,
    timezone: textFields.weatherTimezoneInput.value,
  };
}

async function saveWeatherSettings() {
  saveWeatherSettingsButton.disabled = true;
  textFields.weatherSettingsStatusText.textContent = t("loading");

  try {
    const response = await fetch("/api/weather-settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collectWeatherSettings()),
    });
    const payload = await response.json();

    if (!response.ok || payload.error) {
      throw new Error(payload.error || "Weather settings save failed.");
    }

    renderWeatherSettings(payload.settings);
    await loadWeather();
    textFields.weatherSettingsStatusText.textContent = t("weatherSettingsSaved");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    textFields.weatherSettingsStatusText.textContent = `${t("weatherSettingsSaveFailed")}: ${message}`;
  } finally {
    saveWeatherSettingsButton.disabled = false;
  }
}

function getTimestampAgeMinutes(value) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return Math.max(0, Math.round((Date.now() - parsed.getTime()) / 60_000));
}

function formatDataAge(value) {
  const ageMinutes = getTimestampAgeMinutes(value);

  if (ageMinutes === null) {
    return t("dataAgeUnknown");
  }

  return interpolate(t("dataAgeMinutes"), { minutes: ageMinutes });
}

function renderWeather(payload) {
  lastWeatherPayload = payload;

  if (!payload?.enabled || !payload.current) {
    weatherPanel.classList.add("hidden");
    return;
  }

  const current = payload.current;
  const locationName = payload.location?.name
    || [payload.location?.latitude?.toFixed(3), payload.location?.longitude?.toFixed(3)].filter(Boolean).join(", ");

  weatherPanel.classList.remove("hidden");
  textFields.weatherLocation.textContent = locationName || t("weather");
  textFields.weatherIcon.textContent = getWeatherIcon(current.conditionKey);
  textFields.weatherTemperature.textContent = formatTemperature(current.temperatureCelsius);
  textFields.weatherCondition.textContent = t(current.conditionKey);
  textFields.weatherSolarOutlook.textContent = t(current.solarOutlook);
  textFields.weatherSolarOutlook.dataset.outlook = current.solarOutlook;
  textFields.weatherRainChance.textContent = formatOptionalPercent(current.precipitationProbabilityPercent);
  textFields.weatherCloudCover.textContent = formatOptionalPercent(current.cloudCoverPercent);

  const forecastCards = (payload.daily ?? []).slice(0, 5).map((day) => {
    const card = document.createElement("article");
    const date = document.createElement("strong");
    const icon = document.createElement("span");
    const condition = document.createElement("span");
    const temperature = document.createElement("span");
    const rain = document.createElement("small");

    card.className = "weather-day";
    icon.className = "weather-day-icon";
    date.textContent = formatWeatherDate(day.date);
    icon.textContent = getWeatherIcon(day.conditionKey);
    condition.textContent = t(day.conditionKey);
    temperature.textContent = `${formatTemperature(day.temperatureMinCelsius)} / ${formatTemperature(day.temperatureMaxCelsius)}`;
    rain.textContent = `${t("rainChance")}: ${formatOptionalPercent(day.precipitationProbabilityMaxPercent)} · ${formatOptionalMillimetres(day.precipitationSumMm)}`;
    card.append(date, icon, condition, temperature, rain);

    return card;
  });

  textFields.weatherDaily.replaceChildren(...forecastCards);
  renderSolarPerformance(lastPayload, payload);
  renderEnergyScore(lastPayload, payload);
  renderEnergyCoach(lastPayload, payload);
}

async function loadWeather() {
  try {
    const response = await fetch("/api/weather");
    const payload = await response.json();

    if (!response.ok || payload.error) {
      throw new Error(payload.error || "Weather request failed.");
    }

    renderWeather(payload);
  } catch (error) {
    lastWeatherPayload = null;
    weatherPanel.classList.add("hidden");
  }
}

function getBadgeTone(tone) {
  const allowedTones = new Set(["online", "offline", "warning", "battery", "solar", "neutral", "live"]);

  return allowedTones.has(tone) ? tone : "neutral";
}

function buildBadge(label, tone) {
  const badge = document.createElement("span");
  badge.classList.add("badge", `badge-${getBadgeTone(tone)}`);
  badge.textContent = label;

  return badge;
}

function renderBadges(payload) {
  const dataBadgeLabel = payload.source === "cache"
    ? t("cachedFallback")
    : payload.source === "demo"
      ? t("demoData")
      : t("liveData");
  const dataBadgeTone = payload.source === "cache"
    ? "warning"
    : payload.source === "demo"
      ? "neutral"
      : "live";
  const badges = [
    buildBadge(t(payload.device.status), payload.device.status),
    buildBadge(payload.device.hasBattery ? t("batteryEnabled") : t("noBattery"), payload.device.hasBattery ? "battery" : "neutral"),
    buildBadge(payload.device.hasPV ? t("solarEnabled") : t("noSolar"), payload.device.hasPV ? "solar" : "neutral"),
    buildBadge(dataBadgeLabel, dataBadgeTone),
  ];

  textFields.badgeRow.replaceChildren(...badges);
}

function getDataQuality(payload) {
  const liveAgeMinutes = getTimestampAgeMinutes(payload.live?.updatedAt);
  const warningCount = payload.warnings?.length ?? 0;
  const hasStaleSource = payload.isStale || payload.source === "cache";
  const hasMissingLiveAge = liveAgeMinutes === null;

  if (hasStaleSource || hasMissingLiveAge || liveAgeMinutes > 15) {
    return {
      tone: "stale",
      statusKey: "dataQualityStale",
      detailKey: "dataQualityStaleDetail",
    };
  }

  if (warningCount > 0 || liveAgeMinutes > 5) {
    return {
      tone: "watch",
      statusKey: "dataQualityWatch",
      detailKey: "dataQualityWatchDetail",
    };
  }

  return {
    tone: "fresh",
    statusKey: "dataQualityFresh",
    detailKey: "dataQualityFreshDetail",
  };
}

function renderDataQuality(payload) {
  const quality = getDataQuality(payload);
  const warningCount = payload.warnings?.length ?? 0;

  textFields.dataQualityPanel.dataset.tone = quality.tone;
  textFields.dataQualityStatus.textContent = t(quality.statusKey);
  textFields.dataQualityDetail.textContent = t(quality.detailKey);
  textFields.dataQualityFreshness.textContent = formatDataAge(payload.live?.updatedAt);
  textFields.dataQualitySource.textContent = payload.source ?? "--";
  textFields.dataQualityWarnings.textContent = warningCount > 0
    ? interpolate(t("warningsCount"), { count: warningCount })
    : t("noWarnings");
  textFields.dataQualityResponse.textContent = formatTimestamp(payload.generatedAt);
}

function renderWarnings(warnings) {
  if (!warnings || warnings.length === 0) {
    warningBox.classList.add("hidden");
    warningBox.replaceChildren();
    return;
  }

  warningBox.classList.remove("hidden");
  warningBox.replaceChildren(
    ...warnings.map((item) => {
      const warning = document.createElement("p");
      warning.textContent = item;
      return warning;
    }),
  );
}

function getMaxValues(rows) {
  const numericKeys = [
    "generation",
    "pv_production",
    "self_consumption",
    "daily_feedin",
    "home_usage",
    "grid_consumption",
    "daily_charged_energy_total",
    "daily_discharged_energy_total",
  ];

  return Object.fromEntries(
    numericKeys.map((key) => [key, Math.max(...rows.map((row) => Number(row[key] ?? 0)))]),
  );
}

function sortRows(rows) {
  return [...rows].sort((first, second) => {
    const firstValue = first[sortState.key];
    const secondValue = second[sortState.key];
    const direction = sortState.direction === "asc" ? 1 : -1;

    if (sortState.key === "date") {
      return firstValue.localeCompare(secondValue) * direction;
    }

    return (Number(firstValue) - Number(secondValue)) * direction;
  });
}

function renderSortButtons() {
  document.querySelectorAll(".sort-button").forEach((button) => {
    const isActive = button.dataset.sortKey === sortState.key;
    button.classList.toggle("active", isActive);
    button.dataset.direction = isActive ? sortState.direction : "none";
  });
}

function renderTable(rows) {
  const maxValues = getMaxValues(rows);
  const sortedRows = sortRows(rows);
  const valueClass = (key, value) => (Number(value) === maxValues[key] && Number(value) > 0 ? "table-max" : "");

  const tableRows = sortedRows.map((row) => {
    const tableRow = document.createElement("tr");
    const cells = [
      { value: row.date },
      { key: "pv_production", value: formatKwh(row.pv_production), rawValue: row.pv_production },
      { key: "self_consumption", value: formatKwh(row.self_consumption), rawValue: row.self_consumption },
      { key: "daily_feedin", value: formatKwh(row.daily_feedin), rawValue: row.daily_feedin },
      { key: "home_usage", value: formatKwh(row.home_usage), rawValue: row.home_usage },
      { key: "grid_consumption", value: formatKwh(row.grid_consumption), rawValue: row.grid_consumption },
      {
        key: "daily_charged_energy_total",
        value: formatKwh(row.daily_charged_energy_total),
        rawValue: row.daily_charged_energy_total,
      },
      {
        key: "daily_discharged_energy_total",
        value: formatKwh(row.daily_discharged_energy_total),
        rawValue: row.daily_discharged_energy_total,
      },
    ];

    cells.forEach((cell) => {
      const tableCell = document.createElement("td");

      if (cell.key) {
        tableCell.className = valueClass(cell.key, cell.rawValue);
      }

      tableCell.textContent = cell.value;
      tableRow.append(tableCell);
    });

    return tableRow;
  });

  dailyTableBody.replaceChildren(...tableRows);
  renderSortButtons();
}

function escapeCsvValue(value) {
  return window.FoxCloudCsv.escapeCsvValue(value);
}

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportTableToCsv() {
  if (!currentRows.length) {
    statusText.textContent = t("noTableData");
    return;
  }

  const headers = [
    t("date"),
    t("pvProduced"),
    t("selfConsumption"),
    t("returnToGrid"),
    t("homeUsage"),
    t("gridConsumption"),
    t("energyIntoBattery"),
    t("energyOutBattery"),
  ];
  const rows = sortRows(currentRows).map((row) => [
    row.date,
    Number(row.pv_production ?? 0).toFixed(2),
    Number(row.self_consumption ?? 0).toFixed(2),
    Number(row.daily_feedin ?? 0).toFixed(2),
    Number(row.home_usage ?? 0).toFixed(2),
    Number(row.grid_consumption ?? 0).toFixed(2),
    Number(row.daily_charged_energy_total ?? 0).toFixed(2),
    Number(row.daily_discharged_energy_total ?? 0).toFixed(2),
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n");
  const filename = `foxcloud-daily-energy-${getSelectedMonthLabel()}.csv`;

  downloadBlob(`\uFEFF${csv}`, filename, "text/csv;charset=utf-8");
}

function pdfText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "?")
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

function createPdfLine(text, options = {}) {
  return {
    text,
    size: options.size ?? 10,
    bold: Boolean(options.bold),
    gapAfter: options.gapAfter ?? 14,
  };
}

function wrapPdfText(text, maxLength = 92) {
  const words = String(text ?? "").split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.length ? lines : [""];
}

function buildSimplePdf(lines) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 44;
  const startY = 800;
  const bottomY = 48;
  const objects = [];
  const pageIds = [];

  const setObject = (id, content) => {
    objects[id] = content;
  };
  const addObject = (content) => {
    objects.push(content);
    return objects.length - 1;
  };

  setObject(1, "");
  setObject(2, "");
  setObject(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  setObject(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  let pageCommands = [];
  let y = startY;

  const flushPage = () => {
    if (!pageCommands.length) {
      return;
    }

    const content = pageCommands.join("\n");
    const contentId = addObject(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
    const pageId = addObject(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] ` +
      `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`,
    );
    pageIds.push(pageId);
    pageCommands = [];
    y = startY;
  };

  const addLine = (line) => {
    if (y < bottomY) {
      flushPage();
    }

    const font = line.bold ? "F2" : "F1";
    pageCommands.push(`BT /${font} ${line.size} Tf ${marginX} ${y} Td (${pdfText(line.text)}) Tj ET`);
    y -= line.gapAfter;
  };

  for (const line of lines) {
    const wrapped = wrapPdfText(line.text, line.size >= 16 ? 58 : 92);

    wrapped.forEach((wrappedLine, index) => {
      addLine({
        ...line,
        text: wrappedLine,
        gapAfter: index === wrapped.length - 1 ? line.gapAfter : line.size + 3,
      });
    });
  }

  flushPage();
  setObject(1, "<< /Type /Catalog /Pages 2 0 R >>");
  setObject(2, `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (let index = 1; index < objects.length; index += 1) {
    offsets[index] = pdf.length;
    pdf += `${index} 0 obj\n${objects[index]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;

  for (let index = 1; index < objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return pdf;
}

function buildPdfLines() {
  const rows = sortRows(currentRows).slice(0, 42);
  const payload = lastPayload ?? {};
  const totals = lastRangePayload?.totals ?? {};
  const lines = [
    createPdfLine("FoxCloud Energy Dashboard", { size: 20, bold: true, gapAfter: 24 }),
    createPdfLine(`Generated: ${new Date().toLocaleString("en-AU")}`),
    createPdfLine(`Dashboard month: ${getSelectedMonthLabel()}`),
    createPdfLine(`Range: ${getSelectedRangeLabel()}`, { gapAfter: 22 }),
    createPdfLine("Today", { size: 15, bold: true, gapAfter: 18 }),
    createPdfLine(`PV produced: ${formatKwh(payload.today?.solarProductionKwh)}`),
    createPdfLine(`Self-consumption: ${formatKwh(payload.today?.selfConsumptionKwh)}`),
    createPdfLine(`Return to grid: ${formatKwh(payload.today?.returnToGridKwh)}`),
    createPdfLine(`Home usage: ${formatKwh(payload.today?.homeUsageKwh)}`),
    createPdfLine(`Grid consumption: ${formatKwh(payload.today?.gridConsumptionKwh)}`),
    createPdfLine(`Into battery: ${formatKwh(payload.today?.energyGoingIntoBatteryKwh)}`),
    createPdfLine(`Out of battery: ${formatKwh(payload.today?.energyComingOutOfBatteryKwh)}`, { gapAfter: 22 }),
    createPdfLine("Selected Range Totals", { size: 15, bold: true, gapAfter: 18 }),
    createPdfLine(`Total PV produced: ${formatKwh(totals.solarProductionKwh)}`),
    createPdfLine(`Total self-consumption: ${formatKwh(totals.selfConsumptionKwh)}`),
    createPdfLine(`Total return to grid: ${formatKwh(totals.returnToGridKwh)}`),
    createPdfLine(`Total home usage: ${formatKwh(totals.homeUsageKwh)}`),
    createPdfLine(`Total grid consumption: ${formatKwh(totals.gridConsumptionKwh)}`),
    createPdfLine(`Total into battery: ${formatKwh(totals.energyGoingIntoBatteryKwh)}`),
    createPdfLine(`Total out of battery: ${formatKwh(totals.energyComingOutOfBatteryKwh)}`, { gapAfter: 22 }),
    createPdfLine("Daily Energy Data", { size: 15, bold: true, gapAfter: 18 }),
    createPdfLine("Date | PV produced | Self-consumption | Return to grid | Home usage | Grid consumption", { bold: true }),
  ];

  rows.forEach((row) => {
    lines.push(createPdfLine(
      `${row.date} | ${formatKwh(row.pv_production)} | ${formatKwh(row.self_consumption)} | ` +
      `${formatKwh(row.daily_feedin)} | ${formatKwh(row.home_usage)} | ${formatKwh(row.grid_consumption)}`,
    ));
  });

  if (sortRows(currentRows).length > rows.length) {
    lines.push(createPdfLine(`Showing first ${rows.length} table rows in this PDF. Use Export CSV for the full table.`));
  }

  return lines;
}

function exportDashboardToPdf() {
  if (!lastPayload) {
    statusText.textContent = t("noTableData");
    return;
  }

  const pdf = buildSimplePdf(buildPdfLines());
  const filename = `foxcloud-dashboard-${getSelectedMonthLabel()}.pdf`;

  downloadBlob(pdf, filename, "application/pdf");
}

function getSelectedRangeLabel() {
  const selectedOption = periodRangeSelect.options[periodRangeSelect.selectedIndex];
  return selectedOption?.textContent ?? t("currentMonth");
}

function getSelectedMonthDayCount() {
  const [year, month] = monthPicker.value.split("-").map(Number);

  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return 30.44;
  }

  return new Date(year, month, 0).getDate();
}

function getDailyRowNumber(row, key) {
  return Number(row?.[key] ?? 0);
}

function findMaxDailyRow(rows, getValue) {
  return rows.reduce(
    (best, row) => {
      const value = Number(getValue(row) ?? 0);

      if (!best || value > best.value) {
        return { row, value };
      }

      return best;
    },
    null,
  );
}

function estimateDailyBenefit(row, savings) {
  const avoidedImportKwh = Math.max(
    getDailyRowNumber(row, "home_usage") - getDailyRowNumber(row, "grid_consumption"),
    0,
  );
  const exportKwh = Math.max(getDailyRowNumber(row, "daily_feedin"), 0);

  return avoidedImportKwh * Number(savings.blendedImportRate ?? 0)
    + exportKwh * Number(savings.feedInRate ?? 0);
}

function renderPeriodHighlight(valueElement, metaElement, highlight, formatter) {
  if (!highlight?.row) {
    valueElement.textContent = "--";
    metaElement.textContent = t("noPeriodData");
    return;
  }

  valueElement.textContent = formatter(highlight.value);
  metaElement.textContent = highlight.row.date;
}

function renderPeriodHighlights(rows, savings) {
  const dailyRows = Array.isArray(rows) ? rows : [];
  const bestSolar = findMaxDailyRow(dailyRows, (row) => getDailyRowNumber(row, "generation"));
  const highestUsage = findMaxDailyRow(dailyRows, (row) => getDailyRowNumber(row, "home_usage"));
  const bestExport = findMaxDailyRow(dailyRows, (row) => getDailyRowNumber(row, "daily_feedin"));
  const bestSavings = findMaxDailyRow(dailyRows, (row) => estimateDailyBenefit(row, savings));

  renderPeriodHighlight(metricFields.periodBestSolar, textFields.periodBestSolarMeta, bestSolar, formatKwh);
  renderPeriodHighlight(metricFields.periodHighestUsage, textFields.periodHighestUsageMeta, highestUsage, formatKwh);
  renderPeriodHighlight(metricFields.periodBestExport, textFields.periodBestExportMeta, bestExport, formatKwh);
  renderPeriodHighlight(metricFields.periodBestSavings, textFields.periodBestSavingsMeta, bestSavings, (value) =>
    formatMoney(value, savings.currency)
  );
}

function renderBatteryPerformance(totals) {
  const chargedKwh = Number(totals?.energyGoingIntoBatteryKwh ?? 0);
  const dischargedKwh = Number(totals?.energyComingOutOfBatteryKwh ?? 0);
  const dischargeChargeRatio = chargedKwh > 0 ? (dischargedKwh / chargedKwh) * 100 : null;
  const netKwh = chargedKwh - dischargedKwh;
  const netAbsKwh = Math.abs(netKwh);
  const throughputKwh = (chargedKwh + dischargedKwh) / 2;
  const balanceThresholdKwh = 0.5;
  const netLabelKey = netAbsKwh < balanceThresholdKwh
    ? "batteryNetBalanced"
    : netKwh > 0
      ? "batteryNetCharged"
      : "batteryNetDischarged";
  const modeLabelKey = netAbsKwh < balanceThresholdKwh
    ? "batteryModeBalanced"
    : netKwh > 0
      ? "batteryModeCharging"
      : "batteryModeDischarging";

  metricFields.periodBatteryRatio.textContent = formatOptionalPercent(dischargeChargeRatio);
  metricFields.periodBatteryNet.textContent = formatKwh(netAbsKwh);
  metricFields.periodBatteryThroughput.textContent = formatKwh(throughputKwh);
  metricFields.periodBatteryMode.textContent = t(modeLabelKey);
  textFields.periodBatteryRatioMeta.textContent = t("batteryRatioEstimateMeta");
  textFields.periodBatteryNetMeta.textContent = t(netLabelKey);
  textFields.periodBatteryModeMeta.textContent = t("batteryModeMeta");
}

function renderSolarUtilization(totals) {
  const solarKwh = Number(totals?.solarProductionKwh ?? 0);
  const selfUsedKwh = Number(totals?.selfConsumptionKwh ?? 0);
  const exportedKwh = Number(totals?.returnToGridKwh ?? 0);
  const selfUseRate = solarKwh > 0 ? (selfUsedKwh / solarKwh) * 100 : null;
  const exportRate = solarKwh > 0 ? (exportedKwh / solarKwh) * 100 : null;

  metricFields.periodSolarSelfUsed.textContent = formatKwh(selfUsedKwh);
  metricFields.periodSolarExported.textContent = formatKwh(exportedKwh);
  metricFields.periodSolarUtilizationTotal.textContent = formatKwh(solarKwh);
  textFields.periodSolarSelfUseRate.textContent = interpolate(t("selfUseRateLabel"), {
    rate: formatOptionalPercent(selfUseRate),
  });
  textFields.periodSolarExportRate.textContent = interpolate(t("exportRateLabel"), {
    rate: formatOptionalPercent(exportRate),
  });
  textFields.periodSolarUtilizationMeta.textContent = interpolate(t("solarUtilizationMeta"), {
    selfRate: formatOptionalPercent(selfUseRate),
    exportRate: formatOptionalPercent(exportRate),
  });
  setBarWidth(textFields.periodSolarSelfUseBar, selfUsedKwh, solarKwh);
  setBarWidth(textFields.periodSolarExportBar, exportedKwh, solarKwh);
}

function renderPeriodTotals(payload) {
  const savings = payload.savings ?? {};
  const totalBenefit = Number(savings.estimatedTotalBenefit ?? 0);
  const avoidedSavings = Number(savings.estimatedSavings ?? 0);
  const exportCredit = Number(savings.exportCredit ?? 0);
  const homeUsageKwh = Number(payload.totals?.homeUsageKwh ?? 0);
  const gridConsumptionKwh = Number(payload.totals?.gridConsumptionKwh ?? 0);
  const blendedImportRate = Number(savings.blendedImportRate ?? 0);
  const withoutSolarCost = homeUsageKwh * blendedImportRate;
  const gridEnergyCost = gridConsumptionKwh * blendedImportRate;
  const netCostAfterExport = gridEnergyCost - exportCredit;
  const billBenefit = withoutSolarCost - netCostAfterExport;
  const daysWithData = payload.dailyTable?.length ?? 0;
  const dailyAverageSavings = daysWithData > 0 ? totalBenefit / daysWithData : 0;
  const monthlyForecast = dailyAverageSavings * (
    tableRangeSelect.value === "current_month" ? getSelectedMonthDayCount() : 30.44
  );
  const annualForecast = dailyAverageSavings * 365;

  metricFields.periodSolarProduction.textContent = formatKwh(payload.totals?.solarProductionKwh);
  metricFields.periodHomeUsage.textContent = formatKwh(payload.totals?.homeUsageKwh);
  metricFields.periodIntoBattery.textContent = formatKwh(payload.totals?.energyGoingIntoBatteryKwh);
  metricFields.periodOutBattery.textContent = formatKwh(payload.totals?.energyComingOutOfBatteryKwh);
  metricFields.periodReturnToGrid.textContent = formatKwh(payload.totals?.returnToGridKwh);
  metricFields.periodGridConsumption.textContent = formatKwh(payload.totals?.gridConsumptionKwh);
  metricFields.periodSelfConsumption.textContent = formatKwh(payload.totals?.selfConsumptionKwh);
  metricFields.periodSavings.textContent = formatMoney(
    totalBenefit,
    savings.currency,
  );
  metricFields.periodSavingsBreakdownTotal.textContent = formatMoney(totalBenefit, savings.currency);
  metricFields.periodAvoidedImportSavings.textContent = formatMoney(avoidedSavings, savings.currency);
  metricFields.periodExportCredit.textContent = formatMoney(exportCredit, savings.currency);
  metricFields.periodAvoidedImportKwh.textContent = formatKwh(savings.avoidedGridImportKwh);
  metricFields.periodExportedKwh.textContent = formatKwh(savings.exportedKwh);
  metricFields.periodDailyAverageSavings.textContent = formatMoney(dailyAverageSavings, savings.currency);
  metricFields.periodMonthlyForecast.textContent = formatMoney(monthlyForecast, savings.currency);
  metricFields.periodAnnualForecast.textContent = formatMoney(annualForecast, savings.currency);
  metricFields.periodWithoutSolarCost.textContent = formatMoney(withoutSolarCost, savings.currency);
  metricFields.periodGridEnergyCost.textContent = formatMoney(gridEnergyCost, savings.currency);
  metricFields.periodNetCostAfterExport.textContent = formatMoney(netCostAfterExport, savings.currency);
  metricFields.periodBillBenefit.textContent = formatMoney(billBenefit, savings.currency);
  textFields.periodSavingsMeta.textContent = formatSavingsMeta(savings);
  textFields.periodSavingsForecastMeta.textContent = interpolate(t("savingsForecastMeta"), {
    days: daysWithData,
    range: getSelectedRangeLabel(),
  });
  textFields.periodBillImpactMeta.textContent = t("billImpactMeta");
  renderPeriodHighlights(payload.dailyTable, savings);
  renderBatteryPerformance(payload.totals);
  renderSolarUtilization(payload.totals);
  setBarWidth(textFields.periodAvoidedImportBar, avoidedSavings, totalBenefit);
  setBarWidth(textFields.periodExportCreditBar, exportCredit, totalBenefit);

  const firstDate = payload.dailyTable?.at(0)?.date;
  const lastDate = payload.dailyTable?.at(-1)?.date;
  const dateRange = firstDate && lastDate ? `${firstDate} - ${lastDate}` : getSelectedRangeLabel();
  textFields.periodTotalsMeta.textContent = `${t("rangeSummary")}: ${getSelectedRangeLabel()} • ${dateRange}`;
}

async function loadEnergyRange(silent = false) {
  periodRangeSelect.value = tableRangeSelect.value;

  if (!silent) {
    statusText.textContent = t("loadingRange");
  }

  const [year, month] = monthPicker.value.split("-");
  const response = await fetch(
    `/api/energy-range?year=${year}&month=${Number(month)}&range=${encodeURIComponent(tableRangeSelect.value)}`,
  );
  const payload = await response.json();

  if (!response.ok || payload.error) {
    throw new Error(payload.error || "Energy range request failed.");
  }

  currentRows = payload.dailyTable ?? [];
  renderTable(currentRows);
  renderPeriodTotals(payload);
  lastRangePayload = payload;

  if (!silent) {
    statusText.textContent = t("loadedRange");
  }
}

async function rebuildSelectedCache() {
  const [year, month] = monthPicker.value.split("-");
  let preview = null;

  try {
    const previewResponse = await fetch(
      `/api/rebuild-cache/preview?year=${year}&month=${Number(month)}&range=${encodeURIComponent(tableRangeSelect.value)}`,
    );
    preview = await previewResponse.json();

    if (!previewResponse.ok || preview.error) {
      preview = null;
    }
  } catch {
    preview = null;
  }

  if (!window.confirm(FoxCloudRebuild.formatRebuildConfirm(t, REBUILD_LIMIT_DAYS, preview))) {
    return;
  }

  rebuildCacheButton.disabled = true;
  refreshButton.disabled = true;
  statusText.textContent = t("rebuildingCache");

  try {
    const response = await fetch("/api/rebuild-cache", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        year: Number(year),
        month: Number(month),
        range: tableRangeSelect.value,
      }),
    });
    const payload = await response.json();

    if (!response.ok || payload.error) {
      throw new Error(payload.error || "Cache rebuild request failed.");
    }

    currentRows = payload.dailyTable ?? [];
    lastRangePayload = payload;
    renderTable(currentRows);
    renderPeriodTotals(payload);
    statusText.textContent = FoxCloudRebuild.formatRebuildStatus(payload, t);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    statusText.textContent = `${t("unableToLoad")}: ${message}`;
    renderWarnings([message]);
  } finally {
    rebuildCacheButton.disabled = false;
    refreshButton.disabled = false;
  }
}

function getVisibleRows(rows, payload) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (
    payload.requestedPeriod.year === currentYear &&
    payload.requestedPeriod.month === currentMonth
  ) {
    const todayKey = formatLocalDateKey(now);
    return rows.filter((row) => row.date <= todayKey);
  }

  return rows;
}

function destroyChart(chart) {
  if (chart) {
    chart.destroy();
  }
}

function getChartRows(payload) {
  const todayKey = formatLocalDateKey();
  const isCurrentMonth = payload.dailyTable.some((row) => row.date === todayKey);

  if (!isCurrentMonth) {
    return payload.dailyTable;
  }

  return payload.dailyTable.filter((row) => row.date <= todayKey);
}

function getChartOptions(yTitle) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label(context) {
            return `${context.dataset.label}: ${Number(context.parsed.y ?? 0).toFixed(2)} kWh`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: yTitle,
        },
        beginAtZero: true,
        grace: "12%",
        ticks: {
          maxTicksLimit: 6,
        },
      },
    },
  };
}

function renderCharts(payload) {
  destroyChart(energyChart);
  destroyChart(batteryChart);
  destroyChart(last24HoursChart);

  const energyContext = document.getElementById("energyChart").getContext("2d");
  const batteryContext = document.getElementById("batteryChart").getContext("2d");
  const last24HoursContext = document.getElementById("last24HoursChart").getContext("2d");
  const chartRows = getChartRows(payload);
  const labels = chartRows.map((row) => String(row.day));

  energyChart = new Chart(energyContext, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: t("pvProduced"),
          data: chartRows.map((row) => row.pv_production),
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.16)",
          fill: true,
          tension: 0.28,
        },
        {
          label: t("homeUsage"),
          data: chartRows.map((row) => row.home_usage),
          borderColor: "#0f766e",
          backgroundColor: "rgba(15, 118, 110, 0.12)",
          tension: 0.28,
        },
        {
          label: t("gridConsumption"),
          data: chartRows.map((row) => row.grid_consumption),
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.12)",
          tension: 0.28,
        },
        {
          label: t("returnToGrid"),
          data: chartRows.map((row) => row.daily_feedin),
          borderColor: "#dc2626",
          backgroundColor: "rgba(220, 38, 38, 0.12)",
          tension: 0.28,
        },
      ],
    },
    options: getChartOptions(t("dailyEnergyKwh")),
  });

  batteryChart = new Chart(batteryContext, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: t("energyIntoBattery"),
          data: chartRows.map((row) => row.daily_charged_energy_total),
          backgroundColor: "#14b8a6",
          borderRadius: 4,
          maxBarThickness: 14,
        },
        {
          label: t("energyOutBattery"),
          data: chartRows.map((row) => row.daily_discharged_energy_total),
          backgroundColor: "#7c3aed",
          borderRadius: 4,
          maxBarThickness: 14,
        },
      ],
    },
    options: getChartOptions(t("batteryEnergyKwh")),
  });

  last24HoursChart = new Chart(last24HoursContext, {
    type: "line",
    data: {
      labels: payload.last24Hours.labels,
      datasets: [
        {
          label: t("batteryLevelPercent"),
          data: payload.last24Hours.batteryLevelPercent,
          borderColor: "#7c3aed",
          backgroundColor: "rgba(124, 58, 237, 0.08)",
          yAxisID: "percent",
          tension: 0.22,
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: t("homeUsageKw"),
          data: payload.last24Hours.homeUsageKw,
          borderColor: "#0f766e",
          backgroundColor: "rgba(15, 118, 110, 0.08)",
          yAxisID: "power",
          tension: 0.22,
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: t("batteryDischargeKw"),
          data: payload.last24Hours.batteryDischargeKw,
          borderColor: "#dc2626",
          backgroundColor: "rgba(220, 38, 38, 0.08)",
          yAxisID: "power",
          tension: 0.22,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
          },
        },
        tooltip: {
          callbacks: {
            label(context) {
              const unit = context.dataset.yAxisID === "percent" ? "%" : "kW";
              return `${context.dataset.label}: ${Number(context.parsed.y ?? 0).toFixed(2)} ${unit}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 12,
          },
        },
        power: {
          type: "linear",
          position: "left",
          beginAtZero: true,
          title: {
            display: true,
            text: t("powerKw"),
          },
          ticks: {
            maxTicksLimit: 6,
          },
        },
        percent: {
          type: "linear",
          position: "right",
          min: 0,
          max: 100,
          grid: {
            drawOnChartArea: false,
          },
          title: {
            display: true,
            text: t("batteryLevelPercent"),
          },
          ticks: {
            maxTicksLimit: 6,
          },
        },
      },
    },
  });
}

function setFlowPath(path, isActive) {
  path.classList.toggle("active", isActive);
}

function renderEnergyFlow(payload) {
  const live = payload.live;
  const gridExport = Number(live.gridExportKw ?? 0);
  const gridImport = Number(live.gridImportKw ?? 0);
  const batteryCharge = Number(live.batteryChargeKw ?? 0);
  const batteryDischarge = Number(live.batteryDischargeKw ?? 0);
  const gridMode = gridExport >= gridImport ? t("exporting") : t("importing");
  const gridValue = gridExport >= gridImport ? gridExport : gridImport;
  const batteryMode = batteryCharge >= batteryDischarge ? t("charging") : t("discharging");
  const batteryValue = batteryCharge >= batteryDischarge ? batteryCharge : batteryDischarge;

  flowFields.solar.textContent = formatKw(live.solarGeneratedKw);
  flowFields.home.textContent = formatKw(live.homeUsageKw);
  flowFields.grid.textContent = formatKw(gridValue);
  flowFields.gridMode.textContent = gridMode;
  flowFields.battery.textContent = formatKw(batteryValue);
  flowFields.batteryMode.textContent = batteryMode;

  setFlowPath(flowFields.solarToHomePath, live.solarGeneratedKw > 0 && live.homeUsageKw > 0);
  setFlowPath(flowFields.solarToBatteryPath, batteryCharge > 0.05);
  setFlowPath(flowFields.solarToGridPath, gridExport > 0.05);
  setFlowPath(flowFields.gridToHomePath, gridImport > 0.05);
  setFlowPath(flowFields.batteryToHomePath, batteryDischarge > 0.05);
  setFlowPath(flowFields.gridToBatteryPath, gridImport > 0.05 && batteryCharge > 0.05);
}

function renderVisualKpis(payload) {
  const today = payload.today ?? {};
  const rows = getLatestDailyRows(payload.dailyTable);
  const latestRow = rows.at(-1) ?? {};
  const previousRow = rows.length > 1 ? rows.at(-2) : null;
  const homeUsage = Number(today.homeUsageKwh ?? latestRow.home_usage ?? 0);
  const selfSufficiency = calculateSelfSufficiency(today);
  const netGridKwh = Number(today.returnToGridKwh ?? 0) - Number(today.gridConsumptionKwh ?? 0);
  const isNetExporter = netGridKwh >= 0;

  metricFields.kpiDailySolar.textContent = formatKwh(today.solarProductionKwh);
  metricFields.kpiDailyConsumption.textContent = formatKwh(homeUsage);
  metricFields.kpiDailyExport.textContent = formatKwh(today.returnToGridKwh);
  metricFields.kpiNetGrid.textContent = formatKwh(Math.abs(netGridKwh));
  metricFields.kpiSelfSufficiency.textContent = formatOptionalPercent(selfSufficiency);
  metricFields.kpiEstimatedSavings.textContent = formatMoney(
    payload.todaySavings?.estimatedTotalBenefit,
    payload.todaySavings?.currency,
  );

  textFields.kpiDailySolarMeta.textContent = formatYesterdayComparison(
    today.solarProductionKwh,
    previousRow?.pv_production,
  );
  textFields.kpiDailyConsumptionMeta.textContent = formatYesterdayComparison(
    homeUsage,
    previousRow?.home_usage,
  );
  metricFields.kpiNetGrid.closest(".visual-kpi-card").dataset.mode = isNetExporter ? "export" : "import";
  textFields.kpiNetGridMeta.textContent = t(isNetExporter ? "netGridExporting" : "netGridImporting");
  textFields.kpiSelfSufficiencyMeta.textContent = getSelfSufficiencyStatus(selfSufficiency);
  textFields.kpiSystemStatus.textContent = t(payload.device?.status ?? "unknown");
  textFields.kpiInverterStatus.textContent = payload.device?.status === "online" ? t("online") : t(payload.device?.status ?? "unknown");
  textFields.kpiLastUpdate.textContent = formatTimestamp(payload.live?.updatedAt ?? payload.generatedAt);
  textFields.kpiDataSource.textContent = payload.source ?? "--";
}

function getGridScore(live) {
  const importKw = Number(live.gridImportKw ?? 0);
  const exportKw = Number(live.gridExportKw ?? 0);

  if (exportKw > importKw + 0.05) {
    return 15;
  }

  if (importKw <= 0.1) {
    return 14;
  }

  if (importKw <= 1) {
    return 10;
  }

  if (importKw <= 3) {
    return 6;
  }

  return 2;
}

function getTemperatureScore(live) {
  const readings = getTemperatureReadings(live);

  if (readings.length === 0) {
    return 7;
  }

  const maxTemperature = Math.max(...readings.map((reading) => Number(reading.value)));

  if (maxTemperature >= 65) {
    return 0;
  }

  if (maxTemperature >= 50) {
    return 4;
  }

  return 10;
}

function getWeatherScore(weatherPayload) {
  const outlook = weatherPayload?.current?.solarOutlook;

  if (outlook === "excellent") {
    return 10;
  }

  if (outlook === "good") {
    return 8;
  }

  if (outlook === "fair") {
    return 5;
  }

  if (outlook === "poor") {
    return 3;
  }

  return 6;
}

function getEnergyScore(payload, weatherPayload = lastWeatherPayload) {
  const today = payload?.today ?? {};
  const live = payload?.live ?? {};
  const selfSufficiency = calculateSelfSufficiency(today);
  const batterySoc = Number(live.batterySocPercent ?? 0);
  const selfScore = Math.min(45, Math.max(0, selfSufficiency * 0.45));
  const batteryScore = Math.min(20, Math.max(0, Number.isFinite(batterySoc) ? batterySoc * 0.2 : 0));
  const gridScore = getGridScore(live);
  const temperatureScore = getTemperatureScore(live);
  const weatherScore = getWeatherScore(weatherPayload);
  const score = Math.round(Math.max(0, Math.min(100, selfScore + batteryScore + gridScore + temperatureScore + weatherScore)));
  const statusKey = score >= 85
    ? "energyScoreExcellent"
    : score >= 70
      ? "energyScoreGood"
      : score >= 50
        ? "energyScoreWatch"
        : "energyScoreNeedsAttention";

  return {
    score,
    statusKey,
    selfSufficiency,
    batterySoc: Number.isFinite(batterySoc) ? batterySoc : null,
    gridFlow: Math.max(Number(live.gridImportKw ?? 0), Number(live.gridExportKw ?? 0)),
    temperature: getTemperatureInsight(live),
    weatherOutlook: weatherPayload?.current?.solarOutlook ?? "unknown",
  };
}

function renderEnergyScore(payload, weatherPayload = lastWeatherPayload) {
  if (!payload) {
    return;
  }

  const energyScore = getEnergyScore(payload, weatherPayload);

  metricFields.energyScoreValue.textContent = String(energyScore.score);
  textFields.energyScoreRing.style.setProperty("--score-percent", `${energyScore.score}%`);
  textFields.energyScoreStatus.textContent = t(energyScore.statusKey);
  textFields.energyScoreDetail.textContent = t("energyScoreDetail");
  textFields.energyScoreSelfFactor.textContent = interpolate(t("energyScoreSelfFactor"), {
    value: formatOptionalPercent(energyScore.selfSufficiency),
  });
  textFields.energyScoreBatteryFactor.textContent = interpolate(t("energyScoreBatteryFactor"), {
    value: formatPercent(energyScore.batterySoc),
  });
  textFields.energyScoreGridFactor.textContent = interpolate(t("energyScoreGridFactor"), {
    value: formatKw(energyScore.gridFlow),
  });
  textFields.energyScoreTempFactor.textContent = interpolate(t("energyScoreTempFactor"), {
    value: t(energyScore.temperature.statusKey),
  });
  textFields.energyScoreWeatherFactor.textContent = interpolate(t("energyScoreWeatherFactor"), {
    value: t(energyScore.weatherOutlook),
  });
}

const savingsOverviewCards = [
  {
    key: "today",
    metric: "savingsOverviewToday",
    meta: "savingsOverviewTodayMeta",
  },
  {
    key: "current_week",
    metric: "savingsOverviewWeek",
    meta: "savingsOverviewWeekMeta",
  },
  {
    key: "current_month",
    metric: "savingsOverviewMonth",
    meta: "savingsOverviewMonthMeta",
  },
  {
    key: "last_3_months",
    metric: "savingsOverviewLast3",
    meta: "savingsOverviewLast3Meta",
  },
  {
    key: "last_6_months",
    metric: "savingsOverviewLast6",
    meta: "savingsOverviewLast6Meta",
  },
  {
    key: "last_12_months",
    metric: "savingsOverviewLast12",
    meta: "savingsOverviewLast12Meta",
  },
];

function renderSavingsOverviewCard(item, savings) {
  if (!savings) {
    metricFields[item.metric].textContent = "--";
    textFields[item.meta].textContent = t("unavailable");
    return;
  }

  metricFields[item.metric].textContent = formatMoney(
    savings.estimatedTotalBenefit,
    savings.currency,
  );
  textFields[item.meta].textContent = formatSavingsMeta(savings);
}

function renderSavingsOverview(overview) {
  if (!overview) {
    return;
  }

  for (const item of savingsOverviewCards) {
    renderSavingsOverviewCard(item, overview[item.key]);
  }
}

function renderSavingsOverviewLoading(todaySavings) {
  const [todayCard, ...rangeCards] = savingsOverviewCards;

  renderSavingsOverviewCard(todayCard, todaySavings);

  for (const item of rangeCards) {
    metricFields[item.metric].textContent = "--";
    textFields[item.meta].textContent = t("savingsLoading");
  }
}

async function loadSavingsOverview(payload) {
  const [year, month] = monthPicker.value.split("-");
  const overview = {
    today: payload.todaySavings,
  };

  renderSavingsOverviewLoading(payload.todaySavings);

  try {
    const response = await fetch(
      `/api/savings-overview?year=${year}&month=${Number(month)}`,
    );
    const savingsPayload = await response.json();

    if (!response.ok || savingsPayload.error) {
      throw new Error(savingsPayload.error || "Savings overview request failed.");
    }

    Object.assign(overview, savingsPayload.ranges ?? {});
  } catch {
    for (const item of savingsOverviewCards.filter((card) => card.key !== "today")) {
      overview[item.key] = null;
    }
  }

  lastSavingsOverview = overview;
  renderSavingsOverview(overview);
}

function renderMetrics(payload) {
  if (!payload || !payload.live || !payload.today || !payload.device || !payload.chartSeries) {
    throw new Error(payload?.error || "Dashboard API returned an unexpected response.");
  }

  metricFields.solarNow.textContent = formatKw(payload.live.solarGeneratedKw);
  metricFields.homeNow.textContent = formatKw(payload.live.homeUsageKw);
  metricFields.gridImportNow.textContent = formatKw(payload.live.gridImportKw);
  metricFields.gridExportNow.textContent = formatKw(payload.live.gridExportKw);
  metricFields.batteryChargeNow.textContent = formatKw(payload.live.batteryChargeKw);
  metricFields.batteryDischargeNow.textContent = formatKw(payload.live.batteryDischargeKw);

  metricFields.todaySolar.textContent = formatKwh(payload.today.solarProductionKwh);
  metricFields.todaySelfConsumption.textContent = formatKwh(payload.today.selfConsumptionKwh);
  metricFields.todayFeedin.textContent = formatKwh(payload.today.returnToGridKwh);
  metricFields.todayHome.textContent = formatKwh(payload.today.homeUsageKwh);
  metricFields.todayGrid.textContent = formatKwh(payload.today.gridConsumptionKwh);
  metricFields.todayBatteryCharge.textContent = formatKwh(payload.today.energyGoingIntoBatteryKwh);
  metricFields.todayBatteryDischarge.textContent = formatKwh(payload.today.energyComingOutOfBatteryKwh);
  metricFields.todaySavings.textContent = formatMoney(
    payload.todaySavings?.estimatedTotalBenefit,
    payload.todaySavings?.currency,
  );
  textFields.todaySavingsMeta.textContent = formatSavingsMeta(payload.todaySavings);
  metricFields.batterySoc.textContent = formatPercent(payload.live.batterySocPercent);
  metricFields.batterySoc.classList.toggle(
    "battery-level-low",
    Number(payload.live.batterySocPercent ?? 100) < 50,
  );
  metricFields.batterySoc.classList.toggle(
    "battery-level-good",
    payload.live.batterySocPercent !== null && payload.live.batterySocPercent !== undefined && Number(payload.live.batterySocPercent) >= 50,
  );
  metricFields.batteryTemp.textContent = formatTemperature(payload.live.batteryMinTemperatureCelsius ?? payload.live.batteryTemperatureCelsius);
  metricFields.batteryMaxTemp.textContent = formatTemperature(payload.live.batteryMaxTemperatureCelsius);
  metricFields.batteryPackTemp.textContent = formatTemperature(payload.live.batteryPackTemperatureCelsius);
  metricFields.inverterTemp.textContent = formatTemperature(payload.live.inverterTemperatureCelsius);
  metricFields.solarLastHour.textContent = formatKwh(payload.lastHour?.solarGeneratedKwh);
  metricFields.homeLastHour.textContent = formatKwh(payload.lastHour?.homeUsageKwh);
  metricFields.gridImportLastHour.textContent = formatKwh(payload.lastHour?.gridImportKwh);
  metricFields.gridExportLastHour.textContent = formatKwh(payload.lastHour?.gridExportKwh);
  metricFields.batteryChargeLastHour.textContent = formatKwh(payload.lastHour?.batteryChargeKwh);
  metricFields.batteryDischargeLastHour.textContent = formatKwh(payload.lastHour?.batteryDischargeKwh);

  textFields.currentDateTime.textContent = formatCurrentDateTime();
  textFields.deviceTitle.textContent = payload.device.stationName;
  textFields.deviceMeta.textContent = `${payload.device.deviceType} • ${payload.device.productType} • SN ${payload.device.deviceSN}`;
  textFields.liveMeta.textContent = `${t("liveUpdated")}: ${formatTimestamp(payload.live.updatedAt)} • ${t("responseGenerated")}: ${formatTimestamp(payload.generatedAt)}`;

  renderBadges(payload);
  renderWarnings(payload.warnings);
  renderDataQuality(payload);
  renderVisualKpis(payload);
  renderEnergyScore(payload);
  renderTariffTimeline(payload.todaySavings);
  renderTrendSnapshot(payload);
  renderOperationalHeatmap(payload);
  renderSolarCalendar(payload);
  renderWeekdayProfile(payload);
  renderGaugeCards(payload);
  renderEnergyInsights(payload);
  renderEnergyCoach(payload);
  renderBalanceBars(payload);
  renderSolarPerformance(payload);
  renderEnergyFlow(payload);
  renderCharts(payload);
  currentRows = getVisibleRows(payload.dailyTable, payload);
  renderTable(currentRows);
}

async function loadDashboard() {
  refreshButton.disabled = true;
  statusText.textContent = t("loading");

  try {
    const [year, month] = monthPicker.value.split("-");
    const response = await fetch(`/api/dashboard?year=${year}&month=${Number(month)}`);
    const payload = await response.json();

    if (!response.ok || payload.error) {
      throw new Error(payload.error || "Dashboard request failed.");
    }

    renderMetrics(payload);
    lastPayload = payload;
    await loadTariffSettings();
    await loadWeatherSettings();
    await loadWeather();
    await loadEnergyRange(true);
    void loadSavingsOverview(payload).catch((error) => {
      console.warn("Unable to load savings overview", error);
    });
    statusText.textContent = payload.isStale
      ? t("loadedCached")
      : t("loaded");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    statusText.textContent = `${t("unableToLoad")}: ${message}`;
    renderWarnings([message]);
  } finally {
    refreshButton.disabled = false;
  }
}

function setDefaultMonth() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  monthPicker.value = `${now.getFullYear()}-${month}`;
}

function applyStoredPreferences() {
  tableRangeSelect.value = getStoredSelectValue(
    storageKeys.tableRange,
    tableRangeSelect,
    tableRangeSelect.value,
  );
  periodRangeSelect.value = tableRangeSelect.value;
}

refreshButton.addEventListener("click", loadDashboard);
rebuildCacheButton.addEventListener("click", rebuildSelectedCache);
exportPdfButton.addEventListener("click", exportDashboardToPdf);
exportCsvButton.addEventListener("click", exportTableToCsv);
saveTariffButton.addEventListener("click", saveTariffSettings);
saveWeatherSettingsButton.addEventListener("click", saveWeatherSettings);
monthPicker.addEventListener("change", loadDashboard);
tableRangeSelect.addEventListener("change", () => {
  setStoredValue(storageKeys.tableRange, tableRangeSelect.value);
  loadEnergyRange().catch((error) => {
    const message = error instanceof Error ? error.message : "Unknown error";
    statusText.textContent = `${t("unableToLoad")}: ${message}`;
    renderWarnings([message]);
  });
});
periodRangeSelect.addEventListener("change", () => {
  tableRangeSelect.value = periodRangeSelect.value;
  setStoredValue(storageKeys.tableRange, tableRangeSelect.value);
  loadEnergyRange().catch((error) => {
    const message = error instanceof Error ? error.message : "Unknown error";
    statusText.textContent = `${t("unableToLoad")}: ${message}`;
    renderWarnings([message]);
  });
});
languageSelect.addEventListener("change", () => {
  currentLanguage = languageSelect.value;
  setStoredValue(storageKeys.language, currentLanguage);
  applyLanguage();

  if (lastPayload) {
    renderMetrics(lastPayload);
    if (lastRangePayload) {
      currentRows = lastRangePayload.dailyTable ?? [];
      renderTable(currentRows);
      renderPeriodTotals(lastRangePayload);
    }
    renderSavingsOverview(lastSavingsOverview);
    statusText.textContent = lastPayload.isStale ? t("loadedCached") : t("loaded");
  }
});
window.setInterval(() => {
  textFields.currentDateTime.textContent = formatCurrentDateTime();
}, 60_000);
document.querySelectorAll(".sort-button").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.sortKey;

    if (sortState.key === key) {
      sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
    } else {
      sortState = {
        key,
        direction: key === "date" ? "asc" : "desc",
      };
    }

    renderTable(currentRows);
  });
});

setDefaultMonth();
applyStoredPreferences();
applyLanguage();
loadDashboard();
