import * as React from 'react'
import {Switch, Route } from 'react-router-dom'
import DynamicImport from '@components/DynamicImport'
import Loading from '@components/Loading'
import NoMatch from '@pages/NoMatch'
import {Login} from '@api/LogAction'

export default class Body extends React.Component {
  componentWillMount() {
    Login()
  }
  render() {
    return(
      <Switch>
        <Route exact path='/' component={Index} />
        <Route exact path='/map' component={Map} />
        <Route path='/demo' component={AppComponent} />
        <Route path='/routerTest' component={RouterTest} />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

const RouterTest = (props) => (
  <DynamicImport load={() => import('@pages/RouterTest/index')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

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
  <DynamicImport load={() => import('@pages/Demo/index')}>
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
