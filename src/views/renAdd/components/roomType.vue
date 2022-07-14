<template>
  <div>
    <van-cell
      @click="homeType = true"
      is-link
      :value="roomTypeIsSueHome || '请选择'"
    >
      <template #title
        >户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</template
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
  name: 'roomType',
  props: {
    releaseHomeData: {
      type: [Object, String]
    }
  },
  data() {
    return {
      homeType: false, // 户型模态框是否展示
      roomType: ['一室', '二室', '三室', '四室', '四室+'], // 房屋类型
      roomTypeIsSueHome: '' // 选中的房屋类型id
    }
  },

  methods: {
    // 确定按钮回调
    onConfirm(value, index) {
      const filterKey = this.releaseHomeData.roomType.filter(
        (item) => item.label === value
      )
      this.$emit('myHomeType', filterKey)
      this.roomTypeIsSueHome = filterKey[0].label
      this.homeType = false
    },
    // 取消按钮回调
    onCancel() {
      this.homeType = false
    }
    // 熏染数据
  }
}
</script>

<style></style>
