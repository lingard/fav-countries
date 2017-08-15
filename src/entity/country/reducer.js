/**
 * @flow
 */

import { assoc, dissoc, over, prop, lensProp } from 'ramda'
import { handleActions } from 'redux-actions'
import * as CountryActions from './actions'

const countryReducer = handleActions({
  [CountryActions.add]: (state, action) => {
    const { country } = action.payload

    if (prop(country.id, state)) {
      return state
    }

    return assoc(
      country.id,
      country,
      state
    )
  },
  [CountryActions.remove]: (state, action) =>
    dissoc(action.payload.countryId, state),

  [CountryActions.favorite]: (state, action) =>
    over(
      lensProp(action.payload.countryId),
      assoc('isFavorite', true),
      state
    ),
  [CountryActions.unfavorite]: (state, action) =>
    over(
      lensProp(action.payload.countryId),
      assoc('isFavorite', false),
      state
    )
}, {})

// {
//   1: {
//     id: 1,
//     name: 'sweden'
//   },
//   2: {
//     id: 2,
//     name: 'denmark'
//   },
//   3: {
//     id: 3,
//     name: 'ahaha'
//   },
//   4: {
//     id: 4,
//     name: 'norway'
//   },
//   5: {
//     id: 5,
//     name: 'holland'
//   },
//   6: {
//     id: 6,
//     name: 'germany'
//   },
//   7: {
//     id: 7,
//     name: 'england'
//   },
//   8: {
//     id: 8,
//     name: 'scottland'
//   },
//   9: {
//     id: 9,
//     name: 'italy'
//   },
//   10: {
//     id: 10,
//     name: 'ireland'
//   },
//   11: {
//     id: 11,
//     name: 'france'
//   },
//   12: {
//     id: 12,
//     name: 'finland'
//   },
// }

export default countryReducer
