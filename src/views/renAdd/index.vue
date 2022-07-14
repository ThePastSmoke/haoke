<template>
  <div>
    <HeaderBar title="发布房源"></HeaderBar>
    <div>
      <van-cell class="Add_root__2_C-z" title="房屋管理" />
      <van-cell
        title="小区名称"
        is-link
        :value="this.$route.query.streetName || '请输入小区名'"
        to="/ren/search"
      />
      <van-field
        label-width="85px"
        type="number"
        v-model="homeRelease.price"
        placeholder="请输入租金/月"
      >
        <template #label
          >租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</template
        >
        <template #extra>￥/月</template></van-field
      >

      <van-field
        label-width="85px"
        type="number"
        v-model="homeRelease.size"
        placeholder="输入建筑面积"
      >
        <template #label>建筑面积</template>
        <template #extra>㎡</template></van-field
      >

      <!-- 户型 -->
      <!-- 因为数据是异步请求来的，子组件不能实时拿到父组件传的值，要加上v-if -->
      <roomType
        @myHomeType="myHomeType"
        v-if="releaseHomeData.floor"
        :releaseHomeData="releaseHomeData"
      ></roomType>

      <!-- 所在楼层 -->
      <Floor
        @myFloor="myFloor"
        v-if="releaseHomeData.floor"
        :releaseHomeData="releaseHomeData"
      ></Floor>
      <!-- 朝向 -->
      <Oriented
        @myOriented="myOriented"
        v-if="releaseHomeData.floor"
        :releaseHomeData="releaseHomeData"
      ></Oriented>
      <!-- 房屋标题 -->
      <van-cell title="房屋标题" />
      <!-- 文本框  请输入标题（例如：整租小区名2室5000元） -->
      <van-cell-group>
        <van-field
          v-model="homeRelease.title"
          placeholder="请输入标题（例如：整租小区名2室5000元）"
        />
        <van-cell :border="false" title="房屋图像"></van-cell>
        <!-- 文件上传 -->
        <van-uploader
          v-model="fileList"
          :after-read="afterRead"
          @delete="afterRead"
        />
      </van-cell-group>
      <!-- 房屋配置 -->
      <van-cell title="房屋配置" />
      <div class="homeComfig">
        <van-grid column-num="5" :border="false">
          <van-grid-item
            @click="homeComfig(value, index)"
            v-for="(value, index) in homeConfigInfo"
            :key="index"
            :text="value.name"
            :class="{ pickon: value.isDone }"
          >
            <template #icon>
              <Icon :icon="value.icon"></Icon>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 房屋描述 -->
    <div class="blank"></div>
    <van-cell title="房屋描述" />
    <van-cell-group>
      <van-field
        v-model="homeRelease.description"
        placeholder="请输入房屋描述信息"
        class="text"
      />
    </van-cell-group>
    <div class="perch"></div>
    <!-- 取消确定 -->
    <div class="btn">
      <van-button type="default">取消</van-button>
      <van-button type="primary" @click="putInHome">提交</van-button>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/headerBar.vue'
