import request from '@/utils/request'

//广开
export function Guangk(data) {
  return request({
    url: '/student/guangkai',
    method: 'post',
    data
  })
}

//广开 删除
export function deleteGuangk(data) {
    return request({
      url: '/student/deleteGuangk',
      method: 'delete',
      data
    })
}

//广开  编辑
export function editGuangk(data) {
    return request({
      url: '/student/editGuangk',
      method: 'put',
      data
    })
}

//获取 全部广开学员
export function getGuangk(query) {
    return request({
      url: '/student/GuangkAll',
      method: 'get',
      params: query
    })
}

//国开
export function GuoK(data) {
    return request({
        url: '/student/guokai',
        method: 'post',
        data
    })
}

//国开 删除
export function deleteGuoK(data) {
    return request({
      url: '/student/deleteGuoK',
      method: 'delete',
      data
    })
}

//国开  编辑
export function editGuoK(data) {
    return request({
      url: '/student/editGuoK',
      method: 'put',
      data
    })
}

//获取 全部国开学员
export function getGuoK(query) {
    return request({
      url: '/student/GuoKAll',
      method: 'get',
      params: query
    })
}
