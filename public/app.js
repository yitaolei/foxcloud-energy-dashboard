const statusText = document.getElementById("statusText");
const autoRefreshText = document.getElementById("autoRefreshText");
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
  smartDecisionLog: "foxcloud-dashboard-smart-decision-log",
  tableRange: "foxcloud-dashboard-table-range",
};

const metricFields = {
  batterySocNow: document.getElementById("batterySocNow"),
  solarNow: document.getElementById("solarNow"),
  homeNow: document.getElementById("homeNow"),
  gridImportNow: document.getElementById("gridImportNow"),
  gridExportNow: document.getElementById("gridExportNow"),
  batteryChargeNow: document.getElementById("batteryChargeNow"),
  batteryDischargeNow: document.getElementById("batteryDischargeNow"),
  todaySolar: document.getElementById("todaySolar"),
  todayFeedin: document.getElementById("todayFeedin"),
  todayHome: document.getElementById("todayHome"),
  todayGrid: document.getElementById("todayGrid"),
  todayBatteryCharge: document.getElementById("todayBatteryCharge"),
  todayBatteryDischarge: document.getElementById("todayBatteryDischarge"),
  solarProjectionActual: document.getElementById("solarProjectionActual"),
  solarProjectionEstimate: document.getElementById("solarProjectionEstimate"),
  solarProjectionRemaining: document.getElementById("solarProjectionRemaining"),
  solarProjectionEveningBattery: document.getElementById("solarProjectionEveningBattery"),
  solarProjectionConfidence: document.getElementById("solarProjectionConfidence"),
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
  kpiBatterySocNow: document.getElementById("kpiBatterySocNow"),
  kpiDailySolar: document.getElementById("kpiDailySolar"),
  kpiDailyConsumption: document.getElementById("kpiDailyConsumption"),
  kpiDailyBattery: document.getElementById("kpiDailyBattery"),
  kpiDailyExport: document.getElementById("kpiDailyExport"),
  kpiNetGrid: document.getElementById("kpiNetGrid"),
  kpiSelfSufficiency: document.getElementById("kpiSelfSufficiency"),
  kpiEstimatedSavings: document.getElementById("kpiEstimatedSavings"),
  energyScoreValue: document.getElementById("energyScoreValue"),
  todayBillImpactBenefit: document.getElementById("todayBillImpactBenefit"),
  todayBillWithoutSolar: document.getElementById("todayBillWithoutSolar"),
  todayBillGridCost: document.getElementById("todayBillGridCost"),
  todayBillExportCredit: document.getElementById("todayBillExportCredit"),
  todayBillNetCost: document.getElementById("todayBillNetCost"),
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
  solarProjectionSummary: document.getElementById("solarProjectionSummary"),
  solarProjectionMeta: document.getElementById("solarProjectionMeta"),
  solarDispatchAction: document.getElementById("solarDispatchAction"),
  solarDispatchDetail: document.getElementById("solarDispatchDetail"),
  solarDispatchCorrection: document.getElementById("solarDispatchCorrection"),
  solarDispatchCorrectionDetail: document.getElementById("solarDispatchCorrectionDetail"),
  solarDispatchSolcastRemaining: document.getElementById("solarDispatchSolcastRemaining"),
  solarDispatchSolcastDetail: document.getElementById("solarDispatchSolcastDetail"),
  solarDispatchPredbat: document.getElementById("solarDispatchPredbat"),
  solarDispatchPredbatDetail: document.getElementById("solarDispatchPredbatDetail"),
  kpiDailySolarMeta: document.getElementById("kpiDailySolarMeta"),
  kpiDailyConsumptionMeta: document.getElementById("kpiDailyConsumptionMeta"),
  kpiDailyBatteryMeta: document.getElementById("kpiDailyBatteryMeta"),
  kpiNetGridMeta: document.getElementById("kpiNetGridMeta"),
  kpiSelfSufficiencyMeta: document.getElementById("kpiSelfSufficiencyMeta"),
  kpiSystemStatus: document.getElementById("kpiSystemStatus"),
  kpiInverterStatus: document.getElementById("kpiInverterStatus"),
  kpiLastUpdate: document.getElementById("kpiLastUpdate"),
  kpiDataSource: document.getElementById("kpiDataSource"),
  homeStateVerdict: document.getElementById("homeStateVerdict"),
  homeStateDetail: document.getElementById("homeStateDetail"),
  homeStateBatteryRow: document.getElementById("homeStateBatteryRow"),
  homeStateBatteryStatus: document.getElementById("homeStateBatteryStatus"),
  homeStateBatteryDetail: document.getElementById("homeStateBatteryDetail"),
  homeStateBatteryBar: document.getElementById("homeStateBatteryBar"),
  homeStateSolarRow: document.getElementById("homeStateSolarRow"),
  homeStateSolarStatus: document.getElementById("homeStateSolarStatus"),
  homeStateSolarDetail: document.getElementById("homeStateSolarDetail"),
  homeStateSolarBar: document.getElementById("homeStateSolarBar"),
  homeStateLoadRow: document.getElementById("homeStateLoadRow"),
  homeStateLoadStatus: document.getElementById("homeStateLoadStatus"),
  homeStateLoadDetail: document.getElementById("homeStateLoadDetail"),
  homeStateLoadBar: document.getElementById("homeStateLoadBar"),
  homeStateGridRow: document.getElementById("homeStateGridRow"),
  homeStateGridStatus: document.getElementById("homeStateGridStatus"),
  homeStateGridDetail: document.getElementById("homeStateGridDetail"),
  homeStateGridBar: document.getElementById("homeStateGridBar"),
  homeSourceStatus: document.getElementById("homeSourceStatus"),
  homeSourceDetail: document.getElementById("homeSourceDetail"),
  homeSourceSolarBar: document.getElementById("homeSourceSolarBar"),
  homeSourceBatteryBar: document.getElementById("homeSourceBatteryBar"),
  homeSourceGridBar: document.getElementById("homeSourceGridBar"),
  homeSourceSolarShare: document.getElementById("homeSourceSolarShare"),
  homeSourceBatteryShare: document.getElementById("homeSourceBatteryShare"),
  homeSourceGridShare: document.getElementById("homeSourceGridShare"),
  homeJudgementMeta: document.getElementById("homeJudgementMeta"),
  homeJudgeLoadCard: document.getElementById("homeJudgeLoadCard"),
  homeJudgeLoadStatus: document.getElementById("homeJudgeLoadStatus"),
  homeJudgeLoadDetail: document.getElementById("homeJudgeLoadDetail"),
  homeJudgePeakCard: document.getElementById("homeJudgePeakCard"),
  homeJudgePeakStatus: document.getElementById("homeJudgePeakStatus"),
  homeJudgePeakDetail: document.getElementById("homeJudgePeakDetail"),
  homeJudgeNightCard: document.getElementById("homeJudgeNightCard"),
  homeJudgeNightStatus: document.getElementById("homeJudgeNightStatus"),
  homeJudgeNightDetail: document.getElementById("homeJudgeNightDetail"),
  homeJudgeTomorrowCard: document.getElementById("homeJudgeTomorrowCard"),
  homeJudgeTomorrowStatus: document.getElementById("homeJudgeTomorrowStatus"),
  homeJudgeTomorrowDetail: document.getElementById("homeJudgeTomorrowDetail"),
  homeActionQueueMeta: document.getElementById("homeActionQueueMeta"),
  homeActionQueueList: document.getElementById("homeActionQueueList"),
  operatingSummaryVerdict: document.getElementById("operatingSummaryVerdict"),
  operatingSummaryDetail: document.getElementById("operatingSummaryDetail"),
  operatingSummarySolar: document.getElementById("operatingSummarySolar"),
  operatingSummaryGrid: document.getElementById("operatingSummaryGrid"),
  operatingSummaryReserve: document.getElementById("operatingSummaryReserve"),
  operatingSummaryAction: document.getElementById("operatingSummaryAction"),
  commandBriefDetail: document.getElementById("commandBriefDetail"),
  commandBriefMode: document.getElementById("commandBriefMode"),
  commandBriefNowCard: document.getElementById("commandBriefNowCard"),
  commandBriefNow: document.getElementById("commandBriefNow"),
  commandBriefNowDetail: document.getElementById("commandBriefNowDetail"),
  commandBriefNextCard: document.getElementById("commandBriefNextCard"),
  commandBriefNext: document.getElementById("commandBriefNext"),
  commandBriefNextDetail: document.getElementById("commandBriefNextDetail"),
  commandBriefRiskCard: document.getElementById("commandBriefRiskCard"),
  commandBriefRisk: document.getElementById("commandBriefRisk"),
  commandBriefRiskDetail: document.getElementById("commandBriefRiskDetail"),
  commandBriefSignals: document.getElementById("commandBriefSignals"),
  phasePlanStatus: document.getElementById("phasePlanStatus"),
  phasePlanDetail: document.getElementById("phasePlanDetail"),
  phasePlanProgressLabel: document.getElementById("phasePlanProgressLabel"),
  phasePlanProgressBar: document.getElementById("phasePlanProgressBar"),
  phasePlanCheckpointCard: document.getElementById("phasePlanCheckpointCard"),
  phasePlanCheckpoint: document.getElementById("phasePlanCheckpoint"),
  phasePlanCheckpointDetail: document.getElementById("phasePlanCheckpointDetail"),
  phasePlanActionCard: document.getElementById("phasePlanActionCard"),
  phasePlanAction: document.getElementById("phasePlanAction"),
  phasePlanActionDetail: document.getElementById("phasePlanActionDetail"),
  phasePlanHandoffCard: document.getElementById("phasePlanHandoffCard"),
  phasePlanHandoff: document.getElementById("phasePlanHandoff"),
  phasePlanHandoffDetail: document.getElementById("phasePlanHandoffDetail"),
  phasePlanGrid: document.getElementById("phasePlanGrid"),
  smartHubStatus: document.getElementById("smartHubStatus"),
  smartHubConfidence: document.getElementById("smartHubConfidence"),
  smartHubConfidenceValue: document.getElementById("smartHubConfidenceValue"),
  smartHubConfidenceDetail: document.getElementById("smartHubConfidenceDetail"),
  smartHubNarrative: document.getElementById("smartHubNarrative"),
  smartHubTags: document.getElementById("smartHubTags"),
  smartWatchlistGrid: document.getElementById("smartWatchlistGrid"),
  smartDecisionLogMeta: document.getElementById("smartDecisionLogMeta"),
  smartDecisionTrend: document.getElementById("smartDecisionTrend"),
  smartDecisionLogList: document.getElementById("smartDecisionLogList"),
  smartHubSolarBasisCard: document.getElementById("smartHubSolarBasisCard"),
  smartHubSolarBasis: document.getElementById("smartHubSolarBasis"),
  smartHubSolarBasisDetail: document.getElementById("smartHubSolarBasisDetail"),
  smartHubBatteryBasisCard: document.getElementById("smartHubBatteryBasisCard"),
  smartHubBatteryBasis: document.getElementById("smartHubBatteryBasis"),
  smartHubBatteryBasisDetail: document.getElementById("smartHubBatteryBasisDetail"),
  smartHubGridBasisCard: document.getElementById("smartHubGridBasisCard"),
  smartHubGridBasis: document.getElementById("smartHubGridBasis"),
  smartHubGridBasisDetail: document.getElementById("smartHubGridBasisDetail"),
  smartHubOutlookBasisCard: document.getElementById("smartHubOutlookBasisCard"),
  smartHubOutlookBasis: document.getElementById("smartHubOutlookBasis"),
  smartHubOutlookBasisDetail: document.getElementById("smartHubOutlookBasisDetail"),
  smartHubNowCard: document.getElementById("smartHubNowCard"),
  smartHubNowStatus: document.getElementById("smartHubNowStatus"),
  smartHubNowDetail: document.getElementById("smartHubNowDetail"),
  smartHubLaterCard: document.getElementById("smartHubLaterCard"),
  smartHubLaterStatus: document.getElementById("smartHubLaterStatus"),
  smartHubLaterDetail: document.getElementById("smartHubLaterDetail"),
  smartHubWatchCard: document.getElementById("smartHubWatchCard"),
  smartHubWatchStatus: document.getElementById("smartHubWatchStatus"),
  smartHubWatchDetail: document.getElementById("smartHubWatchDetail"),
  smartFlowSplitMeta: document.getElementById("smartFlowSplitMeta"),
  smartFlowSplitGrid: document.getElementById("smartFlowSplitGrid"),
  todayBillImpactDetail: document.getElementById("todayBillImpactDetail"),
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
  dataQualityWarningDetail: document.getElementById("dataQualityWarningDetail"),
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
  energyTimelineTrack: document.getElementById("energyTimelineTrack"),
  energyTimelineMeta: document.getElementById("energyTimelineMeta"),
  energyTimelineSolar: document.getElementById("energyTimelineSolar"),
  energyTimelineBattery: document.getElementById("energyTimelineBattery"),
  energyTimelineGrid: document.getElementById("energyTimelineGrid"),
  energyTimelineDominant: document.getElementById("energyTimelineDominant"),
  solarCalendarGrid: document.getElementById("solarCalendarGrid"),
  solarCalendarMeta: document.getElementById("solarCalendarMeta"),
  weekdayProfileGrid: document.getElementById("weekdayProfileGrid"),
  weekdayProfileMeta: document.getElementById("weekdayProfileMeta"),
  peakReadinessScore: document.getElementById("peakReadinessScore"),
  peakReadinessRing: document.getElementById("peakReadinessRing"),
  peakReadinessValue: document.getElementById("peakReadinessValue"),
  peakReadinessStatus: document.getElementById("peakReadinessStatus"),
  peakReadinessDetail: document.getElementById("peakReadinessDetail"),
  peakReadinessBattery: document.getElementById("peakReadinessBattery"),
  peakReadinessTariff: document.getElementById("peakReadinessTariff"),
  peakReadinessGrid: document.getElementById("peakReadinessGrid"),
  peakReadinessSavings: document.getElementById("peakReadinessSavings"),
  batteryReserveDetail: document.getElementById("batteryReserveDetail"),
  batteryReserveMode: document.getElementById("batteryReserveMode"),
  batteryReserveFill: document.getElementById("batteryReserveFill"),
  batteryReserveSoc: document.getElementById("batteryReserveSoc"),
  batteryReserveUsable: document.getElementById("batteryReserveUsable"),
  batteryReserveBar: document.getElementById("batteryReserveBar"),
  batteryReservePower: document.getElementById("batteryReservePower"),
  batteryReserveCoverage: document.getElementById("batteryReserveCoverage"),
  batteryReserveAction: document.getElementById("batteryReserveAction"),
  flexibleLoadDetail: document.getElementById("flexibleLoadDetail"),
  flexibleLoadStatus: document.getElementById("flexibleLoadStatus"),
  flexibleLoadCapacity: document.getElementById("flexibleLoadCapacity"),
  flexibleLoadBar: document.getElementById("flexibleLoadBar"),
  flexibleLoadExamples: document.getElementById("flexibleLoadExamples"),
  flexibleLoadWindow: document.getElementById("flexibleLoadWindow"),
  flexibleLoadAvoid: document.getElementById("flexibleLoadAvoid"),
  flexibleLoadBatteryGuard: document.getElementById("flexibleLoadBatteryGuard"),
  batteryRunwayDetail: document.getElementById("batteryRunwayDetail"),
  batteryRunwayStatus: document.getElementById("batteryRunwayStatus"),
  batteryRunwayTime: document.getElementById("batteryRunwayTime"),
  batteryRunwayBar: document.getElementById("batteryRunwayBar"),
  batteryRunwayMeta: document.getElementById("batteryRunwayMeta"),
  batteryRunwayDrain: document.getElementById("batteryRunwayDrain"),
  batteryRunwayReserve: document.getElementById("batteryRunwayReserve"),
  batteryRunwayRisk: document.getElementById("batteryRunwayRisk"),
  gridForecastDetail: document.getElementById("gridForecastDetail"),
  gridForecastStatus: document.getElementById("gridForecastStatus"),
  gridForecastPressure: document.getElementById("gridForecastPressure"),
  gridForecastBar: document.getElementById("gridForecastBar"),
  gridForecastMeta: document.getElementById("gridForecastMeta"),
  gridForecastImport: document.getElementById("gridForecastImport"),
  gridForecastSolar: document.getElementById("gridForecastSolar"),
  gridForecastAction: document.getElementById("gridForecastAction"),
  tomorrowPrepDetail: document.getElementById("tomorrowPrepDetail"),
  tomorrowPrepStatus: document.getElementById("tomorrowPrepStatus"),
  tomorrowPrepScore: document.getElementById("tomorrowPrepScore"),
  tomorrowPrepBar: document.getElementById("tomorrowPrepBar"),
  tomorrowPrepMeta: document.getElementById("tomorrowPrepMeta"),
  tomorrowPrepWeather: document.getElementById("tomorrowPrepWeather"),
  tomorrowPrepReserve: document.getElementById("tomorrowPrepReserve"),
  tomorrowPrepWindow: document.getElementById("tomorrowPrepWindow"),
  tomorrowPrepAction: document.getElementById("tomorrowPrepAction"),
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
  actionBoardDetail: document.getElementById("actionBoardDetail"),
  actionBoardStatus: document.getElementById("actionBoardStatus"),
  actionBoardNowCard: document.getElementById("actionBoardNowCard"),
  actionBoardNowStatus: document.getElementById("actionBoardNowStatus"),
  actionBoardNowDetail: document.getElementById("actionBoardNowDetail"),
  actionBoardBatteryCard: document.getElementById("actionBoardBatteryCard"),
  actionBoardBatteryStatus: document.getElementById("actionBoardBatteryStatus"),
  actionBoardBatteryDetail: document.getElementById("actionBoardBatteryDetail"),
  actionBoardPeakCard: document.getElementById("actionBoardPeakCard"),
  actionBoardPeakStatus: document.getElementById("actionBoardPeakStatus"),
  actionBoardPeakDetail: document.getElementById("actionBoardPeakDetail"),
  actionBoardTomorrowCard: document.getElementById("actionBoardTomorrowCard"),
  actionBoardTomorrowStatus: document.getElementById("actionBoardTomorrowStatus"),
  actionBoardTomorrowDetail: document.getElementById("actionBoardTomorrowDetail"),
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
let last24HoursChart;
let solarProjectionChart;
let currentRows = [];
let sortState = {
  key: "date",
  direction: "desc",
};
let lastPayload = null;
let lastRangePayload = null;
let lastSavingsOverview = null;
let lastWeatherPayload = null;
let lastSolarForecastPayload = null;
let lastTariff = null;
let lastWeatherSettings = null;
const REBUILD_LIMIT_DAYS = 31;
const WARNING_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const BATTERY_ESTIMATE_CAPACITY_KWH = 10.4;
const AUTO_REFRESH_INTERVAL_MS = 5 * 60 * 1000;
let autoRefreshTimer = null;
let nextAutoRefreshAt = null;
let isDashboardLoading = false;

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

function getStoredJson(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch {
    return fallback;
  }
}

function setStoredJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
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
    navOverview: "Overview",
    navActions: "Actions",
    navBattery: "Battery",
    navDailyData: "Daily data",
    navSettings: "Settings",
    deepAnalysisTitle: "Deep analysis",
    deepAnalysisSummary: "Savings, trends, calendar, and longer-range patterns.",
    moreAnalysisTitle: "More analysis",
    moreAnalysisSummary: "Savings breakdown, bill impact, period highlights, battery behavior, and solar utilization.",
    loading: "Loading dashboard data...",
    loaded: "Dashboard loaded successfully.",
    loadedCached: "Dashboard loaded from cached data because the live API call failed.",
    autoRefreshNext: "Next auto refresh: {time}",
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
    modbusConnectError: "Modbus TCP cannot connect to {target} within {timeoutMs} ms.",
    modbusConnectAdviceIp: "Check whether the inverter DHCP IP changed, then update MODBUS_HOST in the Synology .env file.",
    modbusConnectAdvicePort: "Confirm the inverter is online on the 2.4 GHz LAN and port 502 is reachable from Synology.",
    modbusConnectAdviceRestart: "After changing MODBUS_HOST, restart the foxcloud-dashboard container.",
    period: "Period",
    periodTotals: "Energy totals",
    periodTotalsHelp: "Choose a period to summarize daily energy data.",
    tableRange: "Table range",
    tableAverageLabel: "Average ({count} days)",
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
    kpiDailyBattery: "Daily battery",
    kpiDailyExport: "Daily export",
    kpiNetGrid: "Net grid",
    kpiSelfSufficiency: "Self sufficiency",
    kpiEstimatedSavings: "Est. savings",
    batteryNetChargedShort: "Net charged",
    batteryNetDischargedShort: "Net discharged",
    batteryNetBalancedShort: "Balanced",
    batteryKpiDetail: "In {charged} · out {discharged}",
    netGridExporting: "Net exporter today",
    netGridImporting: "Net importer today",
    homeStateKicker: "Plain home view",
    homeStateTitle: "Home energy at a glance",
    homeStateDetail: "Solar {solar}, home load {home}, battery {battery}, grid {grid}. Updated {updated}.",
    homeStateBattery: "Battery",
    homeStateSolar: "Solar flow",
    homeStateLoad: "Home load",
    homeStateGrid: "Grid",
    homeStateVerdictUseSun: "Use solar now",
    homeStateVerdictSaveBattery: "Save battery",
    homeStateVerdictAvoidGrid: "Avoid grid import",
    homeStateVerdictSteady: "Home is steady",
    homeStateBatteryGood: "Comfortable reserve",
    homeStateBatteryWatch: "Watch reserve",
    homeStateBatteryLow: "Low reserve",
    homeStateBatteryUnknown: "Waiting for battery",
    homeStateBatteryDetail: "SOC {soc}; reserve {reserve}; runway {runway}.",
    homeStateSolarHome: "Covering home",
    homeStateSolarCharging: "Charging battery",
    homeStateSolarExport: "Exporting surplus",
    homeStateSolarWeak: "Solar is light",
    homeStateSolarIdle: "Solar idle",
    homeStateSolarDetail: "{cover} of live home load. Export {export}; battery charge {charge}.",
    homeStateLoadLow: "Light load",
    homeStateLoadNormal: "Normal load",
    homeStateLoadHigh: "High load",
    homeStateLoadDetail: "Home {home}; recent average {average}; grid support {grid}.",
    homeStateGridExport: "Exporting",
    homeStateGridImport: "Importing",
    homeStateGridBalanced: "Balanced",
    homeStateGridDetail: "{tariff}; pressure {pressure}; action {action}.",
    homeSourceKicker: "Home load source",
    homeSourceSolar: "Solar",
    homeSourceBattery: "Battery",
    homeSourceGrid: "Grid",
    homeSourceMostlySolar: "Mostly solar",
    homeSourceMostlyBattery: "Battery is carrying",
    homeSourceGridHelp: "Grid is supporting",
    homeSourceMixed: "Mixed supply",
    homeSourceIdle: "Waiting for load",
    homeSourceDetail: "Current home load {load}; solar {solar}, battery {battery}, grid {grid}.",
    homeJudgementKicker: "Auto judgement",
    homeJudgementMeta: "Judged from live flow, reserve, tariff, and forecast.",
    homeJudgeLoad: "Flexible loads",
    homeJudgePeak: "Peak readiness",
    homeJudgeNight: "Tonight battery",
    homeJudgeTomorrow: "Tomorrow plan",
    homeJudgeLoadRun: "Run one load",
    homeJudgeLoadLight: "Only light loads",
    homeJudgeLoadWait: "Wait",
    homeJudgeLoadAvoid: "Avoid now",
    homeJudgeLoadDetail: "Headroom {headroom}; grid pressure {pressure}; battery {reserve}.",
    homeJudgePeakReady: "Ready",
    homeJudgePeakWatch: "Watch",
    homeJudgePeakLow: "Low",
    homeJudgePeakDetail: "Score {score}; peak {window}; grid {grid}.",
    homeJudgeNightSafe: "Comfortable",
    homeJudgeNightWatch: "Use gently",
    homeJudgeNightSave: "Save battery",
    homeJudgeNightDetail: "Runway {runway}; reserve {reserve}; risk {risk}.",
    homeJudgeTomorrowSolar: "Use solar window",
    homeJudgeTomorrowLight: "Keep loads light",
    homeJudgeTomorrowWait: "Wait for forecast",
    homeJudgeTomorrowDetail: "Outlook {outlook}; best window {window}; action {action}.",
    homeActionQueueKicker: "Suggested actions",
    homeActionQueueMeta: "Ranked by impact; only the three most useful moves are shown.",
    homeActionRunLoad: "Run one flexible load",
    homeActionRunLoadDetail: "Headroom {headroom}; battery reserve {reserve}; grid pressure {pressure}.",
    homeActionLightLoad: "Keep it to light loads",
    homeActionLightLoadDetail: "Some solar is available, but headroom is only {headroom}; avoid stacking appliances.",
    homeActionReduceImport: "Reduce grid import first",
    homeActionReduceImportDetail: "Grid pressure {pressure}; {tariff}. Avoid overlapping high-power appliances.",
    homeActionProtectBattery: "Protect battery reserve",
    homeActionProtectBatteryDetail: "Reserve {reserve}; runway {runway}; risk {risk}.",
    homeActionPeakPrep: "Prepare for peak",
    homeActionPeakPrepDetail: "Readiness {score}; peak window {window}. Finish flexible loads before it tightens.",
    homeActionPlanTomorrow: "Plan around tomorrow",
    homeActionPlanTomorrowDetail: "Tomorrow {outlook}; best window {window}; {action}.",
    homeActionWatchForecast: "Refresh the forecast",
    homeActionWatchForecastDetail: "Tomorrow outlook is not ready yet; keep larger loads flexible until forecast data arrives.",
    homeActionSteady: "Hold the current rhythm",
    homeActionSteadyDetail: "Battery, grid, and home load are controlled. Recheck on the next refresh.",
    operatingSummaryKicker: "Operating summary",
    operatingSummaryTitle: "Today at a glance",
    operatingSummaryDetail: "Self-sufficiency {self}. {grid}. Dominant recent mode: {mode}.",
    operatingNetExport: "Net export {value}",
    operatingNetImport: "Net import {value}",
    operatingSummaryReserve: "Reserve above 20%",
    operatingSummaryAction: "Next action",
    commandBriefKicker: "Smart command",
    commandBriefTitle: "Next best moves",
    commandBriefDetail: "{mode}. Confidence {confidence}; next checkpoint {checkpoint}.",
    commandBriefMode: "Mode",
    commandBriefNow: "Now",
    commandBriefNext: "Next handoff",
    commandBriefRisk: "Watch",
    commandBriefSignals: "Decision signals",
    commandBriefSignalConfidence: "Confidence",
    commandBriefSignalPhase: "Phase",
    commandBriefSignalSurplus: "Solar surplus",
    commandBriefSignalGrid: "Grid pressure",
    commandBriefPhaseDetail: "{progress} through · {remaining} left",
    commandBriefSurplusGood: "Usable headroom is available.",
    commandBriefSurplusWeak: "Headroom is limited.",
    commandBriefGridPeak: "Peak window active.",
    commandBriefGridOffPeak: "Peak starts in {time}.",
    phasePlanKicker: "Day phase",
    phasePlanTitle: "Operating rhythm",
    phasePlanDetail: "Now {time}. {phase} is active; next checkpoint: {next}.",
    phaseCurrent: "Current phase",
    phaseMorning: "Morning ramp",
    phaseSolar: "Solar window",
    phasePeak: "Peak guard",
    phaseNight: "Night reserve",
    phaseMorningDetail: "Let solar build; keep heavy flexible loads waiting.",
    phaseSolarDetail: "Use surplus before the peak window if headroom appears.",
    phasePeakDetail: "Avoid avoidable import during {peakWindow}.",
    phaseNightDetail: "Protect battery reserve for overnight household load.",
    phaseActionWaitForSun: "Wait for solar",
    phaseActionUseSurplus: "Use surplus now",
    phaseActionWatchSurplus: "Watch surplus",
    phaseActionReduceImport: "Reduce import",
    phaseActionProtectReserve: "Protect reserve",
    phaseActionNormal: "Normal rhythm",
    phaseNextSolar: "solar window at {time}",
    phaseNextPeak: "peak window at {time}",
    phaseNextNight: "night reserve after {time}",
    phaseNextMorning: "morning ramp at {time}",
    phasePlanProgress: "Phase progress",
    phasePlanProgressValue: "{percent} through · {remaining} left",
    phasePlanCheckpoint: "Next checkpoint",
    phasePlanCheckpointDetail: "Switches to {phase} at {time}.",
    phasePlanBestAction: "Best action",
    phasePlanActionDetail: "Based on live surplus, reserve, tariff, and forecast.",
    phasePlanHandoff: "Handoff cue",
    phaseHandoffStageLoads: "Stage loads",
    phaseHandoffStageLoadsDetail: "Hold heavy loads until solar headroom is visible.",
    phaseHandoffFinishLoads: "Finish deferrables",
    phaseHandoffFinishLoadsDetail: "Use surplus before the peak window at {time}.",
    phaseHandoffHoldLoads: "Hold heavy loads",
    phaseHandoffHoldLoadsDetail: "Wait for cleaner surplus before the peak window at {time}.",
    phaseHandoffHoldLine: "Hold the line",
    phaseHandoffHoldLineDetail: "Avoid flexible import until the peak guard ends at {time}.",
    phaseHandoffProtectReserve: "Protect reserve",
    phaseHandoffProtectReserveDetail: "Keep battery headroom for overnight base load.",
    phaseHandoffResetMorning: "Reset for morning",
    phaseHandoffResetMorningDetail: "Review reserve before the morning ramp at {time}.",
    smartHubKicker: "Smart energy pilot",
    smartHubTitle: "Today's energy decision",
    smartHubNow: "Now",
    smartHubLater: "Later today",
    smartHubWatch: "Watch",
    smartHubStatusSolar: "Use the sun",
    smartHubStatusBattery: "Protect reserve",
    smartHubStatusPeak: "Avoid peak import",
    smartHubStatusBalanced: "Steady day",
    smartHubConfidence: "Confidence",
    smartHubConfidenceHigh: "High",
    smartHubConfidenceMedium: "Medium",
    smartHubConfidenceLow: "Low",
    smartHubConfidenceDetail: "{level}: live age {age}, {samples} samples, {warnings}, weather {weather}.",
    smartHubWarningsNone: "no warnings",
    smartHubWarningsCount: "{count} warning(s)",
    smartHubWeatherReady: "ready",
    smartHubWeatherMissing: "missing",
    smartHubBasisSolar: "Solar surplus",
    smartHubBasisBattery: "Battery reserve",
    smartHubBasisGrid: "Grid pressure",
    smartHubBasisOutlook: "Next window",
    smartHubBasisSolarDetail: "Export now {exportKw}; home load {homeKw}.",
    smartHubBasisBatteryDetail: "SOC {soc}; runway risk {risk}.",
    smartHubBasisGridDetail: "Grid flow {grid}; tariff {tariff}.",
    smartHubBasisOutlookDetail: "Peak window {window}; tomorrow {outlook}.",
    smartHubSummarySolar: "Solar is covering the home and there is about {headroom} usable surplus. Battery reserve is {reserve}, so flexible loads are best run now.",
    smartHubSummaryBattery: "Battery reserve is only {reserve}. Keep flexible loads light until solar output improves or the peak window passes.",
    smartHubSummaryPeak: "Grid import pressure is {pressure} during the tariff watch window. Reduce large loads and let the battery cover essentials.",
    smartHubSummaryBalanced: "The system is steady: self-sufficiency is {self}, grid pressure is {pressure}, and battery reserve is {reserve}. No urgent change is needed.",
    smartHubNowUseSolar: "Run flexible loads",
    smartHubNowSaveBattery: "Hold heavy loads",
    smartHubNowReduceImport: "Reduce grid import",
    smartHubNowSteady: "Keep current rhythm",
    smartHubNowUseSolarDetail: "Usable surplus is about {headroom}; this is a good window for dishwasher, laundry, or other deferrable loads.",
    smartHubNowSaveBatteryDetail: "Battery reserve is {reserve}; keep discretionary loads waiting until reserve improves.",
    smartHubNowReduceImportDetail: "Import pressure is {pressure}; avoid stacking high-power appliances right now.",
    smartHubNowSteadyDetail: "Live flow is balanced. Keep watching solar and grid flow before starting larger loads.",
    smartHubLaterPeak: "Prepare for peak",
    smartHubLaterSolar: "Use solar window",
    smartHubLaterConserve: "Conserve for tonight",
    smartHubLaterNormal: "Normal evening plan",
    smartHubLaterPeakDetail: "Peak window {window} is {time} away. Try to finish flexible loads before it starts.",
    smartHubLaterSolarDetail: "Tomorrow outlook is {outlook}; keep heavier loads near the next solar window.",
    smartHubLaterConserveDetail: "Runway risk is {risk}; protect the battery for evening and overnight coverage.",
    smartHubLaterNormalDetail: "Peak pressure is low and reserve looks usable. Keep the usual evening plan.",
    smartHubWatchData: "Data freshness",
    smartHubWatchBattery: "Battery runway",
    smartHubWatchWeather: "Tomorrow weather",
    smartHubWatchGrid: "Grid pressure",
    smartHubWatchDataDetail: "There are {count} dashboard warning(s). Check the data quality panel below the daily table.",
    smartHubWatchBatteryDetail: "Reserve is {reserve}, runway risk is {risk}.",
    smartHubWatchWeatherDetail: "Tomorrow solar outlook is {outlook}; adjust flexible loads if the forecast weakens.",
    smartHubWatchGridDetail: "Current grid mode is {grid}; import pressure is {pressure}.",
    smartHubTagSolarSurplus: "Solar surplus",
    smartHubTagBatteryCharging: "Battery charging",
    smartHubTagBatteryDischarging: "Battery supporting home",
    smartHubTagGridImport: "Grid import",
    smartHubTagGridExport: "Grid export",
    smartHubTagPeakNow: "Peak tariff now",
    smartHubTagOffPeak: "Off-peak",
    smartHubTagTomorrowGood: "Tomorrow solar OK",
    smartHubTagTomorrowWeak: "Tomorrow solar weak",
    smartFlowSplit: "Power routing",
    smartFlowSplitMeta: "Live shape: solar {solar}, home {home}, battery {battery}, grid {grid}.",
    smartFlowSolar: "Solar output",
    smartFlowSolarActive: "Generation is carrying the current decision.",
    smartFlowSolarIdle: "Solar output is quiet right now.",
    smartFlowHome: "Home load",
    smartFlowHomeDetail: "Immediate household demand.",
    smartFlowBattery: "Battery",
    smartFlowBatteryChargeDetail: "Power is being stored for later.",
    smartFlowBatteryDischargeDetail: "Battery is covering part of the home load.",
    smartFlowBatteryIdleDetail: "Battery flow is minimal.",
    smartFlowGrid: "Grid",
    smartFlowGridExportDetail: "Surplus is leaving the home.",
    smartFlowGridImportDetail: "Home is leaning on grid supply.",
    smartFlowGridIdleDetail: "Grid flow is minimal.",
    smartWatchlist: "Watchlist",
    smartWatchlistMeta: "Top signals to monitor now",
    smartWatchBattery: "Battery reserve",
    smartWatchBatteryLow: "Protect reserve before running larger flexible loads.",
    smartWatchBatteryHealthy: "Enough usable reserve for normal household rhythm.",
    smartWatchSolar: "Solar surplus",
    smartWatchSolarGood: "Use this window for deferrable loads while surplus is available.",
    smartWatchSolarWeak: "Surplus is limited; wait for a stronger solar window.",
    smartWatchGrid: "Grid pressure",
    smartWatchGridHigh: "Avoid stacking heavy appliances while import pressure is high.",
    smartWatchGridLow: "Grid pressure is low; no urgent import reduction needed.",
    smartWatchData: "Data confidence",
    smartWatchDataLow: "Recommendation may be less reliable; check data freshness and warnings.",
    smartWatchDataHigh: "Live data and samples look reliable enough for automation hints.",
    smartWatchWeather: "Tomorrow outlook",
    smartWatchWeatherWeak: "Tomorrow solar may be weaker; finish flexible loads sooner if possible.",
    smartWatchWeatherGood: "Tomorrow solar outlook supports delaying non-urgent loads.",
    smartDecisionLog: "Decision trail",
    smartDecisionLogEmpty: "Waiting for smart decisions.",
    smartDecisionLogMeta: "Stored in this browser · latest {time}",
    smartDecisionLogMetaEmpty: "Stored in this browser",
    smartDecisionLogNow: "Current advice",
    smartDecisionLogConfidence: "Confidence {value}",
    smartDecisionLogChangedTo: "Switched to {status}",
    smartDecisionLogStarted: "Baseline captured",
    smartDecisionMetricReserve: "Reserve",
    smartDecisionMetricPressure: "Grid",
    smartDecisionMetricSurplus: "Surplus",
    smartDecisionLogSignals: "Reserve {reserve} · grid {pressure} · surplus {headroom}",
    smartDecisionTrendFirst: "Starting a local comparison trail. The next refresh will explain what changed.",
    smartDecisionTrendChanged: "Recommendation changed: {previous} -> {current}. Main move: {driver}.",
    smartDecisionTrendSteady: "Decision is steady. Main move since last refresh: {driver}.",
    smartDecisionDriverReserveUp: "battery reserve rose {value}",
    smartDecisionDriverReserveDown: "battery reserve fell {value}",
    smartDecisionDriverHeadroomUp: "solar surplus rose {value}",
    smartDecisionDriverHeadroomDown: "solar surplus fell {value}",
    smartDecisionDriverPressureUp: "grid pressure rose {value}",
    smartDecisionDriverPressureDown: "grid pressure fell {value}",
    smartDecisionDriverConfidenceUp: "confidence rose {value}",
    smartDecisionDriverConfidenceDown: "confidence fell {value}",
    smartDecisionDriverNoMajor: "signals are mostly unchanged",
    operatingSolarDay: "Solar-led day",
    operatingBalancedDay: "Balanced day",
    operatingGridDay: "Grid-heavy day",
    operatingBatterySupport: "Battery support day",
    operatingActionUseSurplus: "Use solar surplus",
    operatingActionSaveBattery: "Save battery",
    operatingActionReduceGrid: "Reduce grid use",
    operatingActionNormal: "Keep steady",
    todayBillImpactKicker: "Bill impact",
    todayBillImpactTitle: "Today's bill impact",
    todayBillImpactDetail: "Avoided {avoided} of grid import and exported {exported} today.",
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
    warningWithCreatedAt: "{message}. Created at: {createdAt}",
    warningDetailLabel: "Warning detail",
    warningDetailNone: "No warning in this response.",
    warningDetailOne: "Latest warning in this response: {warning}. Generated at {time}.",
    warningDetailMany: "Latest of {count} warnings in this response: {warning}. Generated at {time}.",
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
    energyTimelineKicker: "Energy timeline",
    energyTimelineTitle: "Today energy timeline",
    energyTimelineMeta: "{segments} operating segments from {points} recent samples.",
    timelineSolarLed: "Solar-led time",
    timelineBatteryLed: "Battery-led time",
    timelineGridLed: "Grid import time",
    timelineDominantMode: "Dominant mode",
    timelineModeSolar: "Solar-led",
    timelineModeBattery: "Battery-led",
    timelineModeGrid: "Grid import",
    timelineModeMixed: "Mixed",
    timelineModeIdle: "Quiet",
    timelineLegendSolar: "Yellow: solar-led",
    timelineLegendBattery: "Green: battery-led",
    timelineLegendGrid: "Blue: grid import",
    timelineLegendMixed: "Purple: mixed",
    timelineLegendIdle: "Grey: quiet",
    timelineEmpty: "Waiting for recent power samples.",
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
    peakReadinessKicker: "Peak readiness",
    peakReadinessTitle: "Evening peak readiness",
    peakReadinessExcellent: "Ready",
    peakReadinessGood: "Mostly ready",
    peakReadinessWatch: "Watch peak",
    peakReadinessLow: "Low cover",
    peakReadinessDetail: "Battery {soc}, peak window {window}, current grid flow {grid}.",
    peakReadinessScore: "{score}/100",
    batteryReserveKicker: "Battery reserve",
    batteryReserveTitle: "Battery reserve plan",
    batteryReserveDetail: "Reserve is {reserve} above the 20% floor. Current battery mode is {mode}.",
    batteryReserveAboveFloor: "Reserve above 20%",
    batteryPowerNow: "Battery power now",
    homeLoadCoveredNow: "Home load covered now",
    reserveAction: "Recommended action",
    reserveActionSave: "Save battery for peak",
    reserveActionUseSurplus: "Use surplus or keep charging",
    reserveActionReduce: "Reduce flexible loads",
    reserveActionSteady: "Reserve looks steady",
    reserveActionUnavailable: "Wait for battery data",
    flexibleLoadKicker: "Flexible loads",
    flexibleLoadTitle: "Flexible load planner",
    flexibleLoadDetail: "Surplus headroom {headroom}. Battery {soc}. Grid flow {grid}.",
    usableSurplusNow: "Usable surplus now",
    bestLoadWindow: "Best window",
    avoidLoadNow: "Avoid now",
    batteryGuard: "Battery guard",
    loadPlanRunHeavy: "Run larger loads",
    loadPlanRunLight: "Run small loads",
    loadPlanChargeFirst: "Let battery charge first",
    loadPlanWait: "Wait",
    loadPlanAvoidPeak: "Avoid extra load",
    loadBestNow: "Now",
    loadBestAfterPeak: "After peak",
    loadBestSolarOrOffPeak: "Next solar or off-peak window",
    loadBestOffPeak: "Off-peak is acceptable",
    loadAvoidPeakImport: "Peak grid import",
    loadAvoidLowBattery: "Low battery reserve",
    loadAvoidHighImport: "High grid import",
    loadAvoidNone: "No major warning",
    loadGuardStrong: "Battery reserve is strong",
    loadGuardMedium: "Keep some reserve",
    loadGuardLow: "Protect battery reserve",
    loadExampleHeavy: "About one large appliance",
    loadExampleMedium: "About one medium appliance",
    loadExampleLight: "Small flexible loads only",
    loadExampleNone: "No spare solar headroom",
    batteryRunwayKicker: "Battery runway",
    batteryRunwayTitle: "Battery cover forecast",
    batteryRunwayDetail: "Recent SOC trend {trend}. Current reserve above 20% is {reserve}.",
    estimatedRunway: "Estimated time to 20%",
    recentBatteryDrain: "Recent battery drain",
    batteryReserveFloor: "Reserve floor",
    overnightRisk: "Overnight risk",
    runwayHealthy: "Comfortable",
    runwayWatch: "Watch tonight",
    runwayLow: "Low runway",
    runwayCharging: "Charging or stable",
    runwayUnavailable: "Waiting for trend",
    runwayMoreThanDay: ">24h",
    runwayTrendStable: "stable",
    runwayTrendCharging: "charging",
    runwayTrendDraining: "down {rate}/h",
    runwayRiskLow: "Low",
    runwayRiskMedium: "Medium",
    runwayRiskHigh: "High",
    runwayMeta: "Recent home load {load}; battery support {coverage}.",
    gridForecastKicker: "Grid forecast",
    gridForecastTitle: "Grid import forecast",
    gridForecastDetail: "Recent import {importKw}. Battery reserve {reserve}. Tariff is {tariff}.",
    gridImportPressure: "Import pressure",
    recentGridImport: "Recent grid import",
    solarTrend: "Solar trend",
    gridForecastAction: "Suggested action",
    gridForecastLow: "Low",
    gridForecastWatch: "Watch",
    gridForecastHigh: "High import risk",
    gridForecastExporting: "Exporting",
    gridActionNormal: "Normal use",
    gridActionShiftLoads: "Shift flexible loads",
    gridActionReducePeak: "Reduce peak loads",
    gridActionUseSolar: "Use solar surplus",
    gridSolarRising: "Rising",
    gridSolarFalling: "Falling",
    gridSolarFlat: "Flat",
    gridForecastMeta: "Home load {load}; live grid flow {grid}.",
    tomorrowPrepKicker: "Tomorrow prep",
    tomorrowPrepTitle: "Tomorrow solar readiness",
    tomorrowPrepDetail: "Tomorrow outlook {outlook}. Expected rain {rain}; cloud cover {cloud}.",
    tomorrowPrepScore: "Readiness score",
    tomorrowSolarOutlook: "Tomorrow solar",
    tonightBatteryReserve: "Tonight reserve",
    tomorrowLoadWindow: "Best load window",
    tomorrowPrepAction: "Action",
    tomorrowPrepReady: "Ready",
    tomorrowPrepGood: "Good setup",
    tomorrowPrepWatch: "Watch tonight",
    tomorrowPrepLimited: "Limited solar",
    tomorrowPrepWaiting: "Waiting for forecast",
    tomorrowPrepMeta: "Battery {soc}; recent home load {load}; tariff {tariff}.",
    tomorrowWindowSolar: "Late morning to afternoon",
    tomorrowWindowLightOnly: "Small daytime loads only",
    tomorrowWindowOffPeak: "Off-peak or after forecast improves",
    tomorrowActionUseSolar: "Plan flexible loads for solar hours",
    tomorrowActionSaveBattery: "Keep battery reserve overnight",
    tomorrowActionAvoidHeavy: "Avoid heavy daytime loads",
    tomorrowActionWaitWeather: "Refresh weather forecast",
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
    actionBoardKicker: "Priority board",
    actionBoardTitle: "What to do now",
    actionBoardNow: "Now",
    actionBoardBattery: "Battery",
    actionBoardPeak: "Peak window",
    actionBoardTomorrow: "Tomorrow",
    actionBoardDetail: "Priority: {priority}. Grid {grid}; battery {battery}; tomorrow {tomorrow}.",
    actionBoardAllGood: "Steady",
    actionBoardUseSurplus: "Use surplus now",
    actionBoardProtectBattery: "Protect battery",
    actionBoardReduceImport: "Reduce import",
    actionBoardPlanTomorrow: "Plan tomorrow",
    actionNowUseSolar: "Run flexible loads",
    actionNowUseSolarDetail: "Available headroom {headroom}. Best before the surplus is exported.",
    actionNowReduceImport: "Pause heavy loads",
    actionNowReduceImportDetail: "Import pressure {pressure}. Grid flow {grid}.",
    actionNowWait: "Keep normal use",
    actionNowWaitDetail: "No urgent load shift is needed right now.",
    actionBatterySave: "Hold reserve",
    actionBatterySaveDetail: "Reserve above 20% is {reserve}. Recent runway risk {risk}.",
    actionBatteryUse: "Reserve is usable",
    actionBatteryUseDetail: "Battery reserve {reserve}; current mode {mode}.",
    actionPeakActive: "Peak active",
    actionPeakActiveDetail: "Avoid import during {window}; grid flow {grid}.",
    actionPeakPrepare: "Prepare for peak",
    actionPeakPrepareDetail: "{time} until peak window {window}.",
    actionTomorrowSolar: "Use solar window",
    actionTomorrowSolarDetail: "Tomorrow is {outlook}; best window {window}.",
    actionTomorrowConserve: "Conserve tonight",
    actionTomorrowConserveDetail: "Tomorrow is {outlook}; keep reserve and avoid heavy loads.",
    actionTomorrowWaiting: "Waiting for forecast",
    actionTomorrowWaitingDetail: "Weather data is not ready yet.",
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
    batteryLevelNow: "Battery level now",
    batteryLevelNowHelp: "Current battery SOC",
    intoBattery: "Into battery",
    outOfBattery: "Out of battery",
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
    chart: "Chart",
    dailyEnergyChart: "Daily solar, grid, and home usage",
    table: "Table",
    dailyEnergyData: "Daily energy data",
    date: "Date",
    energyIntoBattery: "Energy going into the battery",
    energyOutBattery: "Energy coming out of the battery",
    unavailable: "Unavailable",
    noLiveTimestamp: "No live timestamp available",
    liveUpdated: "Live updated",
    responseGenerated: "Response generated",
    liveMetaFresh: "Live data updated: {liveUpdated} • Current response generated: {responseGenerated}",
    liveMetaCache: "Cached data, original live update: {liveUpdated}, current response: {responseGenerated}, cache age: {cacheAge}",
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
    solarProjectionKicker: "Solar projection",
    solarProjectionTitle: "Today's solar generation estimate",
    solarProjectionNow: "Generated so far",
    solarProjectionExpected: "Estimated today",
    solarProjectionRemaining: "Likely remaining",
    solarProjectionTonightBattery: "Tonight battery",
    solarProjectionConfidence: "Confidence",
    solarProjectionSummary: "Estimated finish {estimate}; {remaining} still likely. Tonight battery around {battery}.",
    solarProjectionMeta: "Live solar {solar}; battery {battery}; inverter {inverter}; today weather {weather}; cloud {cloud}; recent average {average}; source {source}.",
    solarProjectionSourceLocal: "local model",
    solarProjectionSourceDual: "Solcast + local correction",
    solarProjectionActualSeries: "Generated so far",
    solarProjectionEstimateSeries: "Projected finish path",
    solarProjectionTargetSeries: "Estimated total",
    solarProjectionBatterySeries: "Battery reserve",
    solarProjectionConfidenceHigh: "High",
    solarProjectionConfidenceMedium: "Medium",
    solarProjectionConfidenceLow: "Low",
    solarProjectionNoData: "Waiting for enough solar samples to estimate today.",
    solarDispatchTitle: "Dispatch plan",
    solarDispatchCorrection: "Solcast correction",
    solarDispatchSolcastRemaining: "Solcast remaining",
    solarDispatchPredbat: "Predbat-ready",
    solarDispatchUseSurplus: "Use surplus window",
    solarDispatchHoldBattery: "Hold battery reserve",
    solarDispatchChargeOffPeak: "Prepare off-peak charge",
    solarDispatchWatch: "Watch forecast drift",
    solarDispatchSteady: "Stay flexible",
    solarDispatchUseSurplusDetail: "Corrected solar is strong. Move flexible loads into the next sunny window before peak tariff.",
    solarDispatchHoldBatteryDetail: "Evening battery cover looks tight. Keep larger loads light and preserve reserve for peak hours.",
    solarDispatchChargeOffPeakDetail: "Low solar and low reserve. Predbat should consider a small off-peak top-up before the next peak.",
    solarDispatchWatchDetail: "Actual production is drifting from Solcast. Keep flexible loads movable until the next refresh confirms the shape.",
    solarDispatchSteadyDetail: "Solar, battery, and tariff pressure look balanced. No urgent action needed.",
    solarDispatchCorrectionDetail: "Actual so far {actual} vs Solcast expected {expected}.",
    solarDispatchCorrectionUnavailable: "Waiting for enough daylight overlap.",
    solarDispatchSolcastDetail: "Raw Solcast {raw}; corrected remaining {corrected}.",
    solarDispatchSolcastUnavailable: "No Solcast remainder available.",
    solarDispatchPredbatReady: "Ready input",
    solarDispatchPredbatWaiting: "Waiting",
    solarDispatchPredbatDetail: "Feed Predbat trusted solar {estimate}, reserve target {reserve}, tariff {tariff}.",
    solarDispatchPredbatWaitingDetail: "Need Solcast plus live battery data before a useful battery plan.",
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
    navOverview: "总览",
    navActions: "行动",
    navBattery: "电池",
    navDailyData: "每日数据",
    navSettings: "设置",
    deepAnalysisTitle: "深度分析",
    deepAnalysisSummary: "节省金额、趋势、日历和较长周期模式。",
    moreAnalysisTitle: "更多分析",
    moreAnalysisSummary: "节省构成、账单影响、周期亮点、电池表现和太阳能利用率。",
    loading: "正在加载仪表板数据...",
    loaded: "仪表板数据加载成功。",
    loadedCached: "实时 API 请求失败，当前显示缓存数据。",
    autoRefreshNext: "下次自动刷新：{time}",
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
    modbusConnectError: "Modbus TCP 无法在 {timeoutMs} ms 内连接到 {target}。",
    modbusConnectAdviceIp: "检查逆变器 DHCP IP 是否变化，然后更新 Synology .env 里的 MODBUS_HOST。",
    modbusConnectAdvicePort: "确认逆变器仍在 2.4GHz 局域网在线，并且 Synology 能访问 502 端口。",
    modbusConnectAdviceRestart: "修改 MODBUS_HOST 后，重启 foxcloud-dashboard container 让配置生效。",
    period: "周期",
    periodTotals: "能源总计",
    periodTotalsHelp: "选择一个周期来汇总每日能源数据。",
    tableRange: "表格范围",
    tableAverageLabel: "平均（{count} 天）",
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
    kpiDailyBattery: "今日电池",
    kpiDailyExport: "今日回馈",
    kpiNetGrid: "电网净流向",
    kpiSelfSufficiency: "自给率",
    kpiEstimatedSavings: "预估节省",
    batteryNetChargedShort: "净充入",
    batteryNetDischargedShort: "净放出",
    batteryNetBalancedShort: "基本平衡",
    batteryKpiDetail: "充入 {charged} · 放出 {discharged}",
    netGridExporting: "今天净回馈电网",
    netGridImporting: "今天净从电网取电",
    homeStateKicker: "一眼看懂",
    homeStateTitle: "家庭能源状态",
    homeStateDetail: "太阳能 {solar}，家庭负载 {home}，电池 {battery}，电网 {grid}。更新：{updated}。",
    homeStateBattery: "电池",
    homeStateSolar: "太阳能流向",
    homeStateLoad: "家庭负载",
    homeStateGrid: "电网",
    homeStateVerdictUseSun: "现在用太阳能",
    homeStateVerdictSaveBattery: "保住电池",
    homeStateVerdictAvoidGrid: "避免从电网取电",
    homeStateVerdictSteady: "家里状态平稳",
    homeStateBatteryGood: "电池余量舒服",
    homeStateBatteryWatch: "留意电池余量",
    homeStateBatteryLow: "电池余量偏低",
    homeStateBatteryUnknown: "等待电池数据",
    homeStateBatteryDetail: "SOC {soc}；高于 20% 余量 {reserve}；续航 {runway}。",
    homeStateSolarHome: "正在覆盖家里",
    homeStateSolarCharging: "正在充电池",
    homeStateSolarExport: "正在回馈富余电",
    homeStateSolarWeak: "太阳能偏弱",
    homeStateSolarIdle: "太阳能待机",
    homeStateSolarDetail: "覆盖当前家庭负载 {cover}。回馈 {export}；充电 {charge}。",
    homeStateLoadLow: "轻负载",
    homeStateLoadNormal: "正常负载",
    homeStateLoadHigh: "高负载",
    homeStateLoadDetail: "当前家庭用电 {home}；最近平均 {average}；电网支撑 {grid}。",
    homeStateGridExport: "正在回馈",
    homeStateGridImport: "正在取电",
    homeStateGridBalanced: "基本平衡",
    homeStateGridDetail: "{tariff}；取电压力 {pressure}；建议 {action}。",
    homeSourceKicker: "家里用电来源",
    homeSourceSolar: "太阳",
    homeSourceBattery: "电池",
    homeSourceGrid: "电网",
    homeSourceMostlySolar: "主要靠太阳",
    homeSourceMostlyBattery: "电池在支撑",
    homeSourceGridHelp: "电网在支撑",
    homeSourceMixed: "混合供电",
    homeSourceIdle: "等待负载",
    homeSourceDetail: "当前家庭负载 {load}；太阳 {solar}，电池 {battery}，电网 {grid}。",
    homeJudgementKicker: "系统自动判断",
    homeJudgementMeta: "根据实时流向、电池余量、电价和天气预报综合判断。",
    homeJudgeLoad: "可推迟负载",
    homeJudgePeak: "晚高峰准备",
    homeJudgeNight: "今晚电池",
    homeJudgeTomorrow: "明日安排",
    homeJudgeLoadRun: "可以开一个负载",
    homeJudgeLoadLight: "只开轻负载",
    homeJudgeLoadWait: "先等一等",
    homeJudgeLoadAvoid: "现在避免",
    homeJudgeLoadDetail: "可用余量 {headroom}；取电压力 {pressure}；电池余量 {reserve}。",
    homeJudgePeakReady: "准备好了",
    homeJudgePeakWatch: "需要留意",
    homeJudgePeakLow: "准备偏低",
    homeJudgePeakDetail: "评分 {score}；高峰 {window}；电网 {grid}。",
    homeJudgeNightSafe: "比较安心",
    homeJudgeNightWatch: "温和用电",
    homeJudgeNightSave: "保住电池",
    homeJudgeNightDetail: "续航 {runway}；余量 {reserve}；风险 {risk}。",
    homeJudgeTomorrowSolar: "安排到太阳窗口",
    homeJudgeTomorrowLight: "保持轻负载",
    homeJudgeTomorrowWait: "等待预报",
    homeJudgeTomorrowDetail: "发电天气 {outlook}；最佳窗口 {window}；建议 {action}。",
    homeActionQueueKicker: "建议行动",
    homeActionQueueMeta: "按影响排序，只显示现在最值得做的三件事。",
    homeActionRunLoad: "趁太阳开一个负载",
    homeActionRunLoadDetail: "可用富余 {headroom}；电池余量 {reserve}；取电压力 {pressure}。",
    homeActionLightLoad: "只安排轻负载",
    homeActionLightLoadDetail: "有一些太阳能可用，但富余只有 {headroom}；不要叠加多个电器。",
    homeActionReduceImport: "先降低取电",
    homeActionReduceImportDetail: "取电压力 {pressure}；{tariff}。现在避免叠加大功率电器。",
    homeActionProtectBattery: "保护电池余量",
    homeActionProtectBatteryDetail: "电池余量 {reserve}；续航 {runway}；风险 {risk}。",
    homeActionPeakPrep: "为晚高峰做准备",
    homeActionPeakPrepDetail: "准备评分 {score}；高峰窗口 {window}。尽量先完成可推迟负载。",
    homeActionPlanTomorrow: "围绕明天安排",
    homeActionPlanTomorrowDetail: "明天 {outlook}；最佳窗口 {window}；{action}。",
    homeActionWatchForecast: "刷新天气预报",
    homeActionWatchForecastDetail: "明天发电预报还没准备好；大负载先保持可调整。",
    homeActionSteady: "保持当前节奏",
    homeActionSteadyDetail: "电池、电网和家庭负载都可控。下一次刷新再判断。",
    operatingSummaryKicker: "运行摘要",
    operatingSummaryTitle: "今日一眼总览",
    operatingSummaryDetail: "自给率 {self}。{grid}。最近主要模式：{mode}。",
    operatingNetExport: "净回馈 {value}",
    operatingNetImport: "净取电 {value}",
    operatingSummaryReserve: "高于 20% 的余量",
    operatingSummaryAction: "下一步建议",
    commandBriefKicker: "智能指挥",
    commandBriefTitle: "下一步行动简报",
    commandBriefDetail: "{mode}。可信度 {confidence}；下一检查点：{checkpoint}。",
    commandBriefMode: "模式",
    commandBriefNow: "现在",
    commandBriefNext: "下一交接",
    commandBriefRisk: "需要注意",
    commandBriefSignals: "判断信号",
    commandBriefSignalConfidence: "可信度",
    commandBriefSignalPhase: "当前阶段",
    commandBriefSignalSurplus: "太阳富余",
    commandBriefSignalGrid: "电网压力",
    commandBriefPhaseDetail: "已过 {progress} · 剩余 {remaining}",
    commandBriefSurplusGood: "当前有可用太阳富余。",
    commandBriefSurplusWeak: "当前可用富余有限。",
    commandBriefGridPeak: "高峰窗口正在进行。",
    commandBriefGridOffPeak: "距高峰开始 {time}。",
    phasePlanKicker: "运行阶段",
    phasePlanTitle: "今日运行节奏",
    phasePlanDetail: "现在 {time}。当前处于“{phase}”；下一检查点：{next}。",
    phaseCurrent: "当前阶段",
    phaseMorning: "早晨蓄势",
    phaseSolar: "太阳窗口",
    phasePeak: "晚高峰防守",
    phaseNight: "夜间余量",
    phaseMorningDetail: "先让太阳能爬升，大功率可推迟负载先等等。",
    phaseSolarDetail: "如果出现富余电，尽量在高峰前使用掉。",
    phasePeakDetail: "高峰 {peakWindow} 期间，尽量避免不必要取电。",
    phaseNightDetail: "保护电池余量，留给夜间家庭基础负载。",
    phaseActionWaitForSun: "等太阳能爬升",
    phaseActionUseSurplus: "现在利用富余",
    phaseActionWatchSurplus: "观察太阳富余",
    phaseActionReduceImport: "减少电网取电",
    phaseActionProtectReserve: "保护电池余量",
    phaseActionNormal: "保持正常节奏",
    phaseNextSolar: "{time} 进入太阳窗口",
    phaseNextPeak: "{time} 进入高峰窗口",
    phaseNextNight: "{time} 后进入夜间余量",
    phaseNextMorning: "{time} 早晨蓄势",
    phasePlanProgress: "阶段进度",
    phasePlanProgressValue: "已过 {percent} · 剩余 {remaining}",
    phasePlanCheckpoint: "下一检查点",
    phasePlanCheckpointDetail: "{time} 切换到“{phase}”。",
    phasePlanBestAction: "最佳动作",
    phasePlanActionDetail: "根据实时富余、电池余量、电价和天气预报综合判断。",
    phasePlanHandoff: "交接提示",
    phaseHandoffStageLoads: "预备可推迟负载",
    phaseHandoffStageLoadsDetail: "等太阳富余明确后，再启动大功率负载。",
    phaseHandoffFinishLoads: "完成可推迟负载",
    phaseHandoffFinishLoadsDetail: "尽量在 {time} 高峰窗口前用掉太阳富余。",
    phaseHandoffHoldLoads: "暂缓大功率负载",
    phaseHandoffHoldLoadsDetail: "等更干净的太阳富余出现，再赶在 {time} 高峰前处理。",
    phaseHandoffHoldLine: "守住高峰线",
    phaseHandoffHoldLineDetail: "高峰防守到 {time} 前，尽量避免可推迟取电。",
    phaseHandoffProtectReserve: "保护夜间余量",
    phaseHandoffProtectReserveDetail: "保留电池余量给夜间家庭基础负载。",
    phaseHandoffResetMorning: "准备明早节奏",
    phaseHandoffResetMorningDetail: "在 {time} 早晨蓄势前，再看一次电池余量。",
    smartHubKicker: "智能能源驾驶舱",
    smartHubTitle: "今日能源判断",
    smartHubNow: "现在",
    smartHubLater: "今天晚些时候",
    smartHubWatch: "需要注意",
    smartHubStatusSolar: "优先用太阳能",
    smartHubStatusBattery: "保护电池余量",
    smartHubStatusPeak: "避开高峰取电",
    smartHubStatusBalanced: "运行平稳",
    smartHubConfidence: "可信度",
    smartHubConfidenceHigh: "高",
    smartHubConfidenceMedium: "中",
    smartHubConfidenceLow: "低",
    smartHubConfidenceDetail: "{level}：实时数据 {age}，{samples} 个样本，{warnings}，天气 {weather}。",
    smartHubWarningsNone: "无警告",
    smartHubWarningsCount: "{count} 个警告",
    smartHubWeatherReady: "可用",
    smartHubWeatherMissing: "缺失",
    smartHubBasisSolar: "太阳富余",
    smartHubBasisBattery: "电池余量",
    smartHubBasisGrid: "电网压力",
    smartHubBasisOutlook: "后续窗口",
    smartHubBasisSolarDetail: "当前回馈 {exportKw}；家庭负载 {homeKw}。",
    smartHubBasisBatteryDetail: "电池电量 {soc}；续航风险 {risk}。",
    smartHubBasisGridDetail: "电网流向 {grid}；电价 {tariff}。",
    smartHubBasisOutlookDetail: "高峰窗口 {window}；明天 {outlook}。",
    smartHubSummarySolar: "太阳能正在覆盖家庭用电，约有 {headroom} 可用富余功率。电池余量为 {reserve}，现在适合安排可推迟负载。",
    smartHubSummaryBattery: "电池余量只有 {reserve}。在太阳能改善或高峰时段过去前，建议减少非必要大功率负载。",
    smartHubSummaryPeak: "电网取电压力为 {pressure}，并接近或处于电价观察窗口。建议减少大功率负载，让电池优先覆盖必要用电。",
    smartHubSummaryBalanced: "系统运行平稳：自给率 {self}，电网压力 {pressure}，电池余量 {reserve}。暂时不需要特别操作。",
    smartHubNowUseSolar: "现在运行可推迟负载",
    smartHubNowSaveBattery: "先保留大功率负载",
    smartHubNowReduceImport: "减少电网取电",
    smartHubNowSteady: "保持当前节奏",
    smartHubNowUseSolarDetail: "可用富余功率约 {headroom}；洗碗机、洗衣机或其它可推迟负载适合放到这个窗口。",
    smartHubNowSaveBatteryDetail: "电池余量为 {reserve}；建议等余量改善后再运行非必要负载。",
    smartHubNowReduceImportDetail: "取电压力为 {pressure}；现在尽量不要叠加多个高功率电器。",
    smartHubNowSteadyDetail: "实时流向比较平衡。启动大负载前，继续观察太阳能和电网流向。",
    smartHubLaterPeak: "准备晚高峰",
    smartHubLaterSolar: "利用太阳窗口",
    smartHubLaterConserve: "为今晚保电",
    smartHubLaterNormal: "正常晚间安排",
    smartHubLaterPeakDetail: "高峰时段 {window} 还有 {time} 开始。尽量在开始前完成可推迟负载。",
    smartHubLaterSolarDetail: "明天太阳能预报为 {outlook}；大负载尽量靠近下一个太阳窗口。",
    smartHubLaterConserveDetail: "续航风险为 {risk}；建议保护电池，留给晚间和夜间用电。",
    smartHubLaterNormalDetail: "高峰压力不高，电池余量可用。按正常晚间节奏即可。",
    smartHubWatchData: "数据新鲜度",
    smartHubWatchBattery: "电池续航",
    smartHubWatchWeather: "明天天气",
    smartHubWatchGrid: "电网压力",
    smartHubWatchDataDetail: "当前有 {count} 个 dashboard 警告。可以查看每日表格下面的实时数据可信度。",
    smartHubWatchBatteryDetail: "余量 {reserve}，续航风险 {risk}。",
    smartHubWatchWeatherDetail: "明天太阳能预报为 {outlook}；如果预报变弱，就调整可推迟负载。",
    smartHubWatchGridDetail: "当前电网状态：{grid}；取电压力 {pressure}。",
    smartHubTagSolarSurplus: "太阳能富余",
    smartHubTagBatteryCharging: "电池充电中",
    smartHubTagBatteryDischarging: "电池支撑家庭",
    smartHubTagGridImport: "电网取电",
    smartHubTagGridExport: "回馈电网",
    smartHubTagPeakNow: "当前高峰电价",
    smartHubTagOffPeak: "非高峰",
    smartHubTagTomorrowGood: "明天太阳能可用",
    smartHubTagTomorrowWeak: "明天太阳能偏弱",
    smartFlowSplit: "实时功率分配",
    smartFlowSplitMeta: "当前形态：太阳能 {solar}，家庭 {home}，电池 {battery}，电网 {grid}。",
    smartFlowSolar: "太阳能输出",
    smartFlowSolarActive: "当前发电正在支撑主要判断。",
    smartFlowSolarIdle: "当前太阳能输出较低。",
    smartFlowHome: "家庭负载",
    smartFlowHomeDetail: "此刻家庭即时用电需求。",
    smartFlowBattery: "电池",
    smartFlowBatteryChargeDetail: "正在把电存起来留给后面。",
    smartFlowBatteryDischargeDetail: "电池正在覆盖一部分家庭负载。",
    smartFlowBatteryIdleDetail: "电池流向很小。",
    smartFlowGrid: "电网",
    smartFlowGridExportDetail: "富余功率正在离开家庭。",
    smartFlowGridImportDetail: "家庭正在依赖电网补充。",
    smartFlowGridIdleDetail: "电网流向很小。",
    smartWatchlist: "观察清单",
    smartWatchlistMeta: "现在最值得盯的信号",
    smartWatchBattery: "电池余量",
    smartWatchBatteryLow: "运行大功率可推迟负载前，先保护电池余量。",
    smartWatchBatteryHealthy: "可用余量足够，家庭用电节奏可以保持正常。",
    smartWatchSolar: "太阳富余",
    smartWatchSolarGood: "趁富余还在，适合安排可推迟负载。",
    smartWatchSolarWeak: "富余有限，建议等更强的太阳窗口。",
    smartWatchGrid: "电网压力",
    smartWatchGridHigh: "取电压力偏高，避免多个大功率电器叠加。",
    smartWatchGridLow: "电网压力较低，暂时不需要特别减少取电。",
    smartWatchData: "数据可信度",
    smartWatchDataLow: "当前建议可信度偏低，建议检查数据新鲜度和警告。",
    smartWatchDataHigh: "实时数据和采样看起来足够可靠，可用于当前建议。",
    smartWatchWeather: "明天预报",
    smartWatchWeatherWeak: "明天太阳能可能偏弱，可推迟负载尽量提前完成。",
    smartWatchWeatherGood: "明天太阳能预报可用，非紧急负载可以考虑延后。",
    smartDecisionLog: "判断轨迹",
    smartDecisionLogEmpty: "等待智能判断记录。",
    smartDecisionLogMeta: "仅保存在这个浏览器 · 最新 {time}",
    smartDecisionLogMetaEmpty: "仅保存在这个浏览器",
    smartDecisionLogNow: "当前建议",
    smartDecisionLogConfidence: "可信度 {value}",
    smartDecisionLogChangedTo: "切换为{status}",
    smartDecisionLogStarted: "已记录基准",
    smartDecisionMetricReserve: "余量",
    smartDecisionMetricPressure: "电网",
    smartDecisionMetricSurplus: "富余",
    smartDecisionLogSignals: "余量 {reserve} · 电网 {pressure} · 富余 {headroom}",
    smartDecisionTrendFirst: "已开始本地对比记录。下次刷新会说明主要变化来自哪里。",
    smartDecisionTrendChanged: "建议已切换：“{previous}” -> “{current}”。主要变化：{driver}。",
    smartDecisionTrendSteady: "判断保持稳定。上次刷新以来主要变化：{driver}。",
    smartDecisionDriverReserveUp: "电池余量上升 {value}",
    smartDecisionDriverReserveDown: "电池余量下降 {value}",
    smartDecisionDriverHeadroomUp: "太阳富余增加 {value}",
    smartDecisionDriverHeadroomDown: "太阳富余减少 {value}",
    smartDecisionDriverPressureUp: "电网压力上升 {value}",
    smartDecisionDriverPressureDown: "电网压力下降 {value}",
    smartDecisionDriverConfidenceUp: "可信度上升 {value}",
    smartDecisionDriverConfidenceDown: "可信度下降 {value}",
    smartDecisionDriverNoMajor: "主要信号变化不大",
    operatingSolarDay: "太阳能主导日",
    operatingBalancedDay: "运行均衡",
    operatingGridDay: "电网依赖偏高",
    operatingBatterySupport: "电池支撑日",
    operatingActionUseSurplus: "利用太阳能富余",
    operatingActionSaveBattery: "给电池留电",
    operatingActionReduceGrid: "减少电网取电",
    operatingActionNormal: "保持当前节奏",
    todayBillImpactKicker: "账单影响",
    todayBillImpactTitle: "今日账单影响",
    todayBillImpactDetail: "今天少买了 {avoided} 电网电，并回馈 {exported}。",
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
    warningWithCreatedAt: "{message}。产生时间：{createdAt}",
    warningDetailLabel: "警告说明",
    warningDetailNone: "这次响应没有警告。",
    warningDetailOne: "这次响应里的警告：{warning}。生成时间：{time}。",
    warningDetailMany: "这次响应共有 {count} 个警告，最新/首条是：{warning}。生成时间：{time}。",
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
    energyTimelineKicker: "能源时间线",
    energyTimelineTitle: "今日能源时间线",
    energyTimelineMeta: "基于最近 {points} 个采样点，合并为 {segments} 个运行时段。",
    timelineSolarLed: "太阳能主导时间",
    timelineBatteryLed: "电池主导时间",
    timelineGridLed: "电网取电时间",
    timelineDominantMode: "主要模式",
    timelineModeSolar: "太阳能主导",
    timelineModeBattery: "电池主导",
    timelineModeGrid: "电网取电",
    timelineModeMixed: "混合",
    timelineModeIdle: "低活动",
    timelineLegendSolar: "黄色：太阳能主导",
    timelineLegendBattery: "绿色：电池主导",
    timelineLegendGrid: "蓝色：电网取电",
    timelineLegendMixed: "紫色：混合",
    timelineLegendIdle: "灰色：低活动",
    timelineEmpty: "等待最近功率采样。",
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
    peakReadinessKicker: "晚高峰准备度",
    peakReadinessTitle: "晚高峰电池准备度",
    peakReadinessExcellent: "准备充足",
    peakReadinessGood: "基本准备好",
    peakReadinessWatch: "高峰需留意",
    peakReadinessLow: "储能偏低",
    peakReadinessDetail: "电池 {soc}，高峰时段 {window}，当前电网流向 {grid}。",
    peakReadinessScore: "{score}/100",
    batteryReserveKicker: "电池余量",
    batteryReserveTitle: "电池余量计划",
    batteryReserveDetail: "高于 20% 保留线的余量为 {reserve}。当前电池状态：{mode}。",
    batteryReserveAboveFloor: "高于 20% 的余量",
    batteryPowerNow: "当前电池功率",
    homeLoadCoveredNow: "当前家庭负载覆盖",
    reserveAction: "建议操作",
    reserveActionSave: "给晚高峰留电",
    reserveActionUseSurplus: "利用富余电或继续充电",
    reserveActionReduce: "减少可推迟负载",
    reserveActionSteady: "余量状态稳定",
    reserveActionUnavailable: "等待电池数据",
    flexibleLoadKicker: "可推迟负载",
    flexibleLoadTitle: "可推迟负载计划",
    flexibleLoadDetail: "当前可用余量 {headroom}。电池 {soc}。电网流向 {grid}。",
    usableSurplusNow: "当前可用富余功率",
    bestLoadWindow: "最佳窗口",
    avoidLoadNow: "现在避免",
    batteryGuard: "电池保护",
    loadPlanRunHeavy: "可以运行较大负载",
    loadPlanRunLight: "可以运行小负载",
    loadPlanChargeFirst: "先让电池充电",
    loadPlanWait: "先等待",
    loadPlanAvoidPeak: "避免增加负载",
    loadBestNow: "现在",
    loadBestAfterPeak: "高峰结束后",
    loadBestSolarOrOffPeak: "下一个太阳能或离峰窗口",
    loadBestOffPeak: "离峰时段可用",
    loadAvoidPeakImport: "高峰电价取电",
    loadAvoidLowBattery: "电池余量偏低",
    loadAvoidHighImport: "电网取电偏高",
    loadAvoidNone: "暂无明显风险",
    loadGuardStrong: "电池余量充足",
    loadGuardMedium: "保留一部分电量",
    loadGuardLow: "优先保护电池余量",
    loadExampleHeavy: "约可带一个大电器",
    loadExampleMedium: "约可带一个中等电器",
    loadExampleLight: "仅适合小型可推迟负载",
    loadExampleNone: "暂无富余太阳能空间",
    batteryRunwayKicker: "电池续航",
    batteryRunwayTitle: "电池覆盖预测",
    batteryRunwayDetail: "最近 SOC 趋势：{trend}。当前高于 20% 保留线的余量为 {reserve}。",
    estimatedRunway: "预计到 20% 的时间",
    recentBatteryDrain: "最近电池消耗",
    batteryReserveFloor: "保留线",
    overnightRisk: "夜间风险",
    runwayHealthy: "比较安心",
    runwayWatch: "今晚留意",
    runwayLow: "续航偏低",
    runwayCharging: "充电或稳定",
    runwayUnavailable: "等待趋势数据",
    runwayMoreThanDay: ">24小时",
    runwayTrendStable: "稳定",
    runwayTrendCharging: "正在充电",
    runwayTrendDraining: "每小时下降 {rate}",
    runwayRiskLow: "低",
    runwayRiskMedium: "中",
    runwayRiskHigh: "高",
    runwayMeta: "最近家庭负载 {load}；电池支撑 {coverage}。",
    gridForecastKicker: "电网预测",
    gridForecastTitle: "电网取电预测",
    gridForecastDetail: "最近取电 {importKw}。电池余量 {reserve}。当前电价：{tariff}。",
    gridImportPressure: "取电压力",
    recentGridImport: "最近电网取电",
    solarTrend: "太阳能趋势",
    gridForecastAction: "建议操作",
    gridForecastLow: "低",
    gridForecastWatch: "需留意",
    gridForecastHigh: "取电风险高",
    gridForecastExporting: "正在回馈",
    gridActionNormal: "正常使用",
    gridActionShiftLoads: "推迟可移动负载",
    gridActionReducePeak: "减少高峰负载",
    gridActionUseSolar: "利用太阳能富余",
    gridSolarRising: "上升",
    gridSolarFalling: "下降",
    gridSolarFlat: "平稳",
    gridForecastMeta: "家庭负载 {load}；实时电网流向 {grid}。",
    tomorrowPrepKicker: "明日准备",
    tomorrowPrepTitle: "明日太阳能准备度",
    tomorrowPrepDetail: "明日天气 {outlook}。预计降雨 {rain}；云量 {cloud}。",
    tomorrowPrepScore: "准备度评分",
    tomorrowSolarOutlook: "明日太阳能",
    tonightBatteryReserve: "今晚电池余量",
    tomorrowLoadWindow: "最佳用电窗口",
    tomorrowPrepAction: "建议操作",
    tomorrowPrepReady: "准备充足",
    tomorrowPrepGood: "状态良好",
    tomorrowPrepWatch: "今晚留意",
    tomorrowPrepLimited: "太阳能有限",
    tomorrowPrepWaiting: "等待天气预报",
    tomorrowPrepMeta: "电池 {soc}；最近家庭负载 {load}；电价 {tariff}。",
    tomorrowWindowSolar: "上午后段到下午",
    tomorrowWindowLightOnly: "只安排小型日间负载",
    tomorrowWindowOffPeak: "非高峰或天气改善后",
    tomorrowActionUseSolar: "把可推迟负载安排到有太阳时",
    tomorrowActionSaveBattery: "今晚尽量保留电池余量",
    tomorrowActionAvoidHeavy: "避免安排大功率日间负载",
    tomorrowActionWaitWeather: "刷新天气预报",
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
    actionBoardKicker: "优先行动",
    actionBoardTitle: "现在该做什么",
    actionBoardNow: "现在",
    actionBoardBattery: "电池",
    actionBoardPeak: "高峰时段",
    actionBoardTomorrow: "明天",
    actionBoardDetail: "优先事项：{priority}。电网 {grid}；电池 {battery}；明天 {tomorrow}。",
    actionBoardAllGood: "保持节奏",
    actionBoardUseSurplus: "现在利用富余电",
    actionBoardProtectBattery: "保护电池余量",
    actionBoardReduceImport: "减少电网取电",
    actionBoardPlanTomorrow: "安排明日用电",
    actionNowUseSolar: "运行可推迟负载",
    actionNowUseSolarDetail: "可用余量 {headroom}。最好在富余电回馈前使用。",
    actionNowReduceImport: "暂停大功率负载",
    actionNowReduceImportDetail: "取电压力 {pressure}。电网流向 {grid}。",
    actionNowWait: "正常使用",
    actionNowWaitDetail: "当前没有紧急需要转移的负载。",
    actionBatterySave: "保留电池余量",
    actionBatterySaveDetail: "高于 20% 的余量为 {reserve}。最近续航风险 {risk}。",
    actionBatteryUse: "电池余量可用",
    actionBatteryUseDetail: "电池余量 {reserve}；当前模式 {mode}。",
    actionPeakActive: "高峰正在进行",
    actionPeakActiveDetail: "在 {window} 尽量避免取电；电网流向 {grid}。",
    actionPeakPrepare: "准备高峰时段",
    actionPeakPrepareDetail: "距离高峰窗口 {window} 还有 {time}。",
    actionTomorrowSolar: "利用明日太阳能窗口",
    actionTomorrowSolarDetail: "明天 {outlook}；最佳窗口 {window}。",
    actionTomorrowConserve: "今晚保守用电",
    actionTomorrowConserveDetail: "明天 {outlook}；保留电池，避免大功率负载。",
    actionTomorrowWaiting: "等待天气预报",
    actionTomorrowWaitingDetail: "天气数据还没有准备好。",
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
    batteryLevelNow: "当前电池电量",
    batteryLevelNowHelp: "实时 SOC",
    intoBattery: "充入电池",
    outOfBattery: "电池放电",
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
    chart: "图表",
    dailyEnergyChart: "每日太阳能、电网与家庭用电",
    table: "表格",
    dailyEnergyData: "每日能源数据",
    date: "日期",
    energyIntoBattery: "充入电池的电量",
    energyOutBattery: "电池放出的电量",
    unavailable: "暂无数据",
    noLiveTimestamp: "没有实时更新时间",
    liveUpdated: "实时更新",
    responseGenerated: "响应生成",
    liveMetaFresh: "实时数据更新时间：{liveUpdated} • 当前响应生成时间：{responseGenerated}",
    liveMetaCache: "缓存数据，原始实时更新时间：{liveUpdated}，当前响应：{responseGenerated}，缓存数据年龄：{cacheAge}",
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
    solarProjectionKicker: "太阳能预测",
    solarProjectionTitle: "今日发电估算",
    solarProjectionNow: "目前已发",
    solarProjectionExpected: "今日预计",
    solarProjectionRemaining: "预计剩余",
    solarProjectionTonightBattery: "今晚电池",
    solarProjectionConfidence: "可信度",
    solarProjectionSummary: "预计今天收尾 {estimate}；后面大约还有 {remaining}；今晚电池约 {battery}。",
    solarProjectionMeta: "实时太阳能 {solar}；电池 {battery}；逆变器 {inverter}；今日天气 {weather}；云量 {cloud}；最近平均 {average}；来源 {source}。",
    solarProjectionSourceLocal: "本地模型",
    solarProjectionSourceDual: "Solcast + 本地校正",
    solarProjectionActualSeries: "已发电",
    solarProjectionEstimateSeries: "预测进度",
    solarProjectionTargetSeries: "预计总量",
    solarProjectionBatterySeries: "电池储量",
    solarProjectionConfidenceHigh: "高",
    solarProjectionConfidenceMedium: "中",
    solarProjectionConfidenceLow: "低",
    solarProjectionNoData: "正在等待足够的太阳能采样来估算今天。",
    solarDispatchTitle: "调度建议",
    solarDispatchCorrection: "Solcast 纠偏",
    solarDispatchSolcastRemaining: "Solcast 剩余",
    solarDispatchPredbat: "Predbat 准备",
    solarDispatchUseSurplus: "用掉太阳窗口",
    solarDispatchHoldBattery: "保留电池余量",
    solarDispatchChargeOffPeak: "准备低价补电",
    solarDispatchWatch: "观察预测偏差",
    solarDispatchSteady: "保持灵活",
    solarDispatchUseSurplusDetail: "校正后的太阳能较强。把可移动负载放到接下来的太阳窗口，高峰前完成。",
    solarDispatchHoldBatteryDetail: "今晚电池覆盖偏紧。大功率负载先轻一点，把电池留给高峰时段。",
    solarDispatchChargeOffPeakDetail: "太阳能偏低且电池余量低。Predbat 应考虑在低价时段少量补电。",
    solarDispatchWatchDetail: "实际发电正在偏离 Solcast。先保持可移动负载灵活，等下一轮刷新确认走势。",
    solarDispatchSteadyDetail: "太阳能、电池和电价压力比较平衡，暂时不需要急动作。",
    solarDispatchCorrectionDetail: "目前实际 {actual}，Solcast 到此刻应有 {expected}。",
    solarDispatchCorrectionUnavailable: "等待足够的白天重叠数据。",
    solarDispatchSolcastDetail: "原始 Solcast {raw}；纠偏后剩余 {corrected}。",
    solarDispatchSolcastUnavailable: "暂时没有 Solcast 剩余预测。",
    solarDispatchPredbatReady: "输入已就绪",
    solarDispatchPredbatWaiting: "等待数据",
    solarDispatchPredbatDetail: "给 Predbat 的输入：可信太阳能 {estimate}，保留目标 {reserve}，电价 {tariff}。",
    solarDispatchPredbatWaitingDetail: "需要 Solcast 和实时电池数据，才适合生成电池计划。",
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
    navOverview: "ภาพรวม",
    navActions: "คำแนะนำ",
    navBattery: "แบตเตอรี่",
    navDailyData: "ข้อมูลรายวัน",
    navSettings: "ตั้งค่า",
    deepAnalysisTitle: "วิเคราะห์เชิงลึก",
    deepAnalysisSummary: "เงินประหยัด แนวโน้ม ปฏิทิน และรูปแบบระยะยาว",
    moreAnalysisTitle: "วิเคราะห์เพิ่มเติม",
    moreAnalysisSummary: "รายละเอียดเงินประหยัด ผลต่อบิล ไฮไลต์ช่วงเวลา แบตเตอรี่ และการใช้โซลาร์",
    loading: "กำลังโหลดข้อมูลแดชบอร์ด...",
    loaded: "โหลดข้อมูลแดชบอร์ดสำเร็จ",
    loadedCached: "คำขอ API แบบสดล้มเหลว กำลังแสดงข้อมูลแคช",
    autoRefreshNext: "รีเฟรชอัตโนมัติครั้งถัดไป: {time}",
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
    modbusConnectError: "Modbus TCP ไม่สามารถเชื่อมต่อกับ {target} ภายใน {timeoutMs} ms",
    modbusConnectAdviceIp: "ตรวจสอบว่า DHCP IP ของอินเวอร์เตอร์เปลี่ยนหรือไม่ แล้วอัปเดต MODBUS_HOST ในไฟล์ .env บน Synology",
    modbusConnectAdvicePort: "ยืนยันว่าอินเวอร์เตอร์ออนไลน์บน LAN 2.4 GHz และ Synology เข้าถึงพอร์ต 502 ได้",
    modbusConnectAdviceRestart: "หลังจากเปลี่ยน MODBUS_HOST ให้รีสตาร์ต container foxcloud-dashboard",
    period: "ช่วงเวลา",
    periodTotals: "ยอดรวมพลังงาน",
    periodTotalsHelp: "เลือกช่วงเวลาเพื่อสรุปข้อมูลพลังงานรายวัน",
    tableRange: "ช่วงของตาราง",
    tableAverageLabel: "เฉลี่ย ({count} วัน)",
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
    kpiDailyBattery: "แบตวันนี้",
    kpiDailyExport: "ส่งออกวันนี้",
    kpiNetGrid: "กริดสุทธิ",
    kpiSelfSufficiency: "พึ่งพาตนเอง",
    kpiEstimatedSavings: "ประหยัดโดยประมาณ",
    batteryNetChargedShort: "ชาร์จสุทธิ",
    batteryNetDischargedShort: "คายสุทธิ",
    batteryNetBalancedShort: "สมดุล",
    batteryKpiDetail: "เข้า {charged} · ออก {discharged}",
    netGridExporting: "วันนี้ส่งออกสุทธิ",
    netGridImporting: "วันนี้นำเข้าสุทธิ",
    homeStateKicker: "มองครั้งเดียวเข้าใจ",
    homeStateTitle: "สถานะพลังงานในบ้าน",
    homeStateDetail: "โซลาร์ {solar}, โหลดบ้าน {home}, แบต {battery}, กริด {grid}. อัปเดต {updated}",
    homeStateBattery: "แบตเตอรี่",
    homeStateSolar: "ทางไฟโซลาร์",
    homeStateLoad: "โหลดบ้าน",
    homeStateGrid: "กริด",
    homeStateVerdictUseSun: "ใช้โซลาร์ตอนนี้",
    homeStateVerdictSaveBattery: "เก็บแบตไว้",
    homeStateVerdictAvoidGrid: "เลี่ยงใช้ไฟกริด",
    homeStateVerdictSteady: "บ้านคงที่",
    homeStateBatteryGood: "แบตสำรองดี",
    homeStateBatteryWatch: "ดูแบตสำรอง",
    homeStateBatteryLow: "แบตสำรองต่ำ",
    homeStateBatteryUnknown: "รอข้อมูลแบต",
    homeStateBatteryDetail: "SOC {soc}; สำรอง {reserve}; ระยะเวลา {runway}",
    homeStateSolarHome: "จ่ายให้บ้าน",
    homeStateSolarCharging: "ชาร์จแบต",
    homeStateSolarExport: "ส่งออกไฟเหลือ",
    homeStateSolarWeak: "โซลาร์อ่อน",
    homeStateSolarIdle: "โซลาร์ว่าง",
    homeStateSolarDetail: "ครอบคลุมโหลดสด {cover}. ส่งออก {export}; ชาร์จ {charge}",
    homeStateLoadLow: "โหลดเบา",
    homeStateLoadNormal: "โหลดปกติ",
    homeStateLoadHigh: "โหลดสูง",
    homeStateLoadDetail: "บ้าน {home}; เฉลี่ยล่าสุด {average}; พึ่งกริด {grid}",
    homeStateGridExport: "กำลังส่งออก",
    homeStateGridImport: "กำลังนำเข้า",
    homeStateGridBalanced: "สมดุล",
    homeStateGridDetail: "{tariff}; แรงกด {pressure}; คำแนะนำ {action}",
    homeSourceKicker: "แหล่งไฟของบ้าน",
    homeSourceSolar: "โซลาร์",
    homeSourceBattery: "แบตเตอรี่",
    homeSourceGrid: "กริด",
    homeSourceMostlySolar: "ใช้โซลาร์เป็นหลัก",
    homeSourceMostlyBattery: "แบตกำลังช่วย",
    homeSourceGridHelp: "กริดกำลังช่วย",
    homeSourceMixed: "ใช้ไฟผสม",
    homeSourceIdle: "รอโหลด",
    homeSourceDetail: "โหลดบ้านตอนนี้ {load}; โซลาร์ {solar}, แบต {battery}, กริด {grid}",
    homeJudgementKicker: "การตัดสินใจอัตโนมัติ",
    homeJudgementMeta: "ตัดสินจากไฟสด สำรองแบต ค่าไฟ และพยากรณ์",
    homeJudgeLoad: "โหลดที่ยืดหยุ่น",
    homeJudgePeak: "พร้อมช่วงพีค",
    homeJudgeNight: "แบตคืนนี้",
    homeJudgeTomorrow: "แผนพรุ่งนี้",
    homeJudgeLoadRun: "เปิดได้หนึ่งโหลด",
    homeJudgeLoadLight: "โหลดเบาเท่านั้น",
    homeJudgeLoadWait: "รอก่อน",
    homeJudgeLoadAvoid: "เลี่ยงตอนนี้",
    homeJudgeLoadDetail: "Headroom {headroom}; แรงกด {pressure}; แบต {reserve}",
    homeJudgePeakReady: "พร้อม",
    homeJudgePeakWatch: "เฝ้าดู",
    homeJudgePeakLow: "ต่ำ",
    homeJudgePeakDetail: "คะแนน {score}; พีค {window}; กริด {grid}",
    homeJudgeNightSafe: "สบายใจได้",
    homeJudgeNightWatch: "ใช้เบาๆ",
    homeJudgeNightSave: "เก็บแบตไว้",
    homeJudgeNightDetail: "ระยะเวลา {runway}; สำรอง {reserve}; ความเสี่ยง {risk}",
    homeJudgeTomorrowSolar: "ใช้ช่วงโซลาร์",
    homeJudgeTomorrowLight: "โหลดเบา",
    homeJudgeTomorrowWait: "รอพยากรณ์",
    homeJudgeTomorrowDetail: "แนวโน้ม {outlook}; ช่วงดีสุด {window}; คำแนะนำ {action}",
    homeActionQueueKicker: "ลำดับสิ่งที่ควรทำ",
    homeActionQueueMeta: "เรียงตามผลกระทบ แสดงเฉพาะสามอย่างที่ควรทำที่สุด",
    homeActionRunLoad: "เปิดโหลดยืดหยุ่นหนึ่งอย่าง",
    homeActionRunLoadDetail: "Headroom {headroom}; สำรองแบต {reserve}; แรงกดกริด {pressure}",
    homeActionLightLoad: "ใช้เฉพาะโหลดเบา",
    homeActionLightLoadDetail: "มีโซลาร์บางส่วน แต่ headroom แค่ {headroom}; อย่าเปิดหลายเครื่องพร้อมกัน",
    homeActionReduceImport: "ลดการนำเข้ากริดก่อน",
    homeActionReduceImportDetail: "แรงกดกริด {pressure}; {tariff}. เลี่ยงเครื่องใช้ไฟสูงพร้อมกัน",
    homeActionProtectBattery: "ปกป้องแบตสำรอง",
    homeActionProtectBatteryDetail: "สำรอง {reserve}; ระยะเวลา {runway}; ความเสี่ยง {risk}",
    homeActionPeakPrep: "เตรียมช่วงพีค",
    homeActionPeakPrepDetail: "ความพร้อม {score}; ช่วงพีค {window}. จบโหลดยืดหยุ่นก่อนตึงขึ้น",
    homeActionPlanTomorrow: "วางแผนตามพรุ่งนี้",
    homeActionPlanTomorrowDetail: "พรุ่งนี้ {outlook}; ช่วงดีสุด {window}; {action}",
    homeActionWatchForecast: "รีเฟรชพยากรณ์",
    homeActionWatchForecastDetail: "แนวโน้มพรุ่งนี้ยังไม่พร้อม ให้โหลดใหญ่ยังเลื่อนได้ก่อน",
    homeActionSteady: "คงจังหวะเดิม",
    homeActionSteadyDetail: "แบต กริด และโหลดบ้านยังควบคุมได้ รอตรวจใหม่รอบถัดไป",
    operatingSummaryKicker: "สรุปการทำงาน",
    operatingSummaryTitle: "ภาพรวมวันนี้",
    operatingSummaryDetail: "พึ่งตนเอง {self} {grid} โหมดหลักล่าสุด: {mode}",
    operatingNetExport: "ส่งออกสุทธิ {value}",
    operatingNetImport: "นำเข้าสุทธิ {value}",
    operatingSummaryReserve: "สำรองเหนือ 20%",
    operatingSummaryAction: "ขั้นต่อไป",
    commandBriefKicker: "คำสั่งอัจฉริยะ",
    commandBriefTitle: "สิ่งที่ควรทำถัดไป",
    commandBriefDetail: "{mode} ความมั่นใจ {confidence}; จุดตรวจถัดไป {checkpoint}",
    commandBriefMode: "โหมด",
    commandBriefNow: "ตอนนี้",
    commandBriefNext: "ส่งต่อถัดไป",
    commandBriefRisk: "เฝ้าดู",
    commandBriefSignals: "สัญญาณตัดสินใจ",
    commandBriefSignalConfidence: "ความมั่นใจ",
    commandBriefSignalPhase: "ช่วง",
    commandBriefSignalSurplus: "โซลาร์เหลือ",
    commandBriefSignalGrid: "แรงกดกริด",
    commandBriefPhaseDetail: "ผ่านแล้ว {progress} · เหลือ {remaining}",
    commandBriefSurplusGood: "มีไฟส่วนเกินใช้งานได้",
    commandBriefSurplusWeak: "ไฟส่วนเกินจำกัด",
    commandBriefGridPeak: "อยู่ในช่วงพีค",
    commandBriefGridOffPeak: "ช่วงพีคเริ่มใน {time}",
    phasePlanKicker: "ช่วงของวัน",
    phasePlanTitle: "จังหวะการทำงานวันนี้",
    phasePlanDetail: "ตอนนี้ {time}. ช่วง {phase} กำลังทำงาน; จุดตรวจถัดไป: {next}",
    phaseCurrent: "ช่วงปัจจุบัน",
    phaseMorning: "ช่วงเช้า",
    phaseSolar: "หน้าต่างโซลาร์",
    phasePeak: "กันช่วงพีค",
    phaseNight: "สำรองกลางคืน",
    phaseMorningDetail: "รอให้โซลาร์ขึ้นก่อน เลื่อนโหลดหนักไว้ก่อน",
    phaseSolarDetail: "ใช้ไฟส่วนเกินก่อนช่วงพีคถ้ามี headroom",
    phasePeakDetail: "เลี่ยงนำเข้าที่ไม่จำเป็นช่วง {peakWindow}",
    phaseNightDetail: "รักษาแบตสำรองไว้สำหรับโหลดบ้านข้ามคืน",
    phaseActionWaitForSun: "รอโซลาร์ขึ้น",
    phaseActionUseSurplus: "ใช้ไฟส่วนเกินตอนนี้",
    phaseActionWatchSurplus: "เฝ้าดูไฟส่วนเกิน",
    phaseActionReduceImport: "ลดนำเข้ากริด",
    phaseActionProtectReserve: "ป้องกันแบตสำรอง",
    phaseActionNormal: "จังหวะปกติ",
    phaseNextSolar: "หน้าต่างโซลาร์ {time}",
    phaseNextPeak: "ช่วงพีค {time}",
    phaseNextNight: "สำรองกลางคืนหลัง {time}",
    phaseNextMorning: "ช่วงเช้า {time}",
    phasePlanProgress: "ความคืบหน้าช่วงนี้",
    phasePlanProgressValue: "ผ่านแล้ว {percent} · เหลือ {remaining}",
    phasePlanCheckpoint: "จุดตรวจถัดไป",
    phasePlanCheckpointDetail: "เปลี่ยนเป็น {phase} เวลา {time}",
    phasePlanBestAction: "การทำงานที่เหมาะสุด",
    phasePlanActionDetail: "อิงจากส่วนเกิน แบต ค่าไฟ และพยากรณ์ล่าสุด",
    phasePlanHandoff: "สัญญาณส่งต่อ",
    phaseHandoffStageLoads: "เตรียมโหลด",
    phaseHandoffStageLoadsDetail: "รอให้มีไฟโซลาร์ส่วนเกินชัดเจนก่อนเปิดโหลดหนัก",
    phaseHandoffFinishLoads: "ใช้โหลดที่เลื่อนได้",
    phaseHandoffFinishLoadsDetail: "ใช้ไฟส่วนเกินก่อนช่วงพีคที่ {time}",
    phaseHandoffHoldLoads: "พักโหลดหนัก",
    phaseHandoffHoldLoadsDetail: "รอไฟส่วนเกินที่สะอาดกว่าก่อนช่วงพีคที่ {time}",
    phaseHandoffHoldLine: "คุมช่วงพีค",
    phaseHandoffHoldLineDetail: "เลี่ยงโหลดที่ทำให้นำเข้าจนช่วงพีคจบที่ {time}",
    phaseHandoffProtectReserve: "ป้องกันแบตสำรอง",
    phaseHandoffProtectReserveDetail: "เก็บแบตไว้สำหรับโหลดพื้นฐานข้ามคืน",
    phaseHandoffResetMorning: "เตรียมเช้าวันใหม่",
    phaseHandoffResetMorningDetail: "เช็กแบตก่อนช่วงเช้าที่ {time}",
    smartHubKicker: "ผู้ช่วยพลังงานอัจฉริยะ",
    smartHubTitle: "การตัดสินใจพลังงานวันนี้",
    smartHubNow: "ตอนนี้",
    smartHubLater: "ช่วงถัดไปวันนี้",
    smartHubWatch: "เฝ้าดู",
    smartHubStatusSolar: "ใช้โซลาร์",
    smartHubStatusBattery: "รักษาสำรองแบต",
    smartHubStatusPeak: "เลี่ยงนำเข้าช่วงพีค",
    smartHubStatusBalanced: "ระบบนิ่ง",
    smartHubConfidence: "ความมั่นใจ",
    smartHubConfidenceHigh: "สูง",
    smartHubConfidenceMedium: "กลาง",
    smartHubConfidenceLow: "ต่ำ",
    smartHubConfidenceDetail: "{level}: อายุข้อมูล {age}, {samples} ตัวอย่าง, {warnings}, อากาศ {weather}",
    smartHubWarningsNone: "ไม่มีคำเตือน",
    smartHubWarningsCount: "{count} คำเตือน",
    smartHubWeatherReady: "พร้อม",
    smartHubWeatherMissing: "ไม่มี",
    smartHubBasisSolar: "โซลาร์ส่วนเกิน",
    smartHubBasisBattery: "สำรองแบต",
    smartHubBasisGrid: "แรงกดดันกริด",
    smartHubBasisOutlook: "หน้าต่างถัดไป",
    smartHubBasisSolarDetail: "ส่งออกตอนนี้ {exportKw}; โหลดบ้าน {homeKw}",
    smartHubBasisBatteryDetail: "SOC {soc}; ความเสี่ยง {risk}",
    smartHubBasisGridDetail: "การไหลกริด {grid}; ค่าไฟ {tariff}",
    smartHubBasisOutlookDetail: "ช่วงพีค {window}; พรุ่งนี้ {outlook}",
    smartHubSummarySolar: "โซลาร์กำลังครอบคลุมบ้านและมีส่วนเกินประมาณ {headroom} สำรองแบตคือ {reserve} จึงเหมาะกับโหลดที่เลื่อนได้ตอนนี้",
    smartHubSummaryBattery: "สำรองแบตเหลือ {reserve} ควรลดโหลดหนักจนกว่าโซลาร์จะดีขึ้นหรือพ้นช่วงพีค",
    smartHubSummaryPeak: "แรงกดดันการนำเข้ากริดคือ {pressure} ในช่วงเฝ้าระวังค่าไฟ ควรลดโหลดใหญ่และให้แบตรองรับของจำเป็น",
    smartHubSummaryBalanced: "ระบบนิ่ง: พึ่งตนเอง {self}, แรงกดดันกริด {pressure}, สำรองแบต {reserve} ยังไม่ต้องปรับเร่งด่วน",
    smartHubNowUseSolar: "เปิดโหลดที่เลื่อนได้",
    smartHubNowSaveBattery: "พักโหลดหนักไว้ก่อน",
    smartHubNowReduceImport: "ลดนำเข้ากริด",
    smartHubNowSteady: "คงจังหวะเดิม",
    smartHubNowUseSolarDetail: "ไฟส่วนเกินประมาณ {headroom}; เหมาะกับเครื่องล้างจาน ซักผ้า หรือโหลดที่เลื่อนได้",
    smartHubNowSaveBatteryDetail: "สำรองแบตคือ {reserve}; รอให้สำรองดีขึ้นก่อนใช้โหลดที่ไม่จำเป็น",
    smartHubNowReduceImportDetail: "แรงกดดันนำเข้าคือ {pressure}; อย่าเปิดเครื่องใช้ไฟแรงหลายตัวพร้อมกัน",
    smartHubNowSteadyDetail: "การไหลพลังงานสมดุล รอดูโซลาร์และกริดก่อนเริ่มโหลดใหญ่",
    smartHubLaterPeak: "เตรียมช่วงพีค",
    smartHubLaterSolar: "ใช้หน้าต่างโซลาร์",
    smartHubLaterConserve: "เก็บไว้คืนนี้",
    smartHubLaterNormal: "แผนเย็นปกติ",
    smartHubLaterPeakDetail: "ช่วงพีค {window} จะเริ่มใน {time} พยายามจบโหลดที่เลื่อนได้ก่อนเริ่ม",
    smartHubLaterSolarDetail: "พยากรณ์โซลาร์พรุ่งนี้คือ {outlook}; วางโหลดหนักใกล้หน้าต่างโซลาร์ถัดไป",
    smartHubLaterConserveDetail: "ความเสี่ยงแบตคือ {risk}; รักษาแบตไว้สำหรับเย็นและกลางคืน",
    smartHubLaterNormalDetail: "แรงกดดันพีคต่ำและสำรองยังใช้ได้ ใช้แผนเย็นปกติ",
    smartHubWatchData: "ความสดของข้อมูล",
    smartHubWatchBattery: "ระยะใช้งานแบต",
    smartHubWatchWeather: "อากาศพรุ่งนี้",
    smartHubWatchGrid: "แรงกดดันกริด",
    smartHubWatchDataDetail: "มีคำเตือนแดชบอร์ด {count} รายการ ดูรายละเอียดในแผงคุณภาพข้อมูลใต้ตารางรายวัน",
    smartHubWatchBatteryDetail: "สำรอง {reserve}, ความเสี่ยง {risk}",
    smartHubWatchWeatherDetail: "พยากรณ์โซลาร์พรุ่งนี้คือ {outlook}; ปรับโหลดที่เลื่อนได้ถ้าพยากรณ์แย่ลง",
    smartHubWatchGridDetail: "สถานะกริดตอนนี้: {grid}; แรงกดดัน {pressure}",
    smartHubTagSolarSurplus: "โซลาร์เหลือ",
    smartHubTagBatteryCharging: "แบตชาร์จ",
    smartHubTagBatteryDischarging: "แบตช่วยบ้าน",
    smartHubTagGridImport: "นำเข้ากริด",
    smartHubTagGridExport: "ส่งออกกริด",
    smartHubTagPeakNow: "ค่าไฟพีคตอนนี้",
    smartHubTagOffPeak: "นอกพีค",
    smartHubTagTomorrowGood: "โซลาร์พรุ่งนี้ดี",
    smartHubTagTomorrowWeak: "โซลาร์พรุ่งนี้อ่อน",
    smartFlowSplit: "เส้นทางกำลังไฟ",
    smartFlowSplitMeta: "ภาพสด: โซลาร์ {solar}, บ้าน {home}, แบต {battery}, กริด {grid}",
    smartFlowSolar: "กำลังโซลาร์",
    smartFlowSolarActive: "การผลิตกำลังหนุนการตัดสินใจตอนนี้",
    smartFlowSolarIdle: "โซลาร์ค่อนข้างเงียบตอนนี้",
    smartFlowHome: "โหลดบ้าน",
    smartFlowHomeDetail: "ความต้องการไฟของบ้าน ณ ตอนนี้",
    smartFlowBattery: "แบตเตอรี่",
    smartFlowBatteryChargeDetail: "กำลังเก็บไฟไว้ใช้ภายหลัง",
    smartFlowBatteryDischargeDetail: "แบตกำลังช่วยรับโหลดบ้านบางส่วน",
    smartFlowBatteryIdleDetail: "การไหลของแบตต่ำมาก",
    smartFlowGrid: "กริด",
    smartFlowGridExportDetail: "ไฟส่วนเกินกำลังออกจากบ้าน",
    smartFlowGridImportDetail: "บ้านกำลังพึ่งไฟจากกริด",
    smartFlowGridIdleDetail: "การไหลกับกริดต่ำมาก",
    smartWatchlist: "รายการเฝ้าดู",
    smartWatchlistMeta: "สัญญาณสำคัญตอนนี้",
    smartWatchBattery: "สำรองแบต",
    smartWatchBatteryLow: "รักษาสำรองก่อนเปิดโหลดใหญ่ที่เลื่อนได้",
    smartWatchBatteryHealthy: "สำรองพอสำหรับจังหวะใช้งานปกติ",
    smartWatchSolar: "โซลาร์ส่วนเกิน",
    smartWatchSolarGood: "ใช้ช่วงนี้กับโหลดที่เลื่อนได้ขณะยังมีไฟส่วนเกิน",
    smartWatchSolarWeak: "ไฟส่วนเกินจำกัด รอหน้าต่างโซลาร์ที่แรงกว่า",
    smartWatchGrid: "แรงกดดันกริด",
    smartWatchGridHigh: "อย่าเปิดเครื่องใช้ไฟแรงหลายตัวพร้อมกัน",
    smartWatchGridLow: "แรงกดดันกริดต่ำ ยังไม่ต้องลดนำเข้าเร่งด่วน",
    smartWatchData: "ความมั่นใจข้อมูล",
    smartWatchDataLow: "คำแนะนำอาจน่าเชื่อน้อยลง ตรวจอายุข้อมูลและคำเตือน",
    smartWatchDataHigh: "ข้อมูลสดและตัวอย่างเพียงพอสำหรับคำแนะนำตอนนี้",
    smartWatchWeather: "พยากรณ์พรุ่งนี้",
    smartWatchWeatherWeak: "โซลาร์พรุ่งนี้อาจอ่อน ควรจบโหลดที่เลื่อนได้เร็วขึ้น",
    smartWatchWeatherGood: "พยากรณ์โซลาร์ดี โหลดไม่ด่วนอาจเลื่อนไปได้",
    smartDecisionLog: "เส้นทางการตัดสินใจ",
    smartDecisionLogEmpty: "กำลังรอการตัดสินใจอัจฉริยะ",
    smartDecisionLogMeta: "เก็บในเบราว์เซอร์นี้ · ล่าสุด {time}",
    smartDecisionLogMetaEmpty: "เก็บในเบราว์เซอร์นี้",
    smartDecisionLogNow: "คำแนะนำตอนนี้",
    smartDecisionLogConfidence: "มั่นใจ {value}",
    smartDecisionLogChangedTo: "เปลี่ยนเป็น {status}",
    smartDecisionLogStarted: "บันทึกฐานแล้ว",
    smartDecisionMetricReserve: "สำรอง",
    smartDecisionMetricPressure: "กริด",
    smartDecisionMetricSurplus: "ส่วนเกิน",
    smartDecisionLogSignals: "สำรอง {reserve} · กริด {pressure} · ส่วนเกิน {headroom}",
    smartDecisionTrendFirst: "เริ่มบันทึกเปรียบเทียบในเครื่องแล้ว รีเฟรชครั้งหน้าจะบอกว่าอะไรเปลี่ยน",
    smartDecisionTrendChanged: "คำแนะนำเปลี่ยน: {previous} -> {current} เหตุผลหลัก: {driver}",
    smartDecisionTrendSteady: "การตัดสินใจยังนิ่ง เหตุผลหลักตั้งแต่รีเฟรชก่อน: {driver}",
    smartDecisionDriverReserveUp: "สำรองแบตเพิ่ม {value}",
    smartDecisionDriverReserveDown: "สำรองแบตลด {value}",
    smartDecisionDriverHeadroomUp: "โซลาร์ส่วนเกินเพิ่ม {value}",
    smartDecisionDriverHeadroomDown: "โซลาร์ส่วนเกินลด {value}",
    smartDecisionDriverPressureUp: "แรงกดดันกริดเพิ่ม {value}",
    smartDecisionDriverPressureDown: "แรงกดดันกริดลด {value}",
    smartDecisionDriverConfidenceUp: "ความมั่นใจเพิ่ม {value}",
    smartDecisionDriverConfidenceDown: "ความมั่นใจลด {value}",
    smartDecisionDriverNoMajor: "สัญญาณหลักแทบไม่เปลี่ยน",
    operatingSolarDay: "วันที่โซลาร์นำ",
    operatingBalancedDay: "สมดุล",
    operatingGridDay: "พึ่งกริดมาก",
    operatingBatterySupport: "แบตช่วยรองรับ",
    operatingActionUseSurplus: "ใช้ไฟโซลาร์ส่วนเกิน",
    operatingActionSaveBattery: "เก็บแบตไว้",
    operatingActionReduceGrid: "ลดการใช้กริด",
    operatingActionNormal: "คงจังหวะเดิม",
    todayBillImpactKicker: "ผลต่อบิล",
    todayBillImpactTitle: "ผลต่อบิลวันนี้",
    todayBillImpactDetail: "หลีกเลี่ยงการนำเข้ากริด {avoided} และส่งออก {exported} วันนี้",
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
    warningWithCreatedAt: "{message}. สร้างเมื่อ: {createdAt}",
    warningDetailLabel: "รายละเอียดคำเตือน",
    warningDetailNone: "ไม่มีคำเตือนในคำตอบนี้",
    warningDetailOne: "คำเตือนในคำตอบนี้: {warning} สร้างเมื่อ {time}",
    warningDetailMany: "มี {count} คำเตือนในคำตอบนี้ ล่าสุด/รายการแรก: {warning} สร้างเมื่อ {time}",
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
    energyTimelineKicker: "ไทม์ไลน์พลังงาน",
    energyTimelineTitle: "ไทม์ไลน์พลังงานวันนี้",
    energyTimelineMeta: "{segments} ช่วงการทำงานจาก {points} จุดข้อมูลล่าสุด",
    timelineSolarLed: "ช่วงนำด้วยโซลาร์",
    timelineBatteryLed: "ช่วงนำด้วยแบต",
    timelineGridLed: "ช่วงนำเข้ากริด",
    timelineDominantMode: "โหมดหลัก",
    timelineModeSolar: "โซลาร์นำ",
    timelineModeBattery: "แบตนำ",
    timelineModeGrid: "นำเข้ากริด",
    timelineModeMixed: "ผสม",
    timelineModeIdle: "เงียบ",
    timelineLegendSolar: "เหลือง: โซลาร์นำ",
    timelineLegendBattery: "เขียว: แบตนำ",
    timelineLegendGrid: "น้ำเงิน: นำเข้ากริด",
    timelineLegendMixed: "ม่วง: ผสม",
    timelineLegendIdle: "เทา: เงียบ",
    timelineEmpty: "รอข้อมูลกำลังไฟล่าสุด",
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
    peakReadinessKicker: "ความพร้อมช่วงพีค",
    peakReadinessTitle: "ความพร้อมช่วงเย็นพีค",
    peakReadinessExcellent: "พร้อม",
    peakReadinessGood: "ค่อนข้างพร้อม",
    peakReadinessWatch: "ควรเฝ้าดูพีค",
    peakReadinessLow: "พลังงานสำรองต่ำ",
    peakReadinessDetail: "แบตเตอรี่ {soc}, ช่วงพีค {window}, การไหลกริดตอนนี้ {grid}",
    peakReadinessScore: "{score}/100",
    batteryReserveKicker: "สำรองแบตเตอรี่",
    batteryReserveTitle: "แผนสำรองแบตเตอรี่",
    batteryReserveDetail: "สำรองเหนือระดับ 20% คือ {reserve} โหมดแบตเตอรี่ตอนนี้คือ {mode}",
    batteryReserveAboveFloor: "สำรองเหนือ 20%",
    batteryPowerNow: "กำลังแบตเตอรี่ตอนนี้",
    homeLoadCoveredNow: "โหลดบ้านที่ครอบคลุมตอนนี้",
    reserveAction: "คำแนะนำ",
    reserveActionSave: "เก็บแบตไว้ช่วงพีค",
    reserveActionUseSurplus: "ใช้ไฟส่วนเกินหรือชาร์จต่อ",
    reserveActionReduce: "ลดโหลดที่เลื่อนได้",
    reserveActionSteady: "สำรองดูคงที่",
    reserveActionUnavailable: "รอข้อมูลแบตเตอรี่",
    flexibleLoadKicker: "โหลดที่เลื่อนได้",
    flexibleLoadTitle: "แผนโหลดที่เลื่อนได้",
    flexibleLoadDetail: "กำลังเหลือ {headroom} แบตเตอรี่ {soc} การไหลกริด {grid}",
    usableSurplusNow: "ไฟส่วนเกินใช้ได้ตอนนี้",
    bestLoadWindow: "ช่วงที่ดีที่สุด",
    avoidLoadNow: "ควรหลีกเลี่ยงตอนนี้",
    batteryGuard: "ป้องกันแบตเตอรี่",
    loadPlanRunHeavy: "เปิดโหลดใหญ่ได้",
    loadPlanRunLight: "เปิดโหลดเล็กได้",
    loadPlanChargeFirst: "ให้แบตชาร์จก่อน",
    loadPlanWait: "รอก่อน",
    loadPlanAvoidPeak: "เลี่ยงเพิ่มโหลด",
    loadBestNow: "ตอนนี้",
    loadBestAfterPeak: "หลังช่วงพีค",
    loadBestSolarOrOffPeak: "ช่วงโซลาร์หรือออฟพีคถัดไป",
    loadBestOffPeak: "ออฟพีคใช้ได้",
    loadAvoidPeakImport: "นำเข้ากริดช่วงพีค",
    loadAvoidLowBattery: "สำรองแบตต่ำ",
    loadAvoidHighImport: "นำเข้ากริดสูง",
    loadAvoidNone: "ไม่มีคำเตือนหลัก",
    loadGuardStrong: "สำรองแบตแข็งแรง",
    loadGuardMedium: "เก็บสำรองไว้บางส่วน",
    loadGuardLow: "ปกป้องสำรองแบต",
    loadExampleHeavy: "ประมาณเครื่องใช้ไฟฟ้าขนาดใหญ่หนึ่งเครื่อง",
    loadExampleMedium: "ประมาณเครื่องใช้ไฟฟ้าขนาดกลางหนึ่งเครื่อง",
    loadExampleLight: "เฉพาะโหลดเล็กที่เลื่อนได้",
    loadExampleNone: "ไม่มีไฟโซลาร์เหลือ",
    batteryRunwayKicker: "ระยะเวลาแบตเตอรี่",
    batteryRunwayTitle: "คาดการณ์แบตครอบคลุมโหลด",
    batteryRunwayDetail: "แนวโน้ม SOC ล่าสุด {trend} สำรองเหนือ 20% ตอนนี้ {reserve}",
    estimatedRunway: "เวลาประมาณถึง 20%",
    recentBatteryDrain: "การใช้แบตล่าสุด",
    batteryReserveFloor: "ระดับสำรอง",
    overnightRisk: "ความเสี่ยงกลางคืน",
    runwayHealthy: "สบายใจได้",
    runwayWatch: "เฝ้าดูคืนนี้",
    runwayLow: "เวลาเหลือน้อย",
    runwayCharging: "กำลังชาร์จหรือคงที่",
    runwayUnavailable: "รอข้อมูลแนวโน้ม",
    runwayMoreThanDay: ">24 ชม.",
    runwayTrendStable: "คงที่",
    runwayTrendCharging: "กำลังชาร์จ",
    runwayTrendDraining: "ลดลง {rate}/ชม.",
    runwayRiskLow: "ต่ำ",
    runwayRiskMedium: "ปานกลาง",
    runwayRiskHigh: "สูง",
    runwayMeta: "โหลดบ้านล่าสุด {load}; แบตช่วยรองรับ {coverage}",
    gridForecastKicker: "คาดการณ์กริด",
    gridForecastTitle: "คาดการณ์นำเข้ากริด",
    gridForecastDetail: "นำเข้าล่าสุด {importKw} สำรองแบต {reserve} ค่าไฟตอนนี้ {tariff}",
    gridImportPressure: "แรงกดดันนำเข้า",
    recentGridImport: "นำเข้ากริดล่าสุด",
    solarTrend: "แนวโน้มโซลาร์",
    gridForecastAction: "คำแนะนำ",
    gridForecastLow: "ต่ำ",
    gridForecastWatch: "เฝ้าดู",
    gridForecastHigh: "เสี่ยงนำเข้าสูง",
    gridForecastExporting: "กำลังส่งออก",
    gridActionNormal: "ใช้งานปกติ",
    gridActionShiftLoads: "เลื่อนโหลดที่ยืดหยุ่นได้",
    gridActionReducePeak: "ลดโหลดช่วงพีค",
    gridActionUseSolar: "ใช้ไฟโซลาร์ส่วนเกิน",
    gridSolarRising: "เพิ่มขึ้น",
    gridSolarFalling: "ลดลง",
    gridSolarFlat: "คงที่",
    gridForecastMeta: "โหลดบ้าน {load}; การไหลกริดสด {grid}",
    tomorrowPrepKicker: "เตรียมพรุ่งนี้",
    tomorrowPrepTitle: "ความพร้อมโซลาร์พรุ่งนี้",
    tomorrowPrepDetail: "แนวโน้มพรุ่งนี้ {outlook} ฝนคาดการณ์ {rain}; เมฆ {cloud}",
    tomorrowPrepScore: "คะแนนความพร้อม",
    tomorrowSolarOutlook: "โซลาร์พรุ่งนี้",
    tonightBatteryReserve: "สำรองแบตคืนนี้",
    tomorrowLoadWindow: "ช่วงโหลดที่ดีที่สุด",
    tomorrowPrepAction: "คำแนะนำ",
    tomorrowPrepReady: "พร้อม",
    tomorrowPrepGood: "พร้อมดี",
    tomorrowPrepWatch: "เฝ้าดูคืนนี้",
    tomorrowPrepLimited: "โซลาร์จำกัด",
    tomorrowPrepWaiting: "รอพยากรณ์",
    tomorrowPrepMeta: "แบต {soc}; โหลดบ้านล่าสุด {load}; ค่าไฟ {tariff}",
    tomorrowWindowSolar: "สายถึงบ่าย",
    tomorrowWindowLightOnly: "โหลดกลางวันขนาดเล็กเท่านั้น",
    tomorrowWindowOffPeak: "นอกพีคหรือหลังพยากรณ์ดีขึ้น",
    tomorrowActionUseSolar: "วางแผนโหลดที่เลื่อนได้ช่วงมีแดด",
    tomorrowActionSaveBattery: "เก็บสำรองแบตไว้คืนนี้",
    tomorrowActionAvoidHeavy: "หลีกเลี่ยงโหลดกลางวันหนัก",
    tomorrowActionWaitWeather: "รีเฟรชพยากรณ์อากาศ",
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
    actionBoardKicker: "ลำดับความสำคัญ",
    actionBoardTitle: "ควรทำอะไรตอนนี้",
    actionBoardNow: "ตอนนี้",
    actionBoardBattery: "แบตเตอรี่",
    actionBoardPeak: "ช่วงพีค",
    actionBoardTomorrow: "พรุ่งนี้",
    actionBoardDetail: "สำคัญที่สุด: {priority} กริด {grid}; แบต {battery}; พรุ่งนี้ {tomorrow}",
    actionBoardAllGood: "คงจังหวะเดิม",
    actionBoardUseSurplus: "ใช้ไฟส่วนเกินตอนนี้",
    actionBoardProtectBattery: "ปกป้องสำรองแบต",
    actionBoardReduceImport: "ลดการนำเข้ากริด",
    actionBoardPlanTomorrow: "วางแผนพรุ่งนี้",
    actionNowUseSolar: "เดินโหลดที่เลื่อนได้",
    actionNowUseSolarDetail: "กำลังเหลือ {headroom} ใช้ก่อนส่งออกจะคุ้มกว่า",
    actionNowReduceImport: "พักโหลดหนัก",
    actionNowReduceImportDetail: "แรงกดดันนำเข้า {pressure} การไหลกริด {grid}",
    actionNowWait: "ใช้งานปกติ",
    actionNowWaitDetail: "ตอนนี้ยังไม่จำเป็นต้องย้ายโหลดเร่งด่วน",
    actionBatterySave: "เก็บสำรองไว้",
    actionBatterySaveDetail: "สำรองเหนือ 20% คือ {reserve} ความเสี่ยงล่าสุด {risk}",
    actionBatteryUse: "สำรองแบตใช้ได้",
    actionBatteryUseDetail: "สำรองแบต {reserve}; โหมดตอนนี้ {mode}",
    actionPeakActive: "พีคกำลังทำงาน",
    actionPeakActiveDetail: "หลีกเลี่ยงนำเข้าในช่วง {window}; กริด {grid}",
    actionPeakPrepare: "เตรียมช่วงพีค",
    actionPeakPrepareDetail: "อีก {time} ถึงช่วงพีค {window}",
    actionTomorrowSolar: "ใช้ช่วงแดดพรุ่งนี้",
    actionTomorrowSolarDetail: "พรุ่งนี้ {outlook}; ช่วงที่ดีที่สุด {window}",
    actionTomorrowConserve: "ประหยัดคืนนี้",
    actionTomorrowConserveDetail: "พรุ่งนี้ {outlook}; เก็บสำรองและหลีกเลี่ยงโหลดหนัก",
    actionTomorrowWaiting: "รอพยากรณ์",
    actionTomorrowWaitingDetail: "ข้อมูลอากาศยังไม่พร้อม",
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
    batteryLevelNow: "ระดับแบตเตอรี่ตอนนี้",
    batteryLevelNowHelp: "SOC ปัจจุบัน",
    intoBattery: "เข้าแบตเตอรี่",
    outOfBattery: "ออกจากแบตเตอรี่",
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
    chart: "กราฟ",
    dailyEnergyChart: "โซลาร์ กริด และการใช้ไฟในบ้านรายวัน",
    table: "ตาราง",
    dailyEnergyData: "ข้อมูลพลังงานรายวัน",
    date: "วันที่",
    energyIntoBattery: "พลังงานที่เข้าแบตเตอรี่",
    energyOutBattery: "พลังงานที่ออกจากแบตเตอรี่",
    unavailable: "ไม่มีข้อมูล",
    noLiveTimestamp: "ไม่มีเวลาอัปเดตแบบสด",
    liveUpdated: "อัปเดตแบบสด",
    responseGenerated: "สร้างคำตอบเมื่อ",
    liveMetaFresh: "อัปเดตข้อมูลสด: {liveUpdated} • สร้างคำตอบปัจจุบัน: {responseGenerated}",
    liveMetaCache: "ข้อมูลแคช อัปเดตสดเดิม: {liveUpdated}, คำตอบปัจจุบัน: {responseGenerated}, อายุแคช: {cacheAge}",
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
    solarProjectionKicker: "คาดการณ์โซลาร์",
    solarProjectionTitle: "ประมาณการผลิตโซลาร์วันนี้",
    solarProjectionNow: "ผลิตแล้ว",
    solarProjectionExpected: "คาดทั้งวัน",
    solarProjectionRemaining: "คาดที่เหลือ",
    solarProjectionTonightBattery: "แบตคืนนี้",
    solarProjectionConfidence: "ความมั่นใจ",
    solarProjectionSummary: "คาดจบที่ {estimate}; อาจเหลืออีก {remaining}; แบตคืนนี้ราว {battery}",
    solarProjectionMeta: "โซลาร์สด {solar}; แบตเตอรี่ {battery}; อินเวอร์เตอร์ {inverter}; อากาศวันนี้ {weather}; เมฆ {cloud}; ค่าเฉลี่ยล่าสุด {average}; แหล่งที่มา {source}",
    solarProjectionSourceLocal: "โมเดลในเครื่อง",
    solarProjectionSourceDual: "Solcast + ปรับด้วยข้อมูลจริง",
    solarProjectionActualSeries: "ผลิตแล้ว",
    solarProjectionEstimateSeries: "เส้นคาดการณ์",
    solarProjectionTargetSeries: "ยอดคาดทั้งวัน",
    solarProjectionBatterySeries: "ระดับแบต",
    solarProjectionConfidenceHigh: "สูง",
    solarProjectionConfidenceMedium: "กลาง",
    solarProjectionConfidenceLow: "ต่ำ",
    solarProjectionNoData: "กำลังรอข้อมูลโซลาร์พอสำหรับคาดการณ์วันนี้",
    solarDispatchTitle: "แผนจัดการพลังงาน",
    solarDispatchCorrection: "ปรับ Solcast",
    solarDispatchSolcastRemaining: "Solcast ที่เหลือ",
    solarDispatchPredbat: "พร้อมสำหรับ Predbat",
    solarDispatchUseSurplus: "ใช้ช่วงโซลาร์เกิน",
    solarDispatchHoldBattery: "เก็บแบตไว้",
    solarDispatchChargeOffPeak: "เตรียมชาร์จนอกพีค",
    solarDispatchWatch: "ดูความคลาดเคลื่อน",
    solarDispatchSteady: "ยืดหยุ่นไว้",
    solarDispatchUseSurplusDetail: "โซลาร์หลังปรับยังแรง ย้ายโหลดที่ยืดหยุ่นไปช่วงแดดก่อนพีค",
    solarDispatchHoldBatteryDetail: "แบตคืนนี้ดูตึง ลดโหลดใหญ่และเก็บสำรองไว้ช่วงพีค",
    solarDispatchChargeOffPeakDetail: "โซลาร์ต่ำและแบตต่ำ Predbat ควรพิจารณาชาร์จเล็กน้อยช่วงนอกพีค",
    solarDispatchWatchDetail: "ผลผลิตจริงเริ่มต่างจาก Solcast ให้รอรอบรีเฟรชก่อนใช้โหลดใหญ่",
    solarDispatchSteadyDetail: "โซลาร์ แบต และค่าไฟสมดุล ยังไม่ต้องทำอะไรเร่งด่วน",
    solarDispatchCorrectionDetail: "ผลิตจริง {actual} เทียบ Solcast ควรได้ {expected}",
    solarDispatchCorrectionUnavailable: "รอข้อมูลช่วงกลางวันให้พอ",
    solarDispatchSolcastDetail: "Solcast ดิบ {raw}; เหลือหลังปรับ {corrected}",
    solarDispatchSolcastUnavailable: "ยังไม่มีค่า Solcast ที่เหลือ",
    solarDispatchPredbatReady: "ข้อมูลพร้อม",
    solarDispatchPredbatWaiting: "รอข้อมูล",
    solarDispatchPredbatDetail: "ส่งให้ Predbat: โซลาร์เชื่อถือ {estimate}, เป้าสำรอง {reserve}, ค่าไฟ {tariff}",
    solarDispatchPredbatWaitingDetail: "ต้องมี Solcast และข้อมูลแบตสดก่อนวางแผนแบตเตอรี่",
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

function getTimelineMode(point) {
  const solarKw = Number(point.solarKw ?? 0);
  const gridKw = Number(point.gridKw ?? 0);
  const batteryKw = Number(point.batteryKw ?? 0);
  const maxKw = Math.max(solarKw, gridKw, batteryKw);

  if (maxKw < 0.08) {
    return "idle";
  }

  if (gridKw >= 0.25 && gridKw >= solarKw * 0.75 && gridKw >= batteryKw * 0.75) {
    return "grid";
  }

  if (solarKw >= 0.25 && solarKw >= gridKw && solarKw >= batteryKw) {
    return "solar";
  }

  if (batteryKw >= 0.25 && batteryKw >= gridKw && batteryKw >= solarKw * 0.7) {
    return "battery";
  }

  return "mixed";
}

function getTimelineModeLabel(mode) {
  return t(`timelineMode${mode.charAt(0).toUpperCase()}${mode.slice(1)}`);
}

function buildEnergyTimelineSegments(payload) {
  const history = payload?.last24Hours ?? {};
  const labels = history.labels ?? [];
  const points = labels.map((label, index) => {
    const point = {
      label,
      solarKw: Number(history.solarGeneratedKw?.[index] ?? 0),
      gridKw: Number(history.gridImportKw?.[index] ?? 0),
      batteryKw: Number(history.batteryDischargeKw?.[index] ?? 0),
    };

    return {
      ...point,
      mode: getTimelineMode(point),
    };
  });

  const segments = [];

  for (const point of points) {
    const lastSegment = segments.at(-1);

    if (lastSegment?.mode === point.mode) {
      lastSegment.endLabel = point.label;
      lastSegment.points += 1;
    } else {
      segments.push({
        mode: point.mode,
        startLabel: point.label,
        endLabel: point.label,
        points: 1,
      });
    }
  }

  const projection = {
    pointCount: labels.length,
    segments,
  };

  return projection;
}

function formatTimelineShare(count, total) {
  if (!total) {
    return "--";
  }

  return formatPercent((count / total) * 100);
}

function renderEnergyTimeline(payload) {
  const timeline = buildEnergyTimelineSegments(payload);
  const totalPoints = timeline.segments.reduce((total, segment) => total + segment.points, 0);
  const modeCounts = timeline.segments.reduce((counts, segment) => {
    counts[segment.mode] = (counts[segment.mode] ?? 0) + segment.points;
    return counts;
  }, {});
  const dominantMode = Object.entries(modeCounts).sort((left, right) => right[1] - left[1])[0]?.[0] ?? "idle";

  textFields.energyTimelineTrack.replaceChildren();

  if (timeline.pointCount === 0) {
    const empty = document.createElement("p");
    empty.className = "muted-copy";
    empty.textContent = t("timelineEmpty");
    textFields.energyTimelineTrack.append(empty);
  } else {
    for (const segment of timeline.segments) {
      const segmentElement = document.createElement("span");
      segmentElement.className = `energy-timeline-segment timeline-${segment.mode}`;
      segmentElement.style.flexGrow = String(segment.points);
      segmentElement.title = `${getTimelineModeLabel(segment.mode)}: ${segment.startLabel} - ${segment.endLabel}`;
      segmentElement.setAttribute("aria-label", segmentElement.title);
      textFields.energyTimelineTrack.append(segmentElement);
    }
  }

  textFields.energyTimelineMeta.textContent = interpolate(t("energyTimelineMeta"), {
    points: timeline.pointCount,
    segments: timeline.segments.length,
  });
  textFields.energyTimelineSolar.textContent = formatTimelineShare(modeCounts.solar ?? 0, totalPoints);
  textFields.energyTimelineBattery.textContent = formatTimelineShare(modeCounts.battery ?? 0, totalPoints);
  textFields.energyTimelineGrid.textContent = formatTimelineShare(modeCounts.grid ?? 0, totalPoints);
  textFields.energyTimelineDominant.textContent = getTimelineModeLabel(dominantMode);
}

function getTimelineModeCounts(payload) {
  const timeline = buildEnergyTimelineSegments(payload);
  const totalPoints = timeline.segments.reduce((total, segment) => total + segment.points, 0);
  const modeCounts = timeline.segments.reduce((counts, segment) => {
    counts[segment.mode] = (counts[segment.mode] ?? 0) + segment.points;
    return counts;
  }, {});
  const dominantMode = Object.entries(modeCounts).sort((left, right) => right[1] - left[1])[0]?.[0] ?? "idle";

  return {
    totalPoints,
    modeCounts,
    dominantMode,
  };
}

function getOperatingSummary(payload) {
  const today = payload?.today ?? {};
  const live = payload?.live ?? {};
  const timeline = getTimelineModeCounts(payload);
  const selfSufficiency = calculateSelfSufficiency(today) ?? 0;
  const netGridKwh = Number(today.returnToGridKwh ?? 0) - Number(today.gridConsumptionKwh ?? 0);
  const solarShare = timeline.totalPoints ? ((timeline.modeCounts.solar ?? 0) / timeline.totalPoints) * 100 : 0;
  const gridShare = timeline.totalPoints ? ((timeline.modeCounts.grid ?? 0) / timeline.totalPoints) * 100 : 0;
  const batteryReserve = Number.isFinite(Number(live.batterySocPercent))
    ? Math.max(0, Number(live.batterySocPercent) - 20)
    : null;
  const gridForecast = getGridImportForecast(payload);
  const verdictKey = selfSufficiency >= 70 && netGridKwh >= 0
    ? "operatingSolarDay"
    : gridShare >= 45 || gridForecast.importPressure >= 65
      ? "operatingGridDay"
      : solarShare >= 45 && netGridKwh >= 0
      ? "operatingSolarDay"
      : timeline.dominantMode === "battery" || (batteryReserve !== null && batteryReserve < 30)
        ? "operatingBatterySupport"
        : "operatingBalancedDay";
  const actionKey = gridForecast.actionKey === "gridActionUseSolar"
    ? "operatingActionUseSurplus"
    : gridForecast.actionKey === "gridActionReducePeak" || gridForecast.actionKey === "gridActionShiftLoads"
      ? "operatingActionReduceGrid"
      : batteryReserve !== null && batteryReserve < 30
        ? "operatingActionSaveBattery"
        : "operatingActionNormal";

  return {
    verdictKey,
    actionKey,
    selfSufficiency,
    netGridKwh,
    batteryReserve,
    solarShare,
    gridShare,
    dominantMode: timeline.dominantMode,
  };
}

function renderOperatingSummary(payload) {
  if (!payload?.today || !payload?.live) {
    return;
  }

  const summary = getOperatingSummary(payload);
  const netGridText = interpolate(t(summary.netGridKwh >= 0 ? "operatingNetExport" : "operatingNetImport"), {
    value: formatKwh(Math.abs(summary.netGridKwh)),
  });

  textFields.operatingSummaryVerdict.textContent = t(summary.verdictKey);
  textFields.operatingSummaryDetail.textContent = interpolate(t("operatingSummaryDetail"), {
    self: formatOptionalPercent(summary.selfSufficiency),
    grid: netGridText,
    mode: getTimelineModeLabel(summary.dominantMode),
  });
  textFields.operatingSummarySolar.textContent = formatOptionalPercent(summary.solarShare);
  textFields.operatingSummaryGrid.textContent = formatOptionalPercent(summary.gridShare);
  textFields.operatingSummaryReserve.textContent = summary.batteryReserve === null
    ? "--"
    : formatPercent(summary.batteryReserve);
  textFields.operatingSummaryAction.textContent = t(summary.actionKey);
}

function getDecisionTone(statusKey) {
  if (statusKey === "smartHubStatusSolar") return "good";
  if (statusKey === "smartHubStatusBattery" || statusKey === "smartHubStatusPeak") return "alert";
  return "neutral";
}

function getNowTone(statusKey) {
  if (statusKey === "smartHubNowUseSolar") return "good";
  if (statusKey === "smartHubNowSteady") return "neutral";
  return "alert";
}

function getWatchTone(statusKey) {
  if (statusKey === "smartHubWatchGrid") return "neutral";
  if (statusKey === "smartHubWatchData" || statusKey === "smartHubWatchBattery") return "alert";
  return "watch";
}

function setCommandBriefCard(card, titleElement, detailElement, tone, title, detail) {
  card.dataset.tone = tone;
  titleElement.textContent = title;
  detailElement.textContent = detail;
}

function createCommandBriefSignal(signal) {
  const item = document.createElement("article");
  const label = document.createElement("span");
  const value = document.createElement("strong");
  const detail = document.createElement("small");

  item.dataset.tone = signal.tone;
  label.textContent = t(signal.labelKey);
  value.textContent = signal.value;
  detail.textContent = signal.detail;
  item.append(label, value, detail);

  return item;
}

function getCommandBrief(payload, weatherPayload = lastWeatherPayload) {
  const decision = getSmartHubDecision(payload, weatherPayload);
  const confidence = getSmartHubConfidence(payload, weatherPayload);
  const phasePlan = getPhasePlan(payload);
  const values = {
    self: formatOptionalPercent(decision.selfSufficiency),
    headroom: formatKw(decision.headroomKw),
    reserve: decision.reserve === null ? "--" : formatPercent(decision.reserve),
    soc: decision.batterySoc === null ? "--" : formatPercent(decision.batterySoc),
    pressure: formatPercent(decision.pressure),
    window: decision.tariff.peakWindow,
    time: formatDurationMinutes(decision.tariff.detailMinutes),
    risk: t(decision.runwayRiskKey),
    outlook: t(decision.tomorrowOutlookKey),
    grid: decision.gridFlow,
    exportKw: formatKw(decision.solarExportKw),
    homeKw: formatKw(decision.homeUsageKw),
    tariff: decision.tariff.isPeak ? t("peakNow") : t("offPeakNow"),
    count: String(decision.warningsCount),
    peakWindow: decision.tariff.peakWindow,
    tomorrowWindow: t(decision.tomorrowWindowKey),
    score: interpolate(t("peakReadinessScore"), { score: getPeakReadiness(payload).score }),
    flow: decision.gridFlow,
    checkpoint: `${t(phasePlan.nextPhase.labelKey)} ${phasePlan.checkpointTime}`,
    confidence: `${confidence.score}%`,
    mode: t(decision.statusKey),
  };
  const risk = {
    tone: getWatchTone(decision.watchStatusKey),
    title: t(decision.watchStatusKey),
    detail: interpolate(t(decision.watchDetailKey), values),
  };

  return {
    modeTone: getDecisionTone(decision.statusKey),
    mode: t(decision.statusKey),
    detail: interpolate(t("commandBriefDetail"), values),
    now: {
      tone: getNowTone(decision.nowStatusKey),
      title: t(decision.nowStatusKey),
      detail: interpolate(t(decision.nowDetailKey), values),
    },
    next: {
      tone: phasePlan.handoff.tone,
      title: t(phasePlan.handoff.key),
      detail: interpolate(t(phasePlan.handoff.detailKey), { time: phasePlan.handoff.time }),
    },
    risk,
    signals: [
      {
        labelKey: "commandBriefSignalConfidence",
        tone: confidence.tone,
        value: `${confidence.score}%`,
        detail: t(confidence.levelKey),
      },
      {
        labelKey: "commandBriefSignalPhase",
        tone: phasePlan.activePhase.tone,
        value: t(phasePlan.activePhase.labelKey),
        detail: interpolate(t("commandBriefPhaseDetail"), {
          progress: formatPercent(phasePlan.progressPercent),
          remaining: formatDurationMinutes(phasePlan.remainingMinutes),
        }),
      },
      {
        labelKey: "commandBriefSignalSurplus",
        tone: decision.headroomKw >= 0.8 ? "good" : decision.headroomKw >= 0.25 ? "watch" : "neutral",
        value: formatKw(decision.headroomKw),
        detail: t(decision.headroomKw >= 0.8 ? "commandBriefSurplusGood" : "commandBriefSurplusWeak"),
      },
      {
        labelKey: "commandBriefSignalGrid",
        tone: decision.pressure >= 65 ? "alert" : decision.pressure >= 35 ? "watch" : "good",
        value: formatPercent(decision.pressure),
        detail: interpolate(t(decision.tariff.isPeak ? "commandBriefGridPeak" : "commandBriefGridOffPeak"), {
          time: formatDurationMinutes(decision.tariff.detailMinutes),
        }),
      },
    ],
  };
}

function renderCommandBrief(payload, weatherPayload = lastWeatherPayload) {
  if (!payload?.live || !payload?.today || !textFields.commandBriefSignals) {
    return;
  }

  const brief = getCommandBrief(payload, weatherPayload);

  textFields.commandBriefMode.parentElement.dataset.tone = brief.modeTone;
  textFields.commandBriefMode.textContent = brief.mode;
  textFields.commandBriefDetail.textContent = brief.detail;
  setCommandBriefCard(
    textFields.commandBriefNowCard,
    textFields.commandBriefNow,
    textFields.commandBriefNowDetail,
    brief.now.tone,
    brief.now.title,
    brief.now.detail,
  );
  setCommandBriefCard(
    textFields.commandBriefNextCard,
    textFields.commandBriefNext,
    textFields.commandBriefNextDetail,
    brief.next.tone,
    brief.next.title,
    brief.next.detail,
  );
  setCommandBriefCard(
    textFields.commandBriefRiskCard,
    textFields.commandBriefRisk,
    textFields.commandBriefRiskDetail,
    brief.risk.tone,
    brief.risk.title,
    brief.risk.detail,
  );
  textFields.commandBriefSignals.replaceChildren(...brief.signals.map(createCommandBriefSignal));
}

function formatClockMinutes(minutes) {
  const normalized = ((Math.round(minutes) % (24 * 60)) + 24 * 60) % (24 * 60);
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function getPhaseTiming(activeKey, current, { morningStart, solarStart, peakStart, peakEnd }) {
  const windows = {
    morning: { start: morningStart, end: solarStart },
    solar: { start: solarStart, end: peakStart },
    peak: { start: peakStart, end: peakEnd + 1 },
    night: { start: peakEnd + 1, end: morningStart + (24 * 60) },
  };
  const window = windows[activeKey] ?? windows.night;
  const currentInWindow = activeKey === "night" && current < morningStart
    ? current + (24 * 60)
    : current;
  const duration = Math.max(1, window.end - window.start);
  const elapsed = Math.max(0, Math.min(duration, currentInWindow - window.start));
  const remaining = Math.max(0, window.end - currentInWindow);

  return {
    progressPercent: Math.max(0, Math.min(100, (elapsed / duration) * 100)),
    remainingMinutes: remaining,
    checkpointMinutes: window.end,
  };
}

function getPhasePlan(payload) {
  const tariff = getTariffStatus(payload?.todaySavings ?? {});
  const flexibleLoad = getFlexibleLoadPlan(payload);
  const batteryRunway = getBatteryRunwayPlan(payload);
  const gridForecast = getGridImportForecast(payload);
  const morningStart = 5 * 60;
  const solarStart = 9 * 60;
  const peakStart = tariff.startMinutes;
  const peakEnd = tariff.endMinutes;
  const current = tariff.currentMinutes;
  const reserve = batteryRunway.reservePercent;
  const hasSurplus = flexibleLoad.headroomKw >= 0.8 && gridForecast.importPressure < 45;
  const activeKey = tariff.isPeak
    ? "peak"
    : current >= solarStart && current < peakStart
      ? "solar"
      : current >= morningStart && current < solarStart
        ? "morning"
        : "night";
  const phaseActions = {
    morning: "phaseActionWaitForSun",
    solar: hasSurplus ? "phaseActionUseSurplus" : "phaseActionWatchSurplus",
    peak: gridForecast.importPressure >= 35 ? "phaseActionReduceImport" : "phaseActionProtectReserve",
    night: reserve !== null && reserve < 35 ? "phaseActionProtectReserve" : "phaseActionNormal",
  };
  const phaseTones = {
    morning: "watch",
    solar: hasSurplus ? "good" : "watch",
    peak: "alert",
    night: reserve !== null && reserve < 35 ? "watch" : "neutral",
  };
  const phases = [
    {
      key: "morning",
      labelKey: "phaseMorning",
      detailKey: "phaseMorningDetail",
      window: `${formatClockMinutes(morningStart)}-${formatClockMinutes(solarStart - 1)}`,
    },
    {
      key: "solar",
      labelKey: "phaseSolar",
      detailKey: "phaseSolarDetail",
      window: `${formatClockMinutes(solarStart)}-${formatClockMinutes(peakStart - 1)}`,
    },
    {
      key: "peak",
      labelKey: "phasePeak",
      detailKey: "phasePeakDetail",
      window: tariff.peakWindow,
    },
    {
      key: "night",
      labelKey: "phaseNight",
      detailKey: "phaseNightDetail",
      window: `${formatClockMinutes(peakEnd + 1)}-${formatClockMinutes(morningStart - 1)}`,
    },
  ];
  const activeIndex = phases.findIndex((phase) => phase.key === activeKey);
  const isPreDawn = activeKey === "night" && current < morningStart;
  const next = activeKey === "morning"
    ? { key: "phaseNextSolar", time: formatClockMinutes(solarStart) }
    : activeKey === "solar"
      ? { key: "phaseNextPeak", time: formatClockMinutes(peakStart) }
      : activeKey === "peak"
        ? { key: "phaseNextNight", time: formatClockMinutes(peakEnd + 1) }
        : { key: "phaseNextMorning", time: formatClockMinutes(morningStart) };
  const nextPhaseKey = {
    morning: "solar",
    solar: "peak",
    peak: "night",
    night: "morning",
  }[activeKey];
  const handoff = activeKey === "morning"
    ? {
      key: "phaseHandoffStageLoads",
      detailKey: "phaseHandoffStageLoadsDetail",
      time: formatClockMinutes(solarStart),
      tone: "watch",
    }
    : activeKey === "solar"
      ? {
        key: hasSurplus ? "phaseHandoffFinishLoads" : "phaseHandoffHoldLoads",
        detailKey: hasSurplus ? "phaseHandoffFinishLoadsDetail" : "phaseHandoffHoldLoadsDetail",
        time: formatClockMinutes(peakStart),
        tone: hasSurplus ? "good" : "watch",
      }
      : activeKey === "peak"
        ? {
          key: "phaseHandoffHoldLine",
          detailKey: "phaseHandoffHoldLineDetail",
          time: formatClockMinutes(peakEnd + 1),
          tone: "alert",
        }
        : {
          key: reserve !== null && reserve < 35 ? "phaseHandoffProtectReserve" : "phaseHandoffResetMorning",
          detailKey: reserve !== null && reserve < 35 ? "phaseHandoffProtectReserveDetail" : "phaseHandoffResetMorningDetail",
          time: formatClockMinutes(morningStart),
          tone: reserve !== null && reserve < 35 ? "watch" : "neutral",
        };
  const timing = getPhaseTiming(activeKey, current, {
    morningStart,
    solarStart,
    peakStart,
    peakEnd,
  });
  const plannedPhases = phases.map((phase, index) => ({
    ...phase,
    actionKey: phaseActions[phase.key],
    tone: phaseTones[phase.key],
    state: phase.key === activeKey ? "active" : !isPreDawn && index < activeIndex ? "past" : "upcoming",
  }));

  return {
    activeKey,
    activePhase: plannedPhases[activeIndex],
    nextPhase: plannedPhases.find((phase) => phase.key === nextPhaseKey) ?? plannedPhases[0],
    next,
    currentTime: formatClockMinutes(current),
    checkpointTime: formatClockMinutes(timing.checkpointMinutes),
    progressPercent: timing.progressPercent,
    remainingMinutes: timing.remainingMinutes,
    handoff,
    phases: plannedPhases,
    values: {
      peakWindow: tariff.peakWindow,
    },
  };
}

function renderPhasePlan(payload) {
  if (!payload?.live || !textFields.phasePlanGrid) {
    return;
  }

  const plan = getPhasePlan(payload);
  const values = {
    ...plan.values,
    time: plan.currentTime,
    phase: t(plan.activePhase.labelKey),
    next: interpolate(t(plan.next.key), { time: plan.next.time }),
  };

  textFields.phasePlanStatus.dataset.tone = plan.phases.find((phase) => phase.key === plan.activeKey)?.tone ?? "neutral";
  textFields.phasePlanStatus.textContent = t(plan.activePhase.labelKey);
  textFields.phasePlanDetail.textContent = interpolate(t("phasePlanDetail"), values);
  if (textFields.phasePlanProgressLabel && textFields.phasePlanProgressBar) {
    textFields.phasePlanProgressLabel.textContent = interpolate(t("phasePlanProgressValue"), {
      percent: formatPercent(plan.progressPercent),
      remaining: formatDurationMinutes(plan.remainingMinutes),
    });
    textFields.phasePlanProgressBar.style.width = `${plan.progressPercent.toFixed(1)}%`;
  }
  if (textFields.phasePlanCheckpoint) {
    textFields.phasePlanCheckpointCard.dataset.tone = plan.nextPhase.tone;
    textFields.phasePlanCheckpoint.textContent = t(plan.nextPhase.labelKey);
    textFields.phasePlanCheckpointDetail.textContent = interpolate(t("phasePlanCheckpointDetail"), {
      phase: t(plan.nextPhase.labelKey),
      time: plan.checkpointTime,
    });
  }
  if (textFields.phasePlanAction) {
    textFields.phasePlanActionCard.dataset.tone = plan.activePhase.tone;
    textFields.phasePlanAction.textContent = t(plan.activePhase.actionKey);
    textFields.phasePlanActionDetail.textContent = t("phasePlanActionDetail");
  }
  if (textFields.phasePlanHandoff) {
    textFields.phasePlanHandoffCard.dataset.tone = plan.handoff.tone;
    textFields.phasePlanHandoff.textContent = t(plan.handoff.key);
    textFields.phasePlanHandoffDetail.textContent = interpolate(t(plan.handoff.detailKey), {
      time: plan.handoff.time,
    });
  }
  textFields.phasePlanGrid.replaceChildren(...plan.phases.map((phase) => {
    const card = document.createElement("article");
    const label = document.createElement("span");
    const action = document.createElement("strong");
    const window = document.createElement("em");
    const detail = document.createElement("small");

    card.dataset.state = phase.state;
    card.dataset.tone = phase.tone;
    label.textContent = t(phase.labelKey);
    action.textContent = t(phase.actionKey);
    window.textContent = phase.window;
    detail.textContent = interpolate(t(phase.detailKey), plan.values);
    card.append(label, action, window, detail);

    return card;
  }));
}

function getSmartHubDecision(payload, weatherPayload = lastWeatherPayload) {
  const live = payload?.live ?? {};
  const today = payload?.today ?? {};
  const flexibleLoad = getFlexibleLoadPlan(payload);
  const batteryRunway = getBatteryRunwayPlan(payload);
  const gridForecast = getGridImportForecast(payload);
  const tomorrowPrep = getTomorrowPrepPlan(payload, weatherPayload);
  const tariff = gridForecast.tariff;
  const selfSufficiency = calculateSelfSufficiency(today) ?? 0;
  const reserve = batteryRunway.reservePercent;
  const pressure = gridForecast.importPressure;
  const warnings = payload?.warnings ?? [];
  const gridImportKw = Number(live.gridImportKw ?? 0);
  const gridExportKw = Number(live.gridExportKw ?? 0);
  const batteryChargeKw = Number(live.batteryChargeKw ?? 0);
  const batteryDischargeKw = Number(live.batteryDischargeKw ?? 0);
  const hasSolarSurplus = flexibleLoad.headroomKw >= 0.8 && gridForecast.importPressure < 45;
  const shouldProtectBattery = batteryRunway.riskKey === "runwayRiskHigh"
    || (reserve !== null && reserve < 25);
  const shouldReducePeak = tariff.isPeak && pressure >= 35;
  const statusKey = hasSolarSurplus
    ? "smartHubStatusSolar"
    : shouldProtectBattery
      ? "smartHubStatusBattery"
      : shouldReducePeak || pressure >= 65
        ? "smartHubStatusPeak"
        : "smartHubStatusBalanced";
  const summaryKey = hasSolarSurplus
    ? "smartHubSummarySolar"
    : shouldProtectBattery
      ? "smartHubSummaryBattery"
      : shouldReducePeak || pressure >= 65
        ? "smartHubSummaryPeak"
        : "smartHubSummaryBalanced";
  const nowStatusKey = hasSolarSurplus
    ? "smartHubNowUseSolar"
    : shouldProtectBattery
      ? "smartHubNowSaveBattery"
      : pressure >= 55
        ? "smartHubNowReduceImport"
        : "smartHubNowSteady";
  const nowDetailKey = hasSolarSurplus
    ? "smartHubNowUseSolarDetail"
    : shouldProtectBattery
      ? "smartHubNowSaveBatteryDetail"
      : pressure >= 55
        ? "smartHubNowReduceImportDetail"
        : "smartHubNowSteadyDetail";
  const laterStatusKey = tariff.isPeak || tariff.detailMinutes <= 180
    ? "smartHubLaterPeak"
    : tomorrowPrep.statusKey === "tomorrowPrepReady" || tomorrowPrep.statusKey === "tomorrowPrepGood"
      ? "smartHubLaterSolar"
      : shouldProtectBattery
        ? "smartHubLaterConserve"
        : "smartHubLaterNormal";
  const laterDetailKey = laterStatusKey === "smartHubLaterPeak"
    ? "smartHubLaterPeakDetail"
    : laterStatusKey === "smartHubLaterSolar"
      ? "smartHubLaterSolarDetail"
      : laterStatusKey === "smartHubLaterConserve"
        ? "smartHubLaterConserveDetail"
        : "smartHubLaterNormalDetail";
  const watchStatusKey = warnings.length > 0
    ? "smartHubWatchData"
    : shouldProtectBattery
      ? "smartHubWatchBattery"
      : tomorrowPrep.statusKey === "tomorrowPrepLimited" || tomorrowPrep.outlookKey === "poor"
        ? "smartHubWatchWeather"
        : "smartHubWatchGrid";
  const watchDetailKey = watchStatusKey === "smartHubWatchData"
    ? "smartHubWatchDataDetail"
    : watchStatusKey === "smartHubWatchBattery"
      ? "smartHubWatchBatteryDetail"
      : watchStatusKey === "smartHubWatchWeather"
        ? "smartHubWatchWeatherDetail"
        : "smartHubWatchGridDetail";
  const tags = [
    hasSolarSurplus ? ["smartHubTagSolarSurplus", "good"] : null,
    batteryChargeKw > batteryDischargeKw + 0.05 ? ["smartHubTagBatteryCharging", "good"] : null,
    batteryDischargeKw > batteryChargeKw + 0.05 ? ["smartHubTagBatteryDischarging", "watch"] : null,
    gridImportKw > gridExportKw + 0.05 ? ["smartHubTagGridImport", pressure >= 55 ? "alert" : "watch"] : null,
    gridExportKw > gridImportKw + 0.05 ? ["smartHubTagGridExport", "good"] : null,
    tariff.isPeak ? ["smartHubTagPeakNow", "alert"] : ["smartHubTagOffPeak", "neutral"],
    tomorrowPrep.statusKey === "tomorrowPrepReady" || tomorrowPrep.statusKey === "tomorrowPrepGood"
      ? ["smartHubTagTomorrowGood", "good"]
      : ["smartHubTagTomorrowWeak", "watch"],
  ].filter(Boolean);

  return {
    statusKey,
    summaryKey,
    selfSufficiency,
    headroomKw: flexibleLoad.headroomKw,
    reserve,
    pressure,
    tariff,
    gridFlow: gridForecast.gridFlow,
    solarExportKw: gridExportKw,
    homeUsageKw: Number(live.homeUsageKw ?? 0),
    batterySoc: Number.isFinite(Number(live.batterySocPercent)) ? Number(live.batterySocPercent) : null,
    runwayRiskKey: batteryRunway.riskKey,
    tomorrowOutlookKey: tomorrowPrep.outlookKey,
    tomorrowWindowKey: tomorrowPrep.windowKey,
    nowStatusKey,
    nowDetailKey,
    laterStatusKey,
    laterDetailKey,
    watchStatusKey,
    watchDetailKey,
    warningsCount: warnings.length,
    tags,
  };
}

function setSmartHubCard(card, statusElement, detailElement, tone, statusKey, detail) {
  card.dataset.tone = tone;
  statusElement.textContent = t(statusKey);
  detailElement.textContent = detail;
}

function setSmartHubBasis(card, valueElement, detailElement, tone, value, detail) {
  card.dataset.tone = tone;
  valueElement.textContent = value;
  detailElement.textContent = detail;
}

function getLiveKw(value) {
  const numericValue = Number(value ?? 0);

  return Number.isFinite(numericValue) ? Math.max(0, numericValue) : 0;
}

function getSmartFlowSplit(payload) {
  const live = payload?.live ?? {};
  const solarKw = getLiveKw(live.solarGeneratedKw);
  const homeKw = getLiveKw(live.homeUsageKw);
  const batteryChargeKw = getLiveKw(live.batteryChargeKw);
  const batteryDischargeKw = getLiveKw(live.batteryDischargeKw);
  const gridImportKw = getLiveKw(live.gridImportKw);
  const gridExportKw = getLiveKw(live.gridExportKw);
  const batteryIsCharging = batteryChargeKw > batteryDischargeKw + 0.05;
  const batteryIsDischarging = batteryDischargeKw > batteryChargeKw + 0.05;
  const gridIsExporting = gridExportKw > gridImportKw + 0.05;
  const gridIsImporting = gridImportKw > gridExportKw + 0.05;
  const batteryValueKw = batteryIsCharging ? batteryChargeKw : batteryIsDischarging ? batteryDischargeKw : 0;
  const gridValueKw = gridIsExporting ? gridExportKw : gridIsImporting ? gridImportKw : 0;
  const maxKw = Math.max(solarKw, homeKw, batteryValueKw, gridValueKw, 0.1);
  const batteryStatus = batteryIsCharging
    ? `${t("charging")} ${formatKw(batteryValueKw)}`
    : batteryIsDischarging
      ? `${t("discharging")} ${formatKw(batteryValueKw)}`
      : t("idle");
  const gridStatus = gridIsExporting
    ? `${t("exporting")} ${formatKw(gridValueKw)}`
    : gridIsImporting
      ? `${t("importing")} ${formatKw(gridValueKw)}`
      : t("idle");

  return {
    solarKw,
    homeKw,
    batteryStatus,
    gridStatus,
    items: [
      {
        labelKey: "smartFlowSolar",
        value: formatKw(solarKw),
        detailKey: solarKw > 0.1 ? "smartFlowSolarActive" : "smartFlowSolarIdle",
        tone: solarKw >= homeKw && solarKw > 0.1 ? "good" : solarKw > 0.1 ? "watch" : "neutral",
        percent: (solarKw / maxKw) * 100,
      },
      {
        labelKey: "smartFlowHome",
        value: formatKw(homeKw),
        detailKey: "smartFlowHomeDetail",
        tone: homeKw <= solarKw && solarKw > 0.1 ? "good" : "neutral",
        percent: (homeKw / maxKw) * 100,
      },
      {
        labelKey: "smartFlowBattery",
        value: batteryStatus,
        detailKey: batteryIsCharging
          ? "smartFlowBatteryChargeDetail"
          : batteryIsDischarging
            ? "smartFlowBatteryDischargeDetail"
            : "smartFlowBatteryIdleDetail",
        tone: batteryIsCharging ? "good" : batteryIsDischarging ? "watch" : "neutral",
        percent: (batteryValueKw / maxKw) * 100,
      },
      {
        labelKey: "smartFlowGrid",
        value: gridStatus,
        detailKey: gridIsExporting
          ? "smartFlowGridExportDetail"
          : gridIsImporting
            ? "smartFlowGridImportDetail"
            : "smartFlowGridIdleDetail",
        tone: gridIsExporting ? "good" : gridIsImporting ? "alert" : "neutral",
        percent: (gridValueKw / maxKw) * 100,
      },
    ],
  };
}

function renderSmartFlowSplit(payload) {
  if (!textFields.smartFlowSplitGrid) {
    return;
  }

  const split = getSmartFlowSplit(payload);
  textFields.smartFlowSplitMeta.textContent = interpolate(t("smartFlowSplitMeta"), {
    solar: formatKw(split.solarKw),
    home: formatKw(split.homeKw),
    battery: split.batteryStatus,
    grid: split.gridStatus,
  });
  textFields.smartFlowSplitGrid.replaceChildren(...split.items.map((item) => {
    const card = document.createElement("article");
    const top = document.createElement("div");
    const label = document.createElement("span");
    const value = document.createElement("strong");
    const bar = document.createElement("div");
    const fill = document.createElement("i");
    const detail = document.createElement("small");

    card.dataset.tone = item.tone;
    label.textContent = t(item.labelKey);
    value.textContent = item.value;
    fill.style.width = `${Math.max(3, Math.min(100, item.percent)).toFixed(1)}%`;
    detail.textContent = t(item.detailKey);
    top.append(label, value);
    bar.append(fill);
    card.append(top, bar, detail);

    return card;
  }));
}

function getSmartHubConfidence(payload, weatherPayload = lastWeatherPayload) {
  const liveAgeMinutes = getTimestampAgeMinutes(payload?.live?.updatedAt);
  const warningCount = payload?.warnings?.length ?? 0;
  const sampleCount = payload?.last24Hours?.labels?.length ?? 0;
  const hasWeather = Boolean(weatherPayload?.enabled && weatherPayload?.current);
  const livePenalty = liveAgeMinutes === null
    ? 28
    : liveAgeMinutes > 15
      ? 26
      : liveAgeMinutes > 5
        ? 14
        : 0;
  const warningPenalty = Math.min(30, warningCount * 12);
  const samplePenalty = sampleCount >= 48 ? 0 : sampleCount >= 12 ? 8 : 18;
  const weatherPenalty = hasWeather ? 0 : 6;
  const score = Math.max(0, Math.min(100, 100 - livePenalty - warningPenalty - samplePenalty - weatherPenalty));
  const levelKey = score >= 82
    ? "smartHubConfidenceHigh"
    : score >= 58
      ? "smartHubConfidenceMedium"
      : "smartHubConfidenceLow";
  const tone = score >= 82 ? "good" : score >= 58 ? "watch" : "alert";

  return {
    score,
    levelKey,
    tone,
    liveAgeMinutes,
    sampleCount,
    warningCount,
    hasWeather,
  };
}

function renderSmartHubConfidence(payload, weatherPayload = lastWeatherPayload) {
  const confidence = getSmartHubConfidence(payload, weatherPayload);

  textFields.smartHubConfidence.dataset.tone = confidence.tone;
  textFields.smartHubConfidenceValue.textContent = `${confidence.score}%`;
  textFields.smartHubConfidenceDetail.textContent = interpolate(t("smartHubConfidenceDetail"), {
    level: t(confidence.levelKey),
    age: confidence.liveAgeMinutes === null ? t("dataAgeUnknown") : interpolate(t("dataAgeMinutes"), { minutes: confidence.liveAgeMinutes }),
    samples: confidence.sampleCount,
    warnings: confidence.warningCount > 0
      ? interpolate(t("smartHubWarningsCount"), { count: confidence.warningCount })
      : t("smartHubWarningsNone"),
    weather: confidence.hasWeather ? t("smartHubWeatherReady") : t("smartHubWeatherMissing"),
  });
}

function getSmartWatchlistItems(decision, confidence) {
  const items = [
    {
      labelKey: "smartWatchBattery",
      value: decision.reserve === null ? "--" : formatPercent(decision.reserve),
      detailKey: decision.reserve !== null && decision.reserve < 35 ? "smartWatchBatteryLow" : "smartWatchBatteryHealthy",
      tone: decision.reserve !== null && decision.reserve < 35 ? "alert" : decision.reserve !== null && decision.reserve < 50 ? "watch" : "good",
      priority: decision.reserve === null ? 20 : decision.reserve < 25 ? 95 : decision.reserve < 35 ? 78 : 34,
    },
    {
      labelKey: "smartWatchSolar",
      value: formatKw(decision.headroomKw),
      detailKey: decision.headroomKw >= 0.8 ? "smartWatchSolarGood" : "smartWatchSolarWeak",
      tone: decision.headroomKw >= 0.8 ? "good" : decision.headroomKw >= 0.25 ? "watch" : "neutral",
      priority: decision.headroomKw >= 0.8 ? 82 : decision.headroomKw >= 0.25 ? 42 : 20,
    },
    {
      labelKey: "smartWatchGrid",
      value: formatPercent(decision.pressure),
      detailKey: decision.pressure >= 55 ? "smartWatchGridHigh" : "smartWatchGridLow",
      tone: decision.pressure >= 65 ? "alert" : decision.pressure >= 35 ? "watch" : "good",
      priority: decision.pressure >= 65 ? 92 : decision.pressure >= 35 ? 68 : 28,
    },
    {
      labelKey: "smartWatchData",
      value: `${confidence.score}%`,
      detailKey: confidence.score < 70 ? "smartWatchDataLow" : "smartWatchDataHigh",
      tone: confidence.tone,
      priority: confidence.score < 58 ? 90 : confidence.score < 82 ? 60 : 26,
    },
    {
      labelKey: "smartWatchWeather",
      value: t(decision.tomorrowOutlookKey),
      detailKey: decision.tomorrowOutlookKey === "poor" ? "smartWatchWeatherWeak" : "smartWatchWeatherGood",
      tone: decision.tomorrowOutlookKey === "poor" ? "alert" : decision.tomorrowOutlookKey === "unknown" ? "watch" : "good",
      priority: decision.tomorrowOutlookKey === "poor" ? 74 : decision.tomorrowOutlookKey === "unknown" ? 46 : 25,
    },
  ];

  return items.sort((left, right) => right.priority - left.priority).slice(0, 3);
}

function renderSmartWatchlist(decision, confidence) {
  if (!textFields.smartWatchlistGrid) {
    return;
  }

  textFields.smartWatchlistGrid.replaceChildren(...getSmartWatchlistItems(decision, confidence).map((item) => {
    const card = document.createElement("article");
    const label = document.createElement("span");
    const value = document.createElement("strong");
    const detail = document.createElement("small");

    card.dataset.tone = item.tone;
    label.textContent = t(item.labelKey);
    value.textContent = item.value;
    detail.textContent = t(item.detailKey);
    card.append(label, value, detail);

    return card;
  }));
}

function getSmartDecisionLog() {
  const entries = getStoredJson(storageKeys.smartDecisionLog, []);

  return Array.isArray(entries) ? entries : [];
}

function saveSmartDecisionLog(entries) {
  setStoredJson(storageKeys.smartDecisionLog, entries.slice(0, 6));
}

function buildSmartDecisionEntry(payload, decision, confidence) {
  return {
    generatedAt: payload?.generatedAt ?? new Date().toISOString(),
    statusKey: decision.statusKey,
    confidenceScore: confidence.score,
    confidenceTone: confidence.tone,
    reserve: decision.reserve,
    pressure: decision.pressure,
    headroomKw: decision.headroomKw,
  };
}

function upsertSmartDecisionLogEntry(entry) {
  const nextEntries = [
    entry,
    ...getSmartDecisionLog().filter((item) => item.generatedAt !== entry.generatedAt),
  ].slice(0, 6);

  saveSmartDecisionLog(nextEntries);

  return nextEntries;
}

function getSmartDecisionDriver(current, previous) {
  if (!current || !previous) {
    return t("smartDecisionDriverNoMajor");
  }

  const candidates = [
    {
      delta: Number(current.reserve ?? 0) - Number(previous.reserve ?? 0),
      threshold: 3,
      score: 1,
      upKey: "smartDecisionDriverReserveUp",
      downKey: "smartDecisionDriverReserveDown",
      format: (value) => formatPercent(value),
    },
    {
      delta: Number(current.headroomKw ?? 0) - Number(previous.headroomKw ?? 0),
      threshold: 0.2,
      score: 12,
      upKey: "smartDecisionDriverHeadroomUp",
      downKey: "smartDecisionDriverHeadroomDown",
      format: (value) => formatKw(value),
    },
    {
      delta: Number(current.pressure ?? 0) - Number(previous.pressure ?? 0),
      threshold: 3,
      score: 1,
      upKey: "smartDecisionDriverPressureUp",
      downKey: "smartDecisionDriverPressureDown",
      format: (value) => formatPercent(value),
    },
    {
      delta: Number(current.confidenceScore ?? 0) - Number(previous.confidenceScore ?? 0),
      threshold: 3,
      score: 1,
      upKey: "smartDecisionDriverConfidenceUp",
      downKey: "smartDecisionDriverConfidenceDown",
      format: (value) => `${Number(value).toFixed(0)}%`,
    },
  ]
    .filter((candidate) => Math.abs(candidate.delta) >= candidate.threshold)
    .sort((left, right) => Math.abs(right.delta) * right.score - Math.abs(left.delta) * left.score);

  const driver = candidates[0];

  if (!driver) {
    return t("smartDecisionDriverNoMajor");
  }

  return interpolate(t(driver.delta > 0 ? driver.upKey : driver.downKey), {
    value: driver.format(Math.abs(driver.delta)),
  });
}

function getSmartDecisionTrend(entries) {
  const current = entries[0];
  const previous = entries[1];

  if (!current || !previous) {
    return t("smartDecisionTrendFirst");
  }

  const values = {
    current: t(current.statusKey),
    previous: t(previous.statusKey),
    driver: getSmartDecisionDriver(current, previous),
  };

  return interpolate(
    t(current.statusKey === previous.statusKey ? "smartDecisionTrendSteady" : "smartDecisionTrendChanged"),
    values,
  );
}

function getSmartDecisionLogSummary(current, previous) {
  if (!previous) {
    return t("smartDecisionLogStarted");
  }

  if (current.statusKey !== previous.statusKey) {
    return interpolate(t("smartDecisionLogChangedTo"), {
      status: t(current.statusKey),
    });
  }

  return getSmartDecisionDriver(current, previous);
}

function createSmartDecisionMetric(labelKey, value) {
  const metric = document.createElement("span");
  const label = document.createElement("b");
  const reading = document.createElement("strong");

  label.textContent = t(labelKey);
  reading.textContent = value;
  metric.append(label, reading);

  return metric;
}

function createSmartDecisionLogRow(item, previous, kind = "trail") {
  const row = document.createElement("article");
  const time = document.createElement("span");
  const summary = document.createElement("strong");
  const metrics = document.createElement("div");
  const confidenceLabel = document.createElement("em");
  const isCurrent = kind === "current";

  row.dataset.kind = kind;
  row.dataset.tone = item.confidenceTone ?? "neutral";
  time.className = "smart-decision-log-time";
  summary.className = "smart-decision-log-summary";
  metrics.className = "smart-decision-log-metrics";
  time.textContent = isCurrent ? t("smartDecisionLogNow") : formatTimestampTime(item.generatedAt);
  summary.textContent = isCurrent ? t(item.statusKey) : getSmartDecisionLogSummary(item, previous);
  metrics.append(
    createSmartDecisionMetric("smartDecisionMetricReserve", item.reserve === null ? "--" : formatPercent(item.reserve)),
    createSmartDecisionMetric("smartDecisionMetricPressure", formatPercent(item.pressure)),
    createSmartDecisionMetric("smartDecisionMetricSurplus", formatKw(item.headroomKw)),
  );
  confidenceLabel.textContent = interpolate(t("smartDecisionLogConfidence"), {
    value: `${Number(item.confidenceScore ?? 0).toFixed(0)}%`,
  });
  row.append(time, summary, metrics, confidenceLabel);

  return row;
}

function getSmartDecisionTrailRows(entries) {
  const seenSummaries = new Set();
  const rows = [];

  entries.slice(1).forEach((item, index) => {
    const previous = entries[index + 2];
    const summary = getSmartDecisionLogSummary(item, previous);
    const signature = `${item.statusKey}:${summary}`;

    if (seenSummaries.has(signature)) {
      return;
    }

    seenSummaries.add(signature);
    rows.push(createSmartDecisionLogRow(item, previous, "trail"));
  });

  return rows.slice(0, 2);
}

function renderSmartDecisionLog(payload, decision, confidence) {
  if (!textFields.smartDecisionLogList) {
    return;
  }

  const entries = upsertSmartDecisionLogEntry(buildSmartDecisionEntry(payload, decision, confidence));

  if (entries.length === 0) {
    textFields.smartDecisionLogMeta.textContent = t("smartDecisionLogMetaEmpty");
    textFields.smartDecisionTrend.textContent = t("smartDecisionTrendFirst");
    textFields.smartDecisionLogList.textContent = t("smartDecisionLogEmpty");

    return;
  }

  textFields.smartDecisionLogMeta.textContent = interpolate(t("smartDecisionLogMeta"), {
    time: formatTimestamp(entries[0].generatedAt),
  });
  textFields.smartDecisionTrend.textContent = getSmartDecisionTrend(entries);
  textFields.smartDecisionLogList.replaceChildren(
    createSmartDecisionLogRow(entries[0], entries[1], "current"),
    ...getSmartDecisionTrailRows(entries),
  );
}

function renderSmartHub(payload, weatherPayload = lastWeatherPayload) {
  if (!payload?.live || !payload?.today) {
    return;
  }

  const decision = getSmartHubDecision(payload, weatherPayload);
  const confidence = getSmartHubConfidence(payload, weatherPayload);
  const commonValues = {
    self: formatOptionalPercent(decision.selfSufficiency),
    headroom: formatKw(decision.headroomKw),
    reserve: decision.reserve === null ? "--" : formatPercent(decision.reserve),
    soc: decision.batterySoc === null ? "--" : formatPercent(decision.batterySoc),
    pressure: formatPercent(decision.pressure),
    window: decision.tariff.peakWindow,
    time: formatDurationMinutes(decision.tariff.detailMinutes),
    risk: t(decision.runwayRiskKey),
    outlook: t(decision.tomorrowOutlookKey),
    grid: decision.gridFlow,
    exportKw: formatKw(decision.solarExportKw),
    homeKw: formatKw(decision.homeUsageKw),
    tariff: decision.tariff.isPeak ? t("peakNow") : t("offPeakNow"),
    count: String(decision.warningsCount),
  };

  textFields.smartHubStatus.textContent = t(decision.statusKey);
  renderSmartHubConfidence(payload, weatherPayload);
  textFields.smartHubNarrative.textContent = interpolate(t(decision.summaryKey), commonValues);
  textFields.smartHubTags.replaceChildren(...decision.tags.map(([key, tone]) => {
    const tag = document.createElement("span");
    tag.dataset.tone = tone;
    tag.textContent = t(key);
    return tag;
  }));
  renderSmartWatchlist(decision, confidence);

  const nowTone = decision.nowStatusKey === "smartHubNowUseSolar"
    ? "good"
    : decision.nowStatusKey === "smartHubNowSteady"
      ? "neutral"
      : "alert";
  const laterTone = decision.laterStatusKey === "smartHubLaterNormal" || decision.laterStatusKey === "smartHubLaterSolar"
    ? "good"
    : decision.laterStatusKey === "smartHubLaterPeak"
      ? "watch"
      : "alert";
  const watchTone = decision.watchStatusKey === "smartHubWatchGrid"
    ? "neutral"
    : decision.watchStatusKey === "smartHubWatchData" || decision.watchStatusKey === "smartHubWatchBattery"
      ? "alert"
      : "watch";
  const solarTone = decision.headroomKw >= 0.8
    ? "good"
    : decision.solarExportKw > 0.1
      ? "watch"
      : "neutral";
  const batteryTone = decision.reserve === null
    ? "neutral"
    : decision.reserve < 25
      ? "alert"
      : decision.reserve < 45
        ? "watch"
        : "good";
  const gridTone = decision.pressure >= 65
    ? "alert"
    : decision.pressure >= 35
      ? "watch"
      : "good";
  const outlookTone = decision.tomorrowOutlookKey === "excellent" || decision.tomorrowOutlookKey === "good"
    ? "good"
    : decision.tomorrowOutlookKey === "poor"
      ? "alert"
      : "watch";

  setSmartHubBasis(
    textFields.smartHubSolarBasisCard,
    textFields.smartHubSolarBasis,
    textFields.smartHubSolarBasisDetail,
    solarTone,
    formatKw(decision.headroomKw),
    interpolate(t("smartHubBasisSolarDetail"), commonValues),
  );
  setSmartHubBasis(
    textFields.smartHubBatteryBasisCard,
    textFields.smartHubBatteryBasis,
    textFields.smartHubBatteryBasisDetail,
    batteryTone,
    commonValues.reserve,
    interpolate(t("smartHubBasisBatteryDetail"), commonValues),
  );
  setSmartHubBasis(
    textFields.smartHubGridBasisCard,
    textFields.smartHubGridBasis,
    textFields.smartHubGridBasisDetail,
    gridTone,
    commonValues.pressure,
    interpolate(t("smartHubBasisGridDetail"), commonValues),
  );
  setSmartHubBasis(
    textFields.smartHubOutlookBasisCard,
    textFields.smartHubOutlookBasis,
    textFields.smartHubOutlookBasisDetail,
    outlookTone,
    decision.tariff.isPeak ? t("peakNow") : formatDurationMinutes(decision.tariff.detailMinutes),
    interpolate(t("smartHubBasisOutlookDetail"), commonValues),
  );

  setSmartHubCard(
    textFields.smartHubNowCard,
    textFields.smartHubNowStatus,
    textFields.smartHubNowDetail,
    nowTone,
    decision.nowStatusKey,
    interpolate(t(decision.nowDetailKey), commonValues),
  );
  setSmartHubCard(
    textFields.smartHubLaterCard,
    textFields.smartHubLaterStatus,
    textFields.smartHubLaterDetail,
    laterTone,
    decision.laterStatusKey,
    interpolate(t(decision.laterDetailKey), commonValues),
  );
  setSmartHubCard(
    textFields.smartHubWatchCard,
    textFields.smartHubWatchStatus,
    textFields.smartHubWatchDetail,
    watchTone,
    decision.watchStatusKey,
    interpolate(t(decision.watchDetailKey), commonValues),
  );
  renderSmartFlowSplit(payload);
  renderSmartDecisionLog(payload, decision, confidence);
}

function getTodayBillImpact(payload) {
  const today = payload?.today ?? {};
  const savings = payload?.todaySavings ?? {};
  const homeUsageKwh = Number(today.homeUsageKwh ?? 0);
  const gridConsumptionKwh = Number(today.gridConsumptionKwh ?? 0);
  const blendedImportRate = Number(savings.blendedImportRate ?? 0);
  const exportCredit = Number(savings.exportCredit ?? 0);
  const withoutSolarCost = homeUsageKwh * blendedImportRate;
  const gridEnergyCost = gridConsumptionKwh * blendedImportRate;
  const netCostAfterExport = gridEnergyCost - exportCredit;
  const billBenefit = withoutSolarCost - netCostAfterExport;

  return {
    currency: savings.currency ?? "AUD",
    avoidedGridImportKwh: Number(savings.avoidedGridImportKwh ?? Math.max(0, homeUsageKwh - gridConsumptionKwh)),
    exportedKwh: Number(savings.exportedKwh ?? today.returnToGridKwh ?? 0),
    withoutSolarCost,
    gridEnergyCost,
    exportCredit,
    netCostAfterExport,
    billBenefit,
  };
}

function renderTodayBillImpact(payload) {
  if (!payload?.today) {
    return;
  }

  const impact = getTodayBillImpact(payload);

  metricFields.todayBillImpactBenefit.textContent = formatMoney(impact.billBenefit, impact.currency);
  metricFields.todayBillWithoutSolar.textContent = formatMoney(impact.withoutSolarCost, impact.currency);
  metricFields.todayBillGridCost.textContent = formatMoney(impact.gridEnergyCost, impact.currency);
  metricFields.todayBillExportCredit.textContent = formatMoney(impact.exportCredit, impact.currency);
  metricFields.todayBillNetCost.textContent = formatMoney(impact.netCostAfterExport, impact.currency);
  textFields.todayBillImpactDetail.textContent = interpolate(t("todayBillImpactDetail"), {
    avoided: formatKwh(impact.avoidedGridImportKwh),
    exported: formatKwh(impact.exportedKwh),
  });
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

function averageFinite(values) {
  const finiteValues = values
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));

  if (finiteValues.length === 0) {
    return null;
  }

  return finiteValues.reduce((total, value) => total + value, 0) / finiteValues.length;
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

function getPeakReadiness(payload) {
  const live = payload?.live ?? {};
  const savings = payload?.todaySavings ?? {};
  const tariff = getTariffStatus(savings);
  const batterySoc = Number(live.batterySocPercent ?? 0);
  const gridImportKw = Number(live.gridImportKw ?? 0);
  const gridExportKw = Number(live.gridExportKw ?? 0);
  const batteryScore = Number.isFinite(batterySoc) ? Math.max(0, Math.min(55, batterySoc * 0.55)) : 0;
  const tariffScore = tariff.isPeak ? 10 : Math.min(20, tariff.detailMinutes / 9);
  const gridScore = gridExportKw > gridImportKw
    ? 15
    : Math.max(0, 15 - gridImportKw * 4);
  const savingsScore = Math.min(10, Math.max(0, Number(savings.totalSavings ?? 0) * 2));
  const score = Math.round(Math.max(0, Math.min(100, batteryScore + tariffScore + gridScore + savingsScore)));
  const statusKey = score >= 80
    ? "peakReadinessExcellent"
    : score >= 62
      ? "peakReadinessGood"
      : score >= 42
        ? "peakReadinessWatch"
        : "peakReadinessLow";
  const gridFlow = gridExportKw >= gridImportKw
    ? `${t("exporting")} ${formatKw(gridExportKw)}`
    : `${t("importing")} ${formatKw(gridImportKw)}`;

  return {
    score,
    statusKey,
    tariff,
    gridFlow,
    batterySoc: live.batterySocPercent,
    savings,
  };
}

function renderPeakReadiness(payload) {
  if (!payload?.live) {
    return;
  }

  const readiness = getPeakReadiness(payload);

  textFields.peakReadinessRing.style.setProperty("--peak-score", `${readiness.score}%`);
  textFields.peakReadinessScore.textContent = interpolate(t("peakReadinessScore"), {
    score: readiness.score,
  });
  textFields.peakReadinessValue.textContent = String(readiness.score);
  textFields.peakReadinessStatus.textContent = t(readiness.statusKey);
  textFields.peakReadinessDetail.textContent = interpolate(t("peakReadinessDetail"), {
    soc: formatPercent(readiness.batterySoc),
    window: readiness.tariff.peakWindow,
    grid: readiness.gridFlow,
  });
  textFields.peakReadinessBattery.textContent = formatPercent(readiness.batterySoc);
  textFields.peakReadinessTariff.textContent = readiness.tariff.isPeak ? t("peakNow") : t("offPeakNow");
  textFields.peakReadinessGrid.textContent = readiness.gridFlow;
  textFields.peakReadinessSavings.textContent = formatMoney(
    readiness.savings.totalSavings,
    readiness.savings.currency,
  );
}

function getBatteryReservePlan(payload) {
  const live = payload?.live ?? {};
  const tariff = getTariffStatus(payload?.todaySavings ?? {});
  const soc = Number(live.batterySocPercent);
  const homeKw = Number(live.homeUsageKw ?? 0);
  const chargeKw = Number(live.batteryChargeKw ?? 0);
  const dischargeKw = Number(live.batteryDischargeKw ?? 0);
  const reservePercent = Number.isFinite(soc) ? Math.max(0, soc - 20) : null;
  const modeKey = chargeKw > dischargeKw + 0.05
    ? "charging"
    : dischargeKw > chargeKw + 0.05
      ? "discharging"
      : "idle";
  const batteryPower = Math.max(chargeKw, dischargeKw);
  const loadCoveragePercent = homeKw > 0 && modeKey === "discharging"
    ? Math.max(0, Math.min(100, (dischargeKw / homeKw) * 100))
    : 0;
  const actionKey = !Number.isFinite(soc)
    ? "reserveActionUnavailable"
    : soc < 45 && !tariff.isPeak
      ? "reserveActionSave"
      : modeKey === "charging" && chargeKw > 0.4
        ? "reserveActionUseSurplus"
        : modeKey === "discharging" && !tariff.isPeak && dischargeKw > 0.7
          ? "reserveActionReduce"
          : "reserveActionSteady";

  return {
    soc: Number.isFinite(soc) ? soc : null,
    reservePercent,
    modeKey,
    batteryPower,
    loadCoveragePercent,
    actionKey,
  };
}

function renderBatteryReservePlan(payload) {
  if (!payload?.live) {
    return;
  }

  const plan = getBatteryReservePlan(payload);
  const reserveBarPercent = plan.reservePercent === null ? 0 : Math.max(0, Math.min(100, (plan.reservePercent / 80) * 100));

  textFields.batteryReserveFill.style.height = plan.soc === null ? "0%" : `${Math.max(0, Math.min(100, plan.soc)).toFixed(1)}%`;
  textFields.batteryReserveSoc.textContent = plan.soc === null ? "--" : formatPercent(plan.soc);
  textFields.batteryReserveMode.textContent = t(plan.modeKey);
  textFields.batteryReserveDetail.textContent = interpolate(t("batteryReserveDetail"), {
    reserve: plan.reservePercent === null ? "--" : formatPercent(plan.reservePercent),
    mode: t(plan.modeKey),
  });
  textFields.batteryReserveUsable.textContent = plan.reservePercent === null ? "--" : formatPercent(plan.reservePercent);
  textFields.batteryReserveBar.style.width = `${reserveBarPercent.toFixed(1)}%`;
  textFields.batteryReservePower.textContent = formatKw(plan.batteryPower);
  textFields.batteryReserveCoverage.textContent = formatOptionalPercent(plan.loadCoveragePercent);
  textFields.batteryReserveAction.textContent = t(plan.actionKey);
}

function getFlexibleLoadPlan(payload) {
  const live = payload?.live ?? {};
  const tariff = getTariffStatus(payload?.todaySavings ?? {});
  const soc = Number(live.batterySocPercent);
  const gridImportKw = Number(live.gridImportKw ?? 0);
  const gridExportKw = Number(live.gridExportKw ?? 0);
  const exportHeadroomKw = Math.max(0, gridExportKw);
  const protectedHeadroomKw = Number.isFinite(soc) && soc < 45
    ? Math.max(0, exportHeadroomKw - 0.5)
    : exportHeadroomKw;
  const statusKey = tariff.isPeak && gridImportKw > 0.1
    ? "loadPlanAvoidPeak"
    : protectedHeadroomKw >= 1.5 && (!Number.isFinite(soc) || soc >= 45)
      ? "loadPlanRunHeavy"
      : protectedHeadroomKw >= 0.5
        ? "loadPlanRunLight"
        : Number.isFinite(soc) && soc < 45 && !tariff.isPeak
          ? "loadPlanChargeFirst"
          : "loadPlanWait";
  const windowKey = protectedHeadroomKw >= 0.5
    ? "loadBestNow"
    : tariff.isPeak
      ? "loadBestAfterPeak"
      : Number.isFinite(soc) && soc < 55
        ? "loadBestSolarOrOffPeak"
        : "loadBestOffPeak";
  const avoidKey = tariff.isPeak && gridImportKw > 0.1
    ? "loadAvoidPeakImport"
    : Number.isFinite(soc) && soc < 35
      ? "loadAvoidLowBattery"
      : gridImportKw > 1
        ? "loadAvoidHighImport"
        : "loadAvoidNone";
  const guardKey = Number.isFinite(soc) && soc >= 70
    ? "loadGuardStrong"
    : Number.isFinite(soc) && soc >= 45
      ? "loadGuardMedium"
      : "loadGuardLow";
  const exampleKey = protectedHeadroomKw >= 2
    ? "loadExampleHeavy"
    : protectedHeadroomKw >= 1
      ? "loadExampleMedium"
      : protectedHeadroomKw >= 0.5
        ? "loadExampleLight"
        : "loadExampleNone";
  const gridFlow = gridExportKw >= gridImportKw
    ? `${t("exporting")} ${formatKw(gridExportKw)}`
    : `${t("importing")} ${formatKw(gridImportKw)}`;

  return {
    headroomKw: protectedHeadroomKw,
    soc: Number.isFinite(soc) ? soc : null,
    gridFlow,
    statusKey,
    windowKey,
    avoidKey,
    guardKey,
    exampleKey,
  };
}

function renderFlexibleLoadPlan(payload) {
  if (!payload?.live) {
    return;
  }

  const plan = getFlexibleLoadPlan(payload);
  const capacityPercent = Math.max(0, Math.min(100, (plan.headroomKw / 3) * 100));

  textFields.flexibleLoadStatus.textContent = t(plan.statusKey);
  textFields.flexibleLoadDetail.textContent = interpolate(t("flexibleLoadDetail"), {
    headroom: formatKw(plan.headroomKw),
    soc: plan.soc === null ? "--" : formatPercent(plan.soc),
    grid: plan.gridFlow,
  });
  textFields.flexibleLoadCapacity.textContent = formatKw(plan.headroomKw);
  textFields.flexibleLoadBar.style.width = `${capacityPercent.toFixed(1)}%`;
  textFields.flexibleLoadExamples.textContent = t(plan.exampleKey);
  textFields.flexibleLoadWindow.textContent = t(plan.windowKey);
  textFields.flexibleLoadAvoid.textContent = t(plan.avoidKey);
  textFields.flexibleLoadBatteryGuard.textContent = t(plan.guardKey);
}

function getBatteryRunwayPlan(payload) {
  const live = payload?.live ?? {};
  const history = payload?.last24Hours ?? {};
  const socSeries = (history.batteryLevelPercent ?? [])
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));
  const recentSoc = socSeries.slice(-8);
  const liveSoc = Number(live.batterySocPercent);
  const soc = Number.isFinite(liveSoc) ? liveSoc : recentSoc.at(-1);
  const reservePercent = Number.isFinite(soc) ? Math.max(0, soc - 20) : null;
  const minutesPerSample = history.labels?.length > 1
    ? Math.max(1, Math.min(60, 1440 / (history.labels.length - 1)))
    : 30;
  const recentHours = Math.max((recentSoc.length - 1) * minutesPerSample / 60, 0);
  const socDelta = recentSoc.length >= 2 ? recentSoc.at(-1) - recentSoc[0] : 0;
  const dropPerHour = recentHours > 0 ? Math.max(0, -socDelta / recentHours) : 0;
  const chargeKw = Number(live.batteryChargeKw ?? 0);
  const dischargeKw = Number(live.batteryDischargeKw ?? 0);
  const isCharging = chargeKw > dischargeKw + 0.05 || socDelta > 0.3;
  const minutesToFloor = reservePercent !== null && dropPerHour > 0.1
    ? (reservePercent / dropPerHour) * 60
    : null;
  const recentHomeLoad = averageFinite((history.homeUsageKw ?? []).slice(-8));
  const recentBatteryDischarge = averageFinite((history.batteryDischargeKw ?? []).slice(-8));
  const batteryCoverage = recentHomeLoad && recentHomeLoad > 0 && recentBatteryDischarge !== null
    ? Math.max(0, Math.min(100, (recentBatteryDischarge / recentHomeLoad) * 100))
    : null;
  const riskKey = reservePercent === null
    ? "runwayRiskMedium"
    : reservePercent < 15 || (minutesToFloor !== null && minutesToFloor < 180)
      ? "runwayRiskHigh"
      : reservePercent < 35 || (minutesToFloor !== null && minutesToFloor < 420)
        ? "runwayRiskMedium"
        : "runwayRiskLow";
  const statusKey = reservePercent === null || recentSoc.length < 3
    ? "runwayUnavailable"
    : isCharging || dropPerHour <= 0.1
      ? "runwayCharging"
      : minutesToFloor !== null && minutesToFloor < 180
        ? "runwayLow"
        : minutesToFloor !== null && minutesToFloor < 420
          ? "runwayWatch"
          : "runwayHealthy";
  const trendKey = isCharging
    ? "runwayTrendCharging"
    : dropPerHour > 0.1
      ? "runwayTrendDraining"
      : "runwayTrendStable";

  return {
    soc,
    reservePercent,
    dropPerHour,
    minutesToFloor,
    recentHomeLoad,
    batteryCoverage,
    riskKey,
    statusKey,
    trendKey,
  };
}

