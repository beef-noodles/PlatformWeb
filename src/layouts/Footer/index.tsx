import * as React from 'react'
import { FaHeart } from 'react-icons/fa'
import './index.less'
export default class BasicFooter extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div className='footer-barrier' />
        <div>Summit Web Framework ©2018 Created <FaHeart style={{color: 'red'}} /> by AndorLab</div>
        <div>Now Core Value: Be A Host</div>
      </div>
    )
  }
}