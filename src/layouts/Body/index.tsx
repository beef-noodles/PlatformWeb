import * as React from 'react'
import {Switch, Route } from 'react-router-dom'
import DynamicImport from '@components/DynamicImport'
import Loading from '@components/Loading'
import NoMatch from '@pages/NoMatch'

export default class Body extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={Index} />
        <Route exact path='/map' component={Map} />
        <Route path='/demo' component={AppComponent} />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

// 路由： App
const Index = (props) => (
  <DynamicImport load={() => import('@pages/Index/index')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)
// 路由： App
const AppComponent = (props) => (
  <DynamicImport load={() => import('@pages/Test/index')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)
// 路由： 非法机电井
const Map = (props) => (
  <DynamicImport load={() => import('@pages/Map')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)
