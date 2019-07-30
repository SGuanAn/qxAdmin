import request from '@/utils/request'

// 查询列表
export function WaitList(query) {
    return request({
      url: '/standard/waitList',
      method: 'get',
      params: query
    })
}

//核对资料 => 列表
export function checkList(query) {
    return request({
        url: '/standard/checkList',
        method: 'get',
        params: query
    })
}

//已体检 => 列表
export function InspectList(query) {
    return request({
        url: '/standard/inspectList',
        method: 'get',
        params: query
    })
}

//一审 => 列表
export function ExamineList(query) {
    return request({
        url: '/standard/examineList',
        method: 'get',
        params: query
    })
}

//审批通过 => 列表
export function AdoptList(query) {
    return request({
        url: '/standard/adoptList',
        method: 'get',
        params: query
    })
}

//办理准迁证 => 列表
export function MigrationList(query) {
    return request({
        url: '/standard/migrationList',
        method: 'get',
        params: query
    })
}

//办理迁移证 => 列表
export function TransferList(query) {
    return request({
        url: '/standard/transferList',
        method: 'get',
        params: query
    })
}

//办理身份证 => 列表
export function CustomerList(query) {
    return request({
        url: '/standard/customerList',
        method: 'get',
        params: query
    })
}

//已办理完结 => 列表
export function EndList(query) {
    return request({
        url: '/standard/endList',
        method: 'get',
        params: query
    })
}

//步骤 => 核对资料
export function checkData(data) {
    return request({
        url: '/standard/checkData',
        method: 'post',
        data
    })
}

//步骤 => 已体检
export function InspectData(data) {
    return request({
        url: '/standard/inspect',
        method: 'post',
        data
    })
}

//步骤 => 一审
export function ExamineData(data) {
    return request({
        url: '/standard/examine',
        method: 'post',
        data
    })
}

//步骤 => 审批通过
export function AdoptData(data) {
    return request({
        url: '/standard/adopt',
        method: 'post',
        data
    })
}

//步骤 => 办理准迁证
export function MigrationData(data) {
    return request({
        url: '/standard/migration',
        method: 'post',
        data
    })
}

//步骤 => 办理迁移证
export function TransferData(data) {
    return request({
        url: '/standard/transfer',
        method: 'post',
        data
    })
}

//步骤 => 办理身份证
export function CustomerData(data) {
    return request({
        url: '/standard/customer',
        method: 'post',
        data
    })
}

//步骤 => 已办理完结
export function EndData(data) {
    return request({
        url: '/standard/end',
        method: 'post',
        data
    })
}

//转出
export function branchData(data) {
    return request({
      url: '/standard/branch',
      method: 'post',
      data
    })
}

//退费
export function RefundData(data) {
    return request({
        url: '/standard/refund',
        method: 'post',
        data
    })
}
