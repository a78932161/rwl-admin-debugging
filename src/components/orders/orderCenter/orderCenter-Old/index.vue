<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><span @click="goIndex">订单管理</span></el-breadcrumb-item>
      <el-breadcrumb-item>旧订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 3%">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="number"
          label="用户ID"
          width="150">
        </el-table-column>
        <el-table-column label="订单金额">
          <template slot-scope="scope">
            {{scope.row.amount/100}}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="200">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="payMode"
          label="支付方式">
        </el-table-column>
        <el-table-column
          prop="name"
          label="联系人">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
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
  import {oldOrder} from "@/components/api/order";

  export default {
    name: "index",
    data() {
      return {
        page: 1,
        size: 10,
        total: 10,
        tableData: [],
      }
    },
    methods: {
      getList() {
        let a = {
          page: this.page,
          size: this.size
        };
        oldOrder(a).then((res) => {
          this.tableData = res.data.data.content;
          this.total = res.data.data.totalElements;
        })
      },
      goIndex() {
        this.$emit('goIndex1', true);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
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


</style>
