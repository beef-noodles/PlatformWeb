import React from 'react'
import  './index.less'

import CoreContainter from './CoreContainer'
import DetailContainer from './DetailContainer'

import pointerMarker from './img/pointerMarker.png'
import { VectorLayer , Marker  } from 'maptalks'
// Marker


import { GetWatf } from '@api/Map'

 interface IState {
  coreVisible ? : boolean
  detailVisible ?: boolean
  listKey ? : string // 列表和详情关联的唯一值,用来通过列表获取详情
  visible  ? : boolean
  currentComponent ? :  'CoreContainer'|'DetailContainer' ,
  data ?: any
  dataFlag ?: any
 }
 interface IProps {
   menuItemPanelClose : () => void
   visible  ? : boolean
   map?: any // map 对象
 }

export default class Water extends React.Component <IProps , IState> {
  isMount : boolean
  map = this.props.map
  data: any
  constructor (props : IProps, state : IState) {
    super(props)
    this.state = {
      visible : this.props.visible ,
      currentComponent : 'CoreContainer' ,
      coreVisible : true,
      detailVisible : false,
      listKey : '',
    }
  }

  componentWillMount () {
    this.isMount  = true
    
    
  }
  componentDidMount () {
    this.addLayerToMap('water')
    this.getData()
  }
  componentWillUnmount () {
    this.isMount  = false
    console.log(sessionStorage.getItem('y'))
    sessionStorage.removeItem('y')
  }

  /**
   * 确保从MenuPanel切换到MenuItemPanel时，MenuItemPanel展示的是coreContainer(list)部分而不是Detail部分
   * 场景描述：当MenuItemPanel展示的是Detail部分而通过点击输入框回到MenuPanel展示的情况下，
   * 再次通过MenuPanel进入到MenuItemPanel时不做该函数处理就会直接展示Detail部分而不是Core
   * @param nextProps
   */
  componentWillReceiveProps (nextProps : IProps) {
    if (nextProps.visible === true) {
      if (this.isMount ) {
         this.coreOpenAndDetailClose()
        }
    }
  }
  /**
   *
   */
  coreCloseAndDetailOpen = (value) => {
    if (this.isMount) {
      this.setState ({
        currentComponent : 'DetailContainer' ,
        coreVisible : false,
        detailVisible : true,
        listKey: value
      })
    }
  }
  coreOpenAndDetailClose = () => {
    if (this.isMount) {
      this.setState ({
        currentComponent : 'CoreContainer' ,
        coreVisible : true,
        detailVisible : false,
        listKey : '',
      })
    }
  }

  menuItemPanelClose = () => {
    this.props.menuItemPanelClose()
  }

  /**
   * 获取水情列表数据
   * 
   */
  getData = () => {
      this.testGet()
  }

  /**
   * 
   */
  testGet = () => {
    GetWatf().then(dataPara => {
      this.data = dataPara
      this.setState({
        data: dataPara
      })
      this.addMarkersToLayer('water' , this.data)
    }, err => {
      console.error(err)
    })
  }
  /**
   * 添加指定id的结果图层
   */
  addLayerToMap = (layerId : string ) => {
    const layer = this.map.getLayer(layerId)
    if (layer) {
      return 
    } else {
      new VectorLayer(layerId).addTo(this.map)
    }
  }

  /**
   * 向图层上添加marker
   */
  addMarkerToLayer = (data, layer) => {
    const marker = new Marker([data.lgtd, data.lttd], 
      {
        'id' : data.stcd,
        'properties': data,
        'symbol' : {
          'markerFile'   : pointerMarker,
          'markerWidth'  : 49,
          'markerHeight' : 49,
          'markerDx'     : 0,
          'markerDy'     : 0,
          'markerOpacity': 1
        }
      }
    )
    marker.addTo(layer)
    marker.setInfoWindow({
      'title'     : `水情站: [${data.stnm }]  [${data.stcd}]`,
      'content'   : `上报时间: ${data.tm}`,
      'autoOpenOn' : 'click',
      'autoCloseOn' : 'click'
    })
  }

  /**
   * 向图层上添加marker
   */
  addMarkersToLayer = (layerId , values) => {
    const layer = this.map.getLayer(layerId)
    for (const value of values) {
      this.addMarkerToLayer(value , layer)
    }
  }


  renderCoreContainer = () => {
    return (
      <React.Fragment>
        <CoreContainter data= {this.state.data} map = {this.map} coreCloseAndDetailOpen={this.coreCloseAndDetailOpen.bind(this)}  menuItemPanelClose ={this.menuItemPanelClose} visible = {this.state.coreVisible}/>
      </React.Fragment>
    )
  }

  renderDetailContainer = () => {
    return (
      <React.Fragment>
        <DetailContainer  coreOpenAndDetailClose= {this.coreOpenAndDetailClose.bind(this)} listKey = {this.state.listKey} visible = {this.state.detailVisible}/>
      </React.Fragment>
    )
  }

  render () {
    // const current = this.renderWater()
    const currentComponent = this.state.currentComponent === 'CoreContainer' ? this.renderCoreContainer() : this.renderDetailContainer()
    return (
      <div>
        {currentComponent}
      </div>
    )
  }
}