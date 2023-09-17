// @ts-nocheck

import { conversionFunc, TemperatureConversionModel, VolumeConversionModel } from '@/models/conversion'
import { TemperatureUnitEnum, VolumeUnitEnum } from '@/models/types'

describe('temperature model test', () => {
  const tempModel = TemperatureConversionModel
  const { CELSIUS, KELVIN, FAHRENHEIT, RANKINE } = TemperatureUnitEnum

  test('Kelvin to Celsius', () => {
    expect(conversionFunc(1, KELVIN, CELSIUS, tempModel)).toBe(-272.15)
  })

  test('Rankine to Celsius', () => {
    expect(conversionFunc(1, RANKINE, CELSIUS, tempModel)).toBe(-272.59)
  })

  test('Fahrenheit to Celsius', () => {
    expect(conversionFunc(1, FAHRENHEIT, CELSIUS, tempModel)).toBe(-17.22)
  })

  test('Celsius to Fahrenheit', () => {
    expect(conversionFunc(1, CELSIUS, FAHRENHEIT, tempModel)).toBe(33.8)
  })

  test('Kelvin to Fahrenheit', () => {
    expect(conversionFunc(1, KELVIN, FAHRENHEIT, tempModel)).toBe(-457.87)
  })

  test('Rankine to Fahrenheit', () => {
    expect(conversionFunc(1, RANKINE, FAHRENHEIT, tempModel)).toBe(-458.67)
  })

  test('Celsius to Rankine', () => {
    expect(conversionFunc(1, CELSIUS, RANKINE, tempModel)).toBe(493.47)
  })

  test('Kelvin to Rankine', () => {
    expect(conversionFunc(1, KELVIN, RANKINE, tempModel)).toBe(1.8)
  })

  test('Fahrenheit to Rankine', () => {
    expect(conversionFunc(1, FAHRENHEIT, RANKINE, tempModel)).toBe(460.67)
  })

  test('Celsius to Kelvin', () => {
    expect(conversionFunc(1, CELSIUS, KELVIN, tempModel)).toBe(274.15)
  })

  test('Rankine to Kelvin', () => {
    expect(conversionFunc(1, RANKINE, KELVIN, tempModel)).toBe(0.56)
  })

  test('Fahrenheit to Kelvin', () => {
    expect(conversionFunc(1, FAHRENHEIT, KELVIN, tempModel)).toBe(255.93)
  })
})

describe('volume model test', () => {
  const volumeModel = VolumeConversionModel
  const { LITER, GALLON, TABLESPOON, CUBIC_INCH, CUBIC_FOOT, CUP } = VolumeUnitEnum

  test('Liter to Gallon', () => {
    expect(conversionFunc(1, LITER, GALLON, volumeModel)).toBe(0.26)
  })
  test('Liter to Table Spoon', () => {
    expect(conversionFunc(1, LITER, TABLESPOON, volumeModel)).toBe(67.63)
  })
  test('Liter to Cubic Inch', () => {
    expect(conversionFunc(1, LITER, CUBIC_INCH, volumeModel)).toBe(61.02)
  })
  test('Liter to Cubic Foot', () => {
    expect(conversionFunc(1, LITER, CUBIC_FOOT, volumeModel)).toBe(0.04)
  })
  test('Liter to Cup', () => {
    expect(conversionFunc(1, LITER, CUP, volumeModel)).toBe(4.17)
  })

  test('Gallon to Liter', () => {
    expect(conversionFunc(1, GALLON, LITER, volumeModel)).toBe(3.79)
  })
  test('Gallon to Table Spoon', () => {
    expect(conversionFunc(1, GALLON, TABLESPOON, volumeModel)).toBe(256)
  })
  test('Gallon to Cubic Inch', () => {
    expect(conversionFunc(1, GALLON, CUBIC_INCH, volumeModel)).toBe(230.99)
  })
  test('Gallon to Cubic Foot', () => {
    expect(conversionFunc(1, GALLON, CUBIC_FOOT, volumeModel)).toBe(0.13)
  })
  test('Gallon to Cup', () => {
    expect(conversionFunc(1, GALLON, CUP, volumeModel)).toBe(15.77)
  })

  test('Table Spoon to Liter', () => {
    expect(conversionFunc(1, TABLESPOON, LITER, volumeModel)).toBe(0.01)
  })
  test('Table Spoon to Gallon', () => {
    expect(conversionFunc(1, TABLESPOON, GALLON, volumeModel)).toBe(0.0)
  })
  test('Table Spoon to Cubic Inch', () => {
    expect(conversionFunc(1, TABLESPOON, CUBIC_INCH, volumeModel)).toBe(0.9)
  })
  test('Table Spoon to Cubic Foot', () => {
    expect(conversionFunc(1, TABLESPOON, CUBIC_FOOT, volumeModel)).toBe(0.0)
  })
  test('Table Spoon to Cup', () => {
    expect(conversionFunc(1, TABLESPOON, CUP, volumeModel)).toBe(0.06)
  })

  test('Cubic Inch 2 Liter', () => {
    expect(conversionFunc(1, CUBIC_INCH, LITER, volumeModel)).toBe(0.02)
  })
  test('Cubic Inch 2 Table Spoon', () => {
    expect(conversionFunc(1, CUBIC_INCH, TABLESPOON, volumeModel)).toBe(1.11)
  })
  test('Cubic Inch 2 Gallon', () => {
    expect(conversionFunc(1, CUBIC_INCH, GALLON, volumeModel)).toBe(0.0)
  })
  test('Cubic Inch 2 Cubic Foot', () => {
    expect(conversionFunc(1, CUBIC_INCH, CUBIC_FOOT, volumeModel)).toBe(0.0)
  })
  test('Cubic Inch 2 Cup', () => {
    expect(conversionFunc(1, CUBIC_INCH, CUP, volumeModel)).toBe(0.07)
  })

  test('Cubic Foot to Liter', () => {
    expect(conversionFunc(1, CUBIC_FOOT, LITER, volumeModel)).toBe(28.32)
  })
  test('Cubic Foot to Cubic Inch', () => {
    expect(conversionFunc(1, CUBIC_FOOT, CUBIC_INCH, volumeModel)).toBe(1727.89)
  })
  test('Cubic Foot 2 Table Spoon', () => {
    expect(conversionFunc(1, CUBIC_FOOT, TABLESPOON, volumeModel)).toBe(1915.01)
  })
  test('Cubic Foot 2 Gallon', () => {
    expect(conversionFunc(1, CUBIC_FOOT, GALLON, volumeModel)).toBe(7.48)
  })
  test('Cubic Foot 2 Cup', () => {
    expect(conversionFunc(1, CUBIC_FOOT, CUP, volumeModel)).toBe(117.99)
  })

  test('Cup to Liter', () => {
    expect(conversionFunc(1, CUP, LITER, volumeModel)).toBe(0.24)
  })
  test('Cup to Cubic Inch', () => {
    expect(conversionFunc(1, CUP, CUBIC_INCH, volumeModel)).toBe(14.64)
  })
  test('Cup 2 Table Spoon', () => {
    expect(conversionFunc(1, CUP, TABLESPOON, volumeModel)).toBe(16.23)
  })
  test('Cup 2 Gallon', () => {
    expect(conversionFunc(1, CUP, GALLON, volumeModel)).toBe(0.06)
  })
  test('Cup 2 Cubic Foot', () => {
    expect(conversionFunc(1, CUP, CUBIC_FOOT, volumeModel)).toBe(0.01)
  })
})
