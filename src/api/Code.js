import request from '@/utils/request'

// 验证码
export function getCode() {
    return request({
        url: '/code',
        method: 'get'
    })
}
