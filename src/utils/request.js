import axios from 'axios'
import { Message, Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // 跨域请求时发送cookie
  timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error)
    return Promise.reject(error)
  }
)

// request拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === -20000) {
      Notification.error({
        title: res.message
      })
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    if (error.toString().indexOf('Error: timeout') !== -1) {
      Notification.error({
        title: '网络请求超时',
        duration: 2500
      })
      return Promise.reject(error)
    }

    if (error.toString().indexOf('Error: Network Error') !== -1) {
      Notification.error({
        title: '网络请求错误',
        duration: 2500
      })
      return Promise.reject(error)
    }

    if (error.toString().indexOf('Error: Internal Server Error')) {
      Notification.error({
        title: '内部服务器错误，请及时联系管理员或技术人员',
        duration: 2500
      })
      return Promise.reject(error)
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
