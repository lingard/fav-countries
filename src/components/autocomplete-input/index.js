/**
 * @flow
 */

import { nth, isNil } from 'ramda'
import React, { PureComponent } from 'react'
import * as Animated from 'animated/lib/targets/react-dom'
import { css, StyleSheet } from 'aphrodite'
import { isNotEmpty } from 'utils'
import lifecycleLogger from 'lib/lifecycle-logger'
import TextInput from '../text-input'
import SuggestionListItem from './suggestion-item'

const KEYS = {
  ENTER: 'Enter',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ESCAPE: 'Escape'
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative'
  },
  input: {
    flex: 1
  },
  menu: {
    position: 'absolute',
    overflow: 'scroll',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: SuggestionListItem.HEIGHT * 5,
    backgroundColor: '#fff',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.10)',
    borderRadius: '3px',
  }
})

type Props = {
  value?: string,
  placeholder?: string,
  suggestions: Array<any>,
  onChange: (event: Event) => void,
  onSelectSuggestion: (suggestion: any) => void,
  mapSuggestionToTitle: (suggestion: any) => string,
  mapSuggestionToValue: (suggestion: any) => string,
  className?: any
}

type State = {
  isFocused: boolean,
  highlightedIndex: number,
  menuOpen: boolean
}

class AutocompleteInput extends PureComponent {
  props: Props
  state: State = {
    isFocused: false,
    menuOpen: false,
    highlightedIndex: null
  }

  _ignoreOpenMenu = false

  static defaultProps = {
    suggestions: []
  }

  _menuVisiblityAnimation = new Animated.Value(0)

  componentWillReceiveProps() {
    if (this.state.highlightedIndex) {
      this.setState(this.ensureHighlightedIndex)
    }
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    if (nextState.menuOpen || this._ignoreOpenMenu) {
      return
    }

    if (this.menuShouldBeVisible(nextProps, nextState)) {
      this.showMenu()
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.menuOpen !== this.state.menuOpen) {
      this.menuVisibilityDidChange(this.state.menuOpen)
    }
  }

  menuVisibilityDidChange(open: boolean) {
    Animated.timing(this._menuVisiblityAnimation, {
      toValue: open ? 1 : 0,
      duration: 300
    }).start()
  }

  menuShouldBeVisible(props: Props = this.props, state: State = this.state): boolean {
    return state.isFocused && this.hasSuggestions(props)
  }

  showMenu = () => {
    this.setState({
      menuOpen: true
    })
  }

  hideMenu = () => {
    this.setState({
      menuOpen: false
    })
  }

  hasSuggestions(props: Props = this.props): boolean {
    return isNotEmpty(props.suggestions)
  }

  getSuggestionByIndex(index: number): ?any {
    return nth(index, this.props.suggestions)
  }

  getLastSuggestion(): ?any {
    const lastIndex = this.props.suggestions.length - 1

    return this.getSuggestionByIndex(lastIndex)
  }

  getHighlightedSuggestion(): ?any {
    return this.getSuggestionByIndex(this.state.highlightedIndex)
  }

  ensureHighlightedIndex(props: Props, state: State) {
    if (!props.suggestions || state.highlightedIndex >= props.suggestions.length) {
      return { highlightedIndex: null }
    }
  }

  highlightSuggestionByIndex(index: number) {
    const suggestion = this.getSuggestionByIndex(index)

    if (!suggestion) {
      return
    }

    this.setState((): State => ({
      highlightedIndex: index
    }))
  }

  setHighlightedIndex = (index: number) => {
    this.setState((): State => ({
      highlightedIndex: index
    }))
  }

  selectSuggestion = (index: number) => {
    const suggestion = this.getSuggestionByIndex(index)

    if (suggestion) {
      this.props.onChange(
        this.props.mapSuggestionToValue(suggestion)
      )

      this.props.onSelectSuggestion(suggestion)
    }

    this._ignoreOpenMenu = true

    this.hideMenu()
  }

  handleFocus = () => {
    this._ignoreOpenMenu = false

    this.setState({
      isFocused: true,
      menuOpen: this.hasSuggestions()
    })
  }

  handleBlur = () => {
    this._ignoreOpenMenu = false

    this.setState({
      isFocused: false,
      highlightedIndex: null,
      menuOpen: false
    })
  }

  handleChange = (event: Event) => {
    this._ignoreOpenMenu = false

    this.props.onChange(event.target.value)
  }

  // KeyDown handlers...
  handleEnterKey() {
    const highlightedSuggestion = this.getHighlightedSuggestion()

    if (highlightedSuggestion) {
      this.selectSuggestion(this.state.highlightedIndex)
    }
  }

  handleArrowUpKey() {
    if (!this.hasSuggestions()) {
      return
    }

    const highlightedIndex = this.state.highlightedIndex

    let newIndex

    if (isNil(highlightedIndex) || highlightedIndex === 0) {
      newIndex = this.props.suggestions.length - 1
    } else {
      newIndex = (highlightedIndex - 1) % this.props.suggestions.length
    }

    this.setHighlightedIndex(newIndex)
  }

  handleArrowDownKey() {
    if (!this.hasSuggestions()) {
      return
    }

    const highlightedIndex = this.state.highlightedIndex

    let newIndex

    if (isNil(highlightedIndex)) {
      newIndex = 0
    } else {
      newIndex = (highlightedIndex + 1) % this.props.suggestions.length
    }

    this.setHighlightedIndex(newIndex)
  }

  handleEscapeKey() {
    this._ignoreOpenMenu = true

    this.hideMenu()
  }

  handleKeyDown = (e: Event) => {
    switch (e.key) {
      case KEYS.ENTER: {
        this.handleEnterKey()
        e.preventDefault()

        break
      }

      case KEYS.ARROW_UP: {
        this.handleArrowUpKey()
        e.preventDefault()

        break
      }

      case KEYS.ARROW_DOWN: {
        this.handleArrowDownKey()
        e.preventDefault()

        break
      }

      case KEYS.ESCAPE: {
        this.handleEscapeKey()

        break
      }
    }
  }

  renderSuggestion = (suggestion: any, index: number): ?ReactElement<any> => {
    const isSelected = index === this.state.highlightedIndex
    const title = this.props.mapSuggestionToTitle(suggestion)

    return (
      <SuggestionListItem
        key={`${title}-${index}`}
        index={index}
        title={title}
        isSelected={isSelected}
        onMouseOver={this.setHighlightedIndex}
        onTouchStart={this.setHighlightedIndex}
        onMouseDown={this.selectSuggestion}
      />
    )
  }

  renderSuggestions = (): ReactElement<any> => {
    if (!this.state.menuOpen) {
      return null
    }

    const { suggestions } = this.props
    const listItems = suggestions.map(this.renderSuggestion)

    return (
      <Animated.div
        className={css(styles.menu)}
        style={{
          opacity: this._menuVisiblityAnimation,
          transform: [{
            translateY: this._menuVisiblityAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['10px', '0px']
            })
          }]
        }}
      >
        {listItems}
      </Animated.div>
    )
  }

  render(): ReactElement<any> {
    const { className } = this.props

    const menu = this.renderSuggestions()

    return (
      <div className={css(styles.container, className)}>
        <TextInput
          className={styles.input}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        {menu}
      </div>
    )
  }
}

export default lifecycleLogger()(AutocompleteInput)
