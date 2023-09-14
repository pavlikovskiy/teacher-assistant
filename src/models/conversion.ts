import {ConversionModel, TemperatureUnitEnum, UnitConversionEnum, VolumeUnitEnum} from "@/models/types";

const isUnitValid = (unit: string, options: string[]): boolean =>
    options
        .map(unitType => unitType.toLowerCase())
        .includes(unit.toLowerCase())

export const TemperatureConversionModel: ConversionModel<TemperatureUnitEnum> = {
    // measures: [
    //     TemperatureUnitEnum.KELVIN,
    //     TemperatureUnitEnum.CELSIUS,
    //     TemperatureUnitEnum.FAHRENHEIT,
    //     TemperatureUnitEnum.RANKINE
    // ],

    measures: Object.values(TemperatureUnitEnum),

    conversionFunc: (value: number, from: TemperatureUnitEnum, to: TemperatureUnitEnum): number => {
        console.log(`temp value ${value} from ${from} to ${to}`)
        const unitOptions = Object.values(TemperatureUnitEnum)
        if (!isUnitValid(from, unitOptions)) {
            throw new Error('Invalid input unit of measure')
        }
        if (!isUnitValid(to, unitOptions)) {
            throw new Error('Invalid target unit of measure')
        }

        if (from === to) {
            return value;
        }
        return 111 * value;
    }
}

export const VolumeConversionModel: ConversionModel<VolumeUnitEnum> = {
    // measures: [
    //     VolumeUnitEnum.LITER,
    //     VolumeUnitEnum.TABLESPOON,
    //     VolumeUnitEnum.CUBIC_INCH,
    // ],
    measures: Object.values(VolumeUnitEnum),

    conversionFunc: (value: number, from: VolumeUnitEnum, to: VolumeUnitEnum): number => {
        const unitOptions = Object.values(VolumeUnitEnum)
        if (!isUnitValid(from, unitOptions)) {
            throw new Error('Invalid input unit of measure')
        }
        if (!isUnitValid(to, unitOptions)) {
            throw new Error('Invalid target unit of measure')
        }

        if (from === to) {
            return value;
        }
        return 333 * value;
    }
}

// : <UnitConversionEnum, ConversionModel>
// ConversionModel<TemperatureUnitEnum|VolumeUnitEnum>
export const UnitConversionModels = new Map<UnitConversionEnum, ConversionModel<any>>([
        [UnitConversionEnum.TEMPERATURE, TemperatureConversionModel],
        [UnitConversionEnum.VOLUME, VolumeConversionModel],
    ]);
//     {
//     Temperature: TemperatureConversionModel,
//     Volume: VolumeConversionModel
// }