function formatRunwayTime(minutes) {
  if (minutes === null || minutes === undefined) {
    return "--";
  }

  if (minutes > 24 * 60) {
    return t("runwayMoreThanDay");
  }

  return formatDurationMinutes(minutes);
}

function renderBatteryRunwayPlan(payload) {
  if (!payload?.live) {
    return;
  }

  const plan = getBatteryRunwayPlan(payload);
  const reserveBarPercent = plan.reservePercent === null ? 0 : Math.max(0, Math.min(100, (plan.reservePercent / 80) * 100));
  const trend = plan.trendKey === "runwayTrendDraining"
    ? interpolate(t(plan.trendKey), { rate: formatPercent(plan.dropPerHour) })
    : t(plan.trendKey);

  textFields.batteryRunwayStatus.textContent = t(plan.statusKey);
  textFields.batteryRunwayDetail.textContent = interpolate(t("batteryRunwayDetail"), {
    trend,
    reserve: plan.reservePercent === null ? "--" : formatPercent(plan.reservePercent),
  });
  textFields.batteryRunwayTime.textContent = plan.minutesToFloor === null && plan.statusKey !== "runwayUnavailable"
    ? t(plan.trendKey)
    : formatRunwayTime(plan.minutesToFloor);
  textFields.batteryRunwayBar.style.width = `${reserveBarPercent.toFixed(1)}%`;
  textFields.batteryRunwayMeta.textContent = interpolate(t("runwayMeta"), {
    load: plan.recentHomeLoad === null ? "--" : formatKw(plan.recentHomeLoad),
    coverage: formatOptionalPercent(plan.batteryCoverage),
  });
  textFields.batteryRunwayDrain.textContent = plan.dropPerHour > 0.1
    ? `${formatPercent(plan.dropPerHour)}/h`
    : t(plan.trendKey);
  textFields.batteryRunwayReserve.textContent = plan.reservePercent === null ? "--" : formatPercent(plan.reservePercent);
  textFields.batteryRunwayRisk.textContent = t(plan.riskKey);
}

