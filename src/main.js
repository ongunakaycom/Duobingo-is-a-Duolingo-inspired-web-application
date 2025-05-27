import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';

// Import Bootstrap styles and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Define translations
const messages = {
  English: {
    site_language: 'Site Language',
    greeting: 'Hello'
  },
  Spanish: {
    site_language: 'Idioma del sitio',
    greeting: 'Hola'
  },
  Turkish: {
    site_language: 'Site Dili',
    greeting: 'Merhaba'
  }
};

// Setup i18n instance
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'English',
  fallbackLocale: 'English',
  messages
});

// Create and mount app
const app = createApp(App);
app.use(router);
app.use(i18n);
app.m
