<template>
    <div class="landing-page">
      <!-- Jumbotron Component -->
      <LandingJumbotron />
      
      <!-- Language Selection Component -->
      <LanguageSelection />
  
      <!-- Features Component -->
      <LandingFeatures />
    </div>
  </template>
  
  <script>
  import LandingJumbotron from '@/components/LandingJumbotron.vue';
  import LanguageSelection from '@/components/LanguageSelection.vue';
  import LandingFeatures from '@/components/LandingFeatures.vue';
  
  export default {
    name: 'LandingPage',
    components: {
      LandingJumbotron,
      LanguageSelection,
      LandingFeatures
    }
  };
  </script>
  
  <style scoped>
  .landing-page {
    text-align: center;
  }
  </style>
  