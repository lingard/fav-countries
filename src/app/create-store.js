import { compose } from 'ramda'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { persistStore, autoRehydrate } from 'redux-persist'
import logger from 'redux-logger'

export default (reducer, saga) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleWare = [sagaMiddleware, logger]

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

  const enhancer = composeEnhancers(
    applyMiddleware(...middleWare),
    autoRehydrate()
  )

  const store = createStore(
    reducer,
    enhancer
  )

  store.close = () => store.dispatch(END)

  sagaMiddleware.run(saga)
  persistStore(store, {
    whitelist: [
      'entities',
      'my-countries-list',
      'favorite-countries-list'
    ]
  })

  return store
}
