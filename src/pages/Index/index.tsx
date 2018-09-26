import * as React from 'react'
import './index.less'
import Config from '@config/index'
import { ControlFooterDisplay, ControlHeaderDisplay } from '@pages/PageUtils'

interface IState {
  hasMapLoaded?: boolean
}

export default class Index extends React.Component<any, IState> {
  map: any
  constructor(props: any) {
    super(props)
    ControlFooterDisplay()
    ControlHeaderDisplay()
  }

  render() {
    return (
      <div>
        {Config.projectName}
      </div>
    )
  }
}