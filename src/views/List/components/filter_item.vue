<template>
  <div class="filter_item">
    <div class="main_TabBarLastOne">
      <!-- 筛选 -->
      <van-cell is-link arrow-direction="down" @click="showPopup"
        >筛选
      </van-cell>
      <van-popup
        v-model="isShow"
        position="right"
        get-container=".van-dropdown-menu__bar"
        :close-on-click-overlay="true"
        close-icon-position="bottom-right"
        @click-close-icon="close_box"
      >
        <van-cell title="户型" />

        <van-grid :gutter="10" :column-num="3" class="room_model">
          <van-grid-item
            @click="model_room($event, item)"
            :text="item.label"
            v-for="(item, index) in homeTerm.roomType"
            :key="index"
          />
        </van-grid>

        <van-cell title="朝向" />
        <van-grid :gutter="10" :column-num="3" class="room_model">
          <van-grid-item
            @click="model_room($event, item)"
            :text="item.label"
            v-for="(item, index) in homeTerm.oriented"
            :key="index"
          />
        </van-grid>

        <van-cell title="楼层" />
        <van-grid :gutter="10" :column-num="3" class="room_model">
          <van-grid-item
            @click="model_room($event, item)"
            :text="item.label"
            v-for="(item, index) in homeTerm.floor"
            :key="index"
          />
        </van-grid>

        <van-cell title="房屋亮点" />
        <van-grid :gutter="10" :column-num="3" class="room_model">
          <van-grid-item
            @click="model_room($event, item)"
            :text="item.label"
            v-for="(item, index) in homeTerm.characteristic"
            :key="index"
          />
        </van-grid>
        <div class="filter_btn">
          <van-button type="default" size="large">取消</van-button>
          <van-button type="primary" size="large" @click="required_filter"
            >确定</van-button
          >
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { gteFilterList } from '@/Api'
import { Toast } from 'vant'
export default {
  name: 'FilterItem',
  data() {
    return {
      isShow: false,
      filter_Select: [] // 选择出来的id用来请求
    }
  },
  props: {
    homeTerm: {
      type: Object
    },
    queryData: {
      type: Object
    }
  },
  methods: {
    // 户型
    model_room(event, item) {
      this.filter_Select.push(item.value)
      event.target.classList.toggle('Highlight_romm')
    },
    // 朝向
    close_box() {
      document.querySelector('.van-overlay').click()
    },
    // 展示弹出层
    showPopup() {
      this.isShow = true
    },
    // 请求数据
    required_filter() {
      this.gteFilterList()
    },
    async gteFilterList() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      const res = await gteFilterList(
        this.queryData.cityId,
        this.queryData.stat,
        this.queryData.end,
        this.filter_Select.join(',')
      )
      this.filter_Select = []
      this.$emit('get_Filter_Home', res.data.body.list)
      this.isShow = false
      toast.clear()
    }
  }
}
</script>

<style scoped lang="less">
.van-grid {
  padding-right: 5px;
  padding-left: 50px !important;
  /deep/.van-grid-item__content {
    height: 32px;
    width: 80px;
  }
}
.room_model {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 20px;
}
/deep/.Highlight_romm {
  // border: 1px solid #21b97a;
  color: #21b97a;
  background-color: #defaef;
}
/deep/.van-grid-item__text {
  pointer-events: none;
}
</style>
