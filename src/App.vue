<template>
  <div id="app">
    <!-- Header: hidden on /lessons (which uses its own DashboardHeader) -->
    <AppHeader v-if="!isLessonsPage" />

    <!-- Route content — wrapped in <main> so flexbox works cleanly -->
    <main class="app-main">
      <router-view />
    </main>

    <!-- Footer: only on the landing page -->
    <AppFooter v-if="showFooter" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    /**
     * /lessons has its own DashboardHeader — hide the global AppHeader there.
     */
    isLessonsPage() {
      return this.$route.path === '/lessons';
    },

    /**
     * Show the footer only on the landing page.
     * Login, lessons, dashboard etc. should not display it.
     */
    showFooter() {
      return this.$route.path === '/';
    },
  },
};
</script>

<style scoped>
/* =============================
 * App root — full-height column layout
 * ============================= */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

/* =============================
 * Main content area — fills the gap between header and footer
 * ============================= */
.app-main {
  flex: 1 0 auto;              /* grow, don't shrink below content */
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

/* router-view renders the actual page inside app-main */
.app-main > :deep(*) {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

/* =============================
 * Prevent horizontal overflow at root
 * ============================= */
:deep(html),
:deep(body) {
  overflow-x: hidden;
}
</style>