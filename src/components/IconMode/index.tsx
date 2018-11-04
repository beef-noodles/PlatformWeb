import * as React from 'react'
import './index.less'
import {Badge} from 'antd'


export interface IItem {
  id: string
  /**
   * 状态
   */
  status: string
  /**
   * 站类
   */
  type: string
  /**
   * 报警数
   */
  warnNum: number
  /**
   * 中文名称
   */
  name: string
  /**
   * 图片，
   */
  uri: string
}

interface IProps {
  iconList?: IItem[]
  itemClick?: (item: IItem) => void
}

interface IState {

}

/**
 * @author: yihm
 * @date: 2018/10/23
 * @desc: 测站图标
 */
export default class IconMode extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }

  handleItemClick = (item: IItem) => {
    this.props.itemClick!(item)
  }

  render() {
    const {iconList} = this.props
    return (<div className='icon-wrap'>
      {iconList!.map((value: IItem) => (<div className='icon' key={value.id}>
        <div className='img-wrap ' onClick={this.handleItemClick.bind(this, value)}>
          <Badge count={value.warnNum} overflowCount={999}>
            <div className='img'>
              站
            </div>
          </Badge>
        </div>
        <p className='text'>{value.name}</p>
      </div>))}
    </div>)
  }
}

