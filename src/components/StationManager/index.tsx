import * as React from 'react'
import { Icon, Drawer, Menu, Tooltip } from 'antd'
import { NavLink } from 'react-router-dom'
import './index.less'
import Input from '@material-ui/core/Input'
import { MdList, MdSearch } from 'react-icons/md'
import classnames from 'classnames'
import MenuPanelContainer from './MenuPanelContainer/index'
import MenuItemPanelContainer from './MenuItemPanelContainer/index'
import DraggableContainer from '../DraggableContainer'
import {VectorLayer, ui} from 'maptalks'

const InfoWindow = ui.InfoWindow


import water from './img/water.png'
import rain from './img/rain.png'
import warning from './img/waring.png'
import more from './img/more.png'

import test1 from './img/01.png'
import test3 from './img/03.png'
import test4 from './img/04.png'
import test5 from './img/05.png'
import test6 from './img/06.png'
import test7 from './img/07.png'
import test8 from './img/08.png'
import test9 from './img/09.png'
import test10 from './img/10.png'



const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

// interface IMenuArr {
//   imgPath? : string // 图片路径
//   title ? : string // 功能mingc
//   key ? : string  // 唯一值，标识功能
//   handler: (value) => void
// }
interface IHistory {
  key?: string
  value?: string
  checked?: boolean
}
interface IState {
  inputValue?: string, // 输入信息
  menuDrawerVisible?: boolean, // 抽屉式菜单是否展示
  menuPanelVisible?: boolean, // 菜单面板是否显示
  menuItemPanelVisible?: boolean //  功能展示面板是否显示 
  currentPanel: 'MenuItemPanelContainer' | 'MenuPanelContainer' // 当前被加载的组件
  moreVisible?: boolean // 更多的显示与隐藏
  menuArr?: {} // 展示的功能按钮数组，氛围默认显示和鼠标悬浮在更多按钮上显示的内容
  history? : IHistory[]
  data?: any
}
interface IProps {
  map?: any // map 对象
}

export default class StationManager extends React.Component<IProps, IState> {
  searchInput: any
  map = this.props.map
  isMount: boolean
  history: IHistory[] = []
  currentMenuItem = ''
  menuItemPanelVisible = false
  constructor(props: IProps) {
    super(props)
    this.state = {
      inputValue: '',
      menuDrawerVisible: false,
      currentPanel: 'MenuPanelContainer',
      menuPanelVisible: false,
      menuItemPanelVisible: false,
      moreVisible: false,
      menuArr: {
        default: [
          {
            imgPath: water,
            title: '水情',
            key: 'water',
            handler: this.waterHandler
          },

          {
            imgPath: rain,
            title: '雨情',
            key: 'rain',
            handler: this.rainHandler
          },

          {
            imgPath: warning,
            title: '预警',
            key: 'warning',
            handler: this.warningHandler
          },
          {
            imgPath: test1,
            title: '测试1',
            key: '1',
            handler: this.testHandler
          },
          {
            imgPath: test3,
            title: '测试2',
            key: '2',
            handler: this.testHandler
          },
          {
            imgPath: more,
            title: '更多',
            key: 'more',
            handler: this.moreHandler
          }
        ],
        more: [
          {
            imgPath: test1,
            title: '测试1',
            key: '1',
            handler: this.testHandler
          },
          {
            imgPath: test3,
            title: '测试2',
            key: '2',
            handler: this.testHandler
          },
          {
            imgPath: test4,
            title: '测试3',
            key: '3',
            handler: this.testHandler
          },
          {
            imgPath: test5,
            title: '测试4',
            key: '4',
            handler: this.testHandler
          },
          {
            imgPath: test6,
            title: '测试5',
            key: '5',
            handler: this.testHandler
          },
          {
            imgPath: test7,
            title: '测试6',
            key: '6',
            handler: this.testHandler
          },
          {
            imgPath: test8,
            title: '测试8',
            key: '8',
            handler: this.testHandler
          },
          {
            imgPath: test9,
            title: '测试9',
            key: '9',
            handler: this.testHandler
          },
          {
            imgPath: test10,
            title: '测试10',
            key: '10',
            handler: this.testHandler
          }
        ]
      }
    }
  }

