import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

import './assets/tokens.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import LanguageDropdown from '@/components/LanguageSelection.vue';

import en from './locales/en.json';
import es from './locales/es.json';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: { en, es },
});

const app = createApp(App);

app.component('LanguageDropdown', LanguageDropdown);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');