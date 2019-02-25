import axios from '@/fetch'

export function analysis(data) {
  return axios({
    url: "/statistical/orderanalysis",
    method: "post",
    params: data
  })
}

export function orderNumber(data) {
  return axios({
    url: "/statistical/newordercount",
    method: "post",
    params: data
  })
}



export function oldOrder(data) {
  return axios({
    url: "/oldorder/findall",
    method: "post",
    params: data
  })
}
