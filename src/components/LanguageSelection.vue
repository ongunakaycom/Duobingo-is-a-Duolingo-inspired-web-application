<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle"
      type="button"
      id="languageDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ currentFlag }} {{ $t('site_language') }}: {{ currentLang.toUpperCase() }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="languageDropdown">
      <li
        v-for="lang in languages"
        :key="lang.code"
      >
        <button
          class="dropdown-item"
          :class="{ active: currentLang === lang.code }"
          @click="changeLanguage(lang.code)"
        >
          {{ lang.flag }} {{ lang.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLanguageStore } from '@/store/language';
import { Dropdown } from 'bootstrap'; // Import Bootstrap's dropdown constructor

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
  { code: 'en', label: 'ENGLISH', flag: '🇺🇸' },
  { code: 'es', label: 'ESPAÑOL', flag: '🇪🇸' }
];

const currentFlag = computed(() => {
  const found = languages.find((l) => l.code === currentLang.value);
  return found?.flag || '🌐';
});

const changeLanguage = (code) => {
  if (code !== currentLang.value) {
    languageStore.setLanguage(code);
  }
};

// Bootstrap dropdown init
onMounted(() => {
  const dropdownElement = document.getElementById('languageDropdown');
  if (dropdownElement) {
    new Dropdown(dropdownElement); // Activates the dropdown
  }
});
</script>


<style scoped>
.dropdown-item.active {
  font-weight: bold;
  background-color: #f8f9fa;
}
</style>
