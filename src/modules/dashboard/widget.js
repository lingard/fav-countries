/**
 * @flow
 */

import React, { PureComponent } from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as Animated from 'animated/lib/targets/react-dom'
import { Icon } from 'components'
import { vr, rem, color, fontSize } from 'styles'

const ENTER_ANIMATION_DELAY = 500

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: rem(435),
    height: vr(49),
    margin: vr(2),
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.10)',
    backgroundColor: '#fff',
    borderRadius: '3px'
  },
  header: {
    display: 'flex',
    flexShrink: 0,
    padding: `${vr(2)} ${vr(2)} ${vr(1)} ${vr(2)}`
  },
  title: {
    fontSize: fontSize('xLarge'),
    fontWeight: '600',
    color: color('text', 'emphasized')
  },
  headerIcon: {
    marginLeft: vr(0.5)
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  }
})

type Props = {
  children: ReactNode,
  title: string,
  icon?: string
}

export default class DashboardWidget extends PureComponent {
  props: Props

  _enterAnimation = new Animated.Value(0)

  componentWillMount() {
    Animated.timing(this._enterAnimation, {
      toValue: 1,
      duration: 300,
      delay: ENTER_ANIMATION_DELAY
    }).start()
  }

  render(): ReactElement<any> {
    const { icon, title } = this.props

    return (
      <Animated.div
        className={css(styles.container)}
        style={{
          opacity: this._enterAnimation,
          transform: [
            {
              translateY: this._enterAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['25px', '0px'],
              }),
            },
          ],
        }}
      >
        <div className={css(styles.header)}>
          <h3 className={css(styles.title)}>{title}</h3>
          { icon &&
            <Icon
              className={styles.headerIcon}
              name={icon}
              color={Icon.COLOR.YELLOW}
              size={Icon.SIZE.LARGE}
            />
          }
        </div>

        <div className={css(styles.content)}>
          {this.props.children}
        </div>
      </Animated.div>
    )
  }
}
