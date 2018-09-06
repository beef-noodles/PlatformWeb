import React, {Component} from 'react'
import { Spin } from 'antd'

interface IProps {
  load: () => Promise<any>,
  children: (com: React.Component) => React.ReactNode
}
interface IState {
  component: React.Component| null
}
class DynamicImport extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      component: null
    }
  }
  componentDidMount () {
    this.props.load()
      .then((component) => {
        this.setState(() => ({
          component: component.default ? component.default : component
        }))
      })
  }
  render() {
    if (this.state.component) {
      return this.props.children(this.state.component)
    } else {
      return <Spin size={'large'} spinning={this.state.component ? true : false} tip={'加载中'} />
    }
    
  }
}

export default DynamicImport