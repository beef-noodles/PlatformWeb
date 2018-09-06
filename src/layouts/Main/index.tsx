import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import DynamicImport from '@components/DynamicImport'
import Loading from '@components/Loading'
import NoMatch from '@pages/NoMatch'


// import LoadableDashboard from './container/test'

const Main = () => (
  <Switch>
    <Route exact path='/' component={Index} />
    <Route path='/demo' component={AppComponent} />
    <Route component={NoMatch} />
  </Switch>
)

const Index = (props) => (<DynamicImport load={() => import('@pages/Index/index')}>
  {(Component: any) => Component === null
    ? <Loading />
    : <Component {...props} />}
</DynamicImport>)
// 路由： App
const AppComponent = (props) => (
  <DynamicImport load={() => import('@pages/Test/index')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

export default Main