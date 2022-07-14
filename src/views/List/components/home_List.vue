<template>
  <div class="main_list">
    <van-card
      v-for="(item, index) in list"
      :key="index"
      currency=""
      :desc="item.desc"
      :title="item.title"
      :thumb="'http://liufusong.top:8080' + item.houseImg"
      @click="user_home(item)"
    >
      <template #price>
        <span class="van-card__bottom"> {{ item.price }} </span>
        <span class="yuan">元/月</span>
      </template>
      <template #tags>
        <van-tag
          plain
          type="danger"
          class="HouseItem_tag1__3VDnD HouseItem_tag__3MxYv"
          v-for="(val, i) in item.tags"
          :key="i"
        >
          {{ val }}
        </van-tag>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  name: 'HomeList',
  props: {
    list: Array
  },
  methods: {
    // 查询用户点击的房屋
    user_home(item) {
      // this.home_Id = item.houseCode
      this.$router.push({
        path: '/detall',
        query: {
          home_id: item.houseCode
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-card {
  height: 120px;
  position: relative;
  box-sizing: border-box;
  justify-content: space-around;
  padding-top: 18px;
  border-bottom: 1px solid #e5e5e5;
  :deep(.van-image__img) {
    float: left;
    width: 106px;
    height: 80px;
  }
  :deep(.van-card__title, .van-card__desc) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .van-card__title {
    font-weight: 700;
    margin: 0;
    font-size: 15px;
    color: #394043;
  }
  .van-card__desc {
    font-size: 12px;
    color: #afb2b3;
  }
  .HouseItem_tag1__3VDnD {
    color: #39becd;
    background: #e1f5f8;
  }
  .HouseItem_tag__3MxYv {
    display: inline-block;
    font-size: 12px;
    border-radius: 3px;
    padding: 4px 5px;
    margin-right: 5px;
    line-height: 12px;
  }
  /deep/.van-card__bottom {
    font-size: 16px;
    color: #fa5741;
    font-size: 16px;
    font-weight: bolder;
  }
  .van-card__content {
    overflow: hidden;
    line-height: 22px;
    padding-left: 12px;
  }
  .yuan {
    color: red;
    font-size: 12px;
  }
}
.main_list {
  margin-bottom: 50px;
}
</style>
