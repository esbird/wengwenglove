<template>
<div>
  <header>我解锁的</header>
  <div class="tabBar">
      <div class="active">我解锁的</div>
      <nuxt-link tag="div" :to="{path:'/myself/woxihuande',query:{uid:uid}}" replace>我喜欢的</nuxt-link>
  </div>
  <div class="content">
      <div class="nothing"  v-if="unlockList.length == 0">
        <img src="~/static/nothing.png" alt="">
        <p>当前无解锁对象&nbsp;&nbsp;快去大厅看看吧</p>
        <!-- <p></p> -->
      </div>
      <div class="section1" @click="selectItem(item.mid)" v-for="(item,index) in unlockList" :key="index"  v-else>
        <div class="port1">
          <img :src="item.face" alt="" class="head-pic">
          <div>
            <h2>{{item.nikname}}</h2>
            <p style="color:#A1A1A1">{{item.region}}</p>
          </div>
        </div>
        <div class="port2">
          <p><img src="~static/iLike.png" alt=""><span>{{item.loveNum}}</span></p>
          <!-- <p><span>查看告白信息</span><i class="iconfont icon-arrow-left"></i></p> -->
        </div>
      </div>
  </div>
</div>
</template>

<script>
import FooterNav from '~/components/footer-nav.vue'
import { getUnlockList } from "~/api/getData.js";

export default {
  data(){
    return{
      List:'',
      uid:'',
      unlockList:[],
    }
  },
  components: {
      'footer-nav':FooterNav,
  },
  methods:{
    selectItem(Oid){
      this.$router.push({path:'/personInfo',query:{uid:this.uid,Oid,unlock:1}})
    }
  },
  async asyncData({query}) {
    let { data: List } = await getUnlockList({ uid: query.uid });
    // return { List: List.data,uid:query.uid };

    // this.unlockList = List.data.unlockList,this.uid=query.uid;
    return{
      unlockList:List.data.unlockList,
      uid:query.uid
    }
    // this.unlockListLength = this.unlockList.length;
    // console.log(List.data.unlockList)
    // console.log(this.unlockList.length)
    // console.log(typeof this.unlockList.length)

  }
};
</script>

<style lang='stylus' scoped>
.nothing
  display flex;
  flex-direction column
  align-items center
  position fixed
  width 100%
  left 50%;
  top 50%
  transform translate3d(-50%,-50%,0)
  p
    font-size 14px
    font-weight 600
    margin-top 10px
  img 
    width 87px
    height 87px
.tabBar
    width 100%
    height 39px
    display flex
    div
        flex 1
        text-align center
        font-size 12px
        color #BC8176
        line-height 39px
        &.active
            position relative
            &:before
                content ''
                width 100%
                height 2.5px
                position absolute
                bottom 0
                left 0
                background #BC8176
.content
    width 100%
    padding (10px/2) (10px/2) 0
.section1
    width 100%
    height (160px/2)
    border-radius (15px/2)
    background #fff
    font-size (32px/2)
    display flex
    align-items: center
    justify-content: space-between
    padding: 0 (22px/2)
    border-bottom: 1.2px solid #F2F2F2; 
    .head-pic
        width: (95px/2)
        height (95px/2)
        border (5px/2) solid #FEE9E8
        border-radius: 50%
    .port1
        display flex
        &>div
            margin-left: (26px/2)
            height (96px/2)
            display flex
            font-size: (32px/2)
            flex-direction: column
            justify-content: space-between
    .port2
        display flex
        flex-direction: column
        align-items: flex-end
        font-size: (32px/2)
        height (96px/2)
        justify-content: center
        img 
            width: (36px/2)
            height (36px/2)
            margin 0 (12px/2)
        p
            display flex
            align-items: center
        p:nth-child(2)
            color: #A1A1A1
            font-size: (24px/2)
            .iconfont
                font-size: (30px/2)
                margin-left: (12px/2)
</style>