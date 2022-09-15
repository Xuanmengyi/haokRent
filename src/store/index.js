import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'RENT_HOUSE_CURRENTCITY',
      reducer({ tokenObj, currentCity }) {
        return { tokenObj, currentCity }
      }
    })
  ],
  state: {
    currentCity: { label: '北京', value: 'AREA|88cff55c-aaa4-e2e0' },
    tokenObj: {},
    selectedArea: '',
    selectedRentType: null,
    selectedPrice: '',
    selectedSubway: ''
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    },
    SET_CURRENT_CITY(state, city) {
      state.currentCity = city
    },
    SET_SELECTED_AREA(state, selectedArea) {
      state.selectedArea = selectedArea
    },
    SET_SELECTED_RENTTYPE(state, selectedRentType) {
      state.selectedRentType = selectedRentType
    },
    SET_SELECTED_PRICE(state, selectedPrice) {
      state.selectedPrice = selectedPrice
    },
    SET_SELECTED_SUBWAY(state, selectedSubway) {
      state.selectedSubway = selectedSubway
    }
  },
  actions: {},
  modules: {}
})
