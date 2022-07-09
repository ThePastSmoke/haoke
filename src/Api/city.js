import axios from '@/utils/qeuest'
// 全部城市 获取哪一级的城市，1 表示获取所有城市数据 2 表示城市下区的数据
export const getCity = (level) => {
  return axios({
    url: '/area/city',
    params: {
      level
    }
  })
}

// 热门城市
export const getHotCity = () => {
  return axios({
    url: '/area/hot'
  })
}
