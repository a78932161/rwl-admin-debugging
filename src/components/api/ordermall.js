import axios from '@/fetch'

export function getmall(data) {
  return axios({
    url: "/mallorder/findbystatus",
    method: "post",
    params: data
  })
}

export function InvalidMall(data) {
  return axios({
    url: "/mallorder/cancel",
    method: "post",
    params: data
  })
}

export function deliveryMall(data) {
  return axios({
    url: "/store/finddistributestore",
    method: "post",
    params: data
  })
}

export function daochuMall(data) {
  return axios({
    url: "/mallorder/export",
    method: "post",
    params: data
  })
}

export function distributionMall(data) {
  return axios({
    url: "/mallorder/delivery",
    method: "post",
    params: data
  })
}

export function endMall(data) {
  return axios({
    url: "/mallorder/finish",
    method: "post",
    params: data
  })
}

export function recallOrder(data) {
  return axios({
    url: "/mallorder/canceldispatch",
    method: "post",
    params: data
  })
}
