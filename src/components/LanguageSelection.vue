<template>
  <div class="dropdown" @keydown.esc="isOpen = false">
    <button
      class="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
      type="button"
      @click="toggleDropdown"
      :aria-expanded="isOpen.toString()"
    >
      <img :src="currentFlag" alt="Flag" class="flag-icon" />
      {{ $t('site_language') }}: {{ currentLang.toUpperCase() }}
    </button>

    <ul v-if="isOpen" class="dropdown-menu show">
      <li v-for="lang in languages" :key="lang.code">
        <a
          href="#"
          class="dropdown-item d-flex align-items-center gap-2"
          :class="{ active: currentLang === lang.code }"
          @click.prevent="changeLanguage(lang.code)"
        >
          <img :src="lang.flag" :alt="lang.label" class="flag-icon" />
          {{ lang.label }}
          <span class="ms-auto text-success" v-if="currentLang === lang.code">✔</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/store/language'

const { locale } = useI18n()
const languageStore = useLanguageStore()

const isOpen = ref(false)

const languages = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/us.svg' },
  { code: 'es', label: 'Español', flag: 'https://flagcdn.com/es.svg' }
]

const currentLang = computed(() => languageStore.current)
const currentFlag = computed(() => languages.find(l => l.code === currentLang.value)?.flag || '')

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const changeLanguage = (code) => {
  if (code !== currentLang.value) {
    languageStore.setLanguage(code)
    localStorage.setItem('lang', code)
  }
  isOpen.value = false
}


watch(() => languageStore.current, (newLang) => {
  locale.value = newLang
}, { immediate: true })
</script>

<style scoped>
.flag-icon {
  width: 20px;
  height: 14px;
  border-radius: 2px;
  object-fit: cover;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.dropdown-menu.show {
  display: block;
}
</style>
