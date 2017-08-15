import { createAction } from 'redux-actions'

export const TERMS_DID_CHANGE = 'autocomplete-countries/TERMS_DID_CHANGE'

export const REQUEST = 'autocomplete-countries/REQUEST'
export const REQUEST_SUCCESS = 'autocomplete-countries/REQUEST_SUCCESS'
export const REQUEST_FAILURE = 'autocomplete-countries/REQUEST_FAILURE'

export const RESET = 'autocomplete-countries/RESET'

export const termsDidChange = createAction(
  TERMS_DID_CHANGE,
  (terms) => ({
    terms
  })
)

export const request = createAction(
  REQUEST,
  (terms) => ({
    terms
  })
)

export const requestSuccess = createAction(
  REQUEST_SUCCESS,
  (terms, predictions) => ({
    terms,
    predictions
  })
)

export const requestFailure = createAction(
  REQUEST_FAILURE,
  (terms, error) => ({
    terms,
    error
  })
)

export const reset = createAction(
  RESET
)