function getSeriesDelta(values) {
  const finiteValues = values
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));

  if (finiteValues.length < 2) {
    return 0;
  }

  const recentValues = finiteValues.slice(-6);

  return recentValues.at(-1) - recentValues[0];
}

function getGridImportForecast(payload) {
  const live = payload?.live ?? {};
  const history = payload?.last24Hours ?? {};
  const tariff = getTariffStatus(payload?.todaySavings ?? {});
  const gridImportKw = Number(live.gridImportKw ?? 0);
  const gridExportKw = Number(live.gridExportKw ?? 0);
  const homeKw = Number(live.homeUsageKw ?? 0);
  const batterySoc = Number(live.batterySocPercent);
  const reservePercent = Number.isFinite(batterySoc) ? Math.max(0, batterySoc - 20) : null;
  const recentImportKw = averageFinite((history.gridImportKw ?? []).slice(-8)) ?? gridImportKw;
  const recentHomeKw = averageFinite((history.homeUsageKw ?? []).slice(-8)) ?? homeKw;
  const solarDelta = getSeriesDelta(history.solarGeneratedKw ?? []);
  const solarTrendKey = solarDelta > 0.25
    ? "gridSolarRising"
    : solarDelta < -0.25
      ? "gridSolarFalling"
      : "gridSolarFlat";
  const importPressure = Math.max(0, Math.min(100,
    (recentImportKw * 28)
      + (gridImportKw * 20)
      + (tariff.isPeak ? 18 : 0)
      + (reservePercent !== null && reservePercent < 25 ? 16 : 0)
      + (solarTrendKey === "gridSolarFalling" ? 10 : 0)
      - (gridExportKw * 22),
  ));
  const statusKey = gridExportKw > gridImportKw + 0.2
    ? "gridForecastExporting"
    : importPressure >= 65
      ? "gridForecastHigh"
      : importPressure >= 35
        ? "gridForecastWatch"
        : "gridForecastLow";
  const actionKey = gridExportKw > 0.5
    ? "gridActionUseSolar"
    : tariff.isPeak && importPressure >= 35
      ? "gridActionReducePeak"
      : importPressure >= 45
        ? "gridActionShiftLoads"
        : "gridActionNormal";
  const gridFlow = gridExportKw >= gridImportKw
    ? `${t("exporting")} ${formatKw(gridExportKw)}`
    : `${t("importing")} ${formatKw(gridImportKw)}`;

  return {
    importPressure,
    recentImportKw,
    recentHomeKw,
    reservePercent,
    solarTrendKey,
    statusKey,
    actionKey,
    tariff,
    gridFlow,
  };
}

