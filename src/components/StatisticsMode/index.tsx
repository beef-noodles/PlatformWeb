import * as React from 'react'
import './index.less'

export interface IProps {
  normalNum: number
  warnNum: number
  workListNum: number
  changeStatus?: (status) => void
}

interface IState {

}

/**
 * @author yihm
 * @date 2018/10/23 下午4:01
 * @desc
 */
export default class StatisticsMode extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
  }
  
  changeStatus = (status) => {
    this.props.changeStatus!(status)
  }

  render() {

    const {normalNum, warnNum, workListNum} = this.props

    return (<div className='statistics-wrap'>
      <div className='statistics-item normal'>正常：{normalNum}</div>
      <div className='statistics-item error' onClick={this.changeStatus.bind(this, 'warn')}>告警：{warnNum}</div>
      <div className='statistics-item warn' onClick={this.changeStatus.bind(this, 'work')}>工单：{workListNum}</div>
    </div>)
  }
}
