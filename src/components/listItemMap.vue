<template>
  <div>
    <baidu-map
      content="111"
      :labelStyle="{ color: 'red', fontSize: '24px' }"
      :center="center"
      :zoom="zoom"
      class="bm-view"
    >
      <bm-label
        :content="`<p>${homeInfo.community}</p >
        <div class='HouseDetail_mapArrow__26oyW'></div>`"
        :position="center"
        :labelStyle="{ color: 'red', fontSize: '24px' }"
      />
    </baidu-map>
  </div>
</template>

<script>
export default {
  name: 'listItemMap',
  props: {
    homeInfo: {
      type: Object
    }
  },
  data() {
    return {
      center: { lng: this.homeInfo.coord.longitude, lat: this.homeInfo.coord.latitude }, // 地图的经纬度
      zoom: 15
    }
  }
}
</script>

<style scoped lang="less">
.bm-view {
  width: 375px;
  height: 145px;
}

/deep/.BMapLabel {
  position: absolute;
  display: inline;
  cursor: inherit;
  padding: 5px 10px;
  white-space: nowrap;
  font: 12px / 14px arial, sans-serif;
  z-index: -6253480;
  color: rgb(255, 255, 255);
  box-shadow: rgb(204 204 204) 2px 2px 2px;
  user-select: none;
  left: 188px;
  top: 37px;
  p {
    font-size: 16px;
    overflow: hidden;
    color:#fff;
    background-color: rgb(238, 93, 91);
    border: 1px solid rgb(255, 0, 0);
  }
}
/deep/.HouseDetail_mapArrow__26oyW {
  background: url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png)
    no-repeat;
  position: absolute;
  width: 11px;
  height: 10px;
  top: 23px;
  left: 10px;
  overflow: hidden;
}
</style>
