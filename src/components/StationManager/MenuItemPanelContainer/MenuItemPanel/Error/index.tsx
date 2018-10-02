import React from 'react'
import './index.less'
import {Icon} from 'antd'

interface IState {
  visible?: boolean
  data ? : any
}
interface IProps {
  menuItemPanelClose: () => void
}
export default class Error extends React.Component<IProps, IState> {
  isMount?: boolean
  constructor(props: IProps) {
    super(props)
  }
  componentWillMount() {
    this.isMount = true
  }
  componentWillUnmount() {
    this.isMount = false
  }

 

  menuItemPanelClose = () => {
    this.props.menuItemPanelClose()
  }

  

  render() {
    return (
      <div className='core'>
        <div className='coreHeader'>
          <b>Error</b>  
        <span onClick={this.menuItemPanelClose}><Icon type='close' theme='outlined' /></span>
        </div>
        <div className='error'>
          <h4><b>未匹配到请求的组件</b></h4>
       </div>
      </div>
    )
  }
}

