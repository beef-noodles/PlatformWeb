

// import * as React from 'react'
// import { storiesOf } from '@storybook/react'
// import { withInfo } from '@storybook/addon-info'
// import UserMenu from './UserMenu/index'
// import MapDirectTool from './MapDirectTool/index'
// import { Map, TileLayer } from 'maptalks'
// import LayerManage from '@components/GISTools/LayerManage'
// import BaseMapSwitcher from '@components/GISTools/BaseMapSwitcher'

// const tempMap = new Map(document.createElement('div'), {
//   center: [-0.113049, 51.498568],
//   zoom: 14,
//   baseLayer: new TileLayer('base', {
//     urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
//     subdomains: ['a', 'b', 'c', 'd'],
//     attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
//   })
// })
// storiesOf('GISTools', module)

//   .add('userMenu', withInfo('描述信息')(() => (
//     <UserMenu />
//   )))
//   .add('MapDirectTool', withInfo('指北针')(() => {
//     return <MapDirectTool map={tempMap} />
//   }))
//   .add('LayerManage', withInfo('import LayerManage from "@components/GISTools/LayerManage"')(() => {
//     return <LayerManage  map={tempMap} />
//   }))
//   .add('BaseMapSwitcher', withInfo('底图切换工具:import BaseMapSwitcher from "@components/GISTools/BaseMapSwitcher"')(() => {
//     return <BaseMapSwitcher map = {tempMap}/>
//   }))
  
