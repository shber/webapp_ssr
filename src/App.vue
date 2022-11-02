<!--
 * @Author: Shber
 * @Date: 2022-10-27 11:33:13
 * @LastEditors: Shber
 * @LastEditTime: 2022-11-01 16:27:07
 * @Description: 
-->
<template>
    <router-view />
</template>
<script>
import { onMounted } from 'vue'
export default {
  name: 'App',
  setup() {
    onMounted(() => {
      document.getElementById('homeLoading') && document.getElementById('homeLoading').remove()
    })
  }
}
</script>