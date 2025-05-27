import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // ✅ import Pinia
import { createI18n } from 'vue-i18n';

import 'bootstrap'; // Bootstrap JS
import 'bootstrap/dist/css/bootstrap.min.css';

// Locale files
import en from './locales/en.json';
import es from './locales/es.json';

// Setup i18n
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: { en, es }
});

const app = createApp(App);

const pinia = createPinia(); // ✅ create Pinia instance

// Apply plugins
app.use(pinia); // ✅ use Pinia
app.use(router);
app.use(i18n);

app.mount('#app');
