/**
 * @flow
 */

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { css, StyleSheet } from 'aphrodite'
import { vr } from 'styles'
import { Button } from 'components'
import { Country } from 'entity'
import { AutocompleteCountriesInput } from '../autocomplete-countries'

import type { CountryEntity } from 'entity'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `0 ${vr(2)} ${vr(2)} ${vr(2)}`
  },
  input: {
    flex: 1,
    marginRight: vr(1.5)
  }
})

type Props = {
  addCountry: (country: CountryEntity) => void,
  onSelectCountry: (country: CountryEntity) => void,
  onQueryChange: (query: string) => void
}

type State = {
  selectedCountry: ?CountryEntity
}

class AddCountryForm extends PureComponent {
  props: Props
  state: State = {
    selectedCountry: null
  }

  handleAddPress = () => {
    this.props.addCountry(this.state.selectedCountry)

    this._input.wrappedInstance.clearTerms()

    this.setState({
      selectedCountry: null
    })
  }

  handleSelectCountry = (place: CountryEntity) => {
    const country = Country.createFromPlace(place)

    this.setState({
      selectedCountry: country
    })
  }

  handleChange = () => {
    this.setState({
      selectedCountry: null
    })
  }

  setInputRef = (component: AutocompleteCountriesInput) => {
    this._input = component
  }

  render(): ReactElement<any> {
    const { selectedCountry } = this.state

    return (
      <div className={css(styles.container)}>
        <AutocompleteCountriesInput
          ref={this.setInputRef}
          className={styles.input}
          onSelectCountry={this.handleSelectCountry}
          onChange={this.handleChange}
        />

        <Button
          size='medium'
          disabled={!selectedCountry}
          onPress={this.handleAddPress}
        >
          Add +
        </Button>
      </div>
    )
  }
}

export default connect(null, {
  addCountry: Country.actions.add,
})(AddCountryForm)
