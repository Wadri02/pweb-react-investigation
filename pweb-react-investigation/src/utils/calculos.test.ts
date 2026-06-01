import { describe, it, expect } from 'vitest'
import { suma, resta, esMayorDeEdad, formatearPrecio, dividir } from './calculos'

describe('suma', () => {
  it('suma dos números positivos', () => {
    expect(suma(2, 3)).toBe(5)
  })
  it('suma con cero', () => {
    expect(suma(0, 5)).toBe(5)
  })
  it('suma números negativos', () => {
    expect(suma(-2, -3)).toBe(-5)
  })
})

describe('resta', () => {
  it('resta dos números positivos', () => {
    expect(resta(5, 3)).toBe(2)
  })
  it('resultado negativo', () => {
    expect(resta(2, 5)).toBe(-3)
  })
})

describe('esMayorDeEdad', () => {
  it('retorna true para mayores de 18', () => {
    expect(esMayorDeEdad(20)).toBe(true)
  })
  it('retorna true exactamente a los 18', () => {
    expect(esMayorDeEdad(18)).toBe(true)
  })
  it('retorna false para menores de 18', () => {
    expect(esMayorDeEdad(17)).toBe(false)
  })
})

describe('formatearPrecio', () => {
  it('formatea con $ y 2 decimales', () => {
    expect(formatearPrecio(10)).toBe('$10.00')
  })
  it('formatea decimales correctamente', () => {
    expect(formatearPrecio(9.5)).toBe('$9.50')
  })
  it('formatea cero', () => {
    expect(formatearPrecio(0)).toBe('$0.00')
  })
})

describe('dividir', () => {
  it('divide correctamente', () => {
    expect(dividir(10, 2)).toBe(5)
  })
  it('lanza error al dividir por cero', () => {
    expect(() => dividir(5, 0)).toThrow('División por cero')
  })
})
