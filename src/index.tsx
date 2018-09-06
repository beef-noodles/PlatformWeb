import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Layouts from '@layouts/index'
import './index.scss'
ReactDOM.render(
  <Layouts />,
  document.getElementById('root') as HTMLElement
)

declare var module: any
if (module.hot) {
  module.hot.accept()
}
