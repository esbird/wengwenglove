<template>
  <div>
    <header>首页</header>
    <div class="content">
      <van-swipe>
        <template v-for="(item,index) in photoList">
          <van-swipe-item :key="index">
            <div class="img-wrap" :style="{'background-image':'url(http://www.wengwenglove.com/'+item.imgURL+')'}">
              <!-- <img class="pic" :src="'http://www.wengwenglove.com/'+item.imgURL" /> -->
            </div>
          </van-swipe-item>
        </template>
      </van-swipe>
      <ul class="btn-wrap">
        <li @click="goNextOne"><img src="../static/next.png" alt=""></li>
        <li @click="showSend=true"><img src="../static/msg.png" alt=""></li>
        <li @click="showJieSuo=true"><img src="../static/unlock.png" alt=""></li>
        <li @click="addLoveFun"><img src="../static/like.png" alt=""></li>
      </ul>
      <img src="~/static/diandian.png" alt="" class="menu" @click="menuShow = true">
    </div>
    <div class="text-wrap">
      <div class="baseInfo ">
        <p class="clearfix"><span class="nickname">{{objInfo.nikname}}</span><span class="sex iconfont icon-nv" :class="objInfo.sex==1?'icon-nv':'icon-nan'" :style="{color:objInfo.sex==1?'#E8C4BB':'#1D9ED7'}"></span><span class="addr"><i class="iconfont icon-zuobiao"></i>{{objInfo.workRegion}}</span></p>
        <p class="clearfix brief" style="color:#6B6B6B;line-height:2;margin-top:.2rem"><span class="age">{{objInfo.age}}岁</span><span class="tall">{{objInfo.tall}}cm</span><span class="industry">{{objInfo.profession}}</span></p>
      </div>
      <div class="line"></div>
      <div class="tag-wrap">
        <h2 class="title">基本信息</h2>
        <ul class="baseInfo-tag">
          <li class="tag-item">身高：{{objInfo.tall}}cm</li>
          <li class="tag-item">{{objInfo.education}}</li>
          <li class="tag-item">收入：{{objInfo.income}}</li>
          <li class="tag-item">房车：{{objInfo.houCarState}}</li>
          <li class="tag-item">{{objInfo.profession}}</li>
          <li class="tag-item">{{objInfo.smokeD}}</li>
          <li class="tag-item">{{objInfo.marrytime}}</li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="neixindubai">
        <h2 class="title">内心独白</h2>
        <p>{{objInfo.motto}}</p>
      </div>
    </div>
    <!-- <van-icon name="like" /> -->
    <jiesuo-view v-model="showJieSuo" @sendToFriend="sendToFriend" @payNow="payNow"></jiesuo-view>
    <sendmsg-view v-model="showSend" @sendMsg="sendMsg"></sendmsg-view>
    <van-popup v-model="menuShow" position="bottom" class="pop">
      <div class="process_wrap">
        <!-- <button class="van-button--default van-button--large">举报</button> -->
        <van-button size="large">举报</van-button>
        <van-button size="large">拉黑</van-button>
      </div>
      <van-button size="large" class="cancel" @click="menuShow=false">取消</van-button>
    </van-popup>
    <footer-nav :tabIndex="0" :uid="uid"></footer-nav>
  </div>
</template>

<script>
import FooterNav from "~/components/footer-nav.vue";
import JieSuo from "~/components/jiesuo.vue";
import SendMsg from "~/components/sendMsg.vue";
import {
  getAdvPerson,
  getPhotsByUid,
  addLove,
  addLookRecord,
  addToUnlock,
  sendMsg,

} from "~/api/getData.js";
import storage from "~/api/storage.js";
import wxPay from "~/api/wxpay.js";
import axios from "axios";

