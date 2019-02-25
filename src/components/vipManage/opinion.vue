<template>
  <div>
    <div class="onTop">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex">会员管理</span></el-breadcrumb-item>
        <el-breadcrumb-item>意见反馈</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="onContent">
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
        <el-button type="primary" @click="inquire">查询</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        borderd
        stripe
        style="width: 100%">
        <el-table-column
          prop="memberId"
          label="会员ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="反馈时间">
        </el-table-column>
        <el-table-column
          prop="content"
          label="反馈内容">
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
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import {feedback} from "@/components/api/vipss";

  export default {
    name: "opinion",
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
        tableData: []
      }
    },
    methods: {
      getList() {
        if (this.value1) {
          let a = {
            starttime: this.value1[0].getTime(),
            endtime: this.value1[1].getTime()+86400000,
            size: this.size,
            page: this.page,
          };
          feedback(a).then((res) => {
            this.tableData = res.data.data.content;
            this.tableData.forEach((value) => {
              value.createtime = this.getLocalTime(value.createtime);             value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
            });
            this.total = res.data.data.totalElements;
          })
        } else {
          let a = {
            size: this.size,
            page: this.page,
          };
          feedback(a).then((res) => {
            this.tableData = res.data.data.content;
            this.tableData.forEach((value) => {
              value.createtime = this.getLocalTime(value.createtime);             value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
            });
            this.total = res.data.data.totalElements;
          })
        }
      },
      goIndex() {
        this.$emit('goIndex', true);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      inquire() {
        this.getList();
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped>
  .onTop {
    margin-bottom: 3%;
  }

  .el-breadcrumb {
    font-size: 18px;
  }

  .onContent {
    display: flex;
    justify-content: center;
    margin-bottom: 3%;
  }
</style>
