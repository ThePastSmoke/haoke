<template>
  <div>
    <!-- 标题 -->
    <headerBar title="城市列表"></headerBar>
    <!-- 主体区域 -->
    <div>
      <van-index-bar :index-list="indexList" sticky>
        <van-index-anchor index="1">当前城市</van-index-anchor>
        <van-cell title="文本" />
        <van-index-anchor index="2">热门城市</van-index-anchor>
        <van-cell
          :title="item.label"
          v-for="(item, index) in hotCity"
          :key="index"
        />
        <van-index-anchor index="3">暂无城市</van-index-anchor>
        <div>
          <div>
            <van-index-anchor index="4">A</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['a']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="5">B</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['b']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="6">C</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['c']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="7">D</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['d']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="8">F</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['F']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="9">G</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['g']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="10">H</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['h']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="11">J</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['j']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="12">K</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['k']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="13">L</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['l']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="14">M</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['m']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="15">N</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['n']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="16">Q</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['q']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="17">S</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['s']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="18">T</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['t']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="19">W</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['w']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="20">X</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['x']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="21">Y</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['y']"
              :key="index"
            />
          </div>
          <div>
            <van-index-anchor index="20">Z</van-index-anchor>
            <van-cell
              :title="item"
              v-for="(item, index) in cityClassify['z']"
              :key="index"
            />
          </div>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { getCity, getHotCity } from '@/Api'
import headerBar from '@/components/headerBar'
export default {
  name: 'City',
  components: { headerBar },
  data() {
    return {
      cityList: [],
      indexList: [],
      hotCity: [],
      cityClassify: {}
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
      console.log(res)
    },
    // 获取城市
    async getCity() {
      const res = await getCity(1)
      this.cityList = res.data.body
      const firstLetter = []
      this.cityList.forEach((item) => {
        firstLetter.push(item.short[0].toUpperCase())
      })
      const newFirstLetter = [...new Set(firstLetter)]
      const letter = newFirstLetter.sort(function (a, b) {
        return a.charCodeAt() - b.charCodeAt(0)
      })
      letter.unshift('#', '热')
      this.indexList = letter
      // 遍历每一个城市
      for (const item of this.cityList) {
        // 拿到城市首字母
        const letter = item.short[0]
        // 城市首字母对应的数组不存在则擦黄健数组并添加，否则添加
        if (!this.cityClassify[letter]) {
          Object.defineProperty(this.cityClassify, letter, {
            value: new Array(item.label),
            enumerable: true
          })
        } else {
          this.cityClassify[letter].push(item.label)
        }
      }
      // 最后对没有城市的字符添加数组
    }
  }
}
</script>

<style scoped lang="less">
/deep/.van-index-bar__sidebar {
  margin-top: 45px;
}
/deep/.van-index-bar__index {
  margin-top: 10px;
}
</style>
