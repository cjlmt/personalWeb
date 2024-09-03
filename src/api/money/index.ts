import request from '../../utils/request'

enum API {
  CREATE_MONEY = '/money/create',
  GET_MONEY_LIST = '/money/list',
  ADD_PURCHASE = '/money/addproduct',
  GET_PURCHASE_LIST = '/money/productlist',
  CHANGE_STATU = '/money/change'
}

// 创建收支记录
export const createMoney = (postData: { price: string; content: string; inorout: boolean }) => {
  return request.post(API.CREATE_MONEY, postData)
}

// 获取收支列表
export const getMoneyList = () => {
  return request.get(API.GET_MONEY_LIST)
}

// 添加商品
export const addpurchase = (postData: { content: string }) => {
  return request.post(API.ADD_PURCHASE, postData)
}

// 获取愿望单
export const getPurchaseList = () => {
  return request.get(API.GET_PURCHASE_LIST)
}

// 改变状态
export const changeStatu = (id: number) => {
  return request.get(API.CHANGE_STATU + `?id=${id}`)
}
