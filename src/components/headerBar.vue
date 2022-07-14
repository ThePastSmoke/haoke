<template>
  <div class="father">
    <div class="login_title">
      <van-icon name="arrow-left" click @click="goBack" />
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    // 回退
    goBack() {
      history.back()
    }
  }
}
</script>

<style scoped lang="less">
.login_title {
  line-height: 45px;
  font-size: 18px;
  color: #fff;
  width: 100%;
  height: 45px;
  background-color: #21b97a;
  text-align: center;
  position: relative;
}

.van-icon-arrow-left {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 45px;
}
.van-icon {
  margin-left: 10px;
}
</style>
