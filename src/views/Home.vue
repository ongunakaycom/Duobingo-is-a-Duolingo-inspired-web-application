<template>
  <div class="home">
    <LandingWrapper />
  </div>
</template>

<script>
import LandingWrapper from '@/components/LandingWrapper.vue';

export default {
  name: 'Home',
  components: {
    LandingWrapper
  }
};
</script>

<style scoped>
.home {
  text-align: center;
}
</style>