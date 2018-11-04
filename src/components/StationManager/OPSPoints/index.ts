import {GetAllOPSPoints} from '@api/Map'
import {VectorLayer, Marker} from 'maptalks'
import pointerMarker from './img/pointerMarker.png'
import PubSub from 'pubsub-js'

export const OPSToken = 'e84bfe2e-a89d-47f8-be26-bba514270de0' // 消息传递
export default class OPSPoints  {
  map : any // map 对象
  layer : any // 图层
  constructor(map , layerId = 'ops') {
    this.map = map
    this.addLayerToMap(layerId).then(layer => {
      this.layer = layer
    }, (err) => {
      console.error(err)
    })
  }
  OPSPoints () {
    this.getAllOPSPoints()
  }
  getAllOPSPoints () {
    GetAllOPSPoints().then( (data) => {
      this.addMarkersToLayer(data, this.layer)
    }, (err) => {
      console.log(err)
    })
  }
  /**
   * 创建并添加指定id的图层
   */
  addLayerToMap = (layerId : string ) => {
    const layer = this.map.getLayer(layerId)
    return new Promise ((resolve, reject) => {
      if (layer) {
        reject('duplicate layer id')
      } else {
        resolve(new VectorLayer(layerId).addTo(this.map))
      }
    })
  }
  /**
   * 添加一个marker到指定图层
   */
  addMarkerToLayer = (data, layer) => {
    let markerFile
    switch (data.status) {
      case '1' :
      markerFile =  pointerMarker
      break
      case '2' :
      markerFile = pointerMarker
      break
      case '3' :
      markerFile = pointerMarker
      break
      default :
      markerFile = pointerMarker
    }
    const marker = new Marker([data.lgtd, data.lttd], 
      {
        'id' : data.stcd,
        'properties': data,
        'symbol' : {
          'markerFile'   : markerFile,
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
      'title'     : `${data.name}`,
      'content'   : ``,
      'autoOpenOn' : 'click',
      'autoCloseOn' : 'click'
    })
    marker.on('click' , (e) => {
      this.goToDetail(e.target.properties)
    })
  }
  /**
   * 添加一系列marker到指定图层
   */
  addMarkersToLayer = (values , layer) => {
    for (const value of values) {
      this.addMarkerToLayer(value , layer)
    }
  }
  goToDetail = (item: any) => {
    PubSub.publish(OPSToken, item)
  }

}
