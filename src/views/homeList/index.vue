<template>
  <div>
    <van-cell icon="arrow-left" size="16" class="homeList">
      <my-search class="findHouseSearch"></my-search>
    </van-cell>

    <van-row type="flex" justify="center" class="navSelect">
      <van-col
        span="6"
        @click=";[(active = 0), (showAreaSelect = true)]"
        :class="{
          activeCurrent: active === 0 || selectedArea || selectedSubway
        }"
        >区域</van-col
      >
      <van-popup
        v-model="showAreaSelect"
        :get-container="getContainer"
        @close="showAreaSelect = false"
      >
        <van-picker :columns="items" ref="area"></van-picker>
        <div class="chooseBtn">
          <van-button
            type="default"
            @click="showAreaSelect = false"
            class="cancerBtn"
          >
            取消
          </van-button>
          <van-button type="default" @click="getAreaValue" class="confirmBtn">
            确定
          </van-button>
        </div></van-popup
      >
      <van-col
        span="6"
        @click=";[(active = 1), (showRentTypeSelect = true)]"
        :class="{ activeCurrent: active === 1 || selectedRentType }"
        >方式</van-col
      >
      <van-popup
        v-model="showRentTypeSelect"
        :get-container="getContainer"
        @close="showRentTypeSelect = false"
      >
        <van-picker :columns="rentType" default-index="1" ref="rentWay">
        </van-picker>
        <div class="chooseBtn">
          <van-button
            type="default"
            @click="showRentTypeSelect = false"
            class="cancerBtn"
          >
            取消
          </van-button>
          <van-button type="default" @click="getRentWay" class="confirmBtn">
            确定
          </van-button>
        </div></van-popup
      >
      <van-col
        span="6"
        @click=";[(active = 2), (showPriceSelect = true)]"
        :class="{ activeCurrent: active === 2 || selectedPrice }"
        >租金</van-col
      >
      <van-popup
        @close="showPriceSelect = false"
        v-model="showPriceSelect"
        :get-container="getContainer"
      >
        <van-picker :columns="price" default-index="1" ref="price">
        </van-picker>
        <div class="chooseBtn">
          <van-button
            type="default"
            @click="showPriceSelect = false"
            class="cancerBtn"
          >
            取消
          </van-button>
          <van-button type="default" @click="getPrice" class="confirmBtn">
            确定
          </van-button>
        </div></van-popup
      >
      <van-col
        span="6"
        @click=";[(active = 3), (showSelected = true)]"
        :class="{ activeCurrent: active === 3 }"
        >筛选</van-col
      >
      <van-popup
        class="selected"
        @close="showSelected = false"
        v-model="showSelected"
        position="right"
        :style="{ width: '80%', height: '100%' }"
      >
        <van-cell-group>
          <van-cell title="户型" class="leftTitle">
            <template #label>
              <van-grid :column-num="2" gutter="10" center>
                <van-grid-item
                  v-for="(item, index) in roomType"
                  :key="index"
                  :text="item.text"
                />
              </van-grid>
            </template>
          </van-cell>
        </van-cell-group>

        <van-cell-group>
          <van-cell title="朝向" class="leftTitle">
            <template #label>
              <van-grid :column-num="2" gutter="10" center>
                <van-grid-item
                  v-for="(item, index) in oriented"
                  :key="index"
                  :text="item.text"
                />
              </van-grid>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell-group>
          <van-cell title="楼层" class="leftTitle">
            <template #label>
              <van-grid :column-num="2" gutter="10" center>
                <van-grid-item
                  v-for="(item, index) in floor"
                  :key="index"
                  :text="item.text"
                />
              </van-grid>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell-group>
          <van-cell title="房屋亮点" class="leftTitle">
            <template #label>
              <van-grid :column-num="2" gutter="10" center>
                <van-grid-item
                  v-for="(item, index) in characteristic"
                  :key="index"
                  :text="item.text"
                />
              </van-grid>
            </template>
          </van-cell>
        </van-cell-group>
        <div class="chooseBtn">
          <van-button type="default" @click="active" class="cancerBtn">
            取消
          </van-button>
          <van-button type="default" @click="getAreaValue" class="confirmBtn">
            确定
          </van-button>
        </div></van-popup
      >
    </van-row>
    <selected-house-list
      class="selectedList"
      ref="selectedHouseList"
    ></selected-house-list>
  </div>
