import request from '@/utils/request'

// 查询列表
export function WaitList(query) {
    return request({
      url: '/Integral/waitList',
      method: 'get',
      params: query
    })
}

//核对资料 => 列表
export function checkList(query) {
    return request({
        url: '/Integral/checkList',
        method: 'get',
        params: query
    })
}

//已体检 => 列表
export function InspectList(query) {
    return request({
        url: '/Integral/inspectList',
        method: 'get',
        params: query
    })
}

//一审 => 列表
export function ExamineList(query) {
    return request({
        url: '/Integral/examineList',
        method: 'get',
        params: query
    })
}

//审批通过 => 列表
export function AdoptList(query) {
    return request({
        url: '/Integral/adoptList',
        method: 'get',
        params: query
    })
}

//办理准迁证 => 列表
export function MigrationList(query) {
    return request({
        url: '/Integral/migrationList',
        method: 'get',
        params: query
    })
}

//办理迁移证 => 列表
export function TransferList(query) {
    return request({
        url: '/Integral/transferList',
        method: 'get',
        params: query
    })
}

//办理身份证 => 列表
export function CustomerList(query) {
    return request({
        url: '/Integral/customerList',
        method: 'get',
        params: query
    })
}

//已办理完结 => 列表
export function EndList(query) {
    return request({
        url: '/Integral/endList',
        method: 'get',
        params: query
    })
}

//步骤 => 核对资料
export function checkData(data) {
    return request({
        url: '/Integral/checkData',
        method: 'post',
        data
    })
}

//步骤 => 已体检
export function InspectData(data) {
    return request({
        url: '/Integral/inspect',
        method: 'post',
        data
    })
}

//步骤 => 一审
export function ExamineData(data) {
    return request({
        url: '/Integral/examine',
        method: 'post',
        data
    })
}

//步骤 => 审批通过
export function AdoptData(data) {
    return request({
        url: '/Integral/adopt',
        method: 'post',
        data
    })
}

//步骤 => 办理准迁证
export function MigrationData(data) {
    return request({
        url: '/Integral/migration',
        method: 'post',
        data
    })
}

//步骤 => 办理迁移证
export function TransferData(data) {
    return request({
        url: '/Integral/transfer',
        method: 'post',
        data
    })
}

//步骤 => 办理身份证
export function CustomerData(data) {
    return request({
        url: '/Integral/customer',
        method: 'post',
        data
    })
}

//步骤 => 已办理完结
export function EndData(data) {
    return request({
        url: '/Integral/end',
        method: 'post',
        data
    })
}

//转出
export function branchData(data) {
    return request({
      url: '/Integral/branch',
      method: 'post',
      data
    })
}

//退费
export function RefundData(data) {
    return request({
        url: '/Integral/refund',
        method: 'post',
        data
    })
}
