import * as React from 'react'
import * as maptalks from 'maptalks'
import 'maptalks/dist/maptalks.css'
import config from './config'
import './index.scss'
interface IState {
  mapOptions?: object // maptalks的初始化配置信息
}
interface IProps {
  // maptalks配置信息
  mapOptions?: object, // maptalks的初始化配置信息
  className?: string, // 地图样式
  isArcGISLayer?: boolean, // 是否为arcgis底图服务，如果是必须提供arcGISLayerServiceUrl值
  arcGISLayerServiceUrl?: string, // ArcGIS地图url
  onCreate?: (maptalksMap: any) => void // 地图创建完成事件，参数为创建好的地图
}

export default class MaptalksCom extends React.Component<IProps, IState> {
  map: any
  mapContainer: HTMLDivElement| null

  constructor(props: IProps, state: IState) {
    super(props)
    // 地图默认配置
    const mapOptions = config.mapOptions
    const mapDefaultOptions = {
      center: mapOptions.center,
      zoom: mapOptions.zoom,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: mapOptions.baseLayer.urlTemplate,
        subdomains: mapOptions.baseLayer.subdomains,
        attribution: mapOptions.baseLayer.attribution
      })
    }
    this.state = {
      mapOptions: Object.assign({}, ...[mapDefaultOptions], this.props.mapOptions)
    }
  }


  componentDidMount() {
    this.constructMap(this.mapContainer).then(map => {
      this.map = map
    }, (errInfo) => {
      console.error(errInfo)
    })
    .then(() => {
      if (this.props.onCreate) {
        this.props.onCreate(this.map)
      }
    })
  }
  refs: {
    [key: string]: any
  }
  render() {
    const style = this.props.className ? this.props.className : 'maptalksCom'
    return(
      <div ref={node => this.mapContainer = node} className={style} />
    )
  }
  /**
   * 创建地图
   *
   * @param {(HTMLDivElement| null)} mapContainer 地图容器
   * @returns Promise
   * @memberof MaptalksCom
   */
  constructMap(mapContainer: HTMLDivElement| null) {
    return new Promise((resolve, reject) => {
      if (mapContainer) {
        if (this.props.isArcGISLayer) {
          const arcUrl = this.props.arcGISLayerServiceUrl
          maptalks.SpatialReference.loadArcgis(arcUrl + '?f=pjson', (err, conf) => {
            if (err) {
              throw new Error(err)
            }
            const options = Object.assign({}, ...[this.state.mapOptions], ...[{
              // center: config.mapOptions.center,
              // zoom: config.mapOptions.zoom,
              // maxZoom: 20,
              // minZoom: 4,
              spatialReference: {
                projection: 'EPSG:4326'
              },
              baseLayer: new maptalks.TileLayer('base', {
                spatialReference: {
                  projection: 'EPSG:3857'
                },
                'urlTemplate': arcUrl + '/tile/{z}/{y}/{x}',
                'attribution': '&copy; <a target="_blank" href="' + arcUrl + '"">ArcGIS</a>'
              })
            }])
            resolve(new maptalks.Map(mapContainer, options))
          })
        } else {
          resolve(new maptalks.Map(this.mapContainer, this.state.mapOptions))
        }
      } else {
        reject('Invalid map container div')
      }
    })
  }
}