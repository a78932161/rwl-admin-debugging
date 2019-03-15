<template>
  <div class="ord-content">
    <div class="ord-content1">
      <el-input placeholder="请输入内容" v-model="value"></el-input>
      <el-button type="primary" @click="getcx()">查询</el-button>
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
</template>

<script>
  import "@/assets/js/city-data"
  import {xyinquire, jjinquire, scinquire, xycx, jjcx, sccx, xycx1, jjcx1, sccx1} from "@/components/api/inquire";
  import {mapState} from "vuex"

  export default {
    name: "inquire",
    data() {
      return {
        options: CityInfo,
        province: '',
        city: '',
        zone: '',
        value: '',
      }
    },
    methods: {
      getList() {
        this.$store.state.orderArea = [];
        let cityData = this.$refs.cascader.currentLabels;
        if (cityData[0] && cityData[1]) {
          let type = this.ieData.type;
          if (type === 1 || type === 2) {
            let a = {
              type: this.ieData.type,
              status: this.ieData.status,
              province: cityData[0] || '',
              city: cityData[1] || '',
              area: cityData[2] || '',
              size: this.ieData.size,
              page: this.ieData.page,
            };
            xyinquire(a).then((res) => {
              if (res.data.data.content.length > 0) {
                this.$store.state.orderArea.push(res.data.data);
                this.$emit('orderData', true);
              } else {
                this.$message({
                  message: '该地区无订单',
                  type: 'warning'
                });
              }
            })

          } else if (type === 3) {
            let b = {
              type: this.ieData.type,
              status: this.ieData.status,
              province: cityData[0] || '',
              city: cityData[1] || '',
              area: cityData[2] || '',
              size: this.ieData.size,
              page: this.ieData.page,
            };
            jjinquire(b).then((res) => {
              if (res.data.data.content.length > 0) {
                this.$store.state.orderArea.push(res.data.data);
                this.$emit('orderData', true);
              } else {
                this.$message({
                  message: '该地区无订单',
                  type: 'warning'
                });
              }
            })
          } else if (type === 4) {
            let c = {
              type: this.ieData.type,
              status: this.ieData.status,
              province: cityData[0] || '',
              city: cityData[1] || '',
              area: cityData[2] || '',
              size: this.ieData.size,
              page: this.ieData.page,
            };
            scinquire(c).then((res) => {
              if (res.data.data.content.length > 0) {
                this.$store.state.orderArea.push(res.data.data);
                this.$emit('orderData', true);
              } else {
                this.$message({
                  message: '该地区无订单',
                  type: 'warning'
                });
              }
            })
          }
        } else {
          this.$store.state.orderArea = [];
          this.$store.state.orderFind = [];
          this.$emit('orderData', true);
          this.$message({
            message: '请选择地区',
            type: 'warning'
          });
        }

      },
      getcx() {
        this.$store.state.orderFind = [];

        if (this.value) {
          let type = this.ieData.type;

          if (type === 1 || type === 2) {
            let a = {
              code: this.value,
              page: this.ieData.page,
              size: this.ieData.size,
              type: type,
            };
            xycx1(a).then((res) => {
              if (res.data.code === 0) {
                if (res.data.data.object != null) {
                  this.$store.state.orderFind = (res.data.data);
                  this.$emit('orderData', true);
                } else {
                  this.$message({
                    message: '订单不存在',
                    type: 'warning'
                  });
                }
              } else {
                this.$message({
                  message: '订单不存在',
                  type: 'warning'
                });
              }
            })
          } else if (type === 3) {
            let b = {
              code: this.value,
              page: this.ieData.page,
              size: this.ieData.size,
            };
            jjcx1(b).then((res) => {
              if (res.data.code === 0) {
                if (res.data.data.object != null) {
                  this.$store.state.orderFind = (res.data.data);
                  this.$emit('orderData', true);
                } else {
                  this.$message({
                    message: '订单不存在',
                    type: 'warning'
                  });
                }
              } else {
                this.$message({
                  message: '订单不存在',
                  type: 'warning'
                });
              }
            })
          } else if (type === 4) {
            let c = {
              code: this.value,
              page: this.ieData.page,
              size: this.ieData.size,
            };
            sccx1(c).then((res) => {
              if (res.data.code === 0) {
                if (res.data.data.object != null) {
                  this.$store.state.orderFind = (res.data.data);
                  this.$emit('orderData', true);
                } else {
                  this.$message({
                    message: '订单不存在',
                    type: 'warning'
                  });
                }
              } else {
                this.$message({
                  message: '订单不存在',
                  type: 'warning'
                });
              }
            })
          }
        } else {
          this.$store.state.orderFind = [];
          this.$store.state.orderArea = [];
          this.$emit('orderData', true);
        }
      },
    },
    watch: {
      ieData: function (newVal, oldVal) {
        if (newVal) {
          this.getcx();
        }
      }
    },
    computed: {
      ...mapState(['ieData', 'orderFind', 'orderArea'])
    }
  }
</script>


<style scoped>
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
