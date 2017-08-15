import favoriteCountriesListReducer from './reducer'
import { NAME } from './constants'

export { default as FavoriteCountriesListView } from './list-view'

export default () => ({
  reducers: {
    [NAME]: favoriteCountriesListReducer
  }
})
