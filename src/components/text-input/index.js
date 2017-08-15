/**
 * @flow
 */

import { compose } from 'ramda'
import React from 'react'
import { pure, defaultProps } from 'recompose'
import { css, StyleSheet } from 'aphrodite'
import { color, vr, fontSize } from 'styles'
import lifecycleLogger from 'lib/lifecycle-logger'

const styles = StyleSheet.create({
  input: {
    height: vr(3),
    padding: `0 ${vr(1)}`,
    backgroundColor: color('background', 'textInput'),
    color: color('text', 'textInput'),
    border: 'none',
    borderRadius: '4px',
    outline: 'none',
    fontSize: fontSize('base'),
    transition: 'background 0.3s ease-out',
    ':focus': {
      backgroundColor: color('background', 'textInputFocused'),
    }
  }
})

type Props = {
  input: Object,
  label?: string,
  type?: string,
  placeholder?: string,
  style?: Object,
  className: any,
  meta: Object,
}

const TextInput = ({ className, ...other }: Props): ReactElement<any> => (
  <input
    className={css(styles.input, className)}
    {...other}
  />
)

export default compose(
  pure,
  defaultProps({
    type: 'text'
  }),
  lifecycleLogger()
)(TextInput)
