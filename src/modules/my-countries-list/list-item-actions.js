/**
 * @flow
 */

import React, { PureComponent } from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as Animated from 'animated/lib/targets/react-dom'
import { IconButton, FavoriteCountryButton } from 'components'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  buttonWrapper: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  }
})

type Props = {
  country: CountryEntity,
  isHovering: boolean,
  onRemovePress: (countryId: string) => void,
  onAddFavorite: (countryId: string) => void,
  onRemoveFavorite: (countryId: string) => void
}

export default class MyCountriesListViewItemActions extends PureComponent {
  props: Props

  _hoverAnimation = new Animated.Value(0)

  componentWillUpdate(nextProps: Props) {
    if (nextProps.isHovering !== this.props.isHovering) {
      Animated.timing(this._hoverAnimation, {
        toValue: nextProps.isHovering ? 1 : 0,
        duration: 150,
      }).start()
    }
  }

  handleRemovePress = () => {
    this.props.onRemovePress(this.props.country.id)
  }

  handleFavoriteButtonPress = () => {
    const { country } = this.props

    if (country.isFavorite) {
      this.props.onRemoveFavorite(this.props.country.id)

      return
    }

    this.props.onAddFavorite(this.props.country.id)
  }

  render(): ReactElement<any> {
    const { country } = this.props
    const { isFavorite } = country

    return (
      <div className={css(styles.container)}>
        <Animated.div
          className={css(styles.buttonWrapper)}
          style={{
            opacity: this._hoverAnimation
          }}
        >
          <IconButton
            size='small'
            name='trash'
            onPress={this.handleRemovePress}
          />
        </Animated.div>

        <Animated.div
          className={css(styles.buttonWrapper)}
          style={{
            opacity: this._hoverAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [(isFavorite ? 1 : 0), 1]
            })
          }}
        >
          <FavoriteCountryButton
            isFavorite={isFavorite}
            onPress={this.handleFavoriteButtonPress}
          />
        </Animated.div>
      </div>
    )
  }
}
