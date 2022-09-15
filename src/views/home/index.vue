<template>
  <div class="homeIndex">
    <van-swipe :autoplay="3000" indicator-color="#ccc">
      <van-swipe-item v-for="item in imgs" :key="item.id">
        <img v-lazy="`http://liufusong.top:8080${item.imgSrc}`" />
      </van-swipe-item>
    </van-swipe>
    <search class="indexSearchDiv"></search>
    <van-grid>
      <van-grid-item to="/home/list">
        <template #icon
          ><div class="iconDiv">
            <van-icon name="home-o" /></div
        ></template>
        <template #text>整租</template>
      </van-grid-item>
      <van-grid-item>
        <template #icon
          ><div class="iconDiv">
            <van-icon name="friends-o" /></div
        ></template>
        <template #text>合租</template>
      </van-grid-item>
      <van-grid-item>
        <template #icon
          ><div class="iconDiv">
            <van-icon name="location-o" /></div
        ></template>
        <template #text>地图找房</template>
      </van-grid-item>
      <van-grid-item>
        <template #icon
          ><div class="iconDiv">
            <van-icon name="shop-collect-o" /></div
        ></template>
        <template #text>去出租</template>
      </van-grid-item>
    </van-grid>
    <van-cell title="租房小组" value="更多" class="rent-house-group" />
    <van-grid direction="horizontal" :column-num="2">
      <van-grid-item text="文字" v-for="item in rentGroups" :key="item.id">
        <template #icon
          ><img
            :src="`http://liufusong.top:8080${item.imgSrc}`"
            alt="图片"
            class="rentGroupImg"
        /></template>
        <template #text>{{ item.title }}<br />{{ item.desc }}</template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getSwiperAPI, getRentGroupAPI } from '@/api/home'
import search from 'cpns/search.vue'
export default {
  components: {
    search
  },
  data() {
    return {
      imgs: [],
      rentGroups: [],
      currentCity: '北京'
    }
  },
  created() {
    this.getSwiper()
    this.getRentGroup()
  },
  methods: {
    async getSwiper() {
      try {
        const {
          data: { body }
        } = await getSwiperAPI()
        this.imgs = body
      } catch {
        alert('出错了')
      }
    },
    async getRentGroup() {
      const { data } = await getRentGroupAPI()
      this.rentGroups = data.body
    }
  }
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-swipe-item img {
  height: 212px !important;
  width: 100% !important;
}
.van-search {
  margin-top: -200px;
}
.iconDiv {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f2fbf7;
}
.iconDiv > .van-icon {
  position: absolute;
  left: 10px;
  font-size: 40px;
  text-align: center;
  line-height: 60px;
  color: #21b97a;
}
.rent-house-group {
  background-color: #eee;
  font-weight: 700;
}
.homeIndex {
  position: relative;
}
.indexSearchDiv {
  position: absolute;
  top: 20px;
  left: 15px;
}
.rentGroupImg {
  width: 50px;
  height: 50px;
}
</style>
