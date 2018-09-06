

// @author 谷中仁
import HttpClient from '@utils/HttpClient'

export function getIllegalElectromechanicalWellData(url = `/WMS/illegalwell/queryAll.do`, params = {}) {
  return HttpClient.get(url, params)
}

export default {
  getIllegalElectromechanicalWellData
}