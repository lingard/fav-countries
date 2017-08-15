import { without, append } from 'ramda'
import { handleActions } from 'redux-actions'
import { Country } from 'entity'

const initialState = []

export default handleActions({
  [Country.actions.favorite]: (state, action) =>
    append(action.payload.countryId, state),
  [Country.actions.unfavorite]: (state, action) =>
    without([action.payload.countryId], state),

  [Country.actions.remove]: (state, action) =>
    without([action.payload.countryId], state),
}, initialState)
