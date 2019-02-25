<template>
  <div>
    <top></top>
    <el-col :span="24" class="o-container">
      <el-col :span="4" :offset="3" class="o-aside">
        <div class="o-aside-l">
          <label>订单中心</label>
        </div>
        <div class="NavMenu">
          <router-link @click.native="goto()"  to="/newMall"><span>|</span>新订单</router-link>
          <router-link to="/sentMall"><span>|</span>已派订单</router-link>
          <router-link to="/handsMall"><span>|</span>已发订单</router-link>
          <router-link to="/endMall"><span>|</span>完结订单</router-link>
          <router-link to="/cancelMall"><span>|</span>取消订单</router-link>

        </div>
      </el-col>
      <el-col :span="15" class="o-main">
        <router-view>
        </router-view>
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
    methods: {
      goto() {
        if (this.$route.name === 'newMall') {
          let a = new Date();
          this.$router.push({path: '/newMall', query: {type: a}});
        }
      }
    },
  }
</script>

<style scoped>
  .o-aside {
    text-align: center;
  }

  .o-aside-l {
    font-size: 26px;
    letter-spacing: 2px;
    color: rgb(20, 190, 240);
    margin: 0 0 10% 0;
  }

  .NavMenu {
    list-style: none;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 30%;

  }

  .NavMenu a {
    text-decoration: none;
    color: rgb(106, 119, 127);
    font-size: 20px;
  }

  .NavMenu span {
    font-size: 20px;
    font-weight: bolder;
    color: rgb(20, 190, 240);
    line-height: 50px;
    margin: 0 10px 0 0;
  }

  .NavMenu a:hover {
    color: rgb(56, 200, 243);
  }

  a.router-link-active {
    color: rgb(56, 200, 243);
  }


</style>
<style>
  .el-form-item__content {
    width: 70%;
  }
</style>
