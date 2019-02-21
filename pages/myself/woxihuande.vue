<template>
  <div>
    <header>我喜欢的</header>
    <div class="tabBar">
      <!-- <div>我解锁的</div> -->
      <nuxt-link tag="div" :to="{path:'/myself/wodejiesuo',query:{uid:uid}}" replace>我解锁的</nuxt-link>

      <div class="active">我喜欢的</div>
    </div>
    <div class="content">
      <van-swipe-cell :right-width="65" :on-close="onClose" :selectIndex="item.yuserid" v-for="(item,index) in List.myLove" :key="index">
        <div class="section1" @click="selectItem(item.id,item.is_unlock)">
          <div class="port1">
            <img :src="item.face" alt="" class="head-pic">
            <div>
              <h2>{{item.nikname}}</h2>
              <p style="color:#A1A1A1">{{item.region}}</p>
            </div>
          </div>
          <div class="port2">
            <p><img src="~static/iLike.png" alt=""><span>{{item.loveNum}}</span></p>
          </div>
        </div>
        <div class="dislike" style="width:65px" slot="right">
          <span style="">取消<br> 喜欢</span>
        </div>
      </van-swipe-cell>
      <p class="tip">左划取消喜欢</p>
    </div>
  </div>
</template>
<script>
import FooterNav from "~/components/footer-nav.vue";
import { getUnlockList,outLove } from "~/api/getData.js";
export default {
  data() {
    return {
      uid: "",
      List: ""
    };
  },
  components: {
    "footer-nav": FooterNav
  },
  methods: {
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          // console.log(instance.selectIndex)
          this.$dialog.confirm({
            message: "确定取消喜欢吗？"
          }).then( async () => {
            console.log('instance',instance.$attrs.selectIndex)
            await outLove({uid:this.$route.query.uid,yid:instance.$attrs.selectIndex})
            .then(res=>{
              if (res.data.code==200) {
                this.$dialog.alert({
                  title:'提醒',
                  message:'取消喜欢成功'
                }).then(async ()=>{
                  let { data: List } = await getUnlockList({ uid: this.$route.query.uid });
                  // return { List: List.data,uid:query.uid };
                  (this.List = List.data), (this.uid = this.$route.query.uid);
                })
              }else{
                this.$dialog.alert({
                  title:'提醒',
                  message:res.data.msg
                }).then(()=>{
                  // this.created();
                })
              }
            })
            instance.close();
          });
          break;
      }
    },
    selectItem(Oid, unlock) {
      this.$router.push({
        path: "/personInfo",
        query: { uid: this.uid, Oid, unlock }
      });
    }
  },
  async asyncData({query}) {
    let { data: List } = await getUnlockList({ uid: query.uid });
    // return { List: List.data,uid:query.uid };
    // (this.List = List.data), (this.uid = this.$route.query.uid);
    return{
      List:List.data,
      uid:query.uid
    }
  }
};
</script>
<style lang='stylus' scoped>
.tip
  position fixed
  left 50%
  bottom 4px
  transform translate3d(-50%,0,0)
  font-size 14px
  color #dcdcdc
.dislike
  background red
  color #fff
  height 100%
  width 100%
  display flex
  justify-content center
  align-items center
  font-size 16px
.tabBar {
  width: 100%;
  height: 39px;
  display: flex;

  div {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #BC8176;
    line-height: 39px;

    &.active {
      position: relative;

      &:before {
        content: '';
        width: 100%;
        height: 2.5px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #BC8176;
      }
    }
  }
}

.content {
  width: 100%;
  padding: (10px / 2) (10px / 2) 0;
  min-height 'calc(100vh - %s)' % 100px

}

.section1 {
  width: 100%;
  height: (160px / 2);
  border-radius: (15px / 2);
  background: #fff;
  font-size: (32px / 2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 (22px / 2);
  border-bottom: 1.2px solid #F2F2F2;

  .head-pic {
    width: (95px / 2);
    height: (95px / 2);
    border: (5px / 2) solid #FEE9E8;
    border-radius: 50%;
  }

  .port1 {
    display: flex;

    &>div {
      margin-left: (26px / 2);
      height: (96px / 2);
      display: flex;
      font-size: (32px / 2);
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .port2 {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: (32px / 2);
    height: (96px / 2);
    justify-content: center;

    img {
      width: (36px / 2);
      height: (36px / 2);
      margin: 0 (12px / 2);
    }

    p {
      display: flex;
      align-items: center;
    }

    p:nth-child(2) {
      color: #A1A1A1;
      font-size: (24px / 2);

      .iconfont {
        font-size: (30px / 2);
        margin-left: (12px / 2);
      }
    }
  }
}
</style>