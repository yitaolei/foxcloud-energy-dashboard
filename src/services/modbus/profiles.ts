export interface ModbusRegisterValue {
  addresses: readonly number[];
  scale?: number;
}

export interface ModbusRegisterProfile {
  id: string;
  label: string;
  readRanges: ReadonlyArray<{
    startAddress: number;
    count: number;
  }>;
  live: {
    pvPowerInputs: readonly ModbusRegisterValue[];
    gridCtPower: ModbusRegisterValue;
    batteryPower: ModbusRegisterValue;
    homeUsagePower: ModbusRegisterValue;
    batterySoc: ModbusRegisterValue;
    batteryPackTemperature: ModbusRegisterValue;
    batteryMaxTemperature: ModbusRegisterValue;
    batteryMinTemperature: ModbusRegisterValue;
    inverterTemperature: ModbusRegisterValue;
  };
  gridQuality: {
    gridVoltageRV: ModbusRegisterValue;
    gridVoltageSV: ModbusRegisterValue;
    gridVoltageTV: ModbusRegisterValue;
    gridFrequencyHz: ModbusRegisterValue;
    inverterCurrentRA: ModbusRegisterValue;
    inverterCurrentSA: ModbusRegisterValue;
    inverterCurrentTA: ModbusRegisterValue;
    inverterPowerRKw: ModbusRegisterValue;
    inverterPowerSKw: ModbusRegisterValue;
    inverterPowerTKw: ModbusRegisterValue;
    gridMeterPowerRKw: ModbusRegisterValue;
    gridMeterPowerSKw: ModbusRegisterValue;
    gridMeterPowerTKw: ModbusRegisterValue;
    gridMeterPowerTotalKw: ModbusRegisterValue;
  };
  daily: {
    solarEnergyToday: ModbusRegisterValue;
    totalYieldToday: ModbusRegisterValue;
    feedInToday: ModbusRegisterValue;
    loadEnergyToday: ModbusRegisterValue;
    gridConsumptionToday: ModbusRegisterValue;
    batteryChargeToday: ModbusRegisterValue;
    batteryDischargeToday: ModbusRegisterValue;
  };
}

export const foxEssH3SmartProfile: ModbusRegisterProfile = {
  id: "foxess-h3-smart",
  label: "FoxESS H3 Smart",
  readRanges: [
    { startAddress: 37609, count: 28 },
    { startAddress: 38814, count: 26 },
    { startAddress: 39063, count: 80 },
    { startAddress: 39219, count: 20 },
    { startAddress: 39248, count: 6 },
    { startAddress: 39279, count: 8 },
    { startAddress: 39601, count: 32 },
  ],
  live: {
    pvPowerInputs: [
      { addresses: [39280, 39279], scale: 0.001 },
      { addresses: [39282, 39281], scale: 0.001 },
      { addresses: [39284, 39283], scale: 0.001 },
      { addresses: [39286, 39285], scale: 0.001 },
    ],
    gridCtPower: { addresses: [38815, 38814], scale: 0.0001 },
    batteryPower: { addresses: [39238, 39237], scale: 0.001 },
    homeUsagePower: { addresses: [39226, 39225], scale: 0.001 },
    batterySoc: { addresses: [37612] },
    batteryPackTemperature: { addresses: [37611], scale: 0.1 },
    batteryMaxTemperature: { addresses: [37617], scale: 0.1 },
    batteryMinTemperature: { addresses: [37618], scale: 0.1 },
    inverterTemperature: { addresses: [39141], scale: 0.1 },
  },
  gridQuality: {
    gridVoltageRV: { addresses: [39123], scale: 0.1 },
    gridVoltageSV: { addresses: [39124], scale: 0.1 },
    gridVoltageTV: { addresses: [39125], scale: 0.1 },
    gridFrequencyHz: { addresses: [39139], scale: 0.01 },
    inverterCurrentRA: { addresses: [39127, 39126], scale: 0.001 },
    inverterCurrentSA: { addresses: [39129, 39128], scale: 0.001 },
    inverterCurrentTA: { addresses: [39131, 39130], scale: 0.001 },
    inverterPowerRKw: { addresses: [39249, 39248], scale: 0.001 },
    inverterPowerSKw: { addresses: [39251, 39250], scale: 0.001 },
    inverterPowerTKw: { addresses: [39253, 39252], scale: 0.001 },
    gridMeterPowerRKw: { addresses: [38817, 38816], scale: 0.0001 },
    gridMeterPowerSKw: { addresses: [38819, 38818], scale: 0.0001 },
    gridMeterPowerTKw: { addresses: [38821, 38820], scale: 0.0001 },
    gridMeterPowerTotalKw: { addresses: [38815, 38814], scale: 0.0001 },
  },
  daily: {
    solarEnergyToday: { addresses: [39604, 39603], scale: 0.01 },
    totalYieldToday: { addresses: [39624, 39623], scale: 0.01 },
    feedInToday: { addresses: [39616, 39615], scale: 0.01 },
    loadEnergyToday: { addresses: [39632, 39631], scale: 0.01 },
    gridConsumptionToday: { addresses: [39620, 39619], scale: 0.01 },
    batteryChargeToday: { addresses: [39608, 39607], scale: 0.01 },
    batteryDischargeToday: { addresses: [39612, 39611], scale: 0.01 },
  },
};

export const modbusProfiles = [foxEssH3SmartProfile] as const;

export const listModbusProfileIds = (): string[] => modbusProfiles.map((profile) => profile.id);

export interface ModbusProfileSelection {
  requestedProfile: string;
  activeProfile: ModbusRegisterProfile;
  matched: boolean;
}

export const resolveModbusProfile = (modelName: string | undefined): ModbusProfileSelection => {
  const requestedProfile = modelName?.trim() ?? "";
  const normalizedModel = requestedProfile.toLowerCase();
  const activeProfile = modbusProfiles.find((profile) => {
    const normalizedId = profile.id.toLowerCase();
    const normalizedLabel = profile.label.toLowerCase();
    return normalizedModel === normalizedId || normalizedModel === normalizedLabel;
  });

  return {
    requestedProfile,
    activeProfile: activeProfile ?? foxEssH3SmartProfile,
    matched: Boolean(activeProfile),
  };
};

export const getModbusProfile = (modelName: string | undefined): ModbusRegisterProfile =>
  resolveModbusProfile(modelName).activeProfile;
