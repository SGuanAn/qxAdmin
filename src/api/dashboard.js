import request from '@/utils/request'

//我的数据
export function MyData(query) {
  return request({
    url: '/dashboard/MyData',
    method: 'get',
    params: query
  })
}

//完成总数
export function Label() {
    return request({
      url: '/dashboard/Label',
      method: 'get'
    })
}

//新录客户
export function NewData() {
    return request({
      url: '/dashboard/newData',
      method: 'get'
    })
}

//数据详情
export function Details() {
    return request({
      url: '/dashboard/details',
      method: 'get',
    })
}
