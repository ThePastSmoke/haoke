import axios from '@/utils/qeuest'
// 用户登录
export const getLogin = (username, password) => {
  return axios({
    method: 'POST',
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}
