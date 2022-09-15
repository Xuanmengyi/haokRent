<template>
  <div>
    <van-cell value="内容" class="houseItem">
      <template #title>
        <van-image
          width="106px"
          height="80px"
          fit="contain"
          :src="'http://liufusong.top:8080' + houseItem.houseImg"
        />
      </template>
      <template>
        <h3 class="rightTitle van-ellipsis">{{ houseItem.title }}</h3>
        <div class="desc van-ellipsis">{{ houseItem.desc }}</div>
        <div class="tagsDiv van-ellipsis">
          <span
            v-for="(item, index) in houseItem.tags"
            :key="index"
            class="tags"
            >{{ item }}</span
          >
        </div>
        <div class="price">{{ houseItem.price }}元/月</div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'houseItem',
  props: {
    houseItem: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped lang="less">
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
