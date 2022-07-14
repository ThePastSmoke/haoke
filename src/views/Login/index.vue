<template>
  <div>
    <div>
      <!-- <div class="login_title">账号登录</div> -->
      <headerBar title="账号登录"></headerBar>
    </div>
    <!-- 账号密码登录 -->
    <div class="login_reg">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="rules.userName"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="rules.psw"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
    <!-- 注册 -->
    <div class="register">
      <div @click="goRegister">还没有账号去注册~</div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar.vue'
import { getLogin } from '@/Api'
export default {
  data() {
    return {
      username: '',
      password: '',
      // 登录表单验证
      rules: {
        userName: [
          {
            required: true,
            message: '用户名不能为空'
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
            message: '用户名不能少于六位'
          }
        ],
        psw: [
          {
            required: true,
            message: '密码不能为空'
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
            message: '密码不能少于六位'
          }
        ]
      }
    }
  },
  components: { headerBar },
  methods: {
    onSubmit(values) {
      this.getLogin()
    },
    goRegister() {
      this.$router.push({
        path: '/registe'
      })
    },
    async getLogin() {
      const res = await getLogin(this.username, this.password)
      if (res.data.status === 200) {
        localStorage.setItem('HKZF_TOKEN', JSON.stringify(res.data.body.token))
        this.$toast(res?.data?.description)
        this.$router.push({
          path: '/home/profile'
        })
      } else {
        this.$toast(res?.data?.description)
      }
    }
  }
}
</script>

<style scoped lang="less">
.login_title {
  text-align: center;
  line-height: 45px;
  font-size: 18px;
  color: #fff;
  width: 100%;
  height: 45px;
  background-color: #21b97a;
}
.login_reg {
  margin-top: 30px;
}
.van-button--info {
  background-color: #21b97a;
  border: transparent;
}
.register {
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
}
</style>