  componentDidMount() {
    this.isMount = true
    this.map.on('click', (evt) => {
      if (this.state.menuPanelVisible === true && this.isMount === true) {
        this.setState({
          menuPanelVisible: false
        }, () => {
          this.searchInput.blur()
        })
      }
      // 地图identify marker
      this.map.identify({
        'coordinate' : evt.coordinate,
        'layers' : this.map.getLayers((layer) => {
          return (layer instanceof VectorLayer)
        })
      }, (geos) => {
        if (geos.length === 0) {
          return
        } else {
          geos.forEach( (g) => {
            // console.log(g)
            g.updateSymbol({
              'markerFill' : '#f00'
            })
            // const options = {
            //   'title'     : `水情站:`,
            //   'content'   : `上报时间: `,
            //   'autoOpenOn' : 'click',
            //   'autoCloseOn' : 'click'
            // }
            const infoWindow = new InfoWindow(g._infoWinOptions)
            infoWindow.on('hide', () => {
              infoWindow.remove()
            })
            infoWindow.addTo(this.map).show()
          })
        }
      })
    })
  }

  componentWillUnmount() {
    this.isMount = false
  }

  /**
   * 搜索框的处理
   */
  emitEmpty = () => {
    this.searchInput.focus()
    this.setState({ inputValue: '' })
  }

