import request from '../../utils/request'

enum API {
  GET_BEDTIME_LIST = '/bed/gettimelist'
}

// 获取每日作息时间表
export const getUsersList = () => {
  return request.get(API.GET_BEDTIME_LIST)
}
