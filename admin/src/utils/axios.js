import axios from 'axios'
const env = require('../../env')
import { Message } from 'element-ui'
import { Loading } from 'element-ui'
import Cookie from 'js-cookie'

const instance = axios.create({
  baseURL: env.BASE_URL + env.BASE_API,
  timeout: 10000
})

let loading = null

instance.interceptors.request.use(function (config) {
  let token = Cookie.get('token')
  // 登錄後把token傳過去
  if ( token ) {
    config.headers.common['Authorization'] = 'Bearer ' + token
  }
  // 有些接口不需要loading
  if ( config.headers.loading ) {
    loading = Loading.service({ background: 'rgba(255, 255, 255, .3)' })
  }

  return config
}, function (error) {
  loading && loading.close()
  return Promise.reject(error)
})

instance.interceptors.response.use((res) => {
  if ( res.status === 200 ) {
    loading && loading.close()
    return Promise.resolve(res)
  } else {
    Message({
      type: 'error',
      duration: 3000,
      customClass: 'z-index-3000',
      message: res.data.message,
    })
    loading && loading.close()
    return Promise.reject(res)
  }
}, function (error) {
  const { response } = error
  
  Message({
    type: 'error',
    duration: 3000,
    customClass: 'z-index-3000',
    message: response.data.message,
  })
  
  loading && loading.close()
  return Promise.reject(response)
})

function Axios (options) {
  return new Promise((resolve, reject) => {
    let baseUrl = ''
    instance({
      headers: Object.assign({ loading: true }, options.headers) || { loading: true },
      method: options.method || 'post',
      url: baseUrl + options.url || '',
      params: options.params || '',
      data: options.data || {}
    })
      .then(response => {
        let data = response.data || {}
        if ( response.status === 200 ) {
          resolve(data)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { 
  Axios as axios,
  instance as _axios
}