<template>
  <div>
    <div v-show="showFlag">
      <div class="ord-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="ord-content2">
        <el-button v-if="A1" type="primary" class="ord-content2-bt" @click="gopd">订单派单</el-button>
        <el-button v-if="A5" type="primary" @click="gofx">订单分析</el-button>
      </div>
    </div>
    <OrderDispatch v-if="isDispatch" @goIndex="goIndex"></OrderDispatch>
    <OrderAnalysis v-if="isAnalysis" @goIndex1="goIndex1"></OrderAnalysis>

  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import OrderDispatch from '@/components/orders/orderDispatch';
  import OrderAnalysis from '@/components/orders/orderAnalysis';

  export default {
    components: {
      OrderDispatch,
      OrderAnalysis
    },
    data() {
      return {
        showFlag: true,
        isDispatch: false,
        isAnalysis: false,
        options: CityInfo,
        A1: false,
        A5: false,
      }
    },
    methods: {
      gopd() {
        this.showFlag = false;
        this.isDispatch = true;
      },
      gofx() {
        this.showFlag = false;
        this.isAnalysis = true;
      },
      goIndex(data) {
        this.showFlag = data;
        this.isDispatch = false;
      },
      goIndex1(data) {
        this.showFlag = data;
        this.isAnalysis = false;
      },
      getList() {
        if (localStorage.getItem("info")) {
          let b = JSON.parse(localStorage.getItem("info"));
          if (b.functionAuthority.indexOf('A5') > -1) {
            this.A5 = true;
          }
          if (this.A1 === false) {
            if (b.functionAuthority.indexOf('A1') > -1) {
              this.A1 = true;
            }
            if (b.functionAuthority.indexOf('A2') > -1) {
              this.A1 = true;
            }
            if (b.functionAuthority.indexOf('A3') > -1) {
              this.A1 = true;
            }
            if (b.functionAuthority.indexOf('A4') > -1) {
              this.A1 = true;
            }
          }
        }
        if (this.A1 == true) {
          if (Object.keys(this.$route.query).length > 0) {
            this.gopd();
          }
        }

      },
    },
    mounted() {
      this.getList();
    },

  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .ord-top {
    margin-bottom: 15%;
    text-align: center;
  }

  .ord-content2 {
    display: flex;
    justify-content: space-around;

  }

  .ord-content2 button {
    width: 250px;
    height: 80px;
    font-size: 25px;

  }

  .ord-content2-bt {
    margin: 0 50px 0 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

</style>

