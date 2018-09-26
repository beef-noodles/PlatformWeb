import * as React from 'react'
import * as maptalks from 'maptalks'

import { message } from 'antd'

import './index.less'
import Draggable from 'react-draggable'
import BaseToolItem from './BaseTool/BaseToolItem'
import b2 from './img/b2.png'
import b3 from './img/b3.png'
import b4 from './img/b4.png'
import b5 from './img/b5.png'
import area from './img/area.png' // 面积测量图标
import clear from './img/clear.png' // 清除图标
// import print from './img/print.png'


interface ITool {
  imgPath: string,
  tips: string,
  placement: string,
  handler: () => void
}
interface IProps {
  className?: string, // 样式
  map: any, // 地图实例
  orientation?: string, // 工具条的方向， 默认水平
  toolArr?: ITool[], // 工具条工具集合
}

interface IState {
  orientation?: 'row' | 'row-reverse' | 'column' | 'column-reverse', // 工具条的方向， 默认水平
  toolArr?: ITool[], // 工具条工具集合
}

class GISTools extends React.Component<IProps, IState> {
  map = this.props.map
  distanceTool : any // 距离测量  
  areaTool : any // 面积测量
  defaultCenter : any // 记录地图显示的默认中心点
  defaultZoom : any // 记录地图显示的默认zoom值
  minZoom : any // 记录最小缩放级别
  maxZoom : any // 记录最大缩放级别
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      orientation: 'row',
      toolArr:  [{
        imgPath: b2,
        tips: '测距',
        handler: this.measureDistance,
        placement: 'left'
      } ,
      {
        imgPath: area,
        tips: '测面',
        handler: this.measureArea,
        placement: 'left'
      }
      , {
        imgPath: b3,
        tips: '全图',
        handler: this.fullExtentHandle,
        placement: 'left'
      }, {
        imgPath: b4,
        tips: '缩小',
        handler: this.zoomOutHandle,
        placement: 'left'
      }, {
        imgPath: b5,
        tips: '放大',
        handler: this.zoomInHandle,
        placement: 'left'
      }, 
      // {
      //   imgPath: print,
      //   tips: '打印',
      //   handler: this.print,
      //   placement: 'top'
      // },
       {
        imgPath: clear,
        tips: '清除',
        handler: this.clear,
        placement: 'top'
      }]
    }
  }
  componentDidMount() {
    this.defaultCenter = this.map.getCenter() // 获取地图默认中心点                    
    this.defaultZoom = this.map.getZoom() // 获取地图默认zoom值
    this.distanceTool = this.addDistanceToolToMap() 
    this.areaTool = this.addAreaToolToMap() 
    
    this.maxZoom = this.map.getMaxZoom() // 获取最大zoom值
    this.minZoom = this.map.getMinZoom() // 获取最小zoom值
    
    // registerEvent
    this.distanceTool.on('drawend', () => {
      this.distanceTool.disable()
      this.map.resetCursor()
    })
    this.areaTool.on('drawend', () => {
      this.areaTool.disable()
      this.map.resetCursor()
    })
  }
  /**
   * 实例化Maptalks.DistanceTool，并将其添加到map上
   *
   * @returns maptalk.DistanceTools
   * @memberof GISTools
   */
  addDistanceToolToMap() {
    return new maptalks.DistanceTool({
      'symbol': {
        'lineColor' : '#34495e',
        'lineWidth' : 2
      },
      'vertexSymbol' : {
        'markerType'        : 'ellipse',
        'markerFill'        : '#1bbc9b',
        'markerLineColor'   : '#000',
        'markerLineWidth'   : 3,
        'markerWidth'       : 10,
        'markerHeight'      : 10
      },

      'labelOptions' : {
        'textSymbol': {
          'textFaceName': 'monospace',
          'textFill' : '#fff',
          'textLineSpacing': 1,
          'textHorizontalAlignment': 'right',
          'textDx': 15,
          'markerLineColor': '#b4b3b3',
          'markerFill' : '#000'
        },
        'boxStyle' : {
          'padding' : [6, 2],
          'symbol' : {
            'markerType' : 'square',
            'markerFill' : '#000',
            'markerFillOpacity' : 0.9,
            'markerLineColor' : '#b4b3b3'
          }
        }
      },
      'clearButtonSymbol' : [{
        'markerType': 'square',
        'markerFill': '#000',
        'markerLineColor': '#b4b3b3',
        'markerLineWidth': 2,
        'markerWidth': 15,
        'markerHeight': 15,
        'markerDx': 20
      }, {
        'markerType': 'x',
        'markerWidth': 10,
        'markerHeight': 10,
        'markerLineColor' : '#fff',
        'markerDx': 20
      }],
      'language' : 'zh-CN'
    }).addTo(this.map).disable()
    this.map.resetCursor()
  }
  /**
   * 全局警告
   * 
   * warningText 警告提示语
   * time 警告自动关闭时间，单位s,默认值为3
   */
  warning = (warningText, time) => {
    message.warning(warningText, time)
  }

  /**
   * 距离测量
   */
  measureDistance = () => {
   this.distanceTool.enable()
   this.map.setCursor('url(' + b2 + ') 4 12, auto')
  }
  measureArea = () => {
    this.areaTool.enable()
    this.map.setCursor('url(' + area + ') 4 12, auto')
  }
  addAreaToolToMap = () => {
    return new maptalks.AreaTool({
      'symbol': {
        'lineColor' : '#1bbc9b',
        'lineWidth' : 2,
        'polygonFill' : '#fff',
        'polygonOpacity' : 0.3
      },
      'vertexSymbol' : {
        'markerType'        : 'ellipse',
        'markerFill'        : '#34495e',
        'markerLineColor'   : '#1bbc9b',
        'markerLineWidth'   : 3,
        'markerWidth'       : 10,
        'markerHeight'      : 10
      },
      'labelOptions' : {
        'textSymbol': {
          'textFaceName': 'monospace',
          'textFill' : '#fff',
          'textLineSpacing': 1,
          'textHorizontalAlignment': 'right',
          'textDx': 15
        },
        'boxStyle' : {
          'padding' : [6, 2],
          'symbol' : {
            'markerType' : 'square',
            'markerFill' : '#000',
            'markerFillOpacity' : 0.9,
            'markerLineColor' : '#b4b3b3'
          }
        }
      },
      'clearButtonSymbol' : [{
        'markerType': 'square',
        'markerFill': '#000',
        'markerLineColor': '#b4b3b3',
        'markerLineWidth': 2,
        'markerWidth': 15,
        'markerHeight': 15,
        'markerDx': 22
      }, {
        'markerType': 'x',
        'markerWidth': 10,
        'markerHeight': 10,
        'markerLineColor' : '#fff',
        'markerDx': 22
      }],
      'language' : 'zh-CN'
    }).addTo(this.map).disable()
    this.map.resetCursor()
  }
  /**
   * 缩小
   *
   * @memberof GISTools
   */
  zoomOutHandle = () => {
    const currentZoom = this.map.getZoom()
    if (currentZoom <= this.minZoom) {
      this.warning('目前已为最小级别！', 1.5)
    } else {
      this.map.zoomOut()
    }
  }
  /**
   * 放大
   *
   * @memberof GISTools
   */
  zoomInHandle = () => {
    const currentZoom = this.map.getZoom()
    if (currentZoom >= this.maxZoom) {
      // if (currentZoom >= 17) { // 通过getMaxZoom()方法获取到的maxZoom值为19，但是实测发现17级之后就没有数据了
      this.warning('目前已为最大级别！', 1.5)
    } else {
      this.map.zoomIn()
    }
  }
  /**
   * 全图
   * 回到初始范围
   */
  fullExtentHandle = () => {                      
    this.map.setCenterAndZoom(this.defaultCenter, this.defaultZoom)                  
  }
  /**
   * 清除所有地图常用小工具留在地图上的标记
   */
  clear = () => {
    this.distanceTool.clear() // 清除距离测量结果
    this.areaTool.clear() // 清除面积测量结果
  }
  /**
   * 打印
   * 将地图导出为图片后做图片打印
   */
  print = () => {
    this.saveMapAsImg()
  }
  /**
   * 将map另存为图片
   */
  saveMapAsImg = () => {
     this.map.toDataURL({
      'mimeType' : 'image/jpeg', // or 'image/png'
      'save' : true,  // to pop a save dialog
      'fileName' : 'map' // file name
    })
  }
  /**
   * 渲染工具条
   *
   * @memberof GISTools
   */
  renderToolBar = () => {
    return (
      this.state.toolArr!.map((item, key) => {
        return (
          <BaseToolItem key={key}  imgPath={item.imgPath} tips={item.tips} onClick={item.handler.bind(this)} placement={item.placement}/>
        )
      })
    )
  }
  render() {
    const toolbar = this.renderToolBar()
    return (
      <Draggable
        axis='both'
        // defaultPosition={{ x: 0, y: 0 }}
        // grid={[25, 25]}
      // onStart={this.handleStart}
      // onDrag={this.handleDrag}
      // onStop={this.handleStop}
      >
        <div style={{ flexDirection: this.state.orientation }} className={`${'_gisTools ' + (this.props.className ? this.props.className : '')}`}>
          {toolbar}
        </div>
      </Draggable>
    )
  }
}

export default GISTools