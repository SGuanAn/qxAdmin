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
        path: '/DataAll',
        component: Layout,
        redirect: '/DataAll',
        children: [
          {
            path: 'DataAll',
            component: () => import('@/views/DataAll/index'),
            name: 'DataAll',
            meta: {
              title: '所有客户',
              icon: 'student',
              roles: ['ADMIN', 'DATAALL_MENU']
            }
          }
        ]
      },
      {
        path: '/NewData',
        component: Layout,
        redirect: '/NewData',
        children: [
          {
            path: 'NewData',
            component: () => import('@/views/NewData/index'),
            name: 'NewData',
            meta: {
              title: '新进客户',
              icon: 'student',
              roles: ['ADMIN', 'NEWDATA_MENU']
            }
          }
        ]
      },
      {
        path: '/standard',
        component: Layout,
        redirect: '/standard',
        alwaysShow: true, // 将始终显示根菜单
        meta: {
          title: '标准制',
          icon: 'liuchen',
          roles: ['ADMIN']
        },
        children: [
          {
            path: 'waitFor',
            component: () => import('@/views/standard/waitFor/index'),
            name: 'waitFor',
            meta: {
              title: '代录客户',
              icon: 'student',
              roles: ['ADMIN', 'WAITFOR_MENU']
            }
          },
          {
            path: 'check',
            component: () => import('@/views/standard/check/index'),
            name: 'check',
            meta: {
              title: '核对资料',
              icon: 'student',
              roles: ['ADMIN', 'CHECK_MENU']
            }
          },
          {
            path: 'inspect',
            component: () => import('@/views/standard/inspect/index'),
            name: 'inspect',
            meta: {
              title: '已体检',
              icon: 'student',
              roles: ['ADMIN', 'INSPECT_MENU']
            }
          },
          {
            path: 'examine',
            component: () => import('@/views/standard/examine/index'),
            name: 'examine',
            meta: {
              title: '一审',
              icon: 'student',
              roles: ['ADMIN', 'EXAMINE_MENU']
            }
          },
          {
            path: 'adopt',
            component: () => import('@/views/standard/adopt/index'),
            name: 'adopt',
            meta: {
              title: '审批同意',
              icon: 'student',
              roles: ['ADMIN', 'ADOPT_MENU']
            }
          },
          {
            path: 'migration',
            component: () => import('@/views/standard/migration/index'),
            name: 'migration',
            meta: {
              title: '办理准迁证',
              icon: 'student',
              roles: ['ADMIN', 'MIGRATION_MENU']
            }
          },
          {
            path: 'transfer',
            component: () => import('@/views/standard/transfer/index'),
            name: 'transfer',
            meta: {
              title: '办理迁移证',
              icon: 'student',
              roles: ['ADMIN', 'TRANSFER_MENU']
            }
          },
          {
            path: 'CustomerID',
            component: () => import('@/views/standard/CustomerID/index'),
            name: 'CustomerID',
            meta: {
              title: '办理身份证',
              icon: 'student',
              roles: ['ADMIN', 'ID_MENU']
            }
          },
          {
            path: 'End',
            component: () => import('@/views/standard/End/index'),
            name: 'End',
            meta: {
              title: '已办理完结',
              icon: 'student',
              roles: ['ADMIN', 'END_MENU']
            }
          }
        ]
      },
      {
        path: '/Integral',
        component: Layout,
        redirect: '/Integral',
        alwaysShow: true, // 将始终显示根菜单
        meta: {
          title: '积分制',
          icon: 'liuchen',
          roles: ['ADMIN']
        },
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