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
.feature-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6);
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-primary);
}

.feature-card__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-black);
  color: var(--color-text);
  line-height: var(--line-height-tight);
  margin: 0;
}

.feature-card__description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
  flex: 1;
}

.feature-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-secondary);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: gap var(--transition-fast);
}

.feature-card__link:hover {
  gap: var(--space-3);
}

.feature-card__link i {
  font-size: var(--font-size-base);
}
</style>