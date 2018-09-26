import * as React from 'react'
import { TileLayer, SpatialReference } from 'maptalks'
import './index.less'
import Config from '@config/index'
import classnames from 'classnames'
// interface ILayer {
//   layerUrl: string,
//   layerId: string,
// }

// interface ITool {
//   imgPath: string,
//   tips: string,
//   placement: string,
//   layer: ILayer,
//   handler: (...args) => void
// }
interface IProps {
  map: any, // 地图实例
}

interface IState {
  hasSelectedId?: string, // 选中的底图的Id
}

class BaseMapSwitcher extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      hasSelectedId: 'image'
    }
  }

  handleBaseMapSwitch = (baseLayerInfo) => {
    this.setState({
      hasSelectedId: baseLayerInfo.id
    }, () => {
      const arcUrl = baseLayerInfo.url
      SpatialReference.loadArcgis(arcUrl + '?f=pjson', (err, conf) => {
        if (err) {
          throw new Error(err)
        }
        const newBaseLayer = new TileLayer('base', {
          spatialReference: {
            projection: 'EPSG:3857'
          },
          'urlTemplate': arcUrl + '/tile/{z}/{y}/{x}',
          'attribution': '&copy; <a target="_blank" href="' + arcUrl + '"">ArcGIS</a>'
        })
        this.props.map.setBaseLayer(newBaseLayer)
      })
    })
    
  }

  render() {
    return (
      <div className={'baseMapSwitcher'}>
        <div className={'baseMapList'}>
          {Config.baseMapLayers.baseLayers.map((item, key) => {
            let baseLayer
            switch (item.id) {
              case 'image':
                baseLayer = <div key={key} onClick={this.handleBaseMapSwitch.bind(this, item)} className={classnames('baseMapItem', { 'hasSelectedItem': item.id === this.state.hasSelectedId })} style={{ 'background': `url(${require('./img/image.png')}) no-repeat 0 0`, zIndex: key }}>
                  <span className='label' >{item.title}</span>
                </div>
                break
              case 'map':
                baseLayer = <div key={key} onClick={this.handleBaseMapSwitch.bind(this, item)} className={classnames('baseMapItem', { 'hasSelectedItem': item.id === this.state.hasSelectedId })} style={{ 'background': `url(${require('./img/map.png')}) no-repeat 0 0`, zIndex: key }}>
                  <span className='label' >{item.title}</span>
                </div>
                break
              default:
                baseLayer = <div key={key} onClick={this.handleBaseMapSwitch.bind(this, item)} className={classnames('baseMapItem', { 'hasSelectedItem': item.id === this.state.hasSelectedId })} style={{ 'background': `url(${require('./img/terrain.png')}) no-repeat 0 0`, zIndex: key }}>
                  <span className='label' >{item.title}</span>
                </div>
                break
            }
            return baseLayer
          })}
        </div>
      </div>
    )
  }
}

export default BaseMapSwitcher