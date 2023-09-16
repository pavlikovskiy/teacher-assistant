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
  // TABLESPOON = "Table Spoon",
  // CUBIC_INCH = "Cubic Inch",
}

export type FormulaType = (n: number) => number

export interface ConversionModel<Type> {
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
  // type: UnitConversionEnum;
  inputValue: number
  inputUnitOfMeasure: string
  targetUnitOfMeasure: string
  studentResponse: string
}
