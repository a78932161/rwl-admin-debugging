<template>
  <div>
    <div class="re-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex5">平台设置</span></el-breadcrumb-item>
        <el-breadcrumb-item>运费设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table
        :data="money"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="key"
          label="运费名"
          :formatter="moneyName"
        >
        </el-table-column>
        <el-table-column
          prop="threshold"
          label="到达金额(元)"
          :formatter="moneyConversion"
        >
        </el-table-column>
        <el-table-column
          prop="freight"
          label="运费金额(元)"
          :formatter="moneyConversion1"
        >
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
      title="编辑运费金额"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form label-width="120px" :model="tableList" :rules="rules">
        <el-form-item label="到达金额(元) :" prop="threshold">
          <el-input v-model.number="tableList.threshold" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="运费金额(元) :" prop="freight">
          <el-input v-model.number="tableList.freight" placeholder="请输入金额"></el-input>
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
  import {getExpress, upExpress} from "@/components/api/settings";

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
          key: '',
          freight: '',
          threshold: '',
        },
        dialogVisible: false,
        key: '',
        money: [],

        rules: {
          threshold: [
            {required: true, message: '金额不能为空'},
            {validator: oldprice, trigger: 'blur'},
          ],
          freight: [
            {required: true, message: '金额不能为空'},
            {validator: oldprice, trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      getlsit() {
        this.money = [];
        getExpress().then((res) => {
          this.money = res.data.data;
          // this.money.push({freight: res.data.data.freight, threshold: res.data.data.threshold, key: res.data.data.key});
        });
      },
      uplist(row) {
        this.dialogVisible = true;
        this.tableList = {
          key: row.key,
          freight: row.freight / 100,
          threshold: row.threshold / 100,
        };
        console.log(this.tableList);
      },
      uplist1() {
        if (this.tableList.freight && this.tableList.threshold) {
          let a = {
            key: this.tableList.key,
            freight: this.tableList.freight * 100,
            threshold: this.tableList.threshold * 100,
          };
          console.log(a);
          let b = {
            key: this.tableList.key,
          };
          upExpress(b, a).then((res) => {
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
      goIndex5() {
        this.$emit('goIndex5', true);
      },
      moneyConversion(row) {
        return (row.threshold) / 100;
      },
      moneyConversion1(row) {
        return (row.freight) / 100;
      },
      moneyName(row) {
        if (row.key == 'rwlFreightSet') {
          return '洗衣家居'
        } else if (row.key == 'mallFreightSet') {
          return '小让商城'
        }
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
