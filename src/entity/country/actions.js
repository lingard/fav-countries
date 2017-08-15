import { scopeAction } from 'utils'

const createAction = scopeAction('entity/country')

export const add = createAction(
  'add',
  (country) => ({
    country
  })
)

export const remove = createAction(
  'remove',
  (countryId) => ({
    countryId
  })
)

export const favorite = createAction(
  'favorite',
  (countryId) => ({
    countryId
  })
)

export const unfavorite = createAction(
  'unfavorite',
  (countryId) => ({
    countryId
  })
)
