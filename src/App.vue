<template>
  <div id="app">
    <AppHeader />

    <div class="main-content">
      <LandingWrapper v-if="!isAuthenticated" @authenticated="onAuthenticated" />
      <Dashboard v-else @logout="logout" />
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import LandingWrapper from './components/LandingWrapper.vue';
import Dashboard from './components/Dashboard.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    LandingWrapper,
    Dashboard
  },
  data() {
    return {
      isAuthenticated: false
    };
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem('token');
  },
  methods: {
    onAuthenticated() {
      this.isAuthenticated = true;
    },
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
    }
  }
};
</script>

<style scoped>
.main-content {
  min-height: 80vh; /* Adjust as needed */
}
</style>
