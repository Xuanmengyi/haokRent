<template>
  <div>
    <van-nav-bar
      title="发布房源"
      left-arrow
      @click-left="onClickLeft"
      class="navbar"
    />
    <van-cell title="房源信息" class="navTitle" />
    <!-- 输入任意文本 -->
    <van-field v-model="text" label="小区名称"></van-field>
    <!-- 输入手机号，调起手机号键盘 -->
    <van-field v-model="tel" type="tel" label="手机号" />
    <!-- 允许输入正整数，调起纯数字键盘 -->
    <van-field v-model="digit" type="digit" label="整数" />
    <!-- 允许输入数字，调起带符号的纯数字键盘 -->
    <van-field v-model="number" type="number" label="数字" />
    <!-- 输入密码 -->
    <van-field v-model="password" type="password" label="密码" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data() {
        return {
          tel: '',
          text: '',
          digit: '',
          number: '',
          password: ''
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #21b97a;
  .van-nav-bar__title {
    color: #fff;
    font-size: 16px;
  }
  .van-nav-bar__arrow {
    color: #fff;
  }
}
.navTitle {
  color: #21b97a;
  font-size: 15px;
}
</style>
