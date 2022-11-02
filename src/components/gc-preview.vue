<template>
  <div v-if="isShow" class="err_404">
    此临时链接已失效，请重新生成。
  </div>
</template>
<script>
export default {
  name: 'GcLoading',
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    istext: {
      type: String,
      default: '此临时链接已失效，请重新生成。'
    }
  },
  data() {
    return {
      visible: this.isShow
    }
  },
  watch: {
    isShow(val) {
      this.visible = val
    }
  }
}
</script>
<style scoped>
.err_404{padding-top: 250px; margin-top: 40%; background:url('https://static.mingchu.co/m/images/eq/404@2x.png') center top no-repeat; background-size: 250px 250px; text-align: center; font-size: 14px; color: #b4b4b4;}

</style>
