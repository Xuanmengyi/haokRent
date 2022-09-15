<template>
  <div class="cityDiv">
    <van-nav-bar
      title="城市列表"
      left-arrow
      @click-left="onClickLeft"
      class="cityList"
    />
    <van-index-bar :index-list="letter">
      <div v-for="(item1, i) in city" :key="i" class="cityLeft">
        <van-index-anchor :index="item1.letter">{{
          item1.letter
        }}</van-index-anchor>
        <van-cell
          :title="item2.label"
          v-for="(item2, index) in item1.list"
          :key="index"
          @click="changeCity(item2.label)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityAPI, getHotCityAPI, getAreaInfoAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      city: [
        { letter: '当前城市', list: [{ label: '北京', pinyin: 'beijing' }] },
        { letter: '热门城市', list: [] }
      ],
      letter: ['#', '热'],
      hotCity: []
    }
  },
  created() {
    this.getCity()
    this.getHotCity()
  },
  methods: {
    ...mapMutations(['SET_CURRENT_CITY']),
    async getCity() {
      const { data } = await getCityAPI(1)
      let letter = ''
      // 获取26个字母
      for (let i = 65; i <= 90; i++) {
        letter = String.fromCharCode(i)
        // 字母的数组
        this.letter.push(letter)
        // 获取到的当前的字母所匹配的数组
        const list = data.body.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        )
        // 获取到的数组根据拼音排序
        list.sort((a, b) => a.pinyin.localeCompare(b.pinyin))
        // 把该字母与它匹配的数组放进city数组内
        this.city.push({
          letter,
          list
        })
      }
    },
    async getHotCity() {
      const { data } = await getHotCityAPI()
      this.city[1].list = data.body
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    async changeCity(city) {
      console.log(city)
      const { data } = await getAreaInfoAPI(city)
      this.SET_CURRENT_CITY(data.body)
      console.log(data.body)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
:deep(.cityLeft .van-index-anchor) {
  font-size: 14px;
  padding: 10px 15px;
  color: #999;
}
:deep(.van-index-bar__index) {
  padding: 0;
  margin-top: 5px;
}
:deep(.van-index-bar__index--active) {
  color: #fff;
  background-color: #21b97a;
  border-radius: 100%;
  display: inline-block;
  font-size: 12px;
  width: 15px;
  height: 15px;
  line-height: 15px;
}
:deep(.hotCity > .van-index-bar__sidebar) {
  top: 10%;
  right: 5px;
}
.cityDiv {
  padding-bottom: 60px;
}
.cityList {
  position: fixed;
  width: 100%;
  z-index: 9999;
}
</style>
