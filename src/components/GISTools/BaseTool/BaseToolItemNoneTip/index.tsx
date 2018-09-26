import * as React from 'react'
import './index.less'




interface IProps {
  imgPath: string,     // 图片路径
  title?: string,      // 工具名称
  onClick?: () => void // 点击事件
}
interface IState {
  imgPath: string,    // 图片路径
  title: string // 功能名称
}


export default class BaseToolItemNoneTip extends React.Component<IProps, IState> {
  constructor(props: IProps, stage: IState) {
    super(props)
    this.state = {
      imgPath: this.props.imgPath ? this.props.imgPath : './img/b1.png',
      title : this.props.title ? this.props.title : ''
    }
  }

  clickHandle = () => {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render() {
    const title = this.state.title!
    return (
      <div className='toolbarItem' onClick={this.clickHandle.bind(this)}>
        <img title={title} className='_gisBaseToolNoneTip' src={this.state.imgPath} alt={title} onClick={this.clickHandle.bind(this)}/>
        <span className='baseToolItemNoneTip-span' title={title}>{title}</span> 
      </div>
    )
  }
}

