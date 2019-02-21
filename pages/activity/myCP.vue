<template>
  <div>
    <header>我的CP</header>
    <ul>
        <!-- uid=987&Oid=194&unlock=0 -->
      <nuxt-link tag="li" :to="{path:'/personInfo',query:{uid:myCP.uid,Oid:myCP.pid,unlock:3}}">
        <h2>
          <button>第{{myCP.periods}}期</button>
          <span>匹配成功</span>
        </h2>
        <div class="detail">
          <div class="img">
            <img :src="myCP.face" alt>
            <img :src="myCP.pface" alt class="objImg">
          </div>
          <div class="right">
            <p>{{myCP.nikname}}</p>
            <!-- <div class="line"></div> -->
            <p style="color:#868686">匹配对象：{{myCP.pnikname}}</p>
            <van-icon name="arrow"  class="arrow"/>
          </div>
        </div>
      </nuxt-link>
    </ul>
    <!-- <footer-nav :tabIndex='2'></footer-nav> -->
  </div>
</template>

<script>
// import FooterNav from "~/components/footer-nav.vue";
import { getActivity, getCp } from "~/api/getData.js";
import dayjs from "dayjs";

export default {
  methods: {},
  components: {},
  data() {
    return {};
  },
  async asyncData({ query }) {
    let ayData = {};
    await getCp({
      uid: query.uid
    }).then(res => {
      if (res.data.code == 200) {
        ayData.myCP = res.data.data;
      } else {
        console.log(res.data.msg);
      }
    });
    return ayData;
  }
};
</script>
<style lang="stylus" scoped>
.arrow
    position absolute
    right 20px
    top 50%
    transform translateY(-50%)
ul
    padding 0 10px
    li
        border-radius: 7.5px
        box-shadow: 2.5px 2.5px 2.5px rgba(188, 188, 188, 0.34)
        overflow: hidden
        margin-top: 27px
        h2
            width: 100%
            height: 45px
            display: flex
            align-items: center
            justify-content: space-between
            padding: 0 14px
            background: #FF8199
            font-size: 14px
            color: #fff
        button
            width: 89px
            height: 30px
            border-radius: 15px
            border: 1px solid #ffffff
            background: transparent
        .detail
            padding: 20px 15px
            display: flex
            align-items: center
        .right
            display: flex
            flex-direction: column
            justify-content: space-around
            flex: 1
            font-size: 16px
            height: 66px
            position relative
            p
                text-indent: 4px
            .line
                width: 100%
                height: 1px
                background: #797979
        .img
            position: relative
            margin: 0 22px
        img
            width: 45px
            height: 45px
            border-radius: 50%
            overflow: hidden
            background: #f2f2f2
            transform: translate3d(-0.6 * 50%, -0.6 * 50%, 0)
        .objImg
            position: absolute
            top: 0
            left: 0
            transform: translate3d(0.6 * 50%, 0.6 * 50%, 0)
</style>


