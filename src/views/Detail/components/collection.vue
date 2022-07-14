<template>
  <van-button
    @click="cutIcon"
    type="default"
    :icon="
      collect_img
        ? 'http://liufusong.top:8080/img/star.png'
        : 'http://liufusong.top:8080/img/unstar.png'
    "
    >收藏</van-button
  >
</template>

<script>
import { getHomeCollect, AddCollection, deleteCollection } from '@/Api'

export default {
  name: 'Collection', // 收藏
  props: {
    homeInfo: {
      type: [Object, String]
    }
  },
  data() {
    return {
      collect_img: false
    }
  },
  created() {
    this.getHomeCollect()
  },

  methods: {
    // 点击收藏按钮
    cutIcon() {
      this.collect_img ? this.deleteCollection() : this.AddCollection()
      // if (this.collect_img) {
      //   this.deleteCollection()
      // } else {
      //   this.AddCollection()
      // }
    },
    // 请求是否收藏
    async getHomeCollect() {
      const token = JSON.parse(localStorage.getItem('HKZF_TOKEN'))
      const res = await getHomeCollect(this.homeInfo.houseCode, token)
      console.log(this.homeInfo.houseCode)
      if (res.data.status === 400) {
        this.$dialog({ message: '登录已过期,请重新登录~' })
      }
      this.collect_img = res.data.body?.isFavorite
    },
    // 添加收藏
    async AddCollection() {
      const token = JSON.parse(localStorage.getItem('HKZF_TOKEN'))
      const res = await AddCollection(this.homeInfo.houseCode, token)
      this.collect_img = true
      console.log(res)
    },
    // 删除收藏
    async deleteCollection() {
      const token = JSON.parse(localStorage.getItem('HKZF_TOKEN'))
      const res = await deleteCollection(this.homeInfo.houseCode, token)
      this.collect_img = false
      console.log(res)
    }
  }
}
</script>

<style></style>
