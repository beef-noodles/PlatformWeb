import * as React from 'react'
import './index.less'
import{IData} from '@components/StationManager/OperationPanel'
interface ICardItem {
  stcd : string // 测站唯一标识
  STNM : string // 测站名称
  USFL : string  // 测站状态
  tm : string // 当前数据时间
  z : string // 当前水位
  q : string  // 流量
  WRZ : string // 警告水位
  GRZ : string // 保证水位
}
interface IProps {
  index: number,
  item: ICardItem
  onClick: (item: IData) => void
}


interface IState {
    
}

/**
 * @author yihm
 * @date 2018/10/29 下午3:44
 * @desc 卡片B类型，区别于运维系统
 */
export default class CardBMode extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
    }

    itemOnClick = (one) => {
      const item: IData = {
        type: 'sq',
        data: one
      }
      if (this.props.onClick) {
        this.props.onClick(item)
      } 
    }
    
    render() {
      const item = this.props.item
        return (<div className='card-b' onClick={this.itemOnClick.bind(this, item)}>
            <div className='card-b-header'>
              <span className='header-name'>{this.props.index}.{item.STNM}</span>
              <span className='header-time'>{item.tm}</span>
              <span className='header-status'>{!item.USFL ? '正常' : '异常' }</span>
            </div>
            <div className='card-b-content'>
              <div className='water-level'>
                <p className='card-b-num'>{item.z ? item.z : '--'}</p>
                <p className='card-b-desc'>水位(m)</p>
              </div>
              <div className='flow'>
                <p className='card-b-num'>{item.q ? item.q : '--'}</p>
                <p className='card-b-desc'>流量(m³/s)</p>
              </div>
              <div className='warn-water-level'>
                <p className='card-b-num'>{item.WRZ ? item.WRZ : '--'}</p>
                <p className='card-b-desc'>警戒水位(m)</p>
              </div>
              <div className='guaranteed-water-level'>
                <p className='card-b-num'>{item.GRZ ? item.GRZ : '--'}</p>
                <p className='card-b-desc'>保证水位(m)</p>
              </div>
            </div>
        </div>)
    }
}
