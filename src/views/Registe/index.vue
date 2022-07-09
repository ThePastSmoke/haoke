<template>
  <div>
    <div>
      <!-- <div class="login_title">去注册</div> -->
      <headerBar title="去注册"></headerBar>
    </div>
    <!-- 账号密码登录 -->
    <div class="login_reg">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar.vue'
import { getRegiste } from '@/Api'
export default {
  name: 'Registe',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  components: { headerBar },
  methods: {
    onSubmit(values) {
      this.getRegiste()
    },
    async getRegiste() {
      const res = await getRegiste(this.username, this.password)
      console.log(res)
      this.$toast(res.data.description)
      if (res.status === 200) {
        this.$router.push({
          path: '/home/profile'
        })
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
