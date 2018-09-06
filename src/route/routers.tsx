import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import DynamicImport from '@components/DynamicImport'
import Loading from '@components/Loading'
import NoMatch from '@pages/NoMatch'


// import LoadableDashboard from './container/test'

const Index = () => (
  <Router basename='/'>
    <div style={{ height: '100%' }}>
    <NavBar theme='light' height= '60px'/>
      <Switch>
        <Route exact path='/' component={IllegalElectromechanicalWellComp} />
        {/* <Route render={()=>{}}>ttt</Route> */}
        <Route path='/demo' component={AppComponent} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
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
const IllegalElectromechanicalWellComp = (props) => (
  <DynamicImport load={() => import('@pages/IllegalElectromechanicalWell')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)
const NavBar = (props) => (
  <DynamicImport load={() => import('@layouts/NavBar/index')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)


export default Index