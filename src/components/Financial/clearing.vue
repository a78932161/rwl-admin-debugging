<template>
  <div>
    <top></top>
    <el-col :span="24">
      <el-col :span="18" :offset="4">
        <div class="el-bb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/financial' }">财务管理</el-breadcrumb-item>
            <el-breadcrumb-item>商户结算</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="ord-content">
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
          <div>
            <el-cascader
              ref="cascader"
              placeholder="试试搜索：浙江"
              :options="options"
              filterable
              change-on-select
              clearable
            ></el-cascader>
            <el-button type="primary" @click="search">查询</el-button>
          </div>
        </div>
        <div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="orderTotal"
              label="订单总数">
            </el-table-column>
            <el-table-column
              prop="productTotal"
              label="商品数量">
            </el-table-column>
            <el-table-column
              prop="incomeTotal"
              label="收入总额">
            </el-table-column>
            <el-table-column
              prop="rechargeTotal"
              label="充值总额">
            </el-table-column>
            <el-table-column
              prop="refundTotal"
              label="退款总额">
            </el-table-column>
            <el-table-column
              prop="laundryTotal"
              label="洗衣">
            </el-table-column>
            <el-table-column
              prop="highLaundryTotal"
              label="高端洗护">
            </el-table-column>
            <el-table-column
              prop="furnitureTotal"
              label="小让家居">
            </el-table-column>
            <el-table-column
              prop="mallTotal"
              label="小让商城">
            </el-table-column>
            <el-table-column
              prop="agentIncome"
              label="商户收入">
            </el-table-column>
            <el-table-column
              prop="platformIncome"
              label="平台佣金">
            </el-table-column>
            <el-table-column
              prop="expressIncome"
              label="物流佣金">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="goclearingds(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
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
  import {getclearing} from "@/components/api/clearing";

  export default {
    components: {
      top,
    },
    data() {
      return {
        options: CityInfo,
        value1: [(new Date(new Date().getFullYear(), new Date().getMonth(), 1)), new Date()],
        size: 10,
        page: 1,
        total: 10,
        province: '',
        city: '',
        zone: '',
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
      goclearingds(row) {
        let a = row.id;
        this.$router.push({name: 'clearingds', query: {id: a}});
      },
      getList() {
        console.log(this.value1);
        let cityData = this.$refs.cascader.currentLabels;
        if (this.value1 && cityData[0]) {
          let b = {
            starttime: this.value1[0].getTime(),
            endtime: this.value1[1].getTime() + 86400000,
            province: cityData[0] || '',
            city: cityData[1] || '',
            area: cityData[2] || '',
          };
          getclearing(b).then((res) => {
            res.data.data.forEach((value) => {
              value.incomeTotal = (value.incomeTotal / 100).toFixed(1);
              value.rechargeTotal = (value.rechargeTotal / 100).toFixed(1);
              value.refundTotal = (value.refundTotal / 100).toFixed(1);
              value.laundryTotal = (value.laundryTotal / 100).toFixed(1);
              value.highLaundryTotal = (value.highLaundryTotal / 100).toFixed(1);
              value.furnitureTotal = (value.furnitureTotal / 100).toFixed(1);
              value.mallTotal = (value.mallTotal / 100).toFixed(1);
              value.agentIncome = (value.agentIncome / 100).toFixed(1);
              value.platformIncome = (value.platformIncome / 100).toFixed(1);
              value.expressIncome = (value.expressIncome / 100).toFixed(1);
            });
            this.total = res.data.data.length;
            let arr = res.data.data;
            let currentArr = [];
            let page = this.size;
            let currentPage = this.page;
            let StartNum = (currentPage - 1) * page;
            let EndNum = currentPage * page;
            for (let i = StartNum; i < EndNum; i++) {
              if (!arr[i]) {
                break;
              }
              currentArr.push(arr[i]);
            }
            this.tableData = currentArr;//显示的数据
          })
        } else if (this.value1 === null && cityData[0]) {
          let b = {
            province: cityData[0] || '',
            city: cityData[1] || '',
            area: cityData[2] || '',
          };
          getclearing(b).then((res) => {
            res.data.data.forEach((value) => {
              value.incomeTotal = (value.incomeTotal / 100).toFixed(1);
              value.rechargeTotal = (value.rechargeTotal / 100).toFixed(1);
              value.refundTotal = (value.refundTotal / 100).toFixed(1);
              value.laundryTotal = (value.laundryTotal / 100).toFixed(1);
              value.highLaundryTotal = (value.highLaundryTotal / 100).toFixed(1);
              value.furnitureTotal = (value.furnitureTotal / 100).toFixed(1);
              value.mallTotal = (value.mallTotal / 100).toFixed(1);
              value.agentIncome = (value.agentIncome / 100).toFixed(1);
              value.platformIncome = (value.platformIncome / 100).toFixed(1);
              value.expressIncome = (value.expressIncome / 100).toFixed(1);
            });
            this.total = res.data.data.length;
            let arr = res.data.data;
            let currentArr = [];
            let page = this.size;
            let currentPage = this.page;
            let StartNum = (currentPage - 1) * page;
            let EndNum = currentPage * page;
            for (let i = StartNum; i < EndNum; i++) {
              if (!arr[i]) {
                break;
              }
              currentArr.push(arr[i]);
            }
            this.tableData = currentArr;//显示的数据
          })
        } else if (this.value1 && cityData[0] === undefined) {
          let b = {
            starttime: this.value1[0].getTime(),
            endtime: this.value1[1].getTime() + 86400000,
          };
          getclearing(b).then((res) => {
            res.data.data.forEach((value) => {
              value.incomeTotal = (value.incomeTotal / 100).toFixed(1);
              value.rechargeTotal = (value.rechargeTotal / 100).toFixed(1);
              value.refundTotal = (value.refundTotal / 100).toFixed(1);
              value.laundryTotal = (value.laundryTotal / 100).toFixed(1);
              value.highLaundryTotal = (value.highLaundryTotal / 100).toFixed(1);
              value.furnitureTotal = (value.furnitureTotal / 100).toFixed(1);
              value.mallTotal = (value.mallTotal / 100).toFixed(1);
              value.agentIncome = (value.agentIncome / 100).toFixed(1);
              value.platformIncome = (value.platformIncome / 100).toFixed(1);
              value.expressIncome = (value.expressIncome / 100).toFixed(1);
            });
            this.total = res.data.data.length;
            let arr = res.data.data;
            let currentArr = [];
            let page = this.size;
            let currentPage = this.page;
            let StartNum = (currentPage - 1) * page;
            let EndNum = currentPage * page;
            for (let i = StartNum; i < EndNum; i++) {
              if (!arr[i]) {
                break;
              }
              currentArr.push(arr[i]);
            }
            this.tableData = currentArr;//显示的数据
          })
        } else if (this.value1 === null && cityData[0] === undefined) {
          let a = new Date();
          let b = {
            starttime: 0,
            endtime: a.getTime(),
          };
          getclearing(b).then((res) => {
            res.data.data.forEach((value) => {
              value.incomeTotal = (value.incomeTotal / 100).toFixed(1);
              value.rechargeTotal = (value.rechargeTotal / 100).toFixed(1);
              value.refundTotal = (value.refundTotal / 100).toFixed(1);
              value.laundryTotal = (value.laundryTotal / 100).toFixed(1);
              value.highLaundryTotal = (value.highLaundryTotal / 100).toFixed(1);
              value.furnitureTotal = (value.furnitureTotal / 100).toFixed(1);
              value.mallTotal = (value.mallTotal / 100).toFixed(1);
              value.agentIncome = (value.agentIncome / 100).toFixed(1);
              value.platformIncome = (value.platformIncome / 100).toFixed(1);
              value.expressIncome = (value.expressIncome / 100).toFixed(1);
            });
            this.total = res.data.data.length;
            let arr = res.data.data;
            let currentArr = [];
            let page = this.size;
            let currentPage = this.page;
            let StartNum = (currentPage - 1) * page;
            let EndNum = currentPage * page;
            for (let i = StartNum; i < EndNum; i++) {
              if (!arr[i]) {
                break;
              }
              currentArr.push(arr[i]);
            }
            this.tableData = currentArr;//显示的数据
          })
        }
      },
      search() {
        this.getList();
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

  .logo1 img {
    width: 200px;
    height: 30px;

  }

  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 3% 0;
  }

  .el-bb {
    margin-bottom: 3%;
  }
</style>
