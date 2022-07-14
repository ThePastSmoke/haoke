<template>
  <div>
    <van-search
      @input="startSearch"
      show-action
      v-model="value"
      placeholder="请输入搜索关键词"
      @focus="movesearch($event)"
      @blur="moveback($event)"
    />
    <!-- 搜索结果 -->
    <van-cell-group v-for="(item, index) in list" :key="index">
      <van-cell v-if="value" :title="item.streetName" @click="cell(item)" />
    </van-cell-group>
  </div>
</template>

<script>
import { getcityCell } from '@/Api'
// 防抖库
import { debounce } from 'lodash'
export default {
  name: 'RenSearch',
  data() {
    return {
      value: '', // 输入框值
      list: [] // 请求回来的数据
    }
  },
  created() {
    // console.log(this.$store.state.city)
  },
  methods: {
    startSearch: debounce(function () {
      console.log(1)
      this.getcityCell()
    }, 500),
    // 请求关键字小区接口
    async getcityCell() {
      const res = await getcityCell(this.value, this.$store.state.city.cityCode)
      this.list = res.data.body
      console.log(res)
    },
    cell(item) {
      console.log(item)
      this.$router.push({
        path: '/ren/add',
        query: {
          street: item.community,
          streetName: item.streetName
        }
      })
    },
    movesearch(e) {
      e.currentTarget.parentElement.parentElement.parentElement.style.transition =
        'all 0.5s'
      e.currentTarget.parentElement.parentElement.parentElement.style.transform =
        'translateX(-80px)'
    },
    moveback(e) {
      e.currentTarget.parentElement.parentElement.parentElement.style.transform =
        'translateX(0px)'
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-search__content) {
  padding-left: 80px;
}
</style>
