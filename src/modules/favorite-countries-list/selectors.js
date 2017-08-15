import { __, compose, filter, prop, contains, sortBy } from 'ramda'
import { createSelector } from 'reselect'
import { Country } from 'entity'
import { NAME } from './constants'

// TODO: Fix memoization as this selector will create a new list every time the
//       Country entity state changes...
export const selectFavoriteCountriesListItems = createSelector(
  [prop(NAME), Country.select.all],
  (ids, countries) =>
    compose(
      sortBy(prop('name')),
      filter(compose(
        contains(__, ids),
        prop('id')
      ))
    )(countries)
)
