import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

require('./styles')

const MOUNT_NODE = 'root'

ReactDOM.render((
  <App />
), document.getElementById(MOUNT_NODE))
