<template>
  <div>
    <div class="ord-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="gofinancial">财务管理</span></el-breadcrumb-item>
        <el-breadcrumb-item>财务退款</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="ord-content2">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="120px"
               class="demo-ruleForm">
        <el-form-item label="转账类型 :">
          <!--<el-radio v-model="radio" v-if="" label="1" @change="changeRadio('1')">扣款</el-radio>-->
          <el-radio v-model="radio"  label="2" @change="changeRadio('2')">退款</el-radio>
        </el-form-item>
        <div v-show="isRadio">
          <el-form-item label="扣款金额 :" prop="money">
            <el-input v-model="ruleForm.money"></el-input>
          </el-form-item>
          <el-form-item label="实际扣款金额 :">
            <label>¥{{ruleForm.money}}</label>
          </el-form-item>
          <el-form-item label="姓名 :" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机 :" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="注册手机号 :" prop="userPhone">
            <el-input v-model="ruleForm.userPhone" style="width: 70%"></el-input>
            <el-button type="primary" @click="getVipId">读取</el-button>
          </el-form-item>
          <el-form-item class="hyxx" label="会员信息 :">
            <div><label>会员 I D : {{yhxx.number}}</label></div>
            <div><label>注册时间 : {{yhxx.createtime}}</label></div>
            <div><label>绑定手机 : {{yhxx.phone}}</label></div>
            <div><label>现有余额 : {{yhxx.balance}}</label></div>
          </el-form-item>
          <el-form-item label="备注 :" prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确认扣款</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
        <div v-show="!isRadio">
          <el-form-item label="充值金额 :" prop="money">
            <el-input v-model="ruleForm.money"></el-input>
          </el-form-item>
          <el-form-item label="实际存转金额 :">
            <label>¥{{ruleForm.money}}</label>
          </el-form-item>
          <el-form-item label="姓名 :" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机 :" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="注册手机号 :" prop="userPhone">
            <el-input v-model="ruleForm.userPhone" style="width: 70%"></el-input>
            <el-button type="primary" @click="getVipId">读取</el-button>
          </el-form-item>
          <el-form-item class="hyxx" label="会员信息 :">
            <div><label>会员 I D : {{yhxx.number}}</label></div>
            <div><label>注册时间 : {{yhxx.createtime}}</label></div>
            <div><label>绑定手机 : {{yhxx.phone}}</label></div>
            <div><label>现有余额 : {{yhxx.balance}}</label></div>
          </el-form-item>
          <el-form-item label="备注 :" prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm1('ruleForm')">确认退款</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div v-show="isRadio">
      <div class="ord-content3">
        <div><label>扣款记录</label></div>
        <div style="text-align: right;">
          <label>扣款记录查询 :</label>
          <el-input placeholder="请输入手机号" style="width: 52%" v-model="phone"></el-input>
          <el-button type="primary" @click="phoneRefund">查询</el-button>
        </div>
      </div>
      <div class="ord-content3">
        <el-table
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="createtime"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="transferPeople"
            label="操作人">
          </el-table-column>
          <el-table-column
            prop="money"
            label="扣款金额">
          </el-table-column>
          <el-table-column
            prop="userNumber"
            label="转出账号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="godetail(scope.row)">详情</el-button>
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
    <div v-show="!isRadio">
      <div class="ord-content3">
        <div><label>退款记录</label></div>
        <div style="text-align: right;">
          <label>退款记录查询 :</label>
          <el-input placeholder="请输入手机号" style="width: 52%" v-model="phone1"></el-input>
          <el-button type="primary" @click="phoneRefund">查询</el-button>
        </div>
      </div>
      <div class="ord-content3">
        <el-table
          border
          :data="tableData1"
          style="width: 100%">
          <el-table-column
            prop="createtime"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="transferPeople"
            label="操作人">
          </el-table-column>
          <el-table-column
            prop="money"
            label="转存金额">
          </el-table-column>
          <el-table-column
            prop="userNumber"
            label="转入账号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="godetail1(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align: center;margin: 5% 0 5% 0;">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange1"
          :page-size="10"
          :total="total1">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import "@/assets/js/city-data"
  import {
    addRecharge,
    getAll,
    getphone,
    addRefund,
    getRefund,
    findRecharge,
    findRefund,
    deductionFindall,
    deduction,
    deductionPhone
  } from "@/components/api/financialdk";

  export default {
    components: {},
    data() {
      let money = (rule, value, callback) => {
        if (/^[1-9]\d*$/.test(value) === false) {
          callback(new Error('必须是正数'));
        } else {
          callback();
        }
      };

      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        options: CityInfo,
        value1: '',
        a: 10,
        showFlag: true,
        radio:'2',
        isRadio: false,
        total: 10,
        total1: 10,
        size: 10,
        size1: 5,
        page: 1,
        page1: 1,
        phone: '',
        phone1: '',
        ruleForm: {
          money: 1,
          name: '',
          phone: '',
          userPhone: '',
          remark: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          cardId: [
            {required: true, message: '请输入卡号', trigger: 'blur'},
          ],
          cardType: [
            {required: true, message: '请选择卡类型', trigger: 'change'}
          ],

          resource: [
            {required: true, message: '请选择转账类型', trigger: 'change'}
          ],
          money: [
            {required: true, message: '请输入充值金额', trigger: 'blur'},
            {validator: money, trigger: 'blur'}
          ],

          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          userPhone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          remark: [
            {required: true, message: '请填写备注', trigger: 'blur'}
          ]
        },
        tableData: [],
        tableData1: [],
        yhxx: [],
      }
    },
    methods: {
      getList() {
        if (this.isRadio === true) {
          if (this.phone) {
            let a = {
              phone: this.phone,
            };
            deductionPhone(a).then((res) => {
              if (res.data.data.content.length > 0) {
                res.data.data.content.forEach((value) => {
                  value.createtime = this.getLocalTime(value.createtime);
                  value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
                  value.money = value.money / 100;
                });
                this.total = res.data.data.totalElements;
                this.tableData = res.data.data.content;
              } else {
                this.$message({
                  message: '该手机号无记录!',
                  type: 'warning'
                });
              }
            });
          } else {
            let a = {
              size: this.size,
              page: this.page
            };
            deductionFindall(a).then((res) => {
              console.log(res);
              res.data.data.content.forEach((value) => {
                value.createtime = this.getLocalTime(value.createtime);
                value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
                value.money = value.money / 100;
              });
              this.total = res.data.data.totalElements;
              this.tableData = res.data.data.content;
            })
          }

        } else if (this.isRadio === false) {
          if (this.phone1) {
            let a = {
              phone: this.phone1,
            };
            findRefund(a).then((res) => {
              if (res.data.data.content.length > 0) {
                res.data.data.content.forEach((value) => {
                  value.createtime = this.getLocalTime(value.createtime);
                  value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
                  value.money = value.money / 100;
                });
                this.total1 = res.data.data.totalElements;
                this.tableData1 = res.data.data.content;
              } else {
                this.$message({
                  message: '该手机号无记录!',
                  type: 'warning'
                });
              }
            });

          } else {
            let b = {
              size: this.size1,
              page: this.page1
            };
            getRefund(b).then((res1) => {
              res1.data.data.content.forEach((value) => {
                value.createtime = this.getLocalTime(value.createtime);
                value.statusUpdateTime = statusUpdateTime(value.statusUpdateTime);
                value.money = value.money / 100;
              });
              this.total1 = res1.data.data.totalElements;
              this.tableData1 = res1.data.data.content;
            })
          }
        }
      },
      getVipId() {
        let a = {
          registerphone: this.ruleForm.userPhone,
        };
        getphone(a).then((res) => {
          if (res.data.code === 0) {
            res.data.data.createtime = this.getLocalTime(res.data.data.createtime);
            res.data.data.balance = res.data.data.balance / 100;
            this.yhxx = res.data.data;
          } else {
            this.$message({
              showClose: true,
              message: `${res.data.msg}`,
              type: 'warning'
            });
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.money = this.ruleForm.money * 100;
            deduction(this.ruleForm).then((res) => {
              if (res.data.code === 0) {
                this.resetForm('ruleForm');
                this.getList();
                this.$message({
                  showClose: true,
                  message: `${res.data.msg}`,
                  type: 'success'
                });
              } else {
                this.ruleForm.money = this.ruleForm.money / 100;
                this.$message({
                  showClose: true,
                  message: `${res.data.msg}`,
                  type: 'warning'
                });
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: '请填写完整!',
              type: 'warning'
            });
            return false;
          }
        });
      },
      submitForm1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.money = this.ruleForm.money * 100;
            addRefund(this.ruleForm).then((res) => {
              if (res.data.code === 0) {
                this.resetForm('ruleForm');
                this.getList();
                this.$message({
                  showClose: true,
                  message: `${res.data.msg}`,
                  type: 'success'
                });
              } else {
                this.ruleForm.money = this.ruleForm.money / 100;
                this.$message({
                  showClose: true,
                  message: `${res.data.msg}`,
                  type: 'warning'
                });
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: '请填写完整!',
              type: 'warning'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.yhxx = [];
      },
      godetail(row) {
        this.$store.state.rechargeId = row.id;
        this.$store.state.refundId = '';
        this.$emit('mmp', true);
      },
      godetail1(row) {
        this.$store.state.refundId = row.id;
        this.$store.state.rechargeId = '';
        this.$emit('mmp', true);
      },
      gofinancial() {
        this.$emit('mmp1', true);
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/, ' ');
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      handleCurrentChange1(val) {
        this.page1 = val;
        this.getList();
      },
      phoneRefund() {
        this.getList();
      },
      changeRadio(data) {
        this.$store.commit('changeRadio', data);
      },
    },
    mounted() {
      this.getList();
    },
    watch: {
      radio(newValue) {
        if (newValue === '1') {
          this.isRadio = true;
          this.getList();
          this.resetForm('ruleForm');
        } else if (newValue === '2') {
          this.isRadio = false;
          this.getList();
          this.resetForm('ruleForm');
        }
      }
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 18px;
  }

  .ord-top {
    margin: 0 0 3% 0;
    text-align: center;
  }

  .ord-content {
    display: flex;
    justify-content: space-between;
    margin: 0 0 5% 0;
  }

  .ord-content1 {
    display: flex;
    width: 30%;
  }

  .demo-ruleForm {
    width: 40%;
    margin: auto;
  }

  .ord-content3 {
    margin-bottom: 3%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
