<template>
  <div v-if="visible" class="banner_height">
    <div id="searchBar" :class="searchBarFixed == true ? 'ondown_banner' :'down_banner'">
      <div v-if="isStatus!=1" class="preview_bar">
        <a class="down_close" @click="goClose" />
        <div style="height: 56px; line-height: 56px;text-align: center; font-size: 14px; color: #C99700">
          <!-- 此为临时链接，仅用于预览，将在短期内失效。 -->
          {{ $t('topHeader.headText') }}
        </div>
      </div>
      <template v-else>
        <div class="left_close">
          <a class="down_close" @click="goClose" />
          <img src="https://static.mingchu.co/webapp/images/components/newLogo.png" alt="" class="down_himg">
        </div>
        <a v-if="des == ''" class="download" @click="goDown">打开 App</a>
        <a v-else class="download" @click="goDownDes">打开 App</a>
        <gc-guide :down-show="weiXin" @showDwon="getWechat" />
      </template>
    </div>
  </div>
</template>
<script>
import {isGteatChefbrowser, is_weixn, goDown } from '@/utils/utils'
import { superLink } from '@/utils'
import GcGuide from '@/components/gc-guide.vue'


export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    link: {
      type: String,
      default: ''
    },
    webappLink: {
      type: String,
      default: ''
    },
    des: {
      type: String,
      default: 'H5'
    },
    param: {
      type: String,
      default: ''
    },
    status: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      visible: this.isShow,
      weiXin: false, // 是否展示微信引导窗
      searchBarFixed: false,
      parentData: {}
    }
  },
  components:{GcGuide},
  computed: {
    isStatus() {
      return this.status
    }
  },
  created() {
    this.parentData = this.$route.query
  },

  mounted() {
    if (this.isShow) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    goDownDes() {
      const self = this
      const u = navigator.userAgent
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      console.log('拉起app参数', self.des, self.webappLink)
      if (isGteatChefbrowser()) {
        // callback() // 如果是app内执行回调
      } else {
        if (is_weixn()) {
          if (!isAndroid) { // !isAndroid
            const data = `{
              "des": "${self.des}", 
              "skuid": "${self.param}",
              "link": "${self.webappLink}"
            }`
            return superLink(data)
          } else {
            self.weiXin = true
          }
        } else {
          const data = `{
            "des": "${self.des}", 
            "skuid": "${self.param}",
            "link": "${self.webappLink}"
          }`
          return superLink(data)
        }
      }
    },
    goDown() {
      const self = this
      const u = navigator.userAgent
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      if (isGteatChefbrowser()) {
        // callback() // 如果是app内执行回调
      } else {
        if (is_weixn()) {
          if (!isAndroid) { // !isAndroid
            goDown('H5', `${self.webappLink}`)
          } else {
            this.weiXin = true
          }
        } else {
          goDown('H5', `${self.webappLink}`)
        }
      }
    },
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const offsetTop = document.querySelector('#searchBar') ? document.querySelector('#searchBar').offsetTop : 0
      if (scrollTop > offsetTop) {
        this.searchBarFixed = true
      } else {
        this.searchBarFixed = false
      }
    },
    goClose() {
      this.visible = false
    },
    getshowDonw(val) {
      this.DownShow = false
    },
    getWechat(val) {
      this.weiXin = false
    }
  }
}
</script>
