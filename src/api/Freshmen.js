import request from '@/utils/request'

// 查询列表
export function WaitList(query) {
    return request({
      url: '/Freshmen/waitList',
      method: 'get',
      params: query
    })
}

//核对资料 => 列表
export function checkList(query) {
    return request({
        url: '/Freshmen/checkList',
        method: 'get',
        params: query
    })
}

//改派报到证中 => 列表
export function ReportList(query) {
    return request({
        url: '/Freshmen/reportList',
        method: 'get',
        params: query
    })
}

//网上报道 => 列表
export function OnlineList(query) {
    return request({
        url: '/Freshmen/onlineList',
        method: 'get',
        params: query
    })
}

//办理准迁证 => 列表
export function MigrationList(query) {
    return request({
        url: '/Freshmen/migrationList',
        method: 'get',
        params: query
    })
}

//办理迁移证 => 列表
export function TransferList(query) {
    return request({
        url: '/Freshmen/transferList',
        method: 'get',
        params: query
    })
}

//办理身份证 => 列表
export function CustomerList(query) {
    return request({
        url: '/Freshmen/customerList',
        method: 'get',
        params: query
    })
}

//已办理完结 => 列表
export function EndList(query) {
    return request({
        url: '/Freshmen/endList',
        method: 'get',
        params: query
    })
}

//步骤 => 核对资料
export function checkData(data) {
    return request({
        url: '/Freshmen/checkData',
        method: 'post',
        data
    })
}

//步骤 => 改派报到证中
export function ReportData(data) {
    return request({
        url: '/Freshmen/report',
        method: 'post',
        data
    })
}

//步骤 => 网上报道
export function OnlineData(data) {
    return request({
        url: '/Freshmen/online',
        method: 'post',
        data
    })
}

//步骤 => 办理准迁证
export function MigrationData(data) {
    return request({
        url: '/Freshmen/migration',
        method: 'post',
        data
    })
}

//步骤 => 办理迁移证
export function TransferData(data) {
    return request({
        url: '/Freshmen/transfer',
        method: 'post',
        data
    })
}

//步骤 => 办理身份证
export function CustomerData(data) {
    return request({
        url: '/Freshmen/customer',
        method: 'post',
        data
    })
}

//步骤 => 已办理完结
export function EndData(data) {
    return request({
        url: '/Freshmen/end',
        method: 'post',
        data
    })
}

//转出
export function branchData(data) {
    return request({
      url: '/Freshmen/branch',
      method: 'post',
      data
    })
}

//退费
export function RefundData(data) {
    return request({
        url: '/Freshmen/refund',
        method: 'post',
        data
    })
}
