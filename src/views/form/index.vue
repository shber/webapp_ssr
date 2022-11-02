<!-- eslint-disable -->
<template>
  <div class="wrap" :style="{background:datalist.color}">
    <gc-loading :is-show="loadingShow" />
    <gc-guide :down-show="downShow" @showDwon="getWechat" />
    <!-- <Nav title="名厨MINGCHU"  @closeWindow="closeWindow" /> -->
    <div v-if="visible" class="banner_height">
      <div id="searchBar" :class="searchBarFixed == true ? 'ondown_banner' :'down_banner'">
        <div class="preview_bar">
          <a class="down_close" @click="goClose" />
          <div style="height: 56px; line-height: 56px;text-align: center; font-size: 14px; color: #C99700">
            <!-- 此为临时链接，仅用于预览，将在短期内失效。 -->
            {{ $t('topHeader.headText') }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="whole" :class="!display?'displays':'display'">
      <div :class="isGteatChefbrowser?'padtops':'padtop'" :style="{paddingTop: Top}">
        <img v-if="datalist.banner_url" :src="datalist.banner_url" alt="" class="headimg">
        <div :class="datalist.banner_url?'center':'centers'">
          <div class="centhead centlist">
            <h4>{{ datalist.title }}</h4>
            <div>{{ datalist.desc }}</div>
          </div>
          <div v-for="(item,index) in datalist.list" :key="index" class="centlist">
            <div v-if="item.type!='Button'" class="termhead">
              <div>
                <span v-if="item.config.required" class="xing">*</span>
                <span v-if="keydata&&keydata.length>0">
                    <span class="texts" style="color:#E45343" v-if="keydata.includes(String(index))">{{ index+1 }}. {{ item.name }}</span>
                    <span class="texts" v-else>{{ index+1 }}. {{ item.name }}</span>
                </span>
                <span class="texts" v-else>{{ index+1 }}. {{ item.name }}</span>
              </div>
            </div>
            <div class="Input" v-if="item.type=='Input'">
              <input :maxlength="item.config.maxlength?item.config.maxlength:50" @input="search(item.config.defaultValue,item.config.maxlength?item.config.maxlength:50)" v-model="item.config.defaultValue" :disabled="item.config.disabled" type="text" :placeholder="item.config.placeholder">
            </div>
            <div v-if="item.type=='Textarea'" class="Textarea">
              <van-cell-group inset>
                <van-field
                  @input="search(item.config.defaultValue,item.config.maxlength?item.config.maxlength:50)"
                  v-model="item.config.defaultValue"
                  :disabled="item.config.disabled"
                  rows="3"
                  autosize
                  type="textarea"
                  :placeholder="item.config.placeholder"
                  :maxlength="item.config.maxlength?item.config.maxlength:50"
                />
              </van-cell-group>
            </div>
            <div v-if="item.type=='Select'" class="Select">
              <select v-model="item.config.defaultValue" :disabled="item.config.disabled">
                <option disabled value="">请选择</option>
                <option v-for="(Select,index) in item.config.options" :key="index">{{ Select.label }}</option>
              </select>
              <img src="https://img.mingchu.co/Nuploads/food/1644573004000336134.png" alt="">
            </div>
            <div v-if="item.type=='Radio'" class="Radio">
              <van-radio-group v-for="(Radio,index) in item.config.options"  :key="index" v-model="item.config.defaultValue" :disabled="item.config.disabled">
                <van-radio :name="Radio.label">
                  {{ Radio.label }}
                  <template #icon="props">
                    <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon">
                  </template>
                </van-radio>
              </van-radio-group>
            </div>
            <div v-if="item.type=='Checkbox'" class="Checkbox">
              <van-checkbox-group v-model="item.config.defaultValue" :disabled="item.config.disabled">
                <van-checkbox v-for="(Checkbox,index) in item.config.options" :key="index" :name="Checkbox.label" shape="square" checked-color="#C99700">{{ Checkbox.label }}</van-checkbox>
              </van-checkbox-group>
            </div>
            <div v-if="item.type=='Time'" class="Time">
              <div class="Timediv" @click="times(index,item.config.disabled)">
                <input type="text" readonly="readonly" :value="item.config.defaultValue" :placeholder="item.config.placeholder">
                <img src="https://img.mingchu.co/Nuploads/food/1644573004000336134.png" alt=""></div>
              <van-popup v-model:show="Time" position="bottom" :style="{ height: '50%' }">
                <van-datetime-picker
                  v-model="currentTime"
                  :disabled="item.config.disabled"
                  type="time"
                  title="选择时间"
                  :min-hour="0"
                  :max-hour="23"
                  @confirm="confirmTime"
                  @cancel="Time=false"
                />
              </van-popup>
            </div>
            <div v-if="item.type=='TimeRange'" class="TimeRange">
              <div class="TimeRangediv">
                <div @click="TimeRanges(index,0,item.config.disabled)"><input type="text" readonly="readonly" :value="item.config.defaultValue[0]" :placeholder="item.config.placeholder"></div>
                <span>至</span>
                <div @click="TimeRanges(index,1,item.config.disabled)"><input type="text" readonly="readonly" :value="item.config.defaultValue[1]" :placeholder="item.config.placeholder"></div>
              </div>
              <van-popup v-model:show="TimeRange" position="bottom" :style="{ height: '50%' }">
                <van-datetime-picker
                  v-model="currentTime"
                  type="time"
                  title="选择时间"
                  :min-hour="0"
                  :max-hour="23"
                  @confirm="confirmTimeRange"
                  @cancel="TimeRange=false"
                />
              </van-popup>
            </div>
            <div v-if="item.type=='Calendar'" class="Calendar">
              <div class="Timediv" @click="Calendars(index,item.config.disabled)">
                <input type="text" readonly="readonly" :value="item.config.defaultValue" :placeholder="item.config.placeholder">
                <img src="https://img.mingchu.co/Nuploads/food/1644573004000336134.png" alt="">
              </div>
              <van-popup v-model:show="Calendar" position="bottom" :style="{ height: '50%' }">
                <van-datetime-picker
                  v-model="currentDate"
                  type="date"
                  title="选择年月"
                  :min-date="minDate"
                  :max-date="maxDate"
                  @confirm="confirmCalendar"
                  @cancel="Calendar=false"
                />
              </van-popup>
            </div>
            <div v-if="item.type=='CalendarRange'" class="CalendarRange">
              <div class="TimeRangediv">
                <div @click="CalendarRanges(index,0,item.config.disabled)"><input type="text" readonly="readonly" :value="item.config.defaultValue[0]" :placeholder="item.config.placeholder"></div>
                <span>至</span>
                <div @click="CalendarRanges(index,1,item.config.disabled)"><input type="text" readonly="readonly" :value="item.config.defaultValue[1]" :placeholder="item.config.placeholder"></div>
              </div>
              <van-popup v-model:show="CalendarRange" position="bottom" :style="{ height: '50%' }">
                <van-datetime-picker
                  v-model="currentDate"
                  type="date"
                  title="选择年月"
                  :min-date="minDate"
                  :max-date="maxDate"
                  @confirm="confirmRange"
                  @cancel="CalendarRange=false"
                />
              </van-popup>
            </div>
            <div v-if="item.type=='Rate'" class="Rate">
              <van-rate
                v-model="item.config.defaultValue"
                :disabled="item.config.disabled"
                :size="40"
                gutter="24"
                color="#C99700"
                void-icon="star"
                void-color="#E5E5E5"
                @change="onChange"
              />
              <div class="cheng">{{ item.config.rateText[item.config.defaultValue].name }}</div>
              <div class="satisfied">
                <span v-for="(Rate,index) in item.config.rateText[item.config.defaultValue].tag" :key="index">{{ Rate.name }}</span>
              </div>
            </div>
            <div v-if="item.type=='Address'" class="Address">
              <div class="Addressd" @click="Addres(index,item.config.disabled)">
                <!-- <div>地区</div> -->
                <div @click="Address=true"><input type="text" readonly="readonly" :value="item.config.defaultValue" :placeholder="item.config.placeholder"><span><img src="https://img.mingchu.co/Nuploads/food/1644570603000893669.png" alt=""></span></div>
              </div>
              <div class="Addressdiv">
                <!-- <div>详细地址</div> -->
                <textarea @input="search(item.config.details,item.config.maxlength?item.config.maxlength:50)" v-model="item.config.details" :maxlength="item.config.maxlength?item.config.maxlength:50" rows="3" :placeholder="item.config.placeholder" />
              </div>
              <van-popup v-model:show="Address" position="bottom" :style="{ height: '50%' }">
                <van-area title="选择地区" :area-list="areaList" @confirm="confirm" @cancel="Address=false" />
              </van-popup>
            </div>
            <div v-if="item.type=='Button'" class="Button" :style="{background:item.config.color}" @click="button">
              {{ item.config.placeholder }}
            </div>
          </div>
        </div>
        <div class="footerimg">
          <img src="https://img.mingchu.co/Nuploads/home/62061837310ba.png" alt="">
        </div>
      </div>
    </div>
    <gc-preview :is-show="!whole"/>
    <div v-if="normal" class="normal">
      <img :src="normalcont.imgs" alt="">
      <div class="normalcont">
        <span>{{ normalcont.whether }}</span>
        <span>{{ normalcont.Copywriting }}</span>
        <div @click="event(normalcont.type)">{{ normalcont.butoon }}</div>
      </div>
    </div>
    <div v-if="!display" class="suspension">
      <div class="whole">
        <img src="https://img.mingchu.co/Nuploads/AdImage/620b8409f2288.png" alt="">
        <div class="Copywriting">
          <div>与全球<span>72W</span> 厨师交流</div>
          <div>展示风采 共同成长</div>
        </div>
        <div class="open" @click="land(1)">打开APP</div>
      </div>
    </div>
    <van-popup v-model:show="show" style="border-radius:4px">
      <div class="Tips">
        <div class="tips1">温馨提示！</div>
        <div class="tips2">您好，需要登录后才能正常提交！</div>
        <div class="tips3" v-if="Tips.type==1" @click="land(Tips.type)">{{ Tips.text }}</div>
        <div v-else class="tips4" style="background:#C99700">
          <wx-open-launch-weapp id="launch-btn" class="opentag" username="gh_8b2e6fe33be7" :path="path" @launch="handleLaunchFn">
            <div v-is="'script'" type='text/wxtag-template'>
                <div style="width: 310px;height:48px;text-align:center;line-height:50px;color: #fff;font-size: 18px;font-weight: blod;">{{Tips.text }}</div>
            </div>
          </wx-open-launch-weapp>
        </div>
        <!-- <div @click="show=false" class="zanbu">暂不登陆</div> -->
      </div>
    </van-popup>
    <van-popup v-model:show="Dialog" style="border-radius:2px">
      <div class="Dialog">
        <div class="Dialogtitle">您还未提交表单,是否提交？</div>
        <div class="Dialogbtn">
          <span @click="Submit(1)">暂不提交</span><span @click="Submit(2)">提交</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
// import wx from 'weixin-js-sdk'
// import 'vant/lib/index.css'
import { reactive, onMounted, onBeforeMount, toRefs, nextTick } from 'vue'
import gcLoading from '@/components/gc-loading.vue'
import gcPreview from '@/components/gc-preview.vue'
import gcGuide from '@/components/gc-guide.vue'

// import Nav from '@/components/TopNav.vue'

import {wechatShare, hideShare, isiOS, isAndroid, is_weixn, closeWindow, goDown, getQueryVariable, login, isLogin } from '@/utils/utils'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { ajaxHttp } from '@/api/api'
import { areaList } from '@vant/area-data'
import { RadioGroup, Radio, Rate, Checkbox, CheckboxGroup, Popup, DatetimePicker, Area, Toast, CellGroup, Field } from 'vant'
import config from '@/config/config'
export default {
  name: 'Form',
  components: {
    // Nav,
    gcLoading,
    gcPreview,
    gcGuide,
    vanRadioGroup: RadioGroup,
    vanRadio: Radio,
    vanRate: Rate,
    vanCheckbox: Checkbox,
    vanCheckboxGroup: CheckboxGroup,
    vanPopup: Popup,
    vanDatetimePicker: DatetimePicker,
    vanArea: Area,
    vanCellGroup: CellGroup,
    vanField: Field
    // vanButton: Button
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      isweixn: true,
      Top: '0px',
      Dialog: false,
      path: '',
      Submit: '',
      whole: true,
      visible: false,
      gcshow: true,
      datalist: {},
      display: true,
      loadingShow: true,
      downShow: false,
      Tips: {},
      isGteatChefbrowser: false,
      show: false,
      normalcont: {
        type: 1,
        whether: '提交成功！',
        Copywriting: '感谢您的参与和支持',
        butoon: '去首页了解精彩内容'
      },
      keydata: [],
      datas: {},
      CalendarRange: false,
      Calendar: false,
      minDate: new Date(1950, 1, 1),
      maxDate: new Date(2080, 10, 1),
      currentDate: new Date(),
      type: 1,
      idx: 0,
      TimeRange: false,
      Time: false,
      notedata: '',
      Address: false,
      areaList,
      currentTime: '',
      activeIcon: 'https://img.mingchu.co/Nuploads/club/6209fb5c8085e.png',
      inactiveIcon: 'https://img.mingchu.co/Nuploads/club/6209fb3020836.png',
      normal: false,
      query: false,
      Addres: ''
    })
    onBeforeMount(() => {
      // state.query = router.currentRoute.value.query
      state.query = router.currentRoute.value.params
      wechatShare()
      hideShare('1')
      /*eslint-disable */
      const dsType = dsBridge.call('openBackButton', 'test')
      console.log(dsType)
      if (dsType == 1) {
        state.isGteatChefbrowser = true
      }
      if(dsType == 1&&isiOS()){
        state.Top = '88px'
      }else if(dsType == 1&&isAndroid()){
        state.Top = '44px'
      }
      state.display = state.isGteatChefbrowser || isWeixn() || is_weixn()
      state.isweixn = state.isGteatChefbrowser || isWeixn()
      getdata()
      state.path = encodeURI(`pages/redirectUrl/main?urls=${config.webapplink}/rise/form/${state.query.id}`)
    })
    onMounted(() => {
    })
    onBeforeRouteLeave((to, from) => {
    
    })
    nextTick(() => {
      console.log(2)
    })
    const closeWindow = () => {
      if(state.Submit==='1'){
        closeWindow()
      }else{
        state.Dialog = true
      }
    }
    const Submit = (type) =>{
      if(type===1){
        closeWindow()
      }else{
        state.Dialog = false
        button()
      }
    }
    const goClose = () => {
      state.visible = false
    }
    const isWeixn = () => {
      const token = getQueryVariable('token')
      if (token) {
        return true
      } else {
        return false
      }
    }
    const search = (e,index) =>{
      console.log(e,index)
      if(e.length>=index){
        Toast(`最多可输入${index}字`)
      }
    }
    const handleLaunchFn = (e) =>{
      console.log(e)
    }
    const getdata = () => {
      ajaxHttp.$get(`/api/form_post/detail`, { id:state.query.id }).then(res => {
        if (res.code === 1) {
          state.datalist = res.data 
          if(res.data.is_preview===1){
            state.visible = true
            state.show = false
          }
          if(res.data.is_need_login===1){
            if (!state.isweixn) {
              if (is_weixn()) {
                state.Tips = {
                  text: '微信登陆',
                  type: 2
                }
              } else {
                state.Tips = {
                  text: '登陆 APP',
                  type: 1
                }
            }
            state.show = true
            }
          }
          if (state.isGteatChefbrowser) {
            /* eslint-disable */
              isLogin().then(res_login => { // app登陆状态
                const resLogin = JSON.parse(res_login)
                if (resLogin.data.is_login == 1) { // 登陆成功
                } else { // 没登录跳登录
                  if (isAndroid()) {
                    location.href = `${config.webapplink}/login`
                  } else {
                    login().then(res => {
                      location.reload()
                    })
                  }
              }
            })
          }
          state.loadingShow = false
        }else if(res.code === 94){
          state.datalist.color = '#fff'
          state.whole = false
          state.visible = false
          state.show = false
          state.loadingShow = false
        }else{
          Toast(res.message)
        }
      })
    }
    const getWechat = ()  =>{
      state.downShow = false
    }
    const land = (type) =>{
      if (type === 1) {
        const u = navigator.userAgent
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
        if (is_weixn()) {
          if (!isAndroid) {
            goDown('H5', `${config.webapplink}/rise/form/${state.query.id}`)
          } else {
            state.downShow = true
          }
        } else {
          goDown('H5', `${config.webapplink}/rise/form/${state.query.id}`)
        }
        goDown('H5', `${config.webapplink}/rise/form/${state.query.id}`)
      }
    }
    const formatDate = (value)=> {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '-' + MM + '-' + d
    }
    const times = (idx,disabled)=> {
      if(!disabled){
        state.Time = true
        state.idx = idx
      }
    }
    const TimeRanges = (idx, type,disabled) => {
      if(!disabled){
        state.TimeRange = true
        state.idx = idx
        state.type = type
      }
    }
    const Calendars = (idx,disabled) => {
      if(!disabled){
        state.Calendar = true
        state.idx = idx
      }
    }
    const CalendarRanges = (idx, type,disabled)=> {
      if(!disabled){
        state.CalendarRange = true
        state.idx = idx
        state.type = type
      }
    }
    const Addres = (idx,disabled) => {
      if(!disabled){
        state.Address = true
        state.idx = idx
      }
    }
    const event = (type) => {
      if (type === 1) {
        getdata()
        state.notedata = ''
        state.normal = false
      } 
      state.normal = false
    }
    const confirmCalendar = (e) => {
      state.Calendar = false
      state.datalist.list[state.idx].config.defaultValue = formatDate(e)
    }
    const confirm = (e) => {
      const res = e.map((value) => value.name).join('/')
      state.datalist.list[state.idx].config.defaultValue = res
      state.Address = false
    }
    const confirmTimeRange = (e) => {
      state.datalist.list[state.idx].config.defaultValue[state.type] = e
      state.TimeRange = false
    }
    const confirmRange = (e) => {
      state.datalist.list[state.idx].config.defaultValue[state.type] = formatDate(e)
      state.CalendarRange = false
    }
    const confirmTime = (e) => {
      state.datalist.list[state.idx].config.defaultValue = e
      state.value = e
      state.Time = false
    }
    const button = ()=> {
      if (state.datalist.is_preview===1) {
        return Toast('预览链接')
      }
      var arr = state.datalist.list.slice(0, state.datalist.list.length - 1)
      var keydata = []
      for (const j in arr) {
        const newno = arr[j].config.defaultValue
        const required = arr[j].config.required
        if(arr[j].type==='TimeRange'&&newno.length<=1){
          console.log(arr[j])
          keydata.push(j)
        }
        if(arr[j].type==='CalendarRange'&& newno.length<=1){
          keydata.push(j)
        }
        if (required && newno.length<=0) {
          keydata.push(j)
        }
      }
      state.keydata = keydata
      if (keydata.length > 0) {
        Toast('请填写' + state.datalist.list[keydata[0]].name)
      } else {
        var listdata = {}
        for (const i in arr) {
          const newno = arr[i].config.defaultValue
          const file = arr[i].file_id
          if(arr[i].type==='Address'){
            listdata[file] = newno +''+arr[i].config.details
          }else{
            listdata[file] = newno
          }
        }
        var data = {
          id: state.query.id,
          data: listdata
        }
        ajaxHttp.$post(`/api/form_post/submit`, data).then(res => {
          if (res.code === 1) {
            state.Submit = '1'
            state.normalcont = {
              type: 1,
              imgs: 'https://img.mingchu.co/Nuploads/AdImage/620c9526eba3d.png',
              whether: '提交成功！',
              Copywriting: '感谢您的参与和支持',
              butoon: '好的'
            }
            state.normal = true
          } else if (res.code === 93) {
            Toast(res.message)
          } else if(res.code === 5){
            state.show = true
          }else {
            Toast(res.message)
          }
          
        }).catch(err => {
          console.log(err)
          state.normalcont = {
            type: 2,
            imgs: 'https://img.mingchu.co/Nuploads/AdImage/620c952b702c5.png',
            whether: '提交失败',
            Copywriting: '提交失败，请稍后重试～',
            butoon: '重新提交'
          }
          state.normal = true
        })
      }
    }
    const onChange = (value) => console.log('当前值：' + value)
    return {
      ...toRefs(state),
      getdata,
      getWechat,
      land,
      formatDate,
      times,
      TimeRanges,
      Calendars,
      CalendarRanges,
      Addres,
      event,
      confirmCalendar,
      confirm,
      confirmTimeRange,
      confirmRange,
      confirmTime,
      button,
      onChange,
      handleLaunchFn,
      isWeixn,
      goClose,
      search,
      closeWindow,
      Submit
    }
  }
}
</script>

