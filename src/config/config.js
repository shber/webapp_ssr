/*
 * @Author: Shber
 * @Date: 2022-10-27 15:07:32
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-27 15:48:00
 * @Description: 
 */

let apiTest, webapplink, browerLoggerKey, staticPath
let HOST = 'mingchu.co'

// alert(`同步 ${checkVersion(CUSTOMVERSION)} ${HOST}`)
if (process.env.NODE_ENV === 'development') { // 本地开发环境
  apiTest = `http://api.test.mingchu.co` // 接口地址
  webapplink = `http://m.dev.${HOST}` // 拉app地址，为了和App做版本兼容
  staticPath = '' // CDN资源地址
  browerLoggerKey = 'ifmox@709e786a9393e09' // 阿里云监控密钥
} else if (process.env.NODE_ENV === 'test') { // 测试环境
  apiTest = `https://api.test.mingchu.co`
  webapplink = `http://m.test.${HOST}`
  browerLoggerKey = 'ifmox@afee9bac75d7713'
  staticPath = ''
} else if (process.env.NODE_ENV === 'simulation') { // 仿真环境
  apiTest = `https://api.simulation.mingchu.co`
  webapplink = `http://m.simulation.${HOST}`
  browerLoggerKey = 'ifmox@afee9bac75d7713'
  staticPath = 'https://static.mingchu.co' // CDN资源地址
} else {
  apiTest = 'http://api.simulation.mingchu.co' // 线上环境
  webapplink = `https://m.${HOST}`
  browerLoggerKey = 'ifmox@f443542f599fe63'
  staticPath = 'https://static.mingchu.co' // CDN资源地址
}

export default {
  apiTest, webapplink, browerLoggerKey, staticPath
}
