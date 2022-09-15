<template>
  <div>
    <router-view></router-view>
    <my-footer v-if="$route.path !== '/login'"></my-footer>
  </div>
</template>

<script>
import myFooter from 'cpns/footer.vue'

export default {
  components: {
    myFooter
  }
}
</script>

<style></style>
