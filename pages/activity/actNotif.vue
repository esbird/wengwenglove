<template>
    <div>
        <header>CP正在匹配中</header>
        <div class="section1">
            <h2>CP正在匹配中</h2>
            <p class="p1">99期匹配结果预计09-20公布</p>
            <p class="p2">第一之间将以模板消息通知您</p>
        </div>
        <div class="section2">
            <div class="percentage-wrap">
                <div class="percentage-box">
                    <div class="percentage" :style="{width:per+'%'}"></div>
                </div>
                <p>匹配成功率：{{per}}%</p>
            </div>
        </div>
    </div>    
</template>
<script>

export default {
  data(){
      return{
            per:50
      }
  }
}
</script>
<style lang="stylus" scoped>
// @import '~assets/styl/actEnter.styl'
.section1
    width 100%
    height 150px
    display flex
    flex-direction column
    align-items center

    h2
        font-size 18px
        color #FF6666
        margin-top 53px
    p
        color #949494
    .p1
        font-size 18px
        margin-top 10px
    .p2
        margin-top 8px
        font-size 16px

.section2
    background #f2f2f2
    width 100%
    height 120px
    display flex
    align-items center
    justify-content space-around
    .percentage-wrap
        width 337px
        height 75px
        background #fff
        border-radius 10px
        box-shadow 3px 3px 7px #BCBCBC
        display flex
        flex-direction column
        align-items center
        justify-content center
        p
            font-size 18px
            font-weight bold
            color #FF6666
            margin-top 10px
        .percentage-box
            width 292px
            height 14px
            border 2px solid #FF6666
            border-radius 7px
            padding 1.5px
            .percentage
                width 10%
                height 7px
                border-radius 3.5px
                background #FF6666





</style>

