<!--
 * @Author: Shber
 * @Date: 2022-10-09 15:06:12
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-27 16:16:30
 * @Description:
-->
<template>
  <div>
    <ul class="reward_list">
      <li v-for="item in itemInfo" :key="item.value" :class="{active: stepNum >= item.value}">
        <p>
          <span class="icons">
            <i :class="'svg svg_'+item.value" />
          </span>
          <span class="label fw500">{{ item.label }}</span>
          <span class="desc">{{ item.desc }}</span>
        </p>
        <i v-show="stepNum >= item.value" class="svg svg_checked1" />
      </li>
    </ul>
    <p class="reward_desc">完成任务，获得更多奖励</p>
    <ul class="reward_list end_list">
      <li>
        <p>
          <span class="icons"> <i class="svg svg_6" /> </span>
          <span class="label fw500">寻味天府，食材探访</span>
        </p>
      </li>
      <li>
        <p>
          <span class="icons"> <i class="svg svg_7" /> </span>
          <span class="label fw500">天府食材包与名厨周边好礼</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, onBeforeMount, watch, toRefs, defineComponent } from 'vue'
export default defineComponent({
  name: 'RewardStep',
  props: {
    step: {
      type: Number,
      default: 0
    }
  },
  emits: ['toggle-click'],
  setup(props, context) {
    const state = reactive({
      stepNum: 0,
      itemInfo: [
        { label: '活动助力', desc: '名厨 100 积分', value: 1, isEnd: true },
        { label: '拜师学艺', desc: '名厨 200 积分', value: 2, isEnd: false },
        { label: '资讯学习', desc: '名厨Market 优惠券', value: 3, isEnd: false },
        { label: '佳作赏析', desc: '名厨川菜交流群资格', value: 4, isEnd: false },
        { label: '技艺比拼', desc: '寻味天府探访资格/食材包', value: 5, isEnd: false }
      ]
    })
    watch(
      props, (newVal, oldVal)  => {
        state.stepNum = props.step
      }
    )

    onBeforeMount(() => {
      // 完成的任务默认收起
      if (props.isEnd) {
        state.cardShow = false
      }
    })
    const toggleClick = () => {
      context.emit('toggle-click')
    }
    const setCardShow = () => {
      if (!props.isEnd) { return false }
      state.cardShow = !state.cardShow
    }
    return {
      ...toRefs(state),
      toggleClick,
      setCardShow
    }
  }
})
</script>
<style lang="scss" scoped>
    .reward_desc{
      margin-top: 32px !important;
    }
  .reward_list{
    li{
      display: flex; justify-content: space-between; align-items: center;
      background-color: #e5e5e5; border-radius: 2px; padding: 4px 11px 4px 8px;
      margin: 8px 0;
      .label{font-size: 16px; line-height: 22px; color: #333; margin: 0 10px 0 8px;}
      .desc{font-size: 14px; line-height: 20px; color: #999;}
      p{display: flex; align-items: center;}
      .icons{background-color: #ccc; width: 32px; height: 32px; display: flex; justify-content: center; align-items: center; border-radius: 50%;}
    }
    .active{background: rgba(219, 203, 154, 0.33);
      .icons{background: #DBCB9A;}
      .desc{color: #C9A128;}
    }
  }
  .end_list{
    li{background: rgba(219, 203, 154, 0.33);}
    .icons{background-color: #E45343 !important;}
  }
</style>
