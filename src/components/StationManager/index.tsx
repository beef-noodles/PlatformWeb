import * as React from 'react'
import { Tooltip, message } from 'antd'
import './index.less'
import classnames from 'classnames'
import MenuDrawer from '@layouts/MenuDrawer'
import ComplexContainer from '@components/ComplexContainer'
import OperationPanel from './OperationPanel'
import IndexDB from '@utils/IndexDB'
import DetailPanel, { IInfoStructure } from './DetailPanel'
import Config from '@config/index'
import AnimateSearchHistory from '@components/AnimateSearchHistory'
import { IItem } from '@components/IconMode'

import OPSPoints, {OPSToken} from '@components/StationManager/OPSPoints'
import PubSub from 'pubsub-js'


/**
 * 由输入框触发，让operationPanel查询的条件结构
 *
 * @interface IParams
 */
interface IParams {
  time: number,
  station: IItem
}

interface IState {
  inputValue?: string, // 输入信息
  menuDrawerVisible?: boolean, // 抽屉式菜单是否展示
  // history?: IHistory[]
  /**
   * 主操作面板是否展示
   */
  isOperationPanelShow?: boolean,
  /**
   * 详情面板是否展示
   */
  isDetailPanelShow?: boolean
  /**
   * 搜索历史记录是否展示
   */
  historyData: any[]
  historyListVisible: boolean,
  goToDetailInfo?: IInfoStructure,
  /**
   * 由输入框触发，让operationPanel查询的条件结构
   */
  queryParams?: IParams
}

interface IProps {
  /**
   * map 对象
   */
  map?: any
}

export default class StationManager extends React.Component<IProps, IState> {
  searchInput: any
  map = this.props.map
  isMount: boolean
  currentMenuItem = ''
  menuItemPanelVisible = false
  indexDB: any
  OPSPoints : any
  historyData: any[] = []
  historyKeyList: string[] = [] // 存放站类中文名称|zhan|zhan|
  constructor(props: IProps) {
    super(props)
    this.state = {
      inputValue: '',
      isOperationPanelShow: true,
      isDetailPanelShow: false,
      historyListVisible: false, // 历史记录是否显示
      historyData: []
    }
    this.indexDB = new IndexDB()
    this.processHistoryKey(Config.stationIndicators)
    this.OPSPoints = new OPSPoints(this.map)
  }

  /**
   * 将站类的中文名成提取出来存入数组
   *
   * @memberof StationManager
   */
  processHistoryKey = (stationList) => {
    stationList.map((item: any) => {
      this.historyKeyList.push(item.name)
    })
  }
  componentDidMount() {
    this.isMount = true
    this.getIndexDBForHistory()
    // =============== 运维所有需要在GIS地图上显示的点的获取和符号化以及点击地图上符号详情页的打开 =================
    this.OPSPoints.getAllOPSPoints()
    PubSub.subscribe(OPSToken, (msg , data) => {
      console.log(msg)
      this.goToDetail(data)
    })
    // =============== 运维所有需要在GIS地图上显示的点的获取和符号化以及点击地图上符号详情页的打开 =================
  }

  componentWillUnmount() {
    PubSub.unsubscribe(OPSToken)
    this.isMount = false
  }

  /**
   * 搜索框的处理
   */
  emitEmpty = () => {
    this.searchInput.focus()
    this.setState({ inputValue: '' })
  }

  onChangeUserName = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  controlMenu = () => {
    this.setState({
      menuDrawerVisible: !this.state.menuDrawerVisible,
    })
  }

  onClose = () => {
    this.setState({
      menuDrawerVisible: !this.state.menuDrawerVisible,
    })
  }

  handleMenuClick = (e) => {
    console.log('click ', e)
  }
  handleInputChange = () => {
    const value = this.searchInput.value
    this.setState({
      inputValue: value,
    })
    if (value.length > 0) {
      this.searchHistoryUnVisible()
    } else {
      this.searchHistoryVisible()
    }
  }

  handleKeyPress = (evt) => {
    const keyCode = evt.which || evt.charCode
    if (keyCode === 13) {
      this.startSearch(evt.target.value)
    }
  }

  /**
   * 从详情返回事件处理
   *
   */
  handleBack = () => {
    this.setState({
      isDetailPanelShow: false,
      isOperationPanelShow: true
    })
  }
  /**
   * 跳转到详情页
   *
   */
  goToDetail = (item: any) => {
    // console.log(item)
    this.setState({
      isDetailPanelShow: true,
      isOperationPanelShow: false,
      goToDetailInfo: item
    })

    // 定位
  }

  /**
   * 历史记录操作
   *
   * @memberof StationManager
   */
  historyListClick = (value) => {
    this.searchInput.value = value // 点击的历史搜索关键字显示在搜索框中
    let station: IItem
    if (this.livedInStations(value)) {
      station = this.livedInStations(value)!
      this.setState({
        inputValue: value,
        queryParams: {
          time: new Date().getTime(),
          station
        }
      })
    }
  }

