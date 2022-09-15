<template>
  <div>
    <van-nav-bar title="账号登陆" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div class="register">
      <router-link to="/">还没有账号, 去注册~</router-link>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/login'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      this.loading()
      try {
        const { data } = await loginAPI(this.username, this.password)
        this.SET_TOKEN(data.body)
        this.$toast.success('登录成功')
        this.$router.push('/home')
      } catch (error) {
        console.log(error.status)
        if (
          error.response &&
          (error.response.status === 400 ||
            error.response.status === 401 ||
            error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.van-nav-bar__title {
  color: white !important;
  justify-content: center;
  font-size: 18px;
  white-space: nowrap;
  font-family: 'Microsoft YaHei';
}
.van-nav-bar__content {
  background-color: #1cb676 !important;
}
.van-nav-bar .van-icon {
  color: white !important;
}
.van-form {
  font-weight: 400;
  font-size: 18px;
  padding: 25px 20px;
}
.van-cel.van-fieldl {
  margin-bottom: 20px;
}
.van-button--info {
  background-color: #1cb676 !important;
  border: 0 !important;
  margin: 30px auto !important;
  font-size: 18px !important;
}

.register {
  margin-top: -20px;
  text-align: center;
}
.router-link-active {
  color: rgb(102, 102, 102) !important;
  font-size: 14px;
}
</style>
