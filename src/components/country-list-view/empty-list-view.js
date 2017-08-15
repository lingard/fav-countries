/**
 * @flow
 */

import React from 'react'
import { pure } from 'recompose'
import { css, StyleSheet } from 'aphrodite'
import { fontSize } from 'styles'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: fontSize('base')
  }
})

type Props = {
  title: string
}

const EmptyListView = (props: Props): ReactElement<any> => (
  <div className={css(styles.container)}>
    <p className={css(styles.title)}>{props.title}</p>
  </div>
)

export default pure(EmptyListView)
