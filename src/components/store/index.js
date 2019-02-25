import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count: 1,
  radio1: '2',
  radio2: '2',
  ieData: [],
  rechargeId: '',
  refundId: '',
  vipId: 0,
  orderFind: '',
  orderArea: [],
  deductionRadio: '1',
};
const mutations = {
  changeRadio(state, n) {
    state.deductionRadio = n;
  },
  changeRadio1(state, n) {
    state.radio1 = n;
  },
  changeRadio2(state, n) {
    state.radio2 = n;
  },
  getieData(state, n) {
    state.ieData = n;
  }

};

export default new Vuex.Store({
  state,
  mutations,
});
