import axios from '@/utils/qeuest'
// 查询房屋具体信息
export const getHomeInfo = (id) => {
  return axios({
    method: 'GET',
    url: `/houses/${id}`
  })
}