function renderGridImportForecast(payload) {
  if (!payload?.live) {
    return;
  }

  const forecast = getGridImportForecast(payload);

  textFields.gridForecastStatus.textContent = t(forecast.statusKey);
  textFields.gridForecastDetail.textContent = interpolate(t("gridForecastDetail"), {
    importKw: formatKw(forecast.recentImportKw),
    reserve: forecast.reservePercent === null ? "--" : formatPercent(forecast.reservePercent),
    tariff: forecast.tariff.isPeak ? t("peakNow") : t("offPeakNow"),
  });
  textFields.gridForecastPressure.textContent = formatPercent(forecast.importPressure);
  textFields.gridForecastBar.style.width = `${forecast.importPressure.toFixed(1)}%`;
  textFields.gridForecastMeta.textContent = interpolate(t("gridForecastMeta"), {
    load: formatKw(forecast.recentHomeKw),
    grid: forecast.gridFlow,
  });
  textFields.gridForecastImport.textContent = formatKw(forecast.recentImportKw);
  textFields.gridForecastSolar.textContent = t(forecast.solarTrendKey);
  textFields.gridForecastAction.textContent = t(forecast.actionKey);
}

function clampPercentValue(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return 0;
  }

  return Math.max(0, Math.min(100, numericValue));
}

