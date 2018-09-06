import * as React from 'react'
import './index.scss'

import { Tooltip } from 'antd'




interface IProps {
  imgPath: string,     // 图片路径
  tips?: string,       // 工具信息， 默认显示‘工具’
  placement?: string   // tips展示的位置，可选值有left,Righ、bottom、top、等12个可选值，默认为top,详情参考antd的Tooltip组件
  layerUrl?: string,
  layerId?: string,
  style?: any
  onClick?: () => void
}
interface IState {
  imgPath: string,    // 图片路径
  tips?: string,      // 工具信息， 默认显示‘工具’
  placement?: any     // tips展示的位置，可选值有left,Righ、bottom、top、等12个可选值，默认为top,详情参考antd的Tooltip组件
  layerUrl?: string,
  layerId?: string,
  onClick?: () => void
}


class BaseTool extends React.Component<IProps, IState> {
  map: any
  constructor(props: IProps, stage: IState) {
    super(props)
    this.state = {
      imgPath: this.props.imgPath ? this.props.imgPath : './img/b1.png',
      tips: this.props.tips ? this.props.tips : '工具',
      placement: this.props.placement ? this.props.placement : 'top',
      layerUrl: this.props.layerUrl ? this.props.layerUrl : './img/m1.png',
      layerId: this.props.layerId ? this.props.tips : '地图切换',
    }
  }

  clickHandle = () => {
    this.props.onClick!()
  }

  render() {
    return (
      // <img className='switchBaseMapTool' src={this.state.imgPath} alt={this.state.tips!} onClick={this.clickHandle.bind(this, this.state.layerId)}/>
      <Tooltip placement={this.state.placement!} title={this.state.tips!}>
        <img className='switchBaseMapTool' style={this.props.style} src={this.state.imgPath} alt={this.state.tips!} onClick={this.clickHandle.bind(this, this.state.layerId)}/>
      </Tooltip>
    )
  }
}

export default BaseTool