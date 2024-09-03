import request from '../../utils/request'

enum API {
  INSERT_BOOST = '/boost/insert',
  GET_BOOST = '/boost/list'
}

// 插入激励信息
export const insertBoostApi = (postData: { content: string }) => {
  return request.post(API.INSERT_BOOST, postData)
}

// 获取每日作息时间表
export const getBoostListApi = () => {
  return request.get(API.GET_BOOST)
}
