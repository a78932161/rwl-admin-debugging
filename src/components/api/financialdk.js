import axios from '@/fetch'

export function addRecharge(data) {
  return axios({
    url: "/guidecard/save",
    method: "post",
    data
  })
}

export function getAll(data) {
  return axios({
    url: "/guidecard/findall",
    method: "post",
    params:data
  })
}

export function getphone(data) {
  return axios({
    url: "/user/findbyregisterphone",
    method: "post",
    params:data
  })
}


export function addRefund(data) {
  return axios({
    url: "/refund/save",
    method: "post",
    data
  })
}

export function getRefund(data) {
  return axios({
    url: "/refund/findall",
    method: "post",
    params:data
  })
}

export function idRecharge(data) {
  return axios({
    url: "/guidecard/findone",
    method: "post",
    params:data
  })
}

export function idRefund(data) {
  return axios({
    url: "/refund/findone",
    method: "post",
    params:data
  })
}

export function findRefund(data) {
  return axios({
    url: "/refund/findbyphone",
    method: "post",
    params:data
  })
}
export function findRecharge(data) {
  return axios({
    url: "/guidecard/findbyphone",
    method: "post",
    params:data
  })
}

export function deduction(data) {
  return axios({
    url: "/chargeback/save",
    method: "post",
    data
  })
}

export function deductionFindall(data) {
  return axios({
    url: "/chargeback/findall",
    method: "post",
    params:data
  })
}


export function deductionPhone(data) {
  return axios({
    url: "/chargeback/findbyphone",
    method: "post",
    params:data
  })
}

export function deductionId(data) {
  return axios({
    url: "/chargeback/findone",
    method: "post",
    params:data
  })
}

