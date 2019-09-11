const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  user: state => state.user.user,
  roles: state => state.user.roles,
  UploadDataApi: state => state.api.UploadDataApi,
  updateAvatarApi: state => state.api.updateAvatarApi,
  permission_routers: state => state.permission.routes,
  addRouters: state => state.permission.addRouters,
  GET_VAL:state => state.search.keyword,
  FILE_PATH:state => state.file.fliePath
}
export default getters
