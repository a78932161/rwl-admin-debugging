<template>
  <div>
    <div class="re-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex3">平台设置</span></el-breadcrumb-item>
        <el-breadcrumb-item>提成机制</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="re-top1">
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="key"
          label="类目">
        </el-table-column>
        <el-table-column
          prop="agent"
          label="代理商(%)">
        </el-table-column>
        <el-table-column
          prop="express"
          label="物流(%)">
        </el-table-column>
        <el-table-column
          prop="platform"
          label="平台(%)">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini" type="primary" @click="qaq(scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="修改提成比例"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form label-width="120px" :model="tableList"  :rules="rules">
        <el-form-item label="代理商(%) :" prop="value1">
          <el-input v-model="tableList.value1" placeholder="请输入比例"></el-input>
        </el-form-item>
        <el-form-item label="物流众包(%) :" prop="value2">
          <el-input v-model="tableList.value2" placeholder="请输入比例"></el-input>
        </el-form-item>
        <el-form-item label="平台(%) :" prop="value3">
          <el-input v-model="tableList.value3" placeholder="请输入比例"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="qaq1()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import {getCommission, upCommission} from "@/components/api/settings";

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
          value3: '',
        },
        dialogVisible: false,
        dialogVisible1: false,
        tableData: [],
        rules: {
          value1: [
            { required: true, message: '比例不能为空'},
            {validator: oldprice, trigger: 'blur'},
          ],
          value2: [
            { required: true, message: '比例不能为空'},
            {validator: oldprice, trigger: 'blur'},
          ],
          value3: [
            { required: true, message: '比例不能为空'},
            {validator: oldprice, trigger: 'blur'},
          ],
        },


      }
    },
    methods: {
      getlsit() {
        getCommission().then((res) => {
          if(res.data.data){
            res.data.data.forEach((res1) => {
              if (res1.key == 'commissionMall') {
                res1.key = '小让商城';
              } else if (res1.key == 'commissionHighLaundry') {
                res1.key = '高端洗护';
              } else if (res1.key == 'commissionFurniture') {
                res1.key = '小让家具';
              } else if (res1.key == 'commissionLaundry') {
                res1.key = '洗衣';
              }
            });
            this.tableData = res.data.data;
          }
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      goIndex3() {
        this.$emit('goIndex3', true);
      },
      qaq(row) {
        this.dialogVisible = true;
        this.key = '';
        this.key = row.key;
        this.tableList.value1 = row.agent;
        this.tableList.value2 = row.express;
        this.tableList.value3 = row.platform;
      },
      qaq1() {
        if (this.key == '小让商城') {
          this.key = 'commissionMall';
        } else if (this.key == '高端洗护') {
          this.key = 'commissionHighLaundry';
        } else if (this.key == '小让家具') {
          this.key = 'commissionFurniture';
        } else if (this.key == '洗衣') {
          this.key = 'commissionLaundry';
        }

        if(this.tableList.value1 && this.tableList.value2 && this.tableList.value3){
          let a = {
            key: this.key,
            agent: this.tableList.value1,
            express: this.tableList.value2,
            platform: this.tableList.value3,
          };
          let b = {
            key: this.key,
          };
          upCommission(b, a).then((res) => {
            this.dialogVisible = false;
            this.getlsit();
            this.$message({
              message: '修改成功!',
              type: 'success'
            });
          })
        }else{
          this.$message({
            message: '请填写完整!',
            type: 'warning'
          });
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
