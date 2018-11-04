import * as React from 'react'
import {Card} from 'antd'
import './index.less'
import {IData} from '@components/StationManager/OperationPanel'
import WarnContent from '@components/CardAMode/WarnContent'
import OrderContent from '@components/CardAMode/OrderContent'

export interface IProps {
  /**
   * 测站列表
   */
  stationList?: any
  /**
   * 卡片点击事件
   */
  cardOnClick?: (item: IData) => void
}

interface IState {
}

export default class CardMode extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)

  }
  
  itemOnClick = (one) => {
    const item: IData = {
      type: one.type,
      data: one
    }
    if (this.props.cardOnClick) {
      this.props.cardOnClick(item)
    }
  }
  
  orderCard = (item) => {
    return (<Card
      title={(<div onClick={this.itemOnClick.bind(this, item)} style={{cursor: 'pointer'}}>
        <div className='card-icon'/>
        <span className='card-text-normal'>工单</span><span className='card-text-info'>信息</span>
      </div>)}
      actions={[<span key='pass'>通过</span>, <span key='reject'>驳回</span>]}
      className='card-wrap'
    >
      <div className='card-content' onClick={this.itemOnClick.bind(this, item)}>
        <OrderContent item={item}/>
      </div>

    </Card>)
  }
  
  warnCard = (item) => {
    return (<Card key={item.id}
      title={(<div onClick={this.itemOnClick.bind(this, item)} style={{cursor: 'pointer'}}>
        <div className='card-icon'/>
        <span className='card-text-normal'>缺报</span><span className='card-text-info'>告警</span>
      </div>)}
      actions={[<span key='ignore'>忽略</span>, <span key='new'>新建工单</span>]}
      className='card-wrap'
    >
      <div className='card-content' onClick={this.itemOnClick.bind(this, item)}>
        <WarnContent item={item}/>
      </div>

    </Card>)
  }
  
  render() {
    
    const {stationList} = this.props
    
    return (<React.Fragment>
      {stationList!.warnInfos && stationList!.warnInfos.map((value) => {
        return this.warnCard(value)
      })}

      {stationList!.workLists && stationList!.workLists.map((value) => {
        return this.orderCard(value)
      })}
    </React.Fragment>)
  }
}
