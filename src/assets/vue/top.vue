<template>
  <div>
    <el-col :span="24" class="top">
      <el-col :span="6" :offset="4" class="logo">
        <div class="logo1"><img src="../img/logo.png"></div>
        <div class="logo2"><label>全国管理中心</label></div>
      </el-col>
      <el-col :span="4" :offset="10">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button type="text" class="logo3">更多</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-dialog
      title="更改密码"
      :visible.sync="dialogVisible1"
      width="35%"
      :before-close="handleClose">
      <el-form label-width="100px" :model="tableList1" :rules="rules1" ref="tableList1">
        <el-form-item label="用户名 :">
          <el-input v-model="tableList1.username" placeholder="请输入用户名" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新密码 :" prop="password">
          <el-input type="password" v-model="tableList1.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码 :" prop="dbpassword">
          <el-input type="password" v-model="tableList1.dbpassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('tableList1')">重 置</el-button>
    <el-button type="primary" @click="upPasswod1('tableList1')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {removeToken} from "@/auth";
  import {upRole} from "@/components/api/adminer";

  export default {
    name: "top",
    data() {
      return {
        dialogVisible1: false,
        tableList1: {
          username: '',
          password: '',
          dbpassword: '',
        },
        rules1: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
          ],
          dbpassword: [
            {required: true, message: '请再次新密码', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      zhuxiao() {
        this.$confirm('确认注销 吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          localStorage.clear();
          this.$router.push({path: '/login'});
          this.$message({
            message: `注销成功!`,
            type: 'success'
          });
        }).catch(() => {

        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      upPasswod1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.tableList1.password == this.tableList1.dbpassword) {
              let a = {
                username: this.tableList1.username,
                password: this.tableList1.dbpassword,
              };
              upRole(a).then((res) => {
                if (res.data.code === 0) {
                  this.dialogVisible1 = false;
                  this.resetForm('tableList1');
                  removeToken();
                  localStorage.removeItem("info");
                  this.$router.push({path: '/login'});
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
            }else {
              this.$message({
                message: `两次密码不一样`,
                type: 'warning'
              });
            }
          } else {
            this.$message({
              message: '请填写完整!',
              type: 'warning'
            });
            return false;
          }
        });
      },
      upPasswod() {
        let a = JSON.parse(localStorage.getItem("info"));
        this.tableList1.username = a.username;
        this.dialogVisible1 = true;
      },
      handleCommand(command) {

        if (command == 'a') {
          this.upPasswod();
        } else if (command == 'b') {
          this.zhuxiao();
        }
      }
    },

  }
</script>

<style scoped>
  .top {
    height: 50px;
    border-bottom: 1px solid rgb(20, 190, 240);
    display: flex;
    align-items: center;
    margin: 0 0 30px 0;
  }

  .logo {
    display: flex;
  }

  .logo1 {
    margin: 0 10px 0 0;
  }

  .logo1 img {
    width: 200px;
    height: 30px;

  }

  .logo2 {
    color: rgb(20, 190, 240);
    font-size: 20px;
    letter-spacing: 2px;
    margin: 5px 0 0 0;
  }

  .logo3 {
    font-size: 16px;
  }
</style>
