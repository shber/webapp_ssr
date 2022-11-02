<!--
 * @Author: Shber
 * @Date: 2022-11-02 16:04:38
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-02 16:19:24
 * @Description: 
-->
<template>
  <!-- 隐私权政策 -->
  <div class="agreementWrapper">
    <!-- <div v-wechat-title="$route.meta.title" /> -->
    <div class="agreement_content_cn">
        <h1>跳转到的新页面</h1>
        <router-link :to="{ path: '/'}">路径测试跳转</router-link>
        
    </div>
  </div>
</template>

<script>

import { reactive, onBeforeMount, onMounted, toRefs } from 'vue'
// import utils from '@/utils/utils'
export default {
  setup(){
    const state = reactive({
      language:''
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

    return {
      ...toRefs(state),
    }
  },
}
</script>
