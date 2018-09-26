import React from  'react'
import { List, Avatar , Icon } from 'antd'
import './index.less'

// import Config from '@config/index'

// import ListItem from './ListItem/index.tsx'
interface IData {
  title? : string
  description ? : string
  key ? : string // number
}

interface IState {
  visible ?: boolean
  data ? : IData[]
}
interface IProps {
  visible? : boolean // 控制组件的显隐
  coreCloseAndDetailOpen : (value) => void
  menuItemPanelClose : () => void
}
export default class Core extends React.Component<IProps , IState> {
  isMount? : boolean
  constructor(props : IProps  , state : IState ) {
    super(props)
    this.state = {
      visible  : this.props.visible ,
      data : [
        {
          key : '11',
          title: 'Ant Design Title 1',
          description : 'test1'
        },
        {
          key : '22',
          title: 'Ant Design Title 2',
          description : 'test1'
        },
        {
          key : '33',
          title: 'Ant Design Title 3',
          description : 'test1'
        },
        {
          key : '44',
          title: 'Ant Design Title 4',
          description : 'test1'
        },
        {
          key : '55',
          title: 'Ant Design Title 1',
          description : 'test1'
        },
        {
          key : '66',
          title: 'Ant Design Title 2',
          description : 'test1'
        },
        {
          key : '77',
          title: 'Ant Design Title 3',
          description : 'test1'
        },
        {
          key : '88',
          title: 'Ant Design Title 4',
          description : 'test1'
        },
      ]
    }
  }
  componentWillMount () {
    this.isMount  = true
  }
  componentWillUnmount () {
    this.isMount  = false
  }

  componentWillReceiveProps (nextProps : IProps) {
    if (nextProps.visible !== this.props.visible) {
        if (this.isMount ) {
          this.setState( {
            visible : nextProps.visible
          })
        }
    }
  }


  renderList = () => {
    console.log('由LIstItem生成List')
  }

  coreCloseAndDetailOpen = (value) => {
    this.props.coreCloseAndDetailOpen(value)
  }
  menuItemPanelClose = () => {
    this.props.menuItemPanelClose()
  }


  render () {
    const style = {'display' : this.state.visible ? 'inline-block' : 'none'}
    return (
     <div className='core' style = {style}>
      <div className='coreHeader'>
        menuItem面板头部 
        <span onClick = {this.menuItemPanelClose}><Icon type='close' theme='outlined' /></span>
      </div>
       <div className='coreContent'>
        core
       </div>
       <hr/>
       <div className='list'>
        <List 
          itemLayout='horizontal' 
          dataSource={this.state.data} 
          renderItem={item => (
            <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={require('./img/03.png')} />}
              title={<a onClick = {this.coreCloseAndDetailOpen.bind(this, item.key)}>{item.title}</a>}
              description= {item.description}
             />
           </List.Item>
          )}
        />
       </div>
      
     </div>
    )
  }
}

