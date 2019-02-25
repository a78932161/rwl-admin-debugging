<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="aa()">订单管理</span></el-breadcrumb-item>
        <el-breadcrumb-item>订单分析</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ord-content">
      <div class="ord-content1">
        <div>
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
        </div>
      </div>
      <div>
        <el-cascader
          placeholder="试试搜索：浙江"
          :options="options"
          filterable
          change-on-select
          clearable
          @change="cascader"
        ></el-cascader>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
    </div>
    <div class="ord-content2">
      <el-table
        :data="tableData"
        show-summary
        stripe
        :summary-method="getSummaries"
        style="width: 100%">
        <el-table-column
          prop="category"
          label="类目"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orderCount"
          label="订单数">
        </el-table-column>
        <el-table-column
          prop="unitPrice"
          label="单价均价">
        </el-table-column>
        <el-table-column
          prop="number"
          label="商品数量">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="110">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goOrder(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import {analysis} from "@/components/api/order";

  export default {
    data() {
      return {
        options: CityInfo,
        tableData: [],
        value1: null,
        balance: 0,
        Wechat: 0,
        cardPay: 0,
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
      }
    },
    methods: {
      getList() {
        this.balance = 0;
        this.Wechat = 0;
        this.cardPay = 0;
        if (this.value1 && this.province) {
          let b = {
            starttime: this.value1[0].getTime(),
            endtime: this.value1[1].getTime() + 86400000,
            province: this.province,
            city: this.city,
            area: this.zone,
          };
          analysis(b).then((res) => {
            res.data.data.forEach((value) => {
              this.balance += value.balancePay;
              this.Wechat += value.weChatPay;
              this.cardPay += value.cardPay;
            });
            this.tableData = res.data.data;
          });
        } else if (this.value1 === null && this.province === '') {
          let a = new Date();
          let b = {
            starttime: 0,
            endtime: a.getTime(),
          };
          analysis(b).then((res) => {
            res.data.data.forEach((value) => {
              this.balance += value.balancePay;
              this.Wechat += value.weChatPay;
              this.cardPay += value.cardPay;
            });
            this.tableData = res.data.data;
          });
        } else if (this.value1 === null && this.province) {
          let b = {
            province: this.province,
            city: this.city,
            area: this.zone,
          };
          analysis(b).then((res) => {
            res.data.data.forEach((value) => {
              this.balance += value.balancePay;
              this.Wechat += value.weChatPay;
              this.cardPay += value.cardPay;
            });
            this.tableData = res.data.data;
          });
        } else if (this.value1 && this.province === '') {
          let b = {
            starttime: this.value1[0].getTime(),
            endtime: this.value1[1].getTime() + 86400000,
          };
          analysis(b).then((res) => {
            res.data.data.forEach((value) => {
              this.balance += value.balancePay;
              this.Wechat += value.weChatPay;
              this.cardPay += value.cardPay;
            });
            this.tableData = res.data.data;
          });
        }
      },
      getSummaries(param) {
        const {columns} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '支付类型';
            return;
          }
          if (index === 1) {
            sums[index] = '微信支付:' + this.Wechat;
          }
          if (index === 2) {
            sums[index] = '余额支付:' + this.balance;
          }
          if (index === 3) {
            sums[index] = '卡支付:' + this.cardPay;
          }
        });
        return sums;
      },
      aa() {
        this.$emit('goIndex1', true);
      },
      search() {
        this.getList();
      },
      cascader(value) {
        this.province = '';
        this.options.forEach((value1) => {
          if (value[0] == value1.value) {
            value1.children.forEach((value2) => {
              if (value[1] == value2.value) {
                value2.children.forEach((value3) => {
                  if (value[2] == value3.value) {
                    this.province = value1.label;
                    this.city = value2.label;
                    this.zone = value3.label;
                  }
                })
              }
            })
          }
        })
      },

      goOrder(row) {
        let a = JSON.parse(localStorage.getItem("info"));
        switch (row.category) {
          case "洗衣":
            if (a.functionAuthority.indexOf('A1') > -1) {
              this.$router.push('newLaundry');
            } else {
              this.$message({
                message: '没有权限!',
                type: 'warning'
              });
            }
            break;
          case "高端洗护":
            if (a.functionAuthority.indexOf('A2') > -1) {
              this.$router.push('newDesigner');
            } else {
              this.$message({
                message: '没有权限!',
                type: 'warning'
              });
            }
            break;
          case "小让家居":
            if (a.functionAuthority.indexOf('A3') > -1) {
              this.$router.push('newFurniture');
            } else {
              this.$message({
                message: '没有权限!',
                type: 'warning'
              });
            }
            break;
          case "小让商城":
            if (a.functionAuthority.indexOf('A4') > -1) {
              this.$router.push('newMall');
            } else {
              this.$message({
                message: '没有权限!',
                type: 'warning'
              });
            }
            break;
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
    margin: 0 0 3% 0;
    text-align: center;
  }

  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 3% 0;
  }

  .ord-content1 {
    display: flex;
    width: 30%;
  }
</style>
