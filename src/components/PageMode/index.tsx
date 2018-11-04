import * as React from 'react'
import './index.less'
import {Icon, Input, Tooltip} from 'antd'

export interface IProps {
  /**
   * 总页数
   */
  total?: number
  /**
   * 页面跳转
   * @param current
   * @param totalPage
   */
  pageChange?: (current: number, totalPage: number) => void
}

interface IState {
  /**
   * 当前页
   */
  current?: number 
}

/**
 * @author yihm
 * @date 2018/10/24 下午3:19
 * @desc 翻页组件
 */
export default class PageMode extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    
    this.state = {
      current: 1
    }
  }

  reduce = () => {
    let page: any = this.state.current

    if (page > 1) {
      --page
      this.setState({
        current: page,
      })
      this.props.pageChange!(page, this.props.total!)
    }

  }

  add = () => {
    let page: any = this.state.current
    const total: any = this.props.total

    if (page < total) {
      ++page
      this.setState({
        current: page,
      })
      this.props.pageChange!(page, this.props.total!)
    }
  }

  onChange = (e) => {
    const num: any = e.target.value

    this.setState({
      current: num,
    })
    this.props.pageChange!(num, this.props.total!)
  }

  render() {

    const { current} = this.state

    return (<React.Fragment>
      { this.props.total! > 1 ? (<div className='page-mode'>
        <div className='page-left' onClick={this.reduce}>
          <Icon type='left' theme='outlined'/>
        </div>
        <Tooltip title='输入页码'>
          <Input onChange={this.onChange} value={current}/>
        </Tooltip>
        <div className='page-divider'>
          /
        </div>
        <span className='page-total-num'>{this.props.total}</span>
        <div className='page-right' onClick={this.add}>
          <Icon type='right' theme='outlined'/>
        </div>
      </div>) : null}
    </React.Fragment>)
  }
}
