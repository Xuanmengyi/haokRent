<template>
  <div>
    <van-nav-bar title="收藏列表" left-arrow @click-left="onClickLeft" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell value="内容" class="houseItem">
        <template #title>
          <van-image
            width="106px"
            height="80px"
            fit="contain"
            :src="'http://liufusong.top:8080'"
          />
        </template>
        <template>
          <h3 class="rightTitle van-ellipsis"></h3>
          <div class="desc van-ellipsis"></div>
          <div class="tagsDiv van-ellipsis">
            <!-- <span
              v-for="(item, index) in houseItem.tags"
              :key="index"
              class="tags"
              >{{ item }}</span
            > -->
          </div>
          <div class="price">元/月</div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      console.log(666)
    }
  }
}
</script>

<style></style>
