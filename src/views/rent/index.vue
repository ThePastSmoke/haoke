<template>
  <div class="empty-container">
    <HeaderBar title="房屋管理"></HeaderBar>
    <homeList :list="list" v-if="list.length"></homeList>
    <div class="empty-container" v-else>
      <img src="http://liufusong.top:8080/img/not-found.png" alt="收藏背景图" />
      <p>
        您还没有房源，
        <a
          class="Rent_link__2yGRO"
          href="javascript:;"
          @click="$router.push({ path: '/ren/add' })"
          >快去发布房源</a
        >吧~
      </p>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/headerBar.vue'
import homeList from '@/views/List/components/home_List.vue'
import { getLiveHome } from '@/Api'
export default {
  components: {
    HeaderBar,
    homeList
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getLiveHome()
  },
  methods: {
    async getLiveHome() {
      const token = JSON.parse(localStorage.getItem('HKZF_TOKEN'))
      const res = await getLiveHome(token)
      if (res.data.status === 400) {
        this.$toast('登录过期请重新登录')
        this.$router.push('/login')
        return
      }
      this.list = res?.data?.body
    }
  }
}
</script>

<style scoped lang="less">
.empty-container {
  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    img {
      width: 150px;
      margin: 30px 0;
    }
    .Rent_link__2yGRO {
      color: #33be85;
    }
  }
}
</style>
