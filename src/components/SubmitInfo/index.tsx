import * as React from 'react'
import { Input } from 'antd'
import './index.less'
interface IProps {
  /**
   * 默认显示信息
   */
  defaultInfo?: string | React.ReactNode,
  /**
   * 默认操作信息
   */
  defaultOperationInfo?: string | React.ReactNode,
  /**
   * Input　失去焦点事件
   */
  onBlur?: (value: string) => void
}
interface IState {
  /**
   * 是否显示Input输入框
   */
  isDisplayInput?: boolean
  /**
   * 默认显示信息
   */
  defaultInfo?: string | React.ReactNode,
  /**
   * 默认操作信息
   */
  defaultOperationInfo?: string | React.ReactNode,
  /**
   * 输入框值
   */
  inputValue?: string
}
/**
 * 一个点击后面文字，所有控件变为输入框，输入框失去焦点触发事件的组件
 *
 * @export
 * @class SubmitInfo
 * @extends {React.Component<IProps, IState>}
 */
export default class SubmitInfo extends React.Component<IProps, IState> {
  input: Input
  constructor(props: IProps) {
    super(props)
    this.state = {
      isDisplayInput: false,
      defaultInfo: this.props.defaultInfo ? this.props.defaultInfo : '缺失的信息:',
      defaultOperationInfo: this.props.defaultOperationInfo ? this.props.defaultOperationInfo : '缺失的操作提示'
    }
  }
  handleOnBlue = () => {
    if (this.state.inputValue!.length > 0) {
      this.setState({
        isDisplayInput: false
      }, () => {
        this.props.onBlur ? this.props.onBlur(this.state.inputValue!) : console.log(this.state.inputValue)
      })
    }
    
  }

  switchComponent = () => {
    this.setState({
      isDisplayInput: true
    }, () => {
      this.input.focus()
    })
  }
  handleOnChange = (evt) => {
    this.setState({
      inputValue: evt.target.value
    })
  }
  render() {
    return (
      <div className={`submitInfoContainer`}>
        {this.state.isDisplayInput ? (<Input value={this.state.inputValue} onChange={this.handleOnChange} className='submitInput' onBlur={this.handleOnBlue} ref={node => this.input = node!} />) : ''}
        {this.state.isDisplayInput ? '' : (<span className='no-value'>{this.state.defaultInfo}<span onClick={this.switchComponent} className='supplement'> {this.state.defaultOperationInfo}</span></span>)}
      </div>
    )
  }
}