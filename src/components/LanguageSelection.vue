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
import { computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

const currentLang = computed(() => locale.value);

const languages = [
  { code: 'en', label: 'ENGLISH', flag: '🇺🇸' },
  { code: 'es', label: 'ESPAÑOL', flag: '🇪🇸' }
];

const currentFlag = computed(() => {
  const found = languages.find((l) => l.code === currentLang.value);
  console.log('Current language:', currentLang.value);
  console.log('Resolved flag:', found?.flag);
  return found?.flag || '🌐';
});

const changeLanguage = (code) => {
  console.log('Changing language to:', code);
  locale.value = code;
  localStorage.setItem('lang', code);
};

// Debug current locale value on mount
onMounted(() => {
  console.log('Mounted with locale:', locale.value);
});

// Reactively log changes
watch(locale, (newVal) => {
  console.log('Locale changed to:', newVal);
});
</script>

<style scoped>
.dropdown-item.active {
  font-weight: bold;
  background-color: #f8f9fa;
}
</style>
