<template>
  <div>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myFooter from '@/components/footer.vue'
export default {
  components: {
    myFooter
  }
}
</script>

<style></style>
