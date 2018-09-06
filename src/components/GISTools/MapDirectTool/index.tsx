import * as React from 'react'
import Draggable from 'react-draggable'
import './index.scss'



interface IProps {
  imgPath?: string
  map?: any
  className?: string, // 样式
}

interface IState {
  imgPath?: string
  rotateAngle?: number // 旋转角度，默认为0
}


export default class DirectTool extends React.Component<IProps, IState> {
  map = this.props.map
  constructor(props: IProps, stage: IState) {
    super(props)
    this.state = {
      imgPath: this.props.imgPath ? this.props.imgPath : './img/b1.png',
      rotateAngle: 0
    }
    this.bearingAnaAngleReset.bind(this)
  }


  componentDidMount() {
    this.map.on('mouseup', (msg) => {
      const currentAngle = this.bearingToAngle(this.map.getBearing())
      this.setState({
        rotateAngle: currentAngle
      })
    })
  }

  /**
   * 将translate属性的角度值转化为view中的bearing值
   */
  angleToBearing = (angle: number) => {
    let currentBearing
    const temp = Math.abs(angle % 360)
    if (temp > 180) {
      currentBearing =  -(360 - temp)
    } else {
      currentBearing = temp
    }
    return currentBearing
  }

  /**
   * 
   * 将view中的bearing值转化为translate属性的角度值
   */
  bearingToAngle = (bearing: number) => {
    let currentBearing
    if (bearing > 0) {
      currentBearing = bearing
    } else {
      currentBearing = 360 - Math.abs(bearing)
    }
    return currentBearing
  }

  /**
   * 逆时针旋转
   */
  counterclockwiseRotate = (changeAngle: number) => {
    const currentAngle = this.state.rotateAngle! - changeAngle
    this.setState({
      rotateAngle: currentAngle
    })
    this.map.setBearing(this.angleToBearing  (currentAngle))
    
  }

  /**
   * 顺时针旋转
   */
  clockwiseRotate = (changeAngle: number) => {
    const currentAngle = this.state.rotateAngle! + changeAngle
    this.setState({
      rotateAngle: currentAngle
    })
    this.map.setBearing(this.angleToBearing  (currentAngle))
  }
  /**
   * 将方向指针位置和地图方位恢复到初始化
   * angle 初始箭头的角度为0
   * 
   * pitch 初始 map 的 pitch 值为0
   * bearing 初始 map 的 bearing 值为0
   */
  bearingAnaAngleReset = (angle, pitch, bearing) => {
    this.setState({
      rotateAngle: angle
    })
    const view = {
      center: '',
      zoom: '',
      pitch: '',
      bearing: ''
    }
    view.center = this.map.getCenter()
    view.zoom = this.map.getZoom()
    view.pitch = pitch
    view.bearing = bearing

    this.map.setView(view)
  }

  render() {
    const ratoteStyle = {
      transform: 'rotate(' + this.state.rotateAngle + 'deg)',
      WebkitTransform: 'rotate(' + this.state.rotateAngle + 'deg)',
      MozTransform: 'rotate(' + this.state.rotateAngle + 'deg)',
      OTransform: 'rotate(' + this.state.rotateAngle + 'deg)',
      Mstransform: 'rotate(' + this.state.rotateAngle + 'deg)'
    }

    return (
      <Draggable axis='both' >
        <div className={`${'direction ' + (this.props.className ? this.props.className : '')}`}>
          <button title='逆时针转动' className='counterclockwise' onClick={this.counterclockwiseRotate.bind(this, 30)} />
          <button title='恢复正北方向' className='directionPointer'  onClick={this.bearingAnaAngleReset.bind( 0, 0 , 0)} style={ratoteStyle} />
          <button title='顺时针转动' className='clockwise' onClick={this.clockwiseRotate.bind(this, 30)} />
        </div>
      </Draggable>
    )
  }
}
