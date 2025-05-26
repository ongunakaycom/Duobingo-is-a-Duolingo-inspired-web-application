/* eslint-env browser */

import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue'; // 👈 Import the Dashboard component

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',       // 👈 Add this route
    name: 'Dashboard',
    component: Dashboard
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
