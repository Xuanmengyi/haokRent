<template>
  <div>
    <van-tabbar v-model="active" active-color="#21b97a" route>
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/home/list">找房</van-tabbar-item>
      <van-tabbar-item icon="label-o" to="/home/news">资讯</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/home/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style></style>