function setHomeStateRow(row, statusElement, detailElement, barElement, item) {
  if (!row || !statusElement || !detailElement || !barElement) {
    return;
  }

  row.dataset.tone = item.tone;
  statusElement.textContent = t(item.statusKey);
  detailElement.textContent = item.detail;
  barElement.style.width = `${clampPercentValue(item.percent).toFixed(1)}%`;
}

function setHomeJudgementCard(card, statusElement, detailElement, judgement) {
  if (!card || !statusElement || !detailElement) {
    return;
  }

  card.dataset.tone = judgement.tone;
  statusElement.textContent = t(judgement.statusKey);
  detailElement.textContent = judgement.detail;
}

function getHomeSourceMix(payload) {
  const live = payload?.live ?? {};
  const homeKw = getLiveKw(live.homeUsageKw);
  const solarKw = getLiveKw(live.solarGeneratedKw);
  const batteryChargeKw = getLiveKw(live.batteryChargeKw);
  const batteryDischargeKw = getLiveKw(live.batteryDischargeKw);
  const gridImportKw = getLiveKw(live.gridImportKw);
  const gridExportKw = getLiveKw(live.gridExportKw);

  if (homeKw <= 0.05) {
    return {
      tone: "neutral",
      statusKey: "homeSourceIdle",
      homeKw,
      solarKw: 0,
      batteryKw: 0,
      gridKw: 0,
      solarPercent: 0,
      batteryPercent: 0,
      gridPercent: 0,
    };
  }

  let solarToHomeKw = Math.min(homeKw, Math.max(0, solarKw - batteryChargeKw - gridExportKw));
  let batteryToHomeKw = Math.min(Math.max(0, homeKw - solarToHomeKw), batteryDischargeKw);
  let gridToHomeKw = Math.min(Math.max(0, homeKw - solarToHomeKw - batteryToHomeKw), gridImportKw);
  let remainderKw = Math.max(0, homeKw - solarToHomeKw - batteryToHomeKw - gridToHomeKw);

  if (remainderKw > 0.05) {
    if (solarKw >= batteryDischargeKw && solarKw >= gridImportKw) {
      solarToHomeKw += remainderKw;
    } else if (batteryDischargeKw >= gridImportKw) {
      batteryToHomeKw += remainderKw;
    } else {
      gridToHomeKw += remainderKw;
    }
  }

  const solarPercent = Math.max(0, Math.min(100, (solarToHomeKw / homeKw) * 100));
  const batteryPercent = Math.max(0, Math.min(100, (batteryToHomeKw / homeKw) * 100));
  const gridPercent = Math.max(0, Math.min(100, 100 - solarPercent - batteryPercent));
  const statusKey = gridPercent >= 45
    ? "homeSourceGridHelp"
    : batteryPercent >= 55
      ? "homeSourceMostlyBattery"
      : solarPercent >= 60
        ? "homeSourceMostlySolar"
        : "homeSourceMixed";
  const tone = statusKey === "homeSourceMostlySolar"
    ? "good"
    : statusKey === "homeSourceGridHelp"
      ? gridPercent >= 65 ? "alert" : "watch"
      : statusKey === "homeSourceMostlyBattery"
        ? "watch"
        : "neutral";

  return {
    tone,
    statusKey,
    homeKw,
    solarKw: solarToHomeKw,
    batteryKw: batteryToHomeKw,
    gridKw: gridToHomeKw,
    solarPercent,
    batteryPercent,
    gridPercent,
  };
}

