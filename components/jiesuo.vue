<template>
  <van-popup v-model="showJiesuo" @click-overlay="overlayClick">
    <div class="jiesuo-wrap">
      <h2>选择一种解锁方式</h2>
      <p>联系方式复制到好友搜索框可见</p>
      <div class="btn-wrap">
        <button @click="sendToFriend">
          <img src="~static/zhuli.png" alt="">
          <span style="color:#7DC5EB">好友助力</span>
        </button>
        <div class="line-ver"></div>
        <button @click="payNow">
          <img src="~static/wangwangbi.png" alt="">
          <span style="color:#FCD41B">9脱单币</span>
        </button>
      </div>
    </div>
  </van-popup>
</template>
<script>
export default {
  model:{
        prop:'show',
        event:'change'
    },
  props:{
    show:Boolean,
  },
  data(){
    return{

      showJiesuo:this.show
    }
  },
  watch:{
    show(val){
      this.showJiesuo = val
    }
  },
  methods:{
    sendToFriend(){
      this.$emit('sendToFriend');
      this.$emit('change',false);
    },
    payNow(){
      this.$emit('payNow');
      this.$emit('change',false);
    },
    overlayClick(){
      this.$emit('change',false);
    }
  }

};
</script>
<style lang="stylus" scoped>
.van-popup
  background transparent
.jiesuo-wrap
  width 355px
  height 310px
  margin 0 auto 
  border-radius 15px
  overflow hidden
  background #fff
  h2
    font-size 20px
    text-align center
    margin-top 30px
  p
    margin-top 7px
    font-size 14px
    text-align center
  .btn-wrap
    display flex
    justify-content center
    margin-top 23px
    .line-ver
      width 2.5px
      height 70px
      background #D7D7D7
      margin 20px 27px 0
    button
      width 105px
      height 143px
      background transparent
      border-radius 15px
      box-shadow 2.5px 2.5px 7.5px #797979
      border none
      display flex
      flex-direction column
      align-items center
      justify-content center
      img 
        width 53px
        height 53px
      span 
        font-size 14px
        margin-top 15px

  
</style>


