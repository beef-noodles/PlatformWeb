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
  key ?: string
  value ? : string
  checked ? : boolean
}
interface IState {
  inputValue?: string, // 输入信息
  menuDrawerVisible?: boolean, // 抽屉式菜单是否展示
  menuPanelVisible?: boolean, // 菜单面板是否显示
  menuItemPanelVisible ? : boolean //  功能展示面板是否显示
  moreVisible ? : boolean // 更多的显示与隐藏
  currentMenuItem ? : string // 功能展示面板中当前展示的功能项
  menuArr? : {} // 展示的功能按钮数组，氛围默认显示和鼠标悬浮在更多按钮上显示的内容
  history? : IHistory[]
}
interface IProps {
  map? : any // map 对象
}

export default class StationManager extends React.Component<IProps, IState> {
  searchInput: any
  map = this.props.map
  isMount : boolean
  myHistory ?: IHistory[]
  constructor(props: IProps) {
    super(props)
    this.state = {
      
      inputValue: '',
      menuDrawerVisible: false,
      menuPanelVisible: false,
      menuItemPanelVisible : false ,
      currentMenuItem : '', // 默认为空，没有展示的，相应menuItemPanelVisible应该为false
      moreVisible : false,
      history : [ ], // 默认历史记录为空
      menuArr : {
        default : [
          {
              imgPath : water,
              title : '水情',
              key : 'water' ,
              handler : this.waterHandler
          },
  
          {
            imgPath : rain,
            title : '雨情',
            key : 'rain' ,
            handler : this.rainHandler
          },
  
          {
            imgPath : warning,
            title : '预警',
            key : 'warning' ,
            handler : this.warningHandler
          },
          {
            imgPath : test1,
            title : '测试1',
            key : '1' ,
            handler : this.testHandler
        },
        {
          imgPath : test3,
          title : '测试2',
          key : '2' ,
          handler : this.testHandler
        },
        {
            imgPath : more,
            title : '更多',
            key : 'more' ,
            handler : this.moreHandler
          }
        ],
        more :  [
          {
              imgPath : test1,
              title : '测试1',
              key : '1' ,
              handler : this.testHandler
          },
          {
            imgPath : test3,
            title : '测试2',
            key : '2' ,
            handler : this.testHandler
          }, 
          {
            imgPath : test4,
            title : '测试3',
            key : '3' ,
            handler : this.testHandler
          },
          {
            imgPath : test5,
            title : '测试4',
            key : '4' ,
            handler : this.testHandler
          },
          {
            imgPath : test6,
            title : '测试5',
            key : '5' ,
            handler : this.testHandler
        },
        {
          imgPath : test7,
          title : '测试6',
          key : '6' ,
          handler : this.testHandler
        }, 
        {
          imgPath : test8,
          title : '测试8',
          key : '8' ,
          handler : this.testHandler
        },
        {
          imgPath : test9,
          title : '测试9',
          key : '9' ,
          handler : this.testHandler
        },
        {
          imgPath : test10,
          title : '测试10',
          key : '10' ,
          handler : this.testHandler
        }
        ]
      }
    }
  }

  componentDidMount () {
    this.isMount = true
    this.map.on ('click', () => {
      if (this.state.menuPanelVisible === true && this.isMount === true) {
        this.setState({
          menuPanelVisible: false
        }, () =>  {
          this.searchInput.blur()
        })
      }
    })
  }

 componentWillUnmount() {
  this.isMount = false
 }
  emitEmpty = () => {
    this.searchInput.focus()
    this.setState({ inputValue: '' })
  }

  onChangeUserName = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  /**
   * 判断历史纪录数组中是否已存在指定key值的对象
   * 如果不存在就添加，如果存在就不做操作
   */
  itemInArray = (keyPara , array) => {
    let flag = false
    const length = array.length
    console.log(length)
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
    return flag
  }

