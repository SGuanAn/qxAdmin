import axios from 'axios'
import { Message, Notification, MessageBox } from 'element-ui'
import store from '@/store/index'
import { getToken } from '@/utils/auth'
import { encrypt } from '@/utils/rsaEncrypt'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // 跨域请求时发送cookie
  timeout: 8000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Token'] = getToken()
    }
    // config.data = encrypt(config.data)
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

    // 所有错误信息
    if (res.code !== 200) {

      // 处理后台返回的一些警告信息（根据后台可删除）
      if(res.code !== -200 && res.code !== 50014) {
        return res
      }

      if(res.code === -200) {
        Notification.error({
          title: res.msg
        })
      }

      const hasRoles = store.getters.roles && store.getters.roles.length > 0 // 用户是否已登录拉取信息
      // token 过期处理（在登录页不执行）
      if(res.code === 50014 && hasRoles)
      {
        MessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            closeOnClickModal: false,
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload() // 重新实例化vue-router对象 避免bug
          })
        })
      }

      return Promise.reject(res.msg || 'error')

    } else {
      return res
    }
  },
  error => {
    let code = 0;
    try{
      code = error.response.data.status
    } catch (e) {
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
