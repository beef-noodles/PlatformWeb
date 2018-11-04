import * as React from 'react'
import './index.less'
import IconMode, {IItem} from '@components/IconMode'
import PageMode from '@components/PageMode'
import HttpClient from '@utils/HttpClient'
import StorageUtil from '@utils/StorageUtil'

// 站类接口

interface IProps {
  /**
   * 样式名
   */
  className?: string
  /**
   * 点击事件
   */
  onClick?: (curr: IItem) => void
}

interface IState {
  /**
   * 所有测站
   */
  list?: IItem[],
  /**
   * 分页器当前页
   */
  current?: number,
  /**
   * 分页器每页条目数
   */
  pageSize?: number,
  /**
   * 分页器共有多少条目
   */
  total?: number
}

export default class StationIndicators extends React.Component<IProps, IState> {

  iconList = []
  
  constructor(props: IProps) {
    super(props)
    this.state = {
      list: [],
      current: 1,
      pageSize: 5,
      total: 1,
    }
  }

  componentWillMount() {
    this.getIconList()
  }

  paginationChange = (current: number, total: number) => {
    if (current) {
      if (current < 1) {
        current = 1
      } else if (current > total) {
        current = total
      }

      const start = 5 * (current - 1)
      const end = 5 * current
      const iconArr = this.iconList.slice(start, end)
      this.setState({
        list: iconArr,
      })
    }
  }

  /**
   * 点击站点搜索
   *
   * @memberof StationIndicators
   */
  searchStation = (item: IItem) => {
    this.props.onClick ? this.props.onClick(item) : console.error('不可能出错你信不 | yes, I believe')
  }

  getIconList() {
    HttpClient.get('/api/gis/menu', {}).then((res: any) => {
      if (res) {
        this.iconList = res.content
        this.setState({
          total: res.totalPages,
          list: res.content.slice(0, 5),
        })
        
        StorageUtil.setLocalStorage('icon', res.content)
      }
    })
  }

  render() {
    const {total, list} = this.state
    return (
      <div className={`_indicatorContainer ${this.props.className ? this.props.className : ''}`}>
        <div className='_indicatorList'>
          <IconMode iconList={list} itemClick={this.searchStation}/>
        </div>
        <PageMode total={total} pageChange={this.paginationChange}/>
      </div>
    )
  }
}