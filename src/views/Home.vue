<template>
  <div class="home">
    <LandingFeatures />
  </div>
</template>

<script>
import LandingFeatures from '@/components/LandingFeatures.vue';

export default {
  name: 'Home',
  components: {
    LandingFeatures
  }
};
</script>

<style scoped>
/* Add any custom CSS styles here */
.home {
  text-align: center;
}
</style>
