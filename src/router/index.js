/*
 * @Author: Shber
 * @Date: 2022-10-27 14:46:30
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-10 17:11:02
 * @Description: 
 */
import {
  createRouter as createVueRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router';

export const createRouter = (type) =>
  createVueRouter({
    history: type === 'client' ? createWebHistory() : createMemoryHistory(),

    routes: [
      {
        path: '/',
        name: 'index',
        meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/views/home.vue')
      },
      {
        path: '/test',
        name:'test',
        component: () => import('@/views/testpage/index.vue'),
        meta: { title: '路径跳转' }
      },
      {
        path: '/test1',
        name:'test1',
        component: () => import('@/views/testpage/index1.vue'),
        meta: { title: '路径跳转' }
      },
      { // 自定义表单
        path: '/form/:id',
        name:'form',
        component: () => import('@/views/form/index.vue'),
        meta: { title: '名厨MINGCHU' }
      },
      {
        path: '/themeview',
        name:'form',
        component: () => import('@/views/themeview/index.vue'),
        meta: { title: '主题详情' }
      },
      {
        path: '/homessr',
        name: 'homessr',
        component: () => import('@/views/homessr/index.vue'),
        redirect: '/homessr/home',
        children: [
          {
            path: 'home', // 寻新计划主页
            name: 'home',
            component: () => import('@/views/homessr/home/index.vue'),
            meta: { title: '寻新计划' }
          },
          {
            path: 'works', // 寻新计划主页
            name: 'works',
            component: () => import('@/views/homessr/worksList/index.vue'),
            meta: { title: '寻新计划' }
          },
        ]
      }
    ]
  });