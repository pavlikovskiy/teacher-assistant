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
  const { LITER, GALLON } = VolumeUnitEnum

  test('Liter to Gallon', () => {
    expect(conversionFunc(1, LITER, GALLON, volumeModel)).toBe(0.26)
  })

  test('Gallon to Liter', () => {
    expect(conversionFunc(1, GALLON, LITER, volumeModel)).toBe(3.79)
  })
})
