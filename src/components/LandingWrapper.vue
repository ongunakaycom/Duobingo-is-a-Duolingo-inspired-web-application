<!-- src/components/LandingWrapper.vue -->
<template>
  <div>
    <LandingJumbotron />
    <LandingFeatures />
  </div>
</template>

<script>
import LandingJumbotron from './LandingJumbotron.vue';
import LandingFeatures from './LandingFeatures.vue';

export default {
  name: 'LandingWrapper',
  components: {
    LandingJumbotron,
    LandingFeatures
  }
};
</script>
