import { compose, map, prop, call, filter, identity } from 'ramda'
import { fork, all } from 'redux-saga/effects'

const createRootSaga = compose(
  (sagas) => {
    return function *rootSaga() {
      yield all(sagas)
    }
  },
  map(fork),
  filter(identity),
  map(prop('saga')),
  map(call)
)

export default createRootSaga
