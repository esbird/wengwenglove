<template>
  <div>
    <header>个人中心</header>
    <div class="container">
      <div class="brief-wrap">
        <img :src="myInfo.face" alt="">
        <p>{{myInfo.nikname}}</p>
        <nuxt-link tag="button" :to="{name:'myself-baseInfoEdit',query:{uid:uid}}">查看/修改我的卡片</nuxt-link>
      </div>
      <!-- <ul class="menu" v-for="(item,index) in menuList" :key="index">
                <nuxt-link tag="li" :to="{name:ite.linkName,parmas:{uid:uid}}" class="menu_item" v-for="(ite,idx) in item" :key="idx">
                    <img :src="ite.img_url" alt="">
                    <span>{{ite.menuItemName}}</span>
                    <i class="iconfont icon-arrow-right"></i>
                </nuxt-link>
            </ul> -->
      <ul class="menu">
        <nuxt-link tag="li" :to="{name:'myself-account',query:{uid:uid}}" class="menu_item"><img src="~static/account.png" alt=""><span>我的账户</span><i class="iconfont icon-arrow-right"></i></nuxt-link>
        <nuxt-link tag="li" :to="{name:'wodeweixin',query:{uid:uid}}" class="menu_item"><img src="~static/wechat.png" alt=""><span>我的微信</span><i class="iconfont icon-arrow-right"></i></nuxt-link>
      </ul>
      <ul class="menu">
        <nuxt-link tag="li" :to="{name:'myself-woxihuande',query:{uid:uid}}" class="menu_item"><img src="~static/iLike.png" alt=""><span>我喜欢的</span><i class="iconfont icon-arrow-right"></i></nuxt-link>
        <nuxt-link tag="li" :to="{name:'myself-wodejiesuo',query:{uid:uid}}" class="menu_item"><img src="~static/myUnlocked.png" alt=""><span>我解锁的</span><i class="iconfont icon-arrow-right"></i></nuxt-link>
        <nuxt-link tag="li" :to="{name:'yijianfankui',query:{uid:uid}}" class="menu_item"><img src="~static/myAdv.png" alt=""><span>意见反馈</span><i class="iconfont icon-arrow-right"></i></nuxt-link>
      </ul>
      <ul class="menu">
        <nuxt-link tag="li" :to="{path:'/myself/notif',query:{uid:uid}}" class="menu_item"><img src="~static/notif.png" alt=""><span>通知</span><i class="iconfont icon-arrow-right"></i></nuxt-link>
      </ul>

    </div>
    <footer-nav :tabIndex="3" :uid="uid"></footer-nav>
  </div>
</template>
<script>
import FooterNav from "~/components/footer-nav.vue";
import { getMyInfo } from "~/api/getData.js";
export default {
  data() {
    return {
      menuList: [
        [
          {
            img_url: "~static/account.png",
            linkName: "",
            menuItemName: "我的账户"
          },
          {
            img_url: "~static/wechat.png",
            linkName: "",
            menuItemName: "我的微信"
          }
        ],
        [
          {
            img_url: "~static/iLike.png",
            linkName: "",
            menuItemName: "我喜欢的"
          },
          {
            img_url: "~static/myUnlocked.png",
            linkName: "",
            menuItemName: "我解锁的"
          },
          {
            img_url: "~static/myAdv.png",
            linkName: "",
            menuItemName: "意见反馈"
          }
        ],
        [
          {
            img_url: "~static/notif.png",
            linkName: "",
            menuItemName: "通知"
          }
        ]
      ],
      myInfo: "",
      uid: ""
    };
  },
  components: {
    "footer-nav": FooterNav
  },
  async asyncData({query}){
    let { data } = await getMyInfo({ uid: query.uid });
    // return {MyInfo:data.data,uid:query.uid}
    // console.log(data);
    // (this.uid = query.uid), (this.myInfo = data.data.userinfo);
    return{
      uid:query.uid,
      myInfo:data.data.userinfo
    }
  }
};
</script>
<style lang="stylus" src="~/assets/styl/myself.styl" scoped>
          

         

                             

                               

                                    

                                                        

                                                  

                                                                                                                

                  

                                                                                

                                                                                                                                      

                                                   

                                                     

                                                             

                            

                     

                             

                                                                                                                                                                                                                

                                                                                                                                                                                                           

                 

                             

                                                                                                                                                                                                                 

                                                                                                                                                                                                                      

                                                                                                                                                                                                            

                 

                             

                                                                                                                                                                                              

                 



              

                                               

          

           

        

                                                   

                                          

                

           

               

                      

                 

                     

                                                      

                                    

                                            

                      

                     

                                                     

                                    

                                            

                      

                  

                 

                     

                                                    

                                    

                                            

                      

                     

                                                         

                                    

                                            

                      

                     

                                                    

                                    

                                            

                      

                  

                 

                     

                                                    

                                    

                                          

                      

                 

              

                      

                  

         

      

               

                            

    

                  

      

                                                               

                                                

                       

                                                               

   

 

         

                                                            

// @import ''





</style>


