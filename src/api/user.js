import request from '@/utils/request'

//用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

//获取用户信息
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

//用户注销
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

//获取用户列表
export function getUsers(query){
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

//删除用户
export function deleteUser(id){
  return request({
    url: `/deleteUser/${id}`,
    method: 'delete'
  })
}

//添加用户
export function addUser(data){
  return request({
    url: '/user/adduser',
    method: 'post',
    data
  })
}

//更新用户信息
export function editUser(data){
  return request({
    url: '/user/editUser',
    method: 'put',
    data
  })
}

//验证密码
export function validPass(data) {
  return request({
    url: '/user/validPass',
    method: 'post',
    data
  })
}

//修改密码
export function updatePass(from) {
  const data = {
    password: from.confirmPass,
    username: from.username,
  }
  return request({
    url: '/user/updatePass',
    method: 'put',
    data
  })
}