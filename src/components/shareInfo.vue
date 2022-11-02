<!--
 * @Author: Shber
 * @Date: 2022-02-16 12:25:24
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-01 16:14:37
 * @Description:
-->
<template>
  <div class="tip_info">
    <input id="shareImg" type="hidden" :value="shareData.share_img">
    <input id="shareLink" type="hidden" :value="shareData.share_link">
    <input id="shareTitle" type="hidden" :value="shareData.share_title">
    <input id="shareDesc" type="hidden" :value="shareData.share_desc">
  </div>
</template>

<script>
import { miniShare, wechatShare } from '@/utils/utils'
import { reactive, onMounted, nextTick, toRefs, watch, defineComponent } from 'vue'
export default defineComponent({
  name: 'ShareInfo',
  props: {
    shareInfo: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, context) {
    const state = reactive({
      shareData: {}
    })
    watch(props, (newVal, oldVal) => {
      console.log('分享数据', props.shareInfo)
      state.shareData = props.shareInfo
    }, {
      immediate: true
    })
    onMounted(() => {
      console.log('process.client', window);
      if(!!window){
      nextTick(() => {
        wechatShare(state.shareData)
        miniShare(state.shareData)
      })
      }

    })
    return { ...toRefs(state) }
  }

})
</script>

