<template>
    <div>
        <header>活动</header>
        <div class="section1" :style="{'background-image':'url('+bgList.img+')'}"></div>
        <div class="section2">
            <div class="activity">
                <h2 class="title">{{actList.title}}</h2>
                <p class="desc">{{actList.summary}}</p>
                <nuxt-link tag='button' :to="{path:'/activity/actEnter',query:{uid:uid,periods:actList.periods,startTime:actList.start_time,endTime:actList.end_time}}" class="enter">点击入场</nuxt-link>
                <div class="issue">{{actList.periods}}期</div>
            </div>
        </div>
        <footer-nav :tabIndex='1' :uid="uid"></footer-nav>
    </div>    
</template>
<script>
import FooterNav from "~/components/footer-nav.vue";
import { getActivity, getActionOn, getActBg } from "~/api/getData.js";
export default {
  components: {
    "footer-nav": FooterNav
  },
  data() {
    return {
      uid: "",
      actList: "",
      bgList: {}
    };
  },
  async asyncData({ query }) {
    
    let ayData ={
        uid:query.uid,
    };

    let { data } = await getActivity();
    ayData.actList = data.data
    let { data: actBg } = await getActBg();
    ayData.bgList = actBg.data[0]
    
    return ayData
  }
};
</script>
<style lang="stylus" scoped>
.section1 {
    width: 100%;
    height: 198px;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
    // background url('~static/huodong-bg.png') top center/cover no-repeat
}

.section2 {
    background: #f2f2f2;
    overflow: hidden;
    height: 'calc(100vh - %s)' % 274px;

    .activity {
        width: 355px;
        height: 135px;
        background: #fff;
        padding: 12px;
        border-radius: 7px;
        margin: 13px auto;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
            font-size: 16px;
            font-weight: bold;
        }

        .desc {
            font-size: 12px;
            color: #868686;
            line-height: 1.5;
        }

        .enter {
            width: 118px;
            height: 35px;
            background: #FFB1B2;
            color: #fff;
            font-size: 16px;
            border: none;
            border-radius: 12px;
        }

        .issue {
            width: 52px;
            height: 19px;
            border: 1px solid #FFB1B2;
            font-size: 12px;
            color: #FFB1B2;
            position: absolute;
            top: 13px;
            right: 13px;
            border-radius: 2.5px;
            text-align: center;
        }
    }
}
</style>

