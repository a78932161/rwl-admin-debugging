<template>
  <div>
    <div v-show="isDiv">
      <div class="vipTop">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><span @click="goIndex">会员管理</span></el-breadcrumb-item>
          <el-breadcrumb-item>消费统计</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ord-content">
        <div>
          <el-date-picker
            v-model="value1"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
            @change="timeFind">
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
      <div class="vipRadio">
        <el-radio v-model="radio" label="1" border size="medium">洗衣</el-radio>
        <el-radio v-model="radio" label="2" border size="medium">高端洗护</el-radio>
        <el-radio v-model="radio" label="3" border size="medium">小让家居</el-radio>
        <el-radio v-model="radio" label="4" border size="medium">小让商城</el-radio>
      </div>
      <div class="vipyw">
        <div></div>
        衣物 TOP10
      </div>
      <div style="display: flex">
        <div id="myChart" :style="{width: '500px', height: '700px'}"></div>
        <el-card style="width: 80%;line-height: 30px">
          <div class="vip1" v-for="(item,index) in opinionData">
            <label>{{index+1}} {{item.name}}</label>
            <label>{{item.scale}}</label>
            <label>{{item.value}}</label>
          </div>
          <div style="text-align: center">
            <el-button type="primary" size="mini" @click="gocdl">查看详情</el-button>
          </div>
        </el-card>
      </div>
      <div class="vipyw">
        <div></div>
        消费次数
      </div>
      <div class="viptable">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="title"
            label="次数">
          </el-table-column>
          <el-table-column
            prop="number"
            label="人数">
          </el-table-column>
        </el-table>
      </div>
      <div class="vipyw">
        <div></div>
        消费金额
      </div>
      <div class="viptable">
        <el-table
          :data="tableData1"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="title"
            label="价位">
          </el-table-column>
          <el-table-column
            prop="number"
            label="人数">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <cdl v-if="isCdl" @goIndex1="goIndex1" @goIndex2="goIndex" :qaq="index"></cdl>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import echarts from 'echarts'
  import cdl from '@/components/vipManage/clothingDetail'
  import {xyConsumption, gdxhConsumption, xrjjConsumption, xrscConsumption} from '@/components/api/vipss'

  export default {
    components: {
      cdl
    },
    data() {
      return {
        isCdl: false,
        isDiv: true,
        charts: '',
        options: CityInfo,
        value1: null,
        radio: '1',
        opinion: [],
        opinionData: [],
        sum: 0,
        index: 1,
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
        tableData1: [],
      }
    },
    mounted() {
      this.getList(this.radio);
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.opinion,
          },
          series: [
            {
              name: '莫好克',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.opinionData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      gocdl() {
        this.isDiv = false;
        this.isCdl = true;
      },
      goIndex() {
        this.$emit('goIndex2', true);
      },

      goIndex1(data) {
        this.isDiv = data;
        this.isCdl = false;
      },
      getList(index) {
        this.opinionData = [];
        this.opinion = [];
        this.tableData1 = [];
        this.tableData = [];
        this.sum = 0;
        let data;
        if (index == '1') {
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
          xyConsumption(data).then((res) => {
            let a;
            let b;
            if (res.data.data) {
              res.data.data.consumeFrequency.forEach((value, index) => {
                if (index >= 11) {
                  a = {
                    title: 10 + '次以上',
                    number: value + '人'
                  };
                } else {
                  a = {
                    title: index + '次',
                    number: value + '人'
                  };
                }
                this.tableData.push(a);
              });
              res.data.data.consumePrice.forEach((value, index) => {
                if (index == 0) {
                  b = {
                    title: 100 + '元以下',
                    number: value + '人'
                  };
                } else if (index >= 10) {
                  b = {
                    title: 1001 + '元以上',
                    number: value + '人'
                  };
                } else {
                  b = {
                    title: index * 100 + 1 + '-' + (index * 100 + 100),
                    number: value + '人'
                  };
                }
                this.tableData1.push(b);
              });
              res.data.data.productTop.forEach((value) => {
                this.sum = this.sum + value.count
              });
              res.data.data.productTop.forEach((value, index) => {
                let a = {
                  value: value.count,
                  name: value.productName,
                  scale: Math.round((value.count / this.sum) * 100) + '%',
                };
                this.opinionData.push(a);
                this.opinion.push(value.productName);
              });
            }
            this.drawLine();
          })

        } else if (index == '2') {
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
          gdxhConsumption(data).then((res) => {
            let a;
            let b;
            if (res.data.data) {
              res.data.data.consumeFrequency.forEach((value, index) => {
                if (index >= 11) {
                  a = {
                    title: 10 + '次以上',
                    number: value + '人'
                  };
                } else {
                  a = {
                    title: index + '次',
                    number: value + '人'
                  };
                }
                this.tableData.push(a);
              });
              res.data.data.consumePrice.forEach((value, index) => {
                if (index == 0) {
                  b = {
                    title: 100 + '元以下',
                    number: value + '人'
                  };
                } else if (index >= 10) {
                  b = {
                    title: 1001 + '元以上',
                    number: value + '人'
                  };
                } else {
                  b = {
                    title: index * 100 + 1 + '-' + (index * 100 + 100),
                    number: value + '人'
                  };
                }
                this.tableData1.push(b);
              });
              res.data.data.productTop.forEach((value) => {
                this.sum = this.sum + value.count
              });
              res.data.data.productTop.forEach((value, index) => {
                let a = {
                  value: value.count,
                  name: value.productName,
                  scale: Math.round((value.count / this.sum) * 100) + '%',
                };
                this.opinionData.push(a);
                this.opinion.push(value.productName);
              });
            }
            this.drawLine();
          })
        } else if (index == '3') {
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
          xrjjConsumption(data).then((res) => {
            let a;
            let b;
            if (res.data.data) {
              res.data.data.consumeFrequency.forEach((value, index) => {
                if (index >= 11) {
                  a = {
                    title: 10 + '次以上',
                    number: value + '人'
                  };
                } else {
                  a = {
                    title: index + '次',
                    number: value + '人'
                  };
                }
                this.tableData.push(a);
              });
              res.data.data.consumePrice.forEach((value, index) => {
                if (index == 0) {
                  b = {
                    title: 100 + '元以下',
                    number: value + '人'
                  };
                } else if (index >= 10) {
                  b = {
                    title: 1001 + '元以上',
                    number: value + '人'
                  };
                } else {
                  b = {
                    title: index * 100 + 1 + '-' + (index * 100 + 100),
                    number: value + '人'
                  };
                }
                this.tableData1.push(b);
              });
              res.data.data.productTop.forEach((value) => {
                this.sum = this.sum + value.count
              });
              res.data.data.productTop.forEach((value, index) => {
                let a = {
                  value: value.count,
                  name: value.productName,
                  scale: Math.round((value.count / this.sum) * 100) + '%',
                };
                this.opinionData.push(a);
                this.opinion.push(value.productName);
              });
            }
            this.drawLine();
          })
        } else if (index == '4') {
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
          xrscConsumption(data).then((res) => {
            let a;
            let b;
            if (res.data.data) {
              res.data.data.consumeFrequency.forEach((value, index) => {
                if (index >= 11) {
                  a = {
                    title: 10 + '次以上',
                    number: value + '人'
                  };
                } else {
                  a = {
                    title: index + '次',
                    number: value + '人'
                  };
                }
                this.tableData.push(a);
              });
              res.data.data.consumePrice.forEach((value, index) => {
                if (index == 0) {
                  b = {
                    title: 100 + '元以下',
                    number: value + '人'
                  };
                } else if (index >= 10) {
                  b = {
                    title: 1001 + '元以上',
                    number: value + '人'
                  };
                } else {
                  b = {
                    title: index * 100 + 1 + '-' + (index * 100 + 100),
                    number: value + '人'
                  };
                }
                this.tableData1.push(b);
              });
              res.data.data.productTop.forEach((value) => {
                this.sum = this.sum + value.count
              });
              res.data.data.productTop.forEach((value, index) => {
                let a = {
                  value: value.count,
                  name: value.productName,
                  scale: Math.round((value.count / this.sum) * 100) + '%',
                };
                this.opinionData.push(a);
                this.opinion.push(value.productName);
              });
            }
            this.drawLine();
          })
        }
      },
      timeFind() {
        this.getList(this.radio);
      }

    },
    watch: {
      radio(curVal, oldVal) {
        if (curVal == '1') {
          this.getList(1);
          this.index = 1;
        } else if (curVal == '2') {
          this.getList(2);
          this.index = 2;
        } else if (curVal == '3') {
          this.getList(3);
          this.index = 3;
        } else if (curVal == '4') {
          this.getList(4);
          this.index = 4;
        }
      }
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

  .vip1 {
    display: flex;
    justify-content: space-between
  }

  .vip1 label {
    min-width: 46%;
  }
</style>
