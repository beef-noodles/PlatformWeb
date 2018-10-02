

// @author 谷中仁
import HttpClient from '@utils/HttpClient'

/**
 * 获取水雨情站点统计数据
 *
 * @export
 * @param {string} [url=`summit-eswatf/watf/pptnGroupSum`] 请求地址
 * @param {object} [params={}]　参数
 * @returns Promise
 */
const defaultWatfParams = {
  pageNo: 1, 
  pageSize: 100
}
export function GetWatf(url = `api/river`, params = defaultWatfParams) {
  return HttpClient.get(url, params)
}

const defaultStationParams = {
  param : ''
}

export function GetStation(url = `api/station`, params = defaultStationParams) {
  return HttpClient.get(url, params)
}
export default {
  GetWatf,
  GetStation
}

