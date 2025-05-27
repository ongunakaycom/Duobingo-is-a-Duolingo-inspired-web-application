<template>
  <div class="language-dropdown">
    <button
      class="dropdown-toggle"
      type="button"
      id="languageDropdown"
      aria-expanded="false"
      @click="toggleDropdown"
      @blur="closeDropdown"
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
        @mouseenter="keepOpen = true"
        @mouseleave="keepOpen = false"
      >
        <li v-for="lang in languages" :key="lang.code">
          <button
            class="dropdown-item"
            :class="{ active: currentLang === lang.code }"
            @click="changeLanguage(lang.code)"
            @mousedown.prevent
          >
            <img :src="lang.flag" :alt="lang.label" class="flag-icon" />
            <span class="language-text">{{ lang.label }}</span>
            <span class="checkmark" v-if="currentLang === lang.code">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useLanguageStore } from '@/store/language';

const { locale } = useI18n();
const languageStore = useLanguageStore();
const isOpen = ref(false);
const keepOpen = ref(false);

watch(
  () => languageStore.current,
  (newLang) => {
    locale.value = newLang;
  },
  { immediate: true }
);

const currentLang = computed(() => languageStore.current);

const languages = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/us.svg' },
  { code: 'es', label: 'Español', flag: 'https://flagcdn.com/es.svg' }
];

const currentFlag = computed(() => {
  return languages.find(l => l.code === currentLang.value)?.flag || '';
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  if (!keepOpen.value) {
    setTimeout(() => {
      isOpen.value = false;
    }, 200);
  }
};

const changeLanguage = (code) => {
  if (code !== currentLang.value) {
    languageStore.setLanguage(code);
  }
  isOpen.value = false;
};
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
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--text-color);
    font-weight: 500;
    min-width: 160px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.15);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }
  }

  .dropdown-chevron {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;
    margin-left: auto;

    &.rotate-180 {
      transform: rotate(180deg);
    }
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 200px;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 0.5rem 0;
    margin: 0;
    list-style: none;
    transform-origin: top right;
    z-index: 1000;

    li {
      margin: 0;
    }
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--text-color);
    position: relative;

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
      display: flex;
      align-items: center;

      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  .flag-icon {
    width: 24px;
    height: 16px;
    object-fit: cover;
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }

  .language-text {
    flex-grow: 1;
  }
}

/* Dropdown transition animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
  opacity: 1;
  transform: scale(1) translateY(0);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style>