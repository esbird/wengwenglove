<template>
  <div>
    <header>个人资料修改</header>
    <!-- <img :src="base64code" alt=""> -->
    <div class="content">
      <div class="section1">
        <img :src="userinfo.face" alt="">
        <div class="percentage_wrap">
          <p>资料完成度{{myInfo.percent}}</p>
          <div class="percentage">
            <p :style="{width:myInfo.percent}"></p>
          </div>
        </div>
      </div>
      <nuxt-link tag='div' :to="{path:'/myself/identifyCheck',query:{uid:uid}}" class="section2">
        <span>身份认证</span>
        <span>{{ifIsV}}</span>
        <i class="iconfont icon-arrow-right"></i>
      </nuxt-link>
      <div class="section3">
        <ul>
          <li style="" v-for="(item,index) in picArr" :key="index" :style="{'background-image':'url('+baseImgPath+item.imgURL+')'}">
            <!-- <img :src="" alt=""> -->
            <van-icon name="close" class="close" style="" @click="rmvPic(item.id,index)" />
          </li>
          <!-- <li ><input type="file" name="" id=""></li> -->
          <li class="add">
            <van-uploader :after-read="uploadFile">
              <!-- <van-icon name="photograph" /> -->
            </van-uploader>
          </li>
        </ul>

      </div>
      <h2 class="title">基本资料</h2>
      <ul class="section4">
        <li class="nickname">
          <p>昵称</p>
          <input type="text" v-model="userinfo.nickname" placeholder="昵称">
        </li>
        <li><span>性别</span><span class="value" @click="show=true">{{userinfo.sex}}</span></li>

        <select-box :itemArr="itemArr" v-model="show" :selectedItem="userinfo.sex" @bindselect="bindSelectSex"></select-box>

        <li><span>所在城市</span><span class="value" @click="showFromCity=true">{{userinfo.workRegion}}</span></li>
        <area-select @bindSelectArea="bindSelectAreaFun" v-model="showFromCity" :bindCounty="bindCountyCode"></area-select>
        <li><span>籍贯</span><span class="value" @click="showRegionCity=true">{{userinfo.region}}</span></li>
        <area-select @bindSelectArea="bindSelectRegionFun" v-model="showRegionCity" :bindCounty="bindRegionCode"></area-select>
        <li><span>出生日期</span><span class="value" @click="dateShow=true">{{userinfo.birthday}}</span></li>
        <time-select v-model='dateShow' :startYear="1990" @bindselecttime="selectBirth"></time-select>

        <li><span>职业</span><span class="value" @click="jobShow1=true">{{userinfo.profession}}</span></li>
        <job-select v-model="jobShow1" :itemJson="Profession" @bindselect="selectJob1" :selectedItem="selectedProfession"></job-select>
        <job-select v-model="jobShow2" :itemJson="ProfessionSon" @bindselect="selectJob2" :selectedItem="selectedProfessionSon"></job-select>
        
        <!-- <time-select v-model='dateShow' :startYear="1990" @bindselecttime="selectBirth"></time-select> -->


        <li v-for="(item,index) in optionsList" :key="index">
          <span>{{item.name}}</span>
          <span class="value" @click="item.show = true">{{item.selectValue}}</span>
          <select-box v-if="item.type==0" v-model="item.show" :selectedItem="item.selectValue" @bindselect="bindselect" :selectIndex="index" :itemArr="item.val"></select-box>
          <grid-select v-else v-model="item.show" :selectedItem="item.selectValue" @bindselect="bindselect" :selectIndex="index" :itemArr="item.val"></grid-select>
        </li>

      </ul>
      <h2 class="title">内心独白</h2>
      <div class="section5">
        <textarea name="" id="" cols="30" rows="10" v-model="userinfo.motto"></textarea>
      </div>
      <h2 class="title">对另一半有什么样的小期待</h2>
      <div class="section6">
        <textarea name="" id="" cols="30" rows="10" v-model="userinfo.expect"></textarea>
      </div>
      <h2 class="title">
        择偶条件
      </h2>
      <ul class="section7">
        <li><span>年龄</span><span class="value" @click="rangeAgeShow=true">{{ages[0]}}-{{ages[1]}}</span></li>
        <range-select v-model="rangeAgeShow" :lowerLimit="18" :upperLimit="50" :fromNum="ages[0]" :toNum="ages[1]" @bindselectrange="selectAgeRange"></range-select>
        <li><span>身高</span><span class="value" @click="rangeTallShow=true">{{talls[0]}}cm-{{talls[1]}}cm</span></li>
        <range-select v-model="rangeTallShow" :lowerLimit="tallRange[0]" :fromNum="talls[0]" :toNum="talls[1]" :upperLimit="tallRange[1]" @bindselectrange="selectTallRange"></range-select>

        <li v-for="(item,index) in matelist" :key="index">
          <span>{{item.name}}</span>
          <span class="value" @click="item.show = true">{{item.selectValue}}</span>
          <select-box v-if="item.type==0" v-model="item.show" :selectedItem="item.selectValue" @bindselect="bindselectMate" :selectIndex="index" :itemArr="item.val"></select-box>
          <grid-select v-else v-model="item.show" :selectedItem="item.selectValue" @bindselect="bindselectMate" :selectIndex="index" :itemArr="item.val"></grid-select>
        </li>
        <!-- 

        <li><span>年收入</span><span class="value" @click="mateShowList[2]=true">{{mateinfo.income}}</span></li>
        <select-box v-model="mateShowList[2]" :selectedItem="mateinfo.income" @bindselect="bindselectMate" :selectIndex="2" :itemArr="matelist[2]"></select-box>

        <li><span>房车情况</span><span class="value">{{mateinfo.house}}</span></li>
        <li><span>学历</span><span class="value">{{mateinfo.education}}</span></li>
        <li><span>抽烟喝酒</span><span class="value">{{mateinfo.smoke}}</span></li> -->
      </ul>
    </div>
    <van-button size="large" class="submit" @click="submit">保存</van-button>
  </div>
</template>
<script>
import configJS from '~/assets/js/baseInfoEdit.js'
export default configJS
</script>

<style lang="stylus"  src="~/assets/styl/baseInfoEdit.styl" scoped>
</style>

