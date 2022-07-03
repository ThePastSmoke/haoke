import axios from '@/utils/qeuest'
// 获取轮播图
export const getPic = () => {
  return axios({
    url: '/home/swiper'
  })
}
// 获取租房小组
export const getGroups = () => {
  return axios({
    url: '/home/groups'
  })
}