</template>

<script>
import mySearch from 'cpns/search.vue'
import { getHouseConditionAPI } from '@/api'
import selectedHouseList from './component/selectedHouseList.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'homeList',
  components: {
    mySearch,
    selectedHouseList
  },
  data() {
    return {
      active: 2,
      items: [],
      rentType: [],
      price: [],
      showAreaSelect: false,
      showRentTypeSelect: false,
      showPriceSelect: false,
      showSelected: false,
      floor: [],
      oriented: [],
      roomType: [],
      characteristic: []
    }
  },
  created() {
    this.getHouseCondition()
  },
  methods: {
    ...mapMutations([
      'SET_SELECTED_AREA',
      'SET_SELECTED_RENTTYPE',
      'SET_SELECTED_PRICE',
      'SET_SELECTED_SUBWAY'
    ]),
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
      this.floor = data.body.floor
      this.oriented = data.body.oriented
      this.roomType = data.body.roomType
      this.characteristic = data.body.characteristic

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
    },
    getAreaValue() {
      const nowValues = this.$refs.area.getValues()
      let i = nowValues.length - 1
      while (
        !nowValues[i] ||
        nowValues[i].value === 'null' ||
        nowValues[i].value === 'undefined'
      ) {
        i--
      }
      if (i === -1) {
        this.SET_SELECTED_AREA('')
        this.SET_SELECTED_SUBWAY('')
      } else {
        if (nowValues[0].text === '区域') {
          const areaVaule = nowValues[i].value
          this.SET_SELECTED_AREA(areaVaule)
        } else if (nowValues[0].text === '地铁') {
          const subwayValue = nowValues[i].value
          this.SET_SELECTED_SUBWAY(subwayValue)
        }
      }

      this.showAreaSelect = false
      this.$refs.selectedHouseList.getHouses()
    },
    getRentWay() {
      const nowValues = this.$refs.rentWay.getValues()
      const selectedRentWay = nowValues[0].value
      this.SET_SELECTED_RENTTYPE(selectedRentWay)
      this.showRentTypeSelect = false
      this.$refs.selectedHouseList.getHouses()
    },
    getPrice() {
      const nowValues = this.$refs.price.getValues()
      const selectedPrice = nowValues[0].value
      this.SET_SELECTED_PRICE(selectedPrice)
      this.showPriceSelect = false
      this.$refs.selectedHouseList.getHouses()
    },
    getContainer() {
      return document.querySelector('.selectedList')
    }
  },
  computed: {
    ...mapState([
      'selectedArea',
      'selectedRentType',
      'selectedPrice',
      'selectedSubway'
    ])
  }
}
</script>

<style scoped lang="less">
.homeList {
  background-color: #1cb676;
  display: flex;
  z-index: 2;
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
.activeCurrent {
  color: #1cb676;
}
.chooseBtn {
  display: flex;

  .confirmBtn {
    flex: 2 1;
    background-color: #21b97a;
    color: #fff;
  }
  .cancerBtn {
    flex: 1 1;
    color: #21b97a;
  }
}
.selectedbtns {
  position: fixed;
  left: 80px;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 3;
}
.pickerArea {
  position: relative;
  z-index: 3;
  background-color: #fff;
  :deep(.van-tabs__content) {
    position: relative;
    z-index: 3;
    background-color: #fff;
  }
}

.navSelect {
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
  line-height: 40px;
}
.van-popup {
  width: 100%;
}
.leftTitle {
  text-align: left;
}
</style>
