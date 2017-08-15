import R from 'ramda'
import { createAction } from 'redux-actions'

// scopeAction :: String -> ActionCreator -> Action
export const scopeAction = R.curry(name =>
  (type, ...args) =>
    createAction(`${name}/${type}`, ...args)
)

// isNotNil :: * -> Boolean
export const isNotNil = R.compose(R.not, R.isNil)

// isNotEmpty :: Array -> Boolean
export const isNotEmpty = R.compose(
  R.not,
  R.isEmpty
)
