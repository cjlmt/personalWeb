import request from '../../utils/request'

enum API {
  GET_IMAGES = '/img/get'
}

// 获取每日作息时间表
export const getImages = () => {
  return request.get(API.GET_IMAGES)
}
