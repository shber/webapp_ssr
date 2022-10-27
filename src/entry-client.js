/*
 * @Author: Shber
 * @Date: 2022-10-27 11:39:20
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-27 14:49:14
 * @Description: 
 */
import { createApp } from "./main"
import { createRouter } from './router/index';
const router = createRouter('client');

const { app } = createApp();

app.use(router);

router.isReady().then(() => {
  app.mount('#app', true);
});