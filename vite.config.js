/*
 * @Author: Shber
 * @Date: 2022-10-27 11:33:13
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-27 15:46:38
 * @Description: 
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

console.log('打包环境：', process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
        '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue()]
})
