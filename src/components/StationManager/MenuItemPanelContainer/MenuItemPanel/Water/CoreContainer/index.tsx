import React from  'react'
import Animate from 'rc-animate'
import velocity from 'velocity-animate'
import Config from '@config/index'

import {GetWatf} from '@api/Map'

import Core from './Core'
interface IState {
  visible ?: boolean
}
interface IProps {
  visible? : boolean // 控制组件的显隐
  coreCloseAndDetailOpen : (value) => void
  menuItemPanelClose : () => void
}
export default class MenuPanelContainer extends React.Component<IProps , IState> {
  isMount? : boolean
  constructor(props : IProps  , state : IState ) {
    super(props)
    this.state = {
      visible  : this.props.visible 
    }
  }
  componentWillMount () {
    this.isMount  = true
    this.testGet()
  }
  componentWillUnmount () {
    this.isMount  = false
  }
  componentWillReceiveProps (nextProps : IProps) {
    if (nextProps.visible !== this.props.visible) {
        if (this.isMount ) {
          this.setState( {
            visible : nextProps.visible
          })
        }
    }
  }


  testGet = () => {
    GetWatf().then((data) => {console.log(data)}, err => {console.log(err)})
  }


  coreCloseAndDetailOpen = (value) => {
    this.props.coreCloseAndDetailOpen(value)
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
          <Core  menuItemPanelClose={this.menuItemPanelClose} coreCloseAndDetailOpen ={this.coreCloseAndDetailOpen.bind(this)} visible= {this.state.visible} />
      </Animate>
    )
  }
}

