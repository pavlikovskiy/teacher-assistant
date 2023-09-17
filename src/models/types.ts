export enum UnitConversionEnum {
  TEMPERATURE = 'Temperature',
  VOLUME = 'Volume',
}

export enum TemperatureUnitEnum {
  KELVIN = 'Kelvin',
  CELSIUS = 'Celsius',
  FAHRENHEIT = 'Fahrenheit',
  RANKINE = 'Rankine',
}

export enum VolumeUnitEnum {
  LITER = 'Liter',
  GALLON = 'Gallon',
  TABLESPOON = "Table Spoon",
  CUBIC_INCH = "Cubic Inch",
  CUBIC_FOOT = "Cubic Foot",
  CUP = "Cup",
}

export type FormulaType = (n: number) => number

export interface ConversionModel<Type> {
  type: UnitConversionEnum
  measures: Type[]
  formulas: Map<string, FormulaType>
}

export enum ResponseTypeEnum {
  NO_ANSWER = '',
  CORRECT = 'Correct',
  INCORRECT = 'Incorrect',
  INVALID = 'Invalid',
}

export interface UnitConversionItemType {
  inputValue: number
  inputUnitOfMeasure: string
  targetUnitOfMeasure: string
  studentResponse: string
}
