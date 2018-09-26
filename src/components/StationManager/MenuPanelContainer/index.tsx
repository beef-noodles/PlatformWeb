import React from  'react'
import Animate from 'rc-animate'
import velocity from 'velocity-animate'
import Config from '@config/index'

import MenuPanel from './MenuPanel'
interface IMenuArr {
  imgPath? : string // 图片路径
  title ? : string // 功能mingc
  key ? : string  // 唯一值，标识功能
  handler: (value) => void
}
interface IHistory {
  key ?: string
  value ? : string
  checked ? : boolean
}
interface IProps {
  visible? : boolean // 控制组件的显隐
  moreVisible? : boolean // 控制组件的显隐
  menuArr? : {
    default ? : IMenuArr[],
    more ?: IMenuArr[]
  }
  history ? : IHistory[] 
  changeCheckboxState : (key , checked) => void
}
interface IState {
  visible ?: boolean
  moreVisible ?: boolean
  history ? : IHistory[] 
}

export default class MenuPanelContainer extends React.Component<IProps , IState> {
  isMount? : boolean
  constructor(props : IProps  , state : IState ) {
    super(props)
    this.state = {
      visible  : this.props.visible ? this.props.visible : false,
      moreVisible  : this.props.moreVisible ? this.props.moreVisible : false,
      history : this.props.history !== [] ? this.props.history : [{
        key : 'error',
        value : '配置错误',
        checked : false
      }]
    }
  }
  componentWillMount () {
    this.isMount  = true
  }
  componentWillUnmount () {
    this.isMount  = false
  }

  componentWillReceiveProps (nextProps : IProps) {
    // if (nextProps.visible !== this.props.visible) {
        if (this.isMount ) {
          this.setState( {
            visible : nextProps.visible,
            history : nextProps.history
          })
        }
    // }
  }

  changeCheckboxState = (key , checked) => {
    this.props.changeCheckboxState(key , checked)
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


  render () {
    const anim = {
      enter: this.animateEnter,
      leave: this.animateLeave,
    }
    return (
      <Animate component='' showProp='visible' animation={anim} >
          <MenuPanel visible= {this.state.visible} moreVisible={this.state.moreVisible}  menuArr= {this.props.menuArr}
          history = {this.state.history} changeCheckboxState= {this.changeCheckboxState}/>
      </Animate>
    )
  }
}

