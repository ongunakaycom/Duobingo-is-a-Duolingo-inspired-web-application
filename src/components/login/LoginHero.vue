<template>
  <div class="login-hero">
    <!-- Mascot card with badges -->
    <div class="login-hero__card">
      <!-- Top row: badges -->
      <div class="login-hero__badges">
        <div class="login-hero__badge login-hero__badge--streak">
          <span class="login-hero__badge-emoji">🔥</span>
          <span>{{ streak }} DAY STREAK!</span>
        </div>
        <div class="login-hero__badge login-hero__badge--gems">
          <span class="login-hero__badge-emoji">💎</span>
          <span>+{{ gems }} GEMS</span>
        </div>
      </div>

      <!-- Mascot -->
      <img
        :src="mascotUrl"
        alt="DuoBingo mascot"
        class="login-hero__mascot"
      />

      <!-- Welcome tag -->
      <div class="login-hero__welcome-tag">
        <span class="login-hero__welcome-label">Welcome to DuoBingo!</span>
        <span class="login-hero__welcome-cta">START TODAY</span>
      </div>
    </div>

    <!-- Headline (Figma'ya göre) -->
    <h1 class="login-hero__title">
      Master a new language
      <span class="login-hero__title-accent">one bingo card at a time.</span>
    </h1>

    <p class="login-hero__subtitle">
      The bite-sized, gamified language adventure backed by cognitive spacing.
      Play speed rounds, fill daily tiles, and build genuine fluency with zero
      boredom.
    </p>
  </div>
</template>

<script setup>
import mascotImage from '@/assets/duo.png';

defineProps({
  streak: { type: Number, default: 7 },
  gems: { type: Number, default: 120 },
  mascotUrl: { type: String, default: mascotImage },
});
</script>

<style scoped>
.login-hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  text-align: left;
}

/* =============================
 * Mascot Card
 * ============================= */
.login-hero__card {
  position: relative;
  width: 100%;
  padding: var(--space-5);
  background: linear-gradient(180deg, #E8F6FF 0%, #F0FAFF 100%);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.login-hero__badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  flex-wrap: wrap;
}

.login-hero__mascot {
  width: 100%;
  max-width: 340px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 20px rgba(88, 204, 2, 0.2));
}

/* =============================
 * Badges
 * ============================= */
.login-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background-color: #ffffff;
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-black);
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  white-space: nowrap;
}

.login-hero__badge--streak {
  color: var(--color-warning);
}

.login-hero__badge--gems {
  color: var(--color-secondary);
}

.login-hero__badge-emoji {
  font-size: var(--font-size-base);
}

/* =============================
 * Welcome Tag
 * ============================= */
.login-hero__welcome-tag {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-2);
}

.login-hero__welcome-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.login-hero__welcome-cta {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-black);
  color: var(--color-secondary);
  letter-spacing: 0.5px;
}

/* =============================
 * Headline (Figma style)
 * ============================= */
.login-hero__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-black);
  color: var(--color-text);
  margin: 0;
  line-height: var(--line-height-tight);
  letter-spacing: -0.5px;
}

.login-hero__title-accent {
  color: var(--color-primary);
  display: block;
}

@media (min-width: 1024px) {
  .login-hero__title {
    font-size: var(--font-size-4xl);
  }
}

.login-hero__subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}
</style>