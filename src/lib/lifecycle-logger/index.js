/**
 * @flow
 */

// eslint-disable no-console
import { ifElse, always, identity } from 'ramda'
import { lifecycle, getDisplayName } from 'recompose'
import diff from 'object-diff'

const logger = (
  name: string,
  componentName: string,
  instances: string,
  color: string,
) => {
  if (typeof console.groupCollapsed === 'function') {
    console.groupCollapsed(
      `%c ${name} (${instances.length}): %c${componentName} `,
      `color: ${color}; font-weight: normal;`,
      `color: ${color}; font-weight: bold;`,
    )

    console.log('%c Components', `color: ${color}; font-weight: bold;`, instances)

    console.groupEnd()
  }
}

const createBatchedLogger = (
  name: string,
  title: string,
  color: string,
): Function => {
  let payloads = []
  let log

  return (payload: any) => {
    payloads.push(payload)

    if (!log) {
      log = global.requestAnimationFrame(() => {
        logger(title, name, payloads, color)

        payloads = []
        log = null
      })
    }
  }
}

const createLoggers = (name: string): Object => ({
  mounting: createBatchedLogger(name, 'Mounting', '#03A9F4'),
  mounted: createBatchedLogger(name, 'Mounted', '#4CAF50'),
  updating: createBatchedLogger(name, 'Updating', '#6333F4'),
  updated: createBatchedLogger(name, 'Updated', '#03A9F4'),
  unmounting: createBatchedLogger(name, 'Unmounting', '#F20404'),
})

const createLifeCycleLogger = (component: ReactClass): ReactClass => {
  const name = getDisplayName(component)
  const logger = createLoggers(name)

  return lifecycle({
    componentWillMount() {
      this._life = Date.now()
      this._updates = 0

      logger.mounting()
    },
    componentDidMount: () => {
      logger.mounted()
    },
    componentWillUpdate(nextProps: Object) {
      logger.updating({
        nextProps,
        props: this.props,
        diff: diff(this.props, nextProps)
      })
    },
    componentDidUpdate(prevProps: Object) {
      logger.updated({
        prevProps,
        props: this.props,
        diff: diff(prevProps, this.props),
        // eslint-disable-next-line no-plusplus
        totalNumUpdates: ++this._updates,
      })
    },
    componentWillUnmount() {
      logger.unmounting({
        lifetime: this._life - Date.now()
      })
    }
  })(component)
}

const addLifecycleLogger = (): ReactClass<*> =>
  ifElse(
    always(process.env.NODE_ENV === 'development'),
    createLifeCycleLogger,
    identity
  )

export default addLifecycleLogger
