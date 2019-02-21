<template>
    <div>
        <div class="content">
            <h2>你希望TA的年龄区间是？</h2>
            <p class="p1">比我大{{elderCount/10}}岁内</p>
                <van-slider v-model="elderCount" class="slider" :min="0" :max='100' :step="10" bar-height="4px" />
            <p class="p2">
                比我小{{youngerCount/10}}岁内
            </p>
            <van-slider v-model="youngerCount" :min="0" class="slider" :max='100' :step="10" bar-height="4px" />
            <button class='goNext' @click="goNext"><span>下一步</span><van-icon name="arrow" /></button>
        </div>    
    
    </div>    
</template>
<script>
import {updateActAge} from '~/api/getData.js'
export default {
    data(){
        return{
            elderCount:0,
            youngerCount:0,
            uid:''
        }
    },
    methods:{
        async goNext(){
          await updateActAge({
            uid:this.uid,
            age_mix:this.youngerCount/10,
            age_max:this.elderCount/10
          }).then(res=>{
            if(res.data.code==200){
              
              this.$router.push({path:'/activity/actPay',query:{uid:this.uid}})
              
            }
            return res;
          })
        },
        // sliderChange(value){
        //     console.log(value)
        //     this.elderCount = value;
        // },
        // sliderChang1(value){
        //     console.log(value)
        //     // this.youngerCount 
        // },
    },
    async asyncData({query}) {
        return{
            uid:query.uid
        }
    //   this.uid =this.$route.query.uid;
    }
}
</script>

<style lang="stylus" scoped>
.slider
    width 230px
    margin-top 14px
    margin-left 20px
.van-slider__bar
    background-color #BC8176
.content
    overflow hidden
    height 100vh
    width 100%
    background #EEB9B3
    color #fff
    padding-left 33px
    h2
        font-size 28px
        font-weight bold
        margin-top 117px
    .p1
        font-size 20px
        margin-top 7px
    .p2
        margin-top  84px
        font-size 18px

.goNext
    width 119px
    height 43px
    background #FFFFFF
    color #EEB9B3
    font-size 16px
    border none 
    position fixed
    right 0
    bottom 65px
    // display flex
    // align-items center
    .van-icon-arrow
        transform translate3d(1px,2px,0)
</style>

