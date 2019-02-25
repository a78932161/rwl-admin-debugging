<template>
  <div>
    <div>
      <div class="cr-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><span @click="goIndex">平台设置</span></el-breadcrumb-item>
          <el-breadcrumb-item><span @click="goIndex6">代理商</span></el-breadcrumb-item>
          <el-breadcrumb-item>门店</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="cr-top1">
        <el-button type="primary" @click="dialogVisible = true">添加门店<i class="el-icon-plus"></i></el-button>
      </div>
      <div>
        <el-table
          :data="tableData">
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="accountName"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="people"
            label="收件人名">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="150">
          </el-table-column>
          <el-table-column
            prop="province"
            label="区域">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                v-if="scope.row.account!==true"
                @click="tjjs(scope.row)"
              >添加角色
              </el-button>
              <!--<el-button-->
              <!--size="mini"-->
              <!--type="primary" @click="dialogVisible1 = true ">查看详情-->
              <!--</el-button>-->
              <el-button
                size="mini"
                type="danger" v-if="scope.row.status==='营业中'" @click="storekg(scope.row)">禁用门店
              </el-button>
              <el-button
                size="mini"
                type="danger" v-if="scope.row.status==='未营业'" @click="storekg(scope.row)">开启门店
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
    </div>
    <el-dialog
      title="添加门店"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <el-form label-width="100px" :model="tableList" ref="tableList" :rules="rules">
        <el-form-item label="门店名 :" prop="name">
          <el-input v-model="tableList.name" placeholder="请输入门店"></el-input>
        </el-form-item>
        <el-form-item label="门店地址 :" prop="address">
          <el-input v-model="tableList.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="联系电话 :" prop="phone">
          <el-input v-model="tableList.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="收件人名 :" prop="people">
          <el-input v-model="tableList.people" placeholder="收件人名"></el-input>
        </el-form-item>
        <el-form-item label="营业时间 :">
          <el-time-picker
            is-range
            arrow-control
            v-model="time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="所属地区 :" prop="region" >
          <el-cascader
            placeholder="试试搜索：浙江"
            ref="cascader"
            :options="options"
            v-model="tableList.region"
            filterable
            change-on-select
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('tableList')">重 置</el-button>
    <el-button type="primary" @click="add('tableList')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="查看详情"
      :visible.sync="dialogVisible1"
      width="40%"
      :before-close="handleClose">
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
            prop="date"
            label="次数">
          </el-table-column>
          <el-table-column
            prop="name"
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
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="次数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="人数">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible2"
      width="40%"
      :before-close="handleClose">
      <el-form label-width="100px" :model="tableList2" :rules="rules2" ref="tableList2">
        <el-form-item label="用户名 :" prop="username">
          <el-input v-model="tableList2.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="新密码 :" prop="password">
          <el-input v-model="tableList2.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码 :" prop="dbpassword">
          <el-input v-model="tableList2.dbpassword" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('tableList2')">重 置</el-button>
    <el-button type="primary" @click="upPasswod1('tableList2')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import {getStore, addStore, addRole, BusinessSwitch} from "@/components/api/store";

  export default {
    props: ['agentId'],
    data() {
      let psw1 = (rule, value, callback) => {
        if (value !== this.tableList2.password) {
          callback(new Error('两次密码不一样!'));
        }
        else {
          callback();
        }
      };
      return {
        options: CityInfo,
        tableList: {
          name: '',
          phone: '',
          address: '',
        },
        tableList2: {
          username: '',
          password: '',
          dbpassword: '',
        },
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        tableData: [],
        accountId: '',
        page: 1,
        size: 10,
        total: 10,
        time: '',
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入电话', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入电话', trigger: 'blur'},
          ],
          people: [
            {required: true, message: '请输入收件人名', trigger: 'blur'},
          ],
          region: [
            { required: true, message: '请选择区域', trigger: 'change' }
          ],

        },
        rules2: {
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
        }
      }
    },
    methods: {
      goIndex() {
        this.$router.go(0);
      },
      goIndex6() {
        this.$emit('goIndex6', true);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      getList() {
        let a = {
          agentid: this.agentId,
          size: this.size,
          page: this.page,
        };
        getStore(a).then((res) => {
          if (res.data.data.content) {
            res.data.data.content.forEach((value) => {
              value.province = value.city + value.area
            });
            res.data.data.content.forEach((value) => {
              if (value.status === 0) {
                value.status = '营业中'
              } else {
                value.status = '未营业'
              }
            });
            this.tableData = res.data.data.content;
            this.total = res.data.data.totalElements;
          }
        })
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      add(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let a = {
              name: this.tableList.name,
              phone: this.tableList.phone,
              address: this.tableList.address,
              openTime: this.time[0].toLocaleTimeString() + ',' + this.time[1].toLocaleTimeString(),
              province: this.$refs.cascader.currentLabels[0],
              city: this.$refs.cascader.currentLabels[1],
              area: this.$refs.cascader.currentLabels[2] || '',
              agentId: this.agentId,
              people:this.tableList.people,
            };
            addStore(a).then((res) => {
              if (res.data.code === 0) {
                this.dialogVisible = false;
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
      tjjs(row) {
        this.accountId = row.id;
        this.dialogVisible2 = true;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      upPasswod1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let a = {
              username: this.tableList2.username,
              password: this.tableList2.password,
              accountId: this.accountId,
            };
            addRole(a).then((res) => {
              if (res.data.code === 0) {
                this.dialogVisible2 = false;
                this.resetForm('tableList2');
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
      storekg(row) {
        let a = {
          storeid: row.id,
        };
        BusinessSwitch(a).then((res) => {

          if (res.data.code === 0) {
            this.$message({
              message: `${res.data.msg}`,
              type: 'success'
            });
            this.getList();
          } else {
            this.$message({
              message: `${res.data.msg}`,
              type: 'warning'
            });
          }
        })
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
    text-align: right;
    margin-bottom: 3%;
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
