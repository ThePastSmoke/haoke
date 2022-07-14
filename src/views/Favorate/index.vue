<template>
  <div>
    <headerBar title="收藏列表"> </headerBar>
    <HomeList :list="list"></HomeList>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar.vue'
import HomeList from '@/views/List/components/home_List.vue'
import { allFavorate } from '@/Api'
export default {
  name: 'favorate',
  data() {
    return {
      list: []
    }
  },
  components: { headerBar, HomeList },
  created() {
    this.allFavorate()
  },
  methods: {
    async allFavorate() {
      const token = JSON.parse(localStorage.getItem('HKZF_TOKEN'))
      const res = await allFavorate(token)
      this.list = res.data.body
    }
  }
}
</script>

<style></style>