function renderHomeSourceMix(payload) {
  if (!textFields.homeSourceStatus) {
    return;
  }

  const mix = getHomeSourceMix(payload);

  textFields.homeSourceStatus.dataset.tone = mix.tone;
  textFields.homeSourceStatus.textContent = t(mix.statusKey);
  textFields.homeSourceDetail.textContent = interpolate(t("homeSourceDetail"), {
    load: formatKw(mix.homeKw),
    solar: formatKw(mix.solarKw),
    battery: formatKw(mix.batteryKw),
    grid: formatKw(mix.gridKw),
  });
  textFields.homeSourceSolarBar.style.width = `${clampPercentValue(mix.solarPercent).toFixed(1)}%`;
  textFields.homeSourceBatteryBar.style.width = `${clampPercentValue(mix.batteryPercent).toFixed(1)}%`;
  textFields.homeSourceGridBar.style.width = `${clampPercentValue(mix.gridPercent).toFixed(1)}%`;
  textFields.homeSourceSolarShare.textContent = formatPercent(mix.solarPercent);
  textFields.homeSourceBatteryShare.textContent = formatPercent(mix.batteryPercent);
  textFields.homeSourceGridShare.textContent = formatPercent(mix.gridPercent);
}

function getHomeJudgements(payload, weatherPayload = lastWeatherPayload) {
  const flexibleLoad = getFlexibleLoadPlan(payload);
  const gridForecast = getGridImportForecast(payload);
  const batteryRunway = getBatteryRunwayPlan(payload);
  const peakReadiness = getPeakReadiness(payload);
  const tomorrowPrep = getTomorrowPrepPlan(payload, weatherPayload);
  const reserveText = batteryRunway.reservePercent === null ? "--" : formatPercent(batteryRunway.reservePercent);
  const runwayText = batteryRunway.minutesToFloor === null && batteryRunway.statusKey !== "runwayUnavailable"
    ? t(batteryRunway.trendKey)
    : formatRunwayTime(batteryRunway.minutesToFloor);
  const loadStatusKey = gridForecast.importPressure >= 65 || (gridForecast.tariff.isPeak && gridForecast.importPressure >= 35)
    ? "homeJudgeLoadAvoid"
    : flexibleLoad.headroomKw >= 1.5 && (flexibleLoad.soc === null || flexibleLoad.soc >= 45)
      ? "homeJudgeLoadRun"
      : flexibleLoad.headroomKw >= 0.5 && gridForecast.importPressure < 55
        ? "homeJudgeLoadLight"
        : "homeJudgeLoadWait";
  const loadTone = loadStatusKey === "homeJudgeLoadRun"
    ? "good"
    : loadStatusKey === "homeJudgeLoadAvoid"
      ? "alert"
      : "watch";
  const peakStatusKey = peakReadiness.score >= 70
    ? "homeJudgePeakReady"
    : peakReadiness.score >= 45
      ? "homeJudgePeakWatch"
      : "homeJudgePeakLow";
  const peakTone = peakReadiness.score >= 70
    ? "good"
    : peakReadiness.score >= 45
      ? "watch"
      : "alert";
  const nightStatusKey = batteryRunway.riskKey === "runwayRiskHigh"
    ? "homeJudgeNightSave"
    : batteryRunway.riskKey === "runwayRiskMedium"
      ? "homeJudgeNightWatch"
      : "homeJudgeNightSafe";
  const nightTone = batteryRunway.riskKey === "runwayRiskHigh"
    ? "alert"
    : batteryRunway.riskKey === "runwayRiskMedium"
      ? "watch"
      : "good";
  const tomorrowStatusKey = tomorrowPrep.statusKey === "tomorrowPrepWaiting"
    ? "homeJudgeTomorrowWait"
    : tomorrowPrep.statusKey === "tomorrowPrepLimited" || tomorrowPrep.outlookKey === "poor"
      ? "homeJudgeTomorrowLight"
      : "homeJudgeTomorrowSolar";
  const tomorrowTone = tomorrowStatusKey === "homeJudgeTomorrowSolar"
    ? "good"
    : tomorrowStatusKey === "homeJudgeTomorrowLight"
      ? "watch"
      : "neutral";

  return {
    load: {
      tone: loadTone,
      statusKey: loadStatusKey,
      detail: interpolate(t("homeJudgeLoadDetail"), {
        headroom: formatKw(flexibleLoad.headroomKw),
        pressure: formatPercent(gridForecast.importPressure),
        reserve: flexibleLoad.soc === null ? "--" : formatPercent(Math.max(0, flexibleLoad.soc - 20)),
      }),
    },
    peak: {
      tone: peakTone,
      statusKey: peakStatusKey,
      detail: interpolate(t("homeJudgePeakDetail"), {
        score: interpolate(t("peakReadinessScore"), { score: peakReadiness.score }),
        window: peakReadiness.tariff.peakWindow,
        grid: peakReadiness.gridFlow,
      }),
    },
    night: {
      tone: nightTone,
      statusKey: nightStatusKey,
      detail: interpolate(t("homeJudgeNightDetail"), {
        runway: runwayText,
        reserve: reserveText,
        risk: t(batteryRunway.riskKey),
      }),
    },
    tomorrow: {
      tone: tomorrowTone,
      statusKey: tomorrowStatusKey,
      detail: interpolate(t("homeJudgeTomorrowDetail"), {
        outlook: t(tomorrowPrep.outlookKey),
        window: t(tomorrowPrep.windowKey),
        action: t(tomorrowPrep.actionKey),
      }),
    },
  };
}