  onChangeUserName = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }


  controlMenu = () => {
    this.setState({
      menuDrawerVisible: !this.state.menuDrawerVisible
    })
  }

  onClose = () => {
    this.setState({
      menuDrawerVisible: !this.state.menuDrawerVisible
    })
  }

  handleMenuClick = (e) => {
    console.log('click ', e)
  }

  handleInputChange = () => {
    const value = this.searchInput.value
    this.setState({
      inputValue: value
    })
  }

  handleKeyPress = (evt) => {
    const keyCode = evt.which || evt.charCode
    if (keyCode === 13) {
      console.log('我去后台找东西了')
    }
  }


  
    // ==================================历史记录相关方法===============================================

  /**
   * 判断对象数组array中是否已存在key值为keyPara的对象
   * 存在返回true，不存在返回false
   */
  itemInArray = (keyPara, array) => {
    let flag = false
    if (array) {
      const length = array.length
      if (length < 1) {
        flag = false
      } else if (length >= 1) {
        for (const value of array) {
          if (value.key === keyPara) {
            flag = true
            break
          } else {
            flag = false
          }
        }
      }
    }
    return flag
  }

  /**
   * 更新状态值history,控制历史记录显示
   */
  updateHistoryState = (historyPara) => {
    if (this.isMount) {
      this.setState({
        history : historyPara
      })
    }
  }
  /**
   * 向历史记录中添加元素
   */
  addHistory = (keyPara: string, valuePara: string) => {
    if (keyPara !== 'more') { // 防止点击更多按钮时出现对应的历史记录
      const historyItem = {
        key: keyPara,
        value: valuePara,
        checked: true
      }
      const flag = this.itemInArray(keyPara, this.history)
      if (flag === false) {
        this.history!.unshift(historyItem)
      }
    }
    this.updateHistoryState (this.history)
  }
  /**
   * 修改指定历史记录状态
   * flag = 'toggle' // 切换指定key值checkbox的勾选状态
   * flag = 'delete' // 删除指定key值的历史记录
   */
  changeHistoryState = (flag, keyPara, checked) => {
    if (flag === 'toggle') {
      this.changeCheckbocCheckedState(keyPara, checked)
    } else if (flag === 'delete') {
      this.deleteHistoryItem(keyPara)
    }
  }

  /**
   * 指定key值的历史记录checkbox是否勾选
   *
   * @memberof StationManager
   */
  changeCheckbocCheckedState = (keyPara, checked) => {
    for (const value of this.history!) {
      if (value.key === keyPara) {
        value.checked = checked
        break
      }
    }
    this.updateHistoryState (this.history) // 修改state history
  }
  /**
   * 删除对象数组中指定key值的对象
   */
  delectObjectFromObjectArrayByObjectKey = (key, objectArray) => {
    for (const value of objectArray!) {
      if (value.key === key) {
        const index = objectArray!.indexOf(value)
        objectArray!.splice(index, 1)
        break
      }
    }
  }
  /**
   * 删除history中指定元素并更新state history
   *
   * @memberof StationManager
   */
  deleteHistoryItem = (keyPara) => {
    this.delectObjectFromObjectArrayByObjectKey(keyPara, this.history)
    this.updateHistoryState (this.history)
  }


  // ==================================历史记录相关方法===============================================





  // ==================================组件渲染相关方法===============================================
  /**
   * 加载组件MenuPanel,并设置其可见性为true 
   * 
   * 考虑，卸载时是否需要将显示状态设为false
   *
   * @memberof StationManager
   */
  menuPanelLoadedAndShow = () => {
    this.setState({
      currentPanel: 'MenuPanelContainer',
      menuPanelVisible: true
    })
  }
  /**
   * 渲染 MenuPanelContainer 组件
   */
  renderMenuPanelContainer = () => {
    return (
      <MenuPanelContainer 
      map = {this.map}
      visible={this.state.menuPanelVisible} 
      moreVisible={this.state.moreVisible} 
      menuArr={this.state.menuArr}
      history={this.state.history} 
      changeHistoryState={this.changeHistoryState} />
    )
  }
  /**
   * 渲染 MenuItemPanelContainer 组件
   */
  renderMenuItemPanelContainer = () => {
    return (
      <MenuItemPanelContainer
      map = {this.map} 
      menuItemPanelClose={this.menuPanelLoadedAndShow} 
      currentMenuItem={this.currentMenuItem} 
      visible={this.state.menuItemPanelVisible} />
    )
  }

  /**
   * 渲染抽屉类导航栏
   * @memberof StationManager
   */
  renderMenuDrawer = () => {
    return (
      <Drawer
        title='导航栏'
        placement='left'
        width={350}
        closable={false}
        onClose={this.onClose.bind(this)}
        visible={this.state.menuDrawerVisible}
      >
        <Menu
          onClick={this.handleMenuClick}
          style={{ width: 326 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
        >
          <Menu.Item key='1'>
            {/* <Icon type='pie-chart' /> */}
            <NavLink to='/'>
              <Icon type='home' />
              主页
            </NavLink>
          </Menu.Item>
          <Menu.Item key='2'>
            <NavLink to='/demo'>
              <Icon type='pie-chart' />
              Demo示例
            </NavLink>
          </Menu.Item>
          <SubMenu key='sub1' title={<span><Icon type='mail' /><span>Navigation One</span></span>}>
            <MenuItemGroup key='g1' title='Item 1'>
              <Menu.Item key='1'>Option 1</Menu.Item>
              <Menu.Item key='2'>Option 2</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup key='g2' title='Item 2'>
              <Menu.Item key='3'>Option 3</Menu.Item>
              <Menu.Item key='4'>Option 4</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu key='sub2' title={<span><Icon type='appstore' /><span>Navigation Two</span></span>}>
            <Menu.Item key='5'>Option 5</Menu.Item>
            <Menu.Item key='6'>Option 6</Menu.Item>
            <SubMenu key='sub3' title='Submenu'>
              <Menu.Item key='7'>Option 7</Menu.Item>
              <Menu.Item key='8'>Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key='sub4' title={<span><Icon type='setting' /><span>Navigation Three</span></span>}>
            <Menu.Item key='9'>Option 9</Menu.Item>
            <Menu.Item key='10'>Option 10</Menu.Item>
            <Menu.Item key='11'>Option 11</Menu.Item>
            <Menu.Item key='12'>Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </Drawer>
    )
  }
   // ==================================组件渲染相关方法===============================================



   // ==================================功能项被点击相关处理方法===============================================
   
   /**
    * 被点击 menuItem 的key值
    */
   menuItemClick = (key) => {
    this.currentMenuItem = key
    this.setState({
      currentPanel: 'MenuItemPanelContainer',
      menuItemPanelVisible: true
    })
   }

   /**
    * 水情
    */
   waterHandler = (key, value) => {
    this.addHistory(key, value)
    this.menuItemClick(key)
  }
  /**
   * 雨情
   */
  rainHandler = (key, value) => {
    this.addHistory(key, value)
    this.menuItemClick(key)
  }
  /**
   * 预警
   */
  warningHandler = (key, value) => {
    this.addHistory(key, value)
    this.menuItemClick(key)
  }
  /**
   * 更多
   * 该方法没有实际用处但不可删除
   */
  moreHandler = (key, value) => {
    console.log('more')
  }
  /**
   * 测试
   */
  testHandler = (key, value) => {
    this.addHistory(key, value)
    this.menuItemClick(key)
  }
 
   // ==================================功能项被点击相关处理方法===============================================
  
  
   render() {
    const currentPanel = this.state.currentPanel === 'MenuPanelContainer' ? this.renderMenuPanelContainer() : this.renderMenuItemPanelContainer()
    const searchStyle = classnames('inputSearch', { 'ableToSearch': (this.state.inputValue!.length > 0) })
    const menuDrawer = this.renderMenuDrawer()
    return (
      <DraggableContainer className='stationManager'>
        <Tooltip title='菜单'><MdList className='menuDrawerIcon' onClick={this.controlMenu.bind(this)} /></Tooltip>
        <Input disableUnderline placeholder='请输入查询条件...' inputRef={ref => { this.searchInput = ref }} className='stationInput' onFocus={this.menuPanelLoadedAndShow} onChange={this.handleInputChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} />
        <Tooltip title='搜索' placement={'right'} arrowPointAtCenter><MdSearch className={searchStyle} /></Tooltip>
        {menuDrawer}
        {currentPanel}
      </DraggableContainer>
    )
  }
}