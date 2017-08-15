/**
 * @flow
 */

import React from 'react'
import { Provider } from 'react-redux'
import entities from 'entity'
import paginatedList from 'lib/paginated-list'
import {
  Dashboard,
  MyCountriesList,
  FavoriteCountriesList,
  AutocompleteCountries
} from 'modules'
import createStore from './create-store'
import createRootSaga from './create-saga'
import createReducer from './create-reducer'

const modules = [
  entities,
  paginatedList,
  MyCountriesList,
  FavoriteCountriesList,
  AutocompleteCountries
]

const reducer = createReducer(modules)
const saga = createRootSaga(modules)
const store = createStore(reducer, saga)

const App = (): ReactElement<any> => (
  <Provider store={store}>
    <Dashboard />
  </Provider>
)

export default App
