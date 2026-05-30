export interface FoxCloudEnvelope<T> {
  errno: number;
  msg?: string;
  result: T;
}

export interface FoxCloudDeviceListResponse {
  currentPage: number;
  pageSize: number;
  total: number;
  data: FoxCloudDevice[];
}

export interface FoxCloudDevice {
  deviceSN: string;
  moduleSN: string;
  stationID: string;
  stationName: string;
  status: 1 | 2 | 3;
  hasPV: boolean;
  hasBattery: boolean;
  deviceType: string;
  productType: string;
}

export interface FoxCloudPlantDetail {
  stationName: string;
  timezone: string;
  createDate: string;
}

export interface FoxCloudRealtimeDataPoint {
  variable: string;
  unit: string;
  name: string;
  value: number;
  time: string;
}

export interface FoxCloudRealtimeDeviceResult {
  deviceSN: string;
  datas: FoxCloudRealtimeDataPoint[];
}

export interface FoxCloudReportSeries {
  variable: string;
  unit: string;
  values: number[];
}

export interface FoxCloudHistorySeries {
  variable: string;
  unit: string;
  name: string;
  data: Array<{
    time: string;
    value: number;
  }>;
}

export interface FoxCloudHistoryDeviceResult {
  deviceSN: string;
  datas: FoxCloudHistorySeries[];
}

export interface FoxCloudGenerationSummary {
  today: number;
  month: number;
  cumulative: number;
}

export interface DashboardDailyRow {
  day: number;
  date: string;
  generation: number;
  pv_production: number;
  pv_energy_total: number;
  daily_feedin: number;
  self_consumption: number;
  home_usage: number;
  grid_consumption: number;
  daily_charged_energy_total: number;
  daily_discharged_energy_total: number;
  solarProductionLabel: string;
  returnToGridLabel: string;
  batteryChargeLabel: string;
  batteryDischargeLabel: string;
}

export interface DashboardPayload {
  generatedAt: string;
  isStale: boolean;
  warnings: string[];
  source: "live" | "cache" | "demo" | "modbus";
  requestedPeriod: {
    year: number;
    month: number;
  };
  device: {
    deviceSN: string;
    stationName: string;
    deviceType: string;
    productType: string;
    hasBattery: boolean;
    hasPV: boolean;
    status: "online" | "fault" | "offline";
  };
  live: {
    solarGeneratedKw: number;
    gridImportKw: number;
    gridExportKw: number;
    homeUsageKw: number;
    batteryChargeKw: number;
    batteryDischargeKw: number;
    batterySocPercent: number | null;
    batteryTemperatureCelsius: number | null;
    batteryMinTemperatureCelsius: number | null;
    batteryMaxTemperatureCelsius: number | null;
    batteryPackTemperatureCelsius: number | null;
    inverterTemperatureCelsius: number | null;
    updatedAt: string | null;
  };
  today: {
    solarProductionKwh: number;
    selfConsumptionKwh: number;
    returnToGridKwh: number;
    homeUsageKwh: number;
    gridConsumptionKwh: number;
    energyGoingIntoBatteryKwh: number;
    energyComingOutOfBatteryKwh: number;
  };
  todaySavings: SavingsSummary;
  lastHour: {
    solarGeneratedKwh: number;
    homeUsageKwh: number;
    gridImportKwh: number;
    gridExportKwh: number;
    batteryChargeKwh: number;
    batteryDischargeKwh: number;
  };
  chartSeries: {
    labels: string[];
    solarProduction: number[];
    returnToGrid: number[];
    homeUsage: number[];
    gridConsumption: number[];
    energyGoingIntoBattery: number[];
    energyComingOutOfBattery: number[];
  };
  last24Hours: {
    labels: string[];
    batteryLevelPercent: Array<number | null>;
    solarGeneratedKw: Array<number | null>;
    homeUsageKw: Array<number | null>;
    gridImportKw: Array<number | null>;
    batteryDischargeKw: Array<number | null>;
  };
  dailyTable: DashboardDailyRow[];
}

export interface EnergyTotals {
  solarProductionKwh: number;
  homeUsageKwh: number;
  energyGoingIntoBatteryKwh: number;
  energyComingOutOfBatteryKwh: number;
  returnToGridKwh: number;
  gridConsumptionKwh: number;
  selfConsumptionKwh: number;
}

export interface SavingsSummary {
  currency: string;
  avoidedGridImportKwh: number;
  exportedKwh: number;
  estimatedSavings: number;
  exportCredit: number;
  estimatedTotalBenefit: number;
  importRateMode: "weighted_daily_estimate";
  blendedImportRate: number;
  peakRate: number;
  offPeakRate: number;
  peakWindow: string;
  feedInRate: number;
}

export interface EnergyRangePayload {
  generatedAt: string;
  range: string;
  requestedPeriod: {
    year: number;
    month: number;
  };
  monthCount: number;
  dailyTable: DashboardDailyRow[];
  totals: EnergyTotals;
  savings: SavingsSummary;
}

export interface SavingsOverviewPayload {
  generatedAt: string;
  requestedPeriod: {
    year: number;
    month: number;
  };
  ranges: Record<string, SavingsSummary | null>;
}

export interface RebuildSummary {
  requestedDays: number;
  processedDays: number;
  rebuiltDays: number;
  skippedDays: number;
  omittedDays: number;
  limited: boolean;
  limitDays: number;
  source: "foxcloud-history" | "modbus" | "demo";
  estimatedHistoryCalls?: number;
  daysToRebuild?: number;
}

export interface WeatherPayload {
  enabled: boolean;
  source: "open-meteo" | "disabled";
  generatedAt: string;
  location: {
    latitude: number;
    longitude: number;
    timezone: string;
    name?: string | null;
    countryCode?: string | null;
    source: "coordinates" | "postcode";
  } | null;
  current: {
    time: string | null;
    temperatureCelsius: number | null;
    apparentTemperatureCelsius: number | null;
    weatherCode: number | null;
    conditionKey: string;
    cloudCoverPercent: number | null;
    precipitationMm: number | null;
    precipitationProbabilityPercent: number | null;
    solarOutlook: string;
  } | null;
  daily: Array<{
    date: string;
    weatherCode: number | null;
    conditionKey: string;
    temperatureMaxCelsius: number | null;
    temperatureMinCelsius: number | null;
    cloudCoverMeanPercent: number | null;
    precipitationSumMm: number | null;
    precipitationProbabilityMaxPercent: number | null;
    solarOutlook: string;
  }>;
  warning: string | null;
}
