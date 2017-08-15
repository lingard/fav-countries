import { path } from 'ramda'

export const BLUE = '#4990E2'

export const BACKGROUND_COLOR = '#FAFAFA'

export const BASE_TEXT_COLOR = '#4A4A4A'
export const EMPHASIZED_TEXT_COLOR = '#000000'

export const PRIMARY_BUTTON_BACKGROUND_COLOR = BLUE
export const PRIMARY_BUTTON_HOVER_BACKGROUND_COLOR = '#4182CC'

export const DISABLED_BUTTON_BACKGROUND_COLOR = '#EDEDED'

export const TEXT_INPUT_BACKGROUND_COLOR = '#EDEDED'
export const TEXT_INPUT_FOCUSED_BACKGROUND_COLOR = '#E6E6E6'
export const TEXT_INPUT_TEXT_COLOR = '#A6A6A6'

export const colors = {
  text: {
    base: BASE_TEXT_COLOR,
    emphasized: EMPHASIZED_TEXT_COLOR,
    textInput: TEXT_INPUT_TEXT_COLOR
  },
  background: {
    base: BACKGROUND_COLOR,
    accent: BLUE,
    textInput: TEXT_INPUT_BACKGROUND_COLOR,
    textInputFocused: TEXT_INPUT_FOCUSED_BACKGROUND_COLOR,
    buttonPrimary: PRIMARY_BUTTON_BACKGROUND_COLOR,
    buttonPrimaryHover: PRIMARY_BUTTON_HOVER_BACKGROUND_COLOR,
    buttonDisabled: DISABLED_BUTTON_BACKGROUND_COLOR
  }
}

export const color = (type, name) =>
  path([type, name], colors)
