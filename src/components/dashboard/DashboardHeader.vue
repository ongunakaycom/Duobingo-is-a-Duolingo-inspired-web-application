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

        <!-- Profile Dropdown -->
        <div class="dashboard-header__profile-wrapper" ref="profileWrapper">
          <button
            class="dashboard-header__profile"
            @click.stop="toggleProfileMenu"
            aria-label="Profile menu"
            :aria-expanded="isProfileMenuOpen"
          >
            <span class="dashboard-header__profile-initial">
              {{ userInitial }}
            </span>
          </button>

          <transition name="dropdown-fade">
            <div v-if="isProfileMenuOpen" class="profile-dropdown">
              <div class="profile-dropdown__header">
                <div class="profile-dropdown__avatar">
                  {{ userInitial }}
                </div>
                <div class="profile-dropdown__info">
                  <div class="profile-dropdown__name">{{ userName }}</div>
                  <div class="profile-dropdown__email">{{ userEmail }}</div>
                </div>
              </div>

              <div class="profile-dropdown__divider"></div>

              <button
                v-for="item in menuItems"
                :key="item.id"
                class="profile-dropdown__item"
                :class="{ 'profile-dropdown__item--danger': item.danger }"
                @click="handleMenuAction(item.id)"
              >
                <span class="profile-dropdown__item-icon">{{ item.icon }}</span>
                <span class="profile-dropdown__item-label">{{ item.label }}</span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  streak: { type: Number, default: 7 },
  gems: { type: Number, default: 120 },
  hearts: { type: Number, default: 5 },
  userName: { type: String, default: 'Alex' },
  userEmail: { type: String, default: 'alex@duobingo.app' },
  activeNav: { type: String, default: 'learn' },
});

const emit = defineEmits(['profile', 'settings', 'change-password', 'logout']);

const isProfileMenuOpen = ref(false);
const profileWrapper = ref(null);

const navItems = computed(() => [
  { id: 'learn', label: 'Learn', href: '#', active: props.activeNav === 'learn' },
  { id: 'bingo-arena', label: 'Bingo Arena', href: '#' },
  { id: 'leaderboards', label: 'Leaderboards', href: '#' },
  { id: 'quests', label: 'Quests', href: '#' },
  { id: 'shop', label: 'Shop', href: '#' },
]);

const menuItems = [
  { id: 'profile', icon: '👤', label: 'Profile' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
  { id: 'change-password', icon: '🔒', label: 'Change Password' },
  { id: 'logout', icon: '🚪', label: 'Log Out', danger: true },
];

const userInitial = computed(() => props.userName.charAt(0).toUpperCase());

function toggleProfileMenu() {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
}

function closeProfileMenu() {
  isProfileMenuOpen.value = false;
}

function handleMenuAction(actionId) {
  closeProfileMenu();
  emit(actionId);
}

function handleClickOutside(event) {
  if (profileWrapper.value && !profileWrapper.value.contains(event.target)) {
    closeProfileMenu();
  }
}

function handleEsc(event) {
  if (event.key === 'Escape') {
    closeProfileMenu();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEsc);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEsc);
});
</script>

<style scoped>
.dashboard-header {
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-border-light);
  position: sticky;
  top: 0;
  z-index: 1000;                    /* ← 100 → 1000 */
}

.dashboard-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding-top: var(--space-3);
  padding-bottom: var(--space-3);
}

/* New Logo */
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

/* Profile */
.dashboard-header__profile-wrapper {
  position: relative;
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

/* Dropdown new */
.profile-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 240px;
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 1001;                    /* ← 200 → 1001 */
}

.profile-dropdown__header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
}

.profile-dropdown__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: #ffffff;
  font-family: var(--font-family);
  font-weight: var(--font-weight-black);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile-dropdown__info {
  min-width: 0;
  flex: 1;
}

.profile-dropdown__name {
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-black);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-dropdown__email {
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-dropdown__divider {
  height: 1px;
  background-color: var(--color-border-light);
}

.profile-dropdown__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  text-align: left;
  transition: background-color var(--transition-fast);
}

.profile-dropdown__item:hover {
  background-color: rgba(88, 204, 2, 0.08);
}

.profile-dropdown__item--danger {
  color: var(--color-error);
}

.profile-dropdown__item--danger:hover {
  background-color: rgba(255, 75, 75, 0.08);
}

.profile-dropdown__item-icon {
  font-size: var(--font-size-base);
  line-height: 1;
  flex-shrink: 0;
}

.profile-dropdown__item-label {
  flex: 1;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>