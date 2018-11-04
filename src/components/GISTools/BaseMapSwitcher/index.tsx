import * as React from 'react'
import { TileLayer, SpatialReference } from 'maptalks'
import './index.less'
import Config from '@config/index'
import classnames from 'classnames'

interface IProps {
  /**
   * map对象
   */
  map: any,
}

interface IState {
  hasSelectedId?: string, // 选中的底图的Id
}

export default class BaseMapSwitcher extends React.Component<IProps, IState> {
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
      SpatialReference.loadArcgis(arcUrl + '?f=pjson', (err) => {
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
                baseLayer = <div key={key} onClick={this.handleBaseMapSwitch.bind(this, item)} className={classnames('baseMapItem', { 'hasSelectedItem': item.id === this.state.hasSelectedId })} style={{ 'background': `url(${require('./img/image.jpg')}) no-repeat 0 0`, zIndex: key }}>
                  <div className='mask'>
                    <span className='label' >{item.title}</span>
                  </div>
                </div>
                break
              case 'map':
                baseLayer = <div key={key} onClick={this.handleBaseMapSwitch.bind(this, item)} className={classnames('baseMapItem', { 'hasSelectedItem': item.id === this.state.hasSelectedId })} style={{ 'background': `url(${require('./img/map.jpg')}) no-repeat 0 0`, zIndex: key }}>
                  <div className='mask'>
                    <span className='label' >{item.title}</span>
                  </div>
                </div>
                break
              default:
                baseLayer = <div key={key} onClick={this.handleBaseMapSwitch.bind(this, item)} className={classnames('baseMapItem', { 'hasSelectedItem': item.id === this.state.hasSelectedId })} style={{ 'background': `url(${require('./img/terrain.jpg')}) no-repeat 0 0`, zIndex: key }}>
                  <div className='mask'>
                    <span className='label' >{item.title}</span>
                  </div>                </div>
                break
            }
            return baseLayer
          })}
        </div>
      </div>
    )
  }
}