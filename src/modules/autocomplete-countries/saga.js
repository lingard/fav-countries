/**
 * @flow
 */

// eslint-disable flowtype/require-return-type
import { compose, map, trim, isEmpty, filter, contains, prop } from 'ramda'
import { delay } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import queryGooglePlacesAutocomplete from 'services/google-places-autocomplete'
import { camelizeKeys } from 'humps'
import * as AutocompleteCountriesActions from './actions'
import { hasSearchedWithTerms } from './selectors'

const DEBOUNCE_DELAY = 200

const parsePredictions = compose(
  map(camelizeKeys),
  /**
   * NOTE: I couldn't find any way to get predictions just for countries so we
   *       have to filter the result...
   */
  filter(
    compose(
      contains('country'),
      prop('types')
    )
  )
)

function *performGooglePlacesRequest(terms: string) {
  yield put(AutocompleteCountriesActions.request(terms))

  try {
    const predictions = yield call(queryGooglePlacesAutocomplete, terms, {
      types: ['(regions)'],
    })

    const parsedPredictions = parsePredictions(predictions)

    yield put(AutocompleteCountriesActions.requestSuccess(
      terms,
      parsedPredictions
    ))
  } catch (e) {
    yield put(AutocompleteCountriesActions.requestFailure(terms, e))
  }
}

function *handleTermsDidChange(action: Object) {
  const { terms } = action.payload

  yield call(delay, DEBOUNCE_DELAY)

  const trimmedTerms = terms && trim(terms)

  if (!trimmedTerms || isEmpty(trimmedTerms)) {
    return
  }

  const hasAlreadySearchedWithTerms = yield select(
    hasSearchedWithTerms(terms)
  )

  if (hasAlreadySearchedWithTerms) {
    return
  }

  yield call(performGooglePlacesRequest, terms)
}

export default function *autocompletCountriesSaga() {
  yield takeLatest(
    AutocompleteCountriesActions.termsDidChange,
    handleTermsDidChange
  )
}
