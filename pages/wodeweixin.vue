<template>
  <div>
    <header>我的微信</header>
    <div class="content">
      <p class="title">微信号</p>
      <input type="text" placeholder="请填写微信号" v-model="weNum">
    </div>
    <van-button size="large" class="next" @click="submit">提交</van-button>
  </div>
</template>

<script>
import FooterNav from '~/components/footer-nav.vue'
import {getWechatNum,updateWechatNum} from '~/api/getData.js'
export default {
  data(){
    return{
      weNum:'',
      uid:''
    }
  },
  methods:{
    submit(){
      updateWechatNum({uid:this.uid,wx:this.weNum}).then(async res=>{
        if(res.data.code==200){
          await this.$toast.success('修改成功');
          this.$router.back();
        }else{
          this.$toast.fail(res.data.data);
        }
      })
    }
  },
  components: {
      'footer-nav':FooterNav
  },
  async asyncData({query}){

    let {data:weNum} = await getWechatNum({uid:query.uid})
    return {weNum:weNum.data,uid:query.uid}

    // this.weNum = weNum.data,this.uid=this.$route.query.uid;
  }
};
</script>

<style lang='stylus'>
.content {
  padding: 0 15px;

  .title {
    font-size: 15px;
    margin: 18px 0 12px;
  }

  input[type=text] {
    width: 350px;
    height: 37px;
    border: 1px solid #797979;
    border-radius: 10px;
    padding-left: 8px;
    font-size: 15px;
  }
}

.next {
  background: #EFC2BC;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>