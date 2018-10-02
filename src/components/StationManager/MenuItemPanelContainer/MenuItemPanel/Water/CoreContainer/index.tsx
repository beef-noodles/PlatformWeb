import React from  'react'
import Animate from 'rc-animate'
import velocity from 'velocity-animate'
import Config from '@config/index'


import Core from './Core'
interface IState {
  visible ?: boolean
  data ?: any
}
interface IProps {
  visible? : boolean // 控制组件的显隐
  coreCloseAndDetailOpen : (value) => void
  menuItemPanelClose : () => void
  map?: any // map 对象
  data ?: any
}
export default class CoreContainer extends React.Component<IProps , IState> {
  isMount? : boolean
  map = this.props.map
  // data = this.props.data
  constructor(props : IProps  , state : IState ) {
    super(props)
    this.state = {
      visible  : this.props.visible ,
      data : this.props.data
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
            visible : nextProps.visible 
          })
        }
    }

    if (nextProps.data !== this.props.data) {
      if (this.isMount ) {
        this.setState( {
          data : nextProps.data
        })
      }
  }
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
          <Core data = {this.state.data} map = {this.map}  menuItemPanelClose={this.menuItemPanelClose} coreCloseAndDetailOpen ={this.coreCloseAndDetailOpen.bind(this)} visible= {this.state.visible} />
      </Animate>
    )
  }
}

