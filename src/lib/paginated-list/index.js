/**
 * @flow
 */

import { NAME } from './constants'
import reducer from './reducer'

export { default as createPaginatedList } from './create-paginated-list'
export type { Props as PaginatedListProps } from './create-paginated-list'

export default (): Object => ({
  reducers: {
    [NAME]: reducer
  }
})
