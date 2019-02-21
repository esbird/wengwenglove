<template>
    <div>
        <header>活动</header>
        <div class="section1" :style="{'background-image':'url('+actBg.img+')'}">
            <div class="mask">
                <div class="port-left">
                    <div class="male" :style="{width:man}">
                        <p>男生</p>
                        <p>{{man}}</p>
                    </div>
                    <div class="female" :style="{width:woman}">
                        <p>女生</p>
                        <p>{{woman}}</p>
                    </div>
                </div>
                <!-- <div class="port-right">
                    <img src="" alt="" class="head_img">
                    <span>浙江 温州 XXXX20分钟前报名</span>
                </div> -->
            </div>
        </div>
        <div class="section2">
            <p v-if="!isStarted">距离{{$route.query.periods}}期互动开始仅剩{{longToStart.day > 1 ?longToStart.day+'天': longToStart.hour+'小时'}}</p>
            <button class="join" v-if="join_has==0" @click="joinAct" :disabled="isEnd" :style="{'background':isEnd?'#D4D4D4':'#FF5C60'}">{{isEnd?'本期活动结束':'报名本期'}}</button>
            <!-- <nuxt-link class="join" tag="button" v-if="join_has==0" :to="{path:'/activity/actWriteInfo',query:{uid:uid}}">报名本期</nuxt-link> -->
            <button class="join" v-else @click="goResult">查看匹配</button>
            <p v-if="isStarted && !isEnd">距离{{$route.query.periods}}期活动报名截止还剩{{longToEnd.day > 1 ? longToEnd.day+'天': longToEnd.hour+'小时'}}</p>
            <div class="tip-wrap">
                <nuxt-link tag="button" :to="{path:'/activity/CPHistory',query:{uid:$route.query.uid}}">匹配历史</nuxt-link >
                <nuxt-link tag="button" :to="{path:'/activity/myCP',query:{uid:$route.query.uid}}">我的CP</nuxt-link >
            </div>
        </div>
        <!-- <footer-nav :tabIndex='2'></footer-nav> -->
    </div>
</template>
<script>
import FooterNav from "~/components/footer-nav.vue";
import { getActivity, getActionOn,getActBg,getMyInfo,getActState } from "~/api/getData.js";
import dayjs from 'dayjs'

export default {
  methods:{
    // 跳转结果
    goResult(){
      if (this.actStatus==1) {
        this.$router.push({path:'/activity/actNotif',query:{uid:this.uid}})
      }else{
        this.$router.push({path:'/activity/CPHistory',query:{uid:this.uid}})
      }
    },
    joinAct(){
      if (this.userinfo.userinfo.wx) {
        this.$router.push({path:'/activity/actWriteInfo',query:{uid:this.uid}});
        }else{
        this.$dialog.alert({title:'提醒',message:'请先到个人中心中填写微信号后，才可参加活动！'});

      }
    }
  },
  components: {
    "footer-nav": FooterNav
  },
  data(){
    return{
      longToEnd:{},
      longToStart:{},
      isStarted:false,
      isEnd:true,
      uid:'',
      actList:'',
      join_has: '',
      woman: '',
      man: '',
      actBg:{
        img:null
      },
      userinfo:{}
    }
  },
  async asyncData({query}){
    let ayData = {},actData,actStatus;
    let { uid } = query;
    await getActivity().then(res=>{
      if (res.data.code==200) {
        actData = res.data.data
      }
    })
    // console.log(actData);
    let {data} = await getActionOn({ uid });

    let actRes = data.data;
    // let {data:actList} = await getActivity();
    // 获取活动图片
    let actBg;
    await getActBg().then(res=>{
      if (res.data.code==200) {
        actBg = res.data.data[1];
      }
      return res;
    })
    await getActState()
        .then(res=>{
            if (res.data.code==200) {
                actStatus = res.data.data
            }
        })
    // console.table(actBg)

    //获取个人信息
    let {data:userinfo}= await getMyInfo({uid})
    // .then(res=>{
    //   if (res.data.code==200) {
    //     this.userinfo = res.data.data.userinfo;
    //   }else{
    //     this.$dialog.alert({title:'提醒',message:res.data.msg});
    //   }
    // })


    // this.actList=actList.data,
    
    let startTime = dayjs(actData.start_time);
    let endTime = dayjs(actData.end_time);
    let nowTime = dayjs();
    let isStarted = nowTime.unix() > startTime.unix(); //活动是否开始
    let longToStart={};
    if(!isStarted){
      // 没开始，算开始时间
      console.log('node')
      longToStart = {
        day:startTime.diff(nowTime,'days'),
        hour:startTime.diff(nowTime,'hours')
      }
    }
    let isEnd = nowTime.unix() > endTime.unix();//活动是否结束
    let longToEnd={};
    if(!isEnd){
      // 没结束，算结束时间
      longToEnd = {
        day:endTime.diff(nowTime,'days'),
        hour:endTime.diff(nowTime,'hours')
      }
    }
    
    // this.isStarted = isStarted;
    // this.isEnd = isEnd;
    return{
      uid:uid,
      join_has: actRes.join_has,
      woman: actRes.woman,
      man: actRes.man,
      isStarted,
      isEnd,
      longToEnd,
      userinfo:userinfo.data,
      actBg,
      actStatus
    }

  },
};
</script>
<style lang="stylus" src="~/assets/styl/actEnter.styl" scoped>
// @import   '~assets/styl/actEnter.styl';
</style>

