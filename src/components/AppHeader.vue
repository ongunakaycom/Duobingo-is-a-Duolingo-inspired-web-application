<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container d-flex justify-content-between align-items-center">
        <!-- Logo -->
        <router-link class="navbar-brand" :to="isAuthenticated ? '/dashboard' : '/'">
          <img src="@/assets/Duolingo_logo.svg.png" alt="Duobingo Logo" class="logo" />
        </router-link>

        <!-- Language Selector -->
        <LanguageSelection />
      </div>
    </nav>
  </header>
</template>

<script setup>
import LanguageSelection from '@/components/LanguageSelection.vue';
import { computed } from 'vue';

const isAuthenticated = computed(() => !!localStorage.getItem('token'));
</script>

<style scoped>
.logo {
  height: 40px;
  cursor: pointer;
}
</style>
