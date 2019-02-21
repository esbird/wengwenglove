<template>
  <div>
    <header>好友助力</header>
    <div class="banner">

    </div>
    <div class="support-wrap">
      <p class="title">助力成功</p>
      <p class="percentage">11%</p>
      <p class="notif">因为你的助力{{host.nickname}}的解锁进度提升了</p>
      <button @click="goIndex">我也要玩</button>
    </div>
    <div class="support-record">
      <div class="title">助力记录</div>
      <ul>
        <li v-for="(item,index) in shareList" :key="index">
          <img :src="item.face" alt="">
          <div class="text-port">
            <p class="nickName">{{item.nickname}}</p>
            <p class="time">{{item.create_time}}</p>
          </div>
          <span>+11%</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {getShareList,addToUnlock} from '~/api/getData.js'
// import wxShare from '~/api/wxShare.js'
export default {
  components:{
    // 'bujiao-view':BuJiao
  },
  methods:{
    goIndex(){
      location.href='http://www.wengwenglove.com'
    }
  },
  head () {
    return {
      // title: this.title,
      // meta: [
      //   { hid: 'description', name: 'description', content: 'My custom description' }
      // ]
      // script: [{
      //   src: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js',
      //   type: 'text/javascript',
      //   charset: 'utf-8'
      // }],
    }
  },
  mounted() {
    console.log('助力成功！')
    this.$toast({
      // title:'提醒',
      message:this.state==1?'助力成功！':this.state==2?'链接出现错误!':'您已经助力过了'
    });
  },
  async asyncData({query}){
    // 设置分享链接
    // let {data:shareData} =await addToUnlock({uid:query.uid,mid:query.mid,type:1});
    // wxShare(shareData,()=>{
    //   // 成功回调
    //   console.log('分享成功')
    // })

    let {data:shareList} = await getShareList({uid:query.uid,mid:query.mid})
    .then(res=>{
      if(res.data.code!=200){
        console.log(res.data.msg)
      }
      return res;
    })
    return{
      shareList:shareList.data,
      host : shareList.data[0],
      state : query.state,
      
    }
    // console.log(this.$route.query);

  },
  data(){
    return{
      per:20,
      show:false,
      shareList:'',
      host:'',
      state:'',
    }
  }
};
</script>
<style lang="stylus" scoped src="~/assets/styl/supportSuccess.styl">

</style>


