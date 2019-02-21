<template>
  <div>
    <header>好友助力</header>
    <div class="banner">

    </div>
    <div class="support-wrap">
      <div class="percentage-box">
        <div class="percentage" :style="{width:per+'%'}"></div>
      </div>
      <p>好友助力数：1/9</p>
      <div class="btn-wrap">
        <button @click="show=true">补缴解锁</button>
        <button @click="alertNotif">邀请好友助力</button>
      </div>
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
          <span>+1</span>
        </li>
      </ul>
    </div>
    <bujiao-view v-model="show" :lastCount='9-shareList.length' @payNow="payNowFun"></bujiao-view>
  </div>
</template>
<script>
import BuJiao from '~/components/bujiao.vue'
import {getShareList,addToUnlock} from '~/api/getData.js'
import wxShare from '~/api/wxShare.js'
import wxPay from '~/api/wxpay.js'
export default {
  components:{
    'bujiao-view':BuJiao
  },
  methods:{
    alertNotif(){
      this.$dialog.alert({
        title:'提醒',
        message:'请点击右上角分享给好友，进行好友助力！'
      })
    },
    async payNowFun(){
      let {data:payData} = await addToUnlock({uid:this.$route.query.uid,mid:this.$route.query.mid,type:3});
      wxPay(payData,()=>{
        this.$dialog.alert({title:'补缴成功',message:'您可以去个人中心，我的解锁中查看!'}).then(()=>{
          this.$router.replace({path:'/',query:{uid:this.$route.query.uid}});
        })
      },res=>{
        // 失败
        console.log(res)
        this.$dialog.alert({
          message:'支付失败'
        })
      })
    }
  },
  
  head () {
    return {
      // title: this.title,
      // meta: [
      //   { hid: 'description', name: 'description', content: 'My custom description' }
      // ]
      script: [{
        src: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js',
        type: 'text/javascript',
        charset: 'utf-8'
      }],
    }
  },
  mounted(){
    wxShare(this.shareData.data,()=>{
      // 成功回调
      console.log('分享成功')
    })

  },
  async asyncData({query}){
    
    // 设置分享链接
    let {data:shareData} =await addToUnlock({uid:query.uid,mid:query.mid,type:1});

    let {data:shareList} = await getShareList({uid:query.uid,mid:query.mid})
    .then(res=>{
      if(res.data.code!=200){
        
        console.log(res.data.msg)
      }
      return res;
    })
    return{
      shareList:shareList.data,
      shareData
    }
    // this.shareList=shareList.data

  },
  data(){
    return{
      per:20,
      show:false,
      shareList:''
    }
  }
};
</script>
<style lang="stylus" scoped src="~/assets/styl/friendSupport.styl">

</style>


