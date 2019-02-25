import axios from '@/fetch'

export function laundryAdd (data) {
  return axios({
    url: "/laundryproduct/save",
    method: "post",
    data
  })
}

export function laundryselect (data) {
  return axios({
    url: "/laundryproduct/findbytypeandcategory",
    method: "post",
    params:data
  })
}

export function laundryUp (data,a1) {
  return axios({
    url: "/laundryproduct/update",
    method: "post",
    params:data,
    data:a1,
  })
}


export function selectId (data) {
  return axios({
    url: "/laundryproduct/findbynumber",
    method: "post",
    params:data
  })
}


export function shelf (data) {
  return axios({
    url: "/laundryproduct/upoffshelf",
    method: "post",
    params:data
  })
}