  /**
   * 向历史记录中添加元素
   */
  addHistory = (keyPara : string , valuePara : string) => {
    if (keyPara !== 'more') { // 防止点击更多按钮时出现对应的历史记录
      this.myHistory = this.state.history
      const historyItem = {
        key : keyPara,
        value : valuePara,
        checked : true
      }
      const flag = this.itemInArray(keyPara , this.myHistory)
      if (flag === false) {
        this.myHistory!.push(historyItem)
        this.setState({
          history : this.myHistory
        }, () => {
          this.myHistory = this.state.history // 防止setState异步导致的this.myHistory值与this.state.history 取值不一致的问题
        })
      }
    }
  }
  /**
   * 修改指定key值的历史记录状态
   */
  changeCheckboxState = (keyPara, checked) => {
    console.log(keyPara)
    console.log(checked)
    for (const value of this.myHistory!) {
      if (value.key === keyPara) {
        value.checked = checked
        break
      }
    }
    this.setState ({
      history : this.myHistory
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

/**
 * 显示MenuPanel,关闭MenuItemPanel
 *
 * @memberof StationManager
 */
menuPanelShowAndMenuItemPanelHidden = () => {
    if (this.state.menuItemPanelVisible === true || this.state.menuPanelVisible === false) {
      this.setState({
        menuItemPanelVisible : false,
        menuPanelVisible : true
      })
    }
  }

/**
 *
 * 关闭MenuPanel,显示MenuItemPanel
 * @memberof StationManager
 */
menuPanelHiddenAndMenuItemPanelShow = () => {
  if (this.state.menuItemPanelVisible === false) {
    this.setState({
      menuItemPanelVisible : true,
      menuPanelVisible : false
  })
}
}

/**
 * 当MenuPanel中checkbox状态修改时
 */
// onCheckboxChange = (key) => {
//  console.log(key)
// }
  
  /**
   * getCurrentMenuItem会返回当前MenuPanelContainer面板上被点击功能的唯一标识 value
   * 这里还做了menuPanelHiddenAndMenuItemPanelShow（）方法调用是为了MenuItemPanelContainer显示
   */
  getCurrentMenuItem =  (value) => {
    if (this.isMount === true) {
      this.setState({
        currentMenuItem: value
      })
      this.menuPanelHiddenAndMenuItemPanelShow() // 隐藏MenuPanel,显示MenuItemPanel
    }
  }

  /**
   * 
   */
  renderMenuPanelContainer  = () => {
    return (
      <MenuPanelContainer visible={this.state.menuPanelVisible} moreVisible={this.state.moreVisible} menuArr ={this.state.menuArr}
      
      history = {this.state.history} changeCheckboxState= {this.changeCheckboxState}/>
    )
  }

  /**
   *
   *
   * @memberof StationManager
   */
  renderMenuItemPanelContainer  = () => {
    return (
      <MenuItemPanelContainer menuItemPanelClose = {this.menuPanelShowAndMenuItemPanelHidden} currentMenuItem= {this.state.currentMenuItem} visible={this.state.menuItemPanelVisible} />
    )
  }
  
  /**
   * 渲染抽屉类导航栏
   *
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

  setCurrentMenuItem = (value) => {
    if (this.isMount) {
      this.setState({
        currentMenuItem : value
      })
    }
  }

  // 
  waterHandler =  (key, value)  => {
    console.log(key)
    console.log(value)
    this.setCurrentMenuItem(key) // 设置当前需要展示在MenuItemPanelContainer中的功能项为雨情
    this.menuPanelHiddenAndMenuItemPanelShow() // 显示MenuItemPanelContainer 隐藏MenuPanelContainer
    this.addHistory(key, value)
  }
  warningHandler = (key, value) => {
    console.log(value)
    this.addHistory(key, value)
  }
  rainHandler = (key, value) => {
    console.log(value)
    this.addHistory(key, value)
    // this.props.getCurrentMenuItem(value)
  }
  testHandler = (key, value) => {
    console.log(value)
    this.addHistory(key, value)
    // this.props.getCurrentMenuItem(value)
  }
  moreHandler = (key, value) => {
    console.log(value)
    this.addHistory(key, value)

    this.setState({
      
    })
  }

  render() {
    const searchStyle = classnames('inputSearch', { 'ableToSearch': (this.state.inputValue!.length > 0) })
    const menuDrawer = this.renderMenuDrawer()
    const menuPanel = this.renderMenuPanelContainer ()
    const menuItemPanel = this.renderMenuItemPanelContainer()
    return (
      // <div className='stationManager'>
      <DraggableContainer className='stationManager'>
        <Tooltip title='菜单'><MdList className='menuDrawerIcon' onClick={this.controlMenu.bind(this)} /></Tooltip>
        <Input disableUnderline placeholder='请输入查询条件...' inputRef={ref => { this.searchInput = ref }} className='stationInput' onFocus={this.menuPanelShowAndMenuItemPanelHidden} onChange={this.handleInputChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} />
        <Tooltip title='搜索' placement={'right'} arrowPointAtCenter><MdSearch className={searchStyle} /></Tooltip>
        {menuDrawer}
        {menuPanel}
        {menuItemPanel}
       {/* </div> */}
      </DraggableContainer>
    )
  }
}