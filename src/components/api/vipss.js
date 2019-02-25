import axios from '@/fetch'

export function getvip(data) {
  return axios({
    url: "/user/findbytimeandarea",
    method: "post",
    params: data
  })
}


export function getvip1(data) {
  return axios({
    url: "/user/findone",
    method: "post",
    params: data
  })
}

export function getrecords(data) {
  return axios({
    url: "/user/obtainuserrecord",
    method: "post",
    params: data
  })
}

export function getfinid(data) {
  return axios({
    url: "/laundryorder/findone",
    method: "post",
    params: data
  })
}

export function getfinid1(data) {
  return axios({
    url: "/furnitureorder/findone",
    method: "post",
    params: data
  })
}

export function getfinid2(data) {
  return axios({
    url: "/mallorder/findone",
    method: "post",
    params: data
  })
}

export function vipNumber(data) {
  return axios({
    url: "/statistical/usercountstatistical",
    method: "post",
    params: data
  })
}

export function feedback(data) {
  return axios({
    url: "/feedback/findbytime",
    method: "post",
    params: data
  })
}

export function vipConsumption(data) {
  return axios({
    url: "/user/findbyconsumestatusandtimeandarea",
    method: "post",
    params: data
  })
}

export function Consumption(data) {
  return axios({
    url: "/user/findbydeposit",
    method: "post",
    params: data
  })
}

export function xyConsumption(data) {
  return axios({
    url: "/statistical/laundryconsumestatistical",
    method: "post",
    params: data
  })
}


export function gdxhConsumption(data) {
  return axios({
    url: "/statistical/highlaundryconsumestatistical",
    method: "post",
    params: data
  })
}


export function xrjjConsumption(data) {
  return axios({
    url: "/statistical/mallconsumestatistical",
    method: "post",
    params: data
  })
}

export function xrscConsumption(data) {
  return axios({
    url: "/statistical/furnitureconsumestatistical",
    method: "post",
    params: data
  })
}

export function getvips(data) {
  return axios({
    url: "/user/findbybindindcard",
    method: "post",
    params: data
  })
}


export function cxNumber(data) {
  return axios({
    url: "/user/findbynumber",
    method: "post",
    params: data
  })
}

export function cxPhone(data) {
  return axios({
    url: "/user/findbyphone",
    method: "post",
    params: data
  })
}

