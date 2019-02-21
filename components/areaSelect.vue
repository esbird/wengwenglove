<template>
  <div style="">
    <grid-select v-model="show1" :itemJson="province_list" @bindselect="selectprovince" :selectedItem="selectedprovince"></grid-select>
    <grid-select v-model="show2" :itemJson="city_list" @bindselect="selectcity" :selectedItem="selectedcity"></grid-select>
    <grid-select v-model="show3" :itemJson="county_list" @bindselect="selectcounty" :selectedItem="selectedcounty"></grid-select>
  </div>
</template>
<script>
import GridSelect from "~/components/gridSelectJson.vue";
import { province_list, city_list, county_list } from "~/config/area.js";
export default {
  model: {
    prop: "show",
    event: "change"
  },
  components: {
    "grid-select": GridSelect
  },
  methods: {
    selectprovince(val, key) {
      this.selectedFullName = val;
      this.selectedprovince = key;
      //=====================================

      let header = key.substr(0, 2);
      let newJson = {};
      let searchState = 0; //判断循环时候结束
      for (const key in city_list) {
        if (city_list.hasOwnProperty(key)) {
          if (key.startsWith(header)) {
            searchState = 1;
            newJson[key] = city_list[key];
          } else {
            if (searchState > 0) {
              // 循环结束
              break;
            } else {
            }
          }
          // const element = city_list[key];
        }
      }
      this.city_list = newJson;
      //=====================================

      this.show1 = false;
      this.show2 = true;
    },
    selectcity(val, key) {
      this.selectedcity = key;
      this.selectedFullName = this.selectedFullName + " " + val;
      // ===========================================
      let header = key.substr(0, 4);
      let newJson = {};
      let searchState = 0; //判断循环时候结束
      for (const key in county_list) {
        if (county_list.hasOwnProperty(key)) {
          if (key.startsWith(header)) {
            searchState = 1;
            newJson[key] = county_list[key];
          } else {
            if (searchState > 0) {
              // 循环结束
              break;
            } else {
            }
          }
          // const element = city_list[key];
        }
      }
      this.county_list = newJson;
      // ==============================================
      this.show2 = false;
      this.show3 = true;
    },
    selectcounty(val, key) {
      // console.log('day',value)
      this.selectedcounty = key;
      this.selectedFullName = this.selectedFullName + " " + val;
      this.show3 = false;
      this.$emit("bindSelectArea", this.selectedFullName, key);
      this.$emit("change", false);
    }
  },
  data() {
    return {
      province_list,
      city_list: {},
      county_list: {},
      selectedprovince: "",
      selectedcity: "",
      selectedcounty: "",
      selectedFullName: "",
      show1: false,
      show2: false,
      show3: false
    };
  },
  props: {
    show: Boolean,
    bindCounty: {
      type: String,
      default: "110101"
    }
  },
  // mounted() {
  //   this.selectedprovince = this.bindCounty.substr(0, 2) + "0000";
  //   this.province_list = province_list;
  //   this.selectedcity = this.bindCounty.substr(0, 4) + "00";
  //   this.selectedcounty = this.bindCounty;
  //   this.selectedFullName = "";

  // },
  watch: {
    show: {
      handler(newVal, oldVal) {
        console.log(newVal);
        if (newVal) {
          this.show1 = true;
          this.selectedprovince = this.bindCounty.substr(0, 2) + "0000";
          this.province_list = province_list;
          this.selectedcity = this.bindCounty.substr(0, 4) + "00";
          this.selectedcounty = this.bindCounty;
          this.selectedFullName = "";
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


