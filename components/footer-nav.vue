<template>
    <div>
        <!-- 底部通栏 -->
        <van-tabbar v-model="idx" class="footer">
            <van-tabbar-item :to="{path:'/',query:{uid:uid}}"><img slot="icon" :src="tabIndex==0?'/love-y.png':'/love.png'"></van-tabbar-item>
            <van-tabbar-item :to="{path:'/activity',query:{uid:uid}}"><img slot="icon" :src="tabIndex==1?'/activity-y.png':'/activity.png'"></van-tabbar-item>
            <van-tabbar-item :to="{path:'/myMsg',query:{uid:uid}}" :dot="hasMsg"><img slot="icon" :src="tabIndex==2?'/ms-y.png':'/ms.png'"></van-tabbar-item>
            <van-tabbar-item :to="{path:'/myself',query:{uid:uid}}"><img slot="icon" :src="tabIndex==3?'/me-y.png':'/me.png'"></van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import storage from '~/api/storage.js'
import {getHaveNew} from '~/api/getData.js'
export default {
    props:['tabIndex','uid'],
    data(){
      return{
          hasMsg:false,
          idx:0
      }     
    },
    async mounted(){
      await getHaveNew({uid:this.uid}).then(res=>{
          if (res.data.code==200) {
              this.hasMsg = res.data.data?true:false;
          }
      });
        this.idx = this.tabIndex;
    }
}
</script>

<style lang="stylus" scoped>
.footer img{
    height .7rem !important
}
</style>

