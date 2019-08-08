import request from '@/utils/request'

//读取文件夹
export function getAll(query) {
    return request({
        url: '/FileManage/all',
        method: 'get',
        params: query
    })
}

//创建文件夹
export function createFolder(data) {
    return request({
        url: '/FileManage/createFolder',
        method: 'post',
        data
    })
}

//上传
export function uploadData(data) {
    return request({
        url: '/FileManage/uploadData',
        method : 'post',
        data
    })
}

//重命名
export function renameFile( path, oldName, newName) {
    const data = {
        path:path,
        oldName: oldName,
        newName: newName
    }
    return request({
        url: '/FileManage/renameFile',
        method : 'post',
        data
    })
}

//删除文件
export function deleteFile(path) {
    const data = {
        path:path
    }
    return request({
        url: '/FileManage/deleteFile',
        method : 'post',
        data
    })
}

