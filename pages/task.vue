<template>
  <div id="task">
    <ul>
      <li  v-for="(item,index) in taskList" :key="index">
        <div class="header">
          <p>任务{{item.tag}}：[{{item.title}}]</p>
          <p>{{item.content}}</p>
          <p class="tip">聊天记录上传/截图上传/图片上传</p>
        </div>
        <div class="content">
          <div class="port-left">
            <img :src="item.myFace" alt="">
            <div class="text">
              <p>{{item.myState==1?'已完成':'未完成'}}</p>
              <button class="goCheck" v-if="item.myState==1" @click="prevImg(item.id)">查看</button>
              <van-uploader :after-read="onRead" :uploadIndex="item.id" v-else>
                <span class="uploadText">上传<van-icon name="upgrade"/></span>
              </van-uploader>
              <!-- <button class="upload"></button> -->
            </div>
            <i class="half-love iconfont icon-xinxingleft1" :class="{finished:item.myState==1}"></i>
          </div>
          <div class="port-right">
            <img :src="item.cpFace" alt="">
            <div class="text">
              <p>{{item.cpState==1?'已完成':'未完成'}}</p>
              <!-- <p class="goCheck">查看</p> -->
            </div> 
            <i class="half-love iconfont icon-xinxingleft" :class="{finished:item.cpState==1}"></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {getTask,completeTask,getActImg} from '~/api/getData.js'
import { ImagePreview } from 'vant';
export default {
  data(){
    return{
      taskList:''
    }
  },
  methods:{
    async prevImg(tid){
      await getActImg({uid:this.$route.query.uid,tid}).then(res=>{
        if (res.data.code==200) {
          ImagePreview([
            res.data.data[0].img
          ]);
        }
        return res
      })
    },
    async onRead({file},tid){
      console.log('file',file)
      let toast = this.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中'
      });
      // console.log(file)
      let fd = new FormData();
      fd.append('uid',this.$route.query.uid);
      fd.append('tid',tid);
      fd.append('file',file);
      await completeTask(fd).then(async res=>{
        if (res.data.code==200) {
          this.$dialog.alert({titie:'提醒',message:'图片提交成功！'});
          let {data:taskList}=await getTask({uid:this.$route.query.uid});
          this.taskList = taskList.data;
        }else{
          this.$dialog.alert({title:'提醒',message:res.data.msg});
        }
      })
      toast.clear();
    }
  },
  async asyncData({query}){
    let ayData={};
    await getTask({uid:query.uid}).then(res=>{
      if (res.data.code==200) {
        ayData.taskList=res.data.data
      }else{
        console.log(res.data.msg)
      }
      return res;
    });
    return ayData
    // this.taskList = taskList.data;
  }
}
</script>

<style lang="stylus" scoped>
.uploadText
  display flex
  align-items center
  color #C9C9C9
  width 50px
  justify-content space-around
#task {
  height: 100vh;
  width: 100%;
  background: #EAC2B9;
  overflow: auto;

  ul {
    margin: 17px auto 0;

    li {
      margin: 0 auto 42px;
      width: 325px;
      // height: 185px;
      border-radius: 10px;
      overflow: hidden;

      .header {
        // height: 80px;
        width: 100%;
        background: #fff;
        font-size: 12px;
        padding: 14px 19px 10px;

        p {
          font-weight: bold;
        }

        .tip {
          color: #AEAEAE;
          line-height: 2;
          font-weight normal
        }
      }

      .content {
        margin-top: 2.5px;
        display: flex;
        justify-content: space-between;

        &>div {
          width: 161px;
          height: 102px;
          background: #fff;
          display: flex;
          align-items: center;
          // justify-content center
          position: relative;
          padding-left: 18px;
          overflow: hidden;

          &:nth-child(2) {
            padding-left: 35px;
          }

          img {
            width: 43px;
            height: 43px;
            border: 1.5px solid #868686;
            border-radius: 50%;
            background: #fff;
          }

          .text {
            font-size: 14px;
            color: #FFABAC;
            margin-left: 13px;
            display: flex;
            flex-direction: column;
            align-items: center;

            p {
              line-height: 1.5;
            }

            .goCheck {
              font-size: 12px;
              color: #C9C9C9;
              position: relative;
              border none 
              background transparent
            }
          }

          .iconfont {
            font-size: 35px;
            position: absolute;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            color: #DBDBDB;

            &.finished {
              // font-size 35px
              color: #FFABAC;
            }
          }

          &.port-left {
            .goCheck:before {
              content: '';
              border-width: 5px 0 5px 10px;
              border-style: solid;
              border-color: #fff #fff #fff #BCBCBC;
              position: absolute;
              right: -5px;
              top: 50%;
              transform: translate3d(100%, -50%, 0);
            }

            .half-love {
              right: 0;
            }
          }

          &.port-right {
            .goCheck:before {
              content: '';
              border-width: 5px 10px 5px 0;
              border-style: solid;
              border-color: transparent #BCBCBC transparent transparent;
              position: absolute;
              left: -3px;
              top: 50%;
              transform: translate3d(-100%, -50%, 0);
            }

            .half-love.iconfont {
              left: 0;
            }
          }
        }
      }
    }
  }
}
</style>

