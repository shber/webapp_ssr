<template>
  <div class="wrap">
    <div class="banner">
      <img src="https://static.mingchu.co/webapp/findNew/imgs/banner2.png" alt="">
    </div>
    <ul class="food_tabs">
      <li v-for="tabs in tabsInfo" :key="tabs.val" :class="{checked:tabs.id=== activeTab}" @click="checkTab(tabs)">{{ tabs.name }}</li>
    </ul>
    <div v-if="foodList">
      <foodList
        :data-info="dataInfo"
        :release-show="releaseShow"
      />
    </div>
    <ShareInfo :share-info="shareInfo" />

  </div>
</template>
<script>
import '@/style/scss/bigEvent/index.scss'
import '@/style/scss/articles.scss'
import { useRouter } from 'vue-router'
import ShareInfo from '@/components/shareInfo.vue'
// import utils from '@/utils/utils'
import { reactive, toRefs, onBeforeMount } from 'vue'
import foodList from '@/components/foodList1.vue'
import { ajaxHttp } from '@/api/api'
import { Toast } from 'vant'
import { platformType } from '@/utils'
import config from '@/config/config'

export default {
  name: 'WorksList',
  components: {
    foodList,
    ShareInfo
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      shareInfo: { share_title: '闯关任务开启｜寻找川菜守“味”者', share_desc: '与星厨同行，共赴天府寻味之旅！', share_img: 'https://static.mingchu.co/webapp/findNew/share1.jpg', share_link: `${config.webapplink}/riseActivity/findNew/findshare?id=0` },
      releaseShow: true,
      foodList: false,
      dataInfo: {},
      activeTab: 1,
      tabsInfos: [],
      tabsInfo: [
        { name: '传统赛道作品', id: 1 },
        { name: '创新赛道作品', id: 2 }
      ]
    })
    onBeforeMount(() => {
      if (router.currentRoute.value.query.page) {
        state.releaseShow = false
      }
      sensors.track('PlanVisit', {
        PlatformType: platformType(),
        page_type: 'subject'
      })
      // utils.hideShare()
      ajaxHttp.$get(`/api/plan/album`).then(res => {
        if (res.code === 1) {
          state.tabsInfos = res.data.subject
          state.tabsInfo[0].id = res.data.subject[0].id
          state.tabsInfo[1].id = res.data.subject[1].id
          if (Number(router.currentRoute.value.query.type) === 0) {
            state.dataInfo = res.data.subject[0]
            state.activeTab = res.data.subject[0].id
          } else {
            state.dataInfo = res.data.subject[1]
            state.activeTab = res.data.subject[1].id
          }
          console.log(state.dataInfo)
          state.loadingShow = false
          setTimeout(() => { state.foodList = true }, 100)
        } else {
          state.loadingShow = false
          Toast(res.message)
        }
      })
    })
    const checkTab = ($tab) => {
      state.foodList = false
      state.activeTab = $tab.id
      if ($tab.name === '传统赛道作品') {
        state.dataInfo = { id: $tab.id, title: state.tabsInfos[0].title }
      } else {
        state.dataInfo = { id: $tab.id, title: state.tabsInfos[1].title }
      }
      setTimeout(() => { state.foodList = true }, 100)
    }
    return { ...toRefs(state), checkTab }
  }
}
</script>
<style  lang="scss" scoped>
.foods_list{
  .van-list__finished-text, .van-list__placeholder, .van-list__loading{clear: both;}
}
.wrap{
  width: 100%;
  overflow: hidden;
  .food_tabs{
    width: 100%;
    height:48px;
    display: flex;
    li{
      width: 50%;
      text-align: center;
      line-height: 48px;
      color: #999999;
      font-size: 16px;
      border-bottom: 1px #E5E5E5 solid;
      font-weight: bold;
    }
    .checked{
      border-bottom: 2px #C99700 solid;
      color: #C99700;
    }
  }
  .banner{
      display: flex;
      align-items: flex-end;
      height: 220px;
      position: relative;
      color: #fff;
      background-color: #ff4d5a;
    }
}
</style>
