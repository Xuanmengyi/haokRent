<template>
  <div class="favoriteDiv">
    <van-nav-bar
      title="收藏列表"
      left-arrow
      offset="100"
      :immediate-check="false"
      @click-left="onClickLeft"
      class="favoriteList"
    />
    <van-list
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        value="内容"
        class="houseItem"
        v-for="(favoriteList, index) in favoriteList"
        :key="index"
      >
        <template #title>
          <van-image
            width="106px"
            height="80px"
            fit="contain"
            :src="'http://liufusong.top:8080' + favoriteList.houseImg"
          />
        </template>
        <template>
          <h3 class="rightTitle van-ellipsis">{{ favoriteList.title }}</h3>
          <div class="desc van-ellipsis">{{ favoriteList.desc }}</div>
          <div class="tagsDiv van-ellipsis">
            <span
              v-for="(item, index) in favoriteList.tags"
              :key="index"
              class="tags"
              >{{ item }}</span
            >
          </div>
          <div class="price">{{ favoriteList.price }}元/月</div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getFavoriteAPI } from '@/api'
export default {
  data() {
    return {
      list: [],
      favoriteList: [],
      error: false
    }
  },
  created() {
    this.getFavorites()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async getFavorites() {
      try {
        const { data } = await getFavoriteAPI()
        console.log(data.body)
        this.favoriteList = data.body
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="less">
:deep(.favoriteList) {
  background-color: #21b97a;
  .van-nav-bar__title {
    color: #fff;
    font-size: 16px;
  }
  .van-nav-bar__arrow {
    color: #fff;
  }
}
.rightTitle {
  margin: 0;
  font-size: 15px;
  color: #394043;
}
.desc {
  font-size: 12px;
}
.tagsDiv {
  height: 22px;
  font-size: 14px;
  .tags {
    color: #39becd;
    background: #e1f5f8;
    margin-right: 5px;
  }
}
.price {
  font-size: 16px;
  font-weight: bolder;
  color: #fa5741;
}
.houseItem {
  display: flex;
  justify-self: left;
  .van-cell__value {
    text-align: left;
  }
}
</style>
