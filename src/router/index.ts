import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 重定向
    {
      path: '/',
      redirect: '/schedule'
    },
    // 英语学习
    {
      path: '/english',
      name: 'English',
      component: () => import('../views/English/index.vue'),
      meta: {
        title: '英语学习'
      }
    },
    // 日志管理
    {
      path: '/logs',
      name: 'Logs',
      component: () => import('../views/Logs/index.vue'),
      meta: {
        title: '英语学习'
      }
    },
    // 图片管理
    {
      path: '/image',
      name: 'Image',
      component: () => import('../views/Images/index.vue'),
      meta: {
        title: '图片管理'
      }
    },
    // 睡眠管理
    {
      path: '/bedtime',
      name: 'BedTime',
      component: () => import('../views/BedTime/index.vue'),
      meta: {
        title: '睡眠管理'
      }
    },
    // 激励模块
    {
      path: '/boost',
      name: 'Boost',
      component: () => import('../views/Boost/index.vue'),
      meta: {
        title: '激励模块'
      }
    },
    // 博客模块
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('../views/Study/index.vue'),
      meta: {
        title: '博客模块'
      }
    },
    // 工作计划
    {
      path: '/schedule',
      name: 'Schedule',
      component: () => import('../views/Schedule/index.vue'),
      meta: {
        title: '工作日志'
      }
    },
    // 收支功能
    {
      path: '/money',
      name: 'Money',
      component: () => import('../views/Money/index.vue'),
      meta: {
        title: '收支功能'
      }
    },
    // 健身
    {
      path: '/fitness',
      name: 'Fitness',
      component: () => import('../views/Fitness/index.vue'),
      meta: {
        title: '健身'
      }
    }
  ]
})

export default router
