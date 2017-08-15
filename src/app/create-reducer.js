import { compose, mergeAll, map, prop, call } from 'ramda'
import { combineReducers } from 'redux'

const createReducer = compose(
  combineReducers,
  mergeAll,
  map(prop('reducers')),
  map(call)
)

export default createReducer
