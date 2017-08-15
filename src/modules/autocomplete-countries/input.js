/**
 * @flow
 */

import { is } from 'ramda'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { AutocompleteInput } from 'components'
import * as AutocompleteCountriesActions from './actions'
import { selectAutocompleteState } from './selectors'

type Props = {
  currentTerms: string,
  predictions: Array<Object>,
  onTermsChange: (terms: string) => void,
  onSelectCountry: (place: Object) => void,
  onChange?: (terms: string) => void
}

class AutocompleteCountriesInput extends PureComponent {
  props: Props

  clearTerms() {
    this.props.onTermsChange('')
  }

  handleChange = (value: string) => {
    this.props.onTermsChange(value)

    if (is(Function, this.props.onChange)) {
      this.props.onChange(value)
    }
  }

  handleSelectSuggestion = (place: Object) => {
    this.props.onSelectCountry(place)
  }

  mapSuggestionToTitle = (place: Object): string => place.description
  mapSuggestionToValue = (place: Object): string => place.description

  render(): ReactElement<any> {
    const { currentTerms, predictions, onChange, ...other } = this.props

    return (
      <AutocompleteInput
        value={currentTerms}
        suggestions={predictions}
        placeholder='Search for country'
        onChange={this.handleChange}
        onSelectSuggestion={this.handleSelectSuggestion}
        mapSuggestionToTitle={this.mapSuggestionToTitle}
        mapSuggestionToValue={this.mapSuggestionToValue}
        {...other}
      />
    )
  }
}

const mapDispatchToActions = {
  onTermsChange: AutocompleteCountriesActions.termsDidChange
}

export default connect(
  selectAutocompleteState,
  mapDispatchToActions,
  null,
  { withRef: true }
)(AutocompleteCountriesInput)
