<!--
 * @Author: Shber
 * @Date: 2022-11-02 16:04:38
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-10 17:11:51
 * @Description: 
-->
<template>
  <div class="test_content">
    <div class="agreement_content_cn">
        <h1 class="mb30">测试页面 {{language}}</h1>
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount, onMounted, toRefs } from 'vue'

export default {
  setup(){
    const state = reactive({
      language:'英语',
      response: null,
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
      console.log("~~~~~~onMounted~~~~~~", state.response);
    })


    return {
      ...toRefs(state),
    }
  },
}
</script>
