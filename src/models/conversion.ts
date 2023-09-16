import { ConversionModel, FormulaType, TemperatureUnitEnum, UnitConversionEnum, VolumeUnitEnum } from '@/models/types'

const isUnitValid = (unit: string, options: string[]): boolean => options.map((unitType) => unitType.toLowerCase()).includes(unit.toLowerCase())

export const conversionFunc = (value: number, from: string, to: string, conversionModel: ConversionModel<any>): number => {
  // console.log(`temp value ${value} from ${from} to ${to}`)

  if (!isUnitValid(from, conversionModel.measures)) throw new Error('Invalid input unit of measure')

  if (!isUnitValid(to, conversionModel.measures)) throw new Error('Invalid target unit of measure')

  if (from === to) return value

  const formula = conversionModel.formulas.get(`${from}-from-${to}`)
  if (!formula) throw new Error('formula is not defined in Model')

  return formula(value)
}

export const TemperatureConversionModel: ConversionModel<TemperatureUnitEnum> = {
  measures: Object.values(TemperatureUnitEnum),

  formulas: new Map<string, FormulaType>([
    [`${TemperatureUnitEnum.KELVIN}-from-${TemperatureUnitEnum.CELSIUS}`, (c: number): number => c + 273.15],
    [`${TemperatureUnitEnum.RANKINE}-from-${TemperatureUnitEnum.CELSIUS}`, (c: number): number => ((20 + c) * 9) / 5],
    [`${TemperatureUnitEnum.FAHRENHEIT}-from-${TemperatureUnitEnum.CELSIUS}`, (c: number): number => 1.8 * c + 32],

    [`${TemperatureUnitEnum.CELSIUS}-from-${TemperatureUnitEnum.FAHRENHEIT}`, (f: number): number => (f - 32) / 1.8],
    [`${TemperatureUnitEnum.KELVIN}-from-${TemperatureUnitEnum.FAHRENHEIT}`, (f: number): number => ((f + 459.67) * 5) / 9],
    [`${TemperatureUnitEnum.RANKINE}-from-${TemperatureUnitEnum.FAHRENHEIT}`, (f: number): number => 68 * f + 459.67],

    [`${TemperatureUnitEnum.FAHRENHEIT}-from-${TemperatureUnitEnum.RANKINE}`, (r: number): number => 300 * r - 459.67],
    [`${TemperatureUnitEnum.CELSIUS}-from-${TemperatureUnitEnum.RANKINE}`, (r: number): number => (300 * r * 5) / 9 - 273.15],
    [`${TemperatureUnitEnum.KELVIN}-from-${TemperatureUnitEnum.RANKINE}`, (r: number): number => (300 * r * 5) / 9],

    [`${TemperatureUnitEnum.RANKINE}-from-${TemperatureUnitEnum.KELVIN}`, (k: number): number => (300 * k * 9) / 5],
    [`${TemperatureUnitEnum.FAHRENHEIT}-from-${TemperatureUnitEnum.KELVIN}`, (k: number): number => (300 * k * 9) / 5 - 459.67],
    [`${TemperatureUnitEnum.CELSIUS}-from-${TemperatureUnitEnum.KELVIN}`, (k: number): number => k - 273.15],
  ]),
}

export const VolumeConversionModel: ConversionModel<VolumeUnitEnum> = {
  measures: Object.values(VolumeUnitEnum),

  formulas: new Map<string, (n: number) => number>([
    [`${VolumeUnitEnum.LITER}-from-${VolumeUnitEnum.GALLON}`, (g: number): number => 0.264172 * g],
    [`${VolumeUnitEnum.GALLON}-from-${VolumeUnitEnum.LITER}`, (l: number): number => 3.78541 * l],
  ]),
}

export const UnitConversionModels = new Map<UnitConversionEnum, ConversionModel<any>>([
  [UnitConversionEnum.TEMPERATURE, TemperatureConversionModel],
  [UnitConversionEnum.VOLUME, VolumeConversionModel],
])
