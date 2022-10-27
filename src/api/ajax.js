/*
 * @Author: Shber
 * @Date: 2022-10-11 10:35:02
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-11 10:40:26
 * @Description: 请求方案封装
 */
import request from './request'
import config from '@/config/config'

export function get(url, params) {
  return request({
    url: `${config.apiTest}${url}`,
    method: 'get',
    params: params
  })
}
export function post(url, params) {
  return request({
    url: `${config.apiTest}${url}`,
    method: 'post',
    data: params
  })
}
