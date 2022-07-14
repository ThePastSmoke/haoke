<template>
  <div>
    <!-- 搜索栏 -->
    <div>
      <van-search
        v-model="value"
        show-action
        label="北京"
        placeholder="请输入小区或地址"
        class="search"
      >
        <div slot="label" @click="$router.push('/city')">
          {{ $store.state.city.cityName }} <van-icon name="arrow-down" />
        </div>
        <span slot="left" @click="$router.push('/home')">
          <van-icon name="arrow-left" />
        </span>
        <template #action>
          <div class="icon">
            <van-icon name="map-marked" @click="$router.push('/map')" />
          </div>
        </template>
      </van-search>
    </div>
    <!-- list选择器 -->
    <div>
      <div class="main_TabBar">
        <!-- 前三个tabbar -->
        <div class="main_TabBarOne">
          <van-dropdown-menu>
            <!-- 区域 -->
            <van-dropdown-item>
              <template #title>区域</template>
              <template #default>
                <van-area
                  value="110000"
                  :area-list="areaList"
                  @confirm="forData"
                  confirm-button-text=" "
                  cancel-button-text=" "
                >
                  <template #columns-bottom
                    ><div class="search_but">
                      <van-button type="default" size="large">取消</van-button>
                      <van-button type="primary" size="large" @click="queryHome"
                        >确定</van-button
                      >
                    </div>
                  </template>
                </van-area>
              </template>
            </van-dropdown-item>
            <!-- 方式 -->
            <van-dropdown-item>
              <template #title>方式</template>
              <template #default>
                <van-area
                  :area-list="areaList2"
                  columns-num="1"
                  @confirm="forData"
                  confirm-button-text=" "
                  cancel-button-text=" "
                >
                  <template #columns-bottom
                    ><div class="search_but">
                      <van-button type="default" size="large">取消</van-button>
                      <van-button type="primary" size="large" @click="queryHome"
                        >确定</van-button
                      >
                    </div>
                  </template>
                </van-area>
              </template>
            </van-dropdown-item>
            <!-- 租金 -->
            <van-dropdown-item>
              <template #title>租金</template>
              <template #default>
                <van-area
                  :area-list="areaList3"
                  columns-num="1"
                  @confirm="forData"
                  confirm-button-text=" "
                  cancel-button-text=" "
                >
                  <template #columns-bottom
                    ><div class="search_but">
                      <van-button type="default" size="large">取消</van-button>
                      <van-button type="primary" size="large" @click="queryHome"
                        >确定</van-button
                      >
                    </div>
                  </template>
                </van-area>
              </template>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <!-- 后一个tabbar -->
        <FilterItem
          @get_Filter_Home="get_Filter_Home"
          :queryData="queryData"
          :homeTerm="homeTerm"
        ></FilterItem>
      </div>
    </div>
    <!-- 列表 -->
    <HomeList :list="list"></HomeList>
  </div>
</template>

