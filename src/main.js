/*
 * @Author: Shber
 * @Date: 2022-10-27 11:33:13
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-27 17:42:46
 * @Description: 
 */
import { createSSRApp } from "vue";
import App from "./App.vue";
import Vconsole from 'vconsole'; // 移动端调试console
// import 'lib-flexible'; // 移动端rem适配
// if(process.env.NODE_ENV !== 'production'){new Vconsole()}



console.log(`~~~~main.js~~~~~~`);
// 为了保证数据的互不干扰，每次请求需要导出一个新的实例
export const createApp = () => {
    const app = createSSRApp(App);
    return { app };
}
