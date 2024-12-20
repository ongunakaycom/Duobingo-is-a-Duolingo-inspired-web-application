<template>
  <div class="home">
    <LandingJumbotron />
    <LandingFeatures />
  </div>
</template>

<script>
import LandingJumbotron from '@/components/LandingJumbotron.vue';
import LandingFeatures from '@/components/LandingFeatures.vue';

export default {
  name: 'Home',
  components: {
    LandingJumbotron,
    LandingFeatures
  }
};
</script>

<style scoped>
.home {
  text-align: center;
}
</style>
