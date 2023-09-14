
export enum UnitConversionEnum {
    TEMPERATURE = "Temperature",
    VOLUME = "Volume",
}

export enum TemperatureUnitEnum {
    KELVIN = "Kelvin",
    CELSIUS = "Celsius",
    FAHRENHEIT = "Fahrenheit",
    RANKINE = "Rankine"
}

export enum VolumeUnitEnum {
    LITER = "Liter",
    TABLESPOON = "Table Spoon",
    CUBIC_INCH = "Cubic Inch",
}

export interface ConversionModel<Type> {
    measures: Type[]
    // isUnitValid: (unit: Type) => boolean
    conversionFunc: (value: number, from: Type, to: Type) => number
}

export enum ResponseTypeEnum {
    NO_ANSWER = "",
    CORRECT = "Correct",
    INCORRECT = "Incorrect",
    INVALID = "Invalid"
}

// export type ResponseType = ResponseTypeEnum; //'correct' | 'incorrect' | 'invalid';


export interface UnitConversionItemType {
    // type: UnitConversionEnum;
    inputValue: number;
    inputUnitOfMeasure: string;
    targetUnitOfMeasure: string;
    studentResponse: string;
    // output?: ResponseType
}
