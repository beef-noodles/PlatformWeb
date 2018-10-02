import React from 'react'
import { Icon } from 'antd'
import './index.less'

import { GetStation } from '@api/Map'

// import ListItem from './ListItem/index.tsx'
interface IState {
  visible?: boolean
  listKey?: string
  data?: any
}
interface IParam {
  param: string
}

interface IProps {
  visible?: boolean // 控制组件的显隐
  listKey?: string
  coreOpenAndDetailClose: () => void
}
export default class Detail extends React.Component<IProps, IState> {
  isMount: boolean
  listKey = this.props.listKey
  resultDom: any
  data : any
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      // visible: this.props.visible,
      visible: this.props.visible,
      data : ''
    }
  }
  componentWillMount() {
    this.isMount = true
  }
  componentDidMount() {
    this.testGetDetailByKey()
  }
  componentWillUnmount() {
    this.isMount = false
    this.data = ''
  }
  testGetDetailByKey = () => {
    const key = this.props.listKey
    if (key && key !== '') {
      const params: IParam = {
        param: key
      }
      GetStation(`api/station`, params).then(dataPara => {
        this.data = dataPara
        this.setState({
          data: dataPara
        })
      }, err => {
        console.error(err)
      })
    } else {
      // console.error('该条记录key值不存在')
    }
  }

  componentWillReceiveProps(nextProps: IProps) { 
    // if (nextProps.visible !== this.props.visible && nextProps.listKey !== this.props.listKey) {
    if (this.isMount) {
      this.setState({
        visible: nextProps.visible,
        // listKey : nextProps.listKey
      })
    }
    // }
  }



  coreOpenAndDetailClose = () => {
    this.props.coreOpenAndDetailClose()
  }
  // stcd: 测站编码
  // stnm: 测站名称
  // rvnm: 河流名称
  // hnnm: 水系名称
  // bsnm: 流域名称
  // addvnm: 行政区划名称
  // admauth: 信息管理单位
  // esstym: 建站年月
  renderData = () => {
    const data = this.data
    // console.log(data)
    if (data) {
      this.resultDom = (
        <div>
          测站编码 :{this.data[0].stcd} 
          <br/>
          测站名称 :{this.data[0].stnm} 
          <br/>
          河流名称 :{this.data[0].rvnm} 
          <br/>
          水系名称 :{this.data[0].hnnm} 
          <br/>
          流域名称 :{this.data[0].bsnm} 
          <br/>
          行政区划名称 :{this.data[0].addvnm} 
          <br/>
          信息管理单位 :{this.data[0].admauth} 
          <br/>
          建站年月 :{this.data[0].esstym} 
          <br/>
        </div>
      )
    }
    
    return this.resultDom
  }


  render() {
    const style = { 'display': this.state.visible ? 'block' : 'none' }
    // const dataReault = this.renderData()
    return (
      <div className='detail' style={style}>
        <div className='detailHeader'>
          详情<span onClick={this.coreOpenAndDetailClose}><Icon type='close' theme='outlined' /></span>
        </div>
        <div className='content'>
          {this.renderData()}
        </div>
      </div>
    )
  }
}

