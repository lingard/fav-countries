/**
 * @flow
 */

import React, { PureComponent } from 'react'
import { FavoriteCountryButton } from 'components'

type Props = {
  country: CountryEntity,
  onRemovePress: (countryId: string) => void,
  onAddFavoritePress: (countryId: string) => void
}

export default class FavoriteCountriesListViewItemActions extends PureComponent {
  props: Props

  handleUnfavoritePress = () => {
    this.props.onUnfavoritePress(this.props.country.id)
  }

  render(): ReactElement<any> {
    return (
      <div>
        <FavoriteCountryButton
          isFavorite={this.props.country.isFavorite}
          onPress={this.handleUnfavoritePress}
        />
      </div>
    )
  }
}
