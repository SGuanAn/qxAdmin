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
      method: 'post',
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

// 领取
export function receiveData(data) {
  return request({
      url: '/alldata/receive',
      method: 'post',
      data
  })
}

//分配
export function branchData(data) {
  return request({
    url: '/alldata/branch',
    method: 'post',
    data
  })
}

//导入 Excel
export function ImportExcel(data) {
  return request({
    url: '/alldata/excel',
    method: 'post',
    data
  })
}