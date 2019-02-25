import axios from '@/fetch'

export function getAgents(data) {
  return axios({
    url: "/agent/findall",
    method: "post",
    params: data
  })
}

export function addAgents(data) {
  return axios({
    url: "/agent/save",
    method: "post",
    data
  })
}

export function upAgents(id,data) {
  return axios({
    url: "/agent/update",
    method: "post",
    params: id,
    data
  })
}


export function addRole(data) {
  return axios({
    url: "/role/saveagent",
    method: "post",
    data
  })
}

