/**
 * @flow
 */

import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import MyCountriesWidget from './widgets/my-countries'
import MyFavoriteCountriesWidget from './widgets/favorite-countries'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Dashboard = (): ReactElement<any> => (
  <div className={css(styles.container)}>
    <MyCountriesWidget />
    <MyFavoriteCountriesWidget />
  </div>
)

export default Dashboard
