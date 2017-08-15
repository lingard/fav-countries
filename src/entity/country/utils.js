/**
 * @flow
 */

import { CountryEntity } from './types'

// TODO: Move somewhere...
type Place = {
  placeId: string,
  description: string,
}

export const createFromPlace = (place: Place): CountryEntity => ({
  id: place.placeId,
  name: place.description,
  isFavorite: false
})
