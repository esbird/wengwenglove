<template>
<div>
    <header>
        我的脱单币
    </header>
    <div class="section1">
        <div class="content">
            <span>脱单币</span>
            <div class="count">
                <img src="~static/wangwangbi.png" alt="">
                <span>{{account}}</span>
            </div>
        </div>
    </div>
    <nuxt-link tag="p" :to="{path:'/myself/account/accountRecord',query:{uid:$route.query.uid}}" class="section2">
        <img src="~static/record.png" alt="">
        <span>消费记录</span>
    </nuxt-link>
    <div class="line"></div>
    <div class="section3">
        <ul>
            <li v-for="(item,index) in sendList" :key="index"><span>{{item.recharge+item.send}}脱单币</span><button @click="rechargeFun(item.recharge)">{{item.recharge | ParseInt}}元</button></li>
            <!-- <li><span>0.01脱单币</span><button @click="rechargeFun(0.01)">0.01元</button></li> -->
        </ul>
    </div>
    
</div>
</template>
<script>
import {getBalance,getSend,putRecharge} from '~/api/getData.js'
import wxpay from '~/api/wxpay.js'
export default {
  data(){
    return{
      account:'',
      sendList:''
    }
  },
  methods:{
    async rechargeFun(money){
      let {data:payData} = await putRecharge({uid:this.$route.query.uid,money});
      console.log(payData)
      wxpay(payData,()=>{
        // 成功回调
        this.$dialog.alert({
          message:'充值成功'
        }).then(async ()=>{
          let {data:account} = await getBalance({uid:this.$route.query.uid})
          account = account.data;
          this.account= parseInt(account)
        })
      },(res)=>{
        console.log(res);
        this.$toast('支付失败')
      })
    }
  },
  filters: {
    ParseInt: function (value) {
      
      return parseInt(value)
    }
  },
  async asyncData({query}){
      // console.log('uid',params,query)
      let {data:account} = await getBalance({uid:query.uid})
      account = account.data;
      account= parseInt(account)
      let {data:sendList} = await getSend()
      sendList =sendList.data.map(item=>{
        item.recharge = parseInt(item.recharge);
        item.send = parseInt(item.send);
        return item;
      });
      // console.log(account)
      return{
        account,
        sendList,
        uid:query.uid
      }
      // this.sendList = sendList;
  }
}
</script>

<style lang="stylus" src="~/assets/styl/account.styl"  scoped>
    // @import ''
</style>

