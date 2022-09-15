<template>
  <div class="searchDiv">
    <van-button type="default" to="/city"
      >{{ currentCity.label }}<van-icon name="arrow-down"
    /></van-button>
    <van-search
      v-model="value"
      placeholder="请输入小区或地址"
      class="searchAddress"
    />
    <van-icon name="location-o" class="addressIcon" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: '',
      value1: 0,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ]
    }
  },

  computed: {
    // ...mapState(['currentCity']) this.$store.state.currentCity
    ...mapState(['currentCity'])
  }
}
</script>

<style scoped>
.searchDiv {
  display: flex;
  justify-content: center;
}
.searchDiv > .van-button {
  height: 34px;
}
.searchAddress {
  padding: 0;
}
.searchAddress > .van-search__content {
  background-color: #fff;
}
.addressIcon {
  font-size: 25px;
  color: #fff;
  margin: 5px 0 0 8px;
}
</style>
