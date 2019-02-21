<template>
    <div>
        <header>活动</header>
        <div class="section1">
          <!-- <h2>付费入场</h2>
          <p></p> -->
        </div>
        <div class="section2">
            <p>付费入场将直接获得90%的最高匹配成功率，<br>
您将会以最高优先级进行匹配</p>
        </div>
        <div class="section3">
            <h2>支付方式</h2>
            <ul>
                <li class="clearfix">
                    <img src="~/static/wePay.png" alt="" class="payIcon">
                    <div class="payName">
                        <h2>微信支付</h2>
                        <p>亿万用户的选择，更快更安全</p>
                    </div>
                    <van-icon name="checked" class="checked" />
                </li>
            </ul>
        </div>
        <van-button size="large" class="next" @click="payNow">确认支付</van-button>
        <!-- <footer-nav :tabIndex='2'></footer-nav> -->
    </div>    
</template>
<script>
import FooterNav from '~/components/footer-nav.vue'
import wxpay from '~/api/wxpay.js'
import {actJoin} from '~/api/getData.js'

export default {
  components: {
      'footer-nav':FooterNav
  },
  methods:{
      async payNow(){
        let {data:wxPayData} = await actJoin({uid:this.$route.query.uid})
        console.log(wxPayData);
        await wxpay(wxPayData,()=>{
          this.$dialog.alert({
            title:'提醒',
            message:"报名成功！"
          }).then(()=>{
            this.$router.push({path:'/activity/actEnter',query:{uid:this.$route.query.uid}})
          })
          
        },(res)=>{
          // 支付失败
          this.$dialog.alert({
            message:res
          })
        })
        

        // this.$router.push({path:'/activity/actEnter'})
      }
  },
}
</script>
<style lang="stylus" scoped>
.section2
    font-size 13px
    // text-align center
    margin-left 60px
.section3
    padding 0 16px
    margin-top 26px
    h2
        font-size 16px
    ul
        li 
            height 45px
            border-bottom 2px solid #f2f2f2
            // display table-cell
            // vertical-align middle
            // width 100%
            // margin 0 atuo
            position relative
        img 
            position absolute
            top 50%
            left 0
            width 30px
            height 30px
            float left 
            transform translate3d(0,-50%,0)
        .payName
            float left 
            position absolute
            top 50%
            left 42px
            transform translate3d(0,-50%,0)

        .checked
            color #E8989A
            float right
            font-size 30px
            position absolute
            right 8px
            top 50%
            transform translate3d(0,-50%,0)

        
.next
    background #EFC2BC
    color #fff
    position fixed
    bottom 0
    left 0
.section1
    width 350px
    height 175px
    background url('~/static/pay-bg.png') no-repeat top center/350px 175px
    border-radius 10px
    margin 10px auto 


</style>

