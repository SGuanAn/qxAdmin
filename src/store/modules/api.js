const baseURL = process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 文件上传
    UploadDataApi: baseURL + '/FileManage/uploadData',
    // 修改头像
    updateAvatarApi: baseURL + '/user/updateAvatar',
    // 上传文件到七牛云
    qiNiuUploadApi: baseURL + '/qiNiuContent',
  }
}

export default api
