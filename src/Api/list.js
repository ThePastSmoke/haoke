import axios from '@/utils/qeuest'
// 根据条件查选房屋
export const getList = (
  cityId,
  area,
  subway,
  stat,
  end,
  rentType,
  price,
  roomType,
  oriented,
  characteristic,
  floor
) => {
  return axios({
    url: '/houses',
    params: {
      cityId, // 城市id
      area, // 区域id
      subway, // 地铁id
      stat, // 请求开始的数据
      end, // 请求结束的数据
      rentType, // 房屋类型 整租true 合租true
      price, // 价格
      roomType, // 房屋类型
      oriented, // 房屋朝向
      characteristic, // 标签
      floor // 楼层
    }
  })
}
// 获取筛选后的列表
export const gteFilterList = (
  cityId,
  stat,
  end,
  // roomType,
  // oriented,
  // characteristic,
  // floor
  more
) => {
  return axios({
    url: '/houses',
    params: {
      cityId, // 城市id
      stat, // 请求开始的数据
      end, // 请求结束的数据
      // roomType, // 房屋类型
      // oriented, // 房屋朝向
      // characteristic, // 标签
      // floor // 楼层
      more
    }
  })
}

/*
 **  地图里获取具体房屋
 */

export const getmapHome = (cityId, area) => {
  return axios({
    method: 'GET',
    url: '/houses',
    params: {
      cityId,
      area
    }
  })
}
// 区域点击确定获取数据

// /area/city  获取城市列表 level - 获取哪一级的城市，1 表示获取所有城市数据 2 表示城市下区的数据

// 获取房屋查选条件
export const getCitySon = (id) => {
  return axios({
    method: 'GET',
    url: '/houses/condition',
    params: {
      id
    }
  })
}
