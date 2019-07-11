import request from '@/utils/request'

// 添加
export function addData(data) {
    return request({
        url: '/wait/add',
        method: 'post',
        data
    })
}

// 查询列表
export function getList(query) {
    return request({
      url: '/wait/getList',
      method: 'get',
      params: query
    })
}

