<template>
  <div>
    <div v-show="showFlag">
      <div class="ss-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>平台设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ord-content2">
        <el-button type="primary" v-if="E1" @click="goRecharge">充值奖励</el-button>
        <el-button type="primary" v-if="E2" @click="goCommission">提成机制</el-button>
        <el-button type="primary" v-if="E5" @click="goExpress">运费设置</el-button>
        <el-button type="primary" v-if="E3" @click="goAdminer">管理员</el-button>
        <el-button type="primary" v-if="E4" @click="goProblem">更多编辑</el-button>
        <el-button type="primary" v-if="E6" @click="goproxyRole">代理商</el-button>
      </div>
    </div>
    <recharge v-if="isRecharge" @goIndex1="goIndex1"></recharge>
    <commission v-if="isCommission" @goIndex3="goIndex3"></commission>
    <problem v-if="isProblem" @goIndex2="goIndex2"></problem>
    <adminer v-if="isAdminer" @goIndex4="goIndex4"></adminer>
    <express v-if="isExpress" @goIndex5="goindex5"></express>
    <proxyRole v-if="isProxyRole" @goIndex6="goindex6" @goIndex9="goIndex9"></proxyRole>
    <proxyStore v-if="isProxyStore" @goIndex7="goIndex7" @goIndex8="goIndex8"></proxyStore>
  </div>
</template>

<script>
  import recharge from '@/components/Settings/recharge'
  import commission from '@/components/Settings/commission'
  import problem from '@/components/Settings/problem'
  import adminer from '@/components/Settings/adminer/index'
  import express from '@/components/Settings/express'
  import proxyRole from '@/components/Settings/proxyRole'
  import proxyStore from '@/components/Settings/proxyStore'

  export default {
    components: {
      recharge,
      commission,
      problem,
      adminer,
      express,
      proxyRole,
      proxyStore
    },
    data() {
      return {
        showFlag: true,
        isRecharge: false,
        isCommission: false,
        isProblem: false,
        isAdminer: false,
        isExpress: false,
        isProxyRole: false,
        isProxyStore: false,
        E1: false,
        E2: false,
        E3: false,
        E4: false,
        E5: false,
        E6: false,
      }
    },
    methods: {
      goRecharge() {
        this.showFlag = false;
        this.isRecharge = true;
      },
      goCommission() {
        this.showFlag = false;
        this.isCommission = true;
      },
      goProblem() {
        this.showFlag = false;
        this.isProblem = true;
      },
      goAdminer() {
        this.showFlag = false;
        this.isAdminer = true;
      },
      goExpress() {
        this.showFlag = false;
        this.isExpress = true;
      },
      goproxyRole() {
        this.showFlag = false;
        if (this.$store.state.radio2 == 2) {
          this.showFlag = false;
          this.isProxyRole = true;

        } else if (this.$store.state.radio2 == 1) {
          this.showFlag = false;
          this.isProxyStore = true;
        }
      },

      goIndex1(data) {
        this.isRecharge = false;
        this.showFlag = data;
      },
      goIndex2(data) {
        this.isProblem = false;
        this.showFlag = data;
      },
      goIndex3(data) {
        this.isCommission = false;
        this.showFlag = data;
      },
      goIndex4(data) {
        this.isAdminer = false;
        this.showFlag = data;
      },
      goindex5(data) {
        this.isExpress = false;
        this.showFlag = data;
      },
      goindex6(data) {
        this.isProxyRole = false;
        this.showFlag = data;
      },
      goIndex7(data) {
        this.isProxyStore = false;
        this.showFlag = data;
      },
      goIndex8(data) {
        this.isProxyRole = data;
        this.isProxyStore = false;
      },
      goIndex9(data) {
        this.isProxyRole = false;
        this.isProxyStore = data;
      },
      getList() {
        if (localStorage.getItem("info")) {
          let b = JSON.parse(localStorage.getItem("info"));
          if (b.functionAuthority.indexOf('E1') > -1) {
            this.E1 = true;
          }
          if (b.functionAuthority.indexOf('E2') > -1) {
            this.E2 = true;
          }
          if (b.functionAuthority.indexOf('E3') > -1) {
            this.E3 = true;
          }
          if (b.functionAuthority.indexOf('E4') > -1) {
            this.E4 = true;
          }
          if (b.functionAuthority.indexOf('E5') > -1) {
            this.E5 = true;
          }
          if (b.functionAuthority.indexOf('E6') > -1) {
            this.E6 = true;
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

  .ss-top {
    margin-bottom: 15%;
  }

  .ord-content2 {
    display: flex;
    justify-content: space-around;
  }

  .ord-content2 button {
    width: 180px;
    height: 80px;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 30px;
  }
</style>
