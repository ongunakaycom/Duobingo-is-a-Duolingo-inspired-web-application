import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Import external locale files
import en from './locales/en.json';
import es from './locales/es.json';

// Setup i18n instance
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es
  }
});

// Create and mount app
const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
