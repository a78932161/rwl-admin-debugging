import axios from '@/fetch'

export function getlaundry(data) {
  return axios({
    url: "/laundryorder/findbytypeandstatus",
    method: "post",
    params:data
  })
}
export function Invalidlaundry(data) {
  return axios({
    url: "/laundryorder/cancel",
    method: "post",
    params:data
  })
}

export function outlaundry(data) {
  return axios({
    url: "/laundryorder/findbytimeoutandtype",
    method: "post",
    params:data
  })
}

export function storelaundry(data) {
  return axios({
    url: "/store/finddistributestore",
    method: "post",
    params:data
  })
}

export function deliverylaundry(data) {
  return axios({
    url: "/laundryorder/sfcollect",
    method: "post",
    params:data
  })
}

export function distributionlaundry(data) {
  return axios({
    url: "/laundryorder/storepickup",
    method: "post",
    params:data
  })
}

export function shipmentlaundry(data) {
  return axios({
    url: "/laundryorder/sfsend",
    method: "post",
    params:data
  })
}


export function endlaundry(data) {
  return axios({
    url: "/laundryorder/finish",
    method: "post",
    params:data
  })
}

export function returnlaundry(data) {
  return axios({
    url: "/laundryorder/storegiveback",
    method: "post",
    params:data
  })
}
export function withdrawlaundry(data) {
  return axios({
    url: "/laundryorder/canceldispatch",
    method: "post",
    params:data
  })
}
