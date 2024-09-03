import request from '../../utils/request'

enum API {
  CREATE_MISSION = '/schedule/create',
  GET_MISSIONS = '/schedule/list',
  CHANGE_STATU = '/schedule/change',
  DELETE_MISSION = '/schedule/delete'
}

// 创建任务
export const createMission = (postData: { content: string; date: string }) => {
  return request.post(API.CREATE_MISSION, postData)
}

// 获取任务列表
export const getMissions = () => {
  return request.get(API.GET_MISSIONS)
}

// 更改状态
export const changeStatu = (id: number) => {
  return request.get(API.CHANGE_STATU + `?id=${id}`)
}

// 删除任务
export const deleteMissionApi = (postData: { id: number }) => {
  return request.post(API.DELETE_MISSION, postData)
}
