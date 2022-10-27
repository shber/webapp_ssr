<template>
  <div class="Logo" :style="'background:'+ color +''">
    <img src="https://static.mingchu.co/webapp/findNew/imgs/Logo.png" alt="">
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'Home',
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  setup() {
    const state = reactive({
    })
    return { ...toRefs(state) }
  }
}
</script>
<style lang="scss">
.Logo{width: 100%;
    img{width:240px;height: 196.4px;padding-top: 48px;margin-bottom: 53.6px;margin-left: 67px;}
  }
</style>

