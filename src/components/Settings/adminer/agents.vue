<template>
  <div>
    <div v-show="showFlag2">
      <div class="cr-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><span @click="goIndex">平台设置</span></el-breadcrumb-item>
          <el-breadcrumb-item><span @click="goIndex5">管理员</span></el-breadcrumb-item>
          <el-breadcrumb-item>代理商</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="cr-top1">
        <el-radio v-model="radio" label="1" border>新增代理商</el-radio>
        <el-radio v-model="radio" label="2" border @change="qaq">新增角色</el-radio>
        <el-button type="primary" @click="dialogVisible= true">添加代理商<i class="el-icon-plus"></i></el-button>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="people"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="accountName"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="region"
            label="省市">
          </el-table-column>
          <el-table-column
            width="200"
            prop="regionDistribution"
            label="区域">
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary" v-if="scope.row.account!==true" @click="addjs(scope.row)">添加角色
              </el-button>
              <el-button
                size="mini" @click="goStore(scope.row)">查看门店
              </el-button>
              <el-button
                size="mini" @click="goarea(scope.row)">修改区域
              </el-button>
            </template>
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
      <el-dialog
        title="添加代理商"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <el-form label-width="100px" :model="tableList" ref="tableList" :rules="rules">
          <el-form-item label="代理商名 :" prop="agentName">
            <el-input v-model="tableList.agentName" placeholder="请输入代理商名"></el-input>
          </el-form-item>
          <el-form-item label="地区负责人 :" prop="people">
            <el-input v-model="tableList.people" placeholder="请输入地区负责人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话 :" prop="phone">
            <el-input v-model="tableList.phone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="QQ :" prop="qq">
            <el-input v-model="tableList.qq" placeholder="请输入qq"></el-input>
          </el-form-item>
          <el-form-item label="办公地址 :" prop="address">
            <el-input v-model="tableList.address" placeholder="请输入办公地址"></el-input>
          </el-form-item>
          <el-form-item label="办公时间 :" prop="workTime">
            <el-input v-model="tableList.workTime" placeholder="请输入办公时间"></el-input>
          </el-form-item>
          <el-form-item label="区域分配 :">
            <el-cascader
              placeholder="试试搜索：浙江"
              :options="options"
              ref="option"
              filterable
              change-on-select
              clearable
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="可收区域 :">
            <el-checkbox-group
              v-model="checkedCities1">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">重 置</el-button>
          <el-button type="primary" @click="addAs">新 增</el-button>
      </span>
      </el-dialog>
      <el-dialog
        title="添加角色"
        :visible.sync="dialogVisible1"
        width="35%"
        :before-close="handleClose">
        <el-form label-width="100px" :model="tableList1" :rules="rules1" ref="tableList1">
          <el-form-item label="用户名 :" prop="username">
            <el-input v-model="tableList1.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="新密码 :" prop="password">
            <el-input v-model="tableList1.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码 :" prop="dbpassword">
            <el-input v-model="tableList1.dbpassword" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('tableList1')">重 置</el-button>
    <el-button type="primary" @click="upPasswod1('tableList1')">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog
        title="修改区域"
        :visible.sync="dialogVisible2"
        width="40%"
        :before-close="handleClose">
        <el-form label-width="100px">
          <el-form-item label="区域分配 :">
            <el-cascader
              ref="option"
              placeholder="试试搜索：浙江"
              :options="options"
              filterable
              change-on-select
              clearable
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="可收区域 :">
            <el-checkbox-group
              v-model="checkedCities2">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2=false">取 消</el-button>
    <el-button type="primary" @click="uparea()">确 定</el-button>
      </span>
      </el-dialog>

    </div>

    <store v-if="isStore" :agentId="agentId" @goIndex6="goIndex6"></store>
  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import store from '@/components/Settings/adminer/store'
  import {getAgents, addAgents, upAgents, addRole} from "@/components/api/agents";

  export default {
    components: {
      store,
    },
    data() {
      let psw1 = (rule, value, callback) => {
        if (value !== this.tableList1.password) {
          callback(new Error('两次密码不一样!'));
        }
        else {
          callback();
        }
      };
      return {
        options: CityInfo,
        radio: this.$store.state.radio1,

        tableList: {
          agentName: '',
          phone: '',
          people: '',
          address: '',
          qq: '',
          workTime: '',
          regionDistribution: '',
          region: '',
        },
        tableList1: {
          username: '',
          password: '',
          dbpassword: '',
        },
        tableList2: {},
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        checkedCities1: [],
        checkedCities2: [],
        allocation: [],
        cities: [],
        isStore: false,
        showFlag2: true,
        size: 10,
        page: 1,
        total: 1,
        tableData: [],
        accountId: '',
        agentId: '',
        areaId: '',
        rules: {
          agentNameL: [
            {required: true, message: '请输入代理商名', trigger: 'blur'},
          ],
          people: [
            {required: true, message: '请输入负责人', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
          ],
          qq: [
            {required: true, message: '请输入qq', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'},
          ],
          workTime: [
            {required: true, message: '请输入办公时间', trigger: 'blur'},
          ],
        },
        rules1: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          dbpassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: psw1, trigger: 'blur'}
          ],
        },
      }
    },
    methods: {
      getList() {
        this.cities = [];
        this.allocation = [];

        let a = {
          size: this.size,
          page: this.page,
        };
        getAgents(a).then((res) => {
          this.tableData = res.data.data.content;
          this.total = res.data.data.totalElements;
        })
      },
      cancel() {
        this.resetForm('tableList');
      },

      goIndex() {
        this.$emit('goPt', true);
      },
      goIndex5() {
        this.$emit('goIndex5', true);
      },
      goIndex6(data) {
        this.showFlag2 = data;
        this.isStore = false;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      qaq() {
        this.$store.commit('changeRadio1', '2');
        this.$emit('goIndex6', true);
      },
      handleChange(value) {
        this.cities = [];
        this.allocation = [];
        this.options.forEach((value1) => {
          if (value[0] == value1.value) {
            value1.children.forEach((value2) => {
              if (value[1] == value2.value) {
                this.allocation.push(value1.label);
                this.allocation.push(value2.label);
                value2.children.forEach((value3) => {
                  this.cities.push(value3.label);
                })
              }
            })
          }
        });
      },
      addAs() {
        if (this.tableList.phone && this.tableList.people && this.tableList.address && this.tableList.qq
          && this.tableList.workTime && this.allocation && this.cities) {
          this.tableList.regionDistribution = this.checkedCities1.join(',');
          this.tableList.region = this.allocation.join(',');
          addAgents(this.tableList).then((res) => {
            if (res.data.code === 0) {
              this.resetForm('tableList');
              this.dialogVisible = false;
              let obj = {};
              obj.stopPropagation = () => {
              };
              this.$refs.option.clearValue(obj);
              this.getList();
              this.$message({
                message: `${res.data.msg}`,
                type: 'success'
              });
            } else {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning'
              });
            }
          })
        } else {
          this.$message({
            message: '请填写完整!',
            type: 'warning'
          });
        }

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goStore(row) {
        this.agentId = row.id;
        this.isStore = true;
        this.showFlag2 = false;
      },
      addjs(row) {
        this.accountId = row.id;
        this.dialogVisible1 = true;
      },
      upPasswod1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let a = {
              username: this.tableList1.username,
              password: this.tableList1.password,
              accountId: this.accountId,
            };
            addRole(a).then((res) => {
              if (res.data.code === 0) {
                this.dialogVisible1 = false;
                this.resetForm('tableList1');
                this.getList();
                this.$message({
                  message: `${res.data.msg}`,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: `${res.data.msg}`,
                  type: 'warning'
                });
              }
            })
          } else {
            this.$message({
              message: '请填写完整!',
              type: 'warning'
            });
            return false;
          }
        });
      },
      upPasswod2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let a = {
              username: this.tableList1.username,
              password: this.tableList1.password,
              accountId: this.accountId,
            };
            addRole(a).then((res) => {
              if (res.data.code === 0) {
                this.dialogVisible1 = false;
                this.resetForm('tableList1');
                this.getList();
                this.$message({
                  message: `${res.data.msg}`,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: `${res.data.msg}`,
                  type: 'warning'
                });
              }
            })
          } else {
            this.$message({
              message: '请填写完整!',
              type: 'warning'
            });
            return false;
          }
        });
      },
      uparea() {
        if (this.allocation.length > 0 && this.checkedCities2.length > 0) {
          let a = {
            regionDistribution: this.checkedCities2.join(','),
            region: this.allocation.join(','),
          };
          upAgents(this.areaId, a).then((res) => {
            if (res.data.code == 0) {
              this.dialogVisible2 = false;
              let obj = {};
              obj.stopPropagation = () => {
              };
              this.$refs.option.clearValue(obj);
              this.getList();
            } else {
              this.$message({
                message: `${res.data.msg}`,
                type: 'warning'
              });
            }
          })
        } else {
          this.$message({
            message: '请填写信息!',
            type: 'warning'
          });
        }
      },
      goarea(row) {
        this.areaId = {agentid: row.id};
        this.dialogVisible2 = true;
        this.cities = [];
        this.allocation = [];
        this.checkedCities2 = [];
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
  .cr-top {
    margin-bottom: 3%;
  }

  .el-breadcrumb {
    font-size: 18px;
  }

  .el-checkbox__label {
    font-size: 16px;
  }

  .el-checkbox {
    margin-left: 30px;
  }

  .cr-top1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3%;
  }
</style>
