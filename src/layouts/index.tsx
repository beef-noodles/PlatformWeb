import * as React from 'react'
import Header from './Header'
import Main from './Main'
import BasicFooter from './Footer'
import { Layout } from 'antd'
import { HashRouter as Router } from 'react-router-dom'
import './index.scss'
export default class Layouts extends React.Component {
  render() {
    return (
      <Router>
        <Layout style={{'height': '100%'}}>
          <Header />
          <Main />
          <BasicFooter />
        </Layout>
      </Router>
    )
  }
}