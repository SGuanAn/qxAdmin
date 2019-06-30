const baseURL = process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 图片上传
    imagesUploadApi: baseURL + '/pictures',
    // 修改头像
    updateAvatarApi: baseURL + '/user/updateAvatar',
    // 上传文件到七牛云
    qiNiuUploadApi: baseURL + '/qiNiuContent',
  }
}

export default api
