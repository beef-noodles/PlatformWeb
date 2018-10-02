import React from  'react'
import Animate from 'rc-animate'
import velocity from 'velocity-animate'
import Config from '@config/index'

import MenuItemPanel from './MenuItemPanel'
interface IState {
  visible ?: boolean
  currentMenuItem ? : string
}
interface IProps {
  visible? : boolean // 控制组件的显隐
  currentMenuItem ? : string
  menuItemPanelClose : () => void
  map?: any // map 对象
}
export default class MenuItemPanelContainer extends React.Component<IProps , IState> {
  isMount? : boolean
  map = this.props.map
  constructor(props : IProps  , state : IState ) {
    super(props)
    this.state = {
      visible  : this.props.visible ? this.props.visible : false,
    }
  }
  componentDidMount () {
    this.isMount  = true
  }
  componentWillUnmount () {
    this.isMount  = false
  }
  animateLeave = (node, done) => {
    let ok = false
    function complete() {
      if (!ok) {
        ok = true
        done()
      }
    }
    node.style.display = 'block'
    velocity(node, 'slideUp', {
      duration: Config.animateTime,
      complete,
    })
    return {
      stop() {
        velocity(node, 'finish') // velocity complete is async
        complete()
      },
    }
  }

  animateEnter = (node, done) => {
    let ok = false
    function complete() {
      if (!ok) {
        ok = true
        done()
      }
    }
    node.style.display = 'none'
    velocity(node, 'slideDown', {
      duration: Config.animateTime,
      complete,
    })
    return {
      stop() {
        velocity(node, 'finish') // velocity complete is async
        complete()
      },
    }
  }
  menuItemPanelClose = () => {
    this.props.menuItemPanelClose()
  }

  render () {
    const anim = {
      enter: this.animateEnter,
      leave: this.animateLeave,
    }
    return (
      <Animate component='' showProp='visible' animation={anim} >
          <MenuItemPanel map = {this.map}  menuItemPanelClose = {this.menuItemPanelClose} currentMenuItem = {this.props.currentMenuItem} visible= {this.state.visible}/>
      </Animate>
    )
  }
}

