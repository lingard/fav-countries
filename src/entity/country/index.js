import createEntity from '../create-entity'
import * as actions from './actions'
import reducer from './reducer'
import { createFromPlace } from './utils'

const Country = createEntity('country', actions, reducer)

Country.createFromPlace = createFromPlace

export default Country
