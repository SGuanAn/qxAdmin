import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }]
    }
  ]
  
  /**
   * 异步路由
   * 需要根据用户角色动态加载的路由
   */
  export const asyncRoutes = [
    {
        path: '/system',
        component: Layout,
        redirect: '/system',
        alwaysShow: true, // 将始终显示根菜单
        meta: {
          title: '系统管理',
          icon: 'system',
          roles: ['ADMIN', 'SYSTEM_ALL', 'ROLE_MENU', 'USER_MENU']
        },
        children: [
          {
            path: 'role',
            component: () => import('@/views/system/role/index'),
            name: 'role',
            meta: {
              title: '角色管理',
              icon: 'permission',
              roles: ['ADMIN', 'ROLE_MENU']
            }
          },
          {
            path: 'user',
            component: () => import('@/views/system/user/index'),
            name: 'user',
            meta: {
              title: '用户管理',
              icon: 'peoples',
              roles: ['ADMIN', 'USER_MENU']
            }
          },
          {
            path: '/user/personal',
            hidden: true,
            component: () => import('@/views/system/user/personal'),
            name: 'personal',
            meta: {
              title: '个人中心',
              icon: 'peoples',
            }
          }
        ]
      },
      {
        path: '/Learn',
        component: Layout,
        redirect: '/Learn',
        alwaysShow: true, // 将始终显示根菜单
        meta: {
          title: '形式学历',
          icon: 'doctor',
          roles: ['ADMIN', 'LEARN_ALL', 'GUANKAI_MENU', 'GUOKAI_MENU', 'YUANC_MENU', 'HAIKE_MENU', 'YUNDA_MENU', 'CHENK_MENU', 'ZHIKAO_MENU']
        },
        children: [
          {
            path: 'guangkai',
            component: () => import('@/views/Learn/guangkai/index'),
            name: 'guangkai',
            meta: {
              title: '广开学员列表',
              icon: 'student',
              roles: ['ADMIN', 'GUANKAI_MENU']
            }
          }
        ]
      },
    // 404
    { path: '*', redirect: '/404', hidden: true }
  ]
  
  const createRouter = () => new Router({
    // mode: 'history', // 需要服务支持
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
  
  const router = createRouter()
  export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // 重置路由器
  }
  
  export default router