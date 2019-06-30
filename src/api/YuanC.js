import request from '@/utils/request'

//远程
export function YuanC(data) {
    return request({
        url: '/student/yauncheng',
        method: 'post',
        data
    })
}

//远程 删除
export function deleteYuanC(data) {
    return request({
      url: '/student/deleteYuanC',
      method: 'delete',
      data
    })
}

//远程  编辑
export function editYuanC(data) {
    return request({
      url: '/student/editYuanC',
      method: 'put',
      data
    })
}

//获取 全部 远程 学员
export function getYuanC(query) {
    return request({
      url: '/student/YuanCAll',
      method: 'get',
      params: query
    })
}