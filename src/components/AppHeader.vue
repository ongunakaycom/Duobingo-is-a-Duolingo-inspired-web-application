<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container d-flex justify-content-between align-items-center">
        <!-- Logo -->
        <router-link class="navbar-brand" :to="isAuthenticated ? '/dashboard' : '/'">
          <img src="@/assets/Duolingo_logo.svg.png" alt="Duobingo Logo" class="logo" />
        </router-link>

        <!-- Language Dropdown -->
        <div class="dropdown">
          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
            {{ $t('site_language') }}: {{ currentLang.toUpperCase() }}
          </button>
          <ul class="dropdown-menu">
            <li v-for="lang in languages" :key="lang" class="dropdown-item" @click="changeLanguage(lang)">
              {{ lang.toUpperCase() }}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const currentLang = computed(() => locale.value);
const languages = ['English', 'Spanish', 'Turkish'];

const changeLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem('lang', lang);
};

const isAuthenticated = computed(() => !!localStorage.getItem('token'));
</script>

<style scoped>
.logo {
  height: 40px;
  cursor: pointer;
}
</style>
