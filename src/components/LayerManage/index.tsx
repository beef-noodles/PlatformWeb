import * as React from 'react'
import Draggable from 'react-draggable'

import LayerTree from './LayerTree'

import './index.scss'




// // 目前仅限于Arcgis 服务的处理后续完善
// interface ILayer {
//   mapServerURL?: string // 图层
//   subLayerid?: string // 自图层id 仅对动态服务而言
//   subgeotype?: string // 是动态服务的数据节点还是逻辑节点
// }

interface INode {
  title?: string // 节点名称
  pkey?: string // 该节点的父节点key值，根节点pkey为-1
  key?: string // 节点key值
  checked?: boolean // 是否为勾选状态
  isBaseMap?: boolean // 是否为地图
  serverType?: string // 图层名称 某种切片还是某种动态， 根据这个节点的标识决定该节点的图层以哪种方式加载，目前知道如何处理的只有Arcgis 的普通切片和普通动态服务，其他的后续补充
  // layer?: ILayer
  mapServerURL?: string // 图层
  subLayerid?: string // 自图层id 仅对动态服务而言
  subgeotype?: string // 是动态服务的数据节点还是逻辑节点
}
interface IProps {
 map? : any
 className ?: string
}

interface IState {
  data?: INode []
}

export default class LayerManager extends React.Component<IProps, IState> {
  //  tree = [] ; any
   tree : any 
  constructor(props: IProps, state: IState) {
    super(props)

    this.state = {
      data: [
        {
          title: '切片服务',
          pkey: '-1',
          key: '2',
          checked: false ,
          isBaseMap: false ,
          serverType: 'tile' ,
          // layer: {
          //   mapServerURL: '' ,
          //   subLayerid: '' ,
          //   subgeotype: '' ,
          // }
          mapServerURL: '' ,
          subLayerid: '' ,
          subgeotype: '' ,
        },
        {
          title: '测试图层1',
          pkey: '2',
          key: 'test1',
          checked: false ,
          isBaseMap: false ,
          serverType: 'tile' ,
          // layer: {
          //   mapServerURL: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunityENG/MapServer' ,
          //   subLayerid: '' ,
          //   subgeotype: '' ,
          // }
          mapServerURL: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunityENG/MapServer' ,
          subLayerid: '' ,
          subgeotype: '' ,
        },
        {
          title: '测试图层2',
          pkey: '2',
          key: 'test2-EN世界地图',
          checked: false ,
          isBaseMap: false ,
          serverType: 'tile' ,
          // layer: {
          //   mapServerURL: 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer',
          //   subLayerid: '' ,
          //   subgeotype: '' ,
          // }
          mapServerURL: 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer',
          subLayerid: '' ,
          subgeotype: '' ,
        },
        {
          title: '测试图层3',
          pkey: '2',
          key: 'test3',
          checked: false ,
          isBaseMap: false ,
          serverType: 'tile' ,
          mapServerURL: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
          subLayerid: '' ,
          subgeotype: '' ,
        }
      ]
    }
  }

 

  render() {
    return (
      <Draggable  axis='both'>
        <div className= {`${'_layerManager ' + (this.props.className ? this.props.className : '')}`}>
          <LayerTree map={this.props.map}  data={this.state.data}  />
          {/* <LayerTree map={this.props.map}  data={this.state.data}  /> */}
        </div>
      </Draggable>
    )
  }
}