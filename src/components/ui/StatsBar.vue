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
.stats-bar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  padding: var(--space-6);
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}

@media (min-width: 768px) {
  .stats-bar {
    grid-template-columns: repeat(4, 1fr);
    padding: var(--space-8);
  }
}

.stats-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-1);
  position: relative;
}

/* Vertical divider between items on desktop */
@media (min-width: 768px) {
  .stats-bar__item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: calc(var(--space-6) / -2 - 1px);
    top: 20%;
    bottom: 20%;
    width: 1px;
    background-color: var(--color-border-light);
  }
}

.stats-bar__value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-black);
  color: var(--color-primary);
  line-height: 1;
  letter-spacing: -0.5px;
}

.stats-bar__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-top: var(--space-2);
}
</style>