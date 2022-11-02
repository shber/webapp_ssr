/*
 * @Author: Shber
 * @Date: 2022-10-27 11:33:13
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-02 20:56:51
 * @Description: 
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import ViteEnv from './plugins/ViteEnv'
// const ViteEnv = require('./plugins/ViteEnv')

console.log('打包环境：', process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
        '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    ViteEnv()
  ],
  build:{
    rollupOptions:{
      output:{
        assetFileNames: "[name].[hash].[ext]"
      }
    },
    assetsInlineLimit: 4096, // 小于4kb 转base64
    // outDir: "disttest" // 整个打包文件夹
    // assetsDir:"" // 打包的资源文件夹
  }
})