export default {
  methods: {
    async goNextOne() {
      const toast = this.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中'
      });
      await addLookRecord({ uid: this.uid, lid: this.objInfo.userid });
      let { data } = await getAdvPerson({ uid: this.uid });
      // 获取推荐人的照片

      let { data: photoList } = await getPhotsByUid({ uid: data.data.userid });
      this.objInfo = data.data;
      this.photoList = photoList.data;
      toast.clear();
    },
    async sendToFriend() {
      if(!this.objInfo.wx){
        this.$dialog.alert({title:'提醒',message:"该用户还未填写联系方式，请解锁其他人吧"});
        return;
      }
      // console.log("sendToFriend");
      await addToUnlock({uid:this.uid,mid:this.objInfo.userid,type:1})
      .then(res=>{
        if(res.data.code==200){
          // console.log()
        }
      })
      this.$router.push({path:'/friendSupport/',query:{uid:this.uid,mid:this.objInfo.userid}})
    },
    async payNow() {

      if(!this.objInfo.wx){
        this.$dialog.alert({title:'提醒',message:"该用户还未填写联系方式，请解锁其他人吧"})
        return;
      }
      console.log("payNow");
      //狗粮币解锁
      let { data } = await addToUnlock({
        uid: this.uid,
        mid: this.objInfo.userid,
        type: 2
      }).then(res=>{
        if(res.data.code==200){
            this.$toast.success("解锁成功！");
        }else{
          this.$dialog.alert({
            message:res.data.msg
          });
        }
        return res;
      });
      // console.log('payData',data)
      // if()
      // await wxPay(
      //   data,
      //   () => {
      //     // 成功回调
      //   },
      //   res => {
      //     // 失败回调
      //     console.log(res);
      //     this.$toast.fail("解锁失败！");
      //   }
      // );
    },
    async sendMsg(msg) {
      console.log(msg);
      await sendMsg({
        uid: this.uid,
        nid: this.objInfo.userid,
        content: msg
      }).then(res => {
        if (res.data.code == 200) {
          this.$toast.success("信息发送成功");
        } else if (res.data.code == 8002) {
          this.$toast.fail(res.data.msg);
        } else if (res.data.code == 8001) {
          this.$toast.fail(res.data.msg);
        }
        return res;
      });
    },
    async addLoveFun() {
      await addLove({
        uid: this.uid,
        yid: this.objInfo.userid
      })
        .then(res => {
          // console.log(res)
          if (res.data.code == 200) {
            this.$toast({
              message: "心动成功",
              loadingType: "like"
            });
          } else {
            this.$toast(res.data.msg);
          }
        })
        .catch(res => {});
      await addLookRecord({ uid: this.uid, lid: this.objInfo.userid });
      let { data } = await getAdvPerson({ uid: this.uid });
      this.objInfo = data.data;
      // 获取推荐人的照片

      let { data: photoList } = await getPhotsByUid({ uid: data.data.userid });
      this.photoList = photoList.data;
    }
  },
  data() {
    return {
      showJieSuo: false,
      showSend: false,
      menuShow: false,
      uid:'',
      objInfo:'',
      photoList:''
    };
  },
  components: {
    "footer-nav": FooterNav,
    "jiesuo-view": JieSuo,
    "sendmsg-view": SendMsg
  },
  async mounted() {
    await storage.set("uid", this.$route.query.uid);
    // let uid = await storage.get("uid");
  },
  async asyncData({query}) {
    let ayData={
      uid:query.uid
    };
    let { data } = await getAdvPerson({
      uid: query.uid
    })
      .then(res=>{
        // console.log(res)
        if(res.data.code==200){
          ayData.objInfo = res.data.data
        }else{
          console.log(res.data.msg)
        }
        return res;
      })
    // 获取推荐人的照片

    await getPhotsByUid({ uid: ayData.objInfo.userid })
      .then(res=>{
        // console.log(res)
        if(res.data.code==200){
          ayData.photoList=res.data.data;
        }else{
          console.log(res.data.msg)
        }
        return res;
      })
    // console.log(photoList)
    // Object.assign(this,{
      //   });
    return ayData
    // toast.clear();
  }
};
</script>
<style lang='stylus' src="~/assets/styl/index.styl" scoped>
</style>