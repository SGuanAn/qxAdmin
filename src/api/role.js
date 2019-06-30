import request from '@/utils/request'

//查询分页  角色
export function getAll(query) {
  return request({
    url: '/roles',
    method: 'get',
    params: query
  })
}

//获取所有角色
export function getRoles() {
  return request({
    url: '/roleAll',
    method: 'get'
  })
}

//删除角色
export function deleteRole(id){
  return request({
    url:`/delete/roles/${id}`,
    method:'delete'
  })
}

//添加角色
export function addRole(data){
  return request({
    url: '/role/addrole',
    method: 'post',
    data
  })
}

//编辑角色
export function editRole(data){
  return request({
    url: '/role/editRole',
    method: 'put',
    data
  })
}