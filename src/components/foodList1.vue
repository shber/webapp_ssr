<template>
  <div class="joinOpus">
    <div v-if="releaseShow" class="icon_apply" style=" width: 70px; height: 70px; border-radius: 50%;  position: fixed; bottom: 7%; right: 6px;z-index:99" @click="icon_apply">
      <img src="https://static.mingchu.co/webapp/findNew/imgs/plus.png" alt="" style="width: 70px; height: 70px;border-radius: 50%;">
    </div>
    <ul v-if="temDataInfo.length != 0" class="second_tab" style="padding-left:18px">
      <div v-for="tabs in seconedTabsInfo" :key="tabs.val">
        <li :class="{seconed_checked:tabs.val=== seconedTab}" @click="checkTab(tabs)">{{ tabs.name }}</li>
      </div>
    </ul>
    <ul v-if="temDataInfo.length != 0" class="foods_list" style="padding-left:18px">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoadList"
      >
        <li v-for="(item,index) in temDataInfo" :key="index">
          <div class="list">
            <div @click="goSuperLink(item.des, item.skuid)">
              <div class="img_box">
                <van-image v-if="item.pic_url" fit="cover" :src="item.pic_url" class="img" />
                <img v-show="item.card_type == 5" src="https://static.mingchu.co/webapp/images/zan/replay.png" mode="" class="icon_replay">
              </div>
            </div>
            <span class="icon_text" @click.stop="opnPraise(item.id,item,index)">
              <svg v-if="item.ps == 0" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.16663 5.25V2.91666C8.16663 2.45254 7.98225 2.00742 7.65406 1.67923C7.32587 1.35104 6.88075 1.16666 6.41663 1.16666L4.08329 6.41666V12.8333H10.6633C10.9447 12.8365 11.2177 12.7379 11.4321 12.5557C11.6465 12.3734 11.7878 12.1199 11.83 11.8417L12.635 6.59166C12.6603 6.42446 12.6491 6.25373 12.6019 6.09131C12.5548 5.92889 12.4729 5.77867 12.3619 5.65105C12.2509 5.52343 12.1135 5.42146 11.9592 5.35221C11.8049 5.28296 11.6374 5.24808 11.4683 5.25H8.16663ZM4.08329 12.8333H2.33329C2.02387 12.8333 1.72713 12.7104 1.50833 12.4916C1.28954 12.2728 1.16663 11.9761 1.16663 11.6667V7.58333C1.16663 7.27391 1.28954 6.97717 1.50833 6.75837C1.72713 6.53958 2.02387 6.41666 2.33329 6.41666H4.08329" fill="#333333" fill-opacity="0.3" />
                <path d="M4.08329 12.8333H2.33329C2.02387 12.8333 1.72713 12.7104 1.50833 12.4916C1.28954 12.2728 1.16663 11.9761 1.16663 11.6667V7.58333C1.16663 7.27391 1.28954 6.97717 1.50833 6.75837C1.72713 6.53958 2.02387 6.41666 2.33329 6.41666H4.08329M8.16663 5.25V2.91666C8.16663 2.45254 7.98225 2.00742 7.65406 1.67923C7.32587 1.35104 6.88075 1.16666 6.41663 1.16666L4.08329 6.41666V12.8333H10.6633C10.9447 12.8365 11.2177 12.7379 11.4321 12.5557C11.6465 12.3734 11.7878 12.1199 11.83 11.8417L12.635 6.59166C12.6603 6.42446 12.6491 6.25373 12.6019 6.09131C12.5548 5.92889 12.4729 5.77867 12.3619 5.65105C12.2509 5.52343 12.1135 5.42146 11.9592 5.35221C11.8049 5.28296 11.6374 5.24808 11.4683 5.25H8.16663Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.16667 5.24999V2.91666C8.16667 2.45253 7.98229 2.00741 7.6541 1.67922C7.32591 1.35103 6.8808 1.16666 6.41667 1.16666L4.08333 6.41666V12.8333H10.6633C10.9447 12.8365 11.2177 12.7379 11.4321 12.5557C11.6465 12.3734 11.7878 12.1199 11.83 11.8417L12.635 6.59166C12.6604 6.42445 12.6491 6.25372 12.6019 6.0913C12.5548 5.92889 12.4729 5.77866 12.3619 5.65104C12.2509 5.52342 12.1135 5.42145 11.9592 5.3522C11.805 5.28295 11.6374 5.24808 11.4683 5.24999H8.16667ZM4.08333 12.8333H2.33333C2.02391 12.8333 1.72717 12.7104 1.50838 12.4916C1.28958 12.2728 1.16667 11.9761 1.16667 11.6667V7.58332C1.16667 7.2739 1.28958 6.97716 1.50838 6.75837C1.72717 6.53957 2.02391 6.41666 2.33333 6.41666H4.08333" fill="#E45343" />
                <path d="M4.08333 12.8333H2.33333C2.02391 12.8333 1.72717 12.7104 1.50838 12.4916C1.28958 12.2728 1.16667 11.9761 1.16667 11.6667V7.58332C1.16667 7.2739 1.28958 6.97716 1.50838 6.75837C1.72717 6.53957 2.02391 6.41666 2.33333 6.41666H4.08333M8.16667 5.24999V2.91666C8.16667 2.45253 7.98229 2.00741 7.6541 1.67922C7.32591 1.35103 6.8808 1.16666 6.41667 1.16666L4.08333 6.41666V12.8333H10.6633C10.9447 12.8365 11.2177 12.7379 11.4321 12.5557C11.6465 12.3734 11.7878 12.1199 11.83 11.8417L12.635 6.59166C12.6604 6.42445 12.6491 6.25372 12.6019 6.0913C12.5548 5.92889 12.4729 5.77866 12.3619 5.65104C12.2509 5.52342 12.1135 5.42145 11.9592 5.3522C11.805 5.28295 11.6374 5.24807 11.4683 5.24999H8.16667Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="text_zan">{{ item.zan }}</span>
            </span>
            <span v-if="item.completion == 1" class="icon_brand">
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.82726 3.17153C0.327914 8.10021 -1.75718 18.1734 3.17153 25.6727C8.10021 33.1721 18.1734 35.2572 25.6727 30.3285C33.1721 25.3998 35.2572 15.3266 30.3285 7.82726C25.3998 0.327914 15.3266 -1.75718 7.82726 3.17153ZM24.9396 29.2177C18.0528 33.7433 8.80475 31.8264 4.27913 24.9428C-0.24653 18.056 1.67038 8.80796 8.55405 4.2823C15.4409 -0.243387 24.6889 1.67355 29.2145 8.55719C33.7401 15.4408 31.8264 24.692 24.9396 29.2177L24.9396 29.2177ZM9.52701 4.46173C2.79636 8.3956 0.526255 17.046 4.46304 23.7771C8.39668 30.508 17.0466 32.7782 23.7774 28.8411C30.5082 24.9041 32.7781 16.2569 28.8413 9.52579C24.9045 2.79472 16.2576 0.527895 9.52701 4.46176L9.52701 4.46173ZM23.4379 28.2638C17.0257 32.0117 8.78795 29.8532 5.04022 23.4407C1.29249 17.0282 3.45098 8.79006 9.86313 5.04211C16.2753 1.29417 24.5131 3.45272 28.2608 9.86517C32.0117 16.2778 29.85 24.5158 23.4379 28.2638ZM15.7706 4.4854L16.2963 5.71681L17.6261 5.59222L16.6246 6.47605L17.1505 7.70426L16.0026 7.02309L15.0011 7.90689L15.2949 6.60065L14.1471 5.91627L15.4769 5.79167L15.7706 4.4854ZM10.6415 6.14019L11.6389 7.03005L12.7913 6.35478L12.2542 7.58142L13.2484 8.47111L11.9226 8.33793L11.3855 9.56457L11.1018 8.25669L9.77279 8.12334L10.9252 7.44807L10.6415 6.14019ZM13.3809 10.8475C11.3871 12.0169 10.1809 14.0206 9.94814 16.1613L9.23096 16.5855C9.34463 14.0532 10.6901 11.63 13.0343 10.2561C15.3784 8.8821 18.1419 8.88997 20.3953 10.0336L19.6783 10.4546C17.7075 9.60928 15.3747 9.67809 13.3809 10.8475ZM20.4557 22.9891C22.4495 21.8197 23.6557 19.816 23.8885 17.6753L24.6055 17.2543C24.4918 19.7866 23.1463 22.2097 20.8022 23.5837C18.4581 24.9577 15.6945 24.9498 13.4411 23.8062L14.1583 23.382C16.1291 24.2273 18.4619 24.1585 20.4557 22.9891ZM7.96953 10.1977L6.69184 9.81223L7.49903 10.88L6.74007 11.9804L7.99774 11.5367L8.80825 12.6015L8.77688 11.2623L10.0345 10.8186L8.75673 10.4364L8.72852 9.0973L7.96953 10.1977ZM21.0724 6.49894L21.1139 5.16355L20.2967 6.22263L19.0415 5.7715L19.7927 6.87774L18.9756 7.93686L20.2583 7.5614L21.0097 8.66447L21.0479 7.32888L22.3308 6.95027L21.0724 6.49894ZM4.65567 14.817L5.97634 14.6251L6.20099 13.3056L6.7918 14.5054L8.11261 14.3103L7.15592 15.2474L7.74674 16.4472L6.56715 15.8248L5.61063 16.7588L5.83528 15.4393L4.65567 14.817ZM22.1977 26.8065L23.1951 27.6964L22.9114 26.3885L24.0638 25.7132L22.7349 25.5799L22.4511 24.272L21.914 25.4986L20.5882 25.3655L21.5824 26.2552L21.0453 27.4818L22.1977 26.8065ZM27.1448 24.0243L25.8671 23.6389L25.1081 24.7393L25.0799 23.4002L23.8021 23.0179L25.0597 22.5743L25.0284 21.2351L25.8389 22.2998L27.0965 21.8562L26.3376 22.9566L27.1448 24.0243ZM17.5403 28.1198L18.066 29.3512L18.3597 28.0449L19.6896 27.9203L18.5417 27.236L18.8355 25.9297L17.8341 26.8135L16.6861 26.1323L17.212 27.3605L16.2105 28.2444L17.5403 28.1198ZM12.7228 28.6731L12.7642 27.3376L11.5058 26.8863L12.7887 26.5077L12.8269 25.1721L13.5783 26.2752L14.861 25.8997L14.0439 26.9588L14.7951 28.0651L13.5399 27.6139L12.7228 28.6731ZM27.8603 19.2115L29.1809 19.0196L28.0013 18.3972L28.226 17.0778L27.2695 18.0117L26.0899 17.3894L26.6807 18.5892L25.724 19.5263L27.0448 19.3312L27.6356 20.531L27.8603 19.2115ZM11.9035 18.5542L11.2631 17.4451L9.51881 18.4521C9.37979 18.3176 9.24413 18.1996 9.11645 18.0953L8.62192 18.5036C8.73826 18.5775 8.85531 18.6634 8.97574 18.7657L7.27748 19.7462L7.91785 20.8553L8.4011 20.5763L8.02909 19.932L11.0482 18.1889L11.4202 18.8332L11.9035 18.5542ZM11.0796 18.7108L8.45622 20.2254L8.72194 20.6856L11.3453 19.1711L11.0796 18.7108ZM12.2937 19.1451L8.24824 21.4807L8.51661 21.9456L9.70862 21.2574C9.87355 21.5855 9.93031 21.8964 9.87694 22.1972C9.81294 22.4796 9.56925 22.8228 9.14855 23.2314L9.67446 23.5046C10.101 23.0742 10.3503 22.6664 10.4324 22.2877C10.5057 21.8833 10.4247 21.4453 10.1873 20.981L10.8454 20.601L11.4273 21.6089C11.6452 21.9863 11.9198 22.0794 12.2512 21.8881L13.0566 21.4231C13.2085 21.3354 13.297 21.2229 13.3228 21.0976C13.3551 20.9623 13.2483 20.6497 13.0095 20.1616L12.4715 20.282C12.6429 20.6003 12.7335 20.7996 12.7496 20.8701C12.7611 20.9432 12.7475 20.994 12.7015 21.0206L12.1354 21.3474C12.025 21.4112 11.9299 21.374 11.8502 21.236L11.324 20.3247L12.5621 19.6099L12.2937 19.1451ZM12.8289 16.9154L12.1155 17.3272L12.6204 18.2017L13.2877 17.8164C13.0949 18.1732 12.8728 18.4794 12.6314 18.7415L13.0564 18.9993C13.2331 18.7316 13.3867 18.4342 13.5144 18.1028L13.7589 18.5262L14.1823 18.2817L13.9432 17.8675C14.1436 17.8745 14.3975 17.8998 14.7022 17.9386L14.7389 17.4388C14.4048 17.466 14.0787 17.507 13.7651 17.5592L13.7572 17.5454L14.4705 17.1335L14.1942 16.6549L14.6459 16.842L14.6498 16.8214C14.6667 16.731 14.6848 16.6346 14.6966 16.5366C14.8909 16.6392 15.0955 16.7174 15.3133 16.7758C15.1923 16.9807 15.0146 17.1937 14.7875 17.4168L15.1745 17.715C15.4658 17.4118 15.6821 17.1274 15.816 16.8599C16.1272 16.8888 16.4567 16.8643 16.8044 16.7863L16.8397 16.2627C16.5394 16.3379 16.2462 16.3722 15.9674 16.3675C16.0152 16.0146 15.9661 15.6318 15.8153 15.2219L16.05 15.0863L15.8162 14.6813L14.6334 15.3642C14.6078 15.2562 14.5823 15.1482 14.5469 15.0337L14.087 15.2256C14.2348 15.7048 14.2652 16.172 14.1729 16.618L13.9657 16.2591L13.2523 16.6709L13.1513 16.496L13.9613 16.0284L13.7541 15.6694L12.9441 16.137L12.8378 15.9529L12.4144 16.1974L12.5207 16.3815L11.66 16.8784L11.8673 17.2374L12.7279 16.7405L12.8289 16.9154ZM15.4906 16.3175C15.2181 16.2601 14.9619 16.1564 14.7193 16.0019L14.7107 15.8596L15.4011 15.461C15.5053 15.769 15.5369 16.0576 15.4906 16.3175ZM13.7743 16.7991L13.9151 17.043L13.5791 17.237L13.4383 16.9931L13.7743 16.7991ZM13.0149 17.2375L13.1557 17.4815L12.8198 17.6754L12.6789 17.4315L13.0149 17.2375ZM13.4352 19.4004L14.9954 18.4996L15.5215 19.4109L14.8588 19.7935L14.415 19.0249L13.9732 19.28L14.4169 20.0486L13.7312 20.4445L13.9756 20.8679L18.0993 18.4871L17.8549 18.0637L16.0001 19.1345L15.854 18.8814L17.2071 18.1002L16.9733 17.6952L15.6202 18.4764L15.474 18.2232L17.1078 17.28L16.8687 16.8657L13.196 18.9862L13.4352 19.4004ZM18.7839 15.4532C18.8609 14.9914 18.8778 14.4785 18.8344 13.9145L18.9678 13.8374L20.8172 17.0406L21.3051 16.759L20.7125 15.7327L21.9828 14.9993L21.7144 14.5344L20.4442 15.2678L20.0801 14.6373L21.3504 13.9039L21.0793 13.4345L19.8091 14.1679L19.4557 13.5558L20.9008 12.7214L20.6271 12.2474L18.7724 13.3182C18.7385 13.1107 18.702 12.8986 18.6601 12.6773L18.1085 12.8485C18.2894 13.7996 18.318 14.5931 18.1996 15.2383L18.7839 15.4532ZM17.5392 16.2946C17.5975 16.0768 17.644 15.8597 17.6833 15.6407L19.0729 18.0477L19.5608 17.766L17.7725 14.6687C17.7759 14.2494 17.7365 13.8304 17.6523 13.4188L17.0744 13.4701C17.2475 14.2907 17.2504 15.0929 17.0805 15.8721L17.5392 16.2946ZM24.2373 9.56167L21.591 11.0895L22.5396 12.7326L25.1859 11.2047L24.2373 9.56167ZM24.0145 10.2917L24.4423 11.0327L22.7624 12.0025L22.3346 11.2616L24.0145 10.2917ZM25.0404 14.492L23.8287 12.3933L22.0936 13.395L23.3053 15.4937L23.7747 15.2227L23.6498 15.0064L24.4506 14.544L24.5755 14.7603L25.0404 14.492ZM24.1929 14.0976L23.3921 14.5599L22.8235 13.575L23.6243 13.1127L24.1929 14.0976ZM27.1897 13.2511L25.978 11.1524L24.1877 12.186L25.3993 14.2847L25.8688 14.0137L25.7439 13.7974L26.5861 13.3111L26.711 13.5274L27.1897 13.2511ZM26.3284 12.8647L25.4862 13.3509L24.9175 12.366L25.7598 11.8798L26.3284 12.8647Z" fill="white" />
              </svg>
            </span>
          </div>
          <p class="list_des text_overflow2 fw_bold">{{ item.name }}</p>
        </li>
      </van-list>
      <div v-if="finished" style="color:#969799;font-size:14px;line-height:50px;width:100%;text-align:center;">没有更多了</div>
    </ul>
    <gcNoata v-else no-data-text="暂无数据" />

  </div>
