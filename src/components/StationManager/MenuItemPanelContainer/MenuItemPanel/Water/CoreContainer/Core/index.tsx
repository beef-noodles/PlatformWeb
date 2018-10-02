import React from 'react'
import { List, Avatar, Icon } from 'antd'
import './index.less'

import {Coordinate } from 'maptalks'



interface IState {
  visible?: boolean
  data ? : any
}
interface IProps {
  visible?: boolean // 控制组件的显隐
  coreCloseAndDetailOpen: (value) => void
  menuItemPanelClose: () => void
  map?: any // map 对象
  data ?: any
}
export default class Core extends React.Component<IProps, IState> {
  isMount?: boolean
  map = this.props.map
  data = this.props.data
  constructor(props: IProps) {
    super(props)
    this.state = {
      visible: this.props.visible ,
      data : this.props.data
    } 
  }


  componentDidMount () {
    this.isMount = true
    this.setScrollTop ('list')
  }
  componentWillUnmount() {
    this.isMount = false
    sessionStorage.setItem('y', JSON.stringify(document.getElementById('list')!.scrollTop)) 
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.visible !== this.props.visible) {
      if (this.isMount) {
        this.setState({
          visible: nextProps.visible
        })
      }
    }
    if (nextProps.data !== this.props.data) {
      if (this.isMount) {
        this.setState({
          data: nextProps.data
        })
      }
    }
  }

  /**
   * 设置指定id dom元素的scrollTop值
   */
  setScrollTop = (domId) => {
    const y = JSON.parse(sessionStorage.getItem('y')!)
    if (y) {
      document.getElementById('list')!.scrollTop = y
    }
  }

  /**
   * 关闭详情打开结果列表
   */
  coreCloseAndDetailOpen = (value) => {
    this.props.coreCloseAndDetailOpen(value)
  }
  /**
   * 面板关闭
   */
  menuItemPanelClose = () => {
    this.props.menuItemPanelClose()
  }

  listOnClick = (key, longitude , latitude ) => {
    this.coreCloseAndDetailOpen(key)
    this.centerTOPoint( longitude , latitude )
  }

  /**
   * 定位
   */
  centerTOPoint = ( longitude , latitude ) => {
    const coord = new Coordinate(longitude , latitude)
    if (this.map.getZoom() >= 15) {
      this.map.panTo(coord, {
        animation : true,
        duration : 1000 // 默认值为600
      })
    } else {
      this.map.setCenter(coord)
      this.map.setZoom(15)
    }
  }

  render() {
    const style = { 'display': this.state.visible ? 'inline-block' : 'none' }
    return (
      <div className='core' style={style}>
        <div className='coreHeader'>
          水情
        <span onClick={this.menuItemPanelClose}><Icon type='close' theme='outlined' /></span>
        </div>
        <div className='coreContent'>
          core
       </div>
        <hr />
        <div className='list' id ='list'>
          <List
            itemLayout='horizontal'
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={require('./img/point.png')} />}
                  title={<a onClick={this.listOnClick.bind(this, item.stcd , item.lgtd, item.lttd)}>{item.stnm}</a>}
                  description={item.tm}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}

