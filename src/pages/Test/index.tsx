import * as React from 'react'
import { Button, Input, Breadcrumb, Modal, Icon } from 'antd'
import './App.less'
import logo from './image/logo.svg'
import MaptalksCom from '@components/mapComponents/MaptalksCom'
import Summit, { Topic } from '@components/test/Summit'
import Web from '@components/test/Web'
import { FaBeer } from 'react-icons/fa'
import { Button as MaterialButton, IconButton } from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'
import AjaxTest from '@components/test/Ajax'
import PubSub from 'pubsub-js'
import Draggable from 'react-draggable'
import classNames from 'classnames'
import { ControlFooterDisplay, ControlHeaderDisplay } from '@pages/PageUtils'
import {GetWatf} from '@api/Map'
import Animate from 'rc-animate'
import velocity from 'velocity-animate'

interface IState {
  SummitMessage?: string,
  WebMessage?: string,
  echartsOption?: any,
  modelVisible?: boolean,
  isTestClassName?: boolean
  visible?: boolean
  exclusive?: boolean
  data?: object[]
}
export interface IProps {
  empty?: any
}


const Box = (props) => {
  const style = {
    width: '200px',
    display: props.visible ? 'block' : 'none',
    height: '200px',
    backgroundColor: 'red',
  }
  return (<div style={style} />)
}


class App extends React.Component<IProps, IState> {

  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      SummitMessage: '',
      WebMessage: '',
      echartsOption: this.getOption(),
      modelVisible: true,
      visible: true,
      exclusive: false,
      data: []
    }
    ControlFooterDisplay()
    ControlHeaderDisplay()
    this.receiveFromSummit = this.receiveFromSummit.bind(this)
    this.receiveFromWeb = this.receiveFromWeb.bind(this)
    this.getOption = this.getOption.bind(this)
  }
  handleOk = () => {
    this.setState({
      modelVisible: !this.state.modelVisible
    })
  }
  getOption() {
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
  }
  public say() {
    alert('test')
  }
  public receiveFromSummit(content: any) {
    this.setState({
      WebMessage: content
    }, () => {
      console.log(`父容器收到信息，内容为：${this.state.WebMessage}`)
    })
  }
  receiveFromWeb(content: any) {
    this.setState({
      SummitMessage: content
    })
  }
  componentDidMount() {
    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    const myEchart = echarts.init(document.getElementById('test_echarts'))
    myEchart.setOption(option)
    // ================= pubsub.js===============
    PubSub.subscribe(Topic, (msg, data) => {
      this.setState({
        echartsOption: data
      }, () => {
        // console.log(msg)
        // console.log(data)
      })
    })
  }
  testClassNames = () => {
    this.setState({
      isTestClassName: !this.state.isTestClassName
    })
    GetWatf().then((data: any) => {
      this.setState({
        data
      })
    }, err => {console.log(err)})
  }

  animateLeave = (node, done) => {
    let ok = false

    function complete() {
      if (!ok) {
        ok = true
        done()
      }
    }

    node.style.display = 'block'

    velocity(node, 'slideUp', {
      duration: 1000,
      complete,
    })
    return {
      stop() {
        velocity(node, 'finish')
        // velocity complete is async
        complete()
      },
    }
  }

  animateEnter = (node, done) => {
    let ok = false

    function complete() {
      if (!ok) {
        ok = true
        done()
      }
    }

    node.style.display = 'none'

    velocity(node, 'slideDown', {
      duration: 1000,
      complete,
    })
    return {
      stop() {
        velocity(node, 'finish')
        // velocity complete is async
        complete()
      },
    }
  }

  toggle = (field) => {
    this.setState({
      [field]: !this.state[field],
    })
  }




  // ================= pubsub.js===============
  public render() {
    const anim = {
      enter: this.animateEnter,
      leave: this.animateLeave,
    }
    const testClassNames = classNames({ 'classNameTest': this.state.isTestClassName })
    const reactEchartsOptions = this.state.echartsOption!
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcomes to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button onClick={this.say}> antd test</Button>
        <Input placeholder='Basic usage' />
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><a >Application Center</a></Breadcrumb.Item>
          <Breadcrumb.Item><a >Application List</a></Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
        <Summit message={this.state.SummitMessage} onSay={this.receiveFromSummit} />
        <h3>分割线哈<Icon type='link' /><Button type='primary' icon='search'> <Icon type='github' />Search</Button></h3>
        <MaterialButton variant='contained' color='primary'>
          Hello World
        </MaterialButton>
        <IconButton color='primary' aria-label='Add to shopping cart'>
          <AddShoppingCartIcon />
        </IconButton>
        <AjaxTest />
        <Draggable
          axis='both'
          defaultPosition={{ x: 0, y: 0 }}
          grid={[25, 25]}
        // onStart={this.handleStart}
        // onDrag={this.handleDrag}
        // onStop={this.handleStop}
        >
          <div className='draggable'>
            <div className='handle'>拖动我吧<Icon type='setting' /></div>
            <div>要实现特效，请从参考我的API</div>
          </div>
        </Draggable>
        <h3> Lets go for a <FaBeer size={40} color='#a24b00' />? </h3>
        <Web message={this.state.WebMessage} onSendMessage={this.receiveFromWeb} />
        <MaptalksCom />
        <ReactEcharts
          option={reactEchartsOptions}
          notMerge={true}
          lazyUpdate={true}
          opts={{ renderer: 'svg' }} />

        <div>
           <h3>react简单动画示例rc-animate+velocity-animate</h3>
          <label><input type='checkbox' onChange={() => { this.toggle('visible') }} checked={this.state.visible} />
            show</label>
          &nbsp;
        <Animate
            component=''
            exclusive={this.state.exclusive}
            showProp='visible'
            animation={anim}
          >
            <Box visible={this.state.visible} />
          </Animate>
        </div>




        <div style={{ width: '100%', height: '300px' }} id='test_echarts' />
        <Modal
          title='Basic Modal'
          visible={this.state.modelVisible}
          onOk={this.handleOk}
        // onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <span className={testClassNames}>classnames 测试</span> <Button onClick={this.testClassNames}>测试classNames</Button>
        <div>后台数据交互{
          this.state.data!.map((item: any, key) => {
            return(
              <span key={item.stacd}>{item.stcd}</span>
            )
          })
        }</div>
      </div>

      // react中的动画



    )
  }
}

export default App
