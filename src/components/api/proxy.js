import axios from '@/fetch'

export function getProxyList(data) {
  return axios({
    url: "/role/findbyrolenumberandaccountid",
    method: "post",
    params:data
  })
}

export function addProxy(data) {
  return axios({
    url: "/role/savegeneralagent",
    method: "post",
    data
  })
}

export function delProxy(data) {
  return axios({
    url: "/role/deleterole",
    method: "post",
    params:data
  })
}
