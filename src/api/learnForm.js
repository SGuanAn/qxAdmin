import request from '@/utils/request'

// 添加
export function addData(data)
{
    return request({
        url: '/learnForm/add',
        method: 'post',
        data
    })
}

// 删除
export function deleteData(data) {
    return request({
      url: '/learnForm/delete',
      method: 'post',
      data
    })
}

// 更新
export function editData(data) {
    return request({
      url: '/learnForm/edit',
      method: 'put',
      data
    })
}

// 列表
export function getList(query) {
    return request({
      url: '/learnForm/getList',
      method: 'get',
      params: query
    })
}

//导入 Excel
export function ImportExcel(data) {
    return request({
        url: '/learnForm/excel',
        method: 'post',
        data
    })
}
