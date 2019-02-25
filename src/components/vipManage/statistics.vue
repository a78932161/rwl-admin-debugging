<template>
  <div>
    <div v-show="showFlag">
      <div class="ord-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><span @click="goIndex1">会员管理</span></el-breadcrumb-item>
          <el-breadcrumb-item>会员统计</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ord-content">
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
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </div>
      <div class="ord-content2">
        <el-button type="primary" @click="goList(3)">全部会员<br>{{listData.allCount}}</el-button>
        <el-button type="primary" @click="goList(1)">已消费会员<br>{{listData.consumeCount}}</el-button>
        <el-button type="primary" @click="goList(0)">未消费会员<br>{{listData.unConsumeCount}}</el-button>
        <el-button type="primary" @click="goList(2)">充值会员<br>{{listData.depositCount}}</el-button>
        <el-button type="primary" @click="goList(4)">会员卡用户<br>{{listData.memberCount}}</el-button>
      </div>
    </div>
    <vip-list v-if="isList" @goIndex="goIndex"></vip-list>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import VipList from "@/components/vipManage/vipList"
  import {vipNumber} from "@/components/api/vipss";

  export default {
    components: {
      VipList
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
        value1: null,
        showFlag: true,
        isList: false,
        listData: [],
      }
    },
    methods: {
      getList() {
        let cityData = this.$refs.cascader.currentLabels;
        if (this.value1 ===null && cityData[0] === undefined) {
          let a = {};
          vipNumber(a).then((res) => {
            this.listData = res.data.data;
          })
        } else if (this.value1 && cityData[0] === undefined) {
          let a = {
            starttime: this.value1[0].getTime(),
            endtime: this.value1[1].getTime()+86400000,
          };
          vipNumber(a).then((res) => {
            this.listData = res.data.data;
          })
        } else if (this.value1 ===null && cityData[0]) {
          let a = {
            province: cityData[0] || '',
            city: cityData[1] || '',
            area: cityData[2] || '',
          };
          vipNumber(a).then((res) => {
            this.listData = res.data.data;
          })
        } else if (this.value1 && cityData[0]) {
          let a = {
            starttime: this.value1[0].getTime(),
            endtime: this.value1[1].getTime()+86400000,
            province: cityData[0] || '',
            city: cityData[1] || '',
            area: cityData[2] || '',
          };
          vipNumber(a).then((res) => {
            this.listData = res.data.data;
          })
        }
      },
      goList(index) {
        this.$store.state.vipId = index;
        this.showFlag = false;
        this.isList = true;
      },
      goIndex1() {
        this.$emit('goIndex1', true);
      },
      goIndex(data) {
        this.showFlag = data;
        this.isList = false;
      },
      search(){
        this.getList();
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
    margin: 0 0 8% 0;
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
    width: 180px;
    height: 80px;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 30px;
  }
</style>
