import axios from '@/utils/qeuest'
// 用户注册
export const getRegiste = (username, password) => {
  return axios({
    method: 'POST',
    url: '/user/registered',
    data: {
      username,
      password
    }
  })
}

// 获取用户的信息资料
export const getUserInfo = (token) => {
  return axios({
    url: '/user',
    headers: {
      Authorization: token
    }
  })
}
