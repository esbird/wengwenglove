<template>
  <div style="">
    <grid-select  v-model="showYear" :itemArr="yearList" @bindselect="selectYear" :selectedItem="selectedYear"></grid-select>
    <grid-select   v-model="showMonth" :itemArr="mouthList" @bindselect="selectMonth" :selectedItem="selectedMonth"></grid-select>
    <grid-select   v-model="showDay" :itemArr="dayList" @bindselect="selectDay" :selectedItem="selectedDay"></grid-select>
  </div>
</template>
<script>
import GridSelect from '~/components/gridSelect.vue'
import dayjs from 'dayjs'
export default {  
  model:{
    prop:'show',
    event:'change'
  },
  components:{
    'grid-select':GridSelect
  },
  methods:{
    selectYear(value){
      this.selectedYear = value;
      this.selectedMonth="";
      this.selectedDay = "";
      this.showMonth=true;
    },
    selectMonth(value){
      // console.log('month',value)
      this.selectedMonth = value;
      // 设置dayList
      let presDay = dayjs(this.selectedYear+'-'+this.selectedMonth+'-01').daysInMonth();
      let dayList = [];
      for(let i=1;i<=presDay;i++){
        dayList.push(i)
      }
      this.dayList = dayList;
      this.showDay = true;
    },
    selectDay(value){
      // console.log('day',value)
      this.selectedDay = value;
      let dateStr = dayjs(this.selectedYear+'-'+this.selectedMonth+'-'+this.selectedDay);
      // dateStr.year(this.selectedYear);
      // dateStr.month(this.selectedMonth-1);
      // dateStr.date(this.selectedDay);
      dateStr =dateStr.format('YYYY-MM-DD');
      // console.log(dateStr)
      this.$emit('bindselecttime',dateStr);
      this.$emit('change',false)
    }
  },
  data(){
    return{
      showYear:false,
      showMonth:false,
      showDay:false,
      yearList:[],
      mouthList:[1,2,3,4,5,6,7,8,9,10,11,12],
      dayList:[],
      selectedYear:'',
      selectedMonth:'',
      selectedDay:''

    }
    
  },
  props:{
    startYear:{
      type:Number,
      default:dayjs().year()-25
    },
    show:Boolean,
    selectDate:{
      type:String,
      default:dayjs().format('YYYY-MM-DD')
    }
  },
  mounted(){
    // this.showYear= true;
  },
  created(){
    let lastYear = dayjs().year()-18;
    let yearList = [];
    for(let i = lastYear;i>=this.startYear;i--){
      yearList.push(i)
    }
    let selectDate = dayjs(this.selectDate)
    this.selectedYear = selectDate.year();
    this.selectedMonth = selectDate.month();
    this.selectedDay = selectDate.date();

    this.yearList = yearList;
    let dayList = [];
    for(let i=1;i<=selectDate.daysInMonth();i++){
      dayList.push(i)
    }
    this.dayList = dayList;
    // this.showYear = true;
  },
  watch:{
    'show':{
      handler(newVal,oldVal){
        console.log(newVal)
        if(newVal){
          this.showYear = true
        }
      }

    }
  }
}
</script>
<style lang="stylus" scoped>
.van-popup
  background-color transparent
</style>


