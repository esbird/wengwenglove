<template>
    <van-popup v-model="show" :close-on-click-overlay="false">
        <div class="selectBoxLine">
            <div class="selectBox-wrap">
                <ul>
                    <template v-for="(val,key,index) in itemJson">
                    <li @click="onSelect(val.val,val.id)" :key="index" :class="{active:val.val==selectedItem}" >{{val.val}}</li>
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
        itemJson:{
            type:Array,
        },
        selectedItem:{
            // type:String,
            default:''
        },
        // selectIndex:{
        //   type:Number,
        //   default:0
        // }
    },
    data(){
        return{
            bindkey:''
        }
    },
    methods:{
        onSelect(val,key){
            // this.index = this.itemArr.indexOf(item);
            this.$emit('bindselect',val,key);
            this.$emit('change',false)
        }
    },
    created(){
        // let index = this.itemArr.indexOf(this.selectedItem)
        this.bindkey = this.selectedItem;
        
    }
}
</script>
<style lang="stylus" scoped>
@import '~assets/styl/selectBox.styl'
</style>


