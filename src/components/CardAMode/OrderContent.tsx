import * as React from 'react'
import './index.less'

export interface IProps {
  item?: any
}

interface IState {
  
}

/**
 * @author yihm
 * @date 2018/10/30 下午2:05
 * @desc 
 */
export default class OrderContent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
    }

  statusNum2Text(status) {
    let text = '其他状态'
    switch (status) {
      case '1':
        text = '新建'
        break
      case '2':
        text = '派发'
        break
      case '3':
        text = '处理完成'
        break
      case '4':
        text = '延期处理'
        break
      case '5':
        text = '驳回申请'
        break
      case '6':
        text = '审核完成'
        break
    }

    return text
  }
  
    render() {
      const {item} = this.props
      return (<React.Fragment>
          <p><span className='content-name'>创建人名:</span><span className='content-data'>{item.creater}</span></p>
          <p className='margin-top-bottom'><span className='content-name'>创建时间:</span>
            <span className='content-data'>{item.createTime}</span>
          </p>
          <p className='margin-top-bottom'><span className='content-name'>当前状态:</span>
            <span className='content-data'>{this.statusNum2Text(item.status)}</span></p>
        </React.Fragment>)
    }
}
