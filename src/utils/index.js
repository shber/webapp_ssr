// import { goAppPage } from '@/utils/utils'
// import bus from '@/utils/bus'
// import { Toast } from 'vant'
import useClipboard from 'vue-clipboard3'
// 复制文字方法
export function coypText(text) {
  // const { toClipboard } = useClipboard()
  // return toClipboard(text)
}

/* 是否是名厨浏览器*/
export const isGteatChefbrowser = () => {
  const str = 'GREATCHEF'
  const userAgent = navigator.userAgent.toUpperCase()
  // console.log('浏览器信息', userAgent)
  if (userAgent.indexOf(str) >= 0) {
    return true
  } else {
    return false
  }
}
export async function checkVersion($ver) { // 检查与自定义版本号是否匹配，大小
  // const ENV = await utils.getEnv() // 获取设备信息
  // const { data: { version = '' }} = JSON.parse(ENV)
  // console.log('浏览器版本号：', version)
  // const VERSION = version.split('.') // 设备版本号
  // let status = false
  // // 设备版本号与自定义的目标版本号对比
  // if (VERSION[0] * 1 > $ver[0]) {
  //   status = true
  // } else {
  //   if (VERSION[1] * 1 > $ver[1]) {
  //     status = true
  //   } else {
  //     if (VERSION[2] * 1 > $ver[2]) {
  //       status = true
  //     } else { status = false }
  //   }
  // }
  // return status
}

export const superLink = async($param = {}) => { // 跳转App，小程序，微信浏览器，H5等逻辑判断
  // 字符串拼接，里面都是双引号，类似JSON格式
  const { des, skuid, link } = JSON.parse($param)
  console.log('superLink', des, skuid, link)
  /* eslint-disable */
  // const dsType = dsBridge.call('openBackButton', 'test')
  // if (dsType == 1) {
  //   if (!checkVersion([3, 2, 5])) return Toast('您当前使用的软件版本较低，请升级最新版本')
  //   goAppPage($param) // 打开原生页面
  // } else if (utils.is_mini()) { // 小程序
  //   if (des !== 'h5') {
  //     utils.goMiniPage(`pages/${des}/main?id=${skuid}`) // 打开小程序页面
  //   } else { // h5的话直接用webview渲染
  //     location.href = link
  //   }
  // } else if (utils.is_weixn()) { // 微信浏览器
  //   if (utils.isiOS()) { // 判断是ios，打开前提示
  //     const answer = window.confirm(`您将打开名厨MINGCHU`)
  //     answer && utils.goDown(des, link, skuid)
  //   } else { // 安卓需要弹个引导框
  //     bus.$emit('guideShow', true)
  //   }
  // } else { // 都不满足去下载页面
  //   utils.goDown(des, link, skuid)
  // }
}

export function checkloginCallback(callback, self) { // 检查app是否登录，然后执行，点赞，关注，收藏等交互事件
  // if (utils.isGteatChefbrowser()) { // 是不是名厨浏览器
  //   utils.isLogin().then(res => { // 登录app返回的数据 本来想搞成同步，export能返回aysnc吗？
  //     const login = JSON.parse(res) // 返回数据转译
  //     if (login.data.is_login === 1) { // 登录成功的
  //       callback()
  //     } else { // 没登录拉登录
  //       utils.login().then(res => { location.reload() })
  //     }
  //   })
  // } else if (utils.is_mini()) { // 是不是名厨小程序
  //   callback()
  // } else {
  //   self.$toast('当前环境暂不支持')
  // }
}

export function platformType() { // 判断埋点平台
  // if (utils.isGteatChefbrowser()) {
  //   if (utils.isiOS()) {
  //     return 'iOS'
  //   } else {
  //     return 'Android'
  //   }
  // } else if (utils.getQueryVariable('token')) {
  //   return '小程序'
  // } else {
  //   return 'webapp'
  // }
}

