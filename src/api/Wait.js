import request from '@/utils/request'

// 领取
export function addData(data) {
    return request({
        url: '/wait/add',
        method: 'post',
        data
    })
}



