<template>
  <div>
    <div>
      <div>
        <img
          src="http://liufusong.top:8080/img/profile/bg.png"
          alt="背景图"
          class="my_bj"
        />
      </div>
      <!-- 登录模块 -->
      <div class="my_login">
        <div class="my_via">
          <img
            src="http://liufusong.top:8080/img/profile/avatar.png"
            alt="头像"
          />
          <p class="youke">游客</p>
          <!-- <button>去登陆</button> -->
          <van-button type="primary" @click="goLogin">去登陆</van-button>
        </div>
      </div>
      <!-- 选项 -->
      <div class="banner">
        <div>
          <van-icon name="star-o" />
          <p>我的收藏</p>
        </div>
        <div>
          <van-icon name="home-o" />
          <p>我的出租</p>
        </div>
        <div>
          <van-icon name="underway-o" />
          <p>看房记录</p>
        </div>
        <div>
          <van-icon name="after-sale" />
          <p>成为房主</p>
        </div>
        <div>
          <van-icon name="contact" />
          <p>个人资料</p>
        </div>
        <div>
          <van-icon name="phone-circle-o" />
          <p>联系我们</p>
        </div>
      </div>
      <!-- 广告 -->
      <div class="my_ad_pic">
        <img src="http://liufusong.top:8080/img/profile/join.png" alt="广告" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  methods: {
    goLogin() {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style scoped lang="less">
.my_bj {
  width: 100%;
}
.my_login {
  text-align: center;
  position: fixed;
  top: 133px;
  left: 28px;
  width: 85%;
  height: 150px;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.3);
  .my_via {
    width: 80px;
    height: 80px;
    background-color: #f1f1ef;
    border-radius: 50%;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -35px;
    text-align: center;

    img {
      text-align: center;
      width: 70px;
      height: 70px;
      margin-top: 5px;
    }
    .youke {
      margin-top: 20px;
      font-size: 13px;
    }
    button {
      width: 70px;
      height: 30px;
      line-height: 30px;
      margin-top: 20px;
      font-size: 13px;
      color: #fff;
      background-color: #21b97a;
      border: transparent;
      border-radius: 5px;
    }
  }
}
.banner {
  margin-top: 90px;
  text-align: center;
  div {
    margin-top: 20px;
    display: inline-block;
    width: 125px;
    height: 90px;
    .van-icon {
      font-size: 20px;
      margin-bottom: 10px;
    }
    p {
      font-size: 13px;
    }
  }
}
.my_ad_pic {
  width: 100%;
  text-align: center;
  img {
    width: 92%;
  }
}
</style>
