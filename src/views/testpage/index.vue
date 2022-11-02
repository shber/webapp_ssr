<!--
 * @Author: Shber
 * @Date: 2022-11-02 16:04:38
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-02 17:25:59
 * @Description: 
-->
<template>
  <!-- 隐私权政策 -->
  <ShareInfo :share-info="shareInfo" />
  <div class="test_content">
    <!-- <div v-wechat-title="$route.meta.title" /> -->
    <div class="agreement_content_cn">
        <h1 class="mb30">测试页面</h1>
        <router-link class="mt10" :to="{ path: '/'}">路径测试跳转</router-link>
        <h2 class="mt10" @click="goApp(90276)">跳转到APP</h2>
        <h2 class="mt10" @click="share">分享到微信</h2>
        
    </div>
  </div>
</template>

<script>
import config from '@/config/config'
import { reactive, onBeforeMount, onMounted, toRefs } from 'vue'
import ShareInfo from '@/components/shareInfo.vue'
import { goAppPageOther, shareWecaht } from '@/utils/utils'
export default {
  components: {
    ShareInfo
  },
  setup(){
    const state = reactive({
      language:'',
      shareInfo: { share_title: '闯关任务开启｜寻找川菜守“味”者', share_desc: '与星厨同行，共赴天府寻味之旅！', share_img: 'https://static.mingchu.co/webapp/findNew/share1.jpg', share_link: `${config.webapplink}/riseActivity/findNew/findshare` },

    })
    const created = ()=>{
      console.log("~~~~~~created~~~~~~", window, navigator, wx, dsBridge);
    };
    onBeforeMount(()=>{
      console.log("~~~~~~onBeforeMount~~~~~~", window, navigator, wx, dsBridge);

    })
    onMounted(()=>{
      // utils.hideShare('1')
      // state.language = utils.browserLanguage()
      console.log("~~~~~~onMounted~~~~~~", window, navigator, wx, dsBridge);
    })
    const goApp = (id)=>{
      goAppPageOther({ 'des': 'foodview', 'skuid': id, 'link': '' }, () => {})
    }
    const share = ()=>{
      // 分享给微信好友
        shareWecaht(`{
          "shareSDKPlatformType":"22", 
          "share_plant":"1", 
          "shareContentType":"0", 
          "share_miniProgram_url":"", 
          "share_title":"${state.shareInfo.share_title}",
          "share_desc":"${state.shareInfo.share_desc}",
          "share_img": "${state.shareInfo.share_img}", 
          "share_link": "${state.shareInfo.share_link}",  
          "share_desc_Sinaweibo":""
          }`).then(res => {
        })
    }

    return {
      ...toRefs(state),
      goApp,
      share,
    }
  },
}
</script>
<style lang="scss" scoped>
.test_content{
  text-align: center;
  font-size: 24px;
  h1{font-size: 36px; font-weight: bold; color: #000;}
}
</style>
