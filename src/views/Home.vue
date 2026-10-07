<template>
  <div class="home">
    <LandingNew />
  </div>
</template>

<script>
import LandingNew from '@/components/landing/LandingNew.vue';

export default {
  name: 'Home',
  components: {
    LandingNew,
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}
</style>