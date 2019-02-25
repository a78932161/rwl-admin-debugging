<template>
  <div>
    <div v-if="!old">
      <div class="ord-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><span @click="aa()">订单管理</span></el-breadcrumb-item>
          <el-breadcrumb-item>订单派单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ord-content">
        <div>
          <el-cascader
            placeholder="试试搜索：浙江"
            :options="options"
            ref="cascader"
            filterable
            change-on-select
            clearable
          ></el-cascader>
          <el-button type="primary" @click="getList()">查询</el-button>
        </div>
      </div>
      <div class="ord-content4">
        <el-button type="primary" v-if="A1" @click="goLaundry">洗衣<br>{{items.洗衣}}</el-button>
        <el-button type="primary" v-if="A2" @click="goDesigner">高端洗护<br>{{items.高端洗护}}</el-button>
        <el-button type="primary" v-if="A3" @click="goFurniture">小让家居<br>{{items.家具}}</el-button>
        <el-button type="primary" v-if="A4" @click="goMall">小让商城<br>{{items.商城}}</el-button>
        <el-button type="primary" @click="goOld">旧订单</el-button>
      </div>
    </div>
    <order-old v-if="old" @goIndex1="goindex"></order-old>
  </div>

</template>

<script>
  import "@/assets/js/city-data"
  import {orderNumber} from "@/components/api/order";
  import orderOld from "@/components/orders/orderCenter/orderCenter-Old/index"

  export default {
    components: {
      orderOld
    },
    data() {
      return {
        a: 10,
        options: CityInfo,
        items: [],
        value1: '',
        A1: false,
        A2: false,
        A3: false,
        A4: false,
        old: false,
      }
    },
    methods: {
      getList() {
        if (localStorage.getItem("info")) {
          let b = JSON.parse(localStorage.getItem("info"));
          if (b.functionAuthority.indexOf('A1') > -1) {
            this.A1 = true;
          }
          if (b.functionAuthority.indexOf('A2') > -1) {
            this.A2 = true;
          }
          if (b.functionAuthority.indexOf('A3') > -1) {
            this.A3 = true;
          }
          if (b.functionAuthority.indexOf('A4') > -1) {
            this.A4 = true;
          }
        }
        if (this.$refs.cascader.currentLabels) {
          let a = new Date();
          let b = {
            starttime: a.getTime() - 3600 * 1000 * 24,
            endtime: a.getTime(),
            province: this.$refs.cascader.currentLabels[0],
            city: this.$refs.cascader.currentLabels[1],
            area: this.$refs.cascader.currentLabels[2] || '',
          };
          orderNumber(b).then((res) => {
            this.items = res.data.data;
          })
        }

        let a = new Date();
        let b = {
          starttime: a.getTime() - 3600 * 1000 * 24,
          endtime: a.getTime(),
        };
        orderNumber(b).then((res) => {
          this.items = res.data.data;
        })

      },

      aa() {
        this.$emit('goIndex', true);
      },
      goindex(data) {
        this.old = false;
      },
      goLaundry() {
        this.$router.push('/newLaundry');
      },
      goDesigner() {
        this.$router.push('/newDesigner');
      },
      goFurniture() {
        this.$router.push('/newFurniture');
      },
      goMall() {
        this.$router.push('/newMall');
      },
      goOld() {
        this.old = true;
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

  .ord-content3 {
    margin: 10px auto;
  }

  .ord-content3-l {
    margin: 0 10px 0 0;
  }

  .ord-content4 {
    display: flex;
    justify-content: space-around;
  }

  .ord-content4 button {
    width: 180px;
    height: 80px;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 30px;
  }

</style>
