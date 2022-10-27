<!--
 * @Author: Shber
 * @Date: 2022-10-09 15:06:12
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-27 16:16:43
 * @Description:
-->
<template>
  <div class="top_step">
    <div class="step_bar">
      <div class="active_bar" :style="{'width': barWidth}" />
      <div class="circle_group">
        <div :class="[{'bar_item':true}, {'active': stepNum>0}]">
          <span class="bar_circle" /> <div>活动助力</div>
        </div>
        <div :class="[{'bar_item':true}, {'active': stepNum>1}]">
          <span class="bar_circle" /> <div>拜师学艺</div>
        </div>
        <div :class="[{'bar_item':true}, {'active': stepNum>2}]">
          <span class="bar_circle" /> <div>资讯学习</div>
        </div>
        <div :class="[{'bar_item':true}, {'active': stepNum>3}]">
          <span class="bar_circle" /> <div>佳作赏析</div>
        </div>
        <div :class="[{'bar_item':true}, {'active': stepNum>4}]">
          <span class="bar_circle" /> <div>技艺比拼</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, watch, onBeforeMount, toRefs, defineComponent } from 'vue'
export default defineComponent({
  name: 'TransverseStepBar',
  props: {
    step: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const state = reactive({
      cardShow: true,
      stepNum: 0,
      barWidth: '0%'
    })
    watch(
      props, (newVal, oldVal)  => {
        if (props.step === 0) {
          state.barWidth = '0%'
        } else if (props.step === 1) {
          state.barWidth = '9.8%'
        } else if (props.step > 1 && props.step < 5) {
          state.barWidth = 10 + 20 * (props.step - 1) + '%'
        } else {
          state.barWidth = '100%'
        }
        state.stepNum = props.step
      }
    )

    onBeforeMount(() => {
    })
    // const barWidth = () => {
    //   if (props.step === 0) {
    //     return '0%'
    //   } else if (props.step === 1) {
    //     return '9.8%'
    //   } else if (props.step > 1 && props.step < 5) {
    //     return 10 + 20 * (props.step - 1) + '%'
    //   } else {
    //     return '100%'
    //   }
    // }
    return {
      ...toRefs(state)
      // barWidth
    }
  }
})
</script>
<style lang="scss" scoped>
    .top_step{
      margin: 32px 0 48px;
     .step_bar, .active_bar{width: 100%; height: 4px; background-color: #DBCB9A; border-radius: 4px;}
     .active_bar{background-color: #C99700;}
     .circle_group{
      display: flex;
      justify-content: space-between;
      margin-top: -10px;
      .bar_item{
        display: flex;
        flex-direction: column;
        align-items: center;
        div{
          font-size: 10px; background: #fff; color: #C99700;
          width: 48px; text-align: center; line-height: 18px; height: 18px; border-radius: 4px; font-weight: 500;
        }
      }
     }
     .bar_item{
      span{display: block; width: 8px; height: 8px; background: #DBCB9A; border: 4px solid #fff; border-radius: 50%; margin-bottom: 10px;}
     }
     .active{
      span{background: #C99700; }
      div{ background: #C99700 !important; color: #fff !important; position: relative;
        &::before{
          content: '';
          display: block;
          border: 6px solid transparent;
          border-top-color: transparent;
          border-bottom-color: #C99700;
          border-left-color: transparent;
          border-right-color: transparent;
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 7;
        }
      }
     }
    }
</style>