  /**
   * 搜索历史记录面板显示
   */
  searchHistoryVisible = () => {
    if (this.isMount && this.state.historyListVisible !== true) {
      this.setState({
        historyListVisible: true
      })
    }
  }

  /**
   * 搜索历史记录面板显示隐藏的切换
   */
  searchHistoryUnVisible = () => {
    if (this.isMount && this.state.historyListVisible !== false) {
      this.setState({
        historyListVisible: false
      })
    }
  }
  getIndexDBForHistory = () => {
    this.historyData = []
    this.indexDB.getData(
      (res: any) => {
        this.historyData.unshift(res)
        this.setState({
          historyData: this.historyData
        })
      }
    )
  }

  /**
   * 搜索框失去焦点事件
   */
  searchInputOnBlur = () => {
    setTimeout(this.searchHistoryUnVisible, 100) // 这里做演示是为了确保在历史记录组件消失之前获取到清空历史纪录的点击事件
    // this.searchHistoryToggle()
  }
  /**
   * 搜索框获取焦点事件
   */
  searchInputonFocus = () => {
    this.searchHistoryVisible()
  }
  /**
   * 判断是否存在该站类，如果没有则返回－１，　如果有返回该站
   *
   * @memberof StationManager
   */
  livedInStations = (value: string) => {
    const index = this.historyKeyList.findIndex((key: string) => {
      return key.includes(value)
    })
    if (index >= 0) {
      const matched = this.historyKeyList[index]
      return Config.stationIndicators.filter((item) => {
        return item.name === matched
      })[0]
    } else {
      return null
    }
  }
  /**
   * 开始查询
   *
   * @memberof StationManager
   */
  startSearch = (searchKeyWord: string) => {
    let lievedStation: IItem
    const trimedValue = this.trim(searchKeyWord)
    if (trimedValue.length > 0) {
      if (this.livedInStations(trimedValue)) {
        lievedStation = this.livedInStations(trimedValue)!
        const datas = [{
          id: new Date(),
          title: trimedValue
        }]
        this.indexDB.addData(datas).then(() => {
          this.getIndexDBForHistory()
          const param: IParams = {
            time: new Date().getTime(),
            station: lievedStation
          }
          this.setState({
            queryParams: param
          })
        })
      } else {
        message.warning(`没有符合${trimedValue}的站类，请重新输入。`)
      }
    } else {
      message.warning(`请输入要查询的站类！`)
    }
  }

  onClearClick = () => {
    this.indexDB.deleteAllData()
    this.setState({
      historyData: []
    })
    this.searchHistoryUnVisible()
  }

  /**
   * 去掉字符串两端的空格
   * 使用js的trim()方法不能达到效果
   *
   * @memberof StationManager
   */
  trim = (x) => {
    return x.replace(/^\s+|\s+$/gm, '')
  }

  render() {
    const props = {
      menuClick: this.handleMenuClick
    }
    const searchStyle = classnames('inputSearch', { 'ableToSearch': (this.state.inputValue!.length > 0) })
    return (
      <React.Fragment>
        <div className='stationManager'>
          <strong className='strong-inlineBlock' />
          <Tooltip title='菜单'>
            <div className='menuDrawerIcon' onClick={this.controlMenu} />
          </Tooltip>
          <input placeholder='请输入查询条件...' onBlur={this.searchInputOnBlur} onFocus={this.searchInputonFocus} ref={ref => {
            this.searchInput = ref
          }} className='not-draggable stationInput' onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress} />
          <Tooltip title='搜索' placement={'right'} arrowPointAtCenter>
            <div onClick={this.startSearch.bind(this, this.state.inputValue)} className={searchStyle} />
          </Tooltip>
          <strong className='strong-inlineBlock' />
          <MenuDrawer closeHandle={this.onClose} visible={this.state.menuDrawerVisible!} props={props} />
        </div>
        <ComplexContainer className={`_complexContainerLayout `} style={{ display: (this.state.isOperationPanelShow ? 'block' : 'none') }}>
          <OperationPanel className={`${!this.state.isOperationPanelShow ? '_disOperationPanelDisplay' : '_operationPanelDisplay'}`} map = {this.map} onClick={this.goToDetail} queryFromInput={this.state.queryParams} />
        </ComplexContainer>
        <ComplexContainer className={`_complexContainerLayout `} >
          {this.state.isDetailPanelShow ? <DetailPanel info={this.state.goToDetailInfo!} className={`${!this.state.isDetailPanelShow ? '_disDetailPanelDisplay' : '_detailPanelDisplay'}`} onBack={this.handleBack} /> : ''}
        </ComplexContainer>

        <AnimateSearchHistory className={`_searchHistory`} visible={this.state.historyListVisible} onListClick={this.historyListClick} onClearClick={this.onClearClick} data={this.state.historyData} />
      </React.Fragment>
    )
  }
}