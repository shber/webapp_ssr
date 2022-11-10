<template>
  <div class="gc_weapp">
    <!-- <div v-wechat-title="$route.meta.title" /> -->
    <!-- <gc-skeleton :is-show="loadingShow" />
    <gc-guide :down-show="guideInfo.weiXin"  @showDwon="getWechat" /> -->
    <GCHEADER :is-show="!isGteatChefbrowser" :status="previews" des="themeview" :webapp-link="routerLink" :param="pathId" :link="GteatChefDownlink" />
    <GCLOADING :is-show="loadingShow"/>
    <div class="gc_theme">
      <div class="theme_banner" :style="{backgroundImage:'url('+ dataInfo.header_img_url +')'}">
        <div class="bottom_element">
          <div class="banner_text">
            <h2># {{ dataInfo.title }}</h2>
            <p>{{ dataInfo.join_num }} 人已参与</p>
            <p>{{ dataInfo.desc }}</p>
          </div>
          <div v-if="dataInfo.follow_status==0" class="follow_btn" @click="goAppDown">关注</div>
          <div v-else class="follow_btn_active" @click="goAppDown">已关注</div>
        </div>
      </div>
      <div class="tab_bar">
        <li v-for="tab in tabInfo" :class="{active:tab.val==active}" :key="tab.val" @click="checkTab(tab)">{{tab.name}}</li>
        <!-- <mt-navbar v-model="active">
          <mt-tab-item id="1">最新</mt-tab-item>
          <mt-tab-item id="2">热门</mt-tab-item>
        </mt-navbar> -->
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="work_info pd_10">
          <ul class="work_list">
            <template v-for="(item, oddIndex) in foodInfo">
              <li v-if="oddIndex%2==0" :key="item.id">
                <div class="list">
                  <a :href="webappLink+'/'+item.des+'?id='+item.id">
                    <div class="img_box">
                      <van-image v-if="item.pic_url" fit="cover" :src="item.pic_url" class="img" />
                      <img v-show="item.card_type == 5" src="https://static.mingchu.co/webapp/images/zan/replay.png" mode="" class="icon_replay">
                    </div>
                  </a>
                  <span class="icon_text" @click.stop="goAppDown"> <i :class="item.ps == 0 ? ' icon icon_like' : ' icon icon_like_red_line'" /><span class="text_zan">{{ item.zan }}</span></span>
                  <span v-if="item.completion == 100" class="icon_brand"> <img src="https://static.mingchu.co/webapp/images/zan/recipe.png" alt="" class="icon_brand_img"> </span>
                </div>
                <p class="list_des text_overflow3">{{ item.food_name }}</p>
              </li>
            </template>
          </ul>
          <ul class="work_list">
            <template v-for="(item, evenIndex) in foodInfo">
              <li v-if="evenIndex%2==1" :key="item.id">
                <div class="list">
                  <a :href="webappLink+'/'+item.des+'?id='+item.id">
                    <div class="img_box">
                      <van-image v-if="item.pic_url" fit="cover" :src="item.pic_url" class="img" />
                      <img v-show="item.card_type == 5" src="https://static.mingchu.co/webapp/images/zan/replay.png" mode="" class="icon_replay">
                    </div>
                  </a>
                  <span class="icon_text" @click.stop="goAppDown"> <i :class="item.ps == 0 ? ' icon icon_like' : ' icon icon_like_red_line'" /><span class="text_zan">{{ item.zan }}</span></span>
                  <span v-if="item.completion == 100" class="icon_brand"> <img src="https://static.mingchu.co/webapp/images/zan/recipe.png" alt="" class="icon_brand_img"> </span>
                </div>
                <p class="list_des text_overflow3">{{ item.food_name }}</p>
              </li>
            </template>
          </ul>
        </div>
      </van-list>
      <span class="icon_apply" @click="goAppDown" />
    </div>
  </div>
</template>

<script>
import { Toast, List, Image as VanImage } from 'vant'
import { articles, ajaxHttp } from '@/api/api'
import {isGteatChefbrowser, is_weixn, goDown, showShare} from '@/utils/utils'
import config from '@/config/config'
import GCHEADER from '@/components/gc-header.vue'
import GCLOADING from '@/components/gc-loading.vue'


