import React from  'react'
import   './index.less'
import MenuItem from './MenuItem'
import MoreMenuItem from './MenuItem/more'

import { Checkbox, Icon } from 'antd'

import MoreMenu from './more'
import test from './img/test.png'

// import Config from '@config/index'

interface IMenuArr {
  imgPath? : string // 图片路径
  title ? : string // 功能mingc
  key ? : string  // 唯一值，标识功能
  handler: (key, value) => void
}
interface IHistory {
  key ?: string
  value ? : string
  checked ? : boolean
}
interface IProps {
  visible ?: boolean
  moreVisible ?: boolean
  // menuArr? : IMenuArr[]
  menuArr ? : {
    default? : IMenuArr[],
    more? : IMenuArr[]
  }
  history ?: IHistory[]
  changeCheckboxState : (key , checked) => void
}
interface IState {
  visible ?: boolean
  moreVisible ?: boolean
  history ? : IHistory[]
  menuArr ? : {
    default? : IMenuArr[],
    more? : IMenuArr[]
  }
}
export default class MenuPanel extends React.Component<IProps , IState> {
  isMount ? : boolean
  time ? : any
  constructor(props : IProps  , state: IState ) {
    super(props)
    this.state = {
      visible  : this.props.visible,
      moreVisible  : this.props.moreVisible,
      menuArr : this.props.menuArr ? this.props.menuArr : {
        default : [{
          imgPath : './img/error.png',
          title : 'menuArr配置错误或未配置',
          key : 'error',
          handler: this.errorHander
        }],
        more : []
      },
      history : this.props.history !== [] ? this.props.history : [{
        key : 'error',
        value : '配置错误',
        checked : false
      }]
    }
  }
  componentWillMount () {
    this.isMount  = true
  }
  onCheckboxChange = (key, e ) => {
    const checked = e.target.checked
    this.changeCheckboxState (key, checked )
  }
  
  componentWillUnmount () {
    this.isMount  = false
  }

  componentWillReceiveProps (nextProps : IProps) {
    // if (nextProps.visible !== this.props.visible) {
      if (this.isMount) {
        this.setState ({
          visible : nextProps.visible,
          history : nextProps.history
        })
      }
    // }
  }

  changeCheckboxState = (key, checked) => {
    this.props.changeCheckboxState(key , checked)
  }
  errorHander = () => {
    console.log('error')
  }

  moreMenuHidden = () => {
    this.time = setTimeout( () => {
      this.setState ({
        moreVisible : false
      })
    } , 100)
     
  }

  moreMenuShow = () => {
    clearTimeout(this.time)
    this.setState ({
      moreVisible : true
    })
  }
  
  renderMenu = () => {
    return this.state.menuArr!.default!.map((item, key) => {
      if (item.key === 'more') {
        return (
          <MoreMenuItem className= 'menuItem_more' key ={key} imgPath={item.imgPath} title= {item.title}   moreMenuShow= {this.moreMenuShow} moreMenuHidden = {this.moreMenuHidden} onClick ={item.handler.bind(this , item.key, item.title)}/>
        )
      } else {
        return (
          <MenuItem  className= ''  key ={key} imgPath={item.imgPath} title= {item.title} onClick ={item.handler.bind(this , item.key, item.title)}/>
        )
      }
    })
  }

  renderHistory = () => {
    return this.state.history!.map((item, key) => {
      return (
        <div className='historyItemContainer' key = {key}>
          <Checkbox  checked={item.checked} key ={key} onChange= {this.onCheckboxChange.bind(this, item.key)}>{item.value}</Checkbox> 
          <img src={test} alt='test' title= 'test'/>
          <span className= 'historyItemClose'><Icon type='close' theme='outlined' /></span>
        </div>
      )
    })
  }
  

  
  render () {

    const style = { 'display': this.state.visible ? 'inline-block' : 'none' }
    const menu = this.renderMenu ()
    const history = this.renderHistory()
    return (
      <div  style ={style} className='menuPanelContent'>
      {/* menu */}
        <div className='menu'>
          {menu}
        </div>
        {/* more */}
          <div onMouseOver= {this.moreMenuShow} onMouseOut= {this.moreMenuHidden}>
             <MoreMenu visible= {this.state.moreVisible}  menuArr= {this.props.menuArr} />
          </div>
          {/* history */}
          <div className='history'>
            {history}
          </div>
      </div>
    )
  }
}

