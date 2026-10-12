<template>
  <div class="login-hero">
    <div class="login-hero__card">
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

      <img
        :src="mascotUrl"
        alt="DuoBingo mascot"
        class="login-hero__mascot"
      />

      <div class="login-hero__welcome-tag">
        <span class="login-hero__welcome-label">Welcome to DuoBingo!</span>
        <span class="login-hero__welcome-cta">START TODAY</span>
      </div>
    </div>

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
/* =============================
 * Wrapper — centered column
 * ============================= */
.login-hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-6, 24px);
  text-align: left;
  width: 100%;
  max-width: 440px;                 /* ← centered max-width */
  margin: 0 auto;                   /* ← center horizontally */
}

/* =============================
 * Mascot Card
 * ============================= */
.login-hero__card {
  position: relative;
  width: 100%;
  padding: var(--space-5, 20px);
  background: linear-gradient(180deg, #E8F6FF 0%, #F0FAFF 100%);
  border-radius: var(--radius-xl, 24px);
  box-shadow: var(--shadow-card, 0 2px 8px rgba(0, 0, 0, 0.06));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4, 16px);
  overflow: hidden;
}

/* =============================
 * Badges — row layout
 * ============================= */
.login-hero__badges {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--space-2, 8px);
  width: 100%;
  flex-wrap: wrap;
}

.login-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1, 4px);
  padding: var(--space-2, 8px) var(--space-3, 12px);
  background-color: #ffffff;
  border-radius: var(--radius-pill, 999px);
  font-size: var(--font-size-xs, 12px);
  font-weight: var(--font-weight-black, 800);
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  white-space: nowrap;
}

.login-hero__badge--streak {
  color: var(--color-warning, #FF9600);
}

.login-hero__badge--gems {
  color: var(--color-secondary, #1CB0F6);
}

.login-hero__badge-emoji {
  font-size: var(--font-size-base, 16px);
  line-height: 1;
}

/* =============================
 * Mascot — compact
 * ============================= */
.login-hero__mascot {
  width: 100%;
  max-width: 180px;                 /* ← 260 → 180 */
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 20px rgba(88, 204, 2, 0.2));
  margin: var(--space-1, 4px) 0;
}

/* =============================
 * Welcome tag
 * ============================= */
.login-hero__welcome-tag {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1, 4px);
  margin-top: var(--space-1, 4px);
}

.login-hero__welcome-label {
  font-size: var(--font-size-xs, 12px);
  font-weight: var(--font-weight-bold, 700);
  color: var(--color-text-secondary, #777);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.login-hero__welcome-cta {
  font-size: var(--font-size-xs, 12px);
  font-weight: var(--font-weight-black, 800);
  color: var(--color-secondary, #1CB0F6);
  letter-spacing: 0.5px;
}

/* =============================
 * Headline + Subtitle (below the card)
 * ============================= */
.login-hero__title {
  font-size: var(--font-size-2xl, 24px);       /* ← 32 → 24 mobil */
  font-weight: var(--font-weight-black, 800);
  color: var(--color-text);
  margin: 0;
  line-height: var(--line-height-tight, 1.2);
  letter-spacing: -0.3px;
  text-align: center;                          /* ← center on mobile */
}

@media (min-width: 1024px) {
  .login-hero__title {
    font-size: var(--font-size-4xl, 40px);
    letter-spacing: -0.5px;
    text-align: left;                          /* ← left on desktop */
  }
}

.login-hero__title-accent {
  color: var(--color-primary, #58CC02);
  display: block;
}

.login-hero__subtitle {
  font-size: var(--font-size-base, 16px);
  color: var(--color-text-secondary, #777);
  line-height: var(--line-height-relaxed, 1.7);
  margin: 0;
  text-align: center;                          /* ← center on mobile */
}

@media (min-width: 1024px) {
  .login-hero__subtitle {
    text-align: left;                          /* ← left on desktop */
  }
}

/* =============================
 * Mobile — compact spacing
 * ============================= */
@media (max-width: 480px) {
  .login-hero {
    gap: var(--space-5, 20px);
  }

  .login-hero__card {
    padding: var(--space-4, 16px);
    border-radius: var(--radius-lg, 16px);
    gap: var(--space-3, 12px);
  }

  .login-hero__badge {
    font-size: 11px;
    padding: 5px 9px;
  }

  .login-hero__badge-emoji {
    font-size: 13px;
  }

  .login-hero__mascot {
    max-width: 160px;
  }

  .login-hero__title {
    font-size: 22px;
  }

  .login-hero__subtitle {
    font-size: 14px;
  }
}
</style>