import roomType from '@/views/renAdd/components/roomType.vue'
import Floor from '@/views/renAdd/components/floor'
import Oriented from '@/views/renAdd/components/oriented'
import { getReleaseHomedata, releaseHome, getImg } from '@/Api'
export default {
  name: 'renAdd',
  components: { HeaderBar, roomType, Floor, Oriented },
  data() {
    return {
      // 维护的数据
      homeRelease: {
        title: '', // 房屋标题
        description: '', // 表述
        houseImg: '', // 图片路径
        oriented: '', // 发布房源
        supporting: '', // 房屋配置
        price: '', // 房屋价格 depictHome
        roomType: '', // 户型
        size: '', // 面积
        floor: '', // 楼层
        community: this.$route.query.street
      },
      releaseHomeData: {}, // 发布房源所需信息
      fileList: [], // 存储用户上传的图片
      pinkOnhomeConfigInfo: [],
      homeConfigInfo: [
        { name: '衣柜', icon: 'YG', isDone: false },
        { name: '洗衣机', icon: 'XYJ', isDone: false },
        { name: '空调', icon: 'KT', isDone: false },
        { name: '天然气', icon: 'TRQ', isDone: false },
        { name: '冰箱', icon: 'BX', isDone: false },
        { name: '暖气', icon: 'NQ', isDone: false },
        { name: '电视机', icon: 'DSJ', isDone: false },
        { name: '热水器', icon: 'RSQ', isDone: false },
        { name: '宽带', icon: 'KD', isDone: false },
        { name: '沙发', icon: 'SF', isDone: false }
      ]
    }
  },
  created() {
    this.getReleaseHomedata()
    // console.log(this.$route.query.street)
  },
  methods: {
    putInHome() {
      // if (this.fileList.length) {
      //   this.$toast('请上传房屋图片')
      //   return
      // }
      this.getImg()
    },
    // 处理图片路劲接口
    async getImg() {
      // const res = await this.fileList.map(async (item) => {
      //   const res = await getImg(item)
      //   this.homeRelease.houseImg =
      //     this.homeRelease.houseImg + res.data.body[0] + '|'
      //   return res
      // })
      // res.then((res) => {
      //   this.releaseHome()
      // })
      const arr = []
      for (const x of this.fileList) {
        const res = await getImg(x)
        arr.push(res.data.body[0])
        console.log(res)
      }
      const re = arr.join('|')
      console.log(re)
      // const res = await getImg(this.fileList)
      this.homeRelease.houseImg = re
      this.releaseHome(re)
    },
    // 发布房源
    async releaseHome() {
      const token = JSON.parse(localStorage.getItem('HKZF_TOKEN'))
      const res = await releaseHome(this.homeRelease, token)
      if (res.data.status === 200) {
        this.$dialog

          .confirm({
            confirmButtonText: '继续发布',
            confirmButtonColor: '#108ee9',
            cancelButtonText: '去查看',
            title: '标题',
            message: '房源发布成功！'
          })
          .then(() => {
            // on confirm
            location.reload()
          })
          .catch(() => {
            // on cancel
            this.$router.push({ path: '/home/list' })
          })
      }
      console.log(res)
    },
    // 点击房屋配置函数
    homeComfig(value, i) {
      value.isDone = !value.isDone
      this.pinkOnhomeConfigInfo = []
      this.homeConfigInfo.forEach((item) => {
        if (item.isDone) {
          this.pinkOnhomeConfigInfo.push(item.name)
        }
      })
      this.homeRelease.supporting = this.pinkOnhomeConfigInfo.join('|')
    },
    // 文件上传
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(this.fileList)
      // const arr = []
      // this.fileList.forEach((item) => {
      //   // console.log(item)
      //   arr.push(item.content)
      // })
      // this.homeRelease.houseImg = arr.join('|')
    },
    // 请求房屋所需数据
    async getReleaseHomedata() {
      const token = JSON.parse(localStorage.getItem('HKZF_TOKEN'))
      const res = await getReleaseHomedata(token)
      this.releaseHomeData = res.data.body
    },
    // 朝向
    myOriented(value) {
      this.homeRelease.oriented = value[0].value
    },
    // 户型
    myHomeType(value) {
      this.homeRelease.roomType = value[0].value
    },
    // 楼层
    myFloor(value) {
      this.homeRelease.floor = value[0].value
    }
  }
}
</script>

<style scoped lang="less">
.Add_root__2_C-z {
  color: #21b97a;
  background-color: #fff;
  font-size: 15px;
}
/deep/.van-uploader__wrapper {
  margin: 10px;
}
.homeComfig {
  width: 100%;
  height: 128px;
}
.blank {
  width: 100%;
  height: 15px;
  background-color: #f6f5f6;
}
.text {
  width: 100%;
  height: 128px;
}
.perch {
  width: 100%;
  height: 20px;
  background-color: #f5f5f9;
}
.btn {
  display: flex;
  .van-button {
    flex: 1;
  }
  .van-button--default {
    color: #07c160;
  }
}
/deep/.van-hairline--top {
  height: 128px;
}
/deep/.van-grid-item {
  font-size: 20px;
  height: 50%;
}

/deep/.van-grid-item__text,
/deep/.iconfont {
  pointer-events: none;
  color: none;
}
// 选中
/deep/.pickon {
  color: #21b97a !important;
}
</style>
