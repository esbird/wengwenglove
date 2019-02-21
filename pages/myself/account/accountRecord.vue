<template>
  <div>
    <header>我的消费记录</header>
    <div class="content">
      <ul>
        <li v-for="(item,index) in userRecord" :key="index">
          <p><span>{{item.typeName}}</span><span>{{item.create_time}}</span></p>
          <p><span v-show="item.type != 5">￥{{item.money}}</span><span v-show="item.type == 1 || item.type == 2 || item.type==5">脱单币&nbsp;{{item.type==1?`+${item.money}`:`-${item.money}`}}</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getUserRecord } from "~/api/getData.js";
export default {
  data(){
    return{
      userRecord:''
    }
  },
  async asyncData({query}) {
    let { data } = await getUserRecord({ uid: query.uid });
    // console.log(res)
    let userRecord = data.data.map(item => {
      switch (item.type) {
        case 1:
          item.typeName = "充值";
          break;
        case 2:
          item.typeName = "脱单币 解锁";
          break;
        case 3:
          item.typeName = "补缴支付 解锁";
          break;
        case 4:
          item.typeName = "参加活动消费";
          break;
        case 5:
          item.typeName = "充值赠送";
          break;
      }
      return item;
    });
    console.log(userRecord);
    return{
      userRecord
    }
    
    // this.userRecord= data.data
  }
};
</script>

<style lang="stylus" scoped>
.content {
  height: 'calc(100vh - %s)' % 50px;
  background: #f2f2f2;
  overflow: auto;

  ul {
    width: 100%;

    // height
    li {
      padding: 8px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #fff;
      width: 100%;
      height: 60px;
      margin-top: 8px;

      p:first-child {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
      }

      p:last-child {
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        color: #BC8176;
        font-weight: bold;
      }
    }
  }
}
</style>

