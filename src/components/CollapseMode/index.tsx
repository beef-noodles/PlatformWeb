import * as React from 'react'
import './index.less'
import {Collapse, Icon} from 'antd'
import StatisticsMode from '@components/StatisticsMode'
import {IData} from '@components/StationManager/OperationPanel'
import CardMode from '@components/CardAMode'

const Panel = Collapse.Panel


/**
 * 每个站类的数据结构
 *
 * @interface IDataItem
 */
export interface IDataItem {
  /**
   * 类型
   */
  typeName: string,
  /**
   * 中文名称
   */
  name: string,
  /**
   * 列表项集合
   */
  data?: any[]
}

interface IProps {
  /**
   * 面板数据列表
   */
  panelList: IDataItem[]
  cardOnClick?: (iItem: IData) => void
  /**
   * 删除panel
   */
  onClose?: (key: string) => void
}

interface IState {
  /**
   * 面板数据列表
   */
  panelList?: any[]
}

/**
 * @author yihm
 * @date 2018/10/29 上午11:40
 * @desc 自定义折叠面板
 */
export default class CollapseMode extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      panelList: this.props.panelList,
    }
    
    console.log(this.props.panelList)
    
  }

  componentWillMount() {
    // console.log(this.state.panelList![0].data[0].data)
  }

  /**
   * 关闭该panel,　并且删除该panel
   *
   * @memberof CollapseMode
   */
  handleClose = (key: string) => {
    if (this.props.onClose) {
      this.props.onClose(key)
    }
  }

  goToDetail = (item) => {
    console.log(item)
    if (this.props.cardOnClick) {
      this.props.cardOnClick(item)
    }
  }

  /**
   * 告警与工单切换
   * @param status
   */
  changeStatus = (status) => {
    console.log(status)
  }

  render() {
    const {panelList} = this.state
    return (
      <div className='panel'>
        <div>
          <Collapse bordered={false} accordion defaultActiveKey={['0parent']}>
            {
              panelList!.map((listPanel: IDataItem, index) => {
                return <Panel showArrow={false} header={
                  <div className='panel-header'>
                    <div className='panel-icon'>
                      <Icon type='right' theme='outlined' style={{fontSize: '12px'}}/>
                    </div>
                    <div className='panel-text'>{listPanel.name}</div>
                    <div className='panel-del'>
                      <Icon type='close' theme='outlined' style={{fontSize: '14px'}} onClick={this.handleClose.bind(this, listPanel.typeName)}/>
                    </div>
                  </div>
                } key={index + 'parent'}>
                  <StatisticsMode normalNum={listPanel!.data![0].normalNum} warnNum={listPanel!.data![0].warnNum} workListNum={listPanel!.data![0].workListNum} changeStatus={this.changeStatus}/>
                  <React.Fragment>
                    {
                      listPanel!.data && <CardMode stationList={listPanel!.data![0]} cardOnClick={this.goToDetail}/>
                    }
                  </React.Fragment>

                </Panel>
              })}
          </Collapse>
          <div style={{height: '48px', backgroundColor: '#f8f8f8'}}/>
        </div>
      </div>)
  }
}
