export const suma = (a: number, b: number) => a + b

export const resta = (a: number, b: number) => a - b

export const esMayorDeEdad = (edad: number): boolean => edad >= 18

export const formatearPrecio = (n: number): string =>
  `$${n.toFixed(2)}`

export const dividir = (a: number, b: number): number => {
  if (b === 0) throw new Error('División por cero')
  return a / b
}
