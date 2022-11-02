<!--
 * @Author: Shber
 * @Date: 2022-11-02 15:31:40
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-02 15:53:54
 * @Description: 
-->
<template>
  <div v-if="visible">
    <div class="gc_mask" @click="goClose" />
    <div class="modal-top" @click="goClose">
      <div class="gl_share" :style="{backgroundImage: 'url('+ $t('topHeader.shareImg') +')'}" />
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, defineComponent, watch} from 'vue'

export default defineComponent({
  props: {
    downShow: {
      type: Boolean,
      default: false
    },
    imgType: {
      type: String,
      default: 'https://img.mingchu.co/ueditor/php/upload/image/20191018/1571387567859008.png'
    }
  },
  emits: ['showDwon'],
    setup(props, context){
      const state = reactive({
      visible: false
    })
    watch(props, (newVal, oldVal) => {
      state.visible = props.downShow
    }, {
      // immediate: true
    })

    const goClose = () => {
      context.emit('showDwon', this.visible)
    }
    return {
      ...toRefs(state),
      goClose
    }
  }
})
</script>
