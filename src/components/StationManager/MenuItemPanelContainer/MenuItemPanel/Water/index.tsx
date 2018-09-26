import React from 'react'
import  './index.less'

import CoreContainter from './CoreContainer'
import DetailContainer from './DetailContainer'

 interface IState {
  coreVisible ? : boolean
  detailVisible ?: boolean
  listKey ? : string // 列表和详情关联的唯一值,用来通过列表获取详情
  visible  ? : boolean
 }
 interface IProps {
   test ? : string 
   menuItemPanelClose : () => void
   visible  ? : boolean
 }

export default class Water extends React.Component <IProps , IState> {
  isMount : boolean
  constructor (props : IProps, state : IState) {
    super(props)
    this.state = {
      visible : this.props.visible ,
      coreVisible : true,
      detailVisible : false,
      listKey : ''
    }
  }

  componentWillMount () {
    this.isMount  = true
  }
  componentWillUnmount () {
    this.isMount  = false
  }

  /**
   * 确保从MenuPanel切换到MenuItemPanel时，MenuItemPanel展示的是coreContainer(list)部分而不是Detail部分
   * 场景描述：当MenuItemPanel展示的是Detail部分而通过点击输入框回到MenuPanel展示的情况下，
   * 再次通过MenuPanel进入到MenuItemPanel时不做该函数处理就会直接展示Detail部分而不是Core
   * @param nextProps
   */
  componentWillReceiveProps (nextProps : IProps) {
    if (nextProps.visible === true) {
        if (this.isMount ) {
          this.coreOpenAndDetailClose()
        }
    }
  }

  

  /**
   *
   */
  coreCloseAndDetailOpen = (value) => {
    if (this.isMount) {
      this.setState ({
        coreVisible : false,
        detailVisible : true,
        listKey: value
      })
    }
  }
  coreOpenAndDetailClose = () => {
    if (this.isMount) {
      this.setState ({
        coreVisible : true,
        detailVisible : false,
        listKey : ''
      })
    }
  }

  menuItemPanelClose = () => {
    this.props.menuItemPanelClose()
  }


  renderWater = () => {
    return (
      <React.Fragment>
        <CoreContainter coreCloseAndDetailOpen={this.coreCloseAndDetailOpen.bind(this)}  menuItemPanelClose ={this.menuItemPanelClose} visible = {this.state.coreVisible}/>
        
        <DetailContainer coreOpenAndDetailClose= {this.coreOpenAndDetailClose.bind(this)} listKey = {this.state.listKey} visible = {this.state.detailVisible}/>
      </React.Fragment>
    )
  }

  render () {
    const current = this.renderWater()
    return (
      <div>
        {current}
      </div>
    )
  }
}