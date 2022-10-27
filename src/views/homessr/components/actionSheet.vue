<!--
 * @Author: Shber
 * @Date: 2022-10-13 12:05:05
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-27 16:16:21
 * @Description:
-->
<template>
  <van-action-sheet
    :show="isShow"
    :title="title"
    @cancel="ruleCancel"
  >
    <div v-if="title=='常见问题'" class="sheet_content">
      <div v-for="(item,index) in problemList" :key="index" style="padding-top: 16px;">
        <div>{{ item.title }}</div>
        <div v-if="index!=11">{{ item.content }}</div>
        <div v-else>
          <span>{{ item.content[0] }}</span>
          <span>{{ item.content[1] }}</span>
        </div>
      </div>
    </div>
    <div v-else class="sheet_content sheet_degree">
      <div style="padding-top: 16px;">
        <div>1.什么是热度值？</div>
        <div>热度值是对你在本次活动综合表现的评分，热度值决定你在热度榜的排名。如果想要提升排名，获得更多奖励，需要获取更多热度值。</div>
      </div>
      <div style="padding-top: 16px;">
        <div>2.热度值高有什么奖励？</div>
        <div>最终热度排行榜前20位的用户，将获得天府食材包和名厨周边的奖励。</div>
      </div>
      <div style="padding-top: 16px;">
        <div>3.如何获取热度值？</div>
        <div>完成以下行为大幅增加热度值：</div>
        <ul style="width:291px;height: auto;display: block; list-style: initial; margin-left: 20px;">
          <li>完成名厨App厨师用户职业认证； </li>
          <li>邀请你的好友关注你的名厨App个人主页；</li>
          <li>完成寻新计划系列任务；</li>
          <li>参与比拼，发布原创优质作品并分享，赢得更多点赞、收藏、评论；</li>
          <li>坚持每天完成任务中心每日任务。</li>
        </ul>
      </div>
      <div class="mingchu">「名厨MINGCHU」，与厨师共创未来！</div>
    </div>
  </van-action-sheet>
</template>
<script>
import { reactive, watch, defineComponent, toRefs } from 'vue'
import { ActionSheet } from 'vant'

export default defineComponent({
  name: 'ActionSheet',
  components: {
    vanActionSheet: ActionSheet
  },
  props: {
    ruleShow: {
      type: Boolean,
      default: false
    },
    ruleTitle: {
      type: String,
      default: '常见问题'
    },
    ruleType: {
      type: Number,
      default: 0
    }
  },
  emits: ['onCancel'],
  setup(props, content) {
    const state = reactive({
      isShow: false, // 弹框隐藏展示
      title: '常见问题',
      problemList: [{
        title: '1.如何参加活动？',
        content: '点击活动页面下方“立即报名”，按照顺序完成任务，每完成一项任务可获得对应热度值和任务奖励。'
      },
      {
        title: '2.如何获取天府食材包和名厨周边的奖励？',
        content: '最终热度排行榜前20位的用户，将获得天府食材包和名厨周边的奖励。'
      },
      {
        title: '3.如何获得线下食材探访的资格？',
        content: '选择传统或创新赛道，上传符合主题要的作品。我们将根据评选规则选出两位获奖者，获得线下食材探访的机会，与米其林星厨共赴三天两夜寻味天府之旅。'
      },
      {
        title: '4.获奖名单如何查看？',
        content: '获奖名单将于10月26日在本活动页和名厨App首页「今日」栏目进行公示。'
      }, {
        title: '5.任务奖励如何获取？',
        content: '用户完成任务所得积分、优惠券、天府食材包、名厨周边将在10月31日进行统一发放，获得天府食材包、名厨周边的用户可以在名厨App： 我的→我的订单→待收货，查看快递信息。'
      },
      {
        title: '6.我可以不做「打卡任务」，只完成「技艺比拼」吗？',
        content: '参与者必须按照顺序完成所有任务之后才可以进入「技艺比拼」环节。'
      },
      {
        title: '7.什么是名厨职业认证？',
        content: '名厨职业认证是用户在名厨App上的职业身份认证。用于证明用户的职业身份真实有效，也代表了名厨对用户职业身份的认可。目前名厨只提供对厨师用户的身份认证，经营者、美食爱好者和供应商无法进行职业认证。'
      }, {
        title: '8.如何进行职业认证？',
        content: '请到名厨App： 我的 →认证中心→职业认证，上传认证资料完成认证。'
      }, {
        title: '9.职业认证用户有什么专属活动权益？',
        content: '完成职业认证才可以进入「技艺比拼」环节的评选阶段，才有机会获得与星厨同行共赴寻味天府之旅的机会，没有完成认证的用户请抓紧时间进行哦！'
      }, {
        title: '10.上传菜品时需要注意什么？',
        content: '用户在「技艺比拼」环节上传的菜品，必须为原创，非原创者将取消参与评选的资格和热度榜排名。'
      }, {
        title: '11.如何确保热度榜排名真实有效？',
        content: '如发现用户通过违规手段扰乱热度榜排名，经技术手段确认，名厨App有权取消该用户的排名和获奖资格。'
      }, {
        title: '12.免责声明',
        content: ['用户在参与活动时上传的菜品、灵感，主办方享有使用与其有关的图片、视频、文案、影像资料等进行营销宣传推广的权利；', '报名参与本活动即视为本人同意本活动各项规定，活动最终解释权归名厨App所有。']
      }]
    })
    watch(
      props, (newVal, oldVal)  => {
        state.isShow = props.ruleShow
        state.title = props.ruleTitle
      }
    )
    const ruleCancel = () => {
      content.emit('onCancel', false)
    }
    return {
      ...toRefs(state),
      ruleCancel
    }
  }
})
</script>
<style scoped>
.sheet_content{height: 517px;width: 311px;margin-left: 32px;margin-top: 16px; padding-bottom: 20px;}
.sheet_content div{width: 100%;}
.sheet_content div div:nth-child(1){font-size: 18px;font-weight: bold;color: #333333;display: block;}
.sheet_content div div:nth-child(2){font-size: 14px;color: #333333;padding-top: 4px;}
.sheet_content div div:nth-child(2) span{font-size: 14px;color: #333333;display: block;}
.sheet_content div div:nth-child(2) span:nth-child(2){padding-top:4px;padding-bottom: 20px;}
.sheet_degree{height: auto !important;}
.sheet_degree li{font-size: 14px;}
.mingchu{font-size: 14px;padding-top: 20px;padding-bottom: 20px;}
.text-area{width: 100%; height: 54vh;}
.van-action-sheet__header{font-size: 18px !important;}
.van-action-sheet__close{color: #333;}
</style>

