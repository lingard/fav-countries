/**
 * @flow
 */

import React from 'react'
import lifecycleLogger from 'lib/lifecycle-logger'
import AddCountryForm from '../../add-country-form'
import { MyCountriesListView } from '../../my-countries-list'
import DashboardWidget from '../widget'

const MyCountriesWidget = (): ReactElement<any> => (
  <DashboardWidget title='My Countries'>
    <AddCountryForm />
    <MyCountriesListView />
  </DashboardWidget>
)

export default lifecycleLogger()(MyCountriesWidget)
