import * as React from 'react'

import { message } from 'antd'

import './index.less'
import BaseToolItem from '@components/GISTools/BaseTool/BaseToolItem'
import full from './img/full.png'

interface IProps  {
  className?: string, // 样式
  map: any, // 地图实例
  imgPath ?: string,
  tips ?: string,
  placement ?: string,
  handler?: () => void,
}

interface IState {
  imgPath?: string,
  tips?: string,
  placement ?: string
}

class Full extends React.Component<IProps, IState> {
  map = this.props.map
  defaultCenter: any // 记录地图显示的默认中心点
  defaultZoom: any // 记录地图显示的默认zoom值
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
        imgPath: this.props.imgPath ? this.props.imgPath : full,
        tips: this.props.tips ? this.props.tips : '全图',
        placement: this.props.placement ? this.props.placement : 'left'
    }
  }
  componentDidMount() {
    this.defaultCenter = this.map.getCenter() // 获取地图默认中心点                    
    this.defaultZoom = this.map.getZoom() // 获取地图默认zoom值
  }
  /**
   * 全局警告
   * 
   * warningText 警告提示语
   * time 警告自动关闭时间，单位s,默认值为3
   */
  warning = (warningText, time) => {
    message.warning(warningText, time)
  }



  /**
   * 全图
   * 回到初始范围
   */
  fullExtentHandle = () => {
    this.map.setCenterAndZoom(this.defaultCenter, this.defaultZoom)
    if (this.props.handler) {
      this.props.handler()
    }
  }

  render() {
    return (
      <BaseToolItem imgPath={this.state.imgPath!} tips={this.state.tips!} onClick={this.fullExtentHandle.bind(this)} placement={this.state.placement} />
    )
  }
}

export default Full