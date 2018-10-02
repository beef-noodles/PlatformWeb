
const Config = {
  projectName: 'Platform',
  baseMapLayers: {
    title: '底图切换',
    baseLayers: [
      {
        id: 'image',
        type: 'esri',
        title: '影像图',
        image: './img/image.png',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
      },
      {
        id: 'map',
        type: 'esri',
        title: '电子地图',
        image: './img/map.png',
        url: 'http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
      },
      
      {
        id: 'terrain',
        type: 'esri',
        title: '地形图',
        image: './img/terrain.png',
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer'
      }
    ]
  },
  animateTime : 300,  //  rc-animate动画时间（ms ）
  LayerManager: {
    layerArray:  [
      {
        title: '切片服务',
        pkey: '-1',
        key: '2',
        checked: false,
        isBaseMap: false,
        serverType: 'tile',
        mapServerURL: '',
        subLayerid: '',
        subgeotype: '',
      },
      {
        title: '测试图层1-假如图层名称很长....',
        pkey: '2',
        key: 'test1',
        checked: false,
        isBaseMap: false,
        serverType: 'tile',
        mapServerURL: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunityENG/MapServer',
        subLayerid: '',
        subgeotype: '',
      },
      {
        title: '测试图层2',
        pkey: '2',
        key: 'test2-EN世界地图',
        checked: false,
        isBaseMap: false,
        serverType: 'tile',
        mapServerURL: 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer',
        subLayerid: '',
        subgeotype: '',
      },
      {
        title: '测试图层3',
        pkey: '2',
        key: 'test3',
        checked: false,
        isBaseMap: false,
        serverType: 'tile',
        mapServerURL: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
        subLayerid: '',
        subgeotype: '',
      },


      {
        title: 'UI测试不要点',
        pkey: '-1',
        key: '22',
        checked: false,
        isBaseMap: false,
        serverType: 'tile',
        mapServerURL: '',
        subLayerid: '',
        subgeotype: '',
      },
      {
        title: '测试图层1-假如图层名称很长....',
        pkey: '22',
        key: 'test122',
        checked: false,
        isBaseMap: false,
        serverType: 'tile',
        mapServerURL: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunityENG/MapServer',
        subLayerid: '',
        subgeotype: '',
      },
      {
        title: '测试图层22',
        pkey: '22',
        key: 'test22-EN世界地图',
        checked: false,
        isBaseMap: false,
        serverType: 'tile',
        mapServerURL: 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer',
        subLayerid: '',
        subgeotype: '',
      },
      {
        title: '测试图层32',
        pkey: '22',
        key: 'test32',
        checked: false,
        isBaseMap: false,
        serverType: 'tile',
        mapServerURL: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
        subLayerid: '',
        subgeotype: '',
      }
    ]
  },
}


if (typeof (ConfigExt) !== 'undefined') {
  Object.assign(Config, ConfigExt)
}

export default Config