<template>
  <div>
    <div>
      <headerBar title="地图"></headerBar>
      <div class="map">
        <baidu-map
          class="map"
          :zoom="zoom"
          :center="center"
          @tilesloaded="tilesloaded"
        >
          <!-- 缩放控件 -->
          <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
          <!-- 比例尺控件 -->
          <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>

          <!-- 圆形1 -->
          <div v-if="isShow">
            <bm-label
              :content="` <div class='map_bubble'>
              <p class='map_name'>${item.label}</p >
              <p>${item.count}套</p >
              </div>`"
              :position="{
                lng: item.coord.longitude,
                lat: item.coord.latitude
              }"
              :labelStyle="{ color: 'red', fontSize: '24px' }"
              v-for="(item, index) in area"
              :key="index"
              @click="evreyArea(item)"
            />
          </div>
          <!-- 圆形2 -->
          <div v-if="isShowTow">
            <bm-label
              v-for="(item, index) in cell"
              :key="index"
              :content="` <div class='map_bubble'>
              <p class='map_name'>${item.label}</p >
              <p>${item.count}套</p >
              </div>`"
              :position="{
                lng: item.coord.longitude,
                lat: item.coord.latitude
              }"
              :labelStyle="{ color: 'red', fontSize: '24px' }"
              @click="everyCell(item)"
            />
          </div>
          <!-- 方形 -->
          <div>
            <bm-label
              @click="plotCell(item)"
              v-for="item in plot"
              :key="item.value"
              :content="` <div class='map_juxing'>
              <span class='map_name_a'>${item.label}</span>
              <span class='map_name_b'>${item.count}套</span>
              <i class='map_icon'>
            </div>`"
              :position="{
                lng: item?.coord?.longitude,
                lat: item?.coord?.latitude
              }"
            />
          </div>
          <!-- 弹出层 -->
          <van-popup
            :overlay-style="{ backgroundColor: 'transparent' }"
            position="bottom"
            v-model="show"
          >
            <van-cell title="房屋列表" value="更多房源" />
            <HomeList :list="list"></HomeList
          ></van-popup>
        </baidu-map>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar.vue'
import HomeList from '@/views/List/components/home_List.vue'
import { getHomeMap, getmapHome } from '@/Api' // getmapHome 获取具体list
export default {
  name: 'Map',
  components: { headerBar, HomeList },
  data() {
    return {
      show: false, // 弹出层
      isShow: true,
      isShowTow: false,
      center: '北京',
      zoom: 11,
      area: [], // 圆形1
      cell: [], // 圆形2
      plot: [], // 方形
      list: []
    }
  },
  created() {
    this.getHomeMap()
    console.log(this.$store.state.city.cityCode)
  },
  methods: {
    tilesloaded({ type, target }) {
      this.center = this.$store.state.city.cityName
    },
    async getHomeMap() {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      const res = await getHomeMap(this.$store.state.city.cityCode)
      this.area = res.data.body
      toast.clear()
    },
    // 圆形1回调
    async evreyArea(item) {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      try {
        this.isShow = false
        this.isShowTow = true
        console.log(item)
        const res = await getHomeMap(item.value)
        this.cell = res.data.body
        this.center = item.label
        this.zoom = 13
        toast.clear()
      } catch (error) {
        console.log(error)
        toast.clear()
      }
    },
    // 圆形2号回调
    async everyCell(item) {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      try {
        this.isShowTow = false
        console.log(item)
        const res = await getHomeMap(item.value)
        this.plot = res.data.body
        this.center = item.label
        this.zoom = 15
        toast.clear()
      } catch (error) {
        console.log(error)
        toast.clear()
      }
    },
    // 方形回调
    async plotCell(item) {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中'
      })
      try {
        this.show = true
        console.log(item)
        const res = await getmapHome(
          this.$store.state.city.cityCode,
          item.value
        )
        this.list = res.data.body.list
        toast.clear()
      } catch (error) {
        console.log(error)
        toast.clear()
      }
    }
  }
}
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 622px;
}
.bm-view {
  width: 375px;
  height: 720px;
}
/deep/.map_bubble {
  width: 70px;
  height: 70px;
  line-height: 1;
  display: inline-block;
  position: absolute;
  border-radius: 100%;
  background: rgba(12, 181, 106, 0.9);
  color: #fff;
  border: 2px solid hsla(0, 0%, 100%, 0.8);
  text-align: center;
  cursor: pointer;
  font-size: 12px;
}
/deep/.map_name {
  padding: 18px 0 6px;
  font-size: 12px;
}
/deep/.BMapLabel {
  border: none !important;
}
/deep/.map_juxing {
  height: 20px;
  line-height: 19px;
  width: 100px;
  padding: 0 3px;
  border-radius: 3px;
  position: absolute;
  background: rgba(12, 181, 106, 0.9) !important;
  cursor: pointer;
  white-space: nowrap;
  color: #fff;
  font-size: 12px;
}

/deep/.map_name_a {
  display: inline-block;
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
/deep/.map_name_b {
  display: inline-block;
  width: 20px;
}
/deep/.map_icon {
  display: block;
  width: 0;
  height: 0;
  margin: 0 auto;
  border: 4px solid transparent;
  border-top-color: #00a75b !important;
}
/deep/.van-popup--bottom {
  height: 360px;
}
/deep/ .van-cell {
  width: 100%;
  background: #c0c0c2;
  border-top: 1px solid #c8c8c8;
}
</style>
