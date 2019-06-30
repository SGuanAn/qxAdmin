import request from '@/utils/request'

//成考
export function ChengK(data) {
    return request({
        url: '/student/chengkao',
        method: 'post',
        data
    })
}

//成考 删除
export function deleteChengK(data) {
    return request({
      url: '/student/deleteChengK',
      method: 'delete',
      data
    })
}

//成考  编辑
export function editChengK(data) {
    return request({
      url: '/student/editChengK',
      method: 'put',
      data
    })
}

//获取 全部 成考 学员
export function getChengK(query) {
    return request({
      url: '/student/ChengKAll',
      method: 'get',
      params: query
    })
}