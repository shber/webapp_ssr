import request from './request'
import config from '@/config/config'

const articles = {
  articles_view(data) {
    return request({
      url: config.apiTest + `/articles_view?id=` + data.id + `&last_id=` + data.list + `&preview=` + data.preview + `&lang_id=${data.lang_id}`, //
      method: 'get'
      // params:data
    })
  },
  comment(data, page) {
    return request({
      url: config.apiTest + `/articles_view/comment?id=` + data + `&page=` + page,
      method: 'get'
    })
  },
  praise(data) {
    return request({
      url: config.apiTest + `/praise`,
      method: 'post',
      params: data
    })
  },
  version(data) {
    return request({
      url: config.apiTest + `/version?pid=` + data,
      method: 'get'
    })
  },
  share(data) {
    return request({
      url: config.apiTest + `/wechat/share?url=` + data,
      method: 'get',
      params: { type: 'share' }
    })
  }
}
const wiki = {
  wiki_view(data) {
    return request({
      url: config.apiTest + `/wiki_view?id=` + data,
      method: 'get'
    })
  }
}
const club = {

}
const works = {
  works_view(data) {
    return request({
      url: config.apiTest + `/activity/chinaChef/myFoods`,
      method: 'get'
    })
  },
  submitmyFoods(data) {
    return request({
      url: config.apiTest + `/activity/chinaChef/submitmyFoods`,
      method: 'post',
      data: data
    })
  },
  nsubmitmyFoods(data) {
    return request({
      url: config.apiTest + `/activity/chinaChefNext/submitmyFoods`,
      method: 'post',
      data: data
    })
  },
  config() {
    return request({
      url: config.apiTest + '/activity/chinaChef/config',
      method: 'get'
    })
  },
  nconfig() {
    return request({
      url: config.apiTest + '/activity/chinaChefNext/config',
      method: 'get'
    })
  }
}
const tomorrow_star = {
  submit_sign_info(data) {
    return request({
      url: config.apiTest + `/tomorrow_star/submit_sign_info`,
      method: 'post',
      params: data
    })
  },
  get_sign_info(data) {
    return request({
      url: config.apiTest + `/tomorrow_star/get_sign_info?id=` + data.id + `&type=` + data.type + `&tag=` + data.tag,
      method: 'get'
    })
  },
  submit(data) {
    return request({
      url: config.apiTest + `/questionnaire/submit`,
      method: 'post',
      params: data
    })
  }
}
const ajaxHttp = {
  brandSubmit($data) {
    return request({
      url: config.apiTest + `/user/submit_brand_auth`,
      method: 'post',
      data: $data
    })
  },
  checkStatus($type) { // 检查会员状态
    return request({
      url: config.apiTest + `/club/apply_status?type=${$type}`,
      method: 'get'
    })
  },
  clubSubimt(data) { // club/activate_member
    return request({
      url: config.apiTest + `/club/activate_member`,
      method: 'post',
      data: data
    })
  },
  applyMember($token, data) {
    return request({
      url: config.apiTest + `/club/apply_member`,
      method: 'post',
      data: data
    })
  },
  praise(data) { // 点赞 1.菜品 2.店铺 3.食材 4.资讯 5.名厨 6.专题 8.动态 9.评论
    return request({
      url: config.apiTest + `/praise`,
      method: 'post',
      data
    })
  },
  likeAdd(data, $token) { // 收藏
    return request({
      url: config.apiTest + `/like/add`,
      method: 'post',
      data: data
    })
  },
  likeDel(data, $token) { // 取消收藏
    return request({
      url: config.apiTest + `/like/del`,
      method: 'post',
      data: data
    })
  },
  followAdd(data, $token) { // 关注 人
    return request({
      url: config.apiTest + `/follow/add`,
      method: 'post',
      data: data
    })
  },
  followDel(data, $token) { // 取消关注
    return request({
      url: config.apiTest + `/follow/del`,
      method: 'post',
      data: data
    })
  },
  sendGiftData(data) {
    return request({
      url: config.apiTest + `/club/apply_join_gift`,
      method: 'post',
      data: data
    })
  },
  getGiftData() {
    return request({
      url: config.apiTest + `/club/get_join_gift`,
      method: 'get'
    })
  },
  getClubList(data) {
    return request({
      url: config.apiTest + `/club/stream?time=${data}`,
      method: 'get'
    })
  },
  $get($url, $data) {
    return request({
      // url: config.apiTest++`${$url}`,
      url: `${config.apiTest}${$url}`,
      method: 'get',
      params: $data
    })
  },
  $getByData($url, $data) {
    return request({
      url: config.apiTest + `${$url}`,
      method: 'get'
    })
  },
  $post($url, $data, $token) {
    return request({
      url: config.apiTest + `${$url}`,
      method: 'post',
      data: $data
    })
  },
  $posts($url, $data, $token) {
    return request({
      url: config.apiTest + `${$url}`,
      method: 'post',
      data: $data,
      responseType: 'blob'
    })
  },
  getTime() { // 获取网络时间，苏宁的接口
    return request({
      url: 'http://quan.suning.com/getSysTime.do',
      method: 'post'
    })
  },
  personal_report_2020(data) { // 2020年个人报告接口
    return request({
      url: config.apiTest + `/personal_report_2020`,
      method: 'get',
      params: data
    })
  },
  save_food_list(data) { // 2020个人报告保存作品合集
    return request({
      url: config.apiTest + `/save_food_list`,
      method: 'post',
      data: data
    })
  },
  chef_style(data) { // 2020年个人报告生成厨师类型卡片
    return request({
      url: config.apiTest + `/chef_style`,
      method: 'get',
      params: data
    })
  },
  activeStatistics($data) { // 大事件分享统计
    return request({
      url: config.apiTest + `/event_activity/forward`,
      method: 'post',
      data: $data
    })
  }

}

export { articles, wiki, club, works, tomorrow_star, ajaxHttp }
