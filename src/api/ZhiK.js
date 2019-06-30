import request from '@/utils/request'

//自考
export function ZhiK(data) {
    return request({
        url: '/student/zhikao',
        method: 'post',
        data
    })
}

//自考 删除
export function deleteZhiK(data) {
    return request({
      url: '/student/deleteZhiK',
      method: 'delete',
      data
    })
}

//自考  编辑
export function editZhiK(data) {
    return request({
      url: '/student/editZhiK',
      method: 'put',
      data
    })
}

//获取 全部 自考 学员
export function getZhiK(query) {
    return request({
      url: '/student/ZhiKAll',
      method: 'get',
      params: query
    })
}