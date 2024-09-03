import request from '../../utils/request'

enum API {
  CREATE_ARTICLE = '/study/create',
  GET_ARTICLES_LIST = '/study/list',
  GET_ARTICLE = '/study/get',
  UPDATE_ARTICLE = '/study/update',
  DELETE_ARTICLE = '/study/delete'
}

// 创建博客
export const createArticleApi = (postData: { article: string; title: string }) => {
  return request.post(API.CREATE_ARTICLE, postData)
}

// 获取博客列表
export const getArticleList = () => {
  return request.get(API.GET_ARTICLES_LIST)
}

// 获取指定博客
export const getArticle = (id: number) => {
  return request.get(API.GET_ARTICLE + `?id=${id}`)
}

// 更新博客内容
export const updateArticle = (id: number, postData: { article: string }) => {
  return request.post(API.UPDATE_ARTICLE + `?id=${id}`, postData)
}

// 删除博客
export const deleteBlogApi = (postData: { id: number }) => {
  return request.post(API.DELETE_ARTICLE, postData)
}
