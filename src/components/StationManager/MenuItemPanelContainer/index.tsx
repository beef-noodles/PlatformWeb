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
}
export default class MenuPanelContainer extends React.Component<IProps , IState> {
  isMount? : boolean
  constructor(props : IProps  , state : IState ) {
    super(props)
    this.state = {
      visible  : this.props.visible ? this.props.visible : false
    }
  }
  componentWillMount () {
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
            currentMenuItem : this.props.currentMenuItem
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
          <MenuItemPanel menuItemPanelClose = {this.menuItemPanelClose} currentMenuItem = {this.state.currentMenuItem} visible= {this.state.visible}/>
      </Animate>
    )
  }
}

