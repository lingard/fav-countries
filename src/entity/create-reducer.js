import { combineReducers } from 'redux'
import { compose, map, converge, objOf, prop, mergeAll } from 'ramda'

const createEntitiesReducer = compose(
  combineReducers,
  mergeAll,
  map(
    converge(
      objOf,
      [prop('name'), prop('reducer')]
    )
  )
)

export default createEntitiesReducer
