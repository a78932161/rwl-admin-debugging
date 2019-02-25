<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/orders',query:{type:1} }">高端洗护</el-breadcrumb-item>
        <el-breadcrumb-item>新订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <inquire @orderData="orderData"></inquire>
    <div class="ord-content5">
      <div>
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="distribution">立即派送</el-button>
        <el-button type="primary" disabled>已派订单</el-button>
        <el-button type="primary" disabled>入站订单</el-button>
        <el-button type="primary" disabled>取消订单</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        @selection-change="handleSelectChange"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="用户地址">
                <span>{{`${props.row.province}${props.row.city}${props.row.area}${props.row.address}`}}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="预约时间">
                <span>{{ props.row.deliveryDate }}</span>
              </el-form-item>
              <el-form-item label="套餐选择"><span>{{ props.row.goods }}</span></el-form-item>
              <el-form-item label="已付金额"><span>{{ props.row.amount/100 }}</span></el-form-item>
              <el-form-item label="支付方式"><span>{{ props.row.payMode}}</span></el-form-item>
              <el-form-item label="更新时间"><span>{{props.row.statusUpdateTime}}</span></el-form-item>
              <el-form-item label="客户备注"><span>{{props.row.remark}}</span></el-form-item>
              <el-form-item style="text-align: center;width:100%">
                <el-button type="primary" @click="details(props.row)">查看详情</el-button>
                <el-button type="primary" @click="quxiao(props.row)">取消订单</el-button>
                <el-button type="primary" @click="delivery(props.row)">派给顺丰</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="ID"
          prop="number">
        </el-table-column>
        <el-table-column width="150" label="时间" prop="createtime"></el-table-column>
        <el-table-column width="250" label="地址" prop="address"></el-table-column>
        <el-table-column
          label="商品"
          prop="goods1">
        </el-table-column>
        <el-table-column width="80" label="件数" prop="total"></el-table-column>
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

  import {
    getlaundry,
    Invalidlaundry,
    storelaundry,
    deliverylaundry,
    distributionlaundry
  } from "@/components/api/orderLaundry";
  import inquire from '@/assets/vue/inquire'

  export default {
    components: {
      inquire
    },
    data() {
      return {
        value: '',
        page: 1,
        size: 10,
        total: 10,
        tableData: [],
        options: [],
        cascader: [],
        province: '',
        city: '',
        zone: '',
        inquire: [],
      }
    },
    methods: {
      getLaundryList() {
        this.options = [];
        this.tableData = [];
        this.$store.state.getieData = [];
        this.inquire = [];
        if (this.$store.state.orderFind.object != null) {
          this.$store.state.orderFind.object.forEach((value) => {
            value.total = value.items.length + '件';
            if (value.payMode == 0) {
              value.payMode = '微信支付'
            } else if (value.payMode == 1) {
              value.payMode = '余额支付'
            } else if (value.payMode == 2) {
              value.payMode = '卡支付'
            }
            if (value.items) {
              let b = [];
              value.items.forEach((value1) => {
                b.push(value1.laundryProduct.name);
              });
              value.goods1 = b[0];
              value.goods = b.join(',');
            }
            value.createtime = this.getLocalTime(value.createtime);
            value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);

          });
          this.tableData = this.$store.state.orderFind.object;
          this.total = this.$store.state.orderFind.totalsize;
          this.inquire = {
            page: this.page,
            size: this.size,
            type: 2,
            status: 0,
          };
          this.$store.commit('getieData', this.inquire);
        } else if (this.$store.state.orderArea.content) {
          this.$store.state.orderArea.content.forEach((value) => {
            value.total = value.items.length + '件';
            if (value.payMode == 0) {
              value.payMode = '微信支付'
            } else if (value.payMode == 1) {
              value.payMode = '余额支付'
            } else if (value.payMode == 2) {
              value.payMode = '卡支付'
            }
            if (value.items) {
              let b = [];
              value.items.forEach((value1) => {
                b.push(value1.laundryProduct.name);
              });
              value.goods1 = b[0];
              value.goods = b.join(',');
            }
            value.createtime = this.getLocalTime(value.createtime);
            value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);

          });
          this.tableData = this.$store.state.orderArea.content;
          this.total = this.$store.state.orderArea.totalElements;
          this.inquire = {
            page: this.page,
            size: this.size,
            type: 2,
            status: 0,
          };
          this.$store.commit('getieData', this.inquire);

        } else {
          let a = {
            type: 2,
            status: 0,
            page: this.page,
            size: this.size,
          };
          getlaundry(a).then((res) => {
            res.data.data.content.forEach((value) => {
              value.total = value.items.length + '件';
              if (value.payMode == 0) {
                value.payMode = '微信支付'
              } else if (value.payMode == 1) {
                value.payMode = '余额支付'
              } else if (value.payMode == 2) {
                value.payMode = '卡支付'
              }
              if (value.items) {
                let b = [];
                value.items.forEach((value1) => {
                  b.push(value1.laundryProduct.name);
                });
                value.goods1 = b[0];
                value.goods = b.join(',');
              }
              value.createtime = this.getLocalTime(value.createtime);
              value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);

            });
            this.tableData = res.data.data.content;
            this.total = res.data.data.totalElements;
            this.inquire = {
              page: this.page,
              size: this.size,
              type: 2,
              status: 0,
            };
            this.$store.commit('getieData', this.inquire);
          });
          storelaundry().then((res) => {
            res.data.data.forEach((value) => {
              let a = {
                value: value.id,
                label: value.name
              };
              this.options.push(a);
            });
          })
        }

      },
      orderData(data) {
        this.getLaundryList();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getLaundryList();
      },

      goLaundry() {
        this.$router.push('/orderIndex');
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
      quxiao(row) {
        this.$confirm('此操作将永久取消订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let a = {
            orderid: row.id
          };
          Invalidlaundry(a).then((res) => {
            this.getLaundryList();
          });
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      delivery(row) {
        this.$confirm('此操作将会派顺丰过来, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.value) {
            let a = {
              orderid: row.id,
              storeid: this.value,
            };
            deliverylaundry(a).then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.getLaundryList();
              } else {
                this.$message({
                  type: 'warning',
                  message: `${res.data.msg}`,
                });
              }
            });
          } else {
            this.$message({
              message: '请选择门店',
              type: 'warning'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      distribution() {
        let idData = [];
        if (this.mutipleSelection && this.value) {
          this.mutipleSelection.forEach((value) => {
            idData.push(value.id);
          });
          let a = {
            orderid: idData.join(','),
            storeid: this.value,
          };
          this.$confirm('此操作将派送给门店, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            distributionlaundry(a).then((res) => {
              if (res.data.code == 0) {
                this.getLaundryList();
                this.$message({
                  message: '派送成功',
                  type: 'success'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });

        } else {
          this.$message({
            message: '请选择需要派送的订单或选择门店',
            type: 'warning'
          });
        }
      },
      handleSelectChange(selection) {
        this.mutipleSelection = selection;
        let ids = [];
        this.mutipleSelection.map((item) => {
          ids.push(item.id)
        });
        return ids;
      },
      details(row) {
        let a = row.id;
        this.$router.push({name: 'userOrders', query: {id: a}});
      },
    },
    mounted() {
      this.$store.state.orderFind = [];
      this.$store.state.orderArea = [];
      this.getLaundryList();
    },
    watch: {
      '$route'(to, from) {
        this.getLaundryList();
      }
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

  .ord-content5 button {
    width: 100px;
    height: 50px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
