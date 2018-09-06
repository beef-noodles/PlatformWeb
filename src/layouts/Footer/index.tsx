import * as React from 'react'
import { Layout } from 'antd'
import {FaHeart} from 'react-icons/fa'
import './index.scss'
const { Footer } = Layout

export default class BasicFooter extends React.Component<any, any> {
  render() {
    return (
      <Footer className='footer'>
        <span>©2018 Made with <FaHeart size='30px' className='redHeart'/> by Beef Noodles</span>
      </Footer>
    )
  }
}