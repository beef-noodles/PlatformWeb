import React from  'react'
import Animate from 'rc-animate'
import velocity from 'velocity-animate'
import Config from '@config/index'

import Detail from './Detail'
interface IState {
  visible ?: boolean 
  listKey ? : string
}
interface IProps {
  visible? : boolean // 控制组件的显隐
  listKey ? : string
  coreOpenAndDetailClose : () => void
}
export default class MenuPanelContainer extends React.Component<IProps , IState> {
  isMount? : boolean
  constructor(props : IProps  , state : IState ) {
    super(props)
    this.state = {
      visible  : this.props.visible ,
      listKey : this.props.listKey
    }
  }
  componentWillMount () {
    this.isMount  = true
  }
  componentWillUnmount () {
    this.isMount  = false
  }

  componentWillReceiveProps (nextProps : IProps) {
    // console.log(nextProps)
    if (this.isMount ) {
      this.setState( {
        visible : nextProps.visible,
        listKey : nextProps.listKey
      })
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
  coreOpenAndDetailClose = () => {
    this.props.coreOpenAndDetailClose()
  }

  render () {
    const anim = {
      enter: this.animateEnter,
      leave: this.animateLeave,
    }
    return (
      <Animate component='' showProp='visible' animation={anim} >
          <Detail coreOpenAndDetailClose = {this.coreOpenAndDetailClose} listKey = {this.state.listKey} visible= {this.state.visible} />
      </Animate>
    )
  }
}

