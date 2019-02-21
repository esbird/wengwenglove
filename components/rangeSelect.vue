<template>
  <div style="">
    
    <grid-select v-model="show1" :itemArr="itemArr1" @bindselect="select1" :selectedItem="selectedItem1"></grid-select>
    <grid-select v-model="show2" :itemArr="itemArr2" @bindselect="select2" :selectedItem="selectedItem2"></grid-select>
  </div>
</template>
<script>
import GridSelect from "~/components/gridSelect.vue";
export default {
  model: {
    prop: "show",
    event: "change"
  },
  props: {
    show: Boolean,
    upperLimit:'',
    lowerLimit:'',
    fromNum:'',
    toNum:''
  },
  components: {
    "grid-select": GridSelect
  },
  methods: {
    select1(val) {
      this.selectedItem1 = parseInt(val);
      //=====================================
      // 设置第二选择列表
      let newArr = [];
      for(let i=this.selectedItem1;i<=this.upperLimit;i++){
        newArr.push(i);
      }

      this.itemArr2=newArr;
      this.selectedItem2=0;

      this.show1 = false;
      this.show2 = true;
    },
    select2(val) {
      // console.log('day',value)
      this.selectedItem2= val;
      this.show2 = false;
      this.$emit("bindselectrange", this.selectedItem1, this.selectedItem2);
      this.$emit("change", false);
    }
  },
  
  data() {
    return {
      itemArr1:[],
      itemArr2: [],
      selectedItem1: "",
      selectedItem2: "",
      show1: false,
      show2: false,
      fromNumInner:'',
      toNumInner:'',

      
    };
  },
  mounted() {
    
  },
  created(){
    let newArr = [];
    for(let i=this.upperLimit;i>=this.lowerLimit;i--){
      newArr.push(i)
    } 
    this.itemArr1=newArr;
    this.selectedItem1=this.fromNum;
    this.selectedItem2=this.toNum;
    
  },
  watch: {
    show: {
      handler(newVal, oldVal) {
        // console.log(newVal);
        if (newVal) {
          this.show1 = true;
          let newArr = [];
          for(let i=this.upperLimit;i>=this.lowerLimit;i--){
            newArr.push(i)
          } 
          this.itemArr1=newArr;
          this.selectedItem1=this.fromNum;
          this.selectedItem2=this.toNum;
        // console.log(this.itemArr1,this.fromNum);

          // this.selectedprovince = this.bindCounty.substr(0, 2) + "0000";
          // this.province_list = province_list;
          // this.selectedcity = this.bindCounty.substr(0, 4) + "00";
          // this.selectedcounty = this.bindCounty;
          // this.selectedFullName = "";
        }
      },
      // 'selectedprovince':{
      //   handler(newVal,oldVal){
      //     let header = newVal.substr(0,2);
      //     let newJson = {};
      //     let searchState =0;//判断循环时候结束
      //     for (const key in city_list) {
      //       if (city_list.hasOwnProperty(key)) {

      //         if(key.startsWith(header)){
      //           searchState=1;
      //           newJson[key]=city_list[key]
      //         }else{
      //           if(searchState>0){
      //             // 循环结束
      //             break;
      //           }else{
      //           }
      //         }
      //         // const element = city_list[key];
      //       }
      //     }
      //     this.city_list= newJson;
      //   }
      // },
      // selectedcity: {
      //   handler(newVal, oldVal) {
      //     let header = newVal.substr(0, 4);
      //     let newJson = {};
      //     let searchState = 0; //判断循环时候结束
      //     for (const key in county_list) {
      //       if (city_list.hasOwnProperty(key)) {
      //         if (key.startsWith(header)) {
      //           searchState = 1;
      //           newJson[key] = county_list[key];
      //         } else {
      //           if (searchState > 0) {
      //             // 循环结束
      //             break;
      //           } else {
      //           }
      //         }
      //         // const element = city_list[key];
      //       }
      //     }
      //     this.county_list = newJson;
      //   }
      // }
    }
  }
};
</script>
<style lang="stylus" scoped>
.van-popup {
  background-color: transparent;
}
</style>


