import axios from '@/fetch'

export function getFurniture (data) {
  return axios({
    url: "/furnitureorder/findbystatus",
    method: "post",
    params:data
  })
}

export function InvalidFurniture(data) {
  return axios({
    url: "/furnitureorder/cancel",
    method: "post",
    params:data
  })
}

export function deliveryFurniture(data) {
  return axios({
    url: "/store/finddistributestore",
    method: "post",
    params:data
  })
}

export function distributionFurniture(data) {
  return axios({
    url: "/furnitureorder/delivery",
    method: "post",
    params:data
  })
}

export function endFurniture(data) {
  return axios({
    url: "/furnitureorder/finish",
    method: "post",
    params:data
  })
}

export function withdrawFurniture(data) {
  return axios({
    url: "/furnitureorder/canceldispatch",
    method: "post",
    params:data
  })
}
