/**
 * @flow
 */

import { compose } from 'ramda'
import React from 'react'
import { pure } from 'recompose'
import withHover from 'react-with-hover'
import lifecycleLogger from 'lib/lifecycle-logger'
import IconButton from './icon-button'
import Icon from './icon'

type Props = {
  isFavorite: boolean,
  isHovering: boolean,
  onPress: (e: Event) => void
}

const getFillMode = (isHovering: boolean, isFavorite: boolean): string => {
  if (
    (!isFavorite && !isHovering) ||
    (isFavorite && isHovering)
  ) {
    return Icon.FILL_MODE.STROKE
  }

  return Icon.FILL_MODE.FILL
}

const getColor = (isHovering: boolean, isFavorite: boolean): string => {
  if (
    (isFavorite && isHovering) ||
    !isFavorite
  ) {
    return Icon.COLOR.DEFAULT
  }

  return Icon.COLOR.YELLOW
}

const FavoriteCountryButton = (props: Props): ReactElement<any> => {
  const { isFavorite, isHovering } = props

  const fillMode = getFillMode(isHovering, isFavorite)
  const color = getColor(isHovering, isFavorite)

  return (
    <IconButton
      name='star'
      size={IconButton.SIZE.SMALL}
      fillMode={fillMode}
      color={color}
      onPress={props.onPress}
    />
  )
}

export default compose(
  pure,
  // NOTE: find/create a better hover hoc...
  withHover({
    transform: (isHovering: boolean): Object => ({
      isHovering
    }),
    containerStyle: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }),
  lifecycleLogger()
)(FavoriteCountryButton)
