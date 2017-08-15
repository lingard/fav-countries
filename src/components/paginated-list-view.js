/**
 * @flow
 */

import React, { PureComponent } from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as Animated from 'animated/lib/targets/react-dom'
import { vr } from 'styles'
import ListView from './list-view'
import Button from './button'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  footer: {
    display: 'flex',
    // flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    padding: vr(2)
  }
})

type Props = {
  data: Array<any>,
  hasNextPage: boolean,
  hasPrevPage: boolean,
  onPrevPagePress: () => void,
  onNextPagePress: () => void,
  renderItem: (item: any) => ?ReactElement<any>,
  renderEmptyList: () => ?ReactElement<any>,
}

export default class PaginatedListView extends PureComponent {
  props: Props

  _footerVisiblity = new Animated.Value(
    this.isFooterVisible(this.props) ? 1 : 0
  )

  componentWillUpdate(nextProps: Props) {
    if (this.isFooterVisible(nextProps) !== this.isFooterVisible(this.props)) {
      Animated.timing(this._footerVisiblity, {
        toValue: this.isFooterVisible(nextProps) ? 1 : 0,
        duration: 300
      }).start()
    }
  }

  isFooterVisible(props: Props = this.props): boolean {
    return (props.hasNextPage || props.hasPrevPage)
  }

  render(): ReactElement<any> {
    const { data } = this.props

    return (
      <div className={css(styles.container)}>
        <ListView
          data={data}
          renderItem={this.props.renderItem}
          renderEmptyList={this.props.renderEmptyList}
        />

        <Animated.div
          className={css(styles.footer)}
          style={{
            opacity: this._footerVisiblity
          }}
        >
          <Button
            size='small'
            disabled={!this.props.hasPrevPage}
            onPress={this.props.onPrevPagePress}
          >
            Previous page
          </Button>
          <Button
            size='small'
            disabled={!this.props.hasNextPage}
            onPress={this.props.onNextPagePress}
          >
            Next page
          </Button>
        </Animated.div>
      </div>
    )
  }
}
