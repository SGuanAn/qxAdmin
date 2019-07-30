import request from '@/utils/request'

// 领取用户数据列表
export function getList(query) {
    return request({
        url: '/Receive/listData',
        method: 'get',
        params: query
    })
}
