<template>
  <div class="dropdown">
    <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
      {{ currentFlag }} {{ $t('site_language') }}: {{ currentLang.toUpperCase() }}
    </button>
    <ul class="dropdown-menu">
      <li
        v-for="lang in languages"
        :key="lang.code"
        class="dropdown-item"
        :class="{ active: currentLang === lang.code }"
        @click="changeLanguage(lang.code)"
      >
        {{ lang.flag }} {{ lang.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const currentLang = computed(() => locale.value);

const languages = [
  { code: 'en', label: 'ENGLISH', flag: '🇺🇸' },
  { code: 'es', label: 'ESPAÑOL', flag: '🇪🇸' }
];

const currentFlag = computed(() => {
  return languages.find((l) => l.code === currentLang.value)?.flag || '🌐';
});

const changeLanguage = (code) => {
  locale.value = code;
  localStorage.setItem('lang', code);
};
</script>

<style scoped>
.dropdown-item.active {
  font-weight: bold;
  background-color: #f8f9fa;
}
</style>