</template>
<script>
import '@/style/scss/bigEvent/index.scss'
import '@/style/scss/articles.scss'
// import config from '@/config/config'
// import { superLink } from '@/utils'
import { ajaxHttp } from '@/api/api'
import { Toast, Image, List } from 'vant'
import gcNoata from '@/components/gc-nodata.vue'
import { goAppPageOther, pulishNewFoodClick } from '@/utils/utils.js'
export default {
  name: 'JoinOpus',
  components: {
    gcNoata,
    vanImage: Image,
    vanList: List
  },
  props: {
    dataInfo: {
      type: Object,
      default: () => {}
    },
    inApp: {
      type: Boolean,
      default: true
    },
    releaseShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      seconedTab: 1,
      seconedTabsInfo: [
        { name: '最新', val: 1 },
        { name: '热门', val: 2 }
      ],
      temDataInfo: [],
      pathInfo: {},
      loading: false,
      finished: false,
      page: 1,
      parentData: []
    }
  },
  computed: {
    parentId() {
      return this.dataId
    },
    isApp() {
      return this.inApp
    }
  },
  watch: {
  },
  created() {
    const self = this
    this.$nextTick(() => {
      const { query } = self.$route
      self.pathInfo = query
      this.getCheckTabData(1)
      this.page++
    })
  },
  methods: {
    icon_apply() {
      console.log('publishNewFood', this.dataInfo.id, this.dataInfo.title, this.dataInfo.id, this.dataInfo.title)
      pulishNewFoodClick('publishNewFood', this.dataInfo.id, this.dataInfo.title, this.dataInfo.id, this.dataInfo.title)
      // pulishNewFoodClick('publishNewFood', this.parentData.id, this.parentData.title, this.parentData.subject.id, this.parentData.subject.title_cn)
    },
    goSuperLink($des, $skuid) {
      goAppPageOther({ 'des': $des, 'skuid': $skuid }, () => { })
      // JSON标准格式双引号，eslint默认单引号，冲突
      // const data = `{
      //   "des": "${$des}",
      //   "skuid": "${$skuid}",
      //   "link": "${config.webapplink}/${$des}?id=${$skuid}"
      // }`
      // return superLink(data)
    },
    checkTab($tab) {
      this.seconedTab = $tab.val
      this.page = 1
      this.temDataInfo = []
      this.getCheckTabData($tab.val)
      this.page++
    },
    onLoadList() {
      console.log(this.page)
      this.getCheckTabData(this.seconedTab)
      this.page++
    },
    getCheckTabData($seconedTab) {
      Toast.loading({
        message: 'Loading...',
        forbidClick: true
      })
      const data = {
        page: this.page,
        id: this.dataInfo.id,
        sort: $seconedTab
      }
      ajaxHttp.$get('/api/theme/detail', data).then(res => {
        if (res.data && res.data.list.length > 0) {
          this.temDataInfo = [...this.temDataInfo, ...res.data.list]
          this.loading = false
          this.finished = false
        } else {
          this.finished = true
          this.loading = false
        }
        this.$nextTick(() => {
          Toast.clear()
        })
      })
    },
    async opnPraise($id, $item, $index) { // 点赞
      // if (!this.isApp) { this.$emit('getClickEvent', true); return false } // 如果不在APP内拉起app
      Toast.loading({
        message: 'Loading...',
        forbidClick: true
      })
      const data = { id: $id, type: 1 }
      const res = await ajaxHttp.praise(data)
      if (res.code === 1) {
        $item.zan = Number($item.zan) + 1
        this.temDataInfo[$index].ps = 1
        Toast.clear()
      } else { Toast(res.message) }
    }
  }
}
</script>
<style lang="scss" scoped>
@function r($px){
	// @return $px*(1/37.5)*1rem;
  @return $px * calc(1/37.5) * 1rem;
}
.foods_list{
    width: 100%;
    .work_list{
      box-sizing: border-box;
      padding-bottom: r(40);
    }
  .icon_apply{ width: r(68); height: r(68);  border-radius: 50%;  position: fixed; bottom: 7%; right: 16px;
    img{
      width: 100%; height: 100%;  border-radius: 50%;
    }
  }
  .van-list{
    width: r(359);
    display: flex;
    flex-wrap: wrap;
  }

	li{
    // float: left;
    width: r(166);
    overflow: hidden;
    // background: #fff;
    margin-bottom: r(16);
    &:nth-child(2n+1){margin-right: r(10);}
		.list{
			overflow: hidden;
			position: relative;
			.img_box{
        width: r(166); height: r(166); position: relative; border-radius: r(2); overflow: hidden;
				.img{width: r(166); height: r(166); border-radius: r(2); }
				.icon_replay{width: r(38); height: r(38); position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);}
			}
			.icon_text{
        color: #fff;
        display: flex;
        font-size: .48rem;
        line-height: r(16);
        align-items: center;
        padding: r(0) r(6);
				position: absolute;
				left: r(8);
        bottom: r(8);
        text-shadow:1px 1px 3px #999;
        background: rgba($color: #333, $alpha: .3);
        border-radius: r(32);
        svg{margin-right: r(3);}
        .text_zan{font-size: r(10); margin-top: r(2);}
			}
			.icon_brand{
				width: r(33);
				height: r(33);
				position: absolute;
				right: r(8);
				bottom: r(8);
				.icon_brand_img{
					width: r(33);
          height: r(31.2);
        }
			}
		}
		.list_des{
      margin-top: r(8);
      font-size: r(14);
      line-height: r(19);
		}
	}
  .icon_like{
      width: 1.46rem;
      height: 1.46rem;
      background: url('https://static.mingchu.co/webapp/images/zan/sub_icon_zan.png') no-repeat center;
      background-size: 100% 100%;
  }
  .icon_like_red_line{
      width: 1.46rem;
      height: 1.46rem;
      background: url('https://static.mingchu.co/webapp/images/zan/sub_icon_zan_active.png') no-repeat center;
      background-size: 100% 100%;
  }
}
</style>
