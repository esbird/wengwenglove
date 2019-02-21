<template>
  <div>
    <header>填写报名信息</header>
    <div class="section1">
      <p>兴趣匹配选项(必填)</p>
      <p>在万人中精准的找到头尾相投的TA</p>
    </div>
    <!-- 我的标签 -->
    <div class="section2">
      <div class="mytag" v-for="(item,index) in tagList" :key="index">
        <h2>{{item.name}}</h2>
        <div class="line"></div>
        <ul class="tag-wrap">
          <li class="tag" :class="{active:ite.select==1}" v-for="(ite,idx) in item.sonArr" :key="idx" @click="selectTag(index,idx,item.is_radio)">{{ite.tag_name}}</li>
        </ul>
      </div>
      <!-- <div class="mytag">
                <h2>我的标签</h2>
                <div class="line"></div>
                <ul class="tag-wrap">
                    <li class="tag">浙江</li>
                    <li class="tag">浙江</li>
                    <li class="tag">浙江</li>
                    <li class="tag">浙江</li>
                    <li class="tag">浙江</li>
                    <li class="tag">浙江</li>
                    <li class="tag">浙江</li>
                </ul>
            </div> -->
    </div>
    <van-button size="large" class="next" @click="goNext">下一步（选择匹配偏好）</van-button>
    <!-- <footer-nav :tabIndex='2'></footer-nav> -->
  </div>
</template>
<script>
import FooterNav from "~/components/footer-nav.vue";
import { getActTag, getUserTag, updateUserTag } from "~/api/getData.js";
export default {
  components: {
    "footer-nav": FooterNav
  },
  methods: {
    async goNext() {
      let myTag ={};
      this.tagList.forEach(item1=>{
        myTag[item1.tag]=[]
        item1.sonArr.forEach(element => {
            if(element.select==1){
              myTag[item1.tag].push(element.id)
            }
        });
        myTag[item1.tag]=myTag[item1.tag].toString()
      })

      let { data: updateData } = await updateUserTag({
        uid: this.uid,
        ...myTag
      }).then(res=>{
        if(res.data.code==200){
          console.log('标签上传成功')
          this.$router.push({ path: "/activity/actStep1",query:{uid:this.uid} });
        }else{
          this.$dialog.alert({
            message:res.data.msg
          });
        }
      });
      // console.log('myTag',myTag);
    },
    selectTag(index, idx,is_radio) {
      let ifSelect = this.tagList[index].sonArr[idx].select;
        if(is_radio){
          // 单选
          this.tagList[index].sonArr.map((item,index1)=>{
            this.$set(
            this.tagList[index].sonArr[index1],
              "select",
              0
            );
            return item;
          })
        }else{

        }
      this.$set(
        this.tagList[index].sonArr[idx],
        "select",
        Math.abs(ifSelect - 1)
      );
      //   .select = 1;
    }
  },
  data(){
    return{
      tagList:'',
      uid:'',
      userTag:''
    }
  },
  async asyncData({query}) {
    let { data } = await getActTag();
    let uid = query.uid;
    // 获取用户选中活动标签
    let { data: userTag } = await getUserTag({ uid: uid });
    let tagKeyList = [];
    if (userTag.data != "") {
      for (const key in userTag.data) {
        tagKeyList = [...tagKeyList, ...userTag.data[key]];
      }
    }
    // console.log("tagKeyList", tagKeyList);
    let tagList = data.data.map(item => {
      item.sonArr = item.sonArr.map(ite => {
        if(tagKeyList.length!=0){
          for (let index = 0; index < tagKeyList.length; index++) {
            const element = tagKeyList[index];
            if (element == ite.id) {
              ite.select = 1;
              break;
            } else {
              ite.select = 0;
            }
          }
        }else{
          ite.select = 0
        }
        return ite;
      });
      return item;
    });
    return{
      uid,
      tagList,
      userTag:userTag.data
    }
    // this.tagList=tagList,
    // this.uid=uid,
    // this.userTag=userTag.data;
  }
};
</script>
<style lang="stylus" scoped>
.next {
  background: #EFC2BC;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}

.section1 {
  width: 100%;
  height: 42px;
  background: #F2F2F2;
  font-size: 12px;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    line-height: 1.5;
  }

  p:last-child {
    color: #F3B1AD;
    font-size: 10px;
  }
}

.section2 {
  padding-bottom: 48px;

  .mytag {
    padding: 0 13px;
    color: #F3B1AD;

    h2 {
      font-size: 16px;
      font-weight: bold;
      line-height: 2;
    }

    .line {
      width: 100%;
      height: 1.5px;
      background: #f2f2f2;
      margin: 6px 0;
    }

    .tag-wrap {
      // border-top 1.5px solid #F2F2F2
      display: flex;
      flex-wrap: wrap;
      color: #F3B1AD;

      li {
        // width: 70px;
        box-sizing content-box
        padding 0 10px
        height: 25px;
        border-radius: 6px;
        border: 2px solid #F3B1AD;
        background: #fff;
        margin: 6px 4px;
        font-size: 13px;
        text-align: center;
        line-height: 25px;

        &.active {
          background: #F3B1AD;
          color: #ffffff;
        }
      }
    }

    &~ .mytag {
      border-top: 8px solid #F2F2F2;
    }
  }
}
</style>

