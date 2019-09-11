import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Decrypt, Encrypt } from '@/utils/rsaEncrypt'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  user: {},
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password, code } = userInfo
    return new Promise((resolve, reject) => {
      //{ username: username.trim(), password: password, code: code }
      login({data: Encrypt(userInfo)}).then(response => {
        const data = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const data = Decrypt(response.data) // 解密
        if(data){
          const { usernames, avatar } = data
          const roles = Decrypt(response.permission) // 解密
          if (roles && roles.length > 0) { // 验证返回的菜单是否是一个非空数组
            commit('SET_ROLES', roles)
          } else {
            reject('获取权限失败，请重新登录或联系管理员！！')
          }
          commit('SET_USER', data)
          commit('SET_NAME', usernames)
          commit('SET_AVATAR', avatar)
          resolve(response)
        } else {
          reject('返回用户信息为空！！')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户注销
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

