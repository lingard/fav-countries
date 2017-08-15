/**
 * @flow
 */

import { compose } from 'ramda'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { CountryListView } from 'components'
import { createPaginatedList } from 'lib/paginated-list'
import { Country } from 'entity'
import { selectMyCountriesListItems } from './selectors'
import ListItemActions from './list-item-actions'

import type { PaginatedListProps } from 'lib/paginated-list'
import type { CountryEntity } from 'entity'

type Props = PaginatedListProps & {
  removeCountry: (countryId: string) => void,
  addFavoriteCountry: (countryId: string) => void
}

class MyCountriesList extends PureComponent {
  props: Props

  renderCountryActions = (
    country: CountryEntity,
    isHovering: boolean
  ): ReactElement<any> => (
    <ListItemActions
      country={country}
      isHovering={isHovering}
      onRemovePress={this.props.removeCountry}
      onAddFavorite={this.props.addFavoriteCountry}
      onRemoveFavorite={this.props.removeFavoriteCountry}
    />
  )

  render(): ReactElement<any> {
    return (
      <CountryListView
        data={this.props.itemsForCurrentPage}
        emptyListTitle='Add some countries that you have visited'
        hasNextPage={this.props.hasNextPage}
        hasPrevPage={this.props.hasPrevPage}
        onPrevPagePress={this.props.goToPrevPage}
        onNextPagePress={this.props.goToNextPage}
        renderCountryActions={this.renderCountryActions}
      />
    )
  }
}

export default compose(
  createPaginatedList(selectMyCountriesListItems, {
    itemsPerPage: 10
  }),
  connect(null, {
    removeCountry: Country.actions.remove,
    addFavoriteCountry: Country.actions.favorite,
    removeFavoriteCountry: Country.actions.unfavorite
  })
)(MyCountriesList)
