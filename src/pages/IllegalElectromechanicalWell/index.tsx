import * as React from 'react'
import MaptalksCom from '@components/mapComponents/MaptalksCom'
import './index.scss'
import {Marker, VectorLayer} from 'maptalks'
import logo from './image/08.png'
import GISTools from '@components/GISTools'
import {getIllegalElectromechanicalWellData} from '@api/IllegalElectromechanicalWell'
import DirectTool from '@components/GISTools/MapDirectTool'
interface IState {
  hasData?: boolean, // 是否已经有csv上传
  hasMapLoaded?: boolean,
  stationLayer?: any,
  go?: boolean
}

interface IProps {
  test?: any
}

export default class IllegalElectromechanicalWell extends React.Component<IProps, IState> {
  stationLayer: any // 非法机电井图层
  map: any
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      hasData: false,
      hasMapLoaded: false,
      go: false
    }
    this.getMap = this.getMap.bind(this)
    this.handleData = this.handleData.bind(this)
  }


  /**
   * 获取最新的非法机电井数据
   *
   * @returns
   * @memberof IllegalElectromechanicalWell
   * @returns Promise
   */
  getData() {
    getIllegalElectromechanicalWellData().then((res: any) => {
      this.handleData(res.data)
    }, (err) => {
      console.error(err)
      this.handleData(err.data)
      return
    })
  }

  showModal = () => {
    console.log('test')
  }

  addIllegalElectromechanicalWellToMap(dataList: any) {
    const self = this
    dataList.map(item => {
      const longitude = item.longitude
      const latitude = item.latitude
      const x = item.x
      const y = item.y
      const address = item.address ? item.address : '--'
      const year = item.dumpingtm ? '(' + item.dumpingtm + '年)' : ''
      const motorowner  = item.motorowner ? item.motorowner : '--' // 所有人
      const monitoracceptor = item.monitoracceptor ? item.monitoracceptor : '--' // 水政监察验收人
      const waterpipeacceptor = item.waterpipeacceptor ? item.waterpipeacceptor : '--'// 水管站验收人
      if (x && y) {
        const marker = new Marker([x, y], {
          // 'id' : 'marker0',
          'symbol': {
            'markerFile': logo,
            'markerWidth': 30,
            'markerHeight': 30,
          },
          'properties': {
            'foo': 'value'
          }
        }).addTo(self.stationLayer)

        let imgList = ''
        if (item.images) {
          imgList = '<div><span class="contentValue">填埋前后照片对比</span></div>' +
          // /WMS/picture/getPicture.do?pictureId=
          `<div><img class="illegalImages" src="/WMS/picture/getPicture.do?pictureId=${item.images[0].pictureid}" /><img class="illegalImages" src="/WMS/picture/getPicture.do?pictureId=${item.images[1].pictureid}" /></div>`
        }

        const content = '<div class="dialogContent">' +
        `<div><span class='contentKey'>所有人</span><span class='contentValue'>${motorowner}</span></div>` +
        `<div><span class='contentKey'>水政验收</span><span class='contentValue'>${monitoracceptor}</span></div>` +
        `<div><span class='contentKey'>水管站验收人</span><span class='contentValue'>${waterpipeacceptor}</span></div>` +
        `<div><span class='contentKey'>经纬度</span><span class='contentValue'>${longitude} - ${latitude}</span></div>` +
        imgList +
        // `<div><span class="contentImg" onClick="javascript:console.log('test');this.setState({go: true}, ()=> {console.log(this.state.go)})">填埋前后照片对比</span></div>` +
        '</div>'
        marker.setInfoWindow({
          'title': address + year,
          'content': content,
          // 'autoPan': true,
          // 'width': 300,
          // 'minHeight': 120,
          // 'custom': false,
          'autoOpenOn': 'click',  // set to null if not to open when clicking on marker
          'autoCloseOn': 'click'
        })
      }
    })
  }
  /**
   * 将获取到的数据添加到地图中
   *
   * @param {Object[]} dataList 数据列表
   * @memberof IllegalElectromechanicalWell
   */
  handleData(dataList) {
    if (this.state.hasData) {
      this.stationLayer.remove()
    }
    if (dataList && dataList.length > 0) {
      this.setState({
        hasData: true
      }, () => {
        this.addIllegalElectromechanicalWellToMap(dataList)
      })
    }
  }
  /**
   * 获取创建的地图
   *
   * @param {*} map 返回的地图对象
   * @memberof IllegalElectromechanicalWell
   */
  getMap(map) {
    this.map = map
    this.stationLayer = new VectorLayer('stationLayer').addTo(this.map)
    this.setState({
      hasMapLoaded: true
    }, () => {
      this.getData()
    })
  }
  render() {
    const arcGISLayerServiceUrl = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    const mapOption = {
      center: [86.404994246, 42.0246267579],
      zoom: 11,
      // zoomControl: true,
      overviewControl: {
        maximize: false
      },
      scaleControl: true
    }
    return (
      <div className='illegalAppContainer'>
        <MaptalksCom className='maptalksContainer' mapOptions={mapOption} isArcGISLayer arcGISLayerServiceUrl={arcGISLayerServiceUrl} onCreate={this.getMap} />
        {this.state.hasMapLoaded! && (<GISTools map={this.map} className='gisTools' />)}
        {this.state.hasMapLoaded! && (<DirectTool map={this.map} />)}
      </div>
    )
  }
}