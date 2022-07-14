<template>
  <div>
    <van-cell
      title="所在楼层"
      @click="homeType = true"
      is-link
      :value="roomTypeIsSueHome || '请选择'"
    >
    </van-cell>
    <van-popup position="bottom" v-model="homeType">
      <van-picker
        :default-index="0"
        show-toolbar
        :columns="roomType"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'Floor',
  props: {
    releaseHomeData: {
      type: [Object, String]
    }
  },
  data() {
    return {
      homeType: false, // 户型模态框是否展示
      roomType: [], // 房屋类型
      roomTypeIsSueHome: '' // 选中的房屋类型id
    }
  },
  created() {
    this.vrayData()
  },

  methods: {
    // 确定按钮回调
    onConfirm(value, index) {
      const filterKey = this.releaseHomeData.floor.filter(
        (item) => item.label === value
      )
      this.$emit('myFloor', filterKey)
      this.roomTypeIsSueHome = filterKey[0].label
      this.homeType = false
    },
    // 取消按钮回调
    onCancel() {
      this.homeType = false
    },
    // 熏染数据
    vrayData() {
      this.releaseHomeData.floor.forEach((item) => {
        this.roomType.push(item.label)
      })
    }
  }
}
</script>

<style></style>
