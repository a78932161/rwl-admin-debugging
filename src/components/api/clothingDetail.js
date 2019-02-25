import axios from '@/fetch'

export function xygetDetails(data) {
  return axios({
    url: "/statistical/laundryproductstatistical",
    method: "post",
    params: data
  })
}

export function xhgetDetails(data) {
  return axios({
    url: "/statistical/highlaundryproductstatistical",
    method: "post",
    params: data
  })
}

export function scgetDetails(data) {
  return axios({
    url: "/statistical/mallproductstatistical",
    method: "post",
    params: data
  })
}

export function jjgetDetails(data) {
  return axios({
    url: "/statistical/furnitureproductstatistical",
    method: "post",
    params: data
  })
}


