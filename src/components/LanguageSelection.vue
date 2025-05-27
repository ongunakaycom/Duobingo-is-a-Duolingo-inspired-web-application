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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['languageChanged']);

const { locale } = useI18n();

const currentLang = computed(() => locale.value);

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
    locale.value = code;
    localStorage.setItem('lang', code);
    emit('languageChanged', code);
  }
};
</script>

<style scoped>
.dropdown-item.active {
  font-weight: bold;
  background-color: #f8f9fa;
}
</style>
