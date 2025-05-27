<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle d-flex align-items-center gap-2"
      type="button"
      id="languageDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span :class="['flag-icon', `flag-icon-${currentFlag}`]"></span>
      {{ $t('site_language') }}: {{ currentLang.toUpperCase() }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="languageDropdown">
      <li v-for="lang in languages" :key="lang.code">
        <button
          class="dropdown-item d-flex align-items-center gap-2"
          :class="{ active: currentLang === lang.code }"
          @click="changeLanguage(lang.code)"
        >
          <span :class="['flag-icon', `flag-icon-${lang.flag}`]"></span>
          {{ lang.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLanguageStore } from '@/store/language';
import { Dropdown } from 'bootstrap';

const { locale } = useI18n();
const languageStore = useLanguageStore();

watch(
  () => languageStore.current,
  (newLang) => {
    locale.value = newLang;
  },
  { immediate: true }
);

const currentLang = computed(() => languageStore.current);

const languages = [
  { code: 'en', label: 'English', flag: 'us' },
  { code: 'es', label: 'Español', flag: 'es' }
];

const currentFlag = computed(() => {
  const found = languages.find((l) => l.code === currentLang.value);
  return found?.flag || '';
});

const changeLanguage = (code) => {
  if (code !== currentLang.value) {
    languageStore.setLanguage(code);
  }
};

onMounted(() => {
  const dropdownElement = document.getElementById('languageDropdown');
  if (dropdownElement) {
    new Dropdown(dropdownElement);
  }
});
</script>

<style scoped>
.dropdown-item.active {
  font-weight: bold;
  background-color: #f8f9fa;
}

.flag-icon {
  width: 1.5em;
  height: 1em;
  background-size: cover;
  border-radius: 0.125rem;
}
</style>
