<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import router from './router'; // Import Vue Router

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  router // Use Vue Router
};
</script>

<style>

</style>
