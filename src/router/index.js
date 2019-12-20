import Vue from 'vue'
import Router from 'vue-router'

// 新增
import HomeView from '@/components/common/Home'
import NotFoundView from '@/components/views/404'
import DashboardView from '@/components/views/Dashboard'
import LoginView from '@/components/views/Login'

// 系统设置
import staffManagementView from '@/components/views/SystemManagement/staffManagement'
import enterpriseManagementView from '@/components/views/SystemManagement/enterpriseManagement'
Vue.use(Router)

export default new Router({
  mode: 'history', // 开发环境
  // mode: 'hash', // 部署环境
  routes: [{
      path: '/login',
      component: LoginView
    },
    {
      path: '/',
      component: HomeView,
      meta: {
        title: '公共组件'
      },
      children: [{
          path: '/dashboard',
          component: DashboardView,
          alias: '',
          meta: {
            title: '系统首页'
          },
          // beforeEnter: (to, from, next) => {
          // 	if (this.$store.state.TOKEN === null) {
          // 		next({ path: '/login' })
          // 	} else {
          // 		next()
          // 	}
          // },
        },
        {
          path: '/staffManagement',
          component: staffManagementView,
          meta: {
            title: '考勤审核'
          }
        },
        {
          path: '/enterpriseManagement',
          component: enterpriseManagementView,
          meta: {
            title: '考勤录入'
          }
        },
        {
          path: '/404',
          component: NotFoundView,
          meta: {
            title: '404'
          }
        }
      ]
    }
  ]
})
