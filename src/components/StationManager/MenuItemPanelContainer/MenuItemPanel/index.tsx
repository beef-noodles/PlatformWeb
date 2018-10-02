import React from 'react'
import  './index.less'

import {Modal} from 'antd'

import Water from './Water'
import Error from './Error'
import Rain from './Rain'

 interface IState {
  visible? : boolean
  currentMenuItem ? : string 
 }
 interface IProps {
   /**
    * 是否可见，默认不可见
    */
   visible ? : boolean
   currentMenuItem ? : string 
   menuItemPanelClose : () => void
   map?: any // map 对象
 }

export default class MenuItemPanel extends React.Component <IProps , IState> {
  isMount : boolean
  map = this.props.map
  constructor (props : IProps, state : IState) {
    super(props)
    this.state = {
      visible :  this.props.visible,
      currentMenuItem : this.props.currentMenuItem,
    }
  }

  componentDidMount () {
    this.isMount  = true
  }
  componentWillUnmount () {
    this.isMount  = false
  }

  componentWillReceiveProps (nextProps : IProps) {
    if (nextProps.visible !== this.props.visible) {
        if (this.isMount ) {
          this.setState( {
            visible : nextProps.visible,
          })
        }
    }

    if (nextProps.currentMenuItem !== this.props.currentMenuItem) {
      if (this.isMount ) {
        this.setState( {
          currentMenuItem : nextProps.currentMenuItem
        })
      }
    }
  }
   info = (titlePara, msgPara) => {
      Modal.info({
        title: titlePara,
        content: (
          <div>
            {msgPara}
          </div>
        )
    })
  }

  menuItemPanelClose = () => {
    this.props.menuItemPanelClose()
  }


  renderMenuItem = () => {
    let currentRenderMenuItem
    switch (this.props.currentMenuItem) {
      case 'water' :
        currentRenderMenuItem =  <Water map ={this.map} visible= {this.state.visible}  menuItemPanelClose = {this.menuItemPanelClose}/>
        break
      case 'rain' :
        currentRenderMenuItem =  <Rain  menuItemPanelClose = {this.menuItemPanelClose}/>
        break
      default :
        currentRenderMenuItem =  <Error menuItemPanelClose = {this.menuItemPanelClose}/>
        break
    }
    return currentRenderMenuItem
  }


  render () {
    const style = { 'display': this.state.visible ? 'inline-block' : 'none' }
    const currentMenuItem = this.renderMenuItem()
    return (
      <div style = {style} className = 'menuItemPanel'>
        {currentMenuItem}
      </div>
    )
  }
}