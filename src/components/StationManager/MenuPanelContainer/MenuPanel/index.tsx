import React from  'react'
import   './index.less'
import MenuItem from './MenuItem'
import MoreMenuItem from './MenuItem/more'

import { Checkbox, Icon } from 'antd'

import MoreMenu from './more'
import test from './img/test.png'

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
  map? : any // map 对象
  visible ?: boolean
  moreVisible ?: boolean
  // menuArr? : IMenuArr[]
  menuArr ? : {
    default? : IMenuArr[],
    more? : IMenuArr[]
  }
  history ?: IHistory[]
  changeHistoryState : (flag , key , checked) => void
}
interface IState {
  visible ?: boolean
  moreVisible ?: boolean
  menuArr ? : {
    default? : IMenuArr[],
    more? : IMenuArr[]
  }
}
export default class MenuPanel extends React.Component<IProps , IState> {
  isMount ? : boolean
  time ? : any
  map = this.props.map
  history = this.props.history ? this.props.history : []
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
      }
    }
  }
  componentWillMount () {
    this.isMount  = true
  }
  
  componentWillUnmount () {
    this.isMount  = false
  }

  componentWillReceiveProps (nextProps : IProps) {
    if (this.isMount) {
      this.setState ({
        visible : nextProps.visible,
      })
    }
  }

  /**
   * 
   */
  onCheckboxChange = (flag , key, e ) => {
    const checked = e.target.checked
    if (flag === 'toggle') {
      this.toggleReaultLayer( key, checked)
    } else if (flag === 'delete') {
      this.deleteLayer (key) 
    }
    this.changeHistoryState (flag , key, checked )
  }
  /**
   * 修改历史纪录
   */
  changeHistoryState = (flag , key, checked) => {
    this.props.changeHistoryState( flag , key , checked)
    // 这里约定对应功能结果图层的id为对应功能按钮的key值，在这里通过key值就可以操作对应的结果图层显示隐藏，同理也可以做结果图层的移除 
  }
  
  /**
   *
   * 切换指定图层的显示隐藏
   * @memberof MenuPanel
   */
  toggleReaultLayer = (key , checked) => {
    const layer = this.map.getLayer(key)

    if (layer) {
      if (checked === false) {
        layer.hide()
        // console.log('隐藏id=' + key + '的图层')
      } else {
        layer.show()
        // console.log('显示id=' + key + '的图层')
      }
    } else {
      console.error('操作的图层不存在')
    }
    
  }
  /**
   * 移除指定id的图层
   *
   * @param {*} key
   * @memberof MenuPanel
   */
  deleteLayer (key) {
    // console.log('移除id=' + key + '的图层')
    const layer = this.map.getLayer(key)
    if (layer) {
      // this.map.remove(layer)
      layer.clear()
    } else {
      console.error('操作的图层不存在')
    }
  }
  

  /**
   * 更多功能隐藏
   *
   * @memberof MenuPanel
   */
  moreMenuHidden = () => {
    this.time = setTimeout( () => {
      this.setState ({
        moreVisible : false
      })
    } , 100)
     
  }

  /**
   * 更多功能显示
   * @memberof MenuPanel
   */
  moreMenuShow = () => {
    clearTimeout(this.time)
    this.setState ({
      moreVisible : true
    })
  }
  /**
   * 错误处理函数
   */
  errorHander = () => {
    console.log('error')
  }
  /**
   * 渲染menu
   */
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

  /**
   * 渲染历史记录
   */
  renderHistory = () => {
    if (this.props.history!.length >= 1) {
      return this.props.history!.map((item, key) => {
        return (
          <div className='historyItemContainer' key = {key}>
            <Checkbox  checked={item.checked} key ={key} onChange= {this.onCheckboxChange.bind(this, 'toggle', item.key)}>
              <img className= 'historyImg' src={test} alt='test' title= 'test'/>
              {item.value}
            </Checkbox> 
            <span className= 'historyItemClose'><Icon type='close' theme='outlined' onClick = {this.onCheckboxChange.bind(this , 'delete', item.key)} /></span>
          </div>
        )
      })
    } else {
      return <React.Fragment/>
    }
    
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

