<template>
  <div class="stats-bar">
    <div v-for="(stat, i) in stats" :key="i" class="stats-bar__item">
      <div class="stats-bar__value">{{ stat.value }}</div>
      <div class="stats-bar__label">{{ stat.label }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    default: () => [
      { value: '12M+', label: 'Active Bingo Learners' },
      { value: '98%', label: 'Lesson Completion Rate' },
      { value: '4.9★', label: 'Over 240K Ratings' },
      { value: '300M+', label: 'Bingo Words Mastered' },
    ],
  },
});
</script>

<style scoped>
/* =============================
 * Container — responsive grid
 * ============================= */
.stats-bar {
  display: grid;
  grid-template-columns: 1fr;                /* ← mobile: single column */
  gap: var(--space-5, 20px);
  padding: var(--space-5, 20px);
  background-color: var(--color-bg-card, #ffffff);
  border: 1px solid var(--color-border-light, #f0f0f0);
  border-radius: var(--radius-lg, 16px);
}

/* Tablet: 2 columns */
@media (min-width: 640px) {
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6, 24px);
    padding: var(--space-8, 32px);
  }
}

/* Desktop: 4 columns */
@media (min-width: 1024px) {
  .stats-bar {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-8, 32px);
    padding: var(--space-10, 40px);
  }
}

/* =============================
 * Item
 * ============================= */
.stats-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--space-1, 4px);
  position: relative;
  padding: var(--space-2, 8px) 0;
}

/* =============================
 * Value
 * ============================= */
.stats-bar__value {
  font-size: var(--font-size-3xl, 32px);
  font-weight: var(--font-weight-black, 800);
  color: var(--color-primary, #58CC02);
  line-height: 1;
  letter-spacing: -0.5px;
}

@media (min-width: 640px) {
  .stats-bar__value {
    font-size: var(--font-size-4xl, 40px);
  }
}

/* =============================
 * Label
 * ============================= */
.stats-bar__label {
  font-size: var(--font-size-xs, 12px);
  font-weight: var(--font-weight-bold, 700);
  color: var(--color-text-secondary, #777);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  line-height: 1.3;
  max-width: 180px;
  margin: var(--space-2, 8px) auto 0;
}

/* =============================
 * Vertical dividers — desktop only
 * ============================= */
@media (min-width: 1024px) {
  .stats-bar__item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: calc(var(--space-8, 32px) / -2 - 1px);
    top: 20%;
    bottom: 20%;
    width: 1px;
    background-color: var(--color-border-light, #f0f0f0);
  }
}
</style>