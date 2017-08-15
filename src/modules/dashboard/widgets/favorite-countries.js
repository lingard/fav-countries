/**
 * @flow
 */

import React from 'react'
import lifecycleLogger from 'lib/lifecycle-logger'
import { FavoriteCountriesListView } from '../../favorite-countries-list'
import DashboardWidget from '../widget'

const MyFavoriteCountriesWidget = (): ReactElement<any> => (
  <DashboardWidget title='My Favorites' icon='star'>
    <FavoriteCountriesListView />
  </DashboardWidget>
)

export default lifecycleLogger()(MyFavoriteCountriesWidget)
