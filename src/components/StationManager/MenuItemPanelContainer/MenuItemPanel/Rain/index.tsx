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
export default class Rain extends React.Component<IProps, IState> {
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
        雨情
        <span onClick={this.menuItemPanelClose}><Icon type='close' theme='outlined' /></span>
        </div>
        <div className='rain'>
         待实现功能...
       </div>
      </div>
    )
  }
}

