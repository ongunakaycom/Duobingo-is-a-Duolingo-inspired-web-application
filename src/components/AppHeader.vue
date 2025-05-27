<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container d-flex justify-content-between align-items-center">
        <!-- Logo -->
        <a class="navbar-brand" href="#" @click.prevent="handleLogoClick">
          <img src="@/assets/Duolingo_logo.svg.png" alt="Duobingo Logo" class="logo" />
        </a>

        <!-- Language Selector (only on /dashboard) -->
        <LanguageSelection v-if="isDashboard" />
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import LanguageSelection from '@/components/LanguageSelection.vue';

const router = useRouter();
const route = useRoute();

const isAuthenticated = computed(() => !!localStorage.getItem('token'));
const isDashboard = computed(() => route.path === '/dashboard');

const handleLogoClick = () => {
  if (isAuthenticated.value && route.path !== '/dashboard') {
    router.push('/dashboard');
  } else if (!isAuthenticated.value && route.path !== '/') {
    router.push('/');
  }
};
</script>

<style scoped>
.logo {
  height: 40px;
  cursor: pointer;
}
</style>
