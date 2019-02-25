<template>
  <div class="qaq">
    <div style="margin-bottom: 3%">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="gojczl">基础资料</span></el-breadcrumb-item>
        <el-breadcrumb-item>广告设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="font-size: 16px;margin-bottom: 3%">
      <label style="margin-right: 3%">选择广告模版 :</label>
      <el-radio v-model="radio1" label="0">首页</el-radio>
      <el-radio v-model="radio1" label="1">小让商城</el-radio>
    </div>
    <div style="width: 80%;margin-left:10% ">
      <el-form label-width="110px">
        <el-form-item label="设置轮播时间 :">
          <el-input v-model="value1" placeholder="请输入秒数"></el-input>
        </el-form-item>
        <el-form-item label="设置图片 :">
          <el-upload
            action="https://rtest.rwlai.com/rwlmall/file/uploadimage"
            :limit="5"
            list-type="picture-card"
            :headers="headers"
            :on-preview="handlePictureCardPreview"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item
          v-for="(domain, index) in fileList"
          :label="'图片地址' + index + ' :'"
          :key="domain.key">
          <el-input v-model="domain.address"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button v-show="isok" type="primary" @click="tijiao">提交</el-button>
          <el-button v-show="isok1" type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getAd, upAd, saveAd} from "@/components/api/basicad";

  export default {
    data() {
      return {
        radio1: '0',
        value1: '',
        domains: [],
        id: '',
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        isok: true,
        isok1: false,
        imgUrl: 'https://image.rwlai.com/',
      }
    },
    methods: {
      gojczl() {
        this.$emit('gojczl', true);
      },

      getlist(index) {
        let a = {
          type: index,
        };
        getAd(a).then((res) => {
          if (res.data.data != null) {
            this.value1 = res.data.data.time / 1000;
            this.fileList = this.tpjq(res.data.data.image, res.data.data.webAddress);
            this.zhdz(res.data.data.webAddress);
            this.isok = false;
            this.isok1 = true;
            this.id = res.data.data.id;
          } else {
            this.value1 = '';
            this.fileList = [];
            this.domains = [];
            this.isok1 = false;
            this.isok = true;
          }
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleChange(file, fileList) {
        this.fileList = fileList;
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      tpjq(qaq, dz) {
        let img = qaq;
        let imgjq = img.substring(0, img.length);
        let imgs = imgjq.split(',');
        let geshi = [];
        for (let i = 0; i < imgs.length; i++) {
          let qa = imgs[i];
          let qaa = qa.split('.');
          geshi.push(qaa[qaa.length - 1]);
        }
        let images = [];
        let ads = [];
        ads = dz.split(',');
        for (let i = 0; i < imgs.length; i++) {
          images.push({name: i + 1 + '.' + geshi[i], url: `${this.imgUrl}${imgs[i]}`, address: ads[i]});
        }
        console.log(images);
        return images;
      },
      zhdz(qaq) {
        let a = qaq;
        let b = a.substring(0, a.length);
        this.domains = b.split(',');
      },

      tijiao() {
        let data = [];
        let ads = [];
        if (this.value1 && this.fileList) {
          this.fileList.forEach((value) => {
            data.push(value.response.data);
            ads.push(value.address);
          });
          let a = {
            type: parseInt(this.radio1),
            time: this.value1 * 1000,
            image: data.join(','),
            webAddress: ads.join(','),
          };
          saveAd(a).then((res) => {
            this.$message({
              message: "添加成功!",
              type: 'success'
            });
          });
        }
      },


      save() {
        let data = [];
        let ads = [];
        if (this.value1 && this.fileList && this.domains) {
          this.fileList.forEach((value) => {
            if (value.response) {
              data.push(value.response.data)
            } else {
              data.push(value.url.substring(this.imgUrl.length, value.url.length));
            }
            ads.push(value.address);
          });
          let a = {
            type: parseInt(this.radio1),
            time: this.value1 * 1000,
            image: data.join(','),
            webAddress: ads.join(','),
          };
          let b = {
            advertisementid: this.id,
          };
          upAd(b, a).then((res) => {
            this.$message({
              message: "保存成功!",
              type: 'success'
            });
          })

        } else {
          this.$message({
            message: "请填写完整!",
            type: 'warning'
          });
        }


      },
    },
    computed: {
      headers() {
        return {
          'x-auth-token': localStorage.getItem('token'),
        }
      },
    },
    mounted() {

      if (this.radio1 == '0') {
        this.getlist(0);
      }
    },
    watch: {
      radio1(curVal, oldVal) {
        if (curVal === '0') {
          this.getlist(0);
        } else if (curVal === '1') {
          this.getlist(1);
        }
      },
      fileList(curVal, oldVal) {
        if (curVal[curVal.length - 1].response) {
          curVal[curVal.length - 1]['address'] = 'https://rtest.rwlai.com/rwlmall/wechat/authorize?returnUrl=';
          console.log(curVal);
        }
      },
    }
  }
</script>

<style>
  .el-breadcrumb {
    font-size: 18px;
  }

  .el-radio__label {
    font-size: 16px;
  }
</style>
