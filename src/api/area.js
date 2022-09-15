import axios from '@/utils/request'

export const getCityAPI = (level) => {
  return axios({
    url: 'area/city',
    params: {
      level
    }
  })
}

export const getHotCityAPI = () => {
  return axios({
    url: 'area/hot'
  })
}

export const getAreaInfoAPI = (name) => {
  return axios({
    url: '/area/info',
    params: {
      name
    }
  })
}