function getHomeActionQueue(payload, weatherPayload = lastWeatherPayload) {
  const flexibleLoad = getFlexibleLoadPlan(payload);
  const gridForecast = getGridImportForecast(payload);
  const batteryRunway = getBatteryRunwayPlan(payload);
  const peakReadiness = getPeakReadiness(payload);
  const tomorrowPrep = getTomorrowPrepPlan(payload, weatherPayload);
  const reserveText = batteryRunway.reservePercent === null ? "--" : formatPercent(batteryRunway.reservePercent);
  const runwayText = batteryRunway.minutesToFloor === null && batteryRunway.statusKey !== "runwayUnavailable"
    ? t(batteryRunway.trendKey)
    : formatRunwayTime(batteryRunway.minutesToFloor);
  const pressureText = formatPercent(gridForecast.importPressure);
  const tariffText = gridForecast.tariff.isPeak ? t("peakNow") : t("offPeakNow");
  const hasLowReserve = batteryRunway.reservePercent !== null && batteryRunway.reservePercent < 25;
  const hasBatteryRisk = batteryRunway.riskKey === "runwayRiskHigh" || hasLowReserve;
  const actions = [];
  const addAction = (action) => {
    const commonValues = {
      headroom: formatKw(flexibleLoad.headroomKw),
      pressure: pressureText,
      reserve: reserveText,
      runway: runwayText,
      risk: t(batteryRunway.riskKey),
      tariff: tariffText,
      score: interpolate(t("peakReadinessScore"), { score: peakReadiness.score }),
      window: peakReadiness.tariff.peakWindow,
      outlook: t(tomorrowPrep.outlookKey),
      action: t(tomorrowPrep.actionKey),
    };

    actions.push({
      ...action,
      values: {
        ...commonValues,
        ...(action.values ?? {}),
      },
    });
  };

  if (gridForecast.importPressure >= 65 || (gridForecast.tariff.isPeak && gridForecast.importPressure >= 35)) {
    addAction({
      score: gridForecast.importPressure + (gridForecast.tariff.isPeak ? 30 : 12),
      tone: gridForecast.importPressure >= 65 || gridForecast.tariff.isPeak ? "alert" : "watch",
      titleKey: "homeActionReduceImport",
      detailKey: "homeActionReduceImportDetail",
    });
  }

  if (hasBatteryRisk) {
    addAction({
      score: batteryRunway.riskKey === "runwayRiskHigh" ? 98 : 78,
      tone: batteryRunway.riskKey === "runwayRiskHigh" ? "alert" : "watch",
      titleKey: "homeActionProtectBattery",
      detailKey: "homeActionProtectBatteryDetail",
    });
  }

  if (flexibleLoad.headroomKw >= 1.5 && gridForecast.importPressure < 55 && (flexibleLoad.soc === null || flexibleLoad.soc >= 45)) {
    addAction({
      score: 90 + Math.min(12, flexibleLoad.headroomKw * 3),
      tone: "good",
      titleKey: "homeActionRunLoad",
      detailKey: "homeActionRunLoadDetail",
    });
  } else if (flexibleLoad.headroomKw >= 0.5 && gridForecast.importPressure < 55) {
    addAction({
      score: 64 + Math.min(10, flexibleLoad.headroomKw * 4),
      tone: "watch",
      titleKey: "homeActionLightLoad",
      detailKey: "homeActionLightLoadDetail",
    });
  }

  if (!gridForecast.tariff.isPeak && peakReadiness.score < 65) {
    addAction({
      score: 78 - (peakReadiness.score * 0.25) + (gridForecast.tariff.detailMinutes <= 180 ? 12 : 0),
      tone: peakReadiness.score < 45 ? "alert" : "watch",
      titleKey: "homeActionPeakPrep",
      detailKey: "homeActionPeakPrepDetail",
    });
  }

  if (tomorrowPrep.statusKey === "tomorrowPrepLimited" || tomorrowPrep.outlookKey === "poor") {
    addAction({
      score: 66,
      tone: "watch",
      titleKey: "homeActionPlanTomorrow",
      detailKey: "homeActionPlanTomorrowDetail",
      values: {
        window: t(tomorrowPrep.windowKey),
      },
    });
  } else if (tomorrowPrep.statusKey === "tomorrowPrepWaiting") {
    addAction({
      score: 42,
      tone: "neutral",
      titleKey: "homeActionWatchForecast",
      detailKey: "homeActionWatchForecastDetail",
    });
  }

  if (actions.length === 0 || (gridForecast.importPressure < 35 && !hasBatteryRisk)) {
    addAction({
      score: 36,
      tone: "neutral",
      titleKey: "homeActionSteady",
      detailKey: "homeActionSteadyDetail",
    });
  }

  const seen = new Set();
  return actions
    .sort((a, b) => b.score - a.score)
    .filter((action) => {
      if (seen.has(action.titleKey)) {
        return false;
      }
      seen.add(action.titleKey);
      return true;
    })
    .slice(0, 3);
}

function renderHomeActionQueue(payload, weatherPayload = lastWeatherPayload) {
  if (!textFields.homeActionQueueList) {
    return;
  }

  const actions = getHomeActionQueue(payload, weatherPayload);

  textFields.homeActionQueueMeta.textContent = t("homeActionQueueMeta");
  textFields.homeActionQueueList.replaceChildren(...actions.map((action, index) => {
    const item = document.createElement("li");
    const rank = document.createElement("b");
    const copy = document.createElement("div");
    const title = document.createElement("strong");
    const detail = document.createElement("small");

    item.dataset.tone = action.tone;
    rank.textContent = String(index + 1);
    title.textContent = t(action.titleKey);
    detail.textContent = interpolate(t(action.detailKey), action.values);
    copy.append(title, detail);
    item.append(rank, copy);

    return item;
  }));
}

function renderHomeJudgements(payload, weatherPayload = lastWeatherPayload) {
  if (!textFields.homeJudgementMeta) {
    return;
  }

  const judgements = getHomeJudgements(payload, weatherPayload);

  textFields.homeJudgementMeta.textContent = t("homeJudgementMeta");
  setHomeJudgementCard(
    textFields.homeJudgeLoadCard,
    textFields.homeJudgeLoadStatus,
    textFields.homeJudgeLoadDetail,
    judgements.load,
  );
  setHomeJudgementCard(
    textFields.homeJudgePeakCard,
    textFields.homeJudgePeakStatus,
    textFields.homeJudgePeakDetail,
    judgements.peak,
  );
  setHomeJudgementCard(
    textFields.homeJudgeNightCard,
    textFields.homeJudgeNightStatus,
    textFields.homeJudgeNightDetail,
    judgements.night,
  );
  setHomeJudgementCard(
    textFields.homeJudgeTomorrowCard,
    textFields.homeJudgeTomorrowStatus,
    textFields.homeJudgeTomorrowDetail,
    judgements.tomorrow,
  );
}

function getHomeState(payload) {
  const live = payload?.live ?? {};
  const history = payload?.last24Hours ?? {};
  const solarKw = getLiveKw(live.solarGeneratedKw);
  const homeKw = getLiveKw(live.homeUsageKw);
  const batteryChargeKw = getLiveKw(live.batteryChargeKw);
  const batteryDischargeKw = getLiveKw(live.batteryDischargeKw);
  const gridImportKw = getLiveKw(live.gridImportKw);
  const gridExportKw = getLiveKw(live.gridExportKw);
  const batteryRunway = getBatteryRunwayPlan(payload);
  const gridForecast = getGridImportForecast(payload);
  const flexibleLoad = getFlexibleLoadPlan(payload);
  const solarCoveragePercent = homeKw > 0.05
    ? Math.min(100, (solarKw / homeKw) * 100)
    : solarKw > 0.05 ? 100 : null;
  const recentHomeAverage = averageFinite((history.homeUsageKw ?? []).slice(-8)) ?? homeKw;
  const loadRatio = recentHomeAverage > 0.05 ? homeKw / recentHomeAverage : 1;
  const loadPressurePercent = recentHomeAverage > 0.05
    ? (homeKw / Math.max(recentHomeAverage * 1.6, 0.5)) * 100
    : (homeKw / 6) * 100;
  const batteryTone = batteryRunway.reservePercent === null
    ? "neutral"
    : batteryRunway.riskKey === "runwayRiskHigh" || batteryRunway.reservePercent < 15
      ? "alert"
      : batteryRunway.riskKey === "runwayRiskMedium" || batteryRunway.reservePercent < 35
        ? "watch"
        : "good";
  const batteryStatusKey = batteryTone === "alert"
    ? "homeStateBatteryLow"
    : batteryTone === "watch"
      ? "homeStateBatteryWatch"
      : batteryTone === "good"
        ? "homeStateBatteryGood"
        : "homeStateBatteryUnknown";
  const solarStatusKey = solarKw <= 0.05
    ? "homeStateSolarIdle"
    : gridExportKw > gridImportKw + 0.2 && gridExportKw >= 0.25
      ? "homeStateSolarExport"
      : batteryChargeKw > batteryDischargeKw + 0.1 && batteryChargeKw >= 0.25
        ? "homeStateSolarCharging"
        : solarCoveragePercent !== null && solarCoveragePercent >= 80
          ? "homeStateSolarHome"
          : "homeStateSolarWeak";
  const solarTone = solarStatusKey === "homeStateSolarIdle"
    ? "neutral"
    : solarStatusKey === "homeStateSolarWeak"
      ? "watch"
      : "good";
  const loadStatusKey = homeKw >= 4 || loadRatio >= 1.35
    ? "homeStateLoadHigh"
    : homeKw <= 1.2 && loadRatio <= 0.85
      ? "homeStateLoadLow"
      : "homeStateLoadNormal";
  const loadTone = loadStatusKey === "homeStateLoadHigh" ? "watch" : "good";
  const gridStatusKey = gridExportKw > gridImportKw + 0.1
    ? "homeStateGridExport"
    : gridImportKw > gridExportKw + 0.1
      ? "homeStateGridImport"
      : "homeStateGridBalanced";
  const gridTone = gridForecast.importPressure >= 65 && gridStatusKey === "homeStateGridImport"
    ? "alert"
    : gridStatusKey === "homeStateGridImport" || gridForecast.importPressure >= 35
      ? "watch"
      : gridStatusKey === "homeStateGridExport"
        ? "good"
        : "neutral";
  const verdictKey = flexibleLoad.headroomKw >= 0.8 && gridTone !== "alert"
    ? "homeStateVerdictUseSun"
    : batteryTone === "alert"
      ? "homeStateVerdictSaveBattery"
      : gridTone === "alert" || (gridForecast.tariff.isPeak && gridImportKw > 0.1)
        ? "homeStateVerdictAvoidGrid"
        : "homeStateVerdictSteady";
  const runwayText = batteryRunway.minutesToFloor === null && batteryRunway.statusKey !== "runwayUnavailable"
    ? t(batteryRunway.trendKey)
    : formatRunwayTime(batteryRunway.minutesToFloor);
  const batteryStatus = t(batteryStatusKey);
  const solarStatus = t(solarStatusKey);
  const loadStatus = t(loadStatusKey);
  const gridStatus = t(gridStatusKey);
  const verdictTone = verdictKey === "homeStateVerdictUseSun" || verdictKey === "homeStateVerdictSteady"
    ? "good"
    : verdictKey === "homeStateVerdictSaveBattery"
      ? "watch"
      : "alert";

  return {
    verdictKey,
    verdictTone,
    detail: interpolate(t("homeStateDetail"), {
      solar: solarStatus,
      home: formatKw(homeKw),
      battery: batteryStatus,
      grid: gridStatus,
      updated: formatTimestamp(live.updatedAt ?? payload?.generatedAt),
    }),
    battery: {
      tone: batteryTone,
      statusKey: batteryStatusKey,
      percent: batteryRunway.soc ?? 0,
      detail: interpolate(t("homeStateBatteryDetail"), {
        soc: batteryRunway.soc === null || batteryRunway.soc === undefined ? "--" : formatPercent(batteryRunway.soc),
        reserve: batteryRunway.reservePercent === null ? "--" : formatPercent(batteryRunway.reservePercent),
        runway: runwayText,
      }),
    },
    solar: {
      tone: solarTone,
      statusKey: solarStatusKey,
      percent: solarCoveragePercent ?? 0,
      detail: interpolate(t("homeStateSolarDetail"), {
        cover: formatOptionalPercent(solarCoveragePercent),
        export: formatKw(gridExportKw),
        charge: formatKw(batteryChargeKw),
      }),
    },
    load: {
      tone: loadTone,
      statusKey: loadStatusKey,
      percent: loadPressurePercent,
      detail: interpolate(t("homeStateLoadDetail"), {
        home: formatKw(homeKw),
        average: formatKw(recentHomeAverage),
        grid: formatKw(gridImportKw),
      }),
    },
    grid: {
      tone: gridTone,
      statusKey: gridStatusKey,
      percent: gridForecast.importPressure,
      detail: interpolate(t("homeStateGridDetail"), {
        tariff: gridForecast.tariff.isPeak ? t("peakNow") : t("offPeakNow"),
        pressure: formatPercent(gridForecast.importPressure),
        action: t(gridForecast.actionKey),
      }),
    },
  };
}

function renderHomeState(payload, weatherPayload = lastWeatherPayload) {
  if (!payload?.live || !textFields.homeStateVerdict) {
    return;
  }

  const state = getHomeState(payload);

  textFields.homeStateVerdict.dataset.tone = state.verdictTone;
  textFields.homeStateVerdict.textContent = t(state.verdictKey);
  textFields.homeStateDetail.textContent = state.detail;
  setHomeStateRow(
    textFields.homeStateBatteryRow,
    textFields.homeStateBatteryStatus,
    textFields.homeStateBatteryDetail,
    textFields.homeStateBatteryBar,
    state.battery,
  );
  setHomeStateRow(
    textFields.homeStateSolarRow,
    textFields.homeStateSolarStatus,
    textFields.homeStateSolarDetail,
    textFields.homeStateSolarBar,
    state.solar,
  );
  setHomeStateRow(
    textFields.homeStateLoadRow,
    textFields.homeStateLoadStatus,
    textFields.homeStateLoadDetail,
    textFields.homeStateLoadBar,
    state.load,
  );
  setHomeStateRow(
    textFields.homeStateGridRow,
    textFields.homeStateGridStatus,
    textFields.homeStateGridDetail,
    textFields.homeStateGridBar,
    state.grid,
  );
  renderHomeSourceMix(payload);
  renderHomeJudgements(payload, weatherPayload);
}

function getTomorrowPrepPlan(payload, weatherPayload = lastWeatherPayload) {
  const live = payload?.live ?? {};
  const history = payload?.last24Hours ?? {};
  const tomorrow = weatherPayload?.daily?.[1] ?? null;
  const tariff = getTariffStatus(payload?.todaySavings ?? {});
  const soc = Number(live.batterySocPercent);
  const reservePercent = Number.isFinite(soc) ? Math.max(0, soc - 20) : null;
  const recentHomeLoad = averageFinite((history.homeUsageKw ?? []).slice(-8)) ?? Number(live.homeUsageKw ?? 0);

  if (!weatherPayload?.enabled || !tomorrow) {
    return {
      score: 0,
      statusKey: "tomorrowPrepWaiting",
      outlookKey: "unknown",
      rain: null,
      cloud: null,
      soc,
      reservePercent,
      recentHomeLoad,
      tariff,
      windowKey: "tomorrowWindowOffPeak",
      actionKey: "tomorrowActionWaitWeather",
    };
  }

  const outlookScore = {
    excellent: 48,
    good: 38,
    fair: 24,
    poor: 8,
  }[tomorrow.solarOutlook] ?? 16;
  const batteryScore = reservePercent === null ? 12 : Math.max(0, Math.min(28, reservePercent * 0.7));
  const rainPenalty = Math.min(12, Number(tomorrow.precipitationProbabilityMaxPercent ?? 0) / 8);
  const loadPenalty = recentHomeLoad > 2.5 ? 8 : recentHomeLoad > 1.5 ? 4 : 0;
  const score = Math.round(Math.max(0, Math.min(100, outlookScore + batteryScore + 16 - rainPenalty - loadPenalty)));
  const statusKey = score >= 78
    ? "tomorrowPrepReady"
    : score >= 58
      ? "tomorrowPrepGood"
      : score >= 38
        ? "tomorrowPrepWatch"
        : "tomorrowPrepLimited";
  const windowKey = tomorrow.solarOutlook === "excellent" || tomorrow.solarOutlook === "good"
    ? "tomorrowWindowSolar"
    : tomorrow.solarOutlook === "fair"
      ? "tomorrowWindowLightOnly"
      : "tomorrowWindowOffPeak";
  const actionKey = tomorrow.solarOutlook === "poor"
    ? "tomorrowActionAvoidHeavy"
    : reservePercent !== null && reservePercent < 25
      ? "tomorrowActionSaveBattery"
      : "tomorrowActionUseSolar";

  return {
    score,
    statusKey,
    outlookKey: tomorrow.solarOutlook ?? "unknown",
    rain: tomorrow.precipitationProbabilityMaxPercent,
    cloud: tomorrow.cloudCoverMeanPercent,
    soc,
    reservePercent,
    recentHomeLoad,
    tariff,
    windowKey,
    actionKey,
  };
}

function renderTomorrowPrep(payload, weatherPayload = lastWeatherPayload) {
  if (!payload?.live) {
    return;
  }

  const plan = getTomorrowPrepPlan(payload, weatherPayload);
  textFields.tomorrowPrepStatus.textContent = t(plan.statusKey);
  textFields.tomorrowPrepScore.textContent = `${plan.score}/100`;
  textFields.tomorrowPrepBar.style.width = `${plan.score.toFixed(1)}%`;
  textFields.tomorrowPrepDetail.textContent = interpolate(t("tomorrowPrepDetail"), {
    outlook: t(plan.outlookKey),
    rain: formatOptionalPercent(plan.rain),
    cloud: formatOptionalPercent(plan.cloud),
  });
  textFields.tomorrowPrepMeta.textContent = interpolate(t("tomorrowPrepMeta"), {
    soc: Number.isFinite(plan.soc) ? formatPercent(plan.soc) : "--",
    load: formatKw(plan.recentHomeLoad),
    tariff: plan.tariff.isPeak ? t("peakNow") : t("offPeakNow"),
  });
  textFields.tomorrowPrepWeather.textContent = t(plan.outlookKey);
  textFields.tomorrowPrepReserve.textContent = plan.reservePercent === null ? "--" : formatPercent(plan.reservePercent);
  textFields.tomorrowPrepWindow.textContent = t(plan.windowKey);
  textFields.tomorrowPrepAction.textContent = t(plan.actionKey);
}

function setActionBoardCard(card, statusElement, detailElement, tone, statusKey, detail) {
  card.dataset.tone = tone;
  statusElement.textContent = t(statusKey);
  detailElement.textContent = detail;
}

function getActionBoardPriority({ flexibleLoad, batteryRunway, gridForecast, tomorrowPrep }) {
  if (gridForecast.importPressure >= 65) {
    return "actionBoardReduceImport";
  }

  if (batteryRunway.riskKey === "runwayRiskHigh" || (batteryRunway.reservePercent !== null && batteryRunway.reservePercent < 20)) {
    return "actionBoardProtectBattery";
  }

  if (flexibleLoad.headroomKw >= 0.8 && flexibleLoad.statusKey !== "loadPlanAvoidPeak") {
    return "actionBoardUseSurplus";
  }

  if (tomorrowPrep.statusKey === "tomorrowPrepReady" || tomorrowPrep.statusKey === "tomorrowPrepGood") {
    return "actionBoardPlanTomorrow";
  }

  return "actionBoardAllGood";
}

