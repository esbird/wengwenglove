<template>
    <van-popup v-model="show" :close-on-click-overlay="false">
        <div class="selectBoxLine">
            <div class="selectBox-wrap">
                <ul>
                    <template v-for="(item,idx) in itemArr">
                    <li @click="onSelect(item)" :key="idx" :class="{active:idx==index}" >{{item}}</li>
                    </template>
                </ul>
            </div>
        </div>
    </van-popup>
</template>
<script>
export default {
    model:{
        prop:'show',
        event:'change'
    },
    props:{
        show:Boolean,
        itemArr:{
            type:Array,
            default:()=>{
              return []
            }
        },
        selectedItem:{
            type:String,
            default:" "
        },
        selectIndex:{
          type:Number,
          default:0
        }
    },
    data(){
        return{
            index:0
        }
    },
    methods:{
        onSelect(item){
            this.index = this.itemArr.indexOf(item);
            this.$emit('bindselect',item,this.selectIndex);
            this.$emit('change',false)
        }
    },
    created(){
      // console.log(this.itemArr)
        let index = this.itemArr.indexOf(this.selectedItem);
        this.index = index;
    }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styl/selectBox.styl"
</style>


