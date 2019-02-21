<template>
  <van-popup v-model="showJiesuo" @click-overlay="overlayClick">
    <div class="send-msg-wrap">
      <h2>发送告白信息</h2>
      <textarea name="msg" id="" v-model="msgValue" placeholder="输入告白信息"></textarea>
      <div class="tip">消耗：<img src="~static/wangwangbi.png" alt="">1枚脱单币</div>
      <button class="sendMsg" @click="sendMsg">发&nbsp;&nbsp;&nbsp;送</button>
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
      showJiesuo:this.show,
      msgValue:''
    }
  },
  watch:{
    show(val){
      this.showJiesuo = val
    }
  },
  methods:{
    sendMsg(){
      this.$dialog
        .confirm({
          title: "提醒",
          message: "您将消费1个狗粮币"
        })
        .then(() => {
          this.$emit('sendMsg',this.msgValue);
          this.$emit('change',false);
          // on confirm
        })
        .catch(() => {
          this.$emit('change',false);
          // on cancel
        });
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
.send-msg-wrap
  width 355px
  height 310px
  margin 0 auto 
  border-radius 15px
  overflow hidden
  background #fff
  padding 15px
  display flex
  flex-direction column
  align-items center

  h2
    font-size 20px
    text-align center
    margin-top 20px
  textarea
    font-size 14px
    margin 16px auto 0
    padding 11px
    border 1.2px solid #D6D6D6
    width 300px
    height 105px
    border-radius 10px
  .tip
    font-size 14px
    color #797979
    display flex
    align-items center
    justify-content flex-end
    align-self flex-end
    padding-right 12px
    margin 10px 0
    img 
      width 25px
      height 25px
  .sendMsg
    width 325px
    height 40px
    border-radius 7px
    background #FF6666
    color #fff
    border none
    margin 0 auto
    font-size 20px

  
</style>


