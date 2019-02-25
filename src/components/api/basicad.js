import axios from '@/fetch'


export function getAd(data) {
  return axios({
    url: "/advertisement/findbytype",
    method: "post",
    params:data
  })
}

export function upAd(id, data) {
  return axios({
    url: "/advertisement/update",
    method: "post",
    data: data,
    params: id
  })
}


export function saveAd(data) {
  return axios({
    url: "/advertisement/save",
    method: "post",
     data
  })
}
