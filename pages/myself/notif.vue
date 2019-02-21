<template>
  <div>
    <header>消息通知</header>
    <div class="container">
      <div class="content">
        <ul>
          <li v-for="(item,index) in msgList" :key="index">
            <p class="text">{{item.content}}</p>
            <span class="time">{{item.create_time}}</span>
          </li>
        </ul>

      </div>
    </div>
    <!-- <footer-nav :tabIndex='3'></footer-nav> -->
  </div>
</template>
<script>
import FooterNav from "~/components/footer-nav.vue";
import { getShowMsg ,getNotice} from "~/api/getData.js";
export default {
  components: {
    "footer-nav": FooterNav
  },
  data() {
    return {
      nowIndex: 0,
      msgList:'',
      uid:''
    };
  },
  methods: {
    showMsg(index) {
      if (index == this.nowIndex) {
        this.msgList[index].show = !this.msgList[index].show;
      } else {
        this.msgList[index].show = true;
        this.msgList[this.nowIndex].show = false;
        this.nowIndex = index;
      }
    }
  },
  async asyncData({query}) {
    let { data:msgList } = await getNotice({ uid: query.uid });
    // console.log(data)
    // this.msgList=msgList.data,this.uid = query.uid;
    return{
      msgList:msgList.data,
      uid:query.uid
    }
  }
};
</script>
<style lang="stylus" scoped>
.content
  background #E5CABF
  height 'calc(100vh - %s)' % 40px
  overflow auto
  ul
    li
      width 355px
      // height 91px
      background #fff
      font-size 12px
      position relative
      border-radius 7.5px
      margin 10px auto 0px
      padding 12px 12px 30px
      .time
        position absolute
        right 12px
        bottom 12px
</style>

