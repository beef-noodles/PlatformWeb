import * as React from 'react'
import './index.less'
import DynamicImport from '@components/DynamicImport'
import Loading from '@components/Loading'

export interface IInfoStructure {
  type: string,
  data: any
}
interface IProps {
  /**
   * 样式名
   */
  className?: string
  /**
   * 数据唯一信息
   */
  info: IInfoStructure,
  /**
   * 返回事件
   */
  onBack?: () => any
}

interface IState {
  info?: IInfoStructure
}
export default class OperationPanel extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      info: this.props.info
    }
  }
 
  goBack = () => {
    this.props.onBack ? this.props.onBack() : console.log('go back')
  }
  /**
   * 根据数据类型加载不同的详情
   *
   * @memberof OperationPanel
   */
  loadDetail = (data: IInfoStructure): any => {
    // 水情
    console.log(data.type)
    if (data.type === 'LOSEWARN') {
      return (
        <DynamicImport load={() => import(`./Widget/Water/index`)}>
          {(Component: any) => Component === null
            ? <Loading />
            : <Component {...data} />}
        </DynamicImport>
      )
    } else {
      return (
        <DynamicImport load={() => import('./Widget/testWidget/index')}>
          {(Component: any) => Component === null
            ? <Loading />
            : <Component {...data} />}
        </DynamicImport>
      )
    }
    
  }
  componentWillReceiveProps(nextProp: IProps) {
    if (nextProp.info !== this.props.info) {
      // console.log(nextProp.info)
      this.setState({
        info: nextProp.info
      })
    }
  }
  render() {
    const detailWidget = this.loadDetail(this.state.info!)
    return (
      <div className={`${this.props.className ? this.props.className : ''}`}>
        <div className='_goBack' onClick={this.goBack}>返回上一级</div>
        <div className='widgetContent'>{detailWidget}</div>
      </div>
    )
  }
}