<template>
  <div class="home">
    <AppHeader />
    <LandingWrapper />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import LandingWrapper from '@/components/LandingWrapper.vue';

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppFooter,
    LandingWrapper
  }
};
</script>

<style scoped>
.home {
  text-align: center;
}
</style>
