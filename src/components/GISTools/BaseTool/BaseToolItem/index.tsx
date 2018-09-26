import * as React from 'react'
import './index.less'

import { Tooltip } from 'antd'



interface IProps {
  imgPath: string,     // 图片路径
  tips?: string,       // 工具信息， 默认显示‘工具’
  placement?: string,  // tips展示的位置，可选值有left,Right、bottom、top、等12个可选值，默认为top,详情参考antd的Tooltip组件
  onClick: () => void
}
interface IState {
  imgPath: string,    // 图片路径
  tips?: string,      // 工具信息， 默认显示‘工具’
  placement?: any     // tips展示的位置，可选值有left,Right、bottom、top、等12个可选值，默认为top,详情参考antd的Tooltip组件
}


export default class BaseToolItem extends React.Component<IProps, IState> {
  constructor(props: IProps, stage: IState) {
    super(props)
    this.state = {
      imgPath: this.props.imgPath ? this.props.imgPath : './img/b1.png',
      tips: this.props.tips ? this.props.tips : '工具',
      placement: this.props.placement ? this.props.placement : 'top'
    }
  }

  clickHandle = () => {
    this.props.onClick!()
  }

  render() {
    return (
      <Tooltip placement={this.state.placement!} title={this.state.tips!}>
        <img className='_gisBaseTool' src={this.state.imgPath} alt={this.state.tips!} onClick={this.clickHandle.bind(this)}/>
      </Tooltip>
    )
  }
}

