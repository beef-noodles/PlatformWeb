import React from  'react'
import   './index.less'
import MenuItem from './MenuItem'

interface IMenuArr {
  imgPath? : string // 图片路径
  title ? : string // 功能mingc
  key ? : string  // 唯一值，标识功能
  handler: (key, value) => void
}
interface IProps {
  visible ?: boolean
  // menuArr? : IMenuArr[]
  menuArr ? : {
    default? : IMenuArr[],
    more? : IMenuArr[]
  }
}
interface IState {
  visible ?: boolean
  // menuArr ? : IMenuArr[]
  menuArr ? : {
    default? : IMenuArr[],
    more? : IMenuArr[]
  }
}
export default class MoreMenu extends React.Component<IProps , IState> {
  isMount ? : boolean
  constructor(props : IProps  , state: IState ) {
    super(props)
    this.state = {
      visible  : this.props.visible,
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
    // if (nextProps.visible !== this.props.visible) {
      if (this.isMount) {
        this.setState ({
          visible : nextProps.visible
        })
      }
    // }
  }

  errorHander = () => {
    console.log('error')
  }
  
  renderMenu = () => {
    return this.state.menuArr!.more!.map((item, key) => {
          return (
            <MenuItem className= ''   key ={key} imgPath={item.imgPath} title= {item.title} onClick ={item.handler.bind(this , item.key, item.title)}/>
          )
    }  )
  }

  render () {
    const style = { 
      'display': this.state.visible ? 'inline-flex' : 'none',
      'flexFlow': 'wrap'
   }
    const menu = this.renderMenu ()
    return (
      <div  style ={style} className=''>
          {menu}
      </div>
    )
  }
}

