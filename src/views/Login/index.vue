<template>
  <div>
    <div>
      <div class="login_title">账号登录</div>
    </div>
    <div class="login_reg">
      <van-form submit-on-enter="false">
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
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
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
</style>
