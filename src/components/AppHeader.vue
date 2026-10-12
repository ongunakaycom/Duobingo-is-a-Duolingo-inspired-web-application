<template>
  <header class="app-header">
    <div class="app-header__inner">
      <!-- Logo centered -->
      <a
        class="app-header__logo"
        href="#"
        @click.prevent="handleLogoClick"
        aria-label="Duobingo home"
      >
        <img src="@/assets/duobingo.png" alt="Duobingo" />
      </a>
    </div>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isAuthenticated = !!localStorage.getItem('token');

function handleLogoClick() {
  if (isAuthenticated && route.path !== '/dashboard') {
    router.push('/dashboard');
  } else if (!isAuthenticated && route.path !== '/') {
    router.push('/');
  }
}
</script>

<style scoped>
/* =============================
 * Header shell
 * ============================= */
.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-border-light, #F0F0F0);
  width: 100%;
  /* No overflow — drop it so future dropdowns don't get clipped */
}

.app-header__inner {
  display: flex;
  align-items: center;
  justify-content: center;              /* ← center logo horizontally */
  padding: var(--space-4, 16px) var(--space-5, 20px);
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  width: 100%;
}

/* =============================
 * Logo
 * ============================= */
.app-header__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  line-height: 0;
}

.app-header__logo img {
  height: 44px;
  width: auto;
  display: block;
  object-fit: contain;
}

/* =============================
 * Mobile — compact
 * ============================= */
@media (max-width: 480px) {
  .app-header__inner {
    padding: var(--space-3, 12px) var(--space-4, 16px);
  }

  .app-header__logo img {
    height: 36px;
  }
}
</style>