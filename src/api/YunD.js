import request from '@/utils/request'

//云大
export function YunD(data) {
    return request({
        url: '/student/yunda',
        method: 'post',
        data
    })
}

//云大 删除
export function deleteYunD(data) {
    return request({
      url: '/student/deleteYunD',
      method: 'delete',
      data
    })
}

//云大  编辑
export function editYunD(data) {
    return request({
      url: '/student/editYunD',
      method: 'put',
      data
    })
}

//获取 全部 云大 学员
export function getYunD(query) {
    return request({
      url: '/student/YunDAll',
      method: 'get',
      params: query
    })
}