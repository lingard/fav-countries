import { createAction } from 'redux-actions'

export const WILL_MOUNT_LIST = 'paginatedList/WILL_MOUNT_LIST'
export const WILL_UNMOUNT_LIST = 'paginatedList/WILL_UNMOUNT_LIST'
export const GO_TO_PAGE = 'paginatedList/GO_TO_PAGE'

export const willMountList = createAction(
  WILL_MOUNT_LIST,
  key => ({
    key
  })
)

export const willUnmountList = createAction(
  WILL_UNMOUNT_LIST,
  key => ({
    key
  })
)

export const goToPage = createAction(
  GO_TO_PAGE,
  (key, page) => ({
    key,
    page
  })
)
