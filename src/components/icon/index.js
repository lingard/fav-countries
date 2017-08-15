/**
 * @flow
 */

import { compose } from 'ramda'
import React from 'react'
import { pure, defaultProps, hoistStatics } from 'recompose'
import { css, StyleSheet } from 'aphrodite'
import lifecycleLogger from 'lib/lifecycle-logger'
import invariant from 'invariant'
import ICONS from './icons'

const DEFAULT_COLOR = '#A6A6A6'
const YELLOW_COLOR = '#FAC92F'

const COLOR = {
  DEFAULT: 'default',
  YELLOW: 'yellow'
}

const SIZE = {
  SMALL: 'small',
  LARGE: 'large'
}

const FILL_MODE = {
  FILL: 'fill',
  STROKE: 'stroke'
}

const styles = StyleSheet.create({
  container: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // sizes
  small: {

  },
  large: {

  },

  // fill modes
  fill: {

  },

  stroke: {
    fill: 'transparent',
    strokeWidth: '2px'
  },
})

const fillStyles = StyleSheet.create({
  default: {
    fill: DEFAULT_COLOR
  },
  yellow: {
    fill: YELLOW_COLOR
  }
})

const strokeStyles = StyleSheet.create({
  default: {
    stroke: DEFAULT_COLOR
  },
  yellow: {
    stroke: YELLOW_COLOR
  }
})

type Props = {
  size: string,
  name: string,
  color: string,
  fillMode: string,
  className: string,
  style: any
}

const Icon = (props: Props): ReactElement<any> => {
  const {
    name,
    size,
    className,
    style,
    color,
    fillMode,
    ...other
  } = props

  const IconComponent = ICONS[name]

  invariant(
    IconComponent,
    `${name} is not a valid icon.`
  )

  return (
    <div
      style={style}
      className={css(
        styles.container,
        // styles[color],
        styles[size],
        styles[fillMode],
        fillMode === FILL_MODE.FILL
          ? fillStyles[color]
          : strokeStyles[color],
        className
      )}
    >
      <IconComponent
        size={size}
        {...other}
      />
    </div>
  )
}

Icon.SIZE = SIZE
Icon.FILL_MODE = FILL_MODE
Icon.COLOR = COLOR
// Icon.ICON = keys(ICONS

export default hoistStatics(compose(
  defaultProps({
    color: COLOR.DEFAULT,
    size: SIZE.SMALL,
    fillMode: FILL_MODE.FILL
  }),
  pure,
  lifecycleLogger()
))(Icon)
