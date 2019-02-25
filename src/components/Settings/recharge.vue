<template>
  <div>
    <div class="re-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex1">平台设置</span></el-breadcrumb-item>
        <el-breadcrumb-item>充值奖励</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="re-top1">
    </div>
    <div>
      <el-table
        :data="money"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="payMoney"
          label="充值金额(元)">
        </el-table-column>
        <el-table-column
          prop="rewardMoney"
          label="奖励金额(元)">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini" type="primary" @click="uplist(scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="编辑奖励金额"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form label-width="120px" :model="tableList" :rules="rules">
        <el-form-item label="充值金额(元) :" prop="value1">
          <el-input v-model.number="tableList.value1" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="奖励金额(元) :" prop="value2">
          <el-input v-model.number="tableList.value2" placeholder="请输入金额"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="uplist1()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import {getreward, upreward} from "@/components/api/settings";

  export default {
    data() {
      let oldprice = (rule, value, callback) => {
        if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) === false) {
          callback(new Error('必须是正数'));
        } else {
          callback();
        }
      };
      return {
        options: CityInfo,
        tableList: {
          value1: '',
          value2: '',
        },
        dialogVisible: false,
        key: '',
        money: [],

        rules: {
          value1: [
            {required: true, message: '金额不能为空'},
            {validator: oldprice, trigger: 'blur'},
          ],
          value2: [
            {required: true, message: '金额不能为空'},
            {validator: oldprice, trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      getlsit() {
        getreward().then((res) => {
          res.data.data.forEach((res1) => {
            res1.payMoney = res1.payMoney / 100;
            res1.rewardMoney = res1.rewardMoney / 100;
          });
          this.money = res.data.data;
        })
      },
      uplist(row) {
        this.dialogVisible = true;
        this.key = '';
        this.key = row.key;
        this.tableList.value1 = row.payMoney;
        this.tableList.value2 = row.rewardMoney;
      },
      uplist1() {

        if (this.tableList.value1 && this.tableList.value2) {
          let a = {
            key: this.key,
            payMoney: this.tableList.value1 * 100,
            rewardMoney: this.tableList.value2 * 100,
          };
          let b = {
            key: this.key,
          };
          upreward(b, a).then((res) => {
            this.dialogVisible = false;
            this.getlsit();
            this.$message({
              message: '修改成功!',
              type: 'success'
            });
          })
        } else {
          this.$message({
            message: '请填写完整!',
            type: 'warning'
          });
        }

      },


      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      goIndex1() {
        this.$emit('goIndex1', true);
      }
    },
    mounted() {
      this.getlsit();
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .re-top {
    margin-bottom: 3%;
  }

  .re-top1 {
    margin-bottom: 3%;
    display: flex;
    justify-content: space-between;
  }
</style>
