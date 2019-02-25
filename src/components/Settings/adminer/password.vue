<template>
  <div>
    <div class="pd-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex">平台设置</span></el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex1">管理员</span></el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="width: 50%;margin: auto">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账户名 :" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="新密码 :" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码 :" prop="dbPassword">
          <el-input v-model="ruleForm.dbPassword"  type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">修改密码</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import {upPsw} from "@/components/api/settings";

  export default {
    data() {
      let psw = (rule, value, callback) => {
        if  (value !== this.ruleForm.password) {
          callback(new Error('两次密码不一样!'));
        }
        else {
          callback();
        }
      };
      return {
        ruleForm: {
          username:'',
          password:'',
          dbPassword:'',
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          dbPassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: psw, trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let a={
              username:this.ruleForm.username,
              password:this.ruleForm.password,
            };
            upPsw(a).then((res)=>{
              if(res.data.code===0){
                this.$message({
                  message: `${res.data.msg}`,
                  type: 'success'
                });
              }else{
                this.$message({
                  message: `${res.data.msg}`,
                  type: 'warning'
                });
                this.resetForm('ruleForm');
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goIndex(){
        this.$emit('goPt',true);
      },
      goIndex1(){
        this.$emit('goIndex1',true);
      }
    }
  }
</script>

<style scoped>
  .pd-top {
    margin-bottom: 5%;
  }

  .el-breadcrumb {
    font-size: 18px;
  }
</style>
