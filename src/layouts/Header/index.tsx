import * as React from 'react'
import './index.less'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import logo from './img/logo.png'
import Config from '@config/index'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

interface IState {
  current?: string
}
export interface IProps {
  empty?: any
  height?: string
  theme?: any
  // style?: any
}
export default class NavBar extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      current: 'home'
    }
  }
  handleClick = (e) => {
    // console.log('click ', e)
    this.setState({
      current: e.key,
    })
  }
  render() {
    const menuStyle = {
      height: this.props.height!,       // 自定义导航栏高度
      lineHeight: this.props.height!    // 确保在自定义高度下导航内容保持在导航条内部上下居中
    }
    return (
        <Menu theme={this.props.theme} style={menuStyle} onClick={this.handleClick} selectedKeys={[this.state.current!]} mode='horizontal'>
          <Menu.Item style={menuStyle} key='home1'>
            <NavLink  to='/'>
              <img className='logo' src={logo} alt={Config.projectName}/>
            </NavLink>
          </Menu.Item>
          <Menu.Item style={menuStyle} key='home'>
            <NavLink  to='/'>
              <Icon type='home' />
              主页
            </NavLink>
          </Menu.Item>
          <Menu.Item style={menuStyle} key='map'>
            <NavLink  to='/map'>
              <Icon type='environment' />
              地图
            </NavLink>
          </Menu.Item>
          <Menu.Item style={menuStyle} key='demo'>
            <NavLink  to='/demo'>
              <Icon type='appstore-o'/>
              Demo示例
            </NavLink>
          </Menu.Item>
          <Menu.Item style={menuStyle} key='11'>
            <NavLink  to='/test'>
              <Icon type='smile-o' />
              no match
            </NavLink>
          </Menu.Item>

          <Menu.Item  style={menuStyle} key='22' disabled>
            <Icon type='appstore' />Navigation Two
          </Menu.Item>

          <SubMenu style={menuStyle} title={<span><Icon type='setting' />Navigation Three - Submenu</span>}>
            <Menu.Item  key='33'>Option 1</Menu.Item>
            <Menu.Item  key='44'>Option 2</Menu.Item>
            <Menu.Item  key='55'>Option 3</Menu.Item>
            <Menu.Item  key='66'>Option 4</Menu.Item>
          </SubMenu>
          <SubMenu style={menuStyle} title={<span><Icon type='setting' />Navigation Three - Submenu</span>}>
            <MenuItemGroup  title='Item 1'>
              <Menu.Item  key='77'>Option 1</Menu.Item>
              <Menu.Item  key='88'>Option 2</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup  title='Item 2'>
              <Menu.Item  key='99'>Option 3</Menu.Item>
              <Menu.Item  key='10'>Option 4</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
    )
  }
}