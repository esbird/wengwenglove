<template>
  <div>
    <header>身份认证</header>
    <div class="content">
      <p class="desc">嗡嗡作为一个真实、严肃的婚恋平台，我们要求用户完成身份认证。对于以结婚为目的的用户，我们希望创建一个无酒托、婚托的婚恋环境</p>
      <div class="input-wrap">
        <h2>真实姓名</h2>
        <input type="text" name="" id="" v-model="name">
        <h2>身份证</h2>
        <input type="text" v-model='IDNum'>
      </div>
      <div class="section1">
        <h2>上传身份证照片（请务必按照示例上传）</h2>
        <p class="tip">
          您上传的任何身份证照片等资料，仅供审核使用且他人无法看到，此外，我们会对身份证照片进行安全处理，敬请放心。
        </p>
        <div class="example">
          <div class="port">
            <img src="~/static/IDCard01.png" alt="">
            <span>身份证正面照</span>
          </div>
          <div class="port">
            <img src="~/static/IDCard02.jpg" alt="">
            <span>身份证反面照</span>
          </div>
        </div>
        <div class="IDCard-upload">
          <div class="port" :style="{'background-image':'url('+pic1+')'}" :class="{'color-white':pic1}">
            <!-- <input type="file" name="" id=""> -->
            <van-uploader :after-read="onRead1">
              <!-- <img src="~static/add-black.png" alt=""> -->
              <van-icon name="add-o" style="font-size:30px" />
              <!-- <van-icon name="photograph" /> -->
            </van-uploader>
            <span>上传图片</span>
          </div>
          <div class="port" :style="{'background-image':'url('+pic2+')'}" :class="{'color-white':pic2}">
            <van-uploader :after-read="onRead2">
              <van-icon name="add-o" style="font-size:30px" />
              <!-- <img src="~static/add-black.png" alt=""> -->
            </van-uploader>
            <span>上传图片</span>
          </div>
        </div>
      </div>
    </div>
    <van-button size="large" class="submit" @click="submit">提交</van-button>
  </div>
</template>
<script>
import {saveCard,saveIdCard} from '~/api/getData.js'
export default {
  data() {
    return {
      name: "",
      IDNum: "",
      pic1: "",
      picFile1: "",
      pic2: "",
      picFile2: "",
      uid:''
    };
  },
  methods: {
    onRead1({ file, content }) {
      // console.log(file)
      // console.log(content)
      this.pic1 = content;
      this.picFile1 = file;
    },
    onRead2({ file, content }) {
      // console.log(file)
      // console.log(content)
      this.pic2 = content;
      this.picFile2 = file;
    },
    async submit() {
      if (
        !this.IDNum ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          this.IDNum
        )
      ) {
        this.$toast.fail('身份证号格式错误');
        return;
      }else if(!this.name){
        this.$toast.fail('姓名不能为空')
        return;
      }else if(!this.pic1 || !this.pic2){
        this.$toast.fail('请上传身份证');
      }else{
        let uplState = 0;
        const toast = this.$toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中'
        });
        await saveCard({uid:this.uid,real_name:this.name,id_card_num:this.IDNum}).then(res=>{
          if(res.data.code==200){
            uplState =1
          }
        })
        let fd = new FormData();
        fd.append('uid',this.uid);
        fd.append('name','hand_id_card');
        fd.append('file',this.picFile1)
        await saveIdCard(fd).then(res=>{
          if(res.data.code==200){uplState =2}
        });
        let fd1 = new FormData();
        fd1.append('uid',this.uid);
        fd1.append('name','id_card');
        fd1.append('file',this.picFile2)
        await saveIdCard(fd1).then(res=>{
          if(res.data.code==200){ uplState=3} 
        });
        toast.clear();
        if(uplState==3){
          // await this.$toast.success('身份信息上传成功');
          await this.$dialog.alert({
              title:'提醒',
              message:'身份信息上传成功'
            }).then(()=>{
                //点击回调
              this.$router.back();
            })
        }else{
          // this.$toast.fail('上传失败')
          this.$dialog.alert({
            title:'提醒',
            message:'上传失败'
          }).then(()=>{
              //点击回调
          })
        }
      }
    }
  },
  async asyncData({query}){
    return{uid:query.uid}
    // this.uid = this.$route.query.uid
  }
};
</script>

<style lang="stylus" src="~/assets/styl/identifyCheck.styl" scoped>
          

         

                             

                             

                                                                                             

                                    

                             

                                                                

                            

                                                   

                  

                                  

                                           

                               

                                                                         

                    

                                     

                                      

                                                                

                                             

                          

                                      

                                                                

                                           

                          

                      

                                           

                                                                                                                  

                                                                  

                                                            

                                                                           

                                                                          

                                                                 

                                       

                                         

                          

                                                                                                                  

                                                            

                                                                          

                                                                           

                                       

                                         

                          

                      

                  

              

                                                                               

          

           

        

                

           

               

                    

                     

                    

                        

                    

                        

         

      

             

                              

                            

                               

                          

                            

        

                              

                            

                               

                          

                            

        

               

                                                                                                                       

                                 

                             

             

       

     

 

         



                                                                   

// @import ''



</style>