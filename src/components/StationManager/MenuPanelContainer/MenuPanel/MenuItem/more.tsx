import * as React from 'react'
import './index.less'
import error from './img/error.png'



interface IProps {
  imgPath? : string,     // 图片路径
  title?: string,       //  名称
  className? : string   // 类名
  moreMenuShow : () => void
  moreMenuHidden : () => void
  onClick: () => void
}

export default class MoreMenuItem extends React.Component<IProps, any> {
  constructor(props: IProps, stage: any) {
    super(props)
  }

  clickHandle = () => {
    this.props.onClick!()
  }
  moreMenuShow = () => {
      this.props.moreMenuShow()
  }
  moreMenuHidden = () => {
    this.props.moreMenuHidden()
  }

  // onMouseout= {} onMouseover ={}
  render() {
    return (
      <div className={`${'menuItem ' + this.props.className}`}  onMouseOver = {this.moreMenuShow} onMouseOut = {this.moreMenuHidden}   onClick={this.clickHandle.bind(this)} >
        <div className= 'menuContent'>
         <img  src={this.props.imgPath ? this.props.imgPath : error}  />
         <div>{this.props.title}</div>
        </div>
        {/* <img  src={this.props.imgPath ? this.props.imgPath : error}  />
         <div>{this.props.title}</div> */}
      </div>
    )
  }
}

