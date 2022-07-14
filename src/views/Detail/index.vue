<template>
  <div class="main" v-if="homeInfo.community">
    <!-- 标题 -->
    <headerBar :title="homeInfo.community || ''"></headerBar>
    <!-- 轮播图 -->
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in homeInfo.houseImg" :key="index"
          ><img :src="'http://liufusong.top:8080' + item" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>
    <!-- 介绍 / 价格-->
    <div class="HouseDetail_info__w_ymp">
      <h3 class="HouseDetail_infoTitle__E1ASO">{{ homeInfo.title }}</h3>
      <div
        class="nearest_tube"
        v-for="(item, index) in homeInfo.tags"
        :key="index"
      >
        {{ item }}
      </div>
      <div class="Home_moey">
        <div>
          <p>{{ homeInfo.price }}</p>
          <p>租金</p>
        </div>
        <div>
          <p>{{ homeInfo.roomType }}</p>
          <p>房型</p>
        </div>
        <div>
          <p>{{ homeInfo.size }}平米</p>
          <p>面积</p>
        </div>
      </div>
      <!-- 房屋具体介绍 -->
      <div class="am-flexbox">
        <div class="am-flexbox-item1">
          <div>
            <span class="HouseDetail_title__iGpj_">装修:</span>
            <span>精装</span>
          </div>
          <div>
            <span class="HouseDetail_title__iGpj_">楼层:</span>
            <span> {{ homeInfo.floor }} </span>
          </div>
        </div>
        <div class="am-flexbox-item2">
          <div>
            <span class="HouseDetail_title__iGpj_">朝向:</span>
            <span v-for="(item, index) in homeInfo.oriented" :key="index">
              {{ item }}
            </span>
          </div>
          <div>
            <span class="HouseDetail_title__iGpj_">类型:</span>
            <span>普通住宅</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 小区地图 -->
    <div class="HouseDetail_mapTitle__3reEo">小区:</div>

    <!-- 地图 -->
    <div class="home_map" v-if="homeInfo">
      <!-- 地图组件 -->
      <listItemMap :homeInfo="homeInfo"></listItemMap>
    </div>
    <!-- 房屋配套 -->
    <div class="HouseDetail_about__1W1Px">
      <div class="HousePackage_root__1MUw0">
        <div
          class="HousePackage_item__2q4AQ"
          v-for="(item, index) in homeInfo.supporting"
          :key="index"
        >
          <p>
            <!-- <van-icon :name="icon[index]" /> -->
            <Icon :icon="icon[index]"></Icon>
            <span class="configText"> {{ item }} </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 房屋概况 -->
    <div class="HouseDetail_set__26npJ">
      <div class="HouseDetail_houseTitle__3dg6k">房屋概况</div>
      <div class="housingSituation">
        <div class="HouseDetail_contact__O_lsw">
          <div class="HouseDetail_user__TZj3w">
            <img src="http://liufusong.top:8080/img/avatar.png" alt="头像" />
            <div class="HouseDetail_useInfo__FrBlz">
              <div class="userName">王女士</div>
              <div class="HouseDetail_userAuth__Xr6gY">
                <van-icon name="like-o" />
                已经认证房主
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="HouseDetail_userMsg__3mcRl"> 发消息 </span>
      <div class="HouseDetail_descText__2JsQA">
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="HouseDetail_recommend__1L7WT">
      <div class="HouseDetail_houseTitle__3dg6k">猜你喜欢</div>
      <div>
        <div class="main_list">
          <van-card
            price="4500/月"
            desc="72.32㎡/南 北/低楼层"
            title="安贞西里 3室1厅"
            thumb="http://liufusong.top:8080/img/message/1.png"
          />
          <van-card
            price="7200/月"
            desc="83㎡/南/高楼层"
            title="天居园 2室1厅"
            thumb="http://liufusong.top:8080/img/message/2.png"
          />
          <van-card
            price="4300/月"
            desc="52㎡/西南/低楼层"
            title="角门甲4号院 1室1厅"
            thumb="http://liufusong.top:8080/img/message/3.png"
          />
        </div>
      </div>
    </div>
    <!-- 最下方按钮 -->
    <div class="foot_btn">
      <!-- 收藏组件 -->
      <Collection class="ordinary" :homeInfo="homeInfo"></Collection>
      <van-button type="default">在线资选</van-button>
      <van-button type="primary">电话预约</van-button>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar.vue'
