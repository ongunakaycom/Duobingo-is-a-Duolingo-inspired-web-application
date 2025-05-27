<template>
  <div class="language-dropdown">
    <button
      class="dropdown-toggle"
      @click="toggleDropdown"
      @blur="handleBlur"
    >
      <img :src="currentFlag" alt="Flag" class="flag-icon" />
      <span class="language-label">{{ $t('site_language') }}: {{ currentLang.toUpperCase() }}</span>
      <svg class="dropdown-chevron" :class="{ 'rotate-180': isOpen }" viewBox="0 0 20 20">
        <path fill="currentColor" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
      </svg>
    </button>

    <transition name="dropdown">
      <ul
        v-show="isOpen"
        class="dropdown-menu"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <li v-for="lang in languages" :key="lang.code">
          <button
            class="dropdown-item"
            :class="{ active: currentLang === lang.code }"
            @click="changeLanguage(lang.code)"
          >
            <img :src="lang.flag" :alt="lang.label" class="flag-icon" />
            <span class="language-text">{{ lang.label }}</span>
            <span class="checkmark" v-if="currentLang === lang.code">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
            </span>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/store/language'

const { locale } = useI18n()
const languageStore = useLanguageStore()

const isOpen = ref(false)
const hovering = ref(false)

const languages = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/us.svg' },
  { code: 'es', label: 'Español', flag: 'https://flagcdn.com/es.svg' }
]

const currentLang = computed(() => languageStore.current)
const currentFlag = computed(() => languages.find(l => l.code === currentLang.value)?.flag || '')

const toggleDropdown = () => (isOpen.value = !isOpen.value)

const handleBlur = () => {
  setTimeout(() => {
    if (!hovering.value) isOpen.value = false
  }, 150)
}

const changeLanguage = (code) => {
  if (code !== currentLang.value) {
    languageStore.setLanguage(code)
  }
  isOpen.value = false
}

watch(() => languageStore.current, (newLang) => {
  locale.value = newLang
}, { immediate: true })
</script>

<style scoped lang="scss">
.language-dropdown {
  position: relative;
  display: inline-block;
  z-index: 1000;

  .dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    background-color: transparent;
    cursor: pointer;
    color: var(--text-color);
    font-weight: 500;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &:focus {
      outline: none;
    }
  }

  .dropdown-chevron {
    width: 1rem;
    height: 1rem;
    margin-left: auto;
    transition: transform 0.2s ease;

    &.rotate-180 {
      transform: rotate(180deg);
    }
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 200px;
    padding: 0.5rem 0;
    list-style: none;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    width: 100%;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &.active {
      font-weight: 600;
      background-color: rgba(0, 0, 0, 0.03);
    }

    .checkmark {
      margin-left: auto;
      color: var(--primary-color);
    }
  }

  .flag-icon {
    width: 24px;
    height: 16px;
    object-fit: cover;
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
}

/* Transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style>
