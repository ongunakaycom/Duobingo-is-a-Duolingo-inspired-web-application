// src/router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import Lessons from './components/Lessons.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('token');
      if (isAuthenticated) {
        next('/lessons'); // ✅ Login olduysa /lessons'a git
      } else {
        next();
      }
    },
  },
  {
    path: '/dashboard',
    redirect: '/lessons', // ✅ /dashboard artık /lessons'a yönlendirir
  },
  {
    path: '/lessons',
    name: 'Lessons',
    component: Lessons,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Global auth guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;