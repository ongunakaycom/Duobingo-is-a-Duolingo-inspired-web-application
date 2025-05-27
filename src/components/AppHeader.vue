<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container d-flex justify-content-between align-items-center">
        <!-- Logo -->
        <a class="navbar-brand" href="#" @click.prevent="handleLogoClick">
          <img src="@/assets/Duolingo_logo.svg.png" alt="Duobingo Logo" class="logo" />
        </a>

        <!-- Language Selector (only on /dashboard) -->
        <LanguageSelection />
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import LanguageSelection from '@/components/LanguageSelection.vue';

const router = useRouter();
const route = useRoute();

const isAuthenticated = !!localStorage.getItem('token');

const handleLogoClick = () => {
  if (isAuthenticated && route.path !== '/dashboard') {
    router.push('/dashboard');
  } else if (!isAuthenticated && route.path !== '/') {
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
