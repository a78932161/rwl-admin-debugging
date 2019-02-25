import axios from '@/fetch'

export function mallselect (data) {
  return axios({
    url: "/mallproduct/findbycategory",
    method: "post",
    params:data
  })
}


export function mallAdd (data) {
  return axios({
    url: "/mallproduct/save",
    method: "post",
    data
  })
}

export function mallUp (data,a1) {
  return axios({
    url: "/mallproduct/update",
    method: "post",
    params:data,
    data:a1,
  })
}

export function mallId (data) {
  return axios({
    url: "/mallproduct/findbynumber",
    method: "post",
    params:data
  })
}

export function mallhelf (data) {
  return axios({
    url: "/mallproduct/upoffshelf",
    method: "post",
    params:data
  })
}
