/*
 * @Author: Shber
 * @Date: 2022-09-26 14:40:24
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-03 11:57:28
 * @Description:
 */
import axios from 'axios'
import { getQueryVariable, getAuth, getEnv } from '@/utils/utils'
import config from '@/config/config'
// import dsBridge from 'dsbridge'

const plant = 2
let version = '' // app版本号
let authorization = '' // token
let $lang = navigator.language || navigator.userLanguage // zh-cn 中文   zh-tw 繁体   en-us 英语

const service = axios.create({
  baseURL: config.apiTest,
  timeout: 60000
})

service.interceptors.request.use(
  async config => {
    const miniToken = getQueryVariable('token') // 小程序的token // main.js里存的
    const uids = getQueryVariable('uid')
    // if (isGteatChefbrowser()) {
    /*eslint-disable */
    const dsType = dsBridge.call('openBackButton', 'test')
    if (dsType == 1) {
      const USER = await getAuth() // 获取app的用户信息
      const ENV = await getEnv() // 获取设备信息
      const { data } = JSON.parse(ENV) // app 的设备信息
      const { data: { uid } = {}} = JSON.parse(USER)
      console.log('App返回的信息', uid, data)
      /* eslint-disable */
      uid && sensors.login(uid)  // 神策绑定UID
      version = data.version
      // sessionStorage.setItem('version', data.version)
      authorization = data.authorization
      $lang = data.lang // 获取app的langid
    } else if (miniToken) {
      authorization = `Bearer ${miniToken}` // 获取小程序token
      if(uids){
        sensors.login(uids)  // 神策绑定UID
      }
    }
    // console.log(`最新版本号:${version}, Token:${authorization}${dsType}`)
    config.headers['width'] = document.body.offsetWidth
    config.headers['height'] = document.body.offsetHeight
    config.headers['plant'] = plant
    config.headers['lang'] = $lang
    config.headers['VERSION'] = version
    config.headers['Authorization'] = authorization
    alert(authorization)
    // config.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnNpbXVsYXRpb24ubWluZ2NodS5jby9hY2NvdW50L2xvZ2luIiwiaWF0IjoxNjQxMjc3Mzc5LCJleHAiOjE3OTY3OTczNzksIm5iZiI6MTY0MTI3NzM3OSwianRpIjoiYkVWZ0pBeEI5b3ZBdDVLVSIsInN1YiI6OTA5ODcsInBydiI6ImMzNWRjMjIwMGFiMzUxYzUzYzk1YmQyNTA1ZmE5YTUzMGI3MmFmZWUifQ.vZjWFyQ-JH9VYnfc4YcFWMAszlV6K9q3DKpXVCk1xrU' // 刘理强
    // config.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnRlc3QubWluZ2NodS5jby9hY2NvdW50L2xvZ2luIiwiaWF0IjoxNjY2MjYwNjQ5LCJleHAiOjE4MjE3ODA2NDksIm5iZiI6MTY2NjI2MDY0OSwianRpIjoidWxyQ2xOYUJxdWlSbXdweiIsInN1YiI6MTA3NDg3LCJwcnYiOiJjMzVkYzIyMDBhYjM1MWM1M2M5NWJkMjUwNWZhOWE1MzBiNzJhZmVlIn0.KEiFWK8HMQBT9CwfaGqj55eSDjfvibo23zl4zhIDvAg'
    // config.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnRlc3QubWluZ2NodS5jby9hY2NvdW50L2xvZ2luIiwiaWF0IjoxNjYwNTQzNTc2LCJleHAiOjE4MTYwNjM1NzYsIm5iZiI6MTY2MDU0MzU3NiwianRpIjoiSkw5aGtGWXJ6WHV6MWVGUSIsInN1YiI6Nzc3MjAsInBydiI6ImMzNWRjMjIwMGFiMzUxYzUzYzk1YmQyNTA1ZmE5YTUzMGI3MmFmZWUifQ.Y7qCMRdo-wP8LR5xZO1ScXFoai_8Uv0JjF-LEaYeBDM' 
    
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
