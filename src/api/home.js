import axios from '@/utils/request'

export const getSwiperAPI = () => {
  return axios({
    url: 'home/swiper'
  })
}

export const getRentGroupAPI = () => {
  return axios({
    url: '/home/groups'
  })
}
