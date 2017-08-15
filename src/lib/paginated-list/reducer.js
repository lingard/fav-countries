import { dissoc, over, lensPath, always } from 'ramda'
import * as PaginatedListActions from './actions'

const initialListState = {
  currentPage: 1
}
const initialState = {}

const paginatedListReducer = (state = initialState, action) => {
  const { key } = action.payload || {}

  if (!key) {
    return state
  }

  switch (action.type) {
    // Lifecycle
    case PaginatedListActions.WILL_MOUNT_LIST: {
      const { initialValues } = action.payload

      return {
        ...state,
        [key]: {
          ...initialListState,
          ...initialValues
        }
      }
    }

    case PaginatedListActions.WILL_UNMOUNT_LIST: {
      return dissoc(key, state)
    }

    // Pagination...
    case PaginatedListActions.GO_TO_PAGE: {
      return over(
        lensPath([key, 'currentPage']),
        always(action.payload.page),
        state
      )
    }
  }

  return state
}

export default paginatedListReducer
