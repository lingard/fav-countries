import { sortBy, prop } from 'ramda'
import { createSelector } from 'reselect'
import { Country } from 'entity'

export const selectMyCountriesListItems = createSelector(
  [Country.select.all],
  sortBy(prop('name'))
)
