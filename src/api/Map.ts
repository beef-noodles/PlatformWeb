

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
  
  time_interval: 1,
  startTime: 100000000,
  groupField: 'stcd',
  sumField: 'drp',
  condition: 'byDay',
  stcdList: '1001,1002',
}
export function GetWatf(url = `api/watf/pptnGroupSum`, params = defaultWatfParams) {
  return HttpClient.get(url, params)
}

export default {
  GetWatf
}