<script>
import { getList, getHotCity, getCitySon } from '@/Api'
import FilterItem from '@/views/List/components/filter_item.vue'
import HomeList from '@/views/List/components/home_List.vue'
export default {
  name: 'List',
  components: { FilterItem, HomeList },
  data() {
    return {
      city_list1: 110000,
      city_list2: 120000,
      city_list3: 100000,
      city: '',
      // 区域数据列表
      areaList: {
        province_list: {
          110000: '区域',
          120000: '地铁'
        },
        city_list: {
          // 110100: '杭州',
          // 120100: '一号线'
        },
        county_list: {
          // 110101: '东城区',
          // 110102: '西城区'
          // ....
        }
      },
      // 方式数据列表
      areaList2: {
        province_list: {
          110000: '不限',
          120000: '合租',
          130000: '整租'
        }
      },
      // 租金数据列表
      areaList3: {
        province_list: {}
      },
      value: '', // 下拉菜单绑定的
      list: [],
      record: this.$route.query.cityName || '北京', // 记录传参的城市
      hotCity: [], // 热门城市数据
      homeTerm: {}, // 房屋查选请求回的数据
      checkData: [], // 点击确定后获取的数据
      // 查询具体参数
      queryData: {
        cityId: '', // 城市id
        area: '', // 城市区域
        subway: null, // 地铁id
        stat: 1, // 开始请求的数据
        end: 20, // 结束请求的数据
        rentType: null, // 房屋类型
        price: null, // 价格
        roomType: null, // 房屋类型
        characteristic: null, // 标签
        floor: null // 楼层
      }
    }
  },
  created() {
    this.getHotCity() // 调用请求list函数
  },

  methods: {
    // 请求热门城市/子级城市
    async getHotCity() {
      const toast1 = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })
      const resHotCity = await getHotCity()
      this.hotCity = resHotCity.data.body
      // 筛选城市id
      let newcity = ''
      this.hotCity.forEach((item) => {
        if (this.record === item.label) {
          newcity = item.value
        }
      })
      // 当前城市数据和code存入vuex中
      this.$store.commit('city', {
        cityName: this.record,
        cityCode: newcity
      })
      // console.log(this.$store.state.city.cityName)
      this.queryData.cityId = newcity
      // 请求不同城市的列表
      const resList = await getList(newcity)
      this.list = resList.data.body.list

      // 把数据循环渲染 获取城市
      const resSon = await getCitySon(newcity)
      // console.log(resSon)
      this.homeTerm = resSon.data.body
      // 循环添加城市
      for (const item of this.homeTerm.area.children) {
        this.areaList.city_list[(this.city_list1 += 100)] = item.label
        if (item.children) {
          item.children.forEach((i) => {
            this.areaList.county_list[this.city_list1++] = i.label
          })
        }
      }
      // 熏染地铁
      for (const item of this.homeTerm.subway.children) {
        this.areaList.city_list[(this.city_list2 += 100)] = item.label
        if (item.children) {
          item.children.forEach((i) => {
            this.areaList.county_list[this.city_list2++] = i.label
          })
        }
      }
      // 熏染租金
      for (const item of this.homeTerm.price) {
        this.areaList3.province_list[this.city_list3++] = item.label
      }
      toast1.clear()
    },

    // 调用组件事件获取选中信息
    forData(data) {
      this.checkData = data
    },
    // 获取请求数据的id
    async queryHome() {
      const toast2 = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })
      document.querySelector('.main_list').click()
      // 手动调用确定点击按钮
      document.querySelector('.van-picker__confirm').click()
      // 获取区域id
      // console.log(this.checkData)
      // console.log(this.homeTerm)
      // 获取地铁几号线的id
      if (this?.checkData[0]?.name === '地铁') {
        this?.homeTerm?.subway?.children?.forEach((item) => {
          if (item.label === this.checkData[1].name) {
            item.children.forEach((i) => {
              if (i.label === this.checkData[2].name) {
                // console.log(i.value)
                this.queryData.subway = i.value
              }
            })
          }
        })
        const res = await getList(
          this.queryData.cityId,
          this.queryData.area,
          this.queryData.subway,
          this.queryData.stat,
          this.queryData.end,
          this.queryData.rentType,
          this.queryData.price
        )
        console.log(res)
        this.list = res.data.body.list
      } else if (this?.checkData[0]?.name === '区域') {
        // 获取城市区域id
        this?.homeTerm?.area?.children.forEach((item) => {
          if (item.label === this?.checkData[1]?.name) {
            item?.children?.forEach((i) => {
              if (i.label === this.checkData[2].name) {
                console.log(i.value)
                this.queryData.area = i.value
              }
            })
          }
        })
        const res = await getList(
          this.queryData.cityId,
          this.queryData.area,
          this.queryData.subway,
          this.queryData.stat,
          this.queryData.end,
          this.queryData.rentType,
          this.queryData.price
        )
        console.log(res)
        this.list = res.data.body.list
      }
      // 请求成功后把数据重置为null方便下次请求没有冲突
      this.queryData.area = null
      this.queryData.subway = null
      toast2.clear()
    },

    // 拿到筛选后的数据重新渲染
    get_Filter_Home(res) {
      this.list = res
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.search {
  background-color: #21b97a;
  .van-icon {
    margin-right: 10px;
    color: #fff;
  }
  .van-icon-arrow-down {
    margin-left: 2px;
    font-size: 12px;
    color: #7f7f80;
  }
}

.search_but {
  display: flex;
  font-size: 18px;
  .van-button--default {
    color: #21b97a;
    flex: 1;
  }
  .van-button--primary {
    flex: 2;
  }
}
/deep/.main_TabBar {
  display: flex;
  justify-content: space-between;
  .main_TabBarOne {
    flex: 3;
  }
  .main_TabBarLastOne {
    flex: 1;
    height: 1.28rem;
    background-color: #fff;
    box-shadow: 0 0.05333rem 0.32rem rgb(100 101 102 / 12%);

    .van-icon-arrow-down {
      font-size: 12px;
      padding-right: 10px;
      padding-top: 2px;
    }
  }
}
/deep/.van-popup--right {
  height: 100%;
  width: 80%;
  background-color: #fff;
  .filter_btn {
    width: 100%;
    display: flex;
    .van-button--default {
      flex: 1;
    }
    .van-button--primary {
      flex: 2;
    }
  }
  .van-grid-item {
    margin-top: 10px;
  }
}
</style>
