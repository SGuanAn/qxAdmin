import request from '@/utils/request'

//海科
export function HaiKe(data) {
    return request({
        url: '/student/haike',
        method: 'post',
        data
    })
}

//海科 删除
export function deleteHaiKe(data) {
    return request({
      url: '/student/deleteHaiKe',
      method: 'delete',
      data
    })
}

//海科  编辑
export function editHaiKe(data) {
    return request({
      url: '/student/editHaiKe',
      method: 'put',
      data
    })
}

//获取 全部 海科 学员
export function getHaiKe(query) {
    return request({
      url: '/student/HaiKeAll',
      method: 'get',
      params: query
    })
}