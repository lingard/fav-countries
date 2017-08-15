/**
 * @flow
 */

import { compose } from 'ramda'
import React from 'react'
import { pure } from 'recompose'
import { css, StyleSheet } from 'aphrodite'
import withHover from 'react-with-hover'
import { vr, fontSize } from 'styles'
import lifecycleLogger from 'lib/lifecycle-logger'
import type { CountryEntity } from 'entity'

const HEIGHT = vr(3)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    height: HEIGHT,
    padding: `0 ${vr(2)}`,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    }
  },
  name: {
    fontSize: fontSize('base'),
  }
})

type Props = {
  country: CountryEntity,
  isHovering: boolean,
  renderActions: (country: CountryEntity, isHovering: boolean) => ReactElement<any>,
}

const CountryListItem = (props: Props): ReactElement<any> => (
  <div
    className={css(styles.container)}
  >
    <p className={css(styles.name)}>{props.country.name}</p>
    {props.renderActions(props.country, props.isHovering)}
  </div>
)

CountryListItem.HEIGHT = HEIGHT

export default compose(
  pure,
  withHover({
    transform: (isHovering: boolean): Object => ({
      isHovering
    }),
    containerStyle: {}
  }),
  lifecycleLogger()
)(CountryListItem)
