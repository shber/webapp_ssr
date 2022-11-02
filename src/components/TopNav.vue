<template>
  <div v-if="isGteatChefbrowser" class="wrapcent" :style="{ height:height}">
    <div class="report_nav" style="height:44px" :style="{paddingTop: Top}">
      <div class="rt_close" @click="close" />
      <div class="title">{{ title }}</div>
      <div />
    </div>
  </div>
</template>

<script>
import { hiddenNavi, isiOS } from '@/utils/utils'
export default {
  name: 'ReportNav',
  props: {
    title: { // 文件类型
      type: String,
      default: ''
    }
  },
  data() {
    return {
      zhans: true,
      isGteatChefbrowser: false,
      height: '88px',
      Top: '44px',
      heightNav: 0,
      isPlayed: true
    }
  },
  async created() {
    /*eslint-disable */
    hiddenNavi()
    if(isiOS()){
      this.height = '88px'
      this.Top = '44px'
    }else{
      this.height = '44px'
      this.Top = '0px'
    }
    const dsType = dsBridge.call('openBackButton', 'test')
    console.log(dsType)
    if (dsType == 1) {
      this.isGteatChefbrowser = true
    }
  },
  mounted() {
  },
  methods: {
    close() {
      this.$emit('closeWindow')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapcent{
  width: 100%;
  height: 88px;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 99;
}
.report_nav{
  // padding-top: 44px;
  // position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  padding-right: 16px;
  .nav_right{
    display: flex;
    align-items: center;
  }
}
.title{color: #333;font-weight: bold;font-size: 16px;}
.rt_close, .rt_music, .rt_share, .rt_music_close{
  background-size: 100% 100%;
  cursor: pointer;
}
  .rt_close{
    width: 8px; height: 16px;
    background-image: url("https://img.mingchu.co/Nuploads/AdImage/6213006b709cd.png");
  }
  .rt_music{
    width: 32px; height: 32px;
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Ccircle opacity='0.2' cx='16' cy='16' r='16' fill='black' fill-opacity='0.6'/%3E %3Cpath d='M13.375 21.25V9.875L23.875 8.125V19.5M13.375 21.25C13.375 22.6997 12.1997 23.875 10.75 23.875C9.30025 23.875 8.125 22.6997 8.125 21.25C8.125 19.8003 9.30025 18.625 10.75 18.625C12.1997 18.625 13.375 19.8003 13.375 21.25ZM23.875 19.5C23.875 20.9497 22.6997 22.125 21.25 22.125C19.8003 22.125 18.625 20.9497 18.625 19.5C18.625 18.0503 19.8003 16.875 21.25 16.875C22.6997 16.875 23.875 18.0503 23.875 19.5Z' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3C/svg%3E ");
  }
  .rt_music_close{
    width: 32px; height: 32px;
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Ccircle opacity='0.2' cx='16' cy='16' r='16' fill='black' fill-opacity='0.6'/%3E %3Cg clip-path='url(%23clip0_651_5166)'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.625 11.039V18.4433C12.0887 18.0844 11.4438 17.875 10.75 17.875C8.88604 17.875 7.375 19.386 7.375 21.25C7.375 23.114 8.88604 24.625 10.75 24.625C12.614 24.625 14.125 23.114 14.125 21.25V12.5369L12.625 11.039ZM20.0578 16.3416C20.4285 16.2016 20.8303 16.125 21.25 16.125C21.9438 16.125 22.5887 16.3344 23.125 16.6933V9.01035L14.205 10.497L12.9579 9.25161C13.0442 9.19379 13.1436 9.15322 13.2517 9.13521L23.7517 7.38521C23.9692 7.34897 24.1916 7.41024 24.3598 7.55274C24.528 7.69524 24.625 7.90454 24.625 8.12501V19.5C24.625 19.918 24.549 20.3183 24.4101 20.6877L23.1225 19.4019C23.0731 18.4436 22.3041 17.6755 21.3454 17.6274L20.0578 16.3416ZM18.7871 17.1925C18.2214 17.796 17.875 18.6075 17.875 19.5C17.875 21.364 19.386 22.875 21.25 22.875C22.1442 22.875 22.9571 22.5273 23.561 21.9597L22.4986 20.8988C22.1671 21.195 21.7296 21.375 21.25 21.375C20.2145 21.375 19.375 20.5355 19.375 19.5C19.375 19.0214 19.5543 18.5847 19.8495 18.2533L18.7871 17.1925ZM10.75 19.375C11.7855 19.375 12.625 20.2145 12.625 21.25C12.625 22.2855 11.7855 23.125 10.75 23.125C9.71447 23.125 8.875 22.2855 8.875 21.25C8.875 20.2145 9.71447 19.375 10.75 19.375Z' fill='white'/%3E %3Cpath d='M6.89893 6.38672L25.6919 25.1419' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E %3C/g%3E %3Cdefs%3E %3CclipPath id='clip0_651_5166'%3E %3Crect width='21' height='21' fill='white' transform='translate(5.5 5.5)'/%3E %3C/clipPath%3E %3C/defs%3E %3C/svg%3E ");
  }
  .rt_share{
    width: 24px; height: 24px; margin-left: 22px;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M9.51136 4.86818H5.75C4.64543 4.86818 3.75 5.76361 3.75 6.86818V19C3.75 20.1046 4.64543 21 5.75 21H17.8818C18.9864 21 19.8818 20.1046 19.8818 19V11.2057M18.1534 3L20.5977 5.44434L18.1534 7.88868M19.3057 5.44432C14.2146 5.44432 10.0875 9.57144 10.0875 14.6625' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E %3C/svg%3E ");
  }
</style>
