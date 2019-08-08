import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import api from './modules/api'
import settings from './modules/settings'
import user from './modules/user'
import search from './modules/search'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import file from './modules/file'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    api,
    settings,
    tagsView,
    search,
    permission,
    user,
    file
  },
  getters
})

export default store
