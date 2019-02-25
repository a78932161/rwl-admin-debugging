<template>
  <div>
    <div class="vipTop">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex">会员管理</span></el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex1">消费统计</span></el-breadcrumb-item>
        <el-breadcrumb-item>衣物明细统计</el-breadcrumb-item>
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
          :picker-options="pickerOptions2"
          @blur="timeFind">
        </el-date-picker>
      </div>
      <div>
        <el-cascader
          placeholder="试试搜索：浙江"
          ref="cascader"
          :options="options"
          filterable
          change-on-select
          clearable
        ></el-cascader>
        <el-button type="primary" @click="timeFind">查询</el-button>
      </div>

    </div>
    <div class="vipyw">
      <div></div>
      衣物明细
    </div>
    <div>
      <el-card>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item :title="item.name" v-for="(item,index) in tableList" :key="index">
            <el-table
              :data="item.list"
              style="width: 100%">
              <el-table-column
                prop="productName"
                label="商品名">
              </el-table-column>
              <el-table-column
                prop="percentage"
                label="百分百">
              </el-table-column>
              <el-table-column
                prop="count"
                label="件数">
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-card>

    </div>
  </div>

</template>

<script>
  import "@/assets/js/city-data"
  import {xygetDetails, xhgetDetails, scgetDetails, jjgetDetails} from "@/components/api/clothingDetail";

  export default {
    props: ["qaq"],

    data() {
      return {
        options: CityInfo,
        value1: null,
        activeName: '0',
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
        tableList: [],
      }
    },
    methods: {
      goIndex() {
        this.$emit('goIndex2', true);
      },
      goIndex1() {
        this.$emit('goIndex1', true);
      },
      getList() {
        let data = [];
        if (this.qaq == 1) {
          if (this.value1 != null && this.$refs.cascader.currentLabels.length === 0) {//有时间
            data = {
              startime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
            }
          } else if (this.value1 === null && this.$refs.cascader.currentLabels.length > 0) {//有地区
            data = {
              area: this.$refs.cascader.currentLabels[0],
              province: this.$refs.cascader.currentLabels[1],
              city: this.$refs.cascader.currentLabels[2],
            }
          } else if (this.value1 && this.$refs.cascader.currentLabels.length > 0) {//都有
            data = {
              startime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              area: this.$refs.cascader.currentLabels[0],
              province: this.$refs.cascader.currentLabels[1],
              city: this.$refs.cascader.currentLabels[2],
            }
          } else if (this.value1 === null && this.$refs.cascader.currentLabels.length === 0) {//都没有
            data = {};
          }

          xygetDetails(data).then((res) => {
            let a = [];
            let b = [];
            let cities = {};
            if (res.data.code === 0) {
              res.data.data.content.forEach((value) => {
                let val = parseInt(value.count / res.data.data.total * 100) + '%';
                let key = 'percentage';
                value[key] = val;
              });
              res.data.data.content.forEach((value) => {
                if (a.indexOf(value.category) === -1) {
                  a.push(value.category);
                }
              });
              res.data.data.content.forEach(function (item, index, array) {
                cities[item.category] = cities[item.category] || [];
                cities[item.category].push(item);
              });
              a.forEach((value1) => {
                switch (value1) {
                  case 0:
                    b.push({name: '上衣类', value: 0, list: cities[0]});
                    break;
                  case 1:
                    b.push({name: '裤裙类', value: 1, list: cities[1]});
                    break;
                  case 2:
                    b.push({name: '皮草类', value: 2, list: cities[2]});
                    break;
                  case 3:
                    b.push({name: '装饰类', value: 3, list: cities[3]});
                    break;
                  case 4:
                    b.push({name: '鞋包类', value: 4, list: cities[4]});
                    break;
                }
              });
              this.tableList = b;
            }else {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning'
              });
            }
          })
        } else if (this.qaq == '2') {
          if (this.value1 != null && this.$refs.cascader.currentLabels.length === 0) {//有时间
            data = {
              startime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
            }
          } else if (this.value1 === null && this.$refs.cascader.currentLabels.length > 0) {//有地区
            data = {
              area: this.$refs.cascader.currentLabels[0],
              province: this.$refs.cascader.currentLabels[1],
              city: this.$refs.cascader.currentLabels[2],
            }
          } else if (this.value1 && this.$refs.cascader.currentLabels.length > 0) {//都有
            data = {
              startime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              area: this.$refs.cascader.currentLabels[0],
              province: this.$refs.cascader.currentLabels[1],
              city: this.$refs.cascader.currentLabels[2],
            }
          } else if (this.value1 === null && this.$refs.cascader.currentLabels.length === 0) {//都没有
            data = {};
          }
          xhgetDetails(data).then((res) => {
            let a = [];
            let b = [];
            let cities = {};
            if (res.data.code === 0) {
              res.data.data.content.forEach((value) => {
                let val = parseInt(value.count / res.data.data.total * 100) + '%';
                let key = 'percentage';
                value[key] = val;
              });
              res.data.data.content.forEach((value) => {
                if (a.indexOf(value.category) === -1) {
                  a.push(value.category);
                }
              });
              res.data.data.content.forEach(function (item, index, array) {
                cities[item.category] = cities[item.category] || [];
                cities[item.category].push(item);
              });
              a.forEach((value1) => {
                switch (value1) {
                  case 0:
                    b.push({name: '上衣类', value: 0, list: cities[0]});
                    break;
                  case 1:
                    b.push({name: '裤裙类', value: 1, list: cities[1]});
                    break;
                  case 2:
                    b.push({name: '皮草类', value: 2, list: cities[2]});
                    break;
                  case 3:
                    b.push({name: '装饰类', value: 3, list: cities[3]});
                    break;
                  case 4:
                    b.push({name: '鞋包类', value: 4, list: cities[4]});
                    break;
                }
              });
              this.tableList = b;
            }else {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning'
              });
            }
          })
        } else if (this.qaq == '3') {
          if (this.value1 != null && this.$refs.cascader.currentLabels.length === 0) {//有时间
            data = {
              startime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
            }
          } else if (this.value1 === null && this.$refs.cascader.currentLabels.length > 0) {//有地区
            data = {
              area: this.$refs.cascader.currentLabels[0],
              province: this.$refs.cascader.currentLabels[1],
              city: this.$refs.cascader.currentLabels[2],
            }
          } else if (this.value1 && this.$refs.cascader.currentLabels.length > 0) {//都有
            data = {
              startime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              area: this.$refs.cascader.currentLabels[0],
              province: this.$refs.cascader.currentLabels[1],
              city: this.$refs.cascader.currentLabels[2],
            }
          } else if (this.value1 === null && this.$refs.cascader.currentLabels.length === 0) {//都没有
            data = {};
          }

          jjgetDetails(data).then((res) => {
            let a = [];
            let b = [];
            let cities = {};
            if (res.data.code === 0) {
              res.data.data.content.forEach((value) => {
                let val = parseInt(value.count / res.data.data.total * 100) + '%';
                let key = 'percentage';
                value[key] = val;
              });
              res.data.data.content.forEach((value) => {
                if (a.indexOf(value.category) === -1) {
                  a.push(value.category);
                }
              });
              res.data.data.content.forEach(function (item, index, array) {
                cities[item.category] = cities[item.category] || [];
                cities[item.category].push(item);
              });
              a.forEach((value1) => {
                switch (value1) {
                  case null:
                    b.push({name: '家具类', value: 0, list: cities[0]});
                    break;
                }
              });
              this.tableList = b;
            }else {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning'
              });
            }
          })
        } else if (this.qaq == '4') {
          if (this.value1 != null && this.$refs.cascader.currentLabels.length === 0) {//有时间
            data = {
              startime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
            }
          } else if (this.value1 === null && this.$refs.cascader.currentLabels.length > 0) {//有地区
            data = {
              area: this.$refs.cascader.currentLabels[0],
              province: this.$refs.cascader.currentLabels[1],
              city: this.$refs.cascader.currentLabels[2],
            }
          } else if (this.value1 && this.$refs.cascader.currentLabels.length > 0) {//都有
            data = {
              startime: this.value1[0].getTime(),
              endtime: this.value1[1].getTime()+86400000,
              area: this.$refs.cascader.currentLabels[0],
              province: this.$refs.cascader.currentLabels[1],
              city: this.$refs.cascader.currentLabels[2],
            }
          } else if (this.value1 === null && this.$refs.cascader.currentLabels.length === 0) {//都没有
            data = {};
          }
          scgetDetails(data).then((res) => {
            let a = [];
            let b = [];
            let cities = {};
            if (res.data.code === 0) {
              res.data.data.content.forEach((value) => {
                let val = parseInt(value.count / res.data.data.total * 100) + '%';
                let key = 'percentage';
                value[key] = val;
              });
              res.data.data.content.forEach((value) => {
                if (a.indexOf(value.category) === -1) {
                  a.push(value.category);
                }
              });
              res.data.data.content.forEach(function (item, index, array) {
                cities[item.category] = cities[item.category] || [];
                cities[item.category].push(item);
              });
              a.forEach((value1) => {
                switch (value1) {
                  case 0:
                    b.push({name: '生活用品类', value: 0, list: cities[0]});
                    break;
                  case 1:
                    b.push({name: '服务类', value: 1, list: cities[1]});
                    break;
                  case 2:
                    b.push({name: '鞋服类', value: 2, list: cities[2]});
                    break;
                  case 3:
                    b.push({name: '家电类', value: 3, list: cities[3]});
                    break;
                }
              });
              this.tableList = b;
            }else {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning'
              });
            }
          })
        }
      },
      timeFind() {
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

  .vipTop {
    margin-bottom: 3%;
  }

  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 3% 0;
  }

  .vipRadio {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3%;
  }

  .vipRadio label {
    margin-right: 3%;
  }

  .vipyw {
    border-bottom: 1px solid rgb(20, 190, 240);
    width: 20%;
    display: flex;
    color: rgb(20, 190, 240);
    font-weight: bolder;
    margin-bottom: 3%;
    letter-spacing: 1px;
  }

  .vipyw div {
    width: 25px;
    height: 25px;
    background: rgb(20, 190, 240);
    margin: 0 5% -1px 0;
  }

  .viptable {
    margin-bottom: 3%;
  }
</style>
