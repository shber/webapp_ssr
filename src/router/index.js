/*
 * @Author: Shber
 * @Date: 2022-10-27 14:46:30
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-31 15:39:29
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