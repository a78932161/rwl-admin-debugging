import axios from '@/fetch'

export function getRoleList(data) {
  return axios({
    url: "/role/findbyrolenumber",
    method: "post",
    params:data
  })
}

export function addRole(data) {
  return axios({
    url: "/role/savegeneralhq",
    method: "post",
    data
  })
}

export function upRole(data) {
  return axios({
    url: "/role/modifypassword",
    method: "post",
    params:data
  })
}

export function delRole(data) {
  return axios({
    url: "/role/deleterole",
    method: "post",
    params:data
  })
}

export function upPurview(data) {
  return axios({
    url: "/role/modifypermission",
    method: "post",
    params:data
  })
}


export function findPurview(data) {
  return axios({
    url: "/role/findone",
    method: "post",
    params:data
  })
}
