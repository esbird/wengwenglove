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
  getProfession,
  getProfessionSon
} from "~/api/getData.js";
import {
  baseImgPath
} from "~/config/env.js";
import {
  photoCompress,
  convertBase64UrlToBlob
} from "~/api/commonFun.js"
export default {
  methods: {
    async selectJob1(val, id) {
      this.selectedProfession = val;
      await getProfessionSon({
        id
      }).then(res => {
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
    bindselectMate(value, index) {
      console.log();
    },
    bindSelectAreaFun(fullname, key) {
      this.userinfo.workRegion = fullname;
      this.bindCountyCode = key;
    },
    async submit() {
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
      infoJson.uid = infoJson.userid;
      infoJson.sex = infoJson.sex == '男' ? 0 : 1;
      // 设置现住址 xxx-110101
      infoJson.workRegion = infoJson.workRegion + '-' + this.bindCountyCode;

      console.table(infoJson);

      await updateMyInfo(infoJson)
        .then(res => {
          if (res.data.code == 200) {
            this.$dialog.alert({
              title: '提醒',
              message: '信息保存成功'
            }).then(() => {
              this.$router.back();
            })

          }
        })
    },
    selectBirth(value) {
      this.myInfo.userinfo.birthday = value;
    },
    bindSelectSex(value) {
      this.userinfo.sex = value;
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
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "加载中"
      });
      let fd = new FormData();
      fd.append("uid", this.uid);
      // if (file.size / 1024 > 1025) {
      //   await photoCompress(file, {
      //     quality: 0.5
      //   }, async (base64code)=> {
      //     this.base64code = base64code;
      //     // console.log(base64code);
      //     await convertBase64UrlToBlob(base64code).then(res=>{
      //       file = res
      //     })
      //     console.log('file', file);
      //     fd.append("file", file);
      //     await uploadPic(fd).then(async res => {
      //       if (res.data.code == 200) {
      //         toast.clear();
      //         await this.$toast.success("图片上传成功");
      //         this.picArr = res.data.data;
      //       }
      //     });
      //   });
      // }else{
        fd.append("file", file);
        await uploadPic(fd).then(async res => {
          if (res.data.code == 200) {
            toast.clear();
            await this.$toast.success("图片上传成功");
            this.picArr = res.data.data;
          }
        });
      // }
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
    },
    bindSelectRegionFun(fullname, key) {
      this.userinfo.region = fullname;
      this.bindRegionCode = key;
    },
  },
  data() {
    return {
      base64code:"",
      rangeAgeShow: false,
      rangeTallShow: false,
      showFromCity: false,
      bindCountyCode: "110101",
      show: false,
      dateShow: false,
      bindRegionCode: "110101",
      showRegionCity: false,
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
  async asyncData({
    query
  }) {
    //获取个人信息
    let {
      data
    } = await getMyInfo({
      uid: query.uid
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
    return {
      matelist: matelist,
      myInfo: myInfo,
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
    this.bindCountyCode = this.userinfo.workRegion.split('-')[1],
      this.userinfo.workRegion = this.userinfo.workRegion.split('-')[0],
      this.bindRegionCode = this.userinfo.region.split('-')[1],
      this.userinfo.region = this.userinfo.region.split('-')[0],

      this.ages[0] = parseInt(this.ages[0]),
      this.ages[1] = parseInt(this.ages[1]),

      this.talls[0] = parseInt(this.talls[0]),
      this.talls[1] = parseInt(this.talls[1]),
      this.tallRange[0] = parseInt(this.tallRange[0]),
      this.tallRange[1] = parseInt(this.tallRange[1]),
      this.selectedProfession = this.userinfo.profession.split('-')[0],
      this.selectedProfessionSon = this.userinfo.profession.split('-')[1];
  },
  components: {
    "grid-select": GridSelect,
    "select-box": SelectBox,
    "table-select": TableSelect,
    "time-select": TimeSelect,
    "area-select": AreaSelelct,
    'range-select': RangeSelelct,
    'job-select': JobSelect
  },
  computed: {
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
