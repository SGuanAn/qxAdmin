import request from '@/utils/request'

// 获取所有的按钮权限树
export function getPermissionTree() {
  return request({
    url: '/permissions/tree',
    method: 'get'
  })
}

// 获取角色所有权限
export function getRolePower() {
  return request({
    url: '/roles/power',
    method: 'get'
  })
}

// 编辑角色权限
export function editPermission(data) {
  return request({
    url: '/edit/power',
    method: 'put',
    data
  })
}
