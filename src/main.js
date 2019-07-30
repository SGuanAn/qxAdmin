import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS重置替代

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // 中文elementui

import '@/styles/index.scss' // 全局CSS

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 权限控制
import vueJsonp from 'vue-jsonp'
Vue.use(vueJsonp)

// 将elementui lang设置为zh-CN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
