/**
 * @flow
 */

import { compose, isEmpty } from 'ramda'
import React from 'react'
import { pure, defaultProps } from 'recompose'
import { css, StyleSheet } from 'aphrodite'
import lifecycleLogger from 'lib/lifecycle-logger'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

type Props = {
  data: Array<any>,
  renderItem: (item: any) => void,
  renderEmptyList: () => void,
}

const ListView = (props: Props): ReactElement<any> => {
  const { data } = props

  if (isEmpty(data)) {
    return props.renderEmptyList()
  }

  return (
    <div className={css(styles.container)}>
      {props.data.map(props.renderItem)}
    </div>
  )
}

export default compose(
  defaultProps({
    renderEmptyList: (): null => null,
    data: []
  }),
  pure,
  lifecycleLogger()
)(ListView)
