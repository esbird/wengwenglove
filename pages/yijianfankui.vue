<template>
<div>
  <header>意见反馈</header>
  <div class="content">
      <p class="title">我的意见</p>
      <textarea placeholder="请填写您的意见" v-model="text"></textarea>
  </div>
    <van-button size="large" class="next" @click="submit">提交</van-button>
</div>
</template>

<script>
import FooterNav from '~/components/footer-nav.vue'
import {addAdv} from '~/api/getData.js'
export default {
  data(){
    return{
      text:'',
      uid:''
    }
  },
  components: {
      'footer-nav':FooterNav
  },
  methods:{
    async submit(){
      if(this.text==''){
        this.$toast.fail('内容为空，不可提交')
      }else{
        await addAdv({uid:this.uid,content:this.text}).then( async res=>{
          if(res.data.code == 200){
            await this.$toast.success('意见提交成功')
            this.$router.back();
          }
        })

      }
    }
  },
  async asyncData({query}){
    // this.uid = this.$route.query.uid;
    return{uid:query.uid}
  }
};
</script>

<style lang='stylus' scoped>
.content
    padding 0 15px
    .title
        font-size 15px
        margin 18px 0 12px
    textarea
        width 350px
        height 100px
        border 1px solid #797979
        border-radius 10px
        padding-left 8px
        padding-top 8px
        font-size 15px
        
.next
    background #EFC2BC
    color #fff
    position fixed
    bottom 0
    left 0
</style>