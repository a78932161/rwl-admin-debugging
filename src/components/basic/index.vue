<template>
  <div>
    <div v-show="dcShow">
      <div class="bc-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>基础资料</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bc-content2">
        <el-button type="primary" v-if="C1" @click="goAds">广告</el-button>
        <el-button type="primary" v-if="C2" @click="goLaundry">洗衣</el-button>
        <el-button type="primary" v-if="C4" @click="goFurniture">小让家居</el-button>
        <el-button type="primary" v-if="C5" @click="goMall">小让商城</el-button>
        <el-button type="primary" v-if="C3" @click="goDesigner">高端洗护</el-button>
      </div>
    </div>
    <ads v-if="isAds" @gojczl="gojczl"></ads>

  </div>
</template>

<script>
  import ads from '@/components/basic/advertising'

  export default {
    components: {
      ads
    },
    data() {
      return {
        dcShow: true,
        isAds: false,
        C1: false,
        C2: false,
        C3: false,
        C4: false,
        C5: false,
      }
    },
    methods: {
      goAds() {
        this.dcShow = false;
        this.isAds = true;
      },
      gojczl(data) {
        this.dcShow = data;
        this.isAds = false;
      },
      goLaundry() {
        this.$router.push('basicLaundry');
      },
      goFurniture() {
        this.$router.push('basicFurniture');
      },
      goMall() {
        this.$router.push('basicMall');
      },
      goDesigner() {
        this.$router.push('basicDesigner');
      },
      getList() {
        if (localStorage.getItem("info")) {
          let b = JSON.parse(localStorage.getItem("info"));
          if (b.functionAuthority.indexOf('C1') > -1) {
            this.C1 = true;
          }
          if (b.functionAuthority.indexOf('C2') > -1) {
            this.C2 = true;
          }
          if (b.functionAuthority.indexOf('C3') > -1) {
            this.C3 = true;
          }
          if (b.functionAuthority.indexOf('C4') > -1) {
            this.C4 = true;
          }
          if (b.functionAuthority.indexOf('C5') > -1) {
            this.C5 = true;
          }
        }
      }
    },
    mounted() {
      this.getList();
    }
  }

</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .bc-top {
    margin-bottom: 15%;
  }

  .bc-content2 {
    display: flex;
    justify-content: space-around;

  }

  .bc-content2 button {
    width: 180px;
    height: 80px;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 30px;
  }
</style>
