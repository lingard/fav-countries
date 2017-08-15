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

export default countryReducer
