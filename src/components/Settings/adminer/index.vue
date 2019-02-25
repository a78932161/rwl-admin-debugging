<template>
  <div>
    <div v-show="showFlag1">
      <div class="ix-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><span @click="goIndex4">平台设置</span></el-breadcrumb-item>
          <el-breadcrumb-item>管理员</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ord-content2">
        <el-button type="primary" @click="goCharacter">权限管理</el-button>
        <el-button type="primary" @click="goPsw">修改密码</el-button>
      </div>
    </div>
    <psw v-if="isPsw" @goIndex1="goIndex1" @goPt="goIndex4"></psw>
    <character v-if="isCharacter" @goIndex2="goIndex2" @goIndex3="goIndex3" @goPt="goIndex4"></character>
    <agents v-if="isAgents" @goIndex5="goIndex5" @goIndex6="goIndex6" @goPt="goIndex4"></agents>
  </div>

</template>

<script>
  import psw from '@/components/Settings/adminer/password'
  import character from '@/components/Settings/adminer/character'
  import agents from '@/components/Settings/adminer/agents'

  export default {
    components: {
      psw,
      character,
      agents
    },
    data() {
      return {
        showFlag1: true,
        isPsw: false,
        isCharacter: false,
        isAgents: false,


      }
    },
    methods: {
      goIndex4() {
        this.$emit('goIndex4', true);
      },
      goPsw() {
        this.showFlag1 = false;
        this.isPsw = true;
      },
      goCharacter() {
        if (this.$store.state.radio1 == 1) {
          this.showFlag1 = false;
          this.isAgents = true;

        } else if (this.$store.state.radio1 == 2) {
          this.showFlag1 = false;
          this.isCharacter = true;
        }

      },
      goIndex1(data) {
        this.showFlag1 = data;
        this.isPsw = false;
      },
      goIndex2(data) {
        this.showFlag1 = data;
        this.isCharacter = false;
      },
      goIndex3(data) {
        this.isAgents = data;
        this.isCharacter = false;
      },
      goIndex5(data) {
        this.showFlag1 = data;
        this.isAgents = false;
      },
      goIndex6(data) {
        this.isAgents = false;
        this.isCharacter = data;
      }
    }
  }
</script>

<style scoped>
  .ix-top {
    margin-bottom: 15%;
  }

  .el-breadcrumb {
    font-size: 18px;
  }

  .ord-content2 {
    display: flex;
    justify-content: space-around;
  }

  .ord-content2 button {
    width: 180px;
    height: 80px;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 30px;
  }
</style>
