import { axios } from '../utils/axios'

export const uploadFile = data => {
  return axios({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/upload/file',
    data
  })
}

export const login = data => {
  return axios({
    url: '/login',
    data
  })
}