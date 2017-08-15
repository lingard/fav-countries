/**
 * @flow
 */

import invariant from 'invariant'

let service

const getAutocompleteService = (): ?window.google.maps.places.AutocompleteService => {
  if (service) {
    return service
  }

  invariant(
    window.google.maps.places,
    'Google maps has not been correctly configured...'
  )

  service = new window.google.maps.places.AutocompleteService()

  return service
}

const queryGooglePlacesAutocomplete = (
  query: string,
  options: Object = {}
): Promise<*, *> => {
  const service = getAutocompleteService()

  return new Promise((resolve: Resolve, reject: Reject) => {
    service.getPlacePredictions({
      ...options,
      input: query,
    }, (places: ?Array<Object>, status: string) => {
      if (status !== global.google.maps.places.PlacesServiceStatus.OK) {
        reject(status)
      }

      resolve(places)
    })
  })
}

export default queryGooglePlacesAutocomplete
