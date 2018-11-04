import * as React from 'react'
import { Layout } from 'antd'
import { HashRouter as Router } from 'react-router-dom'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import PubSub from 'pubsub-js'

interface IProps {
  isDisplayHeader?: boolean, // 是否显示顶部导航栏
  isDisplayFooter?: boolean // 是否显示底部Footer
}
interface IState {
  isDisplayHeader?: boolean,
  isDisplayFooter?: boolean
}
// PubSub 关键参数
export const IsDisplayHeaderTopic = '08523caf-caa0-458b-9c23-b18264720c05'
export const IsDisplayFooterTopic = '04daba51-b06a-4f01-b180-0a72292dddbf'


export default class Layouts extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      isDisplayHeader: true,
      isDisplayFooter: true
    }
  }
  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.isDisplayFooter !== this.props.isDisplayFooter) {
      this.setState({
        isDisplayFooter: nextProps.isDisplayFooter
      })
    }
    if (nextProps.isDisplayHeader !== this.props.isDisplayHeader) {
      this.setState({
        isDisplayFooter: nextProps.isDisplayHeader
      })
    }
  }
  componentDidMount() {
    PubSub.subscribe(IsDisplayFooterTopic, (message, data) => {
      console.log(message)
      this.setState({
        isDisplayFooter: data
      })
    })
    PubSub.subscribe(IsDisplayHeaderTopic, (message, data) => {
      console.log(message)
      this.setState({
        isDisplayHeader: data
      })
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(IsDisplayFooterTopic)
    PubSub.unsubscribe(IsDisplayHeaderTopic)
  }
  render() {
    return (
      <Router>
        <Layout style={{ height: '100%' }}>
          {this.state.isDisplayHeader ! && (<Header />)}
          <Body />
          {this.state.isDisplayFooter! && (<Footer />)}
        </Layout>
      </Router>
    )
  }
}