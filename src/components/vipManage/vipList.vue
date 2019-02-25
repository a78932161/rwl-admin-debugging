<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="aa">会员管理</span></el-breadcrumb-item>
        <el-breadcrumb-item>会员列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ord-content">
      <div class="ord-content1">
        <el-input placeholder="请输入手机号" v-model="value"></el-input>
        <el-button type="primary" @click="getcx()">查询</el-button>
      </div>
      <div>
        <el-date-picker
          v-model="value1"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
      <div>
        <el-cascader
          ref="cascader"
          placeholder="试试搜索：浙江"
          :options="options"
          filterable
          change-on-select
          clearable
        ></el-cascader>
        <el-button type="primary" @click="getList()">查询</el-button>
      </div>
    </div>
    <div class="ord-content2">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="number"
          label="会员ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="cno"
          label="会员卡">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="绑定手机">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="账户余额">
        </el-table-column>
        <el-table-column
          prop="frequency"
          label="消费次数">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="注册时间"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goBalance(scope.row)">查看详情</el-button>
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
    </div>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import {getvip, vipConsumption, getvips, cxNumber, cxPhone, Consumption} from "@/components/api/vipss";

  export default {

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
        tableData: [],
        options: CityInfo,
        value1: null,
        page: 1,
        size: 10,
        total: 10,
        value: '',
      }
    },
    methods: {
      getList() {
        if (this.$store.state.vipId === 3) {
          let cityData = this.$refs.cascader.currentLabels;
          let a;
          if (this.value1 === null && cityData[0] === undefined) {
            a = {
              page: this.page,
              size: this.size,
            };
          } else if (this.value1 && cityData[0] === undefined) {
            a = {
              starttime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              page: this.page,
              size: this.size,
            };

          } else if (this.value1 === null && cityData[0]) {
            a = {
              province: cityData[0] || '',
              city: cityData[1] || '',
              area: cityData[2] || '',
              page: this.page,
              size: this.size,
            };

          } else if (this.value1 && cityData[0]) {
            a = {
              starttime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              province: cityData[0] || '',
              city: cityData[1] || '',
              area: cityData[2] || '',
              page: this.page,
              size: this.size,
            };
          }
          getvip(a).then((res) => {
            if (res.data.data.content) {
              res.data.data.content.forEach((value) => {
                value.createtime = this.getLocalTime(value.createtime);             value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
                value.balance = value.balance / 100;
              });
              this.tableData = res.data.data.content;
              this.total = res.data.data.totalElements;
            }
          })

        } else if (this.$store.state.vipId === 0 || this.$store.state.vipId === 1) {
          let cityData = this.$refs.cascader.currentLabels;
          let a;
          if (this.value1 === null && cityData[0] === undefined) {
            a = {
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };
          } else if (this.value1 && cityData[0] === undefined) {
            a = {
              starttime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };
          } else if (this.value1 === null && cityData[0]) {
            a = {
              province: cityData[0] || '',
              city: cityData[1] || '',
              area: cityData[2] || '',
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };

          } else if (this.value1 && cityData[0]) {
            a = {
              starttime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              province: cityData[0] || '',
              city: cityData[1] || '',
              area: cityData[2] || '',
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };
          }
          vipConsumption(a).then((res) => {
            if (res.data.data.content) {
              res.data.data.content.forEach((value) => {
                value.createtime = this.getLocalTime(value.createtime);             value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
                value.balance = value.balance / 100;
              });
              this.tableData = res.data.data.content;
              this.total = res.data.data.totalElements;
            }
          })

        } else if (this.$store.state.vipId === 4) {
          let cityData = this.$refs.cascader.currentLabels;
          let a;
          if (this.value1 === null && cityData[0] === undefined) {
            a = {
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };
          } else if (this.value1 && cityData[0] === undefined) {
            a = {
              starttime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };

          } else if (this.value1 === null && cityData[0]) {
            a = {
              province: cityData[0] || '',
              city: cityData[1] || '',
              area: cityData[2] || '',
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };

          } else if (this.value1 && cityData[0]) {
            a = {
              starttime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              province: cityData[0] || '',
              city: cityData[1] || '',
              area: cityData[2] || '',
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };
          }
          getvips(a).then((res) => {
            if (res.data.data.content) {
              res.data.data.content.forEach((value) => {
                value.createtime = this.getLocalTime(value.createtime);             value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
                value.balance = value.balance / 100;
              });
              this.tableData = res.data.data.content;
              this.total = res.data.data.totalElements;
            }
          })
        } else if (this.$store.state.vipId === 2) {
          let cityData = this.$refs.cascader.currentLabels;
          let a;
          if (this.value1 === null && cityData[0] === undefined) {
            a = {
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };
          } else if (this.value1 && cityData[0] === undefined) {
            a = {
              starttime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };

          } else if (this.value1 === null && cityData[0]) {
            a = {
              province: cityData[0] || '',
              city: cityData[1] || '',
              area: cityData[2] || '',
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };

          } else if (this.value1 && cityData[0]) {
            a = {
              starttime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              province: cityData[0] || '',
              city: cityData[1] || '',
              area: cityData[2] || '',
              page: this.page,
              size: this.size,
              status: this.$store.state.vipId,
            };
          }
          Consumption(a).then((res) => {
            if (res.data.data.content) {
              res.data.data.content.forEach((value) => {
                value.createtime = this.getLocalTime(value.createtime);             value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
                value.balance = value.balance / 100;
              });
              this.tableData = res.data.data.content;
              this.total = res.data.data.totalElements;
            }
          })
        }
      },
      aa() {
        this.$emit('goIndex', true);
      },
      goBalance(row) {
        let a = row.id;
        this.$router.push({name: 'balance', query: {id: a}});
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      getcx() {
        if (this.value.length == 11) {
          this.tableData = [];
          let a = {
            phone: this.value
          };
          cxPhone(a).then((res) => {
            if (res.data.code == 0) {
              this.tableData.push(res.data.data);
            }
          })
        } else if (this.value == '') {
          this.getList();
        } else {
          this.tableData = [];
          this.total = 0;
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

  .ord-content2 {

  }


</style>
