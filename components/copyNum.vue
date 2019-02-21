<template>
  <van-popup v-model="showWeNum" @click-overlay="overlayClick">
    <div class="jiesuo-wrap">
      <h2>请保持理性交友，请勿轻信</h2>
      <p>联系方式复制到好友搜索框可见</p>
      <div class="clip-wrap">
        <img src="~/static/wechat.png" alt="">
        <input type="password" name="" readonly class="weChatNum" v-model="weChatNum" id="">
        <button class="copy" data-clipboard-action="copy" :data-clipboard-text="weChatNum">一键复制</button>
      </div>
      <div class="tip">
        <p style="display:flex;align-items:center;justify-content:center"><van-icon name="warn"  style="color:red"/>交友提示</p>
        <p>聊天过程，注意隐私保护<br>
不要轻信，不要随意约见</p>
      </div>
    </div>
  </van-popup>
</template>
<script>
import ClipboardJS from "clipboard";
export default {
  model: {
    prop: "show",
    event: "change"
  },
  props: {
    show: Boolean,
    weChatNum: {
      type: String
    }
  },
  mounted() {
    let clipboard = new ClipboardJS(".copy");
    let that = this;
    clipboard.on("success", function(e) {
      // console.info("Action:", e.action);
      // console.info("Text:", e.text);
      // console.info("Trigger:", e.trigger);
      that.$dialog.alert({
        title:'提醒',
        message:"微信已复制到剪切板"
      });
      that.$emit("change", false);

      // e.clearSelection();
    });

    clipboard.on("error", function(e) {
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    });
  },
  data() {
    return {
      showWeNum: this.show
    };
  },
  watch: {
    show(val) {
      this.showWeNum = val;
    }
  },
  methods: {
    // sendToFriend(){
    //   this.$emit('sendToFriend');
    //   this.$emit('change',false);
    // },
    // payNow() {
    //   this.$emit("payNow");
    //   this.$emit("change", false);
    // },
    overlayClick() {
      this.$emit("change", false);
    }
  }
};
</script>
<style lang="stylus" scoped>
.van-popup
  background: transparent;
.jiesuo-wrap
  width: 355px;
  height: 310px;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background: #fff;
  .tip
    p
      font-size 16px
      line-height 1.5
      .van-icon
        font-size 24px
        margin-right 10px
      &:first-child
        margin 25px 0 10px
      &:last-child
        color #868686
  .clip-wrap
    width 321px
    height 48px
    border 1.2px solid #BCBCBC
    border-radius 24px
    display flex
    align-items center
    justify-content space-around
    padding 0 14px
    margin 27px auto 0
    button 
      width 82px
      height 30px
      border none 
      background #09BB07
      color #ffffff
      border-radius 15px
    input[type=password]
      width 150px
      font-size 30px
      border none
      overflow hidden
      text-align center
    img 
      width 36px
      height 36px
  h2
    font-size: 20px;
    text-align: center;
    margin-top: 30px;
  p
    margin-top: 7px;
    font-size: 14px;
    text-align: center;
</style>


