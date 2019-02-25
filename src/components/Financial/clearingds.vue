<template>
  <div>
    <top></top>
    <el-col :span="24">
      <el-col :span="18" :offset="4">
        <div class="el-bb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/financial' }">财务管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/clearing' }">商户结算</el-breadcrumb-item>
            <el-breadcrumb-item>商户结算详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div>
          <table class="tab">
            <tr>
              <th>日期</th>
              <th>订单总数</th>
              <th>总收入</th>
              <th>商品总量</th>
              <th>洗衣收入</th>
              <th>小让商城收入</th>
              <th>小让家居收入</th>
              <th>高端洗护收入</th>
              <th>微信支付</th>
              <th>余额支付</th>
              <th>实体卡支付</th>
              <th>商户收入</th>
              <th>平台收入</th>
            </tr>
            <tr v-for="item in tableData">
              <td>{{item.date}}</td>
              <td>{{item.orderTotal}}</td>
              <td>{{item.incomeTotal}}</td>
              <td>{{item.productTotal}}</td>
              <td>{{item.laundryTotal}}</td>
              <td>{{item.mallTotal}}</td>
              <td>{{item.furnitureTotal}}</td>
              <td>{{item.highLaundryTotal}}</td>
              <td>{{item.weChatPay}}</td>
              <td>{{item.balancePay}}</td>
              <td>{{item.cardPay}}</td>
              <td>{{item.agentIncome}}</td>
              <td>{{item.platformIncome}}</td>
            </tr>
          </table>
        </div>
        <div style="text-align: center;margin: 5% 0 5% 0;">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="10"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-col>
  </div>


</template>

<script>
  import "@/assets/js/city-data"
  import top from '@/assets/vue/top'
  import {getclearingds} from "@/components/api/clearing";

  export default {
    components: {
      top,
    },
    data() {
      return {
        options: CityInfo,
        value1: '',
        page: 1,
        size: 10,
        total: 10,
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
        tableData: [],
      }
    },
    methods: {
      getList() {
        let a = this.$route.query.id;
        let b = {
          storeid: a,
          page: this.page,
          size: this.size,
        };
        getclearingds(b).then((res) => {
          if (res.data.code === 0) {
            res.data.data.content.forEach((value) => {
              value.incomeTotal = (value.incomeTotal / 100).toFixed(1);
              value.laundryTotal = (value.laundryTotal / 100).toFixed(1);
              value.mallTotal = (value.mallTotal / 100).toFixed(1);
              value.furnitureTotal = (value.furnitureTotal / 100).toFixed(1);
              value.highLaundryTotal = (value.highLaundryTotal / 100).toFixed(1);
              value.agentIncome = (value.agentIncome / 100).toFixed(1);
              value.platformIncome = (value.platformIncome / 100).toFixed(1);
              value.weChatPay = (value.weChatPay / 100).toFixed(1);
              value.balancePay = (value.balancePay / 100).toFixed(1);
              value.cardPay = (value.cardPay / 100).toFixed(1);

            });
            this.tableData = res.data.data.content;
            this.total = res.data.data.count;
          }else {
            this.$message({
              message: `${res.data.msg}`,
              type: 'warning'
            });
          }
        })
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },

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

  .el-bb {
    margin-bottom: 3%;
  }

  .tab {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    color: #606266;
  }

  .tab tr th {
    color: #909399;
    text-align: left;
  }

  .tab td, th {
    border-bottom: 1px solid #ebeef5;
    padding: 12px 20px;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    line-height: 23px;
  }
  .tab th:nth-child(2){
    background: #8fb2c5;
    color: white;
  }
  .tab th:nth-child(3){
    background: #8fb2c5;
    color: white;
  }
  .tab th:nth-child(4){
    background: #8fb2c5;
    color: white;
  }

  .tab th:nth-child(5){
    background: #289bf2;
    color: white;
  }
  .tab th:nth-child(6){
    background: #289bf2;
    color: white;
  }
  .tab th:nth-child(7){
    background: #289bf2;
    color: white;
  }
  .tab th:nth-child(8){
    background: #289bf2;
    color: white;
  }
  .tab th:nth-child(9){
    background: #bad1a3;
    color: white;
  }
  .tab th:nth-child(10){
    background: #bad1a3;
    color: white;
  }
  .tab th:nth-child(11){
    background: #bad1a3;
    color: white;
  }

  .tab td:nth-child(2){
    background: #8fb2c5;
    color: white;
  }
  .tab td:nth-child(3){
    background: #8fb2c5;
    color: white;
  }
  .tab td:nth-child(4){
    background: #8fb2c5;
    color: white;
  }

  .tab td:nth-child(5){
    background: #289bf2;
    color: white;
  }
  .tab td:nth-child(6){
    background: #289bf2;
    color: white;
  }
  .tab td:nth-child(7){
    background: #289bf2;
    color: white;
  }
  .tab td:nth-child(8){
    background: #289bf2;
    color: white;
  }
  .tab td:nth-child(9){
    background: #bad1a3;
    color: white;
  }
  .tab td:nth-child(10){
    background: #bad1a3;
    color: white;
  }
  .tab td:nth-child(11){
    background: #bad1a3;
    color: white;
  }

  .tab tr:nth-child(2n){
    background: #FAFAFA;
  }
  .tab tr:hover {
    background: #f5f7fa;
    transition: background-color .25s ease;
  }
</style>
