<template>
  <div>
    <house-item
      v-for="(item, index) in houseList"
      :key="index"
      :houseItem="item"
      @conveyAreaValue="getArea"
    ></house-item>
  </div>
</template>

<script>
import { getHouseAPI } from '@/api'
import houseItem from './houseItem.vue'
import store from '@/store'
export default {
  components: {
    houseItem
  },
  data() {
    return {
      houseList: []
    }
  },
  created() {
    this.getHouses()
  },
  methods: {
    loading() {
      this.$toast({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async getHouses() {
      this.loading()
      try {
        const {
          state: {
            selectedArea,
            selectedRentType,
            selectedPrice,
            selectedSubway
          }
        } = store
        const cityValue = this.$store.state.currentCity.value
        const { data } = await getHouseAPI(
          cityValue,
          selectedArea,
          selectedSubway,
          selectedRentType,
          selectedPrice
        )
        console.log(data)
        this.houseList = data.body.list
        this.$toast.clear()
      } catch (error) {
        if (error.response) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    getArea(value) {
      console.log(value)
    }
  }
}
</script>

<style></style>
