<template>
  <div class="language-dropdown" @keydown.esc="isOpen = false">
    <button
      class="dropdown-toggle"
      @click="toggleDropdown"
      @blur="onBlur"
      :aria-expanded="isOpen.toString()"
      aria-haspopup="listbox"
    >
      <img :src="currentFlag" alt="Flag" class="flag-icon" />
      <span class="language-label">{{ $t('site_language') }}: {{ currentLang.toUpperCase() }}</span>
      <svg class="dropdown-chevron" :class="{ 'rotate-180': isOpen }" viewBox="0 0 20 20">
        <path fill="currentColor"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
      </svg>
    </button>

    <transition name="fade">
      <ul
        v-show="isOpen"
        class="dropdown-menu"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
        role="listbox"
      >
        <li v-for="lang in languages" :key="lang.code" role="option">
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

const toggleDropdown = () => isOpen.value = !isOpen.value

const onBlur = () => {
  setTimeout(() => {
    if (!hovering.value) isOpen.value = false
  }, 100)
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

  .dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    color: var(--text-color);

    &:hover {
      background-color: #f5f5f5;
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
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0;
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
      background-color: #f0f0f0;
    }

    &.active {
      font-weight: 600;
      background-color: #e8e8e8;
    }

    .checkmark {
      margin-left: auto;
      color: var(--primary-color);
    }
  }

  .flag-icon {
    width: 24px;
    height: 16px;
    border-radius: 2px;
    object-fit: cover;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
