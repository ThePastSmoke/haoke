<template>
  <div>
    <!-- 头部轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="my-swipe" />
      </van-swipe-item>
    </van-swipe>
    <!-- 搜索栏 -->
    <van-search
      v-model="value"
      show-action
      label="北京"
      placeholder="请输入小区或地址"
      class="search"
    >
      <div slot="label" @click="goCity">
        北京 <van-icon name="arrow-down" />
      </div>
      <!-- <div slot="left-icon"><van-icon name="arrow-down" /></div> -->
      <template #action>
        <div class="icon">
          <van-icon name="map-marked" @click="goMap" />
        </div>
      </template>
    </van-search>
    <!-- 字体图标 -->
    <div class="bar">
      <div @click="goList">
        <van-icon name="wap-home-o" class="icon" />
        <p class="text">整租</p>
      </div>
      <div @click="goList">
        <van-icon name="friends-o" class="icon" />
        <p class="text">合租</p>
      </div>
      <div @click="goMap">
        <van-icon name="map-marked" class="icon" />
        <p class="text">地图找房</p>
      </div>
      <div>
        <van-icon name="refund-o" class="icon" />
        <p class="text">出租</p>
      </div>
    </div>
    <!-- 租房小组 -->
    <div class="rentingHouse">
      <van-cell title="租房小组" value="更多" />
      <van-grid :gutter="10" direction="horizontal">
        <van-grid-item
          v-for="item in groups"
          :key="item.id"
          :icon="'http://liufusong.top:8080' + item.imgSrc"
        >
          <div slot="text" class="groups">
            <p>{{ item.title }}</p>
            <p>{{ item.desc }}</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getPic, getGroups } from '@/Api/home'
export default {
  name: 'Home',
  data() {
    return {
      images: [],
      groups: [],
      value: ''
    }
  },
  created() {
    this.getPic()
    this.getGroups()
  },
  methods: {
    // 获取轮播图
    async getPic() {
      const res = await getPic()
      res.data.body.forEach((item) => {
        this.images.push('http://liufusong.top:8080' + item.imgSrc)
      })
    },
    // 获取租房小组
    async getGroups() {
      const res = await getGroups()
      this.groups = res.data.body
    },
    goMap() {
      this.$router.push({
        path: '/map'
      })
    },
    goList() {
      this.$router.push({
        path: '/home/list'
      })
    },
    goCity() {
      this.$router.push({
        path: '/home/city'
      })
    }
  }
}
</script>

<style scoped lang="less">
.my-swipe {
  width: 100%;
  height: 212px;
}
.search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 34px;
  padding: 5px 5px 5px 8px;
  margin: 0 10px;
  margin-top: 18px;
  background-color: rgba(0, 0, 0, 0);
  .icon {
    font-size: 20px;
    margin-right: 5px;
    color: #fff;
  }
}
.bar {
  width: 100%;
  height: 123px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  text-align: center;
  div {
    height: 100%;
    .icon {
      font-size: 45px;
      width: 60px;
      height: 60px;
      color: #43c38e;
      background-color: #f2fbf7;
      border-radius: 50%;
    }
    .text {
      font-size: 14px;
      margin-top: 15px;
    }
  }
}

.rentingHouse {
  width: 100%;
  height: 250px;
  background-color: #f6f5f6;
  /deep/.van-cell {
    background-color: #f6f5f6;
  }
  /deep/.van-grid-item__content {
    width: 170px;
    height: 80px;
    margin-top: 7px;
  }
  /deep/.groups {
    font-size: 14px;
  }
  /deep/.van-icon__image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
}
</style>
