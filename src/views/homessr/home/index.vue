<!--
 * @Author: Shber
 * @Date: 2022-10-08 11:03:25
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-27 16:24:08
 * @Description:
-->
<template>
  <div class="find_home" style="background:#FF4D5A">
    <!-- <gc-loading :is-show="loadingShow" /> -->
    <div class="banner" style="background:url('https://static.mingchu.co/webapp/findNew/banner.png') no-repeat center;">
      <span class="question_tip" @click="setRuleShow('常见问题')">  <i class="svg svg_question" /> 常见问题</span>
      <div class="count_time">
        <template v-if="activeEnd">
          <h4>挑战已结束，我们将于10月26日公布获奖名单</h4>
          <div class="btn_list">
            <a v-if="data.server_time >= data.name_public_time" :href="goPrize()">获奖名单</a>
            <span v-else>获奖名单</span>
            <span>作品合集</span>
            <a href="#hot">热度排行榜</a>
          </div>
        </template>
        <template v-else>
          <h3>挑战结束倒计时</h3>
          <ul class="time_item">
            <li><p class="style_text fw400">{{ timeAll.day }}</p> <span>天</span> </li>
            <li><p class="style_text fw400">{{ timeAll.hour }}</p> <span>小时</span> </li>
            <li><p class="style_text fw400">{{ timeAll.minute }}</p> <span>分钟</span> </li>
            <li><p class="style_text fw400">{{ timeAll.second }}</p> <span>秒</span> </li>
          </ul>
        </template>

      </div>
    </div>
    <div class="user_card">
      <h3 class="fw500">Hi，<span class="user_name text_over">{{ data.nick_name }}</span> &nbsp; 师傅！</h3>
      <img class="user_pic" :src="data.head_pic_url" alt="">
      <span class="hot">您的热度排名 {{ data.sort }}</span>
      <p>完成探寻挑战，开启技艺比拼</p>
      <p>赢天府食材包&名厨周边与食材探访机会</p>
      <TransverseStepBar :step="data.step" />
    </div>
    <div class="brown_content">
      <ul ref="tabList" class="tab_list fw500">
        <li
          v-for="(tab,i) in tabInfo"
          :key="i"
          :class="{active:tab.value==tabActive}"
          @click="setTabChecked(tab)"
        >
          {{ tab.name }}
          <template v-if="!tab.isStart">
            <span class="svg svg_lock" />
          </template>
        </li>
      </ul>
      <div class="tab_content">
        <div v-show="tabActive == 0" class="step_content">
          <StepCard
            title="活动助力"
            right-top-text=""
            :index="1"
            :is-end="data.step > 0"
          >
            <div>
              <p>分享活动页面，得名厨 100积分，</p>
              <p>邀请好友关注你的名厨个人主页</p>
              <p>提升热度排名，有机会得天府食材包及名厨周边</p>
              <div class="share_btns" @click="showShare = true">立即分享</div>
            </div>
          </StepCard>
          <StepCard
            title="拜师学艺"
            :index="2"
            :is-end="data.step > 1"
            :right-top-text="resetText(data.step >= 1, '已关注 '+ data.follow_count+ '/6')"
            class="cards_top"
          >
            <div class="">
              <p>立即点击关注，时刻掌握用户最新动态，</p>
              <p>得名厨200积分，随时学习最新技艺，助力成长！</p>
              <div class="user_auto">
                <ul class="user_list" :style="{'width':2.187 * data.user.length +1.26 + 'rem'}">
                  <li v-for="(user, i) in data.user" :key="i">
                    <img :src="user.head_pic_url" alt="">
                    <p class="user_na fw500 text_overflow">{{ user.nick_name }}</p>
                    <template v-if="data.step >= 1">
                      <span v-if="user.follow_status == 0" class="user_btn" @click="follow(user)">关注</span>
                      <span v-else class="user_btn active">已关注</span>
                    </template>
                  </li>
                </ul>
              </div>
            </div>
          </StepCard>
          <StepCard
            title="资讯学习"
            :index="3"
            :is-end="data.step > 2"
            :right-top-text="resetText(data.step >= 2, '已阅读 '+ data.read_news_count+ '/3')"
            class="cards_top"
          >
            <div class="">
              <p>阅读川菜资讯，探寻川菜文化与川味经典，</p>
              <p>得名厨Market 20元优惠券！</p>
              <ul class="news_list">
                <li v-for="(news, i) in data.news" :key="i">
                  <div class="href" @click="readNews(news)">
                    <span class="fw500 text_over">{{ news.news_title }}</span>
                    <template v-if="data.step >= 2">
                      <i v-show="news.is_read" class="svg svg_checked" />
                    </template>
                  </div>
                </li>
              </ul>
            </div>
          </StepCard>
          <StepCard
            title="佳作赏析"
            :index="4"
            :is-end="data.step > 3"
            :right-top-text="resetText(data.step >= 3, '已阅读 '+ data.read_food_count+ '/3')"
            class="cards_top"
          >
            <div class="">
              <p>查看川菜佳作，大师经典作品详尽拆解，学习传统技法与新思路，获得加入川菜交流群资格！</p>
              <div class="works_auto">
                <ul class="works_list" :style="{'width':3.204 * data.food.length +1.36 + 'rem'}">
                  <li v-for="(works, i) in data.food" :key="i">
                    <i v-show="works.is_read" class="svg svg_checked" />
                    <template v-if="data.step >= 3">
                      <i v-show="works.is_read" class="svg svg_checked" />
                    </template>
                    <div @click="readWorks(works)">
                      <img :src="works.pic" alt="">
                      <p class="text_overflow2 fw500">{{ works.food_name }}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <template v-if="!isActiveEnd">
                <div v-show="data.step > 3" class="share_btns" @click="showPopup = true"> <i class="svg svg_wechat" /> 立即加群</div>
              </template>
            </div>
          </StepCard>
          <StepCard
            title="技艺比拼"
            :index="5"
            :is-end="data.step > 4"
            right-top-text=""
            class="cards_top"
          >
            <div class="">
              <p>上传你的川菜作品，赢取机会，踏上寻味天府之旅，更有天府食材包&名厨周边好礼等你拿！</p>
              <div class="share_btns" @click="showPk">参与比拼</div>
            </div>
          </StepCard>
        </div>
        <div v-show="tabActive == 1" class="pk_content">
          <p>调味是川菜的灵魂，在基本味的基础上，调味料组合与分量多寡的变化，逐渐演变出多达24种不同川菜味型。</p>
          <p class="rule_tips fw500">快来进行川菜技艺比拼，成为川菜守“味”者！</p>
          <h3 class="pk_title fw500">请选择赛道上传作品</h3>
          <div class="check_works">
            <template v-for="(works, i) in data.compete_food" :key="i">
              <div @click="goWorkslist(i, works.subject_id)">
                <div class="pic_box">
                  <span class="new_icon"> <i class="svg svg_reset" /> 最新作品</span>
                  <img :src="works.pic" class="pk_pic" alt="">
                </div>
                <p class="works_name text_overflow2">{{ works.food_name }}</p>
                <div v-if="i == 0" class="button_text">
                  <span>经典川菜，传统演绎 ⬇️</span>
                  <div class="button fw500">传统赛道</div>
                </div>
                <div v-else class="button_text">
                  <span>融合菜式，创新诠释 ⬇️</span>
                  <div class="button fw500">创新赛道</div>
                </div>
              </div>
            </template>
          </div>
          <h3 class="pk_title pk_title1 fw500">参赛规则</h3>
          <ul type="B" class="num_ol"> <!--type后为属性-->
            <li><i>1.</i> 传统或者创新赛道选其一，上传至少一道完整的川菜作品；</li>
            <li><i>2.</i> 菜谱：注明主料、辅料、调料及用量，制作步骤完整细致；</li>
            <li><i>3.</i> 图片：使用高清原图，完整的展示菜品的成品和制作过程。</li>
          </ul>
          <h3 class="pk_title pk_title1 fw500">评选规则</h3>
          <ul type="B" class="num_ol"> <!--type后为属性-->
            <li><i>1.</i> <p>职业认证用户可参与最终评选，如未认证，请点击此处完成认证；</p></li>
            <li><i>2.</i>作品质量：菜品图片清晰精美，菜谱完整且详细；</li>
            <li><i>3.</i>作品热度：菜品获得的浏览量、点赞、评论、收藏都会影响作品热度值；</li>
            <li><i>4.</i>名厨将按照作品质量（50%）与作品热度（50%）对参与用户进行排名，最终排名前2位用户，可获得本次食材探访寻味天府之旅名额；</li>
            <li><i>5.</i>加分项：在菜品描述中分享你对川菜传承的独到见解或心得；</li>
            <li><i>6.</i>如上传多道菜品参赛，最终排名以取得最高分的菜品为准；</li>
            <li><i>7.</i>参赛作品必须为原创，非原创者将取消评选资格。</li>
          </ul>
        </div>
      </div>
      <div id="hot" class="hot_ranking">
        <div class="hot_top">
          <h3 class="find_title fw500">热度排行</h3>
          <span>排行榜截止时间：{{ setTime(data.end_time) }}</span>
        </div>
        <div class="ranking_content">
          <div class="list_title">
            <span>排名</span>
            <span style="flex:1">用户名</span>
            <span>热度</span>
          </div>
          <ul class="ranking_list">
            <li v-for="(user,i) in data.rank" :key="i" :class="'ranking_item num_'+user.sort">
              <span class="ranking_num style_text fw400">{{ setNum(user.sort) }}</span>
              <div class="name_pic">
                <div class="name_group">
                  <img class="user_pic" :src="user.head_pic_url" alt="">
                  <span class="user_names text_overflow"> {{ user.nick_name }}</span>
                </div>
              </div>
              <span class="score_num style_text fw400">{{ user.score }}</span>
            </li>
          </ul>
          <div class="self_show">
            <div class="self_top">
              <div class="self_title"><h4 class="fw500">我的排名</h4> <span @click="setRuleShow('热度值攻略')">热度值攻略 <i class="svg svg_warning" /></span> </div>
              <template v-if="data.sort == 1">
                <p>第一名！查看热度值攻略，继续保持领先！</p>
              </template>
              <template v-else>
                <template v-if="data.variance == 0">
                  <p>距离提升名次一步之遥</p>
                  <p>快点击热度值攻略查看攻略超越他吧！</p>
                </template>
                <template v-else>
                  <p>距离上一名热度仅差 <span class="color_mc fw500">{{ data.variance }}</span></p>
                  <p>快点击热度值攻略查看攻略超越他吧！</p>
                </template>
              </template>
            </div>
            <div class="ranking_item">
              <span class="ranking_num style_text fw400">{{ data.sort }}</span>
              <div class="name_pic">
                <div class="name_group">
                  <img class="user_pic" :src="data.head_pic_url" alt="">
                  <span class="user_names text_overflow">{{ data.nick_name }}</span>
                </div>
              </div>
              <span class="style_text score_num fw400">{{ data.score }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="reward_content">
        <div>
          <h3 class="find_title fw500">我的赢取</h3>
          <p class="reward_desc">你的奖励会在10月31日统一进行发放</p>
        </div>
        <RewardStep :step="data.step" />
      </div>
    </div>
    <BottomLogo />
    <Popup :closeable="true" :show="showPopup" @click-close-icon="showPopup=false">
      <div class="popup_cintent">
        <img class="wecode" src="https://static.mingchu.co/webapp/findNew/wecode.jpg" alt="">
        <span>名厨小7 : xiao7laile</span>
        <h3 class="fw500">恭喜您获得加入</h3>
        <p>名厨川菜交流群资格<br>立即截图添加好友申请进群</p>
        <div class="button" @click="copyWecode('xiao7laile')">复制微信号</div>
      </div>
    </Popup>
    <ShareBtn
      :show="showShare"
      @onSelect="onSelect"
      @onCancel="shareCancel"
    />
    <ShareInfo :share-info="shareInfo" />
    <ActionSheet
      :rule-show="ruleShow"
      :rule-title="ruleTitle"
      @onCancel="ruleCancel"
    />
  </div>
</template>
<script>
import 'vant/lib/index.css'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, onDeactivated, onBeforeMount, onMounted, toRefs } from 'vue'
import { ajaxHttp } from '@/api/api'
import { get, post } from '@/api/ajax'
import { Toast, Popup } from 'vant'
import { coypText, platformType, checkVersion } from '@/utils/index.js'
import { goAppPageOther, isiOS, shareWecaht, formatTime } from '@/utils/utils.js'
import config from '@/config/config.js'
import ShareBtn from '@/components/ShareBtn.vue'
import ShareInfo from '@/components/shareInfo.vue'
import StepCard from '../components/StepCard.vue'
import RewardStep from '../components/RewardStep.vue'
import TransverseStepBar from '../components/TransverseStepBar.vue'
import BottomLogo from '../components/bottomLogo.vue'
import ActionSheet from '../components/actionSheet.vue'

