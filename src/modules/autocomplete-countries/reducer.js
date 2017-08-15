import R from 'ramda'
import { combineReducers } from 'redux'
import * as AutocompleteCountriesActions from './actions'

const initialState = {
  predictionsByTerms: {},
  isSearching: false,
  currentTerms: '',
  history: []
}

const predictionsByTerms = (state = initialState.predictionsByTerms, action) => {
  if (action.type === AutocompleteCountriesActions.REQUEST_SUCCESS) {
    const { terms, predictions } = action.payload

    return {
      ...state,
      [terms]: R.union(R.propOr([], terms, state), predictions)
    }
  }

  return state
}

const isSearching = (state = initialState.isSearching, action) => {
  switch (action.type) {
    case AutocompleteCountriesActions.REQUEST:
      return true

    case AutocompleteCountriesActions.REQUEST_SUCCESS:
    case AutocompleteCountriesActions.REQUEST_FAILURE:
      return false
  }

  return state
}

// addToHistory :: String -> State -> State
const addToHistory = R.converge(
  R.prepend,
  [
    R.identity,
    (terms, history) => R.ifElse(
      R.compose(R.flip(R.gt)(-1), R.indexOf(terms)),
      R.without([terms]),
      R.identity
    )(history)
  ]
)

function history(state = initialState.history, action) {
  if (action.type === AutocompleteCountriesActions.TERMS_DID_CHANGE) {
    const { terms } = action.payload

    if (R.gt(R.length(terms), 0)) {
      return addToHistory(terms, state)
    }

    return initialState.history
  }

  return state
}

function currentTerms(state = initialState.currentTerms, action) {
  if (action.type === AutocompleteCountriesActions.TERMS_DID_CHANGE) {
    const { terms } = action.payload

    return terms
  }

  return state
}

const reducer = combineReducers({
  predictionsByTerms,
  isSearching,
  history,
  currentTerms
})

export default function autocompleteCountriesReducer(state, action) {
  if (action.type === AutocompleteCountriesActions.RESET) {
    return {
      ...initialState,
      predictionsByTerms: state.predictionsByTerms
    }
  }

  return reducer(state, action)
}
