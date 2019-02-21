<template>
  <div>
    <header>我的消息</header>
    <div class="container">
      <div class="content">
        <template v-for="(item,index) in msgList">
          <div :key="index">
            <div class="section1">
              <div class="port1">
                <img :src="item.face" alt="" class="head-pic">
                <div>
                  <h2>{{item.nickname}}</h2>
                  <p style="color:#A1A1A1" v-if="!item.type">{{item.region}}</p>
                </div>
              </div>
              <div class="port2">
                <p v-if="!item.type"><img src="~static/iLike.png" alt=""><span>{{item.loveNum}}</span></p>
                <p  @click="showMsg(index)"><span>{{item.type?'系统消息':'查看告白信息'}}</span><i class="iconfont icon-arrow-left" :class="{'tran-rotatex-180':item.show}"></i></p>
              </div>
            </div>
            <div class="msg-content" v-show="item.show">
              <!-- <nuxt-link v-if="item.type" tag='a' style="text-decoration:underline" :to='{path:"/objInfo",query:{uid:uid,Oid:item.tag}}'>{{item.content}}</nuxt-link> -->
              <p v-html="item.content"></p>
              <p class="time">{{item.create_time}}</p>
            </div>

          </div>
        </template>
      </div>

    </div>
    <footer-nav :tabIndex='2' :uid="uid"></footer-nav>
  </div>
</template>
<script>
import FooterNav from "~/components/footer-nav.vue";
import { getShowMsg } from "~/api/getData.js";
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
    let { data } = await getShowMsg({ uid: query.uid });
    // console.log(data)
    let msgList = data.data.map(item => {
      item.show = false;
      return item;
    });
    return{
      msgList,
      uid:query.uid
    }
    // this.msgList=msgList,this.uid = this.$route.query.uid;
  }
};
</script>
<style lang="stylus" src="~/assets/styl/myMsg.styl" scoped>
</style>

