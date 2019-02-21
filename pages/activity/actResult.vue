<template>
    <div>
        <header>活动</header>
        <div class="section1">
            <div class="mask">
                <div class="port-left">
                    <div class="male">
                        <p>男生</p>
                        <p>50%</p>
                    </div>
                    <div class="female">
                        <p>女生</p>
                        <p>50%</p>
                    </div>
                </div>
                <div class="port-right">
                    <button class="viewDesc">活动介绍</button>
                </div>
            </div>
        </div>
        <div class="section2">
            <p>距离99期互动开始仅剩1天</p>
            <button class="join">查看匹配</button>
            <p>距离99期活动报名截止还剩1天2小时</p>
            <div class="tip-wrap">
                <button>匹配历史</button>
                <button>我的CP</button>
            </div>
        </div>
        <!-- <footer-nav :tabIndex='2'></footer-nav> -->
    </div>    
</template>
<script>
import FooterNav from '~/components/footer-nav.vue'

export default {
  components: {
      'footer-nav':FooterNav
  }
}
</script>
<style lang="stylus" scoped>
// @import '~assets/styl/actEnter.styl'
.section1
    width 100%
    height 233px
    background url('~static/huodong-bg.png') top center/cover no-repeat
    position relative
    .mask
        background rgba(0,0,0,.5)
        height 33px
        width: 100%
        display flex
        align-items: center
        justify-content: space-between
        padding: 0 12px 0 6px
        position absolute
        bottom: 0
        left 0
        color: #fff
        .port-right
            display flex
            align-items: center
            button 
                width 74px
                height 22px
                border none 
                font-size 12px
                background #FFABAC
                color #fff
                border-radius 11px
                
        .port-left
            border-radius: 5px
            overflow: hidden
            display flex
            .male
                background #33CCCC
                padding-left: 6px
            .female
                background #FFABAC
                text-align: right
                padding-right: 6px
                margin-left: 1.5px
            div
                width: 50px
                height 25px
                p:first-child
                    font-size: 10px
                    // text-indent 6px
                p:last-child
                    // text-indent 6px
                    font-size: 8px
.section2
    height 'calc(100vh - %s)' % 274px
    background #EEB9B3
    color #ffffff
    display flex
    flex-direction: column
    align-items: center
    p
        font-size: 12px
        text-align: center
        &:first-child
            margin-top: 13px
    .join
        width: 230px
        height 61px
        border-radius: 10px
        background #FF5C60
        font-size: 23px
        font-weight: bold
        border none
        margin 10px auto
    .tip-wrap
        margin-top: 17px
        button 
            width: 150px
            height 43px
            border 3px solid #fff
            font-size: 16px
            background transparent
            border-radius: 22px
            &:last-child
                margin-left: 22px



</style>

