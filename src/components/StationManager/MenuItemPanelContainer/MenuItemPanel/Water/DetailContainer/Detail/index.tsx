import React from  'react'
import {Icon} from 'antd'
import './index.less'

// import ListItem from './ListItem/index.tsx'
interface IState {
  visible ?: boolean
  listKey ? : string
}
interface IProps {
  visible? : boolean // 控制组件的显隐
  listKey ? : string
  coreOpenAndDetailClose : () => void
}
export default class Detail extends React.Component<IProps , IState> {
  isMount? : boolean
  constructor(props : IProps  , state : IState ) {
    super(props)
    this.state = {
      visible  : this.props.visible , 
      listKey : this.props.listKey
    }
  }
  componentWillMount () {
    this.isMount  = true
  }
  componentWillUnmount () {
    this.isMount  = false
  }

  componentWillReceiveProps (nextProps : IProps) {
    // console.log(nextProps)
    // if (nextProps.visible !== this.props.visible && nextProps.listKey !== this.props.listKey) {
        if (this.isMount ) {
          this.setState( {
            visible : nextProps.visible,
            listKey : nextProps.listKey
          })
        }
    // }
  }
  coreOpenAndDetailClose = () => {
    this.props.coreOpenAndDetailClose()
  }



  render () {
    const style = {'display' : this.state.visible ? 'inline-block' : 'none'}
    return (
     <div className='detail' style={style}>
        <div className='detailHeader'>
          <span onClick = {this.coreOpenAndDetailClose}><Icon type='close' theme='outlined' /></span>
        </div>
     
      ditail,当前key值为
      {this.state.listKey}
     </div>
    )
  }
}

