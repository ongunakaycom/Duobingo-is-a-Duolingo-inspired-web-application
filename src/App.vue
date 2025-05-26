<template>
  <div id="app">
    <LandingJumbotron v-if="!isAuthenticated" @authenticated="onAuthenticated" />
    <Dashboard v-else @logout="logout" />
  </div>
</template>

<script>
import LandingJumbotron from './components/LandingJumbotron.vue';
import Dashboard from './components/Dashboard.vue';

export default {
  components: {
    LandingJumbotron,
    Dashboard
  },
  data() {
    return {
      isAuthenticated: false
    };
  },
  created() {
    // Check token on load
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
