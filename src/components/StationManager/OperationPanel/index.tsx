import * as React from 'react'
import './index.less'
import StationIndicator from '../StationIndicators'
import CollapseMode, {IDataItem} from '@components/CollapseMode'
import PubSub from 'pubsub-js'
import {message} from 'antd'
import {IItem} from '@components/IconMode'
import {GetWaterLists} from '@api/Map'
import {VectorLayer, Marker, Coordinate} from 'maptalks'
import pointerMarker from './img/pointerMarker.png'
import HttpClient from '@utils/HttpClient'

/**
 * 点击的某一个站点的数据结构
 *
 * @interface IData
 */
export interface IData {
  type: string,
  data?: any
}

interface IProps {
  /**
   * 样式名
   */
  className?: string
  onClick?: (data: IData) => any,
  map: any
  /**
   * 只要传入该值就自动触发一次查询
   *
   */
  queryFromInput?: {
    time: number,
    station: IItem
  }
}

interface IState {
  /**
   * 样式名
   */
  className?: string,
  dataStore?: IDataItem[]
}

// pubsub for card uuid
const GO_TO_DETAIL = '166c3aca67a-card-b'
/**
 * 左侧操作面板，也是第一屏
 *
 * @export
 * @class OperationPanel
 * @extends {React.Component<IProps, IState>}
 */
export default class OperationPanel extends React.Component<IProps, IState> {
  map = this.props.map

  /**
   * 用来存储panel数据
   *  IDataStore
   *
   * @type {*}
   * @memberof OperationPanel
   */
  constructor(props: IProps) {
    super(props)
    this.state = {
      className: this.props.className ? this.props.className : '',
      dataStore: [],
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.className !== this.props.className) {
      this.setState({
        className: nextProps.className,
      })
    }
    if (nextProps.queryFromInput !== this.props.queryFromInput) {
      this.getCardListByStationType(nextProps.queryFromInput!.station)
    }
  }

  componentWillUnmount() {
    PubSub.unsubscribe(GO_TO_DETAIL)
  }

  goToDetail = (item: IData) => {
    this.props.onClick ? this.props.onClick!(item) : console.log('go to detail')
    this.centerTOPoint(item.data.LGTD, item.data.LTTD)
  }

  getCardListByStationType = (item: IItem) => {

    if (!this.isLivedDataByKey(item.type)) {
      // 更具type获取列表，没有该类型测站和该测站测站没有数据，返回值都是空对象
      HttpClient.get(`/api/gis/info/${item.type}`, {}).then((res: any) => {
        if (res.total) {
          this.addData(item.type, item.name, [res])
          // todo duxx --> addLayerToMap
        } else {
          message.error(`暂不提供${item.name}的查询操作！`)
        }
      })
    } else {
      message.warning(`列表中已有${item.name}结果。`)
    }
  }

  /**
   * 获取河道水情
   */
  getRiverWater = () => {
    const type = 'sq'
    GetWaterLists().then(res => {
      this.addData(type, '水情站', [res])
      console.log(res)
      this.addLayerToMap(type).then(layer => {
        this.addMarkersToLayer(layer, res)
      })
    }, err => {
      console.error(err)
    })
  }

  // ============数据符号化===================
  /**
   * 创建并添加指定id的图层
   */
  addLayerToMap = (layerId: string) => {
    const layer = this.map.getLayer(layerId)
    return new Promise((resolve, reject) => {
      if (layer) {
        reject('')
      } else {
        resolve(new VectorLayer(layerId).addTo(this.map))
      }
    })
  }
  /**
   * 添加一个marker到指定图层
   */
  addMarkerToLayer = (data, layer) => {
    const marker = new Marker([parseFloat(data.lgtd), parseFloat(data.lttd)],
      {
        'id': data.stcd,
        'properties': data,
        'symbol': {
          'markerFile': pointerMarker,
          'markerWidth': 49,
          'markerHeight': 49,
          'markerDx': 0,
          'markerDy': 0,
          'markerOpacity': 1,
        },
      },
    )

    marker.addTo(layer)
    marker.setInfoWindow({
      'title': `水情站: [${data.stnm }]  [${data.stcd}]`,
      'content': `上报时间: ${data.tm}`,
      'autoOpenOn': 'click',
      'autoCloseOn': 'click',
    })
  }
  /**
   * 添加一系列marker到指定图层
   */
  addMarkersToLayer = (layer, values) => {
    // console.log(values)
    for (const value of values) {
      console.log(value)
      this.addMarkerToLayer(value, layer)
    }
  }


  /**
   * 定位
   */
  centerTOPoint = (longitude, latitude) => {
    const coord = new Coordinate(longitude, latitude)
    if (this.map.getZoom() >= 15) {
      this.map.panTo(coord, {
        animation: true,
        duration: 1000, // 默认值为600
      })
    } else {
      this.map.setCenter(coord)
      this.map.setZoom(15)
    }
  }


  // ============数据符号化===================


  /**
   * 是否存在key站类数据
   * @param {string} key 判断依据
   * @memberof OperationPanel
   */
  isLivedDataByKey = (key) => {
    const livedDataStore = this.state.dataStore!.filter((item: IDataItem) => {
      return item.typeName === key
    })
    return livedDataStore.length <= 0 ? false : true
  }

  addData = (key: string, name: string, data: any) => {
    const item = {
      typeName: key,
      name,
      data,
    }
    this.state.dataStore!.push(item)
    this.setState({
      dataStore: this.state.dataStore!.reverse(),
    })
  }

  deleteDataByKey = (key: string): void => {
    const newDataStore = this.state.dataStore!.filter((item: IDataItem) => item.typeName !== key)
    this.setState({
      dataStore: newDataStore,
    })
  }


  handleOnClose = (key: string): void => {
    console.log(key)
    this.deleteDataByKey(key)
  }

  renderCollapseMode = (): any => {
    if (this.state.dataStore!.length > 0) {
      return <CollapseMode panelList={this.state.dataStore!} cardOnClick={this.goToDetail}
                           onClose={this.handleOnClose}/>
    }
  }

  render() {
    const renderCollapseMode = this.renderCollapseMode()
    return (
      <div className={`${this.state.className}`}>
        <StationIndicator onClick={this.getCardListByStationType}/>
        {renderCollapseMode}
      </div>
    )
  }
}