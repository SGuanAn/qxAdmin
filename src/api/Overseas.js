import request from '@/utils/request'

// 查询列表
export function WaitList(query) {
    return request({
      url: '/overseas/waitList',
      method: 'get',
      params: query
    })
}

//核对资料 => 列表
export function checkList(query) {
    return request({
        url: '/overseas/checkList',
        method: 'get',
        params: query
    })
}

//资格认证 => 列表
export function qualiList(query) {
    return request({
        url: '/overseas/qualiList',
        method: 'get',
        params: query
    })
}

//一审 => 列表
export function ExamineList(query) {
    return request({
        url: '/overseas/examineList',
        method: 'get',
        params: query
    })
}

//审批通过 => 列表
export function AdoptList(query) {
    return request({
        url: '/overseas/adoptList',
        method: 'get',
        params: query
    })
}

//办理准迁证 => 列表
export function MigrationList(query) {
    return request({
        url: '/overseas/migrationList',
        method: 'get',
        params: query
    })
}

//办理迁移证 => 列表
export function TransferList(query) {
    return request({
        url: '/overseas/transferList',
        method: 'get',
        params: query
    })
}

//办理身份证 => 列表
export function CustomerList(query) {
    return request({
        url: '/overseas/customerList',
        method: 'get',
        params: query
    })
}

//已办理完结 => 列表
export function EndList(query) {
    return request({
        url: '/overseas/endList',
        method: 'get',
        params: query
    })
}

//步骤 => 核对资料
export function checkData(data) {
    return request({
        url: '/overseas/checkData',
        method: 'post',
        data
    })
}

//步骤 => 资格认证
export function qualiData(data) {
    return request({
        url: '/overseas/quali',
        method: 'post',
        data
    })
}

//步骤 => 一审
export function ExamineData(data) {
    return request({
        url: '/overseas/examine',
        method: 'post',
        data
    })
}

//步骤 => 审批通过
export function AdoptData(data) {
    return request({
        url: '/overseas/adopt',
        method: 'post',
        data
    })
}

//步骤 => 办理准迁证
export function MigrationData(data) {
    return request({
        url: '/overseas/migration',
        method: 'post',
        data
    })
}

//步骤 => 办理迁移证
export function TransferData(data) {
    return request({
        url: '/overseas/transfer',
        method: 'post',
        data
    })
}

//步骤 => 办理身份证
export function CustomerData(data) {
    return request({
        url: '/overseas/customer',
        method: 'post',
        data
    })
}

//步骤 => 已办理完结
export function EndData(data) {
    return request({
        url: '/overseas/end',
        method: 'post',
        data
    })
}

//转出
export function branchData(data) {
    return request({
      url: '/overseas/branch',
      method: 'post',
      data
    })
}

//退费
export function RefundData(data) {
    return request({
        url: '/overseas/refund',
        method: 'post',
        data
    })
}