function renderActionBoard(payload, weatherPayload = lastWeatherPayload) {
  if (!payload?.live) {
    return;
  }

  const flexibleLoad = getFlexibleLoadPlan(payload);
  const batteryReserve = getBatteryReservePlan(payload);
  const batteryRunway = getBatteryRunwayPlan(payload);
  const gridForecast = getGridImportForecast(payload);
  const tomorrowPrep = getTomorrowPrepPlan(payload, weatherPayload);
  const priorityKey = getActionBoardPriority({
    flexibleLoad,
    batteryRunway,
    gridForecast,
    tomorrowPrep,
  });
  const gridSummary = gridForecast.importPressure >= 65
    ? t("gridForecastHigh")
    : gridForecast.importPressure >= 35
      ? t("gridForecastWatch")
      : t("gridForecastLow");
  const batterySummary = batteryRunway.reservePercent === null
    ? "--"
    : formatPercent(batteryRunway.reservePercent);

  textFields.actionBoardStatus.textContent = t(priorityKey);
  textFields.actionBoardDetail.textContent = interpolate(t("actionBoardDetail"), {
    priority: t(priorityKey),
    grid: gridSummary,
    battery: batterySummary,
    tomorrow: t(tomorrowPrep.statusKey),
  });

  const nowUseSolar = flexibleLoad.headroomKw >= 0.8 && gridForecast.importPressure < 45;
  const nowReduceImport = gridForecast.importPressure >= 55;
  setActionBoardCard(
    textFields.actionBoardNowCard,
    textFields.actionBoardNowStatus,
    textFields.actionBoardNowDetail,
    nowReduceImport ? "alert" : nowUseSolar ? "good" : "neutral",
    nowReduceImport ? "actionNowReduceImport" : nowUseSolar ? "actionNowUseSolar" : "actionNowWait",
    nowReduceImport
      ? interpolate(t("actionNowReduceImportDetail"), {
        pressure: formatPercent(gridForecast.importPressure),
        grid: gridForecast.gridFlow,
      })
      : nowUseSolar
        ? interpolate(t("actionNowUseSolarDetail"), {
          headroom: formatKw(flexibleLoad.headroomKw),
        })
        : t("actionNowWaitDetail"),
  );

  const batteryShouldSave = batteryRunway.riskKey === "runwayRiskHigh"
    || (batteryRunway.reservePercent !== null && batteryRunway.reservePercent < 25);
  setActionBoardCard(
    textFields.actionBoardBatteryCard,
    textFields.actionBoardBatteryStatus,
    textFields.actionBoardBatteryDetail,
    batteryShouldSave ? "alert" : batteryRunway.riskKey === "runwayRiskMedium" ? "watch" : "good",
    batteryShouldSave ? "actionBatterySave" : "actionBatteryUse",
    batteryShouldSave
      ? interpolate(t("actionBatterySaveDetail"), {
        reserve: batteryRunway.reservePercent === null ? "--" : formatPercent(batteryRunway.reservePercent),
        risk: t(batteryRunway.riskKey),
      })
      : interpolate(t("actionBatteryUseDetail"), {
        reserve: batteryReserve.reservePercent === null ? "--" : formatPercent(batteryReserve.reservePercent),
        mode: t(batteryReserve.modeKey),
      }),
  );

  const tariff = gridForecast.tariff;
  setActionBoardCard(
    textFields.actionBoardPeakCard,
    textFields.actionBoardPeakStatus,
    textFields.actionBoardPeakDetail,
    tariff.isPeak && gridForecast.importPressure >= 35 ? "alert" : tariff.isPeak ? "watch" : "good",
    tariff.isPeak ? "actionPeakActive" : "actionPeakPrepare",
    tariff.isPeak
      ? interpolate(t("actionPeakActiveDetail"), {
        window: tariff.peakWindow,
        grid: gridForecast.gridFlow,
      })
      : interpolate(t("actionPeakPrepareDetail"), {
        time: formatDurationMinutes(tariff.detailMinutes),
        window: tariff.peakWindow,
      }),
  );

  const tomorrowWaiting = tomorrowPrep.statusKey === "tomorrowPrepWaiting";
  const tomorrowConserve = tomorrowPrep.statusKey === "tomorrowPrepLimited"
    || tomorrowPrep.actionKey === "tomorrowActionSaveBattery";
  setActionBoardCard(
    textFields.actionBoardTomorrowCard,
    textFields.actionBoardTomorrowStatus,
    textFields.actionBoardTomorrowDetail,
    tomorrowWaiting ? "watch" : tomorrowConserve ? "alert" : "good",
    tomorrowWaiting ? "actionTomorrowWaiting" : tomorrowConserve ? "actionTomorrowConserve" : "actionTomorrowSolar",
    tomorrowWaiting
      ? t("actionTomorrowWaitingDetail")
      : tomorrowConserve
        ? interpolate(t("actionTomorrowConserveDetail"), {
          outlook: t(tomorrowPrep.outlookKey),
        })
        : interpolate(t("actionTomorrowSolarDetail"), {
          outlook: t(tomorrowPrep.outlookKey),
          window: t(tomorrowPrep.windowKey),
        }),
  );
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

function formatTimestampTime(value) {
  if (!value) {
    return "--";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const locale = {
    en: "en-AU",
    zh: "zh-CN",
    th: "th-TH",
  }[currentLanguage] ?? "en-AU";

  return parsed.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
  });
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
    await loadSolarForecast();
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

function formatLiveMeta(payload) {
  const values = {
    liveUpdated: formatTimestamp(payload.live?.updatedAt),
    responseGenerated: formatTimestamp(payload.generatedAt),
    cacheAge: formatDataAge(payload.live?.updatedAt),
  };

  return payload.isStale || payload.source === "cache"
    ? interpolate(t("liveMetaCache"), values)
    : interpolate(t("liveMetaFresh"), values);
}

function getBatterySocLevel(value) {
  const soc = Number(value);

  if (!Number.isFinite(soc)) {
    return "unknown";
  }

  if (soc >= 60) {
    return "good";
  }

  if (soc >= 30) {
    return "medium";
  }

  return "low";
}

function renderBatterySocNow(value) {
  const level = getBatterySocLevel(value);
  const targets = [
    metricFields.kpiBatterySocNow,
    metricFields.batterySocNow,
  ].filter(Boolean);

  targets.forEach((target) => {
    const card = target.closest(".visual-kpi-card, .metric-card");

    target.textContent = formatPercent(value);
    target.classList.toggle("battery-level-good", level === "good");
    target.classList.toggle("battery-level-medium", level === "medium");
    target.classList.toggle("battery-level-low", level === "low");
    target.classList.toggle("battery-level-neutral", level === "unknown");

    if (card) {
      card.dataset.level = level;
    }
  });
}

function renderSolarProjectionMeta(values, batterySocPercent) {
  const template = t("solarProjectionMeta");
  const batteryText = formatPercent(batterySocPercent);

  if (!textFields.solarProjectionMeta) {
    return;
  }

  if (!template.includes("{battery}")) {
    textFields.solarProjectionMeta.textContent = interpolate(template, {
      ...values,
      battery: batteryText,
    });
    return;
  }

  const level = getBatterySocLevel(batterySocPercent);
  const batteryElement = document.createElement("span");
  batteryElement.className = [
    "battery-inline-value",
    level === "good" ? "battery-level-good" : "",
    level === "medium" ? "battery-level-medium" : "",
    level === "low" ? "battery-level-low" : "",
    level === "unknown" ? "battery-level-neutral" : "",
  ].filter(Boolean).join(" ");
  batteryElement.textContent = batteryText;

  const [beforeBattery, afterBattery] = template.split("{battery}");
  textFields.solarProjectionMeta.replaceChildren(
    document.createTextNode(interpolate(beforeBattery, values)),
    batteryElement,
    document.createTextNode(interpolate(afterBattery, values)),
  );
}

function renderWeather(payload) {
  lastWeatherPayload = payload;

  if (!payload?.enabled || !payload.current) {
    weatherPanel.classList.add("hidden");
    renderTomorrowPrep(lastPayload, payload);
    renderHomeState(lastPayload, payload);
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
  renderSolarProjection(lastPayload, payload, lastSolarForecastPayload);
  renderEnergyCoach(lastPayload, payload);
  renderTomorrowPrep(lastPayload, payload);
  renderHomeState(lastPayload, payload);
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

async function loadSolarForecast() {
  try {
    const response = await fetch("/api/solar-forecast");
    const payload = await response.json();

    if (!response.ok || payload.error) {
      throw new Error(payload.error || "Solar forecast request failed.");
    }

    lastSolarForecastPayload = payload;
    renderSolarProjection(lastPayload, lastWeatherPayload, payload);
  } catch {
    lastSolarForecastPayload = null;
    renderSolarProjection(lastPayload, lastWeatherPayload, null);
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
  const warningCount = getActiveWarnings(payload.warnings).length;
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

function normalizeWarning(item) {
  if (!item || typeof item !== "object" || typeof item.message !== "string") {
    return null;
  }

  const createdAt = item.createdAt;
  const createdAtTime = new Date(createdAt).getTime();

  if (!createdAt || Number.isNaN(createdAtTime) || Date.now() - createdAtTime > WARNING_MAX_AGE_MS) {
    return null;
  }

  return {
    message: item.message,
    createdAt,
    severity: item.severity || "warning",
  };
}

function getActiveWarnings(warnings) {
  return Array.isArray(warnings)
    ? warnings.map((item) => normalizeWarning(item)).filter(Boolean)
    : [];
}

function renderDataQuality(payload) {
  const quality = getDataQuality(payload);
  const activeWarnings = getActiveWarnings(payload.warnings);
  const warningCount = activeWarnings.length;
  const firstWarning = (activeWarnings[0]?.message ?? "").replace(/[.。]+$/, "");

  textFields.dataQualityPanel.dataset.tone = quality.tone;
  textFields.dataQualityStatus.textContent = t(quality.statusKey);
  textFields.dataQualityDetail.textContent = t(quality.detailKey);
  textFields.dataQualityFreshness.textContent = formatDataAge(payload.live?.updatedAt);
  textFields.dataQualitySource.textContent = payload.source ?? "--";
  textFields.dataQualityWarnings.textContent = warningCount > 0
    ? interpolate(t("warningsCount"), { count: warningCount })
    : t("noWarnings");
  textFields.dataQualityResponse.textContent = formatTimestamp(payload.generatedAt);
  textFields.dataQualityWarningDetail.textContent = warningCount === 0
    ? t("warningDetailNone")
    : interpolate(t(warningCount === 1 ? "warningDetailOne" : "warningDetailMany"), {
      count: warningCount,
      warning: firstWarning,
      time: formatTimestamp(activeWarnings[0]?.createdAt ?? payload.generatedAt),
    });
}

function renderWarnings(warnings) {
  const activeWarnings = getActiveWarnings(warnings);

  if (activeWarnings.length === 0) {
    warningBox.classList.add("hidden");
    warningBox.replaceChildren();
    return;
  }

  warningBox.classList.remove("hidden");
  warningBox.replaceChildren(
    ...activeWarnings.map((item) => {
      const warning = document.createElement("p");
      warning.dataset.severity = item.severity;
      warning.textContent = interpolate(t("warningWithCreatedAt"), {
        message: item.message.replace(/[.。]+$/, ""),
        createdAt: formatTimestamp(item.createdAt),
      });
      return warning;
    }),
  );
}

function createClientWarning(message, severity = "error") {
  return {
    message,
    createdAt: new Date().toISOString(),
    severity,
  };
}

function buildDashboardLoadWarnings(payload, message) {
  const diagnostic = payload?.diagnostic;
  if (diagnostic?.kind !== "modbus_connection") {
    return [createClientWarning(message)];
  }

  return [
    createClientWarning(interpolate(t("modbusConnectError"), {
      target: diagnostic.target ?? "--",
      timeoutMs: diagnostic.timeoutMs ?? "--",
    })),
    createClientWarning(t("modbusConnectAdviceIp"), "info"),
    createClientWarning(t("modbusConnectAdvicePort"), "info"),
    createClientWarning(t("modbusConnectAdviceRestart"), "info"),
  ];
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

const dailyTableAverageKeys = [
  "pv_production",
  "self_consumption",
  "daily_feedin",
  "home_usage",
  "grid_consumption",
  "daily_charged_energy_total",
  "daily_discharged_energy_total",
];

function getAverageDailyRow(rows) {
  const validRows = rows.filter((row) => row?.date);

  if (validRows.length === 0) {
    return null;
  }

  return dailyTableAverageKeys.reduce(
    (averageRow, key) => {
      const total = validRows.reduce((sum, row) => sum + Number(row[key] ?? 0), 0);
      averageRow[key] = total / validRows.length;

      return averageRow;
    },
    {
      date: interpolate(t("tableAverageLabel"), { count: validRows.length }),
    },
  );
}

function createDailyTableRow(cells, rowClassName = "") {
  const tableRow = document.createElement("tr");

  if (rowClassName) {
    tableRow.className = rowClassName;
  }

  cells.forEach((cell) => {
    const tableCell = document.createElement("td");

    if (cell.className) {
      tableCell.className = cell.className;
    }

    tableCell.textContent = cell.value;
    tableRow.append(tableCell);
  });

  return tableRow;
}

function renderTable(rows) {
  const maxValues = getMaxValues(rows);
  const sortedRows = sortRows(rows);
  const valueClass = (key, value) => (Number(value) === maxValues[key] && Number(value) > 0 ? "table-max" : "");
  const averageRow = getAverageDailyRow(rows);
  const averageTableRow = averageRow
    ? createDailyTableRow([
      { value: averageRow.date },
      ...dailyTableAverageKeys.map((key) => ({
        value: formatKwh(averageRow[key]),
        className: "table-average-value",
      })),
    ], "table-average-row")
    : null;

  const tableRows = sortedRows.map((row) => {
    const cells = [
      { value: row.date },
      ...dailyTableAverageKeys.map((key) => ({
        value: formatKwh(row[key]),
        className: valueClass(key, row[key]),
      })),
    ];

    return createDailyTableRow(cells);
  });

  dailyTableBody.replaceChildren(...[averageTableRow, ...tableRows].filter(Boolean));
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
    renderWarnings([createClientWarning(message)]);
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

function getRecentSolarProjectionAverage(payload) {
  const todayKey = formatLocalDateKey();
  const rows = (payload?.dailyTable ?? [])
    .filter((row) => row.date < todayKey && Number(row.pv_production) > 1)
    .slice(-7);

  if (rows.length === 0) {
    return null;
  }

  return rows.reduce((sum, row) => sum + Number(row.pv_production ?? 0), 0) / rows.length;
}

function getSolarDayWeights(now = new Date(), latitude = -33.86) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const dayStart = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((start - dayStart) / 86_400_000);
  const declination = 23.44 * Math.sin((2 * Math.PI * (284 + dayOfYear)) / 365);
  const latRad = (latitude * Math.PI) / 180;
  const decRad = (declination * Math.PI) / 180;
  const hourAngle = Math.acos(Math.max(-1, Math.min(1, -Math.tan(latRad) * Math.tan(decRad))));
  const daylightHours = (2 * hourAngle * 180) / Math.PI / 15;
  const sunrise = 12 - daylightHours / 2;
  const sunset = 12 + daylightHours / 2;
  const weights = Array.from({ length: 24 }, (_, hour) => {
    const midpoint = hour + 0.5;

    if (midpoint <= sunrise || midpoint >= sunset) {
      return 0;
    }

    const progress = (midpoint - sunrise) / Math.max(sunset - sunrise, 1);
    return Math.pow(Math.sin(progress * Math.PI), 1.35);
  });

  return { sunrise, sunset, weights };
}

function getElapsedSolarWeight(weights, now) {
  const hour = now.getHours();
  const minuteProgress = now.getMinutes() / 60;

  return weights.reduce((sum, weight, index) => {
    if (index < hour) {
      return sum + weight;
    }

    if (index === hour) {
      return sum + weight * minuteProgress;
    }

    return sum;
  }, 0);
}

function getWeatherProjectionFactor(weatherPayload) {
  const today = weatherPayload?.daily?.[0] ?? null;
  const outlookFactor = {
    excellent: 1.08,
    good: 1,
    fair: 0.86,
    poor: 0.68,
  }[today?.solarOutlook] ?? 0.95;
  const cloud = Number(today?.cloudCoverMeanPercent);
  const cloudFactor = !Number.isFinite(cloud)
    ? 1
    : cloud <= 25
      ? 1.08
      : cloud <= 55
        ? 0.98
        : cloud <= 80
          ? 0.86
          : 0.72;

  return Math.max(0.55, Math.min(1.15, outlookFactor * cloudFactor));
}

function buildSolarHourlyActual(payload, now, actualTodayKwh) {
  const labels = payload?.last24Hours?.labels ?? [];
  const values = payload?.last24Hours?.solarGeneratedKw ?? [];
  const count = Math.min(labels.length, values.length);
  const buckets = Array.from({ length: 24 }, () => 0);

  if (count < 2) {
    return buckets;
  }

  const endTime = new Date(now).getTime();
  const startTime = endTime - 24 * 60 * 60 * 1000;
  const stepMs = (endTime - startTime) / Math.max(count - 1, 1);
  const todayKey = formatLocalDateKey(now);

  for (let index = 1; index < count; index += 1) {
    const sampleTime = new Date(startTime + stepMs * index);

    if (formatLocalDateKey(sampleTime) !== todayKey) {
      continue;
    }

    const previous = Number(values[index - 1] ?? 0);
    const current = Number(values[index] ?? 0);
    const averageKw = Math.max(0, (previous + current) / 2);
    const hours = stepMs / 3_600_000;
    buckets[sampleTime.getHours()] += averageKw * hours;
  }

  const integrated = buckets.reduce((sum, value) => sum + value, 0);

  if (integrated > 0.1 && actualTodayKwh > 0) {
    const scale = actualTodayKwh / integrated;
    return buckets.map((value) => value * scale);
  }

  return buckets;
}

function getRecentAverageValue(values, fallback = 0) {
  const validValues = values
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value >= 0);

  if (validValues.length === 0) {
    return fallback;
  }

  return validValues.reduce((sum, value) => sum + value, 0) / validValues.length;
}

function getPercentileValue(values, percentile, fallback = null) {
  const validValues = values
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value >= 0)
    .sort((a, b) => a - b);

  if (validValues.length === 0) {
    return fallback;
  }

  const index = Math.min(
    validValues.length - 1,
    Math.max(0, Math.round((validValues.length - 1) * percentile)),
  );

  return validValues[index];
}

function getEveningBaselineHomeKw(payload) {
  const samples = payload?.last24Hours?.homeUsageKw ?? [];
  const liveHomeKw = Number(payload?.live?.homeUsageKw);
  const fallback = Number.isFinite(liveHomeKw) && liveHomeKw > 0 ? liveHomeKw : 0.8;
  const recentBaseline = getPercentileValue(samples.slice(-240), 0.35, fallback);
  const dailyBaseline = getPercentileValue(samples.slice(-720), 0.25, recentBaseline);
  const candidates = [recentBaseline, dailyBaseline, fallback]
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);
  const baseline = candidates.length > 0
    ? candidates.reduce((sum, value) => sum + value, 0) / candidates.length
    : fallback;

  return Math.max(0.35, Math.min(1.35, baseline));
}

function buildBatteryHourlyActual(payload, now) {
  const values = payload?.last24Hours?.batteryLevelPercent ?? [];
  const count = values.length;
  const buckets = Array.from({ length: 24 }, () => null);

  if (count < 2) {
    return buckets;
  }

  const endTime = new Date(now).getTime();
  const startTime = endTime - 24 * 60 * 60 * 1000;
  const stepMs = (endTime - startTime) / Math.max(count - 1, 1);
  const todayKey = formatLocalDateKey(now);

  for (let index = 0; index < count; index += 1) {
    const sampleTime = new Date(startTime + stepMs * index);

    if (formatLocalDateKey(sampleTime) !== todayKey) {
      continue;
    }

    const soc = Number(values[index]);

    if (Number.isFinite(soc)) {
      buckets[sampleTime.getHours()] = Number(clampPercentValue(soc).toFixed(0));
    }
  }

  let lastValue = null;

  return buckets.map((value, hour) => {
    if (value !== null) {
      lastValue = value;
    }

    return hour <= now.getHours() ? lastValue : null;
  });
}

function getSolarWeightShareForHour(weights, hour, currentHour) {
  if (hour <= currentHour) {
    return 0;
  }

  const remainingWeight = weights
    .slice(currentHour + 1)
    .reduce((sum, value) => sum + value, 0);

  return remainingWeight > 0 ? weights[hour] / remainingWeight : 0;
}

function getLastKnownValue(values, fallback = null) {
  for (let index = values.length - 1; index >= 0; index -= 1) {
    if (values[index] !== null && values[index] !== undefined) {
      return values[index];
    }
  }

  return fallback;
}

function buildBatteryProjection(payload, now, weights, remainingSolarKwh) {
  const actualBattery = buildBatteryHourlyActual(payload, now);
  const currentSoc = Number(payload?.live?.batterySocPercent);

  if (!Number.isFinite(currentSoc)) {
    return {
      series: actualBattery,
      eveningSoc: null,
    };
  }

  const currentHour = now.getHours();
  const eveningBaselineHomeKw = getEveningBaselineHomeKw(payload);
  const estimatedChargeKwh = Math.max(0, remainingSolarKwh - eveningBaselineHomeKw * 1.8) * 0.82;
  const series = [...actualBattery];
  let projectedSoc = clampPercentValue(currentSoc);
  const eveningHour = 21;

  for (let hour = currentHour + 1; hour < 24; hour += 1) {
    const solarChargeKwh = estimatedChargeKwh * getSolarWeightShareForHour(weights, hour, currentHour);
    const eveningUseKwh = hour >= 17 && hour <= eveningHour ? eveningBaselineHomeKw * 0.9 : 0;
    const deltaSoc = ((solarChargeKwh - eveningUseKwh) / BATTERY_ESTIMATE_CAPACITY_KWH) * 100;

    projectedSoc = clampPercentValue(projectedSoc + deltaSoc);
    series[hour] = Number(projectedSoc.toFixed(0));
  }

  return {
    series,
    eveningSoc: series[eveningHour] ?? getLastKnownValue(series, projectedSoc),
  };
}

function getEndOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

function getSolcastRemainingProjection(solarForecastPayload, now) {
  const points = solarForecastPayload?.enabled ? solarForecastPayload.points ?? [] : [];
  const hourlyKwh = Array.from({ length: 24 }, () => 0);
  const dayStartMs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const nowMs = now.getTime();
  const endMs = getEndOfLocalDay(now).getTime();
  let elapsedKwh = 0;

  if (points.length === 0 || endMs <= dayStartMs) {
    return {
      hourlyKwh,
      elapsedKwh: 0,
      remainingKwh: 0,
      totalKwh: 0,
    };
  }

  points.forEach((point) => {
    const periodEndMs = new Date(point.periodEnd).getTime();
    const periodHours = Number(point.periodHours);
    const pvPowerKw = Number(point.pvPowerKw);

    if (!Number.isFinite(periodEndMs) || !Number.isFinite(periodHours) || !Number.isFinite(pvPowerKw)) {
      return;
    }

    const periodStartMs = periodEndMs - periodHours * 3_600_000;
    let cursorMs = Math.max(periodStartMs, dayStartMs);
    const clippedEndMs = Math.min(periodEndMs, endMs);

    while (cursorMs < clippedEndMs) {
      const cursorDate = new Date(cursorMs);
      const nextHourMs = new Date(
        cursorDate.getFullYear(),
        cursorDate.getMonth(),
        cursorDate.getDate(),
        cursorDate.getHours() + 1,
      ).getTime();
      const segmentEndMs = Math.min(clippedEndMs, nextHourMs);
      const segmentHours = (segmentEndMs - cursorMs) / 3_600_000;
      const segmentKwh = Math.max(0, pvPowerKw) * segmentHours;

      hourlyKwh[cursorDate.getHours()] += segmentKwh;

      if (cursorMs < nowMs) {
        const elapsedSegmentEndMs = Math.min(segmentEndMs, nowMs);
        const elapsedSegmentHours = Math.max(0, (elapsedSegmentEndMs - cursorMs) / 3_600_000);
        elapsedKwh += Math.max(0, pvPowerKw) * elapsedSegmentHours;
      }

      cursorMs = segmentEndMs;
    }
  });

  const totalKwh = hourlyKwh.reduce((sum, value) => sum + value, 0);

  return {
    hourlyKwh,
    elapsedKwh,
    remainingKwh: Math.max(0, totalKwh - elapsedKwh),
    totalKwh,
  };
}

function getSolarDispatchPlan(payload, projection) {
  const tariff = getTariffStatus(payload?.todaySavings ?? {});
  const soc = Number(payload?.live?.batterySocPercent);
  const eveningSoc = Number(projection.eveningBatteryPercent);
  const hasBattery = Number.isFinite(soc);
  const hasEveningBattery = Number.isFinite(eveningSoc);
  const correction = projection.correctionFactor;
  const correctionDrift = Number.isFinite(correction) ? Math.abs(correction - 1) : 0;
  const reserveTarget = hasEveningBattery
    ? Math.max(30, Math.min(70, eveningSoc < 45 ? 60 : 45))
    : 45;

  if (
    projection.source === "dual" &&
    projection.correctedSolcastRemainingKwh >= 5 &&
    (!hasBattery || soc >= 55) &&
    !tariff.isPeak
  ) {
    return {
      actionKey: "solarDispatchUseSurplus",
      detailKey: "solarDispatchUseSurplusDetail",
      reserveTarget,
      tariff,
    };
  }

  if ((hasEveningBattery && eveningSoc < 38) || (hasBattery && soc < 35 && tariff.isPeak)) {
    return {
      actionKey: "solarDispatchHoldBattery",
      detailKey: "solarDispatchHoldBatteryDetail",
      reserveTarget,
      tariff,
    };
  }

  if (
    projection.source === "dual" &&
    projection.correctedSolcastRemainingKwh < 2.5 &&
    hasBattery &&
    soc < 50 &&
    !tariff.isPeak
  ) {
    return {
      actionKey: "solarDispatchChargeOffPeak",
      detailKey: "solarDispatchChargeOffPeakDetail",
      reserveTarget: Math.max(reserveTarget, 55),
      tariff,
    };
  }

  if (projection.source === "dual" && correctionDrift >= 0.22) {
    return {
      actionKey: "solarDispatchWatch",
      detailKey: "solarDispatchWatchDetail",
      reserveTarget,
      tariff,
    };
  }

  return {
    actionKey: "solarDispatchSteady",
    detailKey: "solarDispatchSteadyDetail",
    reserveTarget,
    tariff,
  };
}

function getSolarProjection(payload, weatherPayload = lastWeatherPayload, solarForecastPayload = lastSolarForecastPayload) {
  const now = new Date(payload?.live?.updatedAt ?? payload?.generatedAt ?? Date.now());
  const currentHour = now.getHours();
  const todayKwh = Number(payload?.today?.solarProductionKwh ?? 0);
  const { weights } = getSolarDayWeights(now, weatherPayload?.location?.latitude ?? -33.86);
  const totalWeight = weights.reduce((sum, value) => sum + value, 0);
  const elapsedWeight = getElapsedSolarWeight(weights, now);
  const progressFraction = totalWeight > 0 ? Math.min(0.98, Math.max(0.02, elapsedWeight / totalWeight)) : 0.5;
  const progressEstimate = todayKwh / progressFraction;
  const recentAverage = getRecentSolarProjectionAverage(payload);
  const weatherEstimate = recentAverage === null
    ? progressEstimate
    : recentAverage * getWeatherProjectionFactor(weatherPayload);
  const currentSolarKw = Number(payload?.live?.solarGeneratedKw ?? 0);
  const liveBoost = currentSolarKw >= 3 ? 1.06 : currentSolarKw >= 1 ? 1 : 0.94;
  const blendedEstimate = ((progressEstimate * 0.7) + (weatherEstimate * 0.3)) * liveBoost;
  const localEstimateKwh = Math.max(todayKwh, Math.min(
    Math.max(todayKwh + 0.2, blendedEstimate),
    Math.max(todayKwh + 0.2, (recentAverage ?? blendedEstimate) * 1.35),
  ));
  const solcastRemaining = getSolcastRemainingProjection(solarForecastPayload, now);
  const solcastExpectedSoFarKwh = solcastRemaining.elapsedKwh;
  const rawCorrectionFactor = solcastExpectedSoFarKwh >= 0.5
    ? todayKwh / solcastExpectedSoFarKwh
    : null;
  const correctionFactor = rawCorrectionFactor === null
    ? 1
    : Math.max(0.65, Math.min(1.35, rawCorrectionFactor));
  const correctedSolcastRemainingKwh = solcastRemaining.remainingKwh * correctionFactor;
  const solcastEstimateKwh = todayKwh + solcastRemaining.remainingKwh;
  const trustedEstimateKwh = todayKwh + correctedSolcastRemainingKwh;
  const hasSolcastProjection = Boolean(
    solarForecastPayload?.enabled &&
    solarForecastPayload?.source === "solcast" &&
    solcastRemaining.remainingKwh > 0,
  );
  const estimateKwh = hasSolcastProjection
    ? Math.max(todayKwh, (localEstimateKwh * 0.35) + (trustedEstimateKwh * 0.65))
    : localEstimateKwh;
  const remainingKwh = Math.max(0, estimateKwh - todayKwh);
  const confidence = payload?.last24Hours?.solarGeneratedKw?.length >= 180 && todayKwh >= 2 && (!hasSolcastProjection || solcastExpectedSoFarKwh >= 0.5)
    ? "high"
    : hasSolcastProjection || payload?.last24Hours?.solarGeneratedKw?.length >= 60
      ? "medium"
      : "low";
  const actualHourly = buildSolarHourlyActual(payload, now, todayKwh);
  const labels = Array.from({ length: 24 }, (_, hour) => `${String(hour).padStart(2, "0")}:00`);
  let actualRunning = 0;
  const actualCumulative = actualHourly.map((value, hour) => {
    actualRunning += value;
    return hour <= currentHour ? Number(actualRunning.toFixed(2)) : null;
  });
  const remainingWeight = weights
    .slice(currentHour + 1)
    .reduce((sum, value) => sum + value, 0);
  const solcastShapeTotal = solcastRemaining.hourlyKwh
    .slice(currentHour + 1)
    .reduce((sum, value) => sum + value, 0);
  let projectedRunning = todayKwh;
  const projectedCumulative = weights.map((weight, hour) => {
    if (hour <= currentHour) {
      return actualCumulative[hour];
    }

    const increment = hasSolcastProjection && solcastShapeTotal > 0
      ? (remainingKwh * solcastRemaining.hourlyKwh[hour]) / solcastShapeTotal
      : remainingWeight > 0
        ? (remainingKwh * weight) / remainingWeight
        : 0;
    projectedRunning += increment;
    return Number(projectedRunning.toFixed(2));
  });
  const batteryProjection = buildBatteryProjection(payload, now, weights, remainingKwh);

  const projection = {
    labels,
    actualCumulative,
    projectedCumulative,
    targetLine: labels.map(() => Number(estimateKwh.toFixed(2))),
    batteryPercent: batteryProjection.series,
    eveningBatteryPercent: batteryProjection.eveningSoc,
    currentHour,
    estimateKwh,
    remainingKwh,
    todayKwh,
    recentAverage,
    confidence,
    source: hasSolcastProjection ? "dual" : "local",
    localEstimateKwh,
    solcastEstimateKwh: hasSolcastProjection ? solcastEstimateKwh : null,
    trustedEstimateKwh: hasSolcastProjection ? trustedEstimateKwh : null,
    solcastExpectedSoFarKwh: hasSolcastProjection ? solcastExpectedSoFarKwh : null,
    solcastRemainingKwh: hasSolcastProjection ? solcastRemaining.remainingKwh : null,
    correctedSolcastRemainingKwh: hasSolcastProjection ? correctedSolcastRemainingKwh : 0,
    correctionFactor: hasSolcastProjection ? correctionFactor : null,
    dispatchPlan: null,
  };

  projection.dispatchPlan = getSolarDispatchPlan(payload, projection);

  return projection;
}

function renderSolarDispatchPlan(projection) {
  if (!textFields.solarDispatchAction) {
    return;
  }

  const plan = projection.dispatchPlan;
  const hasSolcast = projection.source === "dual";
  const correctionPercent = Number.isFinite(projection.correctionFactor)
    ? projection.correctionFactor * 100
    : null;

  textFields.solarDispatchAction.textContent = plan ? t(plan.actionKey) : "--";
  textFields.solarDispatchDetail.textContent = plan ? t(plan.detailKey) : "--";
  textFields.solarDispatchCorrection.textContent = hasSolcast && correctionPercent !== null
    ? formatPercent(correctionPercent)
    : "--";
  textFields.solarDispatchCorrectionDetail.textContent = hasSolcast && projection.solcastExpectedSoFarKwh >= 0.5
    ? interpolate(t("solarDispatchCorrectionDetail"), {
      actual: formatKwh(projection.todayKwh),
      expected: formatKwh(projection.solcastExpectedSoFarKwh),
    })
    : t("solarDispatchCorrectionUnavailable");
  textFields.solarDispatchSolcastRemaining.textContent = hasSolcast
    ? formatKwh(projection.correctedSolcastRemainingKwh)
    : "--";
  textFields.solarDispatchSolcastDetail.textContent = hasSolcast
    ? interpolate(t("solarDispatchSolcastDetail"), {
      raw: formatKwh(projection.solcastRemainingKwh),
      corrected: formatKwh(projection.correctedSolcastRemainingKwh),
    })
    : t("solarDispatchSolcastUnavailable");

  if (plan && hasSolcast && projection.eveningBatteryPercent !== null) {
    textFields.solarDispatchPredbat.textContent = t("solarDispatchPredbatReady");
    textFields.solarDispatchPredbatDetail.textContent = interpolate(t("solarDispatchPredbatDetail"), {
      estimate: formatKwh(projection.trustedEstimateKwh ?? projection.estimateKwh),
      reserve: formatPercent(plan.reserveTarget),
      tariff: plan.tariff.isPeak ? t("peakNow") : t("offPeakNow"),
    });
  } else {
    textFields.solarDispatchPredbat.textContent = t("solarDispatchPredbatWaiting");
    textFields.solarDispatchPredbatDetail.textContent = t("solarDispatchPredbatWaitingDetail");
  }
}

function renderSolarProjection(payload, weatherPayload = lastWeatherPayload, solarForecastPayload = lastSolarForecastPayload) {
  const chartElement = document.getElementById("solarProjectionChart");

  if (!payload || !chartElement) {
    return;
  }

  const projection = getSolarProjection(payload, weatherPayload, solarForecastPayload);
  const weatherToday = weatherPayload?.daily?.[0] ?? weatherPayload?.current ?? null;
  const inverterStatus = payload.device?.status === "online" ? t("online") : t(payload.device?.status ?? "unknown");

  metricFields.solarProjectionActual.textContent = formatKwh(projection.todayKwh);
  metricFields.solarProjectionEstimate.textContent = formatKwh(projection.estimateKwh);
  metricFields.solarProjectionRemaining.textContent = formatKwh(projection.remainingKwh);
  metricFields.solarProjectionEveningBattery.textContent = projection.eveningBatteryPercent === null
    ? "--"
    : formatPercent(projection.eveningBatteryPercent);
  metricFields.solarProjectionConfidence.textContent = t(`solarProjectionConfidence${projection.confidence[0].toUpperCase()}${projection.confidence.slice(1)}`);
  textFields.solarProjectionSummary.textContent = projection.todayKwh > 0
    ? interpolate(t("solarProjectionSummary"), {
      estimate: formatKwh(projection.estimateKwh),
      remaining: formatKwh(projection.remainingKwh),
      battery: projection.eveningBatteryPercent === null ? "--" : formatPercent(projection.eveningBatteryPercent),
    })
    : t("solarProjectionNoData");
  renderSolarProjectionMeta({
    solar: formatKw(payload.live?.solarGeneratedKw),
    inverter: inverterStatus,
    weather: t(weatherToday?.solarOutlook ?? "unknown"),
    cloud: formatOptionalPercent(weatherToday?.cloudCoverMeanPercent ?? weatherToday?.cloudCoverPercent),
    average: projection.recentAverage === null ? "--" : formatKwh(projection.recentAverage),
    source: projection.source === "dual" ? t("solarProjectionSourceDual") : t("solarProjectionSourceLocal"),
  }, payload.live?.batterySocPercent);
  renderSolarDispatchPlan(projection);

  destroyChart(solarProjectionChart);
  const projectionChartOptions = getChartOptions(t("dailyEnergyKwh"));
  projectionChartOptions.plugins.tooltip.callbacks.label = (context) => {
    const value = Number(context.parsed.y ?? 0);
    const unit = context.dataset.yAxisID === "percent" ? "%" : "kWh";

    return `${context.dataset.label}: ${unit === "%" ? value.toFixed(0) : value.toFixed(2)} ${unit}`;
  };
  projectionChartOptions.scales.percent = {
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
  };
  solarProjectionChart = new Chart(chartElement.getContext("2d"), {
    type: "line",
    data: {
      labels: projection.labels,
      datasets: [
        {
          label: t("solarProjectionActualSeries"),
          data: projection.actualCumulative,
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245, 158, 11, 0.14)",
          fill: true,
          yAxisID: "y",
          tension: 0.25,
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: t("solarProjectionEstimateSeries"),
          data: projection.projectedCumulative,
          borderColor: "#0f766e",
          backgroundColor: "rgba(15, 118, 110, 0.1)",
          borderDash: [6, 4],
          yAxisID: "y",
          tension: 0.25,
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: t("solarProjectionTargetSeries"),
          data: projection.targetLine,
          borderColor: "rgba(15, 23, 42, 0.45)",
          borderDash: [2, 5],
          yAxisID: "y",
          pointRadius: 0,
          borderWidth: 1.5,
        },
        {
          label: t("solarProjectionBatterySeries"),
          data: projection.batteryPercent,
          borderColor: "#7c3aed",
          backgroundColor: "rgba(124, 58, 237, 0.08)",
          yAxisID: "percent",
          tension: 0.22,
          pointRadius: 0,
          borderWidth: 2,
          segment: {
            borderDash: (context) => (context.p0DataIndex >= projection.currentHour ? [6, 4] : []),
          },
        },
      ],
    },
    options: projectionChartOptions,
  });
}

function renderCharts(payload) {
  destroyChart(energyChart);
  destroyChart(last24HoursChart);

  const energyContext = document.getElementById("energyChart").getContext("2d");
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
  const batteryCharged = Number(today.energyGoingIntoBatteryKwh ?? 0);
  const batteryDischarged = Number(today.energyComingOutOfBatteryKwh ?? 0);
  const batteryNetKwh = batteryCharged - batteryDischarged;
  const selfSufficiency = calculateSelfSufficiency(today);
  const netGridKwh = Number(today.returnToGridKwh ?? 0) - Number(today.gridConsumptionKwh ?? 0);
  const isNetExporter = netGridKwh >= 0;
  const batteryModeKey = Math.abs(batteryNetKwh) < 0.05
    ? "batteryNetBalancedShort"
    : batteryNetKwh > 0
      ? "batteryNetChargedShort"
      : "batteryNetDischargedShort";

  metricFields.kpiDailySolar.textContent = formatKwh(today.solarProductionKwh);
  metricFields.kpiDailyConsumption.textContent = formatKwh(homeUsage);
  metricFields.kpiDailyBattery.textContent = formatKwh(Math.abs(batteryNetKwh));
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
  metricFields.kpiDailyBattery.closest(".visual-kpi-card").dataset.mode = batteryNetKwh > 0.05
    ? "charged"
    : batteryNetKwh < -0.05
      ? "discharged"
      : "balanced";
  textFields.kpiDailyBatteryMeta.textContent = `${t(batteryModeKey)} · ${interpolate(t("batteryKpiDetail"), {
    charged: formatKwh(batteryCharged),
    discharged: formatKwh(batteryDischarged),
  })}`;
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
  textFields.energyScoreBatteryFactor.dataset.level = energyScore.batterySoc === null
    ? "unknown"
    : energyScore.batterySoc >= 60
      ? "high"
      : energyScore.batterySoc >= 35
        ? "medium"
        : "low";
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

  renderBatterySocNow(payload.live.batterySocPercent);
  metricFields.solarNow.textContent = formatKw(payload.live.solarGeneratedKw);
  metricFields.homeNow.textContent = formatKw(payload.live.homeUsageKw);
  metricFields.gridImportNow.textContent = formatKw(payload.live.gridImportKw);
  metricFields.gridExportNow.textContent = formatKw(payload.live.gridExportKw);
  metricFields.batteryChargeNow.textContent = formatKw(payload.live.batteryChargeKw);
  metricFields.batteryDischargeNow.textContent = formatKw(payload.live.batteryDischargeKw);

  metricFields.todaySolar.textContent = formatKwh(payload.today.solarProductionKwh);
  metricFields.todayFeedin.textContent = formatKwh(payload.today.returnToGridKwh);
  metricFields.todayHome.textContent = formatKwh(payload.today.homeUsageKwh);
  metricFields.todayGrid.textContent = formatKwh(payload.today.gridConsumptionKwh);
  metricFields.todayBatteryCharge.textContent = formatKwh(payload.today.energyGoingIntoBatteryKwh);
  metricFields.todayBatteryDischarge.textContent = formatKwh(payload.today.energyComingOutOfBatteryKwh);

  textFields.currentDateTime.textContent = formatCurrentDateTime();
  textFields.deviceTitle.textContent = payload.device.stationName;
  textFields.deviceMeta.textContent = `${payload.device.deviceType} • ${payload.device.productType} • SN ${payload.device.deviceSN}`;
  textFields.liveMeta.textContent = formatLiveMeta(payload);

  renderBadges(payload);
  renderWarnings(payload.warnings);
  renderVisualKpis(payload);
  renderHomeState(payload);
  renderTariffTimeline(payload.todaySavings);
  renderTrendSnapshot(payload);
  renderOperationalHeatmap(payload);
  renderEnergyTimeline(payload);
  renderSolarCalendar(payload);
  renderWeekdayProfile(payload);
  renderPeakReadiness(payload);
  renderBatteryReservePlan(payload);
  renderBatteryRunwayPlan(payload);
  renderGridImportForecast(payload);
  renderTomorrowPrep(payload);
  renderGaugeCards(payload);
  renderEnergyInsights(payload);
  renderEnergyCoach(payload);
  renderBalanceBars(payload);
  renderSolarPerformance(payload);
  renderEnergyFlow(payload);
  renderCharts(payload);
  renderSolarProjection(payload);
  currentRows = getVisibleRows(payload.dailyTable, payload);
  renderTable(currentRows);
}

async function loadDashboard() {
  if (isDashboardLoading) {
    return;
  }

  isDashboardLoading = true;
  refreshButton.disabled = true;
  statusText.textContent = t("loading");

  try {
    const [year, month] = monthPicker.value.split("-");
    const response = await fetch(`/api/dashboard?year=${year}&month=${Number(month)}`);
    const payload = await response.json();

    if (!response.ok || payload.error) {
      const message = payload.error || "Dashboard request failed.";
      const loadError = new Error(message);
      loadError.dashboardWarnings = buildDashboardLoadWarnings(payload, message);
      throw loadError;
    }

    renderMetrics(payload);
    lastPayload = payload;
    await loadTariffSettings();
    await loadWeatherSettings();
    await loadWeather();
    await loadSolarForecast();
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
    renderWarnings(error?.dashboardWarnings ?? [createClientWarning(message)]);
  } finally {
    isDashboardLoading = false;
    refreshButton.disabled = false;
    scheduleAutoRefresh();
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

function updateAutoRefreshText() {
  if (!autoRefreshText || !nextAutoRefreshAt) {
    return;
  }

  autoRefreshText.textContent = interpolate(t("autoRefreshNext"), {
    time: formatTimestampTime(nextAutoRefreshAt),
  });
}

function scheduleAutoRefresh() {
  if (autoRefreshTimer) {
    window.clearTimeout(autoRefreshTimer);
  }

  nextAutoRefreshAt = new Date(Date.now() + AUTO_REFRESH_INTERVAL_MS);
  updateAutoRefreshText();
  autoRefreshTimer = window.setTimeout(() => {
    void loadDashboard();
  }, AUTO_REFRESH_INTERVAL_MS);
}

function resizeChartsAfterPanelOpen() {
  window.requestAnimationFrame(() => {
    energyChart?.resize();
    last24HoursChart?.resize();
  });
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
    renderWarnings([createClientWarning(message)]);
  });
});
periodRangeSelect.addEventListener("change", () => {
  tableRangeSelect.value = periodRangeSelect.value;
  setStoredValue(storageKeys.tableRange, tableRangeSelect.value);
  loadEnergyRange().catch((error) => {
    const message = error instanceof Error ? error.message : "Unknown error";
    statusText.textContent = `${t("unableToLoad")}: ${message}`;
    renderWarnings([createClientWarning(message)]);
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
  updateAutoRefreshText();
});
window.setInterval(() => {
  textFields.currentDateTime.textContent = formatCurrentDateTime();
  updateAutoRefreshText();
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
document.querySelectorAll(".deep-analysis-panel").forEach((details) => {
  details.addEventListener("toggle", () => {
    if (details.open) {
      resizeChartsAfterPanelOpen();
    }
  });
});

setDefaultMonth();
applyStoredPreferences();
applyLanguage();
loadDashboard();
