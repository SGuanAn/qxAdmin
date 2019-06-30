import request from '@/utils/request'

//获取全部菜单树
export function getMenuTree() {
  return request({
    url: '/menu/tree',
    method: 'get'
  })
}

//获取角色路由
export function roleMenus() {
  return request({
    url: '/role/menus',
    method: 'get'
  })
}
