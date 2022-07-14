import axios from '@/utils/qeuest'

export const allFavorate = (token) => {
  return axios({
    method: 'GET',
    url: '/user/favorites',
    headers: {
      Authorization: token
    }
  })
}
