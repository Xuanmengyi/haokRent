import axios from '@/utils/request'

export const getHouseConditionAPI = (id) => {
  return axios({
    url: '/houses/condition',
    params: {
      id
    }
  })
}

export const getHouseAPI = (
  cityId,
  area,
  subway,
  rentType,
  price,
  more,
  roomType,
  oriented,
  characteristic,
  floor,
  start,
  end
) => {
  return axios({
    url: '/houses',
    params: {
      cityId,
      area,
      subway,
      rentType,
      price,
      more,
      roomType,
      oriented,
      characteristic,
      floor,
      start,
      end
    }
  })
}
