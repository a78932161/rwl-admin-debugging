<template>
  <div>
    <top></top>
    <el-col :span="24" class="container">
      <el-col :span="4" :offset="4" class="vipAside">
        <div class="vipTop">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/vip' }">会员管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户余额</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-card class="vipInfo">
          <div><label>姓名: {{name}}</label></div>
          <div><label>ID: {{id}}</label></div>
          <div><label>手机: {{phone}}</label></div>
          <div><label>余额: {{balance}}</label></div>
        </el-card>
      </el-col>
      <!--<el-col :span="14">-->
      <!--<div style="margin-left: 5%">-->
      <!--<el-date-picker-->
      <!--v-model="value1"-->
      <!--type="daterange"-->
      <!--align="center"-->
      <!--unlink-panels-->
      <!--range-separator="至"-->
      <!--start-placeholder="开始日期"-->
      <!--end-placeholder="结束日期"-->
      <!--:picker-options="pickerOptions2">-->
      <!--</el-date-picker>-->
      <!--<el-button type="primary" @click="getList">查询</el-button>-->
      <!--</div>-->
      <!--</el-col>-->
      <el-col :span="14" class="vipMain">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="createtime"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="category"
            label="类目">
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额">
          </el-table-column>
          <el-table-column
            prop="balance"
            label="账号余额">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="110">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.category=='消费'" @click="goUserOrders(scope.row)">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
  import top from '@/assets/vue/top'
  import {getvip1, getrecords} from "@/components/api/vipss";

  export default {
    components: {
      top,
    },
    data() {
      return {
        tableData: [],
        name: '',
        id: '',
        phone: '',
        size: 10,
        page: 1,
        total: 10,
        balance: '',
        value1: '',
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
        let a = {
          userid: this.$route.query.id,
        };
        let b;
        getvip1(a).then((res) => {
          if (res.data.code === 0) {
            this.name = res.data.data.name;
            this.id = res.data.data.number;
            this.phone = res.data.data.phone;
            this.balance = res.data.data.balance / 100;
          }
        });
        if (this.value1) {
          b = {
            size: this.size,
            page: this.page,
            userid: this.$route.query.id,
            starttime: this.value1[0].getTime(),
            endtime: this.value1[1].getTime()+86400000,
          };
        } else {
          b = {
            size: this.size,
            page: this.page,
            userid: this.$route.query.id,
          };
        }
        getrecords(b).then((res1) => {
          if (res1.data.code === 0) {
            this.total = res1.data.data.totalElements;
            res1.data.data.content.forEach((value) => {
              value.createtime = this.getLocalTime(value.createtime);             value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
              value.balance = value.balance / 100;
              value.money = value.money / 100;
            });
            this.tableData = res1.data.data.content;
          }
        })
      },
      goUserOrders(row) {
        let a = row.orderId;
        this.$router.push({name: 'userOrders', query: {id: a}});
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      getcx() {

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

  .logo1 img {
    width: 200px;
    height: 30px;

  }

  .vipAside {

  }

  .vipTop {
    margin: 0 0 10% 0;
  }

  .vipInfo {
    width: 80%;
    padding: 5px;
    font-size: 18px;
    line-height: 40px;
  }

  .vipMain {
    margin: 2% 0 0 0;

  }
</style>
