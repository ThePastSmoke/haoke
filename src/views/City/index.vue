<template>
  <div>
    <!-- 标题 -->
    <headerBar title="城市列表"></headerBar>
    <!-- 主体区域 -->
    <div>
      <van-index-bar :index-list="indexList">
        <van-index-anchor index="#">当前城市</van-index-anchor>
        <van-cell :title="cityName" />
        <van-index-anchor index="热">热门城市</van-index-anchor>
        <van-cell
          v-for="(item, index) in hotCity"
          :key="index"
          :title="item.label"
          @click="getCityName(item)"
        />
        <!-- 按首字母排列的城市列表 -->
        <div v-for="item in Words" :key="item.pinyin">
          <van-index-anchor highlight-color="#21b97a" :index="item.code" />
          <van-cell
            v-for="(lis, index) in item.data"
            :key="index"
            :title="lis.item.label"
            @click="noCity"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { getCity, getHotCity } from '@/Api'
import { Toast } from 'vant'

import headerBar from '@/components/headerBar'
export default {
  name: 'City',
  components: { headerBar },
  data() {
    return {
      indexList: [],
      hotCity: [],
      Words: [],
      cityList: [],
      cityName: '', // 城市名称
      record: this.$route.query.id // 记录传参的城市
    }
  },
  created() {
    this.getCity() // 获取城市列表
    this.getHotCity()
  },
  methods: {
    // 获取热门城市
    async getHotCity() {
      const res = await getHotCity()
      this.hotCity = res.data.body
    },
    // 获取城市
    async getCity() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true
      })
      const res = await getCity(1)
      // 获取数据重新分装
      const cityList = res.data.body.map(
        (item) =>
          (item = {
            item: item,
            firstW: item.short.split('')[0].toUpperCase(),
            secW: item.short.split('')[1].toUpperCase()
          })
      )
      this.cityList = cityList
      // 遍历获取26个字母，并同时将对应的信息添加到对应的数组中
      // 提取出第一个字母转大写
      const firstLetter = []
      this.cityList.forEach((item) => {
        firstLetter.push(item.firstW)
      })
      // 去重
      const newFirstLetter = [...new Set(firstLetter)]
      // 进行升序排列
      const letter = newFirstLetter.sort(function (a, b) {
        return a.charCodeAt() - b.charCodeAt()
      })
      letter.unshift('#', '热')
      this.indexList = letter
      for (let i = 0; i < 26; i++) {
        const data = cityList.filter(
          (item) => item.firstW === String.fromCharCode(65 + i)
        )
        // 判断数组中师傅包含这些首字母，筛选push
        if (letter.includes(String.fromCharCode(65 + i))) {
          this.Words.push({ code: String.fromCharCode(65 + i), data: data })
        }
      }
      // 清除加载定时器
      Toast.clear(toast)
    },
    // 点击提示没有city
    noCity() {
      Toast('该城市暂无房源')
    },
    // 获取热门城市的名称
    getCityName(name) {
      this.cityName = name.label // 存入热门城市
      if (this.record === '1') {
        this.$router.push({
          path: '/home',
          query: { cityName: name.label }
        })
      } else {
        this.$router.push({
          path: '/home/list',
          query: { cityName: name.label }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-index-bar__index) {
  margin-top: 10px;
}
:deep(.van-index-bar__index--active) {
  color: #fff;
  background-color: #21b97a;
  border-radius: 50%;
  display: inline-block;
  font-size: 12px;
  width: 15px;
  height: 15px;
  line-height: 15px;
}
</style>
