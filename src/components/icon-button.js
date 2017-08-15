/**
 * @flow
 */

import { compose } from 'ramda'
import React from 'react'
import { pure, defaultProps, hoistStatics } from 'recompose'
import { css, StyleSheet } from 'aphrodite'
import lifecycleLogger from 'lib/lifecycle-logger'
import { rem } from 'styles'
import Icon from './icon'

const SIZE = {
  SMALL: 'small',
  LARGE: 'large'
}

const styles = StyleSheet.create({
  container: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    cursor: 'pointer'
  },

  small: {
    height: rem(24),
    width: rem(24),
  },
  large: {
    height: rem(32),
    width: rem(32),
  }
})

type Props = {
  size: 'small' | 'large',
  onPress: (e: Event) => void
}

const IconButton = (props: Props): ReactElement<any> => {
  const { size, onPress, ...other } = props

  return (
    <button className={css(styles.container)} onClick={onPress}>
      <Icon size={size} {...other} />
    </button>
  )
}

IconButton.SIZE = SIZE

export default hoistStatics(compose(
  defaultProps({
    size: 'small'
  }),
  pure,
  lifecycleLogger()
))(IconButton)