import { getHomeInfo } from '@/Api'
import listItemMap from '@/components/listItemMap.vue'
import Collection from '@/views/Detail/components/collection.vue'
import pinyin from 'js-pinyin'
export default {
  name: 'Detail',
  data() {
    return {
      homeInfo: {},
      icon: []
    }
  },
  components: {
    headerBar,
    listItemMap,
    Collection
  },
  created() {
    this.getHomeInfo()
  },
  methods: {
    // 请求房屋列表
    async getHomeInfo() {
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })
      const res = await getHomeInfo(this.$route.query.home_id)
      this.homeInfo = res.data.body
      // console.log(this.homeInfo)
      res.data.body.supporting.forEach((item) => {
        this.icon.push(pinyin.getCamelChars(item))
      })
      toast.clear()
    }
  }
}
</script>

<style scoped lang="less">
.main {
  background-color: #f6f5f6;
  .my-swipe .van-swipe-item {
    width: 414px;
    height: 213px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .HouseDetail_info__w_ymp {
    padding: 15px;
    background: #fff;
    .HouseDetail_infoTitle__E1ASO {
      font-weight: 400;
      font-size: 16px;
      color: #333;
      margin: 16px 0;
    }
    .nearest_tube {
      color: #39becd;
      background: #e1f5f8;
      display: inline-block;
      font-size: 12px;
      border-radius: 3px;
      padding: 4px 5px;
      margin-right: 5px;
      line-height: 12px;
    }
    .Home_moey {
      font-size: 12px;
      display: flex;
      justify-content: space-around;
      margin: 15px 0;
      padding: 15px 0;
      border-top: 1px solid #cecece;
      border-bottom: 1px solid #cecece;
      text-align: center;
      div p:nth-child(1) {
        font-size: 18px;
        font-weight: 700;
        color: #fa5741;
      }
      div p:nth-child(2) {
        font-size: 12px;
        color: #999999;
        margin-top: 5px;
      }
    }
    .am-flexbox {
      display: flex;
      font-size: 13px;
      color: #333;
      .am-flexbox-item1 {
        flex: 1;
      }
      .am-flexbox-item2 {
        flex: 1;
      }
      .HouseDetail_title__iGpj_ {
        color: #999;
        padding-right: 5px;
        line-height: 26px;
      }
    }
  }
  .HouseDetail_mapTitle__3reEo {
    border-top: 10px solid #f6f5f6;
    background-color: #fff;
    color: #666;
    font-size: 14px;
    padding: 10px 14px;
  }
  .home_map {
    width: 100%;
    height: 145px;
  }
  .HouseDetail_about__1W1Px {
    margin-bottom: 10px;
    padding: 0 10px;
    background: #fff;
    .home_title {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }
    .HousePackage_root__1MUw0 {
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      background: #fff;
      .HousePackage_item__2q4AQ {
        margin: 10px 0;
        width: 20%;
        font-size: 16px;
        line-height: 23px;
        p {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .HouseDetail_set__26npJ {
    margin: 10px 0;
    padding: 0 10px;
    background: #fff;
    position: relative;
    .HouseDetail_houseTitle__3dg6k {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }

    .HouseDetail_user__TZj3w {
      margin-bottom: 10px;
      display: flex;
      img {
        width: 52px;
        height: 52px;
        margin: 10px 10px 0 0;
      }
      .HouseDetail_useInfo__FrBlz {
        padding: 15px 0 0 5px;
        .userName {
          font-size: 12px;
        }
        .HouseDetail_userAuth__Xr6gY {
          font-size: 12px;
          color: #fa5741;
          margin-top: 5px;
        }
      }
    }
    .HouseDetail_userMsg__3mcRl {
      position: absolute;
      right: 15px;
      top: 80px;
      color: #33be85;
      font-size: 14px;
      border: 1px solid #33be85;
      border-radius: 3px;
      padding: 3px 15px;
    }
  }
  .HouseDetail_descText__2JsQA {
    line-height: 1.6;
    padding: 10px 0;
    color: #333;
    font-size: 12px;
  }
  // 猜你喜欢
  .HouseDetail_recommend__1L7WT {
    margin: 10px 0 0;
    padding: 0 15px;
    background: #fff;
    .HouseDetail_houseTitle__3dg6k {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }
  }
  .foot_btn {
    display: flex;
    .van-button--default {
      flex: 1;
    }
    .van-button--primary {
      flex: 1;
    }
  }
  .configText {
    font-size: 12px;
  }
}
</style>
