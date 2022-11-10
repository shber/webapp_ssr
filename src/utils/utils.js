/*
 * @Author: Shber
 * @Date: 2022-10-27 15:08:19
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-10 15:54:44
 * @Description: 
 */
import '@/components/callapp'
// const CallApp = require('../components/callapp.js')
import { articles } from '@/api/api'
// import wx from 'weixin-js-sdk'
// import dsBridge from 'dsbridge'
  /* 是否是名厨浏览器*/
  export function isGteatChefbrowser() {
    if(!navigator){return false}
    const str = 'GREATCHEF'
    const userAgent = navigator.userAgent.toUpperCase()
    console.log('浏览器信息', userAgent)
    if (userAgent.indexOf(str) >= 0) {
      return true
    } else {
      return false
    }
  }
  export function isiOS() { // 苹果浏览器
    if(!navigator){return false}
    const u = navigator.userAgent
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  }
  export function isAndroid() { // 安卓浏览器
    if(!navigator){return false}
    const u = navigator.userAgent
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  }
  export function is_weixn() {
    if(!navigator){return false}
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  }
  export function closeWindow($param = null){ // 关闭webview
    return dsBridge.call('closeWindow', $param)
  }
  export function isLogin() { // 是否登陆
    return new Promise((resolve, reject) => {
      dsBridge.call('isLogin', function(result) {
        resolve(result)
      })
    })
  }
  export function login() {
    return new Promise((resolve, reject) => {
      dsBridge.call('login', function(result) {
        resolve(result)
      })
    })
  }
  export function hideShare(hide = '1') { // 隐藏webview顶部分享按钮
    return new Promise((resolve, reject) => {
      dsBridge.call('hideShare', hide,
        function(result) {
          resolve(result)
        })
    })
  }
  export function hiddenNavi($hide = '1') {
    return new Promise((resolve, reject) => {
      dsBridge.call('js_hiddenNavigationBar', $hide, function(res) {
        resolve(res)
      })
    })
  }

  // 获取url参数
  export function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) { return pair[1] }
    }
    return (false)
  }
  export function getAuth() { // 获取用户信息
    return new Promise((resolve, reject) => {
      dsBridge.call('getAuth', function(result) {
        resolve(result)
      })
    })
  }
  export function getEnv() { // 获取app环境
    return new Promise((resolve, reject) => {
      dsBridge.call('env', function(result) {
        resolve(result)
      })
    })
  }
  export function shareWecaht(parms){
    // "shareSDKPlatformType": 22微信好友 23微信朋友圈,
    return new Promise((resolve, reject) => {
      dsBridge.call('js_callNativeShareSDK', parms, function(result) {
        resolve(result)
      })
    })
  }
  export function miniShare($data = {}) { // 小程序分享方法
    return wx.miniProgram.postMessage({ data: $data })
  }

  export async function wechatShare ($data = {}) { // 微信分享接口，res-接口数据，data-需要分享携带的参数
    const config = await articles.share(escape(window.location.href)) // 获取分享的参数密钥
    const $debug = false // 关闭调试
    wx.config({ ...config, ...{ debug: $debug }, ...{openTagList:['wx-open-launch-app', 'wx-open-launch-weapp']}})
    wx.ready(() => {
      wx.updateAppMessageShareData({ // 分享给朋友
        title: $data.share_title, // 分享标题
        desc: $data.share_desc, // 分享描述
        link: $data.share_link, // 分享链接
        imgUrl: $data.share_img, // 分享图标
        success: function() {
          // 设置成功
        }
      })
      wx.updateTimelineShareData({ // 分享朋友圈
        title: $data.share_title, // 分享标题
        link: $data.share_link, // 分享链接
        imgUrl: $data.share_img, // 分享图标
        success: function() {
          // 设置成功
        }
      })
    })
  }
    // 寻新计划用
  export function goAppPageOther($param = {}, callback) { // 跳转到app
    if(!navigator){return false}
    const u = navigator.userAgent
    let params = $param
    if(!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){ // 安卓把对象转为字符串
      params = JSON.stringify(params)
    }
    return new Promise((resolve, reject) => {
      dsBridge.call('jsPushNativeVc', params, function(result) {
        resolve(result)
      })
    })
  }
  export function goAppPage($param = {}, callback) { // 跳转到app
    // 字符串拼接，里面都是双引号，类似JSON格式
    return new Promise((resolve, reject) => {
      dsBridge.call('jsPushNativeVc', $param, function(result) {
        resolve(result)
      })
    })
  }
  export function showShare() {
    dsBridge.call('CallLocalShare')
  }

  export function goDown($des, $url = '', $routeId = '0') { // 新 h5跳转app
    if(!navigator){return false}
    const self = this
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    console.log($url, $routeId, '拉起app link')

    if (isAndroid) {
      var protocol = 'cn.com.greatchef'
      var jumpurl = `?params={"des":"${$des}", "link":"${$url}" ,"skuid":"${$routeId}"}`
    } else {
      var protocol = 'com.greatchef.notes'
      var jumpurl = `/${$des}?id=${$routeId}&link=${encodeURIComponent($url)}`
    }

    const option = {
      scheme: {
        protocol: protocol
      },
      universal: {
        host: 'oia.greatchef.com.cn',
        pathKey: ''
      },
      appstore: 'https://itunes.apple.com/app/id700641749',
      yingyongbao: 'https://a.app.qq.com/o/simple.jsp?pkgname=cn.com.greatchef',
      fallback: 'https://oia.greatchef.com.cn/',
      timeout: 2000
    }

    const lib = new CallApp(option)
    lib.open({
      path: jumpurl
    })
  }

  export function pulishNewFoodClick(des, id, title,subjectID,subjectitle) { // 拉起主题页
    // alert('des:'+des+'   id:'+id+'  title:'+title+'  subjectID:'+subjectID+'  subjectitle:'+subjectitle)
    return new Promise((resolve, reject) => {
      dsBridge.call('pulishFoodClick', `{"des":"${des}","skuid":"${id}","keyword":"${title}","subjectId":"${subjectID}","subjectContent":"${subjectitle}"}`, function(result) {
        resolve(result)
      })
    })
  }

  export function formatTime(str = 0) { // 格式时间
    if (!str) { return '' }
    const date = new Date(parseInt(str) * 1000)
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let minute = date.getMinutes()
    // let second = date.getSeconds()
    minute = minute < 10 ? '0' + minute : minute
    // second = second < 10 ? '0' + second : second
    // return `${y}.${m}.${d} ${h}:${minute}:${second}`
    return `${y}.${m}.${d} ${h}:${minute}`
  }