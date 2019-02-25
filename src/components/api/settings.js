import axios from '@/fetch'

export function getreward(data) {
  return axios({
    url: "/recharge/getall",
    method: "post",
    data
  })
}

export function upreward(id, data) {
  return axios({
    url: "/recharge/setrecharge",
    method: "post",
    params: id,
    data: data,

  })
}

export function getCommission(data) {
  return axios({
    url: "/commission/getall",
    method: "post",
    data
  })
}

export function upCommission(id, data) {
  return axios({
    url: "/commission/setcommission",
    method: "post",
    params: id,
    data: data,
  })
}

export function upPsw(data) {
  return axios({
    url: "/role/modifypassword",
    method: "post",
    params: data,
  })
}


export function getproblem(data) {
  return axios({
    url: "/platformtext/findbytype",
    method: "post",
    params: data,
  })
}

export function addproblem(data) {
  return axios({
    url: "/platformtext/save",
    method: "post",
    data,
  })
}

export function upproblem(data) {
  return axios({
    url: "/platformtext/update",
    method: "post",
    params: data,
  })
}

export function getExpress(data) {
  return axios({
    url: "/freightset/getall",
    method: "post",
    params: data,
  })
}

export function upExpress(id, data) {
  return axios({
    url: "/freightset/set",
    method: "post",
    params: id,
    data: data,
  })
}

