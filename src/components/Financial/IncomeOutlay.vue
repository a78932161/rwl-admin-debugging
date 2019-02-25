<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="gofinancial">财务管理</span></el-breadcrumb-item>
        <el-breadcrumb-item>收支明细</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="float: right;margin-bottom: 3%">
        <el-date-picker
          v-model="value1"
          type="daterange"
          align="left"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <el-button type="primary" @click="getList">查询</el-button>
      </div>
    </div>

    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="weChatIncome"
          label="微信总收入">
        </el-table-column>
        <el-table-column
          prop="rechargeIncome"
          label="微信充值">
        </el-table-column>
        <el-table-column
          prop="weChatAmount"
          label="微信支付">
        </el-table-column>
        <el-table-column
          prop="accountBalance"
          label="账户总余额">
        </el-table-column>
        <el-table-column
          prop="refundAmount"
          label="财务退款">
        </el-table-column>
        <el-table-column
          prop="rewardAmount"
          label="充值赠送">
        </el-table-column>
        <el-table-column
          prop="balanceAmount"
          label="余额支付">
        </el-table-column>
        <el-table-column
          prop="consumeAmount"
          label="消费总额">
        </el-table-column>
        <el-table-column
          prop="cardAmount"
          label="会员卡支付">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getIncome} from "@/components/api/clearing";

  export default {
    name: "income-outlay",
    data() {
      return {
        tableData: [],
        value1: null,
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
      }
    },
    methods: {
      getList() {
        this.tableData = [];
        let a;
        if (this.value1) {
          a = {
            starttime: this.value1[0].getTime(),
            endtime: this.value1[1].getTime()+86400000,
          }
        } else {
          a = '';
        }
        getIncome(a).then((res) => {
          res.data.data.weChatIncome = (res.data.data.weChatIncome / 100).toFixed(1);
          res.data.data.rechargeIncome = (res.data.data.rechargeIncome / 100).toFixed(1);
          res.data.data.weChatAmount = (res.data.data.weChatAmount / 100).toFixed(1);
          res.data.data.accountBalance = (res.data.data.accountBalance / 100).toFixed(1);
          res.data.data.refundAmount = (res.data.data.refundAmount / 100).toFixed(1);
          res.data.data.balanceAmount = (res.data.data.balanceAmount / 100).toFixed(1);
          res.data.data.consumeAmount = (res.data.data.consumeAmount / 100).toFixed(1);
          res.data.data.cardAmount = (res.data.data.cardAmount / 100).toFixed(1);
          res.data.data.rewardAmount = (res.data.data.rewardAmount / 100).toFixed(1);
          this.tableData.push(res.data.data);
        })
      },
      gofinancial() {
        this.$emit('mmp2', true)
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

  .ord-top {
    margin: 0 0 3% 0;
    text-align: center;
  }

</style>
