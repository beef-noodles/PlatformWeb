import * as React from 'react'
import { Carousel } from 'antd'
import './index.scss'
// const HelloWorld = () => <div>Hello world</div>
// export default HelloWorld
export default class First extends React.Component {
  render() {
    return (
      <Carousel autoplay>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </Carousel>
    )
  }
}