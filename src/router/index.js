/*
 * @Author: Shber
 * @Date: 2022-10-27 14:46:30
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-02 16:05:33
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
      { // 自定义表单
        path: '/test',
        name:'test',
        component: () => import('@/views/testpage/index.vue'),
        meta: { title: '路径跳转' }
      },
      { // 自定义表单
        path: '/form/:id',
        name:'form',
        component: () => import('@/views/form/index.vue'),
        meta: { title: '名厨MINGCHU' }
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