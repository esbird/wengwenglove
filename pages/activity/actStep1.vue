<template>
    <div>
        <div class="content">
            <h2>HI {{userinfo.nickname}}</h2>
            <p class="p1">欢迎来到72小时恋爱体验！</p>
            <p class="p2">
                接下来，请天下你的匹配偏好<br>
一遍系统了解你的交友要求
            </p>
            <button class='goNext' @click="goNext"><span> 开始填写</span><van-icon name="arrow" /></button>
        </div>    
    
    </div>    
</template>
<script>
import {getMyInfo} from '~/api/getData.js'
export default {
  methods:{
      goNext(){
          this.$router.push({path:"/activity/actStep2",query:{uid:this.uid}})
      }
  },
  data(){
    return{
      uid:'',
      userinfo:{}
    }
  },
  async asyncData({query}) {
    // this.uid =this.$route.query.uid;
    let {data:userinfo}=await getMyInfo({uid:query.uid});
    return{
        uid:query.uid,
        userinfo:userinfo.data.userinfo
    }
  },
  // asyncData({query}){
  //   return{uid:query.uid}
  // }
}
</script>

<style lang="stylus" scoped>
.content
    overflow hidden
    height 100vh
    width 100%
    background #EEB9B3
    color #fff
    padding-left 33px
    h2
        font-size 28px
        font-weight bold
        margin-top 117px
    .p1
        font-size 20px
        margin-top 7px
    .p2
        margin-top  84px
        font-size 18px

.goNext
    width 119px
    height 43px
    background #FFFFFF
    color #EEB9B3
    font-size 16px
    border none 
    position fixed
    right 0
    bottom 65px
    // display flex
    // align-items center
    .van-icon-arrow
        transform translate3d(1px,2px,0)
</style>

