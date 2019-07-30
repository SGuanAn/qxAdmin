import request from '@/utils/request'

//读取文件夹
export function getAll(query) {
    return request({
        url: '/FileManage/all',
        method: 'get',
        params: query
    })
}
