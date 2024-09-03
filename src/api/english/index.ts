import request from '../../utils/request'

enum API {
  INSERT_ENG = '/eng/insert',
  GET_ENG = '/eng/list'
}

// 插入英语词句
export const insertEngApi = (postData: { content: string; type: number; translation: string }) => {
  return request.post(API.INSERT_ENG, postData)
}

// 获取英语词句
export const getEngListApi = () => {
  return request.get(API.GET_ENG)
}
