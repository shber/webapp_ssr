<!--
 * @Author: Shber
 * @Date: 2022-10-09 15:06:12
 * @LastEditors: Shber
 * @LastEditTime: 2022-10-27 16:16:36
 * @Description:
-->
<template>
  <div :class="[{'step': true},{'step_checked': isEnd}]">
    <div class="bar_circle">
      <span class="circle" />
      <div v-show="index!=5" class="circle_line" :style="{height:lineHieght+'px'}" />
    </div>
    <div ref="cardRef" class="card">
      <div class="card_top" @click="setCardShow">
        <div class="top_title">
          <p class="title fw500"><i>任务</i><span>{{ title }}</span></p>
          <i v-if="isEnd" class="svg svg_complete" />
        </div>
        <template v-if="isEnd">
          <i v-if="cardShow" class="svg svg_up" />
          <i v-else class="svg svg_down" />
        </template>
        <div v-else class="check_num">{{ rightTopText }}</div>
      </div>
      <div v-show="cardShow" class="card_body">
        <slot />
      </div>
    </div>
    <div style="clear:both;" />
  </div>

</template>
<script>
import { reactive, onMounted, onBeforeMount, toRefs, ref, watch, defineComponent } from 'vue'
export default defineComponent({
  name: 'StepCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    isEnd: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    rightTopText: { // 0不显示 1已关注 2已阅读 3未完成
      type: String,
      default: ''
    }
  },
  emits: ['toggle-click'],
  setup(props, context) {
    const cardRef = ref(null)
    const state = reactive({
      cardShow: true,
      lineHieght: 0
    })
    watch(
      props, (newVal, oldVal)  => {
        state.cardShow = !props.isEnd
        setTimeout(() => {
          state.lineHieght = cardRef.value.clientHeight - 6
        }, 0)
      }
    )

    onBeforeMount(() => {
      // 完成的任务默认收起
      // if (props.isEnd) {
      //   state.cardShow = false
      // }
    })
    onMounted(() => {
      setTimeout(() => {
        state.lineHieght = cardRef.value.clientHeight - 6
      }, 1000)
    })
    const toggleClick = () => {
      context.emit('toggle-click')
    }
    const setCardShow = () => {
      if (!props.isEnd) { return false }
      state.cardShow = !state.cardShow
      setTimeout(() => {
        state.lineHieght = cardRef.value.clientHeight - 6
      }, 0)
    }
    return {
      ...toRefs(state),
      cardRef,
      toggleClick,
      setCardShow
    }
  }
})
</script>
<style lang="scss" scoped>

.bar_circle{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16px;
  padding-top: 22px;
  margin-bottom: -42px;
  float: left;
  .circle{
    display: block;
    width: 8px; height: 8px; background: #ccc; border: 4px solid #E5E5E5; border-radius: 50%;
  }
  .circle_line{
    width: 2px; height: 20px; margin-top: 4px; background: #E5E5E5; border-radius: 2px;
  }
  .circle_active{background: #C99700; border: 4px solid #FAF5E6;}
  .circle_line_active{ background: #C99700;; border-radius: 2px; }
}

.card{
  background-color: #F3F3F3;
  border-radius: 12px;
  position: relative;
  margin-left: 22px;
}
.svg_complete{margin-left: 12px;}
.card_top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 11px;
  padding-top: 16px;
  padding-bottom: 16px;
  .check_num{color: #999; font-size: 12px;}
  .top_title{
    display: flex;
    align-items: center;
    .title{
      display: flex;
      align-items: center;
      height: 26px;
      line-height: 26px;
      font-size: 16px;
      color: #333;
      i{font-style: normal; padding: 0 4px; background-color: #DBCB9A; border-radius: 4px 0 0 4px;}
      span{background-color: #E45343; color: #fff; padding: 0 6px;  border-radius: 0 4px 4px 0;}
    }
  }
}
.card_body{
  color: #333;
  border-top: 1px solid #ccc;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  padding: 16px 24px 0;
  border-radius: 0px 0px 12px 12px;
  overflow: hidden;
}

.step_checked{ // 完成高亮状态
  .card{
    background-color: #FAF5E6;
    .card_body{ border-top: 1px solid #DBCB9A; }
    .card_top{padding-top: 8px; padding-bottom: 8px;}
  }
  .circle{background: #C99700; border: 4px solid #FAF5E6;}
  .circle_line{ background: #C99700;; border-radius: 2px; }
}
</style>
