import * as React from 'react'
// import Draggable from 'react-draggable'
import MaptalksCom from '@components/mapComponents/MaptalksCom'
import './index.less'
import Config from '@config/index'
import DirectTool from '@components/GISTools/MapDirectTool'
import Full from '@components/GISTools/BaseTool/Full'
import Zoom from '@components/GISTools/BaseTool/Zoom'
import { ControlFooterDisplay, ControlHeaderDisplay } from '@pages/PageUtils'
import DraggableContainer from '@components/DraggableContainer'
import MeasureTool from '@components/GISTools/BaseTool/MeasureTool'
import {GetWatf} from '@api/Map'
import LayerManage from '@components/GISTools/LayerManage'

import BaseMapSwitcher from '@components/GISTools/BaseMapSwitcher'
import StationManager from '@components/StationManager'
import UserMenu from '@components/GISTools/UserMenu'

interface IState {
  hasMapLoaded?: boolean,
  // toolArr?: ITool[], // 工具条显示配置
  layerContainerVisible: boolean // 图层控制窗口显示状态控制
}

interface IProps {
  test?: string
}

export default class Map extends React.Component<IProps, IState> {
  map: any
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      hasMapLoaded: false,
      layerContainerVisible: false,
    }
    ControlFooterDisplay(false)
    ControlHeaderDisplay(false)
    this.testGet()
  }

  testGet = () => {
    GetWatf().then((data) => {console.log(data)}, err => {console.log(err)})
  }

  renderUserMenu = () => {
    return (
      <UserMenu className='userMenu'/>
    )
  }
  /**
   * 底图切换功能
   *
   * @memberof Map
   */
  renderBaseMapSwitcher = () => {
    return (
      <BaseMapSwitcher map={this.map} />
    )
  }

  /**
   * 切换图层控制窗口的显示与关闭
   */
  LayerContainerToggle = () => {
    this.setState({
      layerContainerVisible: !this.state.layerContainerVisible
    })
  }
  /**
   * 渲染direct
   *
   * @memberof Map
   */
  renderDirect = () => {
    return (
      <DirectTool className='mapDirectTool'  map={this.map} />
    )
  }
  /**
   * 渲染全屏
   *
   * @memberof Map
   */
  renderFull = () => {
    return (
      <div className='fullContainer'>
        <Full map={this.map} className='' />
      </div>
    )
  }

  /**
   * 渲染放大缩小按钮
   *
   * @memberof Map
   */
  renderZoom = () => {
    return (
      <div className='zoomContainer'>
        <Zoom map={this.map} className='' orientation='column'/>
      </div>
    )
  }

  /**
   * 渲染gis工具条
   */
  renderGisToolBar = () => {
    return (
      <DraggableContainer className='gisToolBar'>
      {/* <div className='gisToolBar'> */}
        {/* {this.renderLayerControl()} */}
        <LayerManage map={this.map!} />
        <MeasureTool map={this.map} className='' />
        {/* <LayerManage visible={this.state.layerContainerVisible} className='layerWindow' map={this.map!} /> */}
      {/* </div> */}
      </DraggableContainer>
    )
  }
  /**
   * 渲染StationManager组件
   */
  renderStationManager = () => {
    return (
      <StationManager map = {this.map}/>
    )
  }

  /**
   * 获取创建的地图
   *
   * @param {*} map 返回的地图对象
   * @memberof Map
   */
  getMap = (map) => {
    this.map = map
    this.setState({
      hasMapLoaded: true
    })
  }
  render() {
    const arcGISLayerServiceUrl = Config.baseMapLayers.baseLayers[0].url 
    const mapOption = {
      center: [108.88071, 34.22455],
      zoom: 15,
      scaleControl: true
    }
    let full, zoom, direct, gisToolBar, baseMapSwitcher, stationManager, userMenu
    if (this.state.hasMapLoaded!) {
      full = this.renderFull()
      zoom = this.renderZoom()
      direct = this.renderDirect()
      baseMapSwitcher = this.renderBaseMapSwitcher()
      gisToolBar = this.renderGisToolBar()
      baseMapSwitcher = this.renderBaseMapSwitcher()
      stationManager = this.renderStationManager()
      userMenu =  this.renderUserMenu()
    }
    return (
      <div className='MapInstance'>
        <MaptalksCom className='maptalksContainer' mapOptions={mapOption} isArcGISLayer arcGISLayerServiceUrl={arcGISLayerServiceUrl} onCreate={this.getMap} />
        {gisToolBar}
        {full}
        {zoom}
        {direct}
        {baseMapSwitcher}
        {stationManager}
        {userMenu}
      </div>
    )
  }
}
