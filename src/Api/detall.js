import axios from '@/utils/qeuest'

// 查询房屋具体信息
export const getHomeInfo = (id) => {
  return axios({
    method: 'GET',
    url: `/houses/${id}`
  })
}

// 房屋是否收藏
export const getHomeCollect = (id, token) => {
  return axios({
    method: 'GET',
    url: '/user/favorites/' + id,
    headers: {
      Authorization: token
    }
  })
}

/*
 ** 添加收藏
 */

export const AddCollection = (id, token) => {
  return axios({
    method: 'POST',
    url: '/user/favorites/' + id,
    headers: {
      Authorization: token
    }
  })
}

/*
 ** 删除收藏
 */
export const deleteCollection = (id, token) => {
  return axios({
    method: 'DELETE',
    url: '/user/favorites/' + id,
    headers: {
      Authorization: token
    }
  })
}
