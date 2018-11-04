import * as React from 'react'
import './index.less'
import { IInfoStructure } from '../../index'
import defaultImg from './img/default.jpg'
import { Tooltip, Select, Spin } from 'antd'
import SubmitInfo from '@components/SubmitInfo'
import ReactEcharts from 'echarts-for-react'
import { GetWaterDetailByStcd } from '@api/Map'
const Option = Select.Option
import Config from '@config/index'
interface IState {
  // 是否是测试数据
  isTest?: boolean,
  testData?: string,
  chartOption?: object,
  isSpinning?: boolean
}
// 水位站
export default class Water extends React.Component<IInfoStructure, IState> {
  detailData: any
  constructor(props: IInfoStructure) {
    super(props)
    this.state = {
      isTest: true,
      isSpinning: true,
      chartOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          left: '0px',
          right: '40px',
          bottom: '8px',
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['蒸发量', '降水量', '平均温度']
        },
        xAxis: [
          {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }

        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '降水量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: '平均温度',
            type: 'line',
            // yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      }
    }
  }


  componentDidMount() {
   const param = {
      stcd: this.props.data.stcd
    }
    this.GetWaterDetailByStcd(param)
  }
  GetWaterDetailByStcd = (stcd) => {
    this.setState({
      isSpinning: true
    }, () => {
      // TODO 接入数据
      GetWaterDetailByStcd('api/river/queryBaseInformationGet', stcd).then(msg => {
        console.log(msg)
        this.setState({
          isSpinning: false
        })
      }, err => {
        console.error(err)
      })
      // TODO 接入数据　删除
      this.setState({
        isSpinning: false
      })
    })
    
  }
  handleOnBlue = (data) => {
    this.setState({
      isTest: false,
      testData: data
    })
  }

  render() {
    return (
      <Spin spinning={this.state.isSpinning} tip={Config.system.loadingText}>
        <div className='widgetContainer'>
          {/* 基础信息 */}
          <div className='widgetTitle'>测站信息</div>
          <div className='content'>
            <div className='contentItem'>
              <span className='key'>测站编码:</span><span className='value'>{this.props.data.stcd ? this.props.data.stcd : '10812092'}</span>
            </div>
            <div className='contentItem'>
              <span className='key'>测站名称:</span><span className='value'>{this.props.data.name ? this.props.data.name : '测试测站'}</span>
            </div>
            <div className='contentItem'>
              <span className='key'>河流名称:</span>{this.state.isTest ? (<SubmitInfo defaultInfo='测试河流名称' defaultOperationInfo='测试操作提示' onBlur={this.handleOnBlue} />) : (<Tooltip title={this.state.testData}><span className='value'>{this.state.testData}</span></Tooltip>)}
            </div>
            <div className='contentItem'>
              <span className='key'>水系名称:</span><span className='no-value'>{this.props.data.name}<span className='supplement'> 我要补充</span></span>
            </div>
            <div className='contentItem'>
              <span className='key'>流域名称:</span><span className='no-value'>{this.props.data.name}<span className='supplement'> 我要补充</span></span>
            </div>
            <div className='contentItem'>
              <span className='key'>行政区划:</span><span className='value'>福安市</span>
            </div>
            <div className='contentItem'>
              <span className='key'>启用标志:</span><span className='value'>启用</span>
            </div>
            <div className='contentItem'>
              <span className='key'>建站年月:</span><span className='no-value'>{this.props.data.name}<span className='supplement'> 我要补充</span></span>
            </div>
            <div className='contentItem'>
              <span className='key'>经度:</span><span className='value'>109.65589</span>
            </div>
            <div className='contentItem'>
              <span className='key'>纬度:</span><span className='value'>27.08952</span>
            </div>
            <div className='contentItem'>
              <span className='key'>站址:</span><Tooltip title={'公共厕所围栏角落立杆，备选地址泵站旁'}><span className='value' >公共厕所围栏角落立杆，备选地址泵站旁</span></Tooltip>
            </div>
            <div className='contentItem'>
              <span className='key'>站类:</span><span className='value'>水位雨量站</span>
            </div>
            <div className='contentItem'>
              <span className='key'>备注:</span><Tooltip title={'４米高，臂3米长，直径150'}><span className='value'>４米高，臂3米长，直径150</span></Tooltip>
            </div>
            <div className='contentItem'>
              <span className='image-key'>图像:</span><span className='image-value'>
                <img src={defaultImg} alt='test' />
              </span>
            </div>
          </div>
          {/* 数据可视化 */}
          <div className='widgetTitle'>实时信息</div>
          <div className='subtitle'>凤鸣.鱼龙站前三天水位趋势</div>
          <div className='data-visual-content'>
            <div className='operateArea'>
              <div className='operateUnit'>
                <div className='operateTitle'>当前模式</div>
                <Select
                  style={{ width: '100%' }}
                  placeholder='请选择模式'
                  defaultValue={'水位趋势'}
                >
                  <Option key='1'>水位趋势</Option>
                  <Option key='2'>水位趋势2</Option>
                  <Option key='3'>水位趋势3</Option>
                </Select>
              </div>
              <div className='operateUnit'>
                <div className='operateTitle'>新建工单</div>
                <Select
                  mode='tags'
                  style={{ width: '100%' }}
                  placeholder='请选择工单'
                  defaultValue={'需要临场检查1'}
                >
                  <Option key='2'>需要临场检查2</Option>
                  <Option key='3'>需要临场检查3</Option>
                </Select>
              </div>
              <ReactEcharts
                option={this.state.chartOption!}
                lazyUpdate={true}
                style={{ height: '500px' }}
                className='data-visual'
                opts={{ renderer: 'svg' }} />
            </div>

          </div>
        </div>
      </Spin>
    )
  }
}