export default {
  name: 'Home',
  components: {
    Popup,
    ShareBtn,
    StepCard,
    RewardStep,
    TransverseStepBar,
    ActionSheet,
    ShareInfo,
    BottomLogo
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const tabList = ref(null)
    const state = reactive({
      loadingShow: true,
      ruleShow: false, // 规则说明弹框
      ruleTitle: '常见问题', // 规则说明弹框title
      showShare: false,
      showPopup: false, // 加群弹框
      tabActive: 0, // tab选中状态
      tabInfo: [
        { name: '我的任务', value: 0, isStart: true },
        { name: '技艺比拼', value: 1, isStart: false }
      ],
      data: {
        follow_count: 0,
        user: [],
        read_news_count: 0,
        news: [],
        read_food_count: 0,
        food: [],
        compete_food: [],
        rank: [],
        score: 0,
        step: 0,
        nick_name: '',
        head_pic_url: ''
      },
      timeInterval: null,
      timeAll: { day: '00', hour: '00', minute: '00', second: '00' },
      activeEnd: false,
      shareInfo: { share_title: '闯关任务开启｜寻找川菜守“味”者', share_desc: '与星厨同行，共赴天府寻味之旅！', share_img: 'https://static.mingchu.co/webapp/findNew/share1.jpg', share_link: `${config.webapplink}/riseActivity/findNew/findshare` },
      isVersion: true,
      isActiveEnd: false // 活动结束状态
    })

    onBeforeMount(async() => {
      // sensors.track('PlanVisit', {
      //   PlatformType: platformType(),
      //   page_type: 'main'
      // })
      // 检查版本号， 小于3.4.50的跳原生主题
      console.log("router", route.mate);
      if (isiOS()) {
        state.isVersion = await checkVer([3, 4, 51])
      } else {
        state.isVersion = await checkVer([3, 4, 49])
      }
      console.log('app版本是否>=3.4.50', state.isVersion)
    })

    onMounted(() => {
      setTimeout(() => { window.scrollTo(0, 0) }, 300)
    })

    onDeactivated(() => {
      clearInterval(state.timeInterval)
    })

    const checkVer = (arr) => { return checkVersion(arr) }

    const getData = async() => {
      state.loadingShow = true
      const res = await get('/api/plan/detail')
      if (res.code === 1) {
        state.data = res.data
        // 达到第五步，则开启技艺比拼tab
        state.tabInfo[1].isStart = res.data.step >= 4
        checkStep()
        state.shareInfo.share_link = `${config.webapplink}/riseActivity/findNew/findshare?id=${res.data.uid}`
      }
      let countTime = (res.data.end_time - res.data.server_time)
      state.isActiveEnd = res.data.server_time >= res.data.end_time
      // 如果倒计时结束，停掉计时器
      if (countTime >= 0) {
        state.timeInterval = setInterval(() => {
          countTime -= 1
          resetTime(countTime)
          if (countTime <= 0) {
            clearInterval(state.timeInterval)
          }
        }, 1000)
      } else {
        clearInterval(state.timeInterval)
        state.activeEnd = true
      }
      // state.loadingShow = false
      setTimeout(() => { state.loadingShow = false }, 300)
    }; getData()
    // 检查步骤
    const checkStep = async() => {
      const res = await get('/api/plan/check_step')
      if (res.code === 1) {
        state.data.step = res.data.step
      }
    }
    // 设置步骤
    const setStep = async(step = '') => {
      const res = await post('/api/plan/step', { step: step })
      return new Promise((resolve, reject) => {
        if (res.code === 1) {
          resolve(res)
        } else { reject(res) }
      })
    }

    // 复制文案
    const copyWecode = async(text) => {
      coypText(text).then(res => { Toast('复制成功') })
      state.showPopup = false
    }
    const resetText = (status, text) => {
      if (status) {
        return text
      } else { return '未完成' }
    }

    // 关注
    const follow = (item) => {
      if (state.isActiveEnd) { Toast('活动已结束'); return false }
      if (state.data.step < 1) { return Toast('请先完成上一步任务！') }
      ajaxHttp.followAdd({
        follow_user_id: item.uid
      }).then(res => {
        item.follow_status = 1
        if (state.data.follow_count < 6) {
          state.data.follow_count += 1
          if (state.data.follow_count >= 6) {
            setStep(2).then((res) => {
              Toast('恭喜你已完成「“拜师”学艺」，获得200积分')
              checkStep()
            })
          }
        }
        sensors.track('PlanClick', {
          PlatformType: platformType(),
          type: 'clickFollow',
          obj_id: item.uid
        })
      })
    }

    // 阅读资讯
    const readNews = (item) => {
      if (state.isActiveEnd) { Toast('活动已结束'); return false }
      if (state.data.step < 2) { return Toast('请先完成上一步任务！') }
      if (!item.is_read) {
        item.is_read = 1
        if (state.data.read_news_count < 3) { state.data.read_news_count += 1 }
        if (state.data.read_news_count === 3 && state.data.step === 2) {
          setStep(3).then((res) => {
            goAppPageOther({ 'des': 'newsview', 'skuid': item.id }, () => { })
            Toast('恭喜你已完成「资讯学习」，获得名厨Market20元优惠券')
            state.data.step = 3
            if (state.data.read_food_count === 3) {
              Toast('恭喜你已完成「佳作赏析」，快加入川菜交流群！')
              state.showPopup = true
              state.data.step = 4
            }
          })
        } else {
          goAppPageOther({ 'des': 'newsview', 'skuid': item.id }, () => { })
        }
      } else {
        goAppPageOther({ 'des': 'newsview', 'skuid': item.id, 'link': '' }, () => { })
      }
      sensors.track('PlanClick', {
        PlatformType: platformType(),
        type: 'clickNews',
        obj_id: item.id
      })
    }
    // 阅读作品
    const readWorks = (item) => {
      if (state.isActiveEnd) { Toast('活动已结束'); return false }
      if (state.data.step < 3) { return Toast('请先完成上一步任务！') }
      if (!item.is_read) {
        item.is_read = 1
        if (state.data.read_food_count < 3) { state.data.read_food_count += 1 }
        if (state.data.read_food_count === 3 && state.data.step === 3) {
          setStep(4).then((res) => {
            goAppPageOther({ 'des': 'foodview', 'skuid': item.id, 'link': '' }, () => {})
            Toast('恭喜你已完成「佳作赏析」，快加入川菜交流群！')
            state.showPopup = true
            state.data.step = 4
          })
        } else {
          goAppPageOther({ 'des': 'foodview', 'skuid': item.id, 'link': '' }, () => {})
        }
      } else {
        goAppPageOther({ 'des': 'foodview', 'skuid': item.id, 'link': '' }, () => {})
      }
      sensors.track('PlanClick', {
        PlatformType: platformType(),
        type: 'clickFood',
        obj_id: item.id
      })
    }
    // 技艺比拼
    const showPk = () => {
      if (state.data.step < 4) { return Toast('请先完成上一步任务！') }
      // router.push({ path: '/riseActivity/findNew/worksList', query: { type: 0 }})
      state.tabActive = 1
      state.tabInfo[1].isStart = true
      const y = tabList.value.offsetTop
      window.scrollTo(0, y)
    }

    const goWorkslist = (type, id) => {
      if (state.isActiveEnd) { Toast('活动已结束'); return false }
      if (!state.isVersion) {
        goAppPageOther({ 'des': 'themeview', 'skuid': id, 'link': '' }, () => {})
      } else {
        router.push({ path: '/riseActivity/findNew/worksList', query: { type: type, id: id }})
      }
      sensors.track('PlanClick', {
        PlatformType: platformType(),
        type: 'clickSubject',
        obj_id: id
      })
    }

    const setNum = (num) => {
      return num < 10 ? '0' + num : num
    }

    const setTime = (time) => {
      return formatTime(time)
    }

    const resetTime = (countTime) => {
      let day = Math.floor(countTime / (60 * 60 * 24))
      let hour = Math.floor(countTime / (60 * 60) % 24)
      let minute = Math.floor(countTime / 60 % 60)
      let second = Math.floor(countTime % 60)
      // 给一位数 补0
      day = setNum(day)
      hour = setNum(hour)
      minute = setNum(minute)
      second = setNum(second)
      state.timeAll = {
        day, hour, minute, second
      }
    }

    const goPrize = () => {
      return `${config.webapplink}/newsview?id=${state.data.public_news_id}`
    }
    const onSelect = (item) => {
      if (state.isActiveEnd) { Toast('活动已结束'); return false }
      if (item === 'wecaht') { // 分享给微信好友
        shareWecaht(`{
          "shareSDKPlatformType":"22", 
          "share_plant":"1", 
          "shareContentType":"0", 
          "share_miniProgram_url":"", 
          "share_title":"${state.shareInfo.share_title}",
          "share_desc":"${state.shareInfo.share_desc}",
          "share_img": "${state.shareInfo.share_img}", 
          "share_link": "${state.shareInfo.share_link}",  
          "share_desc_Sinaweibo":""
          }`).then(res => {
        })
      } else { // 分享到朋友圈
        shareWecaht(`{
          "shareSDKPlatformType":"23", 
          "share_plant":"1", 
          "shareContentType":"0", 
          "share_miniProgram_url":"", 
          "share_title":"${state.shareInfo.share_title}",
          "share_desc":"${state.shareInfo.share_desc}",
          "share_img": "${state.shareInfo.share_img}", 
          "share_link": "${state.shareInfo.share_link}", 
          "share_desc_Sinaweibo":""
          }`).then(res => {
        })
      }

      setStep(1).then((res) => {
        Toast('恭喜你已完成「活动助力」，获得100积分')
        checkStep()
      })
      state.showShare = false

      sensors.track('PlanClick', {
        PlatformType: platformType(),
        type: 'clickShare'
      })
    }

    const setTabChecked = (tab) => {
      if (tab.isStart) {
        state.tabActive = tab.value
      }
    }

    const setRuleShow = (title) => {
      state.ruleTitle = title
      state.ruleShow = true
    }
    const ruleCancel = () => {
      state.ruleShow = false
    }
    const shareCancel = () => {
      state.showShare = false
    }

    return {
      ...toRefs(state),
      checkVer,
      copyWecode,
      setTabChecked,
      onSelect,
      follow,
      resetText,
      readNews,
      readWorks,
      showPk,
      goWorkslist,
      goPrize,
      setNum,
      setTime,
      tabList,
      setRuleShow,
      shareCancel,
      ruleCancel
    }
  }
}
</script>