<style scoped>
  .texts{width:300px;height:132px}
  .Dialogtitle{width:300px;height: 82px;text-align: center;line-height: 82px;color:#333333;font-size: 18px;border-bottom: 1px solid #E5E5E5;}
  .Dialogbtn{width: 300px;display: flex;height: 50px;}
  .Dialogbtn span{width: 150px;display: inline-block;text-align: center;line-height: 50px;color: #C99700;font-size: 16px;}
  .Dialogbtn span:nth-child(1){border-right:1px solid #E5E5E5;}
  #launch-btn{
    width: 279px;height:48px;color: #fff;font-size: 16px;font-weight: blod;
    border-radius: 2px;display: block;line-height: 48px;text-align: center;position: absolute; top: 0;z-index: 999;
  }
.displays{padding-bottom:122px}
.err_404{padding-top: 250px; margin-top: 40%; background:url('https://static.mingchu.co/m/images/eq/404@2x.png') center top no-repeat; background-size: 250px 250px; text-align: center; font-size: 14px; color: #b4b4b4;}
.Tips{width: 327px;height: 186px;background: #FFFFFF;border-radius: 4px;text-align: center;}
.tips1{width: 100%;color: #333333;font-size: 24px;font-weight: blod;padding-top:24px;}
.tips2{width: 100%;color: #999997;font-size: 16px;margin-top:8px;}
.tips3{width: 279px;height:48px;color: #fff;font-size: 16px;font-weight: blod;margin-top:8px;background: #C99700;
border-radius: 2px;line-height: 48px;margin-left: 24px;margin-top: 24px;text-align: center;}
.tips4{width: 279px;height:48px;background-size: 279px 48px;margin-left: 24px;margin-top: 24px;position: relative;}
.zanbu{width: 100%;color: #C99700;font-size: 16px;margin-top:24px;}
/* background: url('https://img.mingchu.co/Nuploads/AdImage/6213330fca0b1.png')center top no-repeat; */
.WeChat{width: 279px !important;height:48px;color: #fff !important;font-size: 16px !important;font-weight: blod !important;background: #C99700;
border-radius: 2px;line-height: 48px;}
.suspension{width: 375px;height: 122px;background: #F9F8F8;position: fixed;bottom: 0;z-index: 199;}
.whole{width:343px;margin-left: 16px;display: flex;height: 88px;border-bottom: 0.5px solid #E5E5E5;}
.whole img{width: 60px;height: 60px;margin-top: 15px;}
.Copywriting{width: 185px;}
.Copywriting{width: 185px;color: #333;font-weight: bold;font-size: 16px;padding-left: 14px;}
.Copywriting div:nth-child(1){width: 185px;margin-top:22px;}
.Copywriting div:nth-child(2){width: 185px;}
.Copywriting div:nth-child(1) span{color:#C99700}
.open{width:88px;height: 32px;background: #C99700;text-align: center;line-height: 32px;color: #fff;font-size: 14px;border-radius: 48px;margin-top: 28px;}
input[type="text"],input[type="number"],input[type="password"],input[type="submit"],input[type="button"],textarea {-webkit-appearance: none; outline-style: none; resize: none; border:0;background: #FFFFFF;}
.wrap{width: 375px;height: 100%;min-height: 100vh;background: #FAF5E6;}
.headimg{width:375px;height: 240px;}
.padtops{padding-top: 88px;}
.center{width: 343px;height: auto;position: relative;left: 16px;top: -16px;}
.centers{width: 343px;height: auto;position: relative;left: 16px;top: 16px;}
.centlist{width: 100%;background: #FFFFFF;border-radius: 2px;margin-bottom: 8px;}
.centhead h4{width: 315px;margin-left: 14px;padding:11px 0;text-align: center;font-size: 24px;line-height: 34px;font-weight: bold;color: #333333;border-bottom: 1px solid #E5E5E5;}
.centhead div{width: 315px;margin-left: 14px;padding:13px 0;font-size: 14px;line-height: 20px;color: #666;}
.termhead{width: 100%;font-weight: bold;border-bottom: 0.5px solid #E5E5E5;flex-wrap: wrap;padding-bottom: 14px;}
.termhead div:nth-child(1){padding-top: 14px;margin-left:15px;margin-right: 16px;}
.xing{width: 8px !important;height: 8px !important; color: #E45343;}
.texts{color: #333333;font-size: 18px;padding-left: 5px;}
.termheadspan{margin-left:20px;padding: 3px 6px;display: inline-block;color: #E45343;font-size: 14px;font-weight: bold;background: rgba(228, 83, 67, 0.1);border-radius: 2px;text-align: center;}
.van-radio .img-icon{width: 16px;height: 16px;border-radius: 50%;}
.Radio .van-radio-group{width: 320px;margin-left:13px;min-height: 44px;border-bottom: 0.5px solid #E5E5E5;}
.Radio .van-radio-group:nth-child(last-child){border:none}
.Radio .van-radio-group .van-radio{width: 320px;padding-top:11px;padding-bottom: 11px;}
.Radio >>>.van-radio__icon--checked>>>.van-radio__label{color:#C99700 !important;}
.Radio .van-radio .van-radio__label{font-size: 16px !important;color: #333 !important;min-height: 44px !important;padding-bottom: 11px;}
.Input{width: 330px;height: 44px;line-height: 44px;color: #333;font-size: 16px;}
.Input input{width: 314px;margin-left:16px;color: #333333; }
input{caret-color: yellow;/*光标颜色*/}
input::-webkit-input-placeholder{color:#CCCCCC; opacity: 1;}
.Textarea{width: 314px;line-height: 22px;height:88px;}
.Textarea .van-cell-group{width:314px;height: 66px;line-height: 22px;padding-top: 11px;color: #333333 !important;font-size: 16px !important;}
.Textarea .van-cell-group>>>.van-field__control{color: #333333 !important;font-size: 16px !important;}
.van-field__control{color: #333 !important;font-size: 16px !important;}
.van-cell{padding:0 !important}
.Select{width: 330px;margin-left:13px;min-height: 44px;position: relative;}
.Select select{width: 330px;min-height: 44px;border:none;color: #333333;font-size: 16px;outline: none;background: #fff;
appearance:none;
-moz-appearance:none;
-webkit-appearance:none;}
select::-ms-expand { display: none; }
.Select img{width: 12px;height: 6px;position: absolute;top: 20px;right: 22px;}
.Checkbox .van-checkbox{width: 320px;margin-left:13px;border-bottom: 0.5px solid #E5E5E5;margin-right: 10px;padding-top: 13px;padding-bottom: 12px;}
.Checkbox .van-checkbox>>>.van-checkbox__icon--checked + .van-checkbox__label{color: #C99700;}
.Calendar .van-cell{width: 320px;margin-left:13px;min-height: 44px;border-bottom: 0.5px solid #E5E5E5;color: #333333;font-size: 16px;}
.CalendarRange .van-cell{width: 320px;margin-left:13px;min-height: 44px;border-bottom: 0.5px solid #E5E5E5;color: #333333;font-size: 16px;}
.Rate{margin-left: 24px;padding-top: 14px;}
.satisfied{width: 100%;display: flex; flex-wrap: wrap;margin-top: 20px;}
.satisfied span{margin-bottom: 11px;width: 142px;height: 31px;border: 0.5px solid #CCCCCC;box-sizing: border-box;border-radius: 2px; text-align: center;color: #999999;display: inline-block;line-height: 31px;font-size: 12px;}
.satisfied span:nth-child(even){margin-left: 11px;}
.cheng{width: 100%;text-align: center;color: #C99700;font-size: 14px;font-weight: bold;padding-top: 11px;}
.Button{width: 343px;height: 48px;background: #C99700;border-radius: 2px;color:#fff;font-weight: bold;font-size: 16px;text-align: center;line-height: 48px;margin-top: 40px;}
.footerimg{width: 100%;height: 162px;}
.footerimg img{width:150px;height: 48px;margin-top: 50px;margin-left: 113px;}
.Addressd{width:327px;height: 44px;display: flex;margin-left: 16px;opacity: 1;color: #333333 !important;font-size: 16px;border-bottom: 0.5px solid #E5E5E5;line-height: 44px;}
.Timediv{width: 305px;margin-left:16px;display: flex;height: 44px;color: #333333;font-size: 16px;line-height: 44px;}
.Timediv input{width: 293px;color: #333;opacity: 1;}
.Timediv input::-webkit-input-placeholder{color:#333;opacity: 1;}
textarea::-webkit-input-placeholder{color:#ccc;}
.Timediv img{width: 12px;height: 6px;margin-top: 20px;}
.TimeRangediv{width: 305px;margin-left:16px;display: flex;height: 44px;color: #333333;font-size: 16px;line-height: 44px;}
.TimeRangediv input{width:145px;text-align: center;color: #000 !important;}
/* .Addressd div:nth-child(1){width:78px;height: 100%;} */
.Addressd div:nth-child(1){width: 340px;display: flex;}
.Addressd div:nth-child(1) input{width:295px;}
.Addressd div:nth-child(1) span:nth-child(2){text-align: text;}
.Addressd div:nth-child(1) span img{width: 6px;height: 12px;}
.Addressdiv{width:327px;height: 110px;display: flex;margin-left: 16px;color: #333333;font-size: 16px;}
.Addressdiv div{width:78px;height: 100%;padding-top: 11px;}
.Addressdiv textarea{width: 305px;padding-top: 11px;line-height: 22.4px;}
.van-checkbox-group>>>.van-badge__wrapper{border-radius: 4px !important;}
.van-radio-group>>>.van-radio__label{font-size: 16px;}
.van-radio-group>>>.van-radio__icon--checked + .van-radio__label{font-size: 16px;color: #C99700;}

.van-checkbox-group>>>.van-checkbox__label{font-size: 16px;}
.van-picker >>> .van-picker__confirm{color: #C99700;}
.van-popup{font-size: 16px !important;}
.normal{width: 100%;height: 100vh;background: #fff;position: fixed;top: 0;z-index: 99;}
.normal{width: 100%;text-align: center;padding-top: 88px;}
.normal img{width:160px;height: 160px;display: inline-block;}
.normal span{display: block;}
.normalcont{width: 100%;text-align: center;}
.normalcont span:nth-child(1){color: #333333;font-size: 24px;font-weight: bold;margin-top: 12px;}
.normalcont span:nth-child(2){color: #666666;font-size: 16px;}
.normalcont div{width: 200px;height: 48px;background:#C99700;border-radius: 76px;line-height: 48px;color: #fff;font-size: 16px;margin-left: 88px;margin-top: 48px;}
/* .van-dialog__message{font-size: 18px !important;} */
</style>
