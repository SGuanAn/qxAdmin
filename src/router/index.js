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
          roles: [ 'SYSTEM_ALL', 'ROLE_MENU', 'USER_MENU']
        },
        children: [
          {
            path: 'role',
            component: () => import('@/views/system/role/index'),
            name: 'role',
            meta: {
              title: '角色管理',
              icon: 'permission',
              roles: [ 'ROLE_MENU']
            }
          },
          {
            path: 'user',
            component: () => import('@/views/system/user/index'),
            name: 'user',
            meta: {
              title: '用户管理',
              icon: 'peoples',
              roles: ['USER_MENU']
            }
          },
        ]
      },
      {
        path:'/personal',
        component: Layout,
        redirect: '/system',
        children:[
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
      //文件管理
      {
        path:'/file',
        component: Layout,
        redirect: '/file',
        children:[
          {
            path: '/file',
            component: () => import('@/views/file/index'),
            name: 'file',
            meta: {
              title: '文件管理',
              icon: 'file',
              roles: [ 'FILE_MENU']
            }
          }
        ]
      },
      {
        path: '/DataAll',
        component: Layout,
        redirect: '/',
        children: [
          {
            path: 'index',
            component: () => import('@/views/DataAll/index'),
            name: 'DataAll',
            meta: {
              title: '全部数据',
              icon: 'AllData',
              roles: [ 'DATAALL_MENU']
            }
          }
        ]
      },
      {
        path: '/NewData',
        component: Layout,
        redirect: '/',
        children: [
          {
            path: 'index',
            component: () => import('@/views/NewData/index'),
            name: 'NewData',
            meta: {
              total: 0,
              title: '领取数据',
              icon: 'NewData',
              roles: ['NEWDATA_MENU']
            }
          }
        ]
      },
      // 学历录入
      {
        path: '/Lnput',
        component: Layout,
        redirect: '/Lnput',
        children: [
          {
            path: 'learn_lnput',
            component: () => import('@/views/learnForm/index'),
            name: 'learnForm',
            meta: {
              title: '信息录入',
              icon: 'Customer_input',
              roles: [ 'LERAN_LNPUT_MENU' ]
            }
          }
        ]
      },
      //标准
      {
        path: '/standard',
        component: Layout,
        redirect: '/standard',
        alwaysShow: true, // 将始终显示根菜单
        meta: {
          title: '标准制',
          icon: 'standard',
          roles: [ 'STANDARD_MENU']
        },
        children: [
          {
            path: 'waitFor',
            component: () => import('@/views/standard/waitFor/index'),
            name: 'waitFor',
            meta: {
              total: 0,
              title: '待录客户',
              icon: 'student',
              roles: [ 'STANDARD_WAITFOR_MENU']
            }
          },
          {
            path: 'check',
            component: () => import('@/views/standard/check/index'),
            name: 'check',
            meta: {
              total: 0,
              title: '核对资料',
              icon: 'student',
              roles: [ 'STANDARD_CHECK_MENU']
            }
          },
          {
            path: 'inspect',
            component: () => import('@/views/standard/inspect/index'),
            name: 'inspect',
            meta: {
              total: 0,
              title: '已体检',
              icon: 'student',
              roles: [ 'STANDARD_INSPECT_MENU']
            }
          },
          {
            path: 'examine',
            component: () => import('@/views/standard/examine/index'),
            name: 'examine',
            meta: {
              total: 0,
              title: '一审',
              icon: 'student',
              roles: [ 'STANDARD_EXAMINE_MENU']
            }
          },
          {
            path: 'adopt',
            component: () => import('@/views/standard/adopt/index'),
            name: 'adopt',
            meta: {
              total: 0,
              title: '审批通过',
              icon: 'student',
              roles: [ 'STANDARD_ADOPT_MENU']
            }
          },
          {
            path: 'migration',
            component: () => import('@/views/standard/migration/index'),
            name: 'migration',
            meta: {
              total: 0,
              title: '办理准迁证',
              icon: 'student',
              roles: [ 'STANDARD_MIGRATION_MENU']
            }
          },
          {
            path: 'transfer',
            component: () => import('@/views/standard/transfer/index'),
            name: 'transfer',
            meta: {
              total: 0,
              title: '办理迁移证',
              icon: 'student',
              roles: [ 'STANDARD_TRANSFER_MENU']
            }
          },
          {
            path: 'CustomerID',
            component: () => import('@/views/standard/CustomerID/index'),
            name: 'CustomerID',
            meta: {
              total:0,
              title: '办理身份证',
              icon: 'student',
              roles: [ 'STANDARD_ID_MENU']
            }
          },
          {
            path: 'End',
            component: () => import('@/views/standard/End/index'),
            name: 'End',
            meta: {
              total: 0,
              title: '已办理完结',
              icon: 'student',
              roles: [ 'STANDARD_END_MENU']
            }
          }
        ]
      },
      //积分
      {
        path: '/Integral',
        component: Layout,
        redirect: '/Integral',
        alwaysShow: true, // 将始终显示根菜单
        meta: {
          title: '积分制',
          icon: 'Integral',
          roles: [ 'INTEGRAL_MENU']
        },
        children: [
          {
            path: 'Integral_waitFor',
            component: () => import('@/views/Integral/waitFor/index'),
            name: 'Integral_waitFor',
            meta: {
              total: 0,
              title: '待录客户',
              icon: 'student',
              roles: [ 'INTEGRAL_WAITFOR_MENU']
            }
          },
          {
            path: 'Integral_check',
            component: () => import('@/views/Integral/check/index'),
            name: 'Integral_check',
            meta: {
              total: 0,
              title: '核对资料',
              icon: 'student',
              roles: [ 'INTEGRAL_CHECK_MENU']
            }
          },
          {
            path: 'Integral_inspect',
            component: () => import('@/views/Integral/inspect/index'),
            name: 'Integral_inspect',
            meta: {
              total: 0,
              title: '已体检',
              icon: 'student',
              roles: [ 'INTEGRAL_INSPECT_MENU']
            }
          },
          {
            path: 'Integral_examine',
            component: () => import('@/views/Integral/examine/index'),
            name: 'Integral_examine',
            meta: {
              total: 0,
              title: '一审',
              icon: 'student',
              roles: [ 'INTEGRAL_EXAMINE_MENU']
            }
          },
          {
            path: 'Integral_adopt',
            component: () => import('@/views/Integral/adopt/index'),
            name: 'Integral_adopt',
            meta: {
              total: 0,
              title: '审批通过',
              icon: 'student',
              roles: [ 'INTEGRAL_ADOPT_MENU']
            }
          },
          {
            path: 'Integral_migration',
            component: () => import('@/views/Integral/migration/index'),
            name: 'Integral_migration',
            meta: {
              total: 0,
              title: '办理准迁证',
              icon: 'student',
              roles: [ 'INTEGRAL_MIGRATION_MENU']
            }
          },
          {
            path: 'Integral_transfer',
            component: () => import('@/views/Integral/transfer/index'),
            name: 'Integral_transfer',
            meta: {
              total: 0,
              title: '办理迁移证',
              icon: 'student',
              roles: [ 'INTEGRAL_TRANSFER_MENU']
            }
          },
          {
            path: 'Integral_CustomerID',
            component: () => import('@/views/Integral/CustomerID/index'),
            name: 'Integral_CustomerID',
            meta: {
              total: 0,
              title: '办理身份证',
              icon: 'student',
              roles: [ 'INTEGRAL_ID_MENU']
            }
          },
          {
            path: 'Integral_End',
            component: () => import('@/views/Integral/End/index'),
            name: 'Integral_End',
            meta: {
              total: 0,
              title: '已办理完结',
              icon: 'student',
              roles: [ 'INTEGRAL_END_MENU']
            }
          }
        ]
      },
      //留学生
      {
        path: '/Overseas',
        component: Layout,
        redirect: '/Overseas',
        alwaysShow: true, // 将始终显示根菜单
        meta: {
          total:0,
          title: '留学生',
          icon: 'Overseas',
          roles: [ 'OCERSEAS_MENU']
        },
        children: [
          {
            path: 'Overseas_waitFor',
            component: () => import('@/views/Overseas/waitFor/index'),
            name: 'Overseas_waitFor',
            meta: {
              total: 0,
              title: '待录客户',
              icon: 'student',
              roles: [ 'OCERSEAS_WAITFOR_MENU']
            }
          },
          {
            path: 'Overseas_check',
            component: () => import('@/views/Overseas/check/index'),
            name: 'Overseas_check',
            meta: {
              total: 0,
              title: '核对资料',
              icon: 'student',
              roles: [ 'OCERSEAS_CHECK_MENU']
            }
          },
          {
            path: 'Overseas_inspect',
            component: () => import('@/views/Overseas/quali/index'),
            name: 'Overseas_inspect',
            meta: {
              total: 0,
              title: '资格认证',
              icon: 'student',
              roles: [ 'OCERSEAS_QUALI_MENU']
            }
          },
          {
            path: 'Overseas_examine',
            component: () => import('@/views/Overseas/examine/index'),
            name: 'Overseas_examine',
            meta: {
              total: 0,
              title: '一审',
              icon: 'student',
              roles: [ 'OCERSEAS_EXAMINE_MENU']
            }
          },
          {
            path: 'Overseas_adopt',
            component: () => import('@/views/Overseas/adopt/index'),
            name: 'Overseas_adopt',
            meta: {
              total: 0,
              title: '审批通过',
              icon: 'student',
              roles: [ 'OCERSEAS_ADOPT_MENU']
            }
          },
          {
            path: 'Overseas_migration',
            component: () => import('@/views/Overseas/migration/index'),
            name: 'Overseas_migration',
            meta: {
              total: 0,
              title: '办理准迁证',
              icon: 'student',
              roles: [ 'OCERSEAS_MIGRATION_MENU']
            }
          },
          {
            path: 'Overseas_transfer',
            component: () => import('@/views/Overseas/transfer/index'),
            name: 'Overseas_transfer',
            meta: {
              total: 0,
              title: '办理迁移证',
              icon: 'student',
              roles: [ 'OCERSEAS_TRANSFER_MENU']
            }
          },
          {
            path: 'Overseas_CustomerID',
            component: () => import('@/views/Overseas/CustomerID/index'),
            name: 'Overseas_CustomerID',
            meta: {
              total: 0,
              title: '办理身份证',
              icon: 'student',
              roles: [ 'OCERSEAS_ID_MENU']
            }
          },
          {
            path: 'Overseas_End',
            component: () => import('@/views/Overseas/End/index'),
            name: 'Overseas_End',
            meta: {
              total: 0,
              title: '已办理完结',
              icon: 'student',
              roles: [ 'OCERSEAS_END_MENU']
            }
          }
        ]
      },
      //应届生
      {
        total:0,
        path: '/Freshmen',
        component: Layout,
        redirect: '/Freshmen',
        alwaysShow: true, // 将始终显示根菜单
        meta: {
          title: '应届生',
          icon: 'Freshmen',
          roles: [ 'FRESHMEN_MENU']
        },
        children: [
          {
            path: 'Freshmen_waitFor',
            component: () => import('@/views/Freshmen/waitFor/index'),
            name: 'Freshmen_waitFor',
            meta: {
              total: 0,
              title: '待录客户',
              icon: 'student',
              roles: [ 'FRESHMEN_WAITFOR_MENU']
            }
          },
          {
            path: 'Freshmen_check',
            component: () => import('@/views/Freshmen/check/index'),
            name: 'Freshmen_check',
            meta: {
              total: 0,
              title: '核对资料',
              icon: 'student',
              roles: [ 'FRESHMEN_CHECK_MENU']
            }
          },
          {
            path: 'Freshmen_inspect',
            component: () => import('@/views/Freshmen/report/index'),
            name: 'Freshmen_inspect',
            meta: {
              total: 0,
              title: '改派报到证中',
              icon: 'student',
              roles: [ 'FRESHMEN_REPORT_MENU']
            }
          },
          {
            path: 'Freshmen_online',
            component: () => import('@/views/Freshmen/online_report/index'),
            name: 'Freshmen_online',
            meta: {
              total: 0,
              title: '网上报道',
              icon: 'student',
              roles: [ 'FRESHMEN_ONLINE_MENU']
            }
          },
          {
            path: 'Freshmen_migration',
            component: () => import('@/views/Freshmen/migration/index'),
            name: 'Freshmen_migration',
            meta: {
              total: 0,
              title: '办理准迁证',
              icon: 'student',
              roles: [ 'FRESHMEN_MIGRATION_MENU']
            }
          },
          {
            path: 'Freshmen_transfer',
            component: () => import('@/views/Freshmen/transfer/index'),
            name: 'Freshmen_transfer',
            meta: {
              total: 0,
              title: '办理迁移证',
              icon: 'student',
              roles: [ 'FRESHMEN_TRANSFER_MENU']
            }
          },
          {
            path: 'Freshmen_CustomerID',
            component: () => import('@/views/Freshmen/CustomerID/index'),
            name: 'Freshmen_CustomerID',
            meta: {
              total: 0,
              title: '办理身份证',
              icon: 'student',
              roles: [ 'FRESHMEN_ID_MENU']
            }
          },
          {
            path: 'Freshmen_End',
            component: () => import('@/views/Freshmen/End/index'),
            name: 'Freshmen_End',
            meta: {
              total:0,
              title: '已办理完结',
              icon: 'student',
              roles: [ 'FRESHMEN_END_MENU']
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