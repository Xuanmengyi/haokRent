<template>
  <div>
    <!-- 已登录 -->
    <!-- <div class="login banner" v-if="isLogin">已登录</div> -->
    <!-- 未登录 -->
    <div class="banner">
      <div class="my-title">
        <van-image
          class="bgImg"
          :src="
            isLogin
              ? 'http://liufusong.top:8080/img/avatar.png'
              : 'http://liufusong.top:8080/img/profile/bg.png'
          "
        />
        <div class="my_info">
          <van-image
            src="http://liufusong.top:8080/img/profile/avatar.png"
            class="my_image"
          />
          <div class="username">{{ isLogin ? nickname : '游客' }}</div>
          <van-button
            type="info"
            size="small"
            color="#21b97a"
            class="loginBtn"
            :round="isLogin ? true : false"
            @click="loginOrout"
            >{{ isLogin ? '退出' : '去登录' }}</van-button
          >
          <div class="editUserInfo" v-show="isLogin">
            编辑个人资料<van-icon name="play" />
          </div>
        </div>
      </div>
      <van-grid :column-num="3" :border="false">
        <van-grid-item icon="star-o" text="我的收藏" to="/favorite" />
        <van-grid-item icon="wap-home-o" text="我的出租" />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="notes-o" text="成为房主" />
        <van-grid-item icon="manager-o" text="个人资料" />
        <van-grid-item icon="phone-o" text="联系我们" />
      </van-grid>

      <van-image
        src="http://liufusong.top:8080/img/profile/join.png"
        class="footImg"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfoAPI } from '@/api'
export default {
  data() {
    return {
      nickname: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
    // ...mapState(['tokenObj'])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async loginOrout() {
      if (this.isLogin) {
        await this.$dialog.confirm({
          title: '提示',
          message: '是否确认退出该账号'
        })
        this.$store.commit('SET_TOKEN', {})
      } else {
        this.$router.push('/login')
      }
    },
    async getUserInfo() {
      const { data } = await getUserInfoAPI()
      this.nickname = data.body.nickname
    }
  }
}
</script>

<style scoped lang="less">
.my-title {
  width: 100%;
  min-height: 300px;
  position: relative;
  .bgImg {
    width: 100%;
  }
  .editUserInfo {
    margin-top: -35px;
    font-size: 12px;
    color: #999;
  }
  .my_info {
    position: absolute;
    background: #fff;
    width: 75%;
    height: 55%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 3px #ddd;
    margin: 50px auto 0;
    padding: 0 20px;
    text-align: center;
    font-size: 13px;
    z-index: 10;
    .username {
      margin-top: -30px;
      margin-bottom: 10px;
    }
    :deep(.loginBtn) {
      font-size: 13px !important;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      text-align: center;
      position: relative;
      top: -20px;
    }
    .my_image {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      border: 5px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 2px 2px #bdbdbd;
    }
  }
}
.footImg {
  width: 92%;
  margin-top: 10px;
  left: 15px;
}
</style>
