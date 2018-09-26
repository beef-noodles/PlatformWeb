import * as React from 'react'

import { message } from 'antd'

import './index.less'
import BaseToolItem from '@components/GISTools/BaseTool/BaseToolItem'
import zoomOut from './img/zoomOut.png'
import zoomIn from './img/zoomIn.png'

interface ITool {
  imgPath: string,
  tips: string,
  placement: string,
  handler: () => void
}
interface IProps {
  className?: string, // 样式
  map: any, // 地图实例
  orientation?: 'row' | 'row-reverse' | 'column' | 'column-reverse', // 工具条的方向， 默认水平
}

interface IState {
  orientation?: 'row' | 'row-reverse' | 'column' | 'column-reverse', // 工具条的方向， 默认水平
  toolArr?: ITool[], // 工具条工具集合
}

class Zoom extends React.Component<IProps, IState> {
  map = this.props.map
  minZoom : any // 记录最小缩放级别
  maxZoom : any // 记录最大缩放级别
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {      
      orientation: this.props.orientation ? this.props.orientation : 'row',
      toolArr: [
      {
        imgPath: zoomIn,
        tips: '放大',
        handler: this.zoomInHandle,
        placement: 'left'
      },
      {
        imgPath: zoomOut,
        tips: '缩小',
        handler: this.zoomOutHandle,
        placement: 'left'
      }
    ]
    }
  }
  componentDidMount() {
    this.maxZoom = this.map.getMaxZoom() // 获取最大zoom值
    this.minZoom = this.map.getMinZoom() // 获取最小zoom值
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
   * 缩小
   *
   * @memberof GISTools
   */
  zoomOutHandle = () => {
    const currentZoom = this.map.getZoom()
    if (currentZoom <= this.minZoom) {
      this.warning('目前已为最小级别！', 1.5)
    } else {
      this.map.zoomOut()
    }
  }
  /**
   * 放大
   *
   * @memberof GISTools
   */
  zoomInHandle = () => {
    const currentZoom = this.map.getZoom()
    if (currentZoom >= this.maxZoom) {
      // if (currentZoom >= 17) { // 通过getMaxZoom()方法获取到的maxZoom值为19，但是实测发现17级之后就没有数据了
      this.warning('目前已为最大级别！', 1.5)
    } else {
      this.map.zoomIn()
    }
  }
  /**
   * 渲染工具条
   *
   * @memberof GISTools
   */
  renderToolBar = () => {
    return (      
      this.state.toolArr!.map((item, key) => {
        return (                 
            <BaseToolItem key={key}  imgPath={item.imgPath} tips={item.tips} onClick={item.handler.bind(this)} placement={item.placement}/>                         
        )
      })
      
    )
  }
  render() {
    const toolbar = this.renderToolBar()
    return (
        <div style={{ flexDirection: this.state.orientation }} className={`${'_gisBaseTools ' + (this.props.className ? this.props.className : '')}`}>
          {toolbar}
        </div>
    )
  }
}

export default Zoom