import * as React from 'react'
import './index.less'

export interface IProps {
  item?: any
}

interface IState {

}

/**
 * @author yihm
 * @date 2018/10/30 下午2:03
 * @desc
 */
export default class WarnContent extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
  }
  
  render() {
    const {item} = this.props 
    return (<React.Fragment>
      <p><span className='content-name'>测站编码:</span><span className='content-data'>{item.objId}</span></p>
      <p className='margin-top-bottom'><span className='content-name'>测站名称:</span>
        <span className='content-data'>{item.objName}</span></p>
      <p className='margin-top-bottom'><span className='content-name'>上次工单:</span><span className='content-data'>2018-10-01 01:03:08</span>
      </p>
      <p className='margin-top-bottom text-overflow'><span className='content-name'>描述信息:</span><span
        className='content-desc'>{item.content}</span></p>
    </React.Fragment>)
  }
}
