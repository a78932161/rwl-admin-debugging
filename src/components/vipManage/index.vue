<template>
  <div>
    <div v-show="showFlag">
      <div class="ord-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ord-content2">
        <el-button type="primary" v-if="B1" class="ord-content2-bt" @click="gostatistics">会员统计</el-button>
        <el-button type="primary" v-if="B2" class="ord-content2-bt" @click="goConsumption">消费统计</el-button>
        <el-button type="primary" v-if="B3" @click="goOpinion">意见反馈</el-button>
      </div>
    </div>
    <statistics v-if="isStatistics" @goIndex1="goIndex1"></statistics>
    <consumption v-if="isConsumption" @goIndex2="goIndex2"></consumption>
    <opinion v-if="isOpinion" @goIndex="goIndex"></opinion>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import statistics from '@/components/vipManage/statistics'
  import consumption from '@/components/vipManage/consumption'
  import opinion from '@/components/vipManage/opinion'

  export default {
    components: {
      statistics,
      consumption,
      opinion
    },
    data() {
      return {
        showFlag: true,
        options: CityInfo,
        isStatistics: false,
        isConsumption: false,
        isOpinion: false,
        value1: '',
        B1: false,
        B2: false,
        B3: false,
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
      gostatistics() {
        this.showFlag = false;
        this.isStatistics = true;
      },
      goConsumption() {
        this.showFlag = false;
        this.isConsumption = true;
      },
      goOpinion() {
        this.showFlag = false;
        this.isOpinion = true;
      },
      goIndex(data) {
        this.showFlag = data;
        this.isOpinion = false;
      },
      goIndex1(data) {
        this.showFlag = data;
        this.isStatistics = false;
      },
      goIndex2(data) {
        this.showFlag = data;
        this.isConsumption = false;
      },
      getList() {
        if (localStorage.getItem("info")) {
          let b = JSON.parse(localStorage.getItem("info"));
          if (b.functionAuthority.indexOf('B1') > -1) {
            this.B1 = true;
          }
          if (b.functionAuthority.indexOf('B2') > -1) {
            this.B2 = true;
          }
          if (b.functionAuthority.indexOf('B3') > -1) {
            this.B3 = true;
          }
        }
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

  .ord-top {
    margin-bottom: 15%;
    text-align: center;
  }

  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 8% 0;
  }

  .ord-content2 {
    display: flex;
    justify-content: space-around;
  }

  .ord-content2 button {
    width: 250px;
    height: 80px;
    font-size: 25px;

  }

  .ord-content2-bt {
    margin: 0 50px 0 0;
  }
</style>
