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
  map? : any // map 对象
  visible? : boolean // 控制组件的显隐
  moreVisible? : boolean // 控制组件的显隐
  menuArr? : {
    default ? : IMenuArr[],
    more ?: IMenuArr[]
  }
  history ? : IHistory[] 
  changeHistoryState : (flag , key , checked) => void
}
interface IState {
  visible ?: boolean
  moreVisible ?: boolean
}

export default class MenuPanelContainer extends React.Component<IProps , IState> {
  isMount? : boolean
  map = this.props.map
  history = this.props.history ? this.props.history : []
  
  constructor(props : IProps  , state : IState ) {
    super(props)
    this.state = {
      visible  : this.props.visible ? this.props.visible : false,
      moreVisible  : this.props.moreVisible ? this.props.moreVisible : false,
    }
  }
  componentWillMount () {
    this.isMount  = true
  }
  componentWillUnmount () {
    this.isMount  = false
  }

  componentWillReceiveProps (nextProps : IProps) {
    if (this.isMount ) {
      this.setState( {
        visible : nextProps.visible,
        moreVisible : nextProps.moreVisible
      })
    }
  }


  changeHistoryState = (flag , key , checked) => {
    this.props.changeHistoryState(flag , key , checked)
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
          <MenuPanel map={this.map} visible= {this.state.visible} moreVisible={this.state.moreVisible}  menuArr= {this.props.menuArr}
          history = {this.history} changeHistoryState= {this.changeHistoryState} />
      </Animate>
    )
  }
}

