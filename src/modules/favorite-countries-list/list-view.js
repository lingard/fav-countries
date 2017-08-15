/**
 * @flow
 */

import { compose } from 'ramda'
import React, { PureComponent } from 'react'
import { CountryListView } from 'components'
import { connect } from 'react-redux'
import { createPaginatedList } from 'lib/paginated-list'
import { Country } from 'entity'
import { selectFavoriteCountriesListItems } from './selectors'
import ListItemActions from './list-item-actions'

import type { PaginatedListProps } from 'lib/paginated-list'
import type { CountryEntity } from 'entity'

type Props = PaginatedListProps

class FavoriteCountriesListView extends PureComponent {
  props: Props

  renderCountryActions = (country: CountryEntity): ReactElement<any> => (
    <ListItemActions
      country={country}
      onUnfavoritePress={this.props.unfavoriteCountry}
    />
  )

  render(): ReactElement<any> {
    return (
      <CountryListView
        data={this.props.itemsForCurrentPage}
        emptyListTitle='List your favorite countries here...'
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
  createPaginatedList(selectFavoriteCountriesListItems, {
    itemsPerPage: 10
  }),
  connect(null, {
    unfavoriteCountry: Country.actions.unfavorite,
  })
)(FavoriteCountriesListView)
