// stores/language.js
import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    current: localStorage.getItem('lang') || 'en'
  }),
  actions: {
    setLanguage(lang) {
      this.current = lang;
      localStorage.setItem('lang', lang);
    }
  }
});
