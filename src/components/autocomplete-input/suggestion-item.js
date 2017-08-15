/**
 * @flow
 */

import { compose } from 'ramda'
import React from 'react'
import { pure, withHandlers } from 'recompose'
import { css, StyleSheet } from 'aphrodite'
import { vr, fontSize, color } from 'styles'
import lifecycleLogger from 'lib/lifecycle-logger'

const HEIGHT = vr(3)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    height: HEIGHT,
    padding: `0 ${vr(1)}`,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    // transition: 'background 0.3s ease-out'
  },
  selected: {
    backgroundColor: color('background', 'accent')
  },
  title: {
    fontSize: fontSize('base'),
    color: color('text', 'base')
  },
  selectedTitle: {
    color: '#fff'
  }
})

type Props = {
  title: string,
  isSelected: boolean,
  onMouseOver: () => void,
  onTouchStart: () => void,
  onMouseDown: () => void
}

const SuggestionListItem = (props: Props): ReactElement<any> => (
  <div
    className={css(
      styles.container,
      props.isSelected && styles.selected
    )}
    onMouseOver={props.onMouseOver}
    onTouchStart={props.onTouchStart}
    onMouseDown={props.onMouseDown}
  >
    <span
      className={css(
        styles.title,
        props.isSelected && styles.selectedTitle
      )}
    >
      {props.title}
    </span>
  </div>
)

SuggestionListItem.HEIGHT = HEIGHT

export default compose(
  withHandlers({
    onMouseOver: (props: Object) => (): void =>
      props.onMouseOver(props.index),
    onTouchStart: (props: Object) => (): void =>
      props.onMouseOver(props.index),
    onMouseDown: (props: Object) => (): void =>
      props.onMouseDown(props.index)
  }),
  pure,
  lifecycleLogger()
)(SuggestionListItem)
