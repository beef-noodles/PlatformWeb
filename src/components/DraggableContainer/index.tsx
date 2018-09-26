
// @author 谷中仁

import * as React from 'react'
import Draggable from 'react-draggable'
import './index.less'

interface IProps {
  orientation?: 'row' | 'row-reverse' | 'column' | 'column-reverse', // 工具条的方向， 默认水平
  className?: string,
}


interface IState {
  orientation?: 'row' | 'row-reverse' | 'column' | 'column-reverse', // 工具条的方向， 默认水平
  className?: string,
}

/**
 * 可拖拽的组件容器
 *
 * @class DraggableContainer
 * @extends {React.Component<IProps, IState>}
 */
class DraggableContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      orientation : this.props.orientation ? this.props.orientation  : 'row',
      className : this.props.className ? this.props.className : ''
    }
  }

  render() {
    return (
      <Draggable axis='both' >
        <div style={{ flexDirection: this.state.orientation }} className={`${'_gisTools ' + this.state.className}`} >
          {this.props.children}
        </div>
      </Draggable>
    )
  }
}

export default DraggableContainer