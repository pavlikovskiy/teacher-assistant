import { ConversionModel, FormulaType, TemperatureUnitEnum, UnitConversionEnum, VolumeUnitEnum } from '@/models/types'

const isUnitValid = (unit: string, options: string[]): boolean =>
  options.map((unitType) => unitType.toLowerCase()).includes(unit.toLowerCase())

export const round = (num: number, dec: number) =>
  Math.round((num + Number.EPSILON) * Math.pow(10, dec)) / Math.pow(10, dec)

export const conversionFunc = (
  value: number,
  from: string,
  to: string,
  conversionModel: ConversionModel<any>
): number => {
  if (!isUnitValid(from, conversionModel.measures)) throw new Error('Invalid input unit of measure')

  if (!isUnitValid(to, conversionModel.measures)) throw new Error('Invalid target unit of measure')

  if (from === to) return value

  const formula = conversionModel.formulas.get(`${to}-from-${from}`)
  if (!formula) throw new Error('formula is not defined in Model')

  return round(formula(value), 2)
}

const { CELSIUS, KELVIN, FAHRENHEIT, RANKINE } = TemperatureUnitEnum
const { LITER, GALLON, TABLESPOON, CUBIC_INCH, CUBIC_FOOT, CUP } = VolumeUnitEnum

export const TemperatureConversionModel: ConversionModel<TemperatureUnitEnum> = {
  type: UnitConversionEnum.TEMPERATURE,

  measures: Object.values(TemperatureUnitEnum),

  formulas: new Map<string, FormulaType>([
    [`${KELVIN}-from-${CELSIUS}`, (c: number): number => c + 273.15],
    [`${RANKINE}-from-${CELSIUS}`, (c: number): number => ((273.15 + c) * 9) / 5],
    [`${FAHRENHEIT}-from-${CELSIUS}`, (c: number): number => 1.8 * c + 32],

    [`${CELSIUS}-from-${FAHRENHEIT}`, (f: number): number => (f - 32) / 1.8],
    [`${KELVIN}-from-${FAHRENHEIT}`, (f: number): number => ((f + 459.67) * 5) / 9],
    [`${RANKINE}-from-${FAHRENHEIT}`, (f: number): number => f + 459.67],

    [`${FAHRENHEIT}-from-${RANKINE}`, (r: number): number => r - 459.67],
    [`${CELSIUS}-from-${RANKINE}`, (r: number): number => (r * 5) / 9 - 273.15],
    [`${KELVIN}-from-${RANKINE}`, (r: number): number => (r * 5) / 9],

    [`${RANKINE}-from-${KELVIN}`, (k: number): number => (k * 9) / 5],
    [`${FAHRENHEIT}-from-${KELVIN}`, (k: number): number => (k * 9) / 5 - 459.67],
    [`${CELSIUS}-from-${KELVIN}`, (k: number): number => k - 273.15],
  ]),
}

const g2l = (g: number): number => 3.78541 * g
const l2g = (l: number): number => l / 3.78541
const l2tbs = (l: number): number => 67.628 * l
const tbs2l = (tbs: number): number => tbs / 67.628
const cbi2l = (cbi: number): number => cbi / 61.02
const l2cbi = (l: number): number => 61.02 * l
const l2cbf = (l: number): number => l / 28.3168
const cbf2l = (cbf: number): number => 28.3168 * cbf
const l2c = (l: number): number => 4.16667 * l
const c2l = (c: number): number => c / 4.16667

export const VolumeConversionModel: ConversionModel<VolumeUnitEnum> = {
  type: UnitConversionEnum.VOLUME,

  measures: Object.values(VolumeUnitEnum),

  formulas: new Map<string, (n: number) => number>([
    [`${GALLON}-from-${LITER}`, l2g],
    [`${TABLESPOON}-from-${LITER}`, l2tbs],
    [`${CUBIC_INCH}-from-${LITER}`, l2cbi],
    [`${CUBIC_FOOT}-from-${LITER}`, l2cbf],
    [`${CUP}-from-${LITER}`, l2c],

    [`${LITER}-from-${GALLON}`, g2l],
    [`${TABLESPOON}-from-${GALLON}`, (g: number): number => l2tbs(g2l(g))],
    [`${CUBIC_INCH}-from-${GALLON}`, (g: number): number => l2cbi(g2l(g))],
    [`${CUBIC_FOOT}-from-${GALLON}`, (g: number): number => l2cbf(g2l(g))],
    [`${CUP}-from-${GALLON}`, (g: number): number => l2c(g2l(g))],

    [`${LITER}-from-${TABLESPOON}`, tbs2l],
    [`${GALLON}-from-${TABLESPOON}`, (tbs: number): number => l2g(tbs2l(tbs))],
    [`${CUBIC_INCH}-from-${TABLESPOON}`, (tbs: number): number => l2cbi(tbs2l(tbs))],
    [`${CUBIC_FOOT}-from-${TABLESPOON}`, (tbs: number): number => l2cbf(tbs2l(tbs))],
    [`${CUP}-from-${TABLESPOON}`, (tbs: number): number => l2c(tbs2l(tbs))],

    [`${LITER}-from-${CUBIC_INCH}`, cbi2l],
    [`${GALLON}-from-${CUBIC_INCH}`, (cbi: number): number => l2g(cbi2l(cbi))],
    [`${TABLESPOON}-from-${CUBIC_INCH}`, (cbi: number): number => l2tbs(cbi2l(cbi))],
    [`${CUBIC_FOOT}-from-${CUBIC_INCH}`, (cbi: number): number => l2cbf(cbi2l(cbi))],
    [`${CUP}-from-${CUBIC_INCH}`, (cbi: number): number => l2c(cbi2l(cbi))],

    [`${LITER}-from-${CUBIC_FOOT}`, cbf2l],
    [`${GALLON}-from-${CUBIC_FOOT}`, (cbf: number): number => l2g(cbf2l(cbf))],
    [`${TABLESPOON}-from-${CUBIC_FOOT}`, (cbf: number): number => l2tbs(cbf2l(cbf))],
    [`${CUBIC_INCH}-from-${CUBIC_FOOT}`, (cbf: number): number => l2cbi(cbf2l(cbf))],
    [`${CUP}-from-${CUBIC_FOOT}`, (cbf: number): number => l2c(cbf2l(cbf))],

    [`${LITER}-from-${CUP}`, c2l],
    [`${GALLON}-from-${CUP}`, (c: number): number => l2g(c2l(c))],
    [`${TABLESPOON}-from-${CUP}`, (c: number): number => l2tbs(c2l(c))],
    [`${CUBIC_INCH}-from-${CUP}`, (c: number): number => l2cbi(c2l(c))],
    [`${CUBIC_FOOT}-from-${CUP}`, (c: number): number => l2cbf(c2l(c))],
  ]),
}

export const UnitConversionModels = new Map<UnitConversionEnum, ConversionModel<any>>([
  [UnitConversionEnum.TEMPERATURE, TemperatureConversionModel],
  [UnitConversionEnum.VOLUME, VolumeConversionModel],
])
