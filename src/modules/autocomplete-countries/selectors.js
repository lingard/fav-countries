/**
 * @flow
 */

import R from 'ramda'
import { createSelector } from 'reselect'
import { isNotNil } from 'utils'
import { NAME } from './constants'

const stateLens = R.lensProp(NAME)
const historyLens = R.compose(stateLens, R.lensProp('history'))
const predictionsByTermsLens = R.compose(
  stateLens,
  R.lensProp('predictionsByTerms')
)

const selectState = R.prop(NAME)

export const selectPredictionsForTerms = (state: Object, terms: string): ?Array<Object> =>
  R.view(
    R.compose(predictionsByTermsLens, R.lensProp(terms)),
    state
  )

export const findLastTermsWithPredictions = (state: Object): ?string => {
  const history = R.view(historyLens, state)
  const readyTerms = R.find((terms: string): boolean =>
    !!selectPredictionsForTerms(state, terms),
    history
  )

  return readyTerms
}

const selectLatestPredictions = (state: Object): ?Array<Object> => {
  const latestTermsWithPredictions = findLastTermsWithPredictions(state)

  if (!latestTermsWithPredictions) {
    return []
  }

  return selectPredictionsForTerms(
    state,
    latestTermsWithPredictions
  )
}

export const selectCurrentTerms = R.compose(
  R.prop('currentTerms'),
  selectState
)

export const selectIsSearching = R.compose(
  R.prop('isSearching'),
  selectState
)

export const hasSearchedWithTerms = R.curry((terms: string, state: Object): boolean => {
  const predictions = selectPredictionsForTerms(state, terms)

  return isNotNil(predictions)
})

export const hasSearchedWithCurrentTerms = (state: Object): boolean => {
  const currentTerms = selectCurrentTerms(state)

  if (!currentTerms) {
    return false
  }

  return hasSearchedWithTerms(currentTerms, state)
}

export const selectAutocompleteState = createSelector(
  [
    selectLatestPredictions,
    selectCurrentTerms,
  ],
  (
    predictions: Array<object> = [],
    currentTerms: string,
  ): Object => ({
    predictions,
    currentTerms,
  })
)
