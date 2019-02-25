<template>
  <div>
    <div v-show="showFlag">
      <div class="ord-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ord-content2">
        <el-button type="primary" v-if="D1" @click="goAccount">财务退款</el-button>
        <el-button type="primary" v-if="D4" @click="goDeduction">财务扣款</el-button>
        <el-button type="primary" v-if="D2" @click="goclearing">商户结算</el-button>
        <el-button type="primary" v-if="D3" @click="goIncome">收支明细</el-button>

      </div>
    </div>
    <account v-if="isAccount" @mmp="godetails" @mmp1="godetails1"></account>
    <Details v-if="isDetails" @mp="godetails1" @mp1="godetails2"></Details>
    <income v-if="isIncome" @mmp2="godetails3"></income>
    <deduction v-if="isDeduction" @mmp1="godetails1"></deduction>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import Account from '@/components/Financial/account'
  import Details from '@/components/Financial/details'
  import income from '@/components/Financial/IncomeOutlay'
  import deduction from '@/components/Financial/deduction'

  export default {
    components: {
      Account,
      Details,
      income,
      deduction
    },
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        options: CityInfo,
        value1: '',
        a: 10,
        showFlag: true,
        isIncome: false,
        isAccount: false,
        isDetails: false,
        isDeduction: false,
        D1: false,
        D2: false,
        D3: false,
        D4: false,
      }
    },
    methods: {
      goAccount() {
        this.showFlag = false;
        this.isAccount = true;
      },
      godetails(data) {
        this.isDetails = data;
        this.isAccount = false;
      },
      godetails1(data) {
        this.showFlag = data;
        this.isAccount = false;
        this.isDetails = false;
        this.isDeduction = false;
      },


      godetails2(data) {
        this.showFlag = false;
        this.isAccount = data;
        this.isDetails = false;
      },
      godetails3(data) {
        this.showFlag = data;
        this.isIncome = false;
      },

      goclearing() {
        this.$router.push('/clearing')
      },
      goIncome() {
        this.showFlag = false;
        this.isIncome = true;
      },
      goDeduction() {
        this.showFlag = false;
        this.isDeduction = true;
      },
      getList() {
        if (localStorage.getItem("info")) {
          let b = JSON.parse(localStorage.getItem("info"));
          if (b.functionAuthority.indexOf('D1') > -1) {
            this.D1 = true;
          }
          if (b.functionAuthority.indexOf('D2') > -1) {
            this.D2 = true;
          }
          if (b.functionAuthority.indexOf('D3') > -1) {
            this.D3 = true;
          }
          if (b.functionAuthority.indexOf('D4') > -1) {
            this.D4 = true;
          }
        }
      }
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

  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 11% 0;
  }

  .ord-content1 {
    display: flex;
    width: 30%;
  }

  .ord-content2 {
    display: flex;
    justify-content: space-around;

  }

  .ord-content2 button {
    width: 250px;
    height: 80px;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 30px;
  }
</style>
