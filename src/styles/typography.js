import { __, compose, multiply, divide, prop, concat, toString } from 'ramda'

export const BASE_FONT_SIZE = 18
export const BASE_LINE_HEIGHT = 1.5

export const BASE_LEADING = 12 // ...

export const FONT_FAMILY = [
  'Helvetica Neue',
  'Helvetica',
  'Arial',
  'sans-serif'
]

export const TYPE_SCALE = {
  xLarge: 32,
  large: 26,
  medium: 20,
  base: BASE_FONT_SIZE,
  small: 14,
  xSmall: 12
}

// rem :: Number -> String
export const rem = compose(
  concat(__, 'rem'),
  toString,
  // Math.round,
  divide(__, BASE_FONT_SIZE)
)

// vr :: Number -> String
export const vr = compose(
  rem,
  multiply(BASE_LEADING)
)

// fontSize :: String -> String
export const fontSize = compose(
  rem,
  prop(__, TYPE_SCALE)
)
