import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import LanguageDropdown from '@/components/LanguageSelection.vue';



// Locale messages
import en from './locales/en.json';
import es from './locales/es.json';

// Setup i18n
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: { en, es },
});

// Create Vue app
const app = createApp(App);

// Register global components
app.component('LanguageDropdown', LanguageDropdown);

// Use plugins
app.use(createPinia());
app.use(router);
app.use(i18n);

// Mount the app
app.mount('#app');