export default {
  components: {
  },
  data() {
    return {
      loading: false,
      finished: false,
      noMore: false,
      noCLick: true,
      noIndicator: false,
      dataInfo: {
        title: '',
        muse_count: 0,
        food_count: 0,
        food: [],
        header_img_url: ''
      },
      foodInfo: [],
      active: 1,
      page_no: 1,
      screenHeight: '',
      scrollTop: '', // 滚动到哪里了
      loadShow: false,
      getscrollheightnum: '',
      screenHeights: '',
      imageWidth: '600',
      imageHeight: '',
      pathId: '', // 传递过来的用户id
      allLoaded: false,
      shareInfo: {
        shareLink: `${config.webapplink}/themeview`,
        shareTitle: '',
        shareDesc: '',
        shareImg: 'https://img.mingchu.co/ueditor/php/upload/image/20200119/1579429167875371.jpg'

      },
      loadingShow: true,
      isGteatChefbrowser: false,
      GteatChefDownlink: '',
      guideInfo: {
        weiXin: false,
        imgType: 'https://img.mingchu.co/ueditor/php/upload/image/20191018/1571387567859008.png'
      },
      routerLink: '',
      webappLink: config.webapplink,
      $id: '',
      tabInfo:[{name:'最新', val:1}, {name:'最热', val:2}]
    }
  },
  watch: {
    active(newVal, oldVal) {
      this.page_no = 1
      this.foodInfo = []
      this.noMore = false
      this.noIndicator = true
      if (!self.noCLick) { this.getData(newVal) }
    }
  },
  components:{
    vanList:List,
    VanImage,
    GCHEADER,
    GCLOADING
  },
  created() {
    const self = this
    const dsType = dsBridge.call('openBackButton', 'test')
    if (dsType == 1) { // app内
      self.isGteatChefbrowser = true
    }
    console.log(this.$route.query)
    this.$id = this.$route.query.id
    this.pathId = decodeURIComponent(this.$route.query.id)
    // if ($(document.body).width() > 1200) {
    //   self.loading = false
    // }
    // this.routerLink = encodeURIComponent(self.$router.currentRoute.fullPath);
    this.routerLink = decodeURIComponent(self.$router.currentRoute.path)
    console.log('this.routerLink', this.routerLink)
  },
  mounted() {
    this.$nextTick(() => {
    })
  },
  methods: {
    getData($type = 1) {
      const self = this
      const data = {
        id: 98,
        sort: $type,
        listrow: 20,
        page: this.page_no
      }
      self.noCLick = true
      ajaxHttp.$get('/api/theme/detail', data).then(res => {
        if (res.code == 1) {
          if (res.data.list != '') {
            self.foodInfo = [...self.foodInfo, ...res.data.list]
            this.loading = false
          } else {
            this.finished = true
          }
          self.shareInfo.shareTitle = res.data.share.share_title
          self.shareInfo.shareDesc = res.data.share.share_desc
          self.shareInfo.shareImg = res.data.share.share_img
          self.shareInfo.shareLink = res.data.share.share_link
          self.share(self.shareInfo)
          self.dataInfo = res.data
          self.noCLick = true
          self.noIndicator = false
        }
      }).catch(err => {
        console.log(err)
      })
      this.$nextTick(() => {
        self.loadingShow = false
      })
    },
    checkTab(tab){
      this.active = tab.val
    },
    goAppDown() {
      const self = this
      const u = navigator.userAgent
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      if (isGteatChefbrowser()) {
        callback() // 如果是app内执行回调
      } else {
        if (is_weixn()) {
          if (!isAndroid) {
            this.guideInfo.imgType = 'https://static.mingchu.co/m/images/share.png'
          }
          this.guideInfo.weiXin = true
        } else {
          // goDown("H5", `${config.webapplink}${self.routerLink}`);
          goDown('themeview', `${config.webapplink}${self.webappLink}`, self.pathId)
        }
      }
    },
    share($shareInfo) {
      const share_link = escape(window.location.href)
      articles.share(share_link).then(res => {
        // shareLink(res, $shareInfo)
      })
    },
    shareBtn() {
      if (this.isGteatChefbrowser) {
        // 是否是名厨浏览器
        showShare()
      } else {
        // this.share();
        console.log('微信环境')
      }
    },
    getLogin() {
      const self = this
      ajaxHttp.$getByData('/ranking2019/detail?type=brand&').then(res => {
        self.list = res.data
        self.desc = res.desc
        this.$nextTick(() => {
          self.loadingShow = false
        })
      })
    },
    getWechat(val) {
      this.guideInfo.weiXin = false
    },
    onLoad() {
      const self = this
      setTimeout(() => {
        self.getData(this.active)
        self.page_no++
      }, 600)
    }
  }
}

</script>

<style lang="scss">
  .van-tabs {width: 30%;}
  .van-tab--active{font-weight: bold !important; color: #C99700 !important;}
</style>
