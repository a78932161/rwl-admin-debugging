<template>
  <div>
    <top></top>
    <el-col :span="8" :offset="5" class="vipAside">
      <div class="vipTop">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/vip' }">会员管理</el-breadcrumb-item>
          <el-breadcrumb-item><span @click="goye">用户余额</span></el-breadcrumb-item>
          <el-breadcrumb-item><span @click="ywxq">用户订单</span></el-breadcrumb-item>
          <el-breadcrumb-item v-if="showxq">衣物详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>

    <el-col :span="17" :offset="4" class="el1">
      <el-steps :active="active" align-center v-if="isActive">
        <el-step title="新订单"></el-step>
        <el-step title="派单"></el-step>
        <el-step title="入站"></el-step>
        <el-step title="上挂"></el-step>
        <el-step title="完结"></el-step>
      </el-steps>
      <el-steps :active="active" align-center v-if="isActive1">
        <el-step title="新订单"></el-step>
        <el-step title="派单"></el-step>
        <el-step title="上门或已发"></el-step>
        <el-step title="完结"></el-step>
      </el-steps>

    </el-col>
    <el-col :span="24">
      <el-col :span="5" :offset="4">
        <div class="el2-1">订单详情</div>
        <div class="el2-2">
          <div><label>客户备注 : {{xqData.remark}} </label></div>
          <div><label>注册电话 : {{xqData.registerPhone}}</label></div>
          <div><label>绑定电话 : {{xqData.bindPhone}}</label></div>
          <div><label>预约单号 : {{xqData.number}}</label></div>
          <div><label>用户名 : {{xqData.name}}</label></div>
          <div><label>联系电话 : {{xqData.phone}}</label></div>
          <div><label>物流入站备注 : {{xqData.inboundRemark}}</label></div>
          <div><label>省市区 : {{xqData.province}}{{xqData.city}}{{xqData.area}}</label></div>
          <div><label>收衣地址 : {{xqData.address}}</label></div>
          <div><label>预约时间 : {{xqData.deliveryDate}}</label></div>
          <div v-if="type||type1||type2"><label>新订单时间 : {{timeList1[0]}}</label></div>
          <div v-if="type"><label>已派时间 : {{timeList1[1]}}</label></div>
          <div v-if="type"><label>入站时间 : {{timeList1[2]}}</label></div>
          <div v-if="type"><label>上挂时间 : {{timeList1[3]}}</label></div>
          <div v-if="type"><label>送还时间 : {{timeList1[4]}}</label></div>
          <div v-if="type1||type2"><label>派单时间 : {{timeList1[1]}}</label></div>
          <div v-if="type1"><label>上门时间 : {{timeList1[2]}}</label></div>
          <div v-if="type2"><label>已发时间 : {{timeList1[2]}}</label></div>
          <div v-if="type"><label>完结时间 : {{timeList1[5]}}</label></div>
          <div v-if="type1||type2"><label>完结时间 : {{timeList1[3]}}</label></div>
          <div><label>衣物总数 : {{dataLength}}</label></div>
          <div><label>订单价格 : {{xqData.amount/100}}</label></div>
          <div><label>付款方式 : {{xqData.payMode}}</label></div>
          <div><label>付款状态 : {{xqData.payStatus}}</label></div>
          <div><label>服务类型 : {{xqData.type}}</label></div>
          <div><label>收单人员 : {{xqData.receiptPeople}}</label></div>
          <div><label>服务商户 : {{xqData.serviceStore}}</label></div>
        </div>
      </el-col>
      <el-col :span="11" :offset="1">
        <div class="el3" v-if="showyw">
          <div class="el3-1">已收商品</div>
          <div class="el3-2">
            <div class="el3-2-1" v-for="(data,index) in imgData">
              <div style="position: relative">
                <img class="listImg" :src="data.src" @click="goDetails(data,index)">
                <div class="listImg1" v-if="data.problemImage===false">
                  <label style="color: white;letter-spacing: 1px;">问题需注意</label>
                </div>
              </div>
              <div>
                <label>{{data.name}}</label>
              </div>
              <div v-if="data.price">
                <label>{{data.price/100}}元</label>
              </div>
              <div>
                <label>{{data.barCode}}</label>
              </div>
            </div>
            <el-dialog  :visible.sync="dialogVisible" style="text-align: center">
              <img class="imgsy" :src="dialogImageUrl">
            </el-dialog>
          </div>
        </div>
        <div class="el3" v-if="showxq">
          <div class="el3-1">衣物详情</div>
          <div>
            <div class="el3-3">
              <div><img :src="this.ywData.src" width="180" height="180" style="float: right;"
                        @click="dialogImg(this.ywData.src)"></div>
              <div style="width: 70%"><label>衣物瑕疵 :{{this.ywData.flaw}}</label></div>
              <div style="width: 70%"><label>洗后效果 :{{this.ywData.washingEffect}}</label></div>
              <div style="width: 70%"><label>衣物备注 :{{this.ywData.remark}}</label></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  import top from '@/assets/vue/top'
  import {getfinid, getfinid1, getfinid2} from "@/components/api/vipss";

  export default {
    components: {
      top,
    },
    data() {
      return {
        listData: [],
        xqData: [],
        imgData: [],
        active: 0,
        ywData: [],
        imgUrl: 'https://image.rwlai.com/',
        dataLength: '',
        showxq: false,
        showyw: true,
        isActive: true,
        isActive1: false,
        dialogVisible: false,
        dialogImageUrl: '',
        type: false,
        type1: false,
        type2: false,
        timeList: [],
        timeList1: [],
      }
    },
    methods: {
      getList() {
        this.listData = [];
        let a = this.$route.query.id;
        if (a.substr(a.length - 2, 2) == '03') {
          this.type = true;
          let b = {
            orderid: a,
          };
          getfinid(b).then((res) => {
            if (res.data.data.statusUpdateTime) {
              this.timeList = res.data.data.statusUpdateTime.split(',');
              this.timeList.forEach((value) => {
                value = this.getLocalTime(value);
                this.timeList1.push(value);
              })
            }

            if (res.data.code === 0) {
              this.listData = res.data.data.items;
              this.listData.forEach((value) => {
                if (value.image) {
                  let a = value.image.split(',');
                  a.forEach((value1) => {
                    this.imgData.push({
                      src: `${this.imgUrl}${value1}`,
                      id: value.id,
                      barCode: value.barCode,
                      name: value.laundryProduct.name,
                      price: value.laundryProduct.price,
                      problemImage: true,
                      xq: {
                        flaw: value.flaw,
                        remark: value.remark,
                        washingEffect: value.washingEffect,
                        src: `${this.imgUrl}${value1}`,
                      }
                    });
                  })
                }
                if (value.problemImage) {
                  let b = value.problemImage.split(',');
                  b.forEach((value1) => {
                    this.imgData.push({
                      src: `${this.imgUrl}${value1}`,
                      id: value.id,
                      barCode: value.barCode,
                      name: value.laundryProduct.name,
                      price: value.laundryProduct.price,
                      problemImage: false,
                      xq: {
                        flaw: value.flaw,
                        remark: value.remark,
                        washingEffect: value.washingEffect,
                        src: `${this.imgUrl}${value1}`,
                      }
                    });
                  })
                }
              });
              this.xqData = res.data.data;
              if (this.xqData.payMode == 0) {
                this.xqData.payMode = '微信支付'
              } else if (this.xqData.payMode == 1) {
                this.xqData.payMode = '余额支付'
              } else if (this.xqData.payMode == 2) {
                this.xqData.payMode = '卡支付'
              }
              if (this.xqData.payStatus == 0) {
                this.xqData.payStatus = '未付款';
              } else if (this.xqData.payStatus == 1) {
                this.xqData.payStatus = '已付款';
              }
              if (this.xqData.type == 1) {
                this.xqData.type = "洗衣"
              } else if (this.xqData.type == 2) {
                this.xqData.type = "高端洗护"
              }

              this.dataLength = res.data.data.items.length;
              this.active = res.data.data.status;
            }
          })
        } else if (a.substr(a.length - 2, 2) == '13') {
          this.type1 = true;
          this.isActive1 = true;
          this.isActive = false;
          let b = {
            orderid: a,
          };
          getfinid1(b).then((res) => {
            if (res.data.data.statusUpdateTime) {
              this.timeList = res.data.data.statusUpdateTime.split(',');
              this.timeList.forEach((value) => {
                value = this.getLocalTime(value);
                this.timeList1.push(value);
              })
            }
            if (res.data.code === 0) {
              this.listData = res.data.data.items;
              this.listData.forEach((value) => {
                if (value.image) {
                  let a = value.image.split(',');
                  a.forEach((value1) => {
                    this.imgData.push({
                      src: `${this.imgUrl}${value1}`,
                      id: value.id,
                      name: value.furnitureProduct.name,
                      price: value.furnitureProduct.price,
                      problemImage: true,
                      xq: {
                        flaw: value.flaw,
                        remark: value.remark,
                        washingEffect: value.washingEffect,
                        src: `${this.imgUrl}${value1}`,
                      }
                    });
                  })
                }
                if (value.problemImage) {
                  let b = value.problemImage.split(',');
                  b.forEach((value1) => {
                    this.imgData.push({
                      src: `${this.imgUrl}${value1}`,
                      id: value.id,
                      name: value.furnitureProduct.name,
                      price: value.furnitureProduct.price,
                      problemImage: false,
                      xq: {
                        flaw: value.flaw,
                        remark: value.remark,
                        washingEffect: value.washingEffect,
                        src: `${this.imgUrl}${value1}`,
                      }
                    });
                  })
                }
              });
              this.xqData = res.data.data;
              if (this.xqData.payMode == 0) {
                this.xqData.payMode = '微信支付'
              } else if (this.xqData.payMode == 1) {
                this.xqData.payMode = '余额支付'
              } else if (this.xqData.payMode == 2) {
                this.xqData.payMode = '卡支付'
              }
              if (this.xqData.payStatus == 0) {
                this.xqData.payStatus = '未付款';
              } else if (this.xqData.payStatus == 1) {
                this.xqData.payStatus = '已付款';
              }
              this.dataLength = res.data.data.items.length;
              this.active = res.data.data.status;
            }
          })
        } else if (a.substr(a.length - 2, 2) == '10') {
          this.type2 = true;
          this.isActive1 = true;
          this.isActive = false;
          let b = {
            orderid: a,
          };
          getfinid2(b).then((res) => {
            if (res.data.data.statusUpdateTime) {
              this.timeList = res.data.data.statusUpdateTime.split(',');
              this.timeList.forEach((value) => {
                value = this.getLocalTime(value);
                this.timeList1.push(value);
              })
            }

            if (res.data.code === 0) {
              let value1 = res.data.data.items[0].mallProduct;
              this.imgData.push({
                src: `${this.imgUrl}${res.data.data.waybillImage}`,
                name: value1.name,
                price: value1.price,
              });
              this.xqData = res.data.data;
              if (this.xqData.payMode == 0) {
                this.xqData.payMode = '微信支付'
              } else if (this.xqData.payMode == 1) {
                this.xqData.payMode = '余额支付'
              } else if (this.xqData.payMode == 2) {
                this.xqData.payMode = '卡支付'
              }
              if (this.xqData.payStatus == 0) {
                this.xqData.payStatus = '未付款';
              } else if (this.xqData.payStatus == 1) {
                this.xqData.payStatus = '已付款';
              }
              this.dataLength = res.data.data.items.length;
              this.active = res.data.data.status;
            }
          })
        }
      },
      goDetails(data, index) {
        if (data.problemImage === false) {
          this.ywData = data.xq;
          this.showyw = false;
          this.showxq = true;
        } else {
          this.dialogImageUrl = data.src;
          this.dialogVisible = true;
        }

      },
      goye() {
        this.$router.go(-1);
      },
      ywxq() {
        if (this.showxq === true) {
          this.showyw = true;
          this.showxq = false;
        }
      },
      dialogImg(data) {
        this.dialogImageUrl = data;
        this.dialogVisible = true;
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped>


  .el-breadcrumb {
    font-size: 18px;
  }

  .logo1 img {
    width: 200px;
    height: 30px;

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
  }

  .el3-3 {
    color: rgb(106, 119, 127);
    line-height: 40px;
    margin-left: 5%;
    word-wrap: break-word;
  }

  .listImg {
    width: 150px;
    height: 150px;
    background-size: 100%;
  }

  .listImg1 {
    background: rgba(255, 0, 0, 0.5);
    width: 100%;
    height: 25%;
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgsy {
    width: 60%;
  }
</style>
