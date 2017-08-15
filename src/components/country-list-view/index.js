/**
 * @flow
 */

import React, { PureComponent } from 'react'
import type { CountryEntity } from 'entity'
import PaginatedListView from '../paginated-list-view'
import CountryListItem from './list-item'
import EmptyListView from './empty-list-view'

type Props = {
  emptyListTitle: string,
  renderCountryActions: (country: CountryEntity) => ?ReactElement<any>
}

export default class CountriesList extends PureComponent {
  props: Props

  renderEmptyList = (): ReactElement<any> => (
    <EmptyListView title={this.props.emptyListTitle} />
  )

  renderItem = (country: CountryEntity): ReactElement<any> => (
    <CountryListItem
      key={`country-${country.id}`}
      country={country}
      renderActions={this.props.renderCountryActions}
    />
  )

  render(): ReactElement<any> {
    return (
      <PaginatedListView
        renderItem={this.renderItem}
        renderEmptyList={this.renderEmptyList}
        {...this.props}
      />
    )
  }
}
