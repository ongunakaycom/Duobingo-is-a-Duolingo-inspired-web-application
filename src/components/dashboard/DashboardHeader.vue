<template>
  <header class="dashboard-header">
    <div class="container-tight dashboard-header__inner">
      <!-- Logo -->
      <router-link to="/lessons" class="dashboard-header__logo">
        <img src="@/assets/duobingo.png" alt="DuoBingo" />
      </router-link>

      <!-- Nav -->
      <nav class="dashboard-header__nav">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="item.href"
          class="dashboard-header__nav-link"
          :class="{ 'is-active': item.active }"
          @click.prevent
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Right: Stats + Profile -->
      <div class="dashboard-header__right">
        <!-- Streak -->
        <div class="dashboard-header__stat">
          <span class="dashboard-header__stat-icon">🔥</span>
          <span class="dashboard-header__stat-value">{{ streak }}</span>
        </div>

        <!-- Gems -->
        <div class="dashboard-header__stat">
          <span class="dashboard-header__stat-icon">💎</span>
          <span class="dashboard-header__stat-value">{{ gems }}</span>
        </div>

        <!-- Hearts -->
        <div class="dashboard-header__stat">
          <span class="dashboard-header__stat-icon">❤️</span>
          <span class="dashboard-header__stat-value">{{ hearts }}</span>
        </div>

        <!-- Profile -->
        <button
          class="dashboard-header__profile"
          @click="$emit('profile')"
          aria-label="Profile"
        >
          <span class="dashboard-header__profile-initial">
            {{ userInitial }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  streak: { type: Number, default: 7 },
  gems: { type: Number, default: 120 },
  hearts: { type: Number, default: 5 },
  userName: { type: String, default: 'Alex' },
  activeNav: { type: String, default: 'learn' },
});

defineEmits(['profile']);

const navItems = computed(() => [
  { id: 'learn', label: 'Learn', href: '#', active: props.activeNav === 'learn' },
  { id: 'bingo-arena', label: 'Bingo Arena', href: '#' },
  { id: 'leaderboards', label: 'Leaderboards', href: '#' },
  { id: 'quests', label: 'Quests', href: '#' },
  { id: 'shop', label: 'Shop', href: '#' },
]);

const userInitial = computed(() => props.userName.charAt(0).toUpperCase());
</script>

<style scoped>
.dashboard-header {
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-border-light);
  position: sticky;
  top: 0;
  z-index: 100;
}

.dashboard-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding-top: var(--space-3);
  padding-bottom: var(--space-3);
}

/* Logo */
.dashboard-header__logo {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}

.dashboard-header__logo img {
  height: 40px;
  width: auto;
  display: block;
}

/* Nav */
.dashboard-header__nav {
  display: none;
  align-items: center;
  gap: var(--space-1);
  flex: 1;
  justify-content: center;
}

@media (min-width: 768px) {
  .dashboard-header__nav {
    display: flex;
  }
}

.dashboard-header__nav-link {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-black);
  color: var(--color-text);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  transition: background-color var(--transition-fast);
  white-space: nowrap;
}

.dashboard-header__nav-link:hover {
  background-color: rgba(88, 204, 2, 0.1);
}

.dashboard-header__nav-link.is-active {
  background-color: var(--color-primary);
  color: #ffffff;
}

/* Right side */
.dashboard-header__right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}

.dashboard-header__stat {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-family);
  font-weight: var(--font-weight-black);
  font-size: var(--font-size-sm);
  color: var(--color-text);
}

.dashboard-header__stat-icon {
  font-size: var(--font-size-lg);
  line-height: 1;
}

.dashboard-header__profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-black);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast);
}

.dashboard-header__profile:hover {
  transform: scale(1.05);
}
</style>