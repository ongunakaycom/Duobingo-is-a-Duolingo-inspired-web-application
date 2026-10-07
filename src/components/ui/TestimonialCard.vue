<template>
  <div class="testimonial-card">
    <div class="testimonial-card__badge">
      <i class="bi bi-patch-check-fill"></i>
      {{ badgeText }}
    </div>

    <blockquote class="testimonial-card__quote">
      "{{ quote }}"
    </blockquote>

    <div class="testimonial-card__author">
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        :alt="authorName"
        class="testimonial-card__avatar"
      />
      <div
        v-else
        class="testimonial-card__avatar testimonial-card__avatar--placeholder"
      >
        {{ authorName.charAt(0) }}
      </div>

      <div class="testimonial-card__author-info">
        <div class="testimonial-card__author-name">{{ authorName }}</div>
        <div class="testimonial-card__author-title">{{ authorTitle }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  badgeText: {
    type: String,
    default: 'Trusted by 12M+ learners',
  },
  quote: {
    type: String,
    default:
      'I reached conversational French in just 90 days with DuoBingo’s daily speed tournaments. Traditional apps felt like chores; this feels like pure play.',
  },
  authorName: {
    type: String,
    default: 'Camille Despres',
  },
  authorTitle: {
    type: String,
    default: 'Level 24 DuoBingo Adventurer',
  },
  avatarUrl: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-8);
  background: linear-gradient(135deg, #58CC02 0%, #4CAF00 100%);
  border-radius: var(--radius-lg);
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

/* Decorative subtle pattern */
.testimonial-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.12) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.testimonial-card__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  align-self: flex-start;
}

.testimonial-card__badge i {
  font-size: var(--font-size-base);
}

.testimonial-card__quote {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-black);
  line-height: var(--line-height-tight);
  margin: 0;
  letter-spacing: -0.3px;
}

@media (min-width: 768px) {
  .testimonial-card__quote {
    font-size: var(--font-size-3xl);
  }
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-2);
}

.testimonial-card__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
}

.testimonial-card__avatar--placeholder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-black);
  color: #ffffff;
}

.testimonial-card__author-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-black);
  margin-bottom: var(--space-1);
}

.testimonial-card__author-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  opacity: 0.9;
}
</style>