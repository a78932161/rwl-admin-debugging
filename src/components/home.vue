<template>
  <div>
    <top></top>
    <el-col :span="24" class="container">
      <el-col :span="4" :offset="3" class="aside">
        <div class="NavMenu">
          <ul>
            <router-link to="/orders" v-if="A">
              <li>订单管理</li>
            </router-link>
            <router-link to="/vip" v-if="B">
              <li>会员管理</li>
            </router-link>
            <router-link to="/basic" v-if="C">
              <li>基础资料</li>
            </router-link>
            <router-link to="/financial" v-if="D">
              <li>财务管理</li>
            </router-link>
            <router-link to="/settings" v-if="E">
              <li>平台设置</li>
            </router-link>
          </ul>
        </div>
      </el-col>
      <el-col :span="15" class="main">
        <router-view>
        </router-view>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  import top from '@/assets/vue/top'
  import {getInfo} from "@/components/api/login";

  export default {
    components: {
      top,
    },
    data() {
      return {
        A: false,
        B: false,
        C: false,
        D: false,
        E: false,
      }
    },
    methods: {
      getList() {

        if (localStorage.getItem("info")) {
          let b = JSON.parse(localStorage.getItem("info"));
          if (b.functionAuthority.indexOf('A') > -1) {
            this.A = true;
          }
          if (b.functionAuthority.indexOf('B') > -1) {
            this.B = true;
          }
          if (b.functionAuthority.indexOf('C') > -1) {
            this.C = true;
          }
          if (b.functionAuthority.indexOf('D') > -1) {
            this.D = true;
          }
          if (b.functionAuthority.indexOf('E') > -1) {
            this.E = true;
          }
        }

      },
    },
    mounted() {
      this.getList();
    },

  }
</script>

<style scoped>

  .aside {
    padding: 20px 100px 0 50px;
  }

  .NavMenu ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .NavMenu li {
    padding: 20px 0 0 0;
    border: 1px solid rgb(205, 210, 212);
    width: 160px;
    height: 40px;
    text-align: center;
  }

  .NavMenu a {
    text-decoration: none;
    color: rgb(106, 119, 127);
  }

  .NavMenu ul > a:hover {
    background: rgb(56, 200, 243);
    color: white;
    transition:  all 0.2s;
  }

  a.router-link-active {
    color: white;
    background: rgb(56, 200, 243);

  }


</style>

