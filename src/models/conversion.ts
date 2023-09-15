import {ConversionModel, FormulaType, TemperatureUnitEnum, UnitConversionEnum, VolumeUnitEnum} from "@/models/types";

const isUnitValid = (unit: string, options: string[]): boolean =>
  options
    .map(unitType => unitType.toLowerCase())
    .includes(unit.toLowerCase())

export const conversionFunc = (value: number, from: string, to: string, conversionModel: ConversionModel<any>): number => {
  // console.log(`temp value ${value} from ${from} to ${to}`)

  if (!isUnitValid(from, conversionModel.measures))
    throw new Error('Invalid input unit of measure')

  if (!isUnitValid(to, conversionModel.measures))
    throw new Error('Invalid target unit of measure')

  if (from === to)
    return value;

  const formula = conversionModel.formulas.get(`${from}-from-${to}`);
  if (!formula)
    throw new Error('formula is not defined in Model')

  return formula(value);
}

export const TemperatureConversionModel: ConversionModel<TemperatureUnitEnum> = {

  measures: Object.values(TemperatureUnitEnum),

  formulas: new Map<string, FormulaType>([
    [`${TemperatureUnitEnum.KELVIN}-from-${TemperatureUnitEnum.CELSIUS}`, (c: number): number => c + 273.15],
    [`${TemperatureUnitEnum.CELSIUS}-from-${TemperatureUnitEnum.KELVIN}`, (k: number): number => k - 273.15],
  ]),
}

export const VolumeConversionModel: ConversionModel<VolumeUnitEnum> = {
  measures: Object.values(VolumeUnitEnum),

  formulas: new Map<string, (n: number) => number>([
    // [`${TemperatureUnitEnum.KELVIN}-from-${TemperatureUnitEnum.CELSIUS}`, (c: number): number => c + 273.15],
    // [`${TemperatureUnitEnum.CELSIUS}-from-${TemperatureUnitEnum.KELVIN}`, (k: number): number => k - 273.15],
  ]),

}

export const UnitConversionModels = new Map<UnitConversionEnum, ConversionModel<any>>([
  [UnitConversionEnum.TEMPERATURE, TemperatureConversionModel],
  [UnitConversionEnum.VOLUME, VolumeConversionModel],
]);
