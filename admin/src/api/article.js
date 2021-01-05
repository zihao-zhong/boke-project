import { axios } from '../utils/axios'

export const createArticle = data => {
  return axios({
    url: '/article/create',
    data
  })
}

export const getArticleList = () => {
  return axios({
    method: 'get',
    url: '/article/list',
  })
}

export const getArticleDetail = id => {
  return axios({
    method: 'get',
    url: `/article/${id}`,
  })
}

export const articleUpdate = id => {
  return axios({
    method: 'put',
    url: `/article/${id}`,
  })
}

export const removeArticle = id => {
  return axios({
    method: 'delete',
    url: `/article/${id}`,
  })
}