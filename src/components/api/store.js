import axios from '@/fetch'

export function getStore(data) {
  return axios({
    url: "/store/findbyagent",
    method: "post",
    params: data
  })
}


export function addStore(data) {
  return axios({
    url: "/store/save",
    method: "post",
    data
  })
}

export function addRole(data) {
  return axios({
    url: "/role/savestore",
    method: "post",
    data
  })
}


export function BusinessSwitch(data) {
  return axios({
    url: "/store/modifystatus",
    method: "post",
    params:data
  })
}
