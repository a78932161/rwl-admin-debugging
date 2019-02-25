<template>
  <div>
    <top></top>
    <el-col :span="6" :offset="5" class="vipAside">
      <div class="vipTop">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/vip' }">会员管理</el-breadcrumb-item>
          <el-breadcrumb-item><span @click="godd">用户订单</span></el-breadcrumb-item>
          <el-breadcrumb-item>衣物详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>

    <el-col :span="17" :offset="4" class="el1">
      <el-steps :active="2" align-center>
        <el-step title="新订单" ></el-step>
        <el-step title="派单" ></el-step>
        <el-step title="收单" ></el-step>
        <el-step title="入站" ></el-step>
        <el-step title="上挂" ></el-step>
        <el-step title="送还" ></el-step>
        <el-step title="完结" ></el-step>
      </el-steps>
    </el-col>
    <el-col :span="24">
      <el-col :span="5" :offset="4">
        <div class="el2-1">订单详情</div>
        <div class="el2-2">
          <div><label>客户备注 : </label>
            <el-input placeholder="请输入内容" size="mini" style="width: 40%"></el-input>
            <el-button type="primary" size="mini">确定</el-button>
          </div>
          <div><label>注册电话 : </label></div>
          <div><label>预约单号 : </label></div>
          <div><label>用户名 : </label></div>
          <div><label>联系电话 : </label></div>
          <div><label>用户留言 : </label></div>
          <div><label>物流入站备注 : </label></div>
          <div><label>省市区 : </label></div>
          <div><label>收衣地址 : </label></div>
          <div><label>预约时间 : </label></div>
          <div><label>衣物总数 : </label></div>
          <div><label>订单价格 : </label></div>
          <div><label>付款方式 : </label></div>
          <div><label>付款状态 : </label></div>
          <div><label>服务类型 : </label></div>
          <div><label>收单人员 : </label></div>
          <div><label>服务商户 : </label></div>
        </div>
      </el-col>

      <el-col :span="11" :offset="1">
        <div class="el3">
          <div class="el3-1">衣物详情</div>
          <div class="el3-2">
          </div>
        </div>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  import top from '@/assets/vue/top'

  export default {
    components: {
      top,
    },
    data() {
      return {}
    },
    methods: {
      godd() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>


  .el-breadcrumb {
    font-size: 18px;
  }

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

  .vipTop {
    margin: 0 0 10% 0;
  }

  .el1 {
    margin-bottom: 3%;

  }

  .el2-1 {
    height: 35px;
    background: rgb(20, 190, 240);
    display: flex;
    align-items: center;
    color: white;
    font-size: 20px;
    text-indent: 20px;
  }

  .el2-2 {
    word-wrap: break-word;
    color: rgb(106, 119, 127);
    border: 1px solid rgb(20, 190, 240);
    padding: 0 0 5% 20px;
    line-height: 40px;
    margin: 0 0 5% 0;
  }

  .el2-2 div {
    width: 95%;
  }

  .el2-2 label {
    margin: 0 20px 0 0;
  }

  .el3-1 {
    height: 35px;
    background: rgb(20, 190, 240);
    display: flex;
    align-items: center;
    color: white;
    font-size: 20px;
    text-indent: 20px;
    margin-bottom: 1%;
  }

  .el3-2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .el3-2-1 {
    text-align: center;
    width: 150px;
  }
</style>
