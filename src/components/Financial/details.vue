<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="gofinancial">财务管理</span></el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goaccount">账号管理</span></el-breadcrumb-item>
        <el-breadcrumb-item>转存记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card" v-show="rechargeId">
      <div><label>实际扣款金额 : {{listData.money}}</label></div>
      <div><label>姓名 : {{listData.name}}</label></div>
      <div><label>手机 : {{listData.phone}}</label></div>
      <div><label>备注 : {{listData.remark}}</label></div>
      <div>
        <label>注册信息 : </label>
        <div style="display: grid;margin-left: 10%;margin-top: -34px">
          <label>会员ID : {{listData.userNumber}}</label>
          <label>绑定手机号 : {{listData.userPhone}}</label>
          <label>注册时间 : {{listData.userCreateTime}}</label>
          <label>用户余额 : {{listData.oldBalance}}</label>
        </div>
      </div>
      <div><label>转存时间 : {{listData.createtime}}</label></div>
      <div><label>转存人 : {{listData.transferPeople}}</label></div>
      <div><label>转存后余额 : {{listData.newBalance}}</label></div>
    </el-card>
    <el-card class="box-card" v-show="refundId">
      <div><label>实际转存额 : {{listData1.money}}</label></div>
      <div><label>姓名 : {{listData1.name}}</label></div>
      <div><label>手机 : {{listData1.phone}}</label></div>
      <div><label>备注 : {{listData1.remark}}</label></div>
      <div>
        <label>注册信息 : </label>
        <div style="display: grid;margin-left: 10%;margin-top: -34px">
          <label>会员ID : {{listData1.userNumber}}</label>
          <label>绑定手机号 : {{listData1.userPhone}}</label>
          <label>注册时间 : {{listData1.userCreateTime}}</label>
          <label>用户余额 : {{listData1.oldBalance}}</label>
        </div>
      </div>
      <div><label>转存时间 : {{listData1.createtime}}</label></div>
      <div><label>转存人 : {{listData1.transferPeople}}</label></div>
      <div><label>转存后余额 : {{listData1.newBalance}}</label></div>
    </el-card>
  </div>
</template>

<script>
  import {idRecharge, idRefund,deductionId} from "@/components/api/financialdk";

  export default {
    name: "details",
    data() {
      return {
        listData: [],
        listData1: [],
        rechargeId:false,
        refundId:false,
      }
    },
    methods: {
      getList() {
        if (this.$store.state.rechargeId) {
          let a = {
            chargebackId: this.$store.state.rechargeId,
          };
          deductionId(a).then((res) => {
            res.data.data.userCreateTime=this.getLocalTime(res.data.data.userCreateTime);
            res.data.data.createtime=this.getLocalTime(res.data.data.createtime);
            res.data.data.money=res.data.data.money/100;
            res.data.data.oldBalance=res.data.data.oldBalance/100;
            res.data.data.newBalance=res.data.data.newBalance/100;
            this.listData = res.data.data;
          })

        } else if (this.$store.state.refundId) {
          let b = {
            refundid: this.$store.state.refundId,
          };
          idRefund(b).then((res) => {
            res.data.data.userCreateTime=this.getLocalTime(res.data.data.userCreateTime);
            res.data.data.createtime=this.getLocalTime(res.data.data.createtime);
            res.data.data.money=res.data.data.money/100;
            res.data.data.oldBalance=res.data.data.oldBalance/100;
            res.data.data.newBalance=res.data.data.newBalance/100;
            this.listData1 = res.data.data;
          })
        }
      },

      gofinancial() {
        this.$emit('mp', true);
      },
      goaccount() {
        this.$emit('mp1', true);
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
    },
    mounted() {
      this.getList();
    },
    created(){
      if(this.$store.state.rechargeId){
        this.rechargeId=true;
      }
      if(this.$store.state.refundId){
        this.refundId=true;
      }

    },
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .ord-top {
    margin-bottom: 3%;
  }

  .box-card {
    line-height: 35px;
    font-size: 18px;
    color: rgb(106, 119, 127);
  }
</style>
