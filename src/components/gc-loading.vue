<!--
 * @Author: Shber
 * @Date: 2022-11-02 15:26:42
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-02 15:49:17
 * @Description: 
-->
<template>
  <div v-if="visible">
    <div class="gcloading">
      <img src="https://static.mingchu.co/webapp/images/components/animation_load.gif">
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, defineComponent, watch} from 'vue'
export default defineComponent ({
  name: 'GcLoading',
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context){
    const state = reactive({
      visible: false
    })

    watch(props, (newVal, oldVal) => {
      state.visible = props.isShow
    }, {
      // immediate: true
    })
    
    return { ...toRefs(state) }
  },

})
</script>
