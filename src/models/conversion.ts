import { ConversionModel, FormulaType, TemperatureUnitEnum, UnitConversionEnum, VolumeUnitEnum } from '@/models/types'

const isUnitValid = (unit: string, options: string[]): boolean => options.map((unitType) => unitType.toLowerCase()).includes(unit.toLowerCase())

export const round = (num: number, dec: number) => Math.round((num + Number.EPSILON) * Math.pow(10, dec)) / Math.pow(10, dec)

export const conversionFunc = (value: number, from: string, to: string, conversionModel: ConversionModel<any>): number => {
  if (!isUnitValid(from, conversionModel.measures)) throw new Error('Invalid input unit of measure')

  if (!isUnitValid(to, conversionModel.measures)) throw new Error('Invalid target unit of measure')

  if (from === to) return value

  const formula = conversionModel.formulas.get(`${to}-from-${from}`)
  if (!formula) throw new Error('formula is not defined in Model')

  return round(formula(value), 2)
}

export const TemperatureConversionModel: ConversionModel<TemperatureUnitEnum> = {
  type: UnitConversionEnum.TEMPERATURE,

  measures: Object.values(TemperatureUnitEnum),

  formulas: new Map<string, FormulaType>([
    [`${TemperatureUnitEnum.KELVIN}-from-${TemperatureUnitEnum.CELSIUS}`, (c: number): number => c + 273.15],
    [`${TemperatureUnitEnum.RANKINE}-from-${TemperatureUnitEnum.CELSIUS}`, (c: number): number => ((273.15 + c) * 9) / 5],
    [`${TemperatureUnitEnum.FAHRENHEIT}-from-${TemperatureUnitEnum.CELSIUS}`, (c: number): number => 1.8 * c + 32],

    [`${TemperatureUnitEnum.CELSIUS}-from-${TemperatureUnitEnum.FAHRENHEIT}`, (f: number): number => (f - 32) / 1.8],
    [`${TemperatureUnitEnum.KELVIN}-from-${TemperatureUnitEnum.FAHRENHEIT}`, (f: number): number => ((f + 459.67) * 5) / 9],
    [`${TemperatureUnitEnum.RANKINE}-from-${TemperatureUnitEnum.FAHRENHEIT}`, (f: number): number => f + 459.67],

    [`${TemperatureUnitEnum.FAHRENHEIT}-from-${TemperatureUnitEnum.RANKINE}`, (r: number): number => r - 459.67],
    [`${TemperatureUnitEnum.CELSIUS}-from-${TemperatureUnitEnum.RANKINE}`, (r: number): number => (r * 5) / 9 - 273.15],
    [`${TemperatureUnitEnum.KELVIN}-from-${TemperatureUnitEnum.RANKINE}`, (r: number): number => (r * 5) / 9],

    [`${TemperatureUnitEnum.RANKINE}-from-${TemperatureUnitEnum.KELVIN}`, (k: number): number => (k * 9) / 5],
    [`${TemperatureUnitEnum.FAHRENHEIT}-from-${TemperatureUnitEnum.KELVIN}`, (k: number): number => (k * 9) / 5 - 459.67],
    [`${TemperatureUnitEnum.CELSIUS}-from-${TemperatureUnitEnum.KELVIN}`, (k: number): number => k - 273.15],
  ]),
}

const g2l = (g: number): number => 3.78541 * g
const l2g = (l: number): number => l / 3.78541
const l2tbs = (l: number): number => 67.628 * l
const tbs2l = (tbs: number): number => tbs / 67.628
const cbi2l = (cbi: number): number => cbi / 61.02
const l2cbi = (l: number): number => 61.02 * l
const l2cbf = (l: number): number => l / 28.3168
const cbf2l = (l: number): number => 28.3168 * l

export const VolumeConversionModel: ConversionModel<VolumeUnitEnum> = {
  type: UnitConversionEnum.VOLUME,

  measures: Object.values(VolumeUnitEnum),

  formulas: new Map<string, (n: number) => number>([
    [`${VolumeUnitEnum.GALLON}-from-${VolumeUnitEnum.LITER}`, l2g],
    [`${VolumeUnitEnum.TABLESPOON}-from-${VolumeUnitEnum.LITER}`, l2tbs],
    [`${VolumeUnitEnum.CUBIC_INCH}-from-${VolumeUnitEnum.LITER}`, l2cbi],
    [`${VolumeUnitEnum.CUBIC_FOOT}-from-${VolumeUnitEnum.LITER}`, l2cbf],

    [`${VolumeUnitEnum.LITER}-from-${VolumeUnitEnum.GALLON}`, g2l],
    [`${VolumeUnitEnum.TABLESPOON}-from-${VolumeUnitEnum.GALLON}`, (g: number): number => l2tbs(g2l(g))],
    [`${VolumeUnitEnum.CUBIC_INCH}-from-${VolumeUnitEnum.GALLON}`, (g: number): number => l2cbi(g2l(g))],
    [`${VolumeUnitEnum.CUBIC_FOOT}-from-${VolumeUnitEnum.GALLON}`, (g: number): number => l2cbf(g2l(g))],

    [`${VolumeUnitEnum.LITER}-from-${VolumeUnitEnum.TABLESPOON}`, tbs2l],
    [`${VolumeUnitEnum.GALLON}-from-${VolumeUnitEnum.TABLESPOON}`, (tbs: number): number => l2g(tbs2l(tbs))],
    [`${VolumeUnitEnum.CUBIC_INCH}-from-${VolumeUnitEnum.TABLESPOON}`, (tbs: number): number => l2cbi(tbs2l(tbs))],
    [`${VolumeUnitEnum.CUBIC_FOOT}-from-${VolumeUnitEnum.TABLESPOON}`, (tbs: number): number => l2cbf(tbs2l(tbs))],

    [`${VolumeUnitEnum.LITER}-from-${VolumeUnitEnum.CUBIC_INCH}`, cbi2l],
    [`${VolumeUnitEnum.GALLON}-from-${VolumeUnitEnum.CUBIC_INCH}`, (cbi:number): number => l2g(cbi2l(cbi))],
    [`${VolumeUnitEnum.TABLESPOON}-from-${VolumeUnitEnum.CUBIC_INCH}`, (cbi:number): number => l2tbs(cbi2l(cbi))],
    [`${VolumeUnitEnum.CUBIC_FOOT}-from-${VolumeUnitEnum.CUBIC_INCH}`, (cbi:number): number => l2cbf(cbi2l(cbi))],

    [`${VolumeUnitEnum.LITER}-from-${VolumeUnitEnum.CUBIC_FOOT}`, cbf2l],
    [`${VolumeUnitEnum.GALLON}-from-${VolumeUnitEnum.CUBIC_FOOT}`, (cbf:number): number => l2g(cbf2l(cbf))],
    [`${VolumeUnitEnum.TABLESPOON}-from-${VolumeUnitEnum.CUBIC_FOOT}`, (cbf:number): number => l2tbs(cbf2l(cbf))],
    [`${VolumeUnitEnum.CUBIC_INCH}-from-${VolumeUnitEnum.CUBIC_FOOT}`, (cbf:number): number => l2cbi(cbf2l(cbf))],
  ]),
}

export const UnitConversionModels = new Map<UnitConversionEnum, ConversionModel<any>>([
  [UnitConversionEnum.TEMPERATURE, TemperatureConversionModel],
  [UnitConversionEnum.VOLUME, VolumeConversionModel],
])
