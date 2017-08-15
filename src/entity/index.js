/**
 * @flow
 */

import Country from './country'
import createEntitiesReducer from './create-reducer'

export type {
  CountryEntity
} from './country/types'

export {
  Country
}

const entityReducer = createEntitiesReducer([
  Country
])

export default (): Object => ({
  reducers: {
    entities: entityReducer
  }
})
