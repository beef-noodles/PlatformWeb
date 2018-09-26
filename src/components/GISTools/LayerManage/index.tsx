import * as React from 'react'
import Animate from 'rc-animate'
import velocity from 'velocity-animate'
import LayerTree from './LayerTree'
import './index.less'
import Config from '@config/index'
import BaseToolItemNoneTip from '@components/GISTools/BaseTool/BaseToolItemNoneTip'

interface INode {
  title?: string // 节点名称
  pkey?: string // 该节点的父节点key值，根节点pkey为-1
  key?: string // 节点key值
  checked?: boolean // 是否为勾选状态
  isBaseMap?: boolean // 是否为地图
  serverType?: string // 图层名称 某种切片还是某种动态， 根据这个节点的标识决定该节点的图层以哪种方式加载，目前知道如何处理的只有Arcgis 的普通切片和普通动态服务，其他的后续补充
  mapServerURL?: string // 图层
  subLayerid?: string // 自图层id 仅对动态服务而言
  subgeotype?: string // 是动态服务的数据节点还是逻辑节点
}
interface IProps {
  map?: any
  className?: string
  // visible?: boolean
}

interface IState {
  data?: INode[]
  visible?: boolean
}


export default class LayerManager extends React.Component<IProps, IState> {
  tree: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      visible: false,
      data: Config.LayerManager.layerArray
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
        velocity(node, 'finish')
        complete() // velocity complete is async
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
        velocity(node, 'finish')
        complete() // velocity complete is async
      },
    }
  }
  handleLayer = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  componentWillUnmount() {
    this.setState({
      visible: false
    })
  }

  render() {
    const anim = {
      enter: this.animateEnter,
      leave: this.animateLeave,
    }
    return (
      <div className={`_layerManager`}>
        <BaseToolItemNoneTip imgPath={require<string>('./img/layerContral_off.png')} title='图层控制' onClick={this.handleLayer.bind(this)} />
          <Animate className='layerTree' component='' showProp='visible' animation={anim}>
            <LayerTree visible={this.state.visible} className='' map={this.props.map} data={this.state.data} />
          </Animate>
      </div>
    )
  }
}