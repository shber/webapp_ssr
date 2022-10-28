<!--
 * @Author: Shber
 * @Date: 2022-10-27 11:33:13
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-28 17:45:49
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