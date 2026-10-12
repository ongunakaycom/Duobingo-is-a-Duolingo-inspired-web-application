<template>
  <div class="feature-card">
    <IconBadge :icon="icon" :color="color" size="md" />

    <h3 class="feature-card__title">{{ title }}</h3>
    <p class="feature-card__description">{{ description }}</p>

    <a v-if="linkText" href="#" class="feature-card__link" @click.prevent>
      {{ linkText }}
      <i class="bi bi-arrow-right"></i>
    </a>
  </div>
</template>

<script setup>
import IconBadge from './IconBadge.vue';

defineProps({
  icon: { type: String, required: true },
  color: { type: String, default: 'green' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  linkText: { type: String, default: '' },
});
</script>

<style scoped>
/* =============================
 * Card — centered column
 * ============================= */
.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;              /* ← center horizontally */
  text-align: center;               /* ← center text */
  gap: var(--space-4, 16px);
  padding: var(--space-6, 24px);
  background-color: var(--color-bg-card, #ffffff);
  border: 1px solid var(--color-border-light, #f0f0f0);
  border-radius: var(--radius-lg, 16px);
  transition: transform var(--transition-base, 0.2s ease),
              box-shadow var(--transition-base, 0.2s ease),
              border-color var(--transition-base, 0.2s ease);
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover, 0 8px 24px rgba(0, 0, 0, 0.12));
  border-color: var(--color-primary);
}

/* =============================
 * Title
 * ============================= */
.feature-card__title {
  font-size: var(--font-size-xl, 20px);
  font-weight: var(--font-weight-black, 800);
  color: var(--color-text);
  line-height: var(--line-height-tight, 1.2);
  margin: 0;
  text-align: center;
}

/* =============================
 * Description
 * ============================= */
.feature-card__description {
  font-size: var(--font-size-base, 16px);
  color: var(--color-text-secondary, #777);
  line-height: var(--line-height-relaxed, 1.7);
  margin: 0;
  text-align: center;
  max-width: 320px;                 /* keeps long lines readable */
  flex: 1;                          /* fills space before link */
}

/* =============================
 * Link — centered with animated arrow
 * ============================= */
.feature-card__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1, 4px);
  margin: var(--space-2, 8px) auto 0;   /* centered below text */
  font-size: var(--font-size-sm, 14px);
  font-weight: var(--font-weight-black, 800);
  color: var(--color-secondary, #1CB0F6);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: gap var(--transition-fast, 0.1s ease),
              color var(--transition-fast, 0.1s ease);
}

.feature-card__link:hover {
  gap: var(--space-2, 8px);
  color: var(--color-secondary-dark, #1899D6);
}

.feature-card__link i {
  font-size: var(--font-size-base, 16px);
  transition: transform var(--transition-fast, 0.1s ease);
}

.feature-card__link:hover i {
  transform: translateX(2px);
}

/* =============================
 * Mobile — tighter
 * ============================= */
@media (max-width: 480px) {
  .feature-card {
    padding: var(--space-5, 20px);
    gap: var(--space-3, 12px);
  }

  .feature-card__title {
    font-size: 18px;
  }

  .feature-card__description {
    font-size: 14px;
    max-width: 100%;
  }

  .feature-card__link {
    font-size: 12px;
  }
}
</style>