import * as React from 'react'
import { Spin } from 'antd'
import './index.less'
export default class MyLoadingComponent extends React.Component {
  render() {
    // const height = window.document.body.clientHeight - (48 + 69)
    return(
      <Spin tip='别急,努力加载ing'>
        <div style={{ textAlign: 'center'}} />
      </Spin>
    )
  }
}