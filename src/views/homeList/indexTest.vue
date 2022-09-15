<template>
  <div>
    <van-cell icon="arrow-left" size="16" class="homeList">
      <my-search class="findHouseSearch"></my-search>
    </van-cell>
    <van-tabs v-model="active" class="rentTopNav">
      <van-tab>
        <template #title>
          <van-dropdown-menu>
            <van-dropdown-item title="区域">
              <van-picker :columns="items">
                <!-- <template #default>
                  <van-cell></van-cell>
                </template> -->
              </van-picker>
            </van-dropdown-item>
          </van-dropdown-menu>
        </template>
      </van-tab>
      <van-tab>
        <template #title>
          <van-dropdown-menu>
            <van-dropdown-item title="方式">
              <van-picker :columns="rentType" default-index="1"> </van-picker>
            </van-dropdown-item>
          </van-dropdown-menu>
        </template>
      </van-tab>
      <van-tab>
        <template #title>
          <van-dropdown-menu>
            <van-dropdown-item title="租金">
              <van-picker :columns="price" default-index="1"> </van-picker>
            </van-dropdown-item>
          </van-dropdown-menu>
        </template>
      </van-tab>
      <van-tab title="标签 4"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import mySearch from 'cpns/search.vue'
import { getHouseConditionAPI } from '@/api'
export default {
  name: 'homeList',
  components: {
    mySearch
  },
  data() {
    return {
      active: 2,
      items: [],
      rentType: [],
      price: []
    }
  },
  created() {
    this.getHouseCondition()
  },
  methods: {
    resolveData(data) {
      for (let key in data) {
        if (data[key] instanceof Array) {
          data[key] = data[key].map((item) => ({
            ...item,
            text: item.label ? item.label : ''
          }))
          this.resolveData(data[key])
        } else if (data[key] instanceof Object) {
          if (!data[key].children) {
            data[key].children = []
          }
          this.resolveData(data[key])
        } else if (data.label) {
          data.text = data.label
          delete data.label
        }
      }
    },
    async getHouseCondition() {
      const currentCityId = this.$store.state.currentCity.value
      const { data } = await getHouseConditionAPI(currentCityId)
      // this.items = data.body
      this.resolveData(data.body)
      console.log(data.body)
      this.rentType = data.body.rentType
      this.price = data.body.price
      for (let key in data.body) {
        if (data.body[key] instanceof Array) {
          continue
        } else if (data.body[key] instanceof Object) {
          this.items.push({
            text: data.body[key].text ? data.body[key].text : '',
            children: data.body[key].children ? data.body[key].children : []
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.homeList {
  background-color: #1cb676;
  display: flex;
}
.homeList > i {
  color: white;
  line-height: 34px;
  font-size: 20px;
  margin-left: -8px;
}
.findHouseNavBar {
  text-align: center;
}
.rentTopNav .van-dropdown-menu__title--active {
  color: #21b97a !important;
}
</style>
