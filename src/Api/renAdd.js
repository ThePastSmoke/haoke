import axios from '@/utils/qeuest'
/*
 ** 发布房源所需信息
 */
export const getReleaseHomedata = (token) => {
  return axios({
    method: 'GET',
    url: '/houses/params',
    headers: {
      Authorization: token
    }
  })
}

/*
 ** 处理图片接口
 */
export const getImg = (data) => {
  return axios({
    method: 'POST',
    url: '/houses/image',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/*
 ** 发布房源
 */

export const releaseHome = (data, token) => {
  return axios({
    method: 'POST',
    url: '/user/houses',
    data,
    headers: {
      Authorization: token
    }
  })
}
