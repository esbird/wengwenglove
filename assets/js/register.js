import GridSelect from "~/components/gridSelect.vue";
import JobSelect from "~/components/jobSelect.vue";

import SelectBox from "~/components/selectBox.vue";
import TableSelect from "~/components/tableSelect.vue";
import TimeSelect from "~/components/timeSelectBox.vue";
import AreaSelelct from "~/components/areaSelect.vue";
import RangeSelelct from "~/components/rangeSelect.vue";
import {
  getMyInfo,
  updateMyInfo,
  getOptions,
  getPhotsByUid,
  removePic,
  uploadPic,
  goEnter,
  getMsgCode,
  sendCheckMsg,
  getProfession,
  getProfessionSon
} from "~/api/getData.js";
import {
  baseImgPath
} from "~/config/env.js";
var timer;
export default {
  methods: {
    async selectJob1(val, id) {
      this.selectedProfession = val;
      await getProfessionSon({ id }).then(res => {
        if (res.data.code == 200) {
          this.ProfessionSon = res.data.data;
        }
      });
      this.jobShow2 = true;
    },
    selectJob2(val, id) {
      this.selectedProfessionSon = val;
      this.userinfo.profession = this.selectedProfession + '-' + this.selectedProfessionSon;

    },
    selectAgeRange(fromVal, toVal) {
      // console.log(fromVal,toVal)
      this.mateinfo.ages = fromVal + '-' + toVal;
      this.ages[0] = fromVal;
      this.ages[1] = toVal;
    },
    selectTallRange(fromVal, toVal) {
      this.mateinfo.talls = fromVal + '-' + toVal;
      this.talls[0] = fromVal;
      this.talls[1] = toVal;
    },
    bindSelectAreaFun(fullname, key) {
      this.userinfo.workRegion = fullname;
      this.bindCountyCode = key;
    },
    bindSelectRegionFun(fullname, key) {
      this.userinfo.region = fullname;
      this.bindRegionCode = key;
    },
    async getMsgCodeFun() {
      let partten = /^1[34578]\d{9}$/;
      if (partten.test(this.userinfo.phone)) {
        await getMsgCode({ phone: this.userinfo.phone }).then(res => {
          if (res.data.code == 200) {
            this.$toast.success('验证码发送成功!');
            this.disableSent = true;
            let count = 60;
            timer = setInterval(() => {
              count--;
              this.sendBtnMsg = count + 's';
              if (count == 0) {
                clearInterval(timer);
                this.sendBtnMsg = '重发验证码'
                this.disableSent = false;
              }
            }, 1000)

          } else {
            this.$dialog.alert({
              title: '提醒',
              message: res.data.msg
            });
          }
          return res;
        })

      } else {
        this.$dialog.alert({
          title: '提醒',
          message: '手机号不正确！'
        });
      }
    },
    bindSelectSex(value) {
      this.userinfo.sex = value;
    },
    async submit() {
      if (!this.userinfo.phone) {
        this.$dialog
          .alert({
            message: "请填写手机号"
          })
          .then( () => {
          });
        return;
      }
      if (!this.sms) {
        this.$dialog
          .alert({
            message: "验证码不能为空"
          })
          .then( () => {
          });
        return;
      }
      if (!this.userinfo.wx) {
        this.$dialog
          .alert({
            message: "请填写微信号"
          })
          .then( () => {
          });
        return;
      }
      // 验证是否同意协议
      if (this.agree) {
        // 判断验证码
        
        await sendCheckMsg({ phone: this.userinfo.phone, code: this.sms }).then(async res => {
          if (res.data.code == 200) {
            console.log('验证码正确')
            let infoJson = {
              ...this.userinfo,
              ages: "",
              talls: "",
              incomes: "",
              educations: "",
              faiths: '',
              houCarStates: '',
            };
            this.matelist.forEach(element => {
              infoJson[element.tag] = element.selectValue
            })
            this.optionsList.forEach(element => {
              infoJson[element.tag] = element.selectValue
            });
            // 择偶：年龄，身高，
            infoJson.ages = this.mateinfo.ages;
            infoJson.talls = this.mateinfo.talls;
            infoJson.uid = infoJson.id;
            infoJson.userid = infoJson.id;
            infoJson.sex = infoJson.sex == '男' ? 0 : 1;
            // 设置现住址 xxx-110101
            infoJson.workRegion = infoJson.workRegion + '-' + this.bindCountyCode;
    
            console.log('infoJson',infoJson);

            await goEnter(infoJson)
              .then(res => {
                if (res.data.code == 200) {
                  this.$dialog.alert({
                    title: '提醒',
                    message: '注册成功'
                  }).then(() => {
                    location.href = 'http://www.wengwenglove.com'
                  })

                }else{
                  this.$dialog.alert({
                    title: '提醒',
                    message: res.data.msg
                  })
                }
              })
          } else {
            this.$dialog.alert({
              title: '提醒',
              message: res.data.msg
            })
          }
          return res;
        })
      } else {
        // this.$dialog.alert({title:'提醒',message:'请先'})
      }

    },
    selectBirth(value) {
      this.userinfo.birthday = value;
    },
    bindselect(value, index) {
      // console.log(value, index);
      this.optionsList[index].selectValue = value;
      // this.sexValue = value;
      // this.show = false;
    },
    bindselectMate(value, index) {
      this.matelist[index].selectValue = value;
    },
    // 上传图片
    async uploadFile({
      file,
      content
    }) {
      let fd = new FormData();
      fd.append("uid", this.uid);
      fd.append("file", file);
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "加载中"
      });
      await uploadPic(fd).then(async res => {
        if (res.data.code == 200) {
          toast.clear();
          await this.$toast.success("图片上传成功");
          this.picArr = res.data.data;
        }
      });
    },
    // 移除图片
    rmvPic(picId, idx) {
      this.$dialog
        .confirm({
          title: "提醒",
          message: "确定删除这张图片吗？"
        })
        .then(async () => {
          await removePic({
            uid: this.uid,
            pid: picId
          }).then(res => {
            if (res.data.code == 200) {
              this.$dialog
                .alert({
                  message: "图片删除成功"
                })
                .then(async () => {
                  await this.picArr.splice(idx, 1);
                });
            } else {
              this.$toast.fail("删除失败");
            }
          });
        });
    }
  },
  data() {
    return {
      sms: '',
      agree: false,
      sendBtnMsg: '发送验证码',
      disableSent: false,
      rangeAgeShow: false,
      rangeTallShow: false,
      showFromCity: false,
      bindCountyCode: "110101",

      bindRegionCode: "110101",
      showRegionCity: false,

      show: false,
      dateShow: false,
      baseImgPath,
      sexValue: "选择性别",
      itemArr: ["男", "女"],
      mateShowList: [false, false, false, false, false, false],
      myInfo: "",
      userinfo: "",
      mateinfo: "",
      uid: "",
      optionsList: [],
      matelist: [],
      picArr: "",
      ages: [],
      talls: [],
      tallRange: [],
      selectedProfession: '',
      selectedProfessionSon: '',
      Profession: [],
      ProfessionSon: [],
      jobShow1: false,
      jobShow2: false,
    };
  },
  async asyncData({ query }) {
    //获取个人信息
    let {
      data
    } = await getMyInfo({
      uid: query.uid
    }).then(res => {
      // console.log(res.data)
      return res
    });
    let myInfo = data.data;
    //获取个人照片
    let {
      data: picArr
    } = await getPhotsByUid({
      uid: query.uid
    });
    // console.time('time1')
    //获取基础选项
    myInfo.mateinfo = {
      'ages': '',
      'talls': "",
      'incomes': "请选择",
      'educations': "请选择",
      'faiths': '请选择',
      'houCarStates': '请选择',
    };
    let {
      data: optionsList
    } = await getOptions();
    let matelist = optionsList.data.matelist.map(item => {
      item.val = item.val.map(ite => {
        // ite = ite.val;
        return ite.val;
      });
      item.selectValue = myInfo.mateinfo[item.tag] || "请选择";
      item.show = false;
      return item;
    });

    // console.timeEnd('time1')
    // console.log("matelist", this.matelist);
    let tallRange = [];

    optionsList = optionsList.data.userlist.map(item => {
      item.val = item.val.map(ite => {
        return ite.val;
      });
      if (item.tag == "tall" || item.tag == "weight") {
        // console.log(item.val[0],item.val[1])
        if (item.tag == 'tall') tallRange = item.val;
        let sltItArr = [];
        let str = item.tag == "tall" ? "cm" : "kg";
        for (let i = parseInt(item.val[0]); i <= parseInt(item.val[1]); i++) {
          sltItArr.push(i + str);
        }
        item.val = sltItArr;
      }
      item.selectValue = myInfo.userinfo[item.tag] || "请选择";
      item.show = false;
      return item;
    });
    //获取职业列表
    let Profession = [];

    await getProfession().then(res => {
      if (res.data.code == 200) {
        Profession = res.data.data;
      }
      return res;
    });
    // console.log(optionsList)
    myInfo.userinfo.workRegion = '请选择-110101',
      myInfo.userinfo.region = '请选择-110101',
      myInfo.userinfo.birthday = '',
      myInfo.userinfo.profession = "";
    return {
      myInfo: myInfo,
      matelist: matelist,
      userinfo: myInfo.userinfo,
      mateinfo: myInfo.mateinfo,
      ages: myInfo.mateinfo.ages.split('-'),
      talls: myInfo.mateinfo.talls.split('-'),
      uid: query.uid,
      optionsList: optionsList,
      picArr: picArr.data,
      tallRange,
      Profession
    }
  },
  async created() {
    // this.talls[0] = parseInt(this.talls[0]),
    //   this.talls[1] = parseInt(this.talls[1]),
      this.talls[0] = '',
      this.talls[1] = '',
      this.tallRange[0] = parseInt(this.tallRange[0]),
      this.tallRange[1] = parseInt(this.tallRange[1]),
      // this.selectedProfession = this.userinfo.profession.split('-')[0],
      // this.selectedProfessionSon = this.userinfo.profession.split('-')[1],
      this.selectedProfession = '',
      this.selectedProfessionSon = '',
      // this.ages[0] = parseInt(this.ages[0]),
      // this.ages[1] = parseInt(this.ages[1]),
      this.ages[0] = '',
      this.ages[1] = '',
      this.bindCountyCode = this.userinfo.workRegion.split('-')[1],
      this.userinfo.workRegion = this.userinfo.workRegion.split('-')[0],
      this.bindRegionCode = this.userinfo.region.split('-')[1],
      this.userinfo.region = this.userinfo.region.split('-')[0];

  },
  components: {
    "grid-select": GridSelect,
    "select-box": SelectBox,
    "table-select": TableSelect,
    "time-select": TimeSelect,
    "area-select": AreaSelelct,
    'job-select': JobSelect,
    'range-select': RangeSelelct
  },
  computed: {
    phoneState() {
      let partten = /^1[34578]\d{9}$/;
      return !partten.test(this.userinfo.phone)
    },
    ifIsV() {
      switch (this.myInfo.is_v) {
        case 0:
          return "去认证";
          break;
        case 1:
          return "已认证";
          break;
        case 2:
          return "认证中";
          break;
        case 3:
          return "认证失败";
          break;
      }
    }
  }
};
