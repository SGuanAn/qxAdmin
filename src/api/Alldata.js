import request from '@/utils/request'

// 添加
export function addData(data) {
    return request({
        url: '/alldata/add',
        method: 'post',
        data
    })
}

// 删除
export function deleteData(data) {
    return request({
      url: '/alldata/delete',
      method: 'delete',
      data
    })
}

// 更新
export function editData(data) {
    return request({
      url: '/alldata/edit',
      method: 'put',
      data
    })
}

// 列表
export function getList(query) {
    return request({
      url: '/alldata/getList',
      method: 'get',
      params: query
    })
}