<template>
  <div>
    <!-- <header>首页</header> -->
    <div class="content">
      <van-swipe>
        <van-swipe-item v-for="(item,index) in photoArr" :key="index">
          <div class="img-wrap" :style="{'background-image':'url('+baseImgPath+item.imgURL+')'}">
            <!-- <img class="pic" :src="baseImgPath+item.imgURL" /> -->
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="text-wrap">
        <div class="baseInfo ">
          <p class="clearfix"><span class="nickname">{{myInfo.nikname}}</span><span class="sex iconfont icon-nv"></span><span class="addr"><i class="iconfont icon-zuobiao"></i>{{myInfo.region}}</span></p>
          <p class="clearfix brief" style="color:#6B6B6B;line-height:2;margin-top:.2rem"><span class="age">{{myInfo.age}}岁</span><span class="tall">{{myInfo.tall}}cm</span><span class="industry">{{myInfo.profession}}</span></p>
        </div>
        <div class="line"></div>
        <div class="tag-wrap">
          <h2 class="title">基本信息</h2>
          <ul class="baseInfo-tag">
          <li class="tag-item">身高：{{myInfo.tall}}cm</li>
          <li class="tag-item">{{myInfo.education}}</li>
          <li class="tag-item">收入：{{myInfo.income}}</li>
          <li class="tag-item">房车：{{myInfo.houCarState}}</li>
          <li class="tag-item">{{myInfo.profession}}</li>
          <li class="tag-item">{{myInfo.smokeD}}</li>
          <li class="tag-item">{{myInfo.marrytime}}</li>
        </ul>
        </div>
        <div class="line"></div>
        <div class="neixindubai">
          <h2 class="title">内心独白</h2>
          <p>{{myInfo.motto}}</p>
        </div>
      </div>
    </div>

    <!-- 已解锁 -->
    <van-button size="large" v-show="unlock!=3" v-if='unlock==1' class="next" @click="CopyNum=true">查看联系方式</van-button>
    <!-- 未解锁 -->
    <div v-show="unlock!=3" class="button-wrap van-button  van-button--large" v-else>
      <van-button size="large" class="next2" @click="jiesuoShow=true">解锁联系方式</van-button>
      <van-button size="large" class="next2" @click="msgShow=true">发送告白信息</van-button>
    </div>

    <send-msg v-model="msgShow" @sendMsg="sendMsgFun"></send-msg>
    <jiesuo-view v-model="jiesuoShow" @payNow="payNowFun" @sendToFriend="sendToFriendFun"></jiesuo-view>
    <copy-num v-model="CopyNum" :weChatNum="myInfo.wx"></copy-num>

  </div>
</template>

<script>
import FooterNav from "~/components/footer-nav.vue";
import SendMsg from "~/components/sendMsg.vue";
import JieSuo from '~/components/jiesuo.vue'
import CopyNum from '~/components/copyNum.vue'

import { baseImgPath } from "~/config/env.js";
import { getMyInfo, getPhotsByUid,sendMsg ,addToUnlock} from "~/api/getData.js";

export default {
  data() {
    return {
      baseImgPath,
      msgShow: false,
      jiesuoShow:false,
      CopyNum:false,
      uid: this.$route.query.uid,
      Oid:this.$route.query.Oid,
      unlock: this.$route.query.unlock,
      myInfo: '',
      photoArr: ''
    };
  },
  methods: {
    sendToFriendFun(){
      this.$router.push({path:'/friendSupport',query:{uid:this.uid,mid:this.Oid}});
    },
    // 解锁
    async payNowFun(){
      if(!this.myInfo.wx){
        this.$dialog.alert({title:'提醒',message:"该用户还未填写联系方式，请解锁其他人吧"})
        return;
      }
      console.log("payNow");
      //狗粮币解锁
      let { data } = await addToUnlock({
        uid: this.uid,
        mid: this.myInfo.userid,
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
    },
    async sendMsgFun(text) {
      await sendMsg({uid:this.uid,nid:this.Oid,content:text})
      .then(async res=>{
        if (res.data.code==200) {
          await this.$toast.success('消息发送成功')
        }else{
          await this.$dialog.alert({
            message:res.data.msg
          });
        }
      })
      
    }
  },

  components: {
    "footer-nav": FooterNav,
    "send-msg": SendMsg,
    'jiesuo-view':JieSuo,
    'copy-num':CopyNum
  },
  async asyncData({query}) {
    let { data: myInfo } = await getMyInfo({ uid: query.Oid });
    let { data: photoArr } = await getPhotsByUid({ uid: query.Oid });
      return{
        uid: query.uid,
        Oid:query.Oid,
        unlock: query.unlock,
        myInfo: myInfo.data.userinfo,
        photoArr: photoArr.data

      }
  }
};
</script>

<style lang='stylus' src="~/assets/styl/personInfo.styl" scoped>
          

       

                                

                         

                 

                                                                      

                                

                                                              

                

                         

        

                  

                                

                                                          

                                                         

                                                            

                                                          

                 

                           

                             

                                                                                                                                                                                                                            

                                                                                                                                                                                                                                                            

            

                              

                            

                                   

                                 

                                      

                                      

                                      

                                      

                                      

                                      

             

            

                              

                               

                                   

                                        

            

          

          



                

                                                                              

                

                                                                  

                                                                

                                                                                      

          

                                                              

        

           



        

                                                    

                                              

                                           

                                                            



                

          

            

                    

                  

                   

      

    

           

                  

                            

              

                 

               

               

                

              

   

     

    



               

                            

                      

    

                              

                                                               

                                                             

            

                     

                                 

                          

                            

      

   

  

         



                                                                

// @import '~assets/styl/personInfo.styl';





</style>