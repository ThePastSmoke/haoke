import axios from '@/utils/qeuest'

/*
 ** 查询房源数据
 */

export const getHomeMap = (id) => {
  return axios({
    method: 'GET',
    url: '/area/map',
    params: {
      id
    }
  })
}
