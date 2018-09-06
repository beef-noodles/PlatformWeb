import * as React from 'react'
import * as maptalks from 'maptalks'

import './index.scss'
import Draggable from 'react-draggable'
import BaseTool from './BaseTool'
import m2 from './img/m2.png'
import m3 from './img/m3.png'
import m4 from './img/m4.png'
import m5 from './img/m5.png'



interface ILayer {
  layerUrl: string,
  layerId: string,
}

interface ITool {
  imgPath: string,
  tips: string,
  placement: string,
  layer: ILayer,
  handler: (...args) => void
}
interface IProps {
  className?: string, // 样式
  map: any, // 地图实例
  orientation?: 'row' | 'row-reverse' | 'column' | 'column-reverse', // 工具条的方向， 默认水平
}

interface IState {
  orientation?: 'row' | 'row-reverse' | 'column' | 'column-reverse', // 工具条的方向， 默认水平
  toolArr?: ITool[], // 工具条工具集合
  current?: string
}

class SwitchBaseMapTools extends React.Component<IProps, IState> {
  map = this.props.map
  layerIds : string[] = [] 
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      orientation: 'row',
      current: 'base',
      toolArr: [
        {
          imgPath: m5,
          tips: '影像图',
          placement: 'top',
          layer: {
            layerUrl: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',    // 默认底图的该节点可以为空
            layerId: 'base', // 如果是初始化添加的底图这里配的id必须和初始化图层id一致
          },
          handler: this.displayImageLayer
        },
        {
          imgPath: m2,
          tips: '街景图-暖色版',
          placement: 'top',
          layer: {
            layerUrl: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',  // 暖色版
            layerId: 'warm',
          },
          handler: this.displayTopographicLayer
        },
        {
          imgPath: m3,
          tips: '街景图-紫蓝色版',
          placement: 'top',
          layer: {
            layerUrl: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',   // 紫蓝色版
            layerId: 'purplishBlue',
          },
          handler: this.displayVectorLayer
        },
        {
          imgPath: m4,
          tips: '街景图-灰色版',
          placement: 'top',
          layer: {
            layerUrl: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',   // 灰色版
            layerId: 'gray',
          },
          handler: this.displayVectorLayer
        }
      ]
    }
  }
  componentDidMount() {
    this.addBaseLayers()
    // this.map.basemap
  }

  addBaseLayers = () => {
    const self = this
    self.state.toolArr!.map((item, key) => {
      if (item.layer.layerId !== self.state.current) {
        const layer = new maptalks.TileLayer(item.layer.layerId, {
          spatialReference: {
            projection: 'EPSG:3857'
          },
          'urlTemplate': item.layer.layerUrl + '/tile/{z}/{y}/{x}',
          'visible': false
        })
        self.map.addLayer(layer)
        self.layerIds.push(item.layer.layerId)
      } else {
        self.layerIds.push(item.layer.layerId)
      }
    })
  }

  /**
   * 隐藏除当前显示底图之外的所有底图
   * visibleLayerId 可见图层的id
   */
  hiddenLayersByLayerIds = (visibleLayerId, layerIds) => {
    layerIds.map((item, key) => {
      if (item !== visibleLayerId) {
        const layer = this.map.getLayer(item)
        if (layer.isVisible() === true) {
          layer.hide()
        }
      }
    })
    this.setState({
      current: visibleLayerId
    })
  }

  /**
   * 显示影像图-测试
   */
  displayImageLayer = (visibleLayerId) => {
    const layer = this.map.getLayer(visibleLayerId)
    if (layer.isVisible() === false) {
      layer.show()
    }
    this.hiddenLayersByLayerIds(visibleLayerId, this.layerIds)

  }

  /**
   * 显示地形图-测试
   */
  displayTopographicLayer = (visibleLayerId) => {
    const layer = this.map.getLayer(visibleLayerId)
    if (layer.isVisible() === false) {
      layer.show()
    }
    this.hiddenLayersByLayerIds(visibleLayerId, this.layerIds)
  }
  /**
   * 显示矢量图-测试
   */
  displayVectorLayer = (visibleLayerId) => {
    const layer = this.map.getLayer(visibleLayerId)
    if (layer.isVisible() === false) {
      layer.show()
    }
    this.hiddenLayersByLayerIds(visibleLayerId, this.layerIds)
  }

  /**
   * 渲染工具条
   *
   * @memberof GISTools
   */
  renderToolBar = () => {
    const currentStyle = {
      // border: '5px solid #00A9FF',
      // background: '#fff'
      boxShadow: '0px 0px 2px 3px #000'
    }
    return (
      this.state.toolArr!.map((item, key) => {
        if (this.state.current === item.layer.layerId) {
          return (
            <BaseTool key={key} style={currentStyle} imgPath={item.imgPath} tips={item.tips} onClick={item.handler.bind(this, item.layer.layerId)} placement={item.placement} />
          )
        } else {
          return (
            <BaseTool key={key} imgPath={item.imgPath} tips={item.tips} onClick={item.handler.bind(this, item.layer.layerId)} placement={item.placement} />
          )
        }
      })
    )
  }
  render() {
    const toolbar = this.renderToolBar()
    return (
      <Draggable
        axis='both'
      >
        <div style={{ flexDirection: this.state.orientation }} className={`${'gisTool_switchBaseMap ' + (this.props.className ? this.props.className : '')}`}>
          {toolbar}
        </div>
      </Draggable>
    )
  }
}

export default SwitchBaseMapTools