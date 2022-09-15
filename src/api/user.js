import axios from '@/utils/request'
export const getUserInfoAPI = () => {
  return axios({
    url: '/user'
    // headers: {
    //   authorization: token
    // }
  })
}

export const getFavoriteAPI = () => {
  return axios({
    url: '/user/favorites'
  })
}
