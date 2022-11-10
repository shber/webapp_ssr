/*
 * @Author: Shber
 * @Date: 2022-10-27 11:33:13
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-10 17:13:23
 * @Description: 
 */
import { createSSRApp } from "vue";
import App from "./App.vue";
// import components from './components/index'
import './style/style.scss';

// if(process.env.NODE_ENV != 'production'){
//     new VConsole()
// }
console.log(`~~~~~ main.js ~~~~~`);

// 为了保证数据的互不干扰，每次请求需要导出一个新的实例
export const createApp = () => {
    const app = createSSRApp(App);
    return { app };
}
