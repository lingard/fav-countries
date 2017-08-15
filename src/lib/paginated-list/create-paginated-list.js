/**
 * @flow
 */

import { omit, splitEvery } from 'ramda'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { hoistStatics, shallowEqual, getDisplayName } from 'recompose'
import * as PaginatedListActions from './actions'
import { selectPaginatedListState } from './selectors'

const randomString = (): string =>
  // eslint-disable-next-line no-bitwise
  Math.floor(Math.random() * (1 << 30)).toString(16)

type Options = {
  initialPage: number,
  itemsPerPage: number
}

type ListItemsSelector = (state) => Array<Object | string | number>

type ListState = {
  currentPage: number
}

export type Props = {
  paginatedListState: {
    [key: string]: ListState
  },
  listItems?: Array<any>,
  goToPage: (key: string, page: number) => void,
  onWillMount: (key: string) => void,
  onWillUnmount: (key: string) => void
}

type State = {
  pages: Array<any>
}

const createPaginatedList = (listItemsSelector: ListItemsSelector, options: Options) => {
  const { initialPage, itemsPerPage } = options

  return (WrappedComponent: ReactClass) => {
    const componentName = getDisplayName(WrappedComponent)

    class PaginatedList extends Component {
      props: Props
      state: State

      _key: ?string = null

      constructor(props: Props) {
        super(props)

        this._key = `${componentName}-${randomString()}`

        this.state = {
          pages: this.parseListItems(props)
        }
      }

      shouldComponentUpdate(nextProps: Props): boolean {
        if (
          this.getListState(nextProps) !==
          this.getListState(this.props)
        ) {
          return true
        }

        return !shallowEqual(
          omit(['paginatedListState', nextProps.props]),
          omit(['paginatedListState', this.props]),
        )
      }

      componentWillMount() {
        this.props.onWillMount(this._key, {
          initialPage
        })
      }

      componentWillUpdate(nextProps: Props) {
        if (nextProps.listItems !== this.props.listItems) {
          this.listItemsDidChange(nextProps)
        }
      }

      componentDidUpdate(prevProps: Props, nextState: State) {
        if (nextState.pages !== this.state.pages) {
          this.ensureCurrentPageIsValid()
        }
      }

      componentWillUnmount() {
        this.props.onWillUnmount(this._key)
      }

      listItemsDidChange(props: Props = this.props) {
        const pages = this.parseListItems(props)

        this.setState((): Object => ({
          pages
        }))
      }

      parseListItems(props: Props = this.props): ?Array<Array<any>> {
        const { listItems } = props

        if (!listItems) {
          return
        }

        return splitEvery(itemsPerPage, listItems)
      }

      getListState(props: Props = this.props) {
        return props.paginatedListState[this._key] || {}
      }

      getCurrentPage(): ?number {
        return this.getListState().currentPage
      }

      getNumPages(): number {
        return this.state.pages.length
      }

      getItemsForPage(page: number): Array<any> {
        return this.state.pages[Math.abs(page - 1)]
      }

      getItemsForCurrentPage(): ?Array<any> {
        return this.getItemsForPage(this.getCurrentPage())
      }

      hasPage(page: number): boolean {
        return page <= this.getNumPages()
      }

      ensureCurrentPageIsValid() {
        const numPages = this.getNumPages()
        const currentPage = this.getCurrentPage()

        if (numPages < currentPage) {
          this.goToPage(numPages)
        }
      }

      hasNextPage(): boolean {
        return this.getCurrentPage() < this.getNumPages()
      }

      hasPrevPage(): boolean {
        return Boolean(this.getCurrentPage() - 1)
      }

      goToPage = (page: number) => {
        const currentPage = this.getCurrentPage()

        if (page === currentPage || !page) {
          return
        }

        if (!this.hasPage(page)) {
          return
        }

        this.props.goToPage(this._key, page)
      }

      goToNextPage = () => {
        const currentPage = this.getCurrentPage()

        if (this.hasNextPage()) {
          this.goToPage(currentPage + 1)
        }
      }

      goToPrevPage = () => {
        const currentPage = this.getCurrentPage()

        if (this.hasPrevPage()) {
          this.goToPage(currentPage - 1)
        }
      }

      render(): ReactElement<any> {
        const { paginatedListState, ...other } = this.props

        return (
          <WrappedComponent
            currentPage={this.getCurrentPage()}
            itemsForCurrentPage={this.getItemsForCurrentPage()}
            hasNextPage={this.hasNextPage()}
            hasPrevPage={this.hasPrevPage()}
            getItemsForPage={this.getItemsForPage}
            goToPage={this.goToPage}
            goToNextPage={this.goToNextPage}
            goToPrevPage={this.goToPrevPage}
            {...other}
          />
        )
      }
    }

    const mapStateToProps = createSelector(
      [selectPaginatedListState, listItemsSelector],
      (paginatedListState: Object, listItems: Array<any>): Object => ({
        paginatedListState, listItems
      })
    )

    const mapDispatchToActions = {
      onWillMount: PaginatedListActions.willMountList,
      onWillUnmount: PaginatedListActions.willUnmountList,
      goToPage: PaginatedListActions.goToPage,
    }

    return hoistStatics(connect(
      mapStateToProps,
      mapDispatchToActions
    ))(PaginatedList)
  }
}

export default createPaginatedList
