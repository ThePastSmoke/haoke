import axios from '@/utils/qeuest'
/*
 ** 关键字搜索对应城市小区
 */

export const getcityCell = (name, id) => {
  return axios({
    method: 'GET',
    url: '/area/community/',
    params: {
      name,
      id
    }
  })
}

/*
 ** 查看已经发布的房源
 */
export const getLiveHome = (token) => {
  return axios({
    method: 'GET',
    url: '/user/houses',
    headers: {
      Authorization: token
    }
  })
}
