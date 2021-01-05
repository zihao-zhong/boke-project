import { axios } from '../utils/axios'

export const createCategory = data => {
  return axios({
    url: '/category/create',
    data
  })
}

export const getCategoryList = () => {
  return axios({
    method: 'get',
    url: '/category/list',
  })
}
export const removeCategory = id => {
  return axios({
    method: 'delete',
    url: `/category/${id}`,
  })
}