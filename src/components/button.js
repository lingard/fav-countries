/**
 * @flow
 */

import { compose } from 'ramda'
import React from 'react'
import { pure, defaultProps } from 'recompose'
import { css, StyleSheet } from 'aphrodite'
import { vr, rem, fontSize, color } from 'styles'
import lifecycleLogger from 'lib/lifecycle-logger'

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    outline: 'none',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '100',
    transition: 'background 0.3s ease-out',
    cursor: 'pointer'
  },

  primary: {
    color: '#fff',
    backgroundColor: color('background', 'buttonPrimary'),
    ':hover': {
      backgroundColor: color('background', 'buttonPrimaryHover')
    }
  },
  disabled: {
    backgroundColor: color('background', 'buttonDisabled'),
    cursor: 'default',
    ':hover': {
      backgroundColor: color('background', 'buttonDisabled')
    }
  },

  small: {
    height: vr(2.5),
    padding: `0 ${rem(10)}`,
    fontSize: fontSize('small'),
  },
  medium: {
    height: vr(3),
    padding: `0 ${vr(1)}`,
    fontSize: fontSize('base'),
  }
})

type Props = {
  size: 'small' | 'medium',
  color: 'primary',
  disabled?: boolean,
  onPress: (e: Event) => void,
  children: ReactNode,
}

const Button = (props: Props): ReactElement<any> => (
  <button
    className={css(
      styles.container,
      styles[props.color],
      styles[props.size],
      props.disabled && styles.disabled
    )}
    onClick={props.onPress}
    disabled={props.disabled}
  >
    {props.children}
  </button>
)

export default compose(
  pure,
  defaultProps({
    size: 'medium',
    color: 'primary'
  }),
  lifecycleLogger()
)(Button)
