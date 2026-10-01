import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  // ✅ İkonlar için

import { BootstrapVue3, BToastPlugin } from 'bootstrap-vue-3';

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

app.use(BootstrapVue3);
app.use(BToastPlugin);   // ✅ Kaldı

app.component('LanguageDropdown', LanguageDropdown);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');