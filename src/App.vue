<template>
  <div id="app">
    <AppHeader v-if="!isLessonsPage" />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    isLessonsPage() {
      return this.$route.path === '/lessons';
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

router-view {
  flex: 1;
}
</style>