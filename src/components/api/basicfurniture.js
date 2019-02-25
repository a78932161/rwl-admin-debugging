import axios from '@/fetch'

export function furnitureselect (data) {
  return axios({
    url: "/furnitureproduct/findall",
    method: "post",
    data
  })
}


export function furnitureAdd (data) {
  return axios({
    url: "/furnitureproduct/save",
    method: "post",
    data
  })
}

export function furnitureUp (data,a1) {
  return axios({
    url: "/furnitureproduct/update",
    method: "post",
    params:data,
    data:a1,
  })
}

export function furnitureId (data) {
  return axios({
    url: "/furnitureproduct/findbynumber",
    method: "post",
    params:data
  })
}

export function furnitureshelf (data) {
  return axios({
    url: "/furnitureproduct/upoffshelf",
    method: "post",
    params:data
  })
}
