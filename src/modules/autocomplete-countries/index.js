import autoCompleteCountriesSaga from './saga'
import autoCompleteCountriesReducer from './reducer'
import { NAME } from './constants'

export { default as AutocompleteCountriesInput } from './input'

export default () => ({
  saga: autoCompleteCountriesSaga,
  reducers: {
    [NAME]: autoCompleteCountriesReducer
  }
})
