// src/router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import Dashboard from './components/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('token');
      if (isAuthenticated) {
        next('/dashboard'); // redirect logged-in users away from Home
      } else {
        next(); // allow access to home if not logged in
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Global guard for protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
