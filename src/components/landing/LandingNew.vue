<template>
  <div class="landing-new">
    <!-- =============================
     * HERO + LOGIN FORM
     * ============================= -->
    <section class="hero-section">
      <div class="container-tight">
        <div class="hero-grid">
          <!-- Left: Hero (mascot + streak + gems) -->
          <div class="hero-grid__hero">
            <LoginHero
              :streak="7"
              :gems="120"
              :is-login-mode="isLoginMode"
            />
          </div>

          <!-- Right: Form -->
          <div class="hero-grid__form">
            <LoginForm
              :loading="isLoading"
              :error="error"
              :initial-email="email"
              :is-login-mode="isLoginMode"
              @submit="handleLogin"
              @toggle-mode="toggleMode"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- =============================
     * STATS
     * ============================= -->
    <section class="section">
      <div class="container-tight">
        <StatsBar />
      </div>
    </section>

    <!-- =============================
     * FEATURES
     * ============================= -->
    <section class="section">
      <div class="container-tight">
        <div class="features-header">
          <span class="features-eyebrow">
            <i class="bi bi-fire"></i>
            Why learners love DuoBingo
          </span>
          <h2 class="features-title">
            Supercharged learning through play
          </h2>
          <p class="features-subtitle">
            Explore the core tactics that transform repetitive vocabulary
            drilling into a daily addictive celebration.
          </p>
        </div>

        <div class="features-grid">
          <FeatureCard
            v-for="(feature, i) in features"
            :key="i"
            :icon="feature.icon"
            :color="feature.color"
            :title="feature.title"
            :description="feature.description"
            :link-text="feature.linkText"
          />
        </div>
      </div>
    </section>

    <!-- =============================
     * TESTIMONIAL
     * ============================= -->
    <section class="section">
      <div class="container-tight">
        <TestimonialCard
          badge-text="Trusted by 12M+ learners"
          quote="I reached conversational French in just 90 days with DuoBingo's daily speed tournaments. Traditional apps felt like chores; this feels like pure play."
          author-name="Camille Despres"
          author-title="Level 24 DuoBingo Adventurer"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { login, signUp } from '@/axios';

import LoginHero from '@/components/login/LoginHero.vue';
import LoginForm from '@/components/login/LoginForm.vue';
import StatsBar from '@/components/ui/StatsBar.vue';
import FeatureCard from '@/components/ui/FeatureCard.vue';
import TestimonialCard from '@/components/ui/TestimonialCard.vue';

export default {
  name: 'LandingNew',
  components: {
    LoginHero,
    LoginForm,
    StatsBar,
    FeatureCard,
    TestimonialCard,
  },

  data() {
    return {
      email: '',
      isLoginMode: true,
      isLoading: false,
      error: '',

      // Feature cards
      features: [
        {
          icon: 'controller',
          color: 'green',
          title: 'Gamified & Addictive',
          description:
            'Turn rote vocabulary lists into dynamic 4×4 Bingo matrices. Form rows, diagonals, and speed combos to unlock secret loot boxes and XP multipliers.',
          linkText: 'Explore game modes',
        },
        {
          icon: 'fire',
          color: 'orange',
          title: 'Daily Goals & Streaks',
          description:
            'Never break the chain. Protect your streak with ice shields, double-or-nothing weekend bets, and personalized morning reminder pings.',
          linkText: 'Check streak perks',
        },
        {
          icon: 'globe2',
          color: 'blue',
          title: 'Over 30 Languages',
          description:
            'From Spanish and Japanese to high-demand business German and conversational Mandarin. Switch between multiple tongues anytime with one login.',
          linkText: 'Browse full catalog',
        },
        {
          icon: 'lightning-charge',
          color: 'purple',
          title: 'Adaptive Spaced Memory',
          description:
            'Our intelligent engine surfaces words precisely when your synaptic recall is about to fade, ensuring long-term retention in minimum practice time.',
          linkText: 'The science method',
        },
        {
          icon: 'book',
          color: 'green',
          title: '100% Free Core Lessons',
          description:
            'Zero paywalls on foundational grammar, phonetics, and dialogue packs. High-quality education accessible to curious humans worldwide.',
          linkText: 'Our education mission',
        },
        {
          icon: 'clock',
          color: 'blue',
          title: 'Micro-Sessions (<5 Mins)',
          description:
            'Crafted for subway rides, coffee queues, and five-minute study breaks. Complete one card, earn points, and go about your day feeling energized.',
          linkText: 'Fast match engine',
        },
      ],
    };
  },

  methods: {
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
      this.error = '';
    },

    async handleLogin({ email, password }) {
      this.isLoading = true;
      this.error = '';

      try {
        const fn = this.isLoginMode ? login : signUp;
        const { token } = await fn(email, password);

        if (token) {
          localStorage.setItem('token', token);
          setTimeout(() => {
            this.$router.push('/lessons');
          }, 800);
        }
      } catch (err) {
        this.error =
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          'Authentication failed';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* =============================
 * Wrapper — overflow safety
 * ============================= */
.landing-new {
  background-color: var(--color-bg);
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

/* =============================
 * Hero Section — centered
 * ============================= */
.hero-section {
  padding: var(--space-6, 24px) 0;
  display: flex;
  justify-content: center;
  width: 100%;
}

@media (min-width: 1024px) {
  .hero-section {
    padding: var(--space-12, 48px) 0;
  }
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6, 24px);
  align-items: start;
  justify-items: center;
  width: 100%;
  max-width: 900px;                 /* ← grid container */
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10, 40px);
    align-items: stretch;
    max-width: 1000px;
  }
}

/* Critical: allow grid children to shrink below their content size */
.hero-grid > * {
  min-width: 0;
  max-width: 100%;
}

.hero-grid__hero {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 440px;                 /* ← max card width */
  min-width: 0;
  margin: 0 auto;
}

.hero-grid__form {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-xl, 24px);
  padding: var(--space-5, 20px);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 440px;                 /* ← max card width */
  min-width: 0;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .hero-grid__form {
    padding: var(--space-8, 32px);
  }
}

/* =============================
 * Sections
 * ============================= */
.section {
  padding: var(--space-6, 24px) 0;
}

@media (min-width: 1024px) {
  .section {
    padding: var(--space-12, 48px) 0;
  }
}

/* =============================
 * Features
 * ============================= */
.features-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto var(--space-8, 32px);
  padding: 0 var(--space-2, 8px);
}

.features-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 8px);
  padding: var(--space-2, 8px) var(--space-4, 16px);
  background-color: rgba(88, 204, 2, 0.1);
  color: var(--color-primary);
  border-radius: var(--radius-pill, 999px);
  font-size: var(--font-size-xs, 12px);
  font-weight: var(--font-weight-black, 800);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: var(--space-4, 16px);
}

.features-title {
  font-size: var(--font-size-2xl, 24px);
  font-weight: var(--font-weight-black, 800);
  color: var(--color-text);
  margin-bottom: var(--space-3, 12px);
  line-height: var(--line-height-tight, 1.2);
  overflow-wrap: break-word;
}

@media (min-width: 768px) {
  .features-title {
    font-size: var(--font-size-3xl, 32px);
  }
}

@media (min-width: 1024px) {
  .features-title {
    font-size: var(--font-size-4xl, 40px);
  }
}

.features-subtitle {
  font-size: var(--font-size-base, 16px);
  color: var(--color-text-secondary, #777);
  line-height: var(--line-height-relaxed, 1.7);
  margin: 0;
  overflow-wrap: break-word;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5, 20px);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.features-grid > * {
  min-width: 0;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6, 24px);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6, 24px);
  }
}

/* =============================
 * Mobile Safety Net
 * ============================= */
@media (max-width: 480px) {
  .hero-section {
    padding: var(--space-4, 16px) 0;
  }

  .section {
    padding: var(--space-5, 20px) 0;
  }

  .hero-grid {
    gap: var(--space-5, 20px);
  }

  .hero-grid__hero,
  .hero-grid__form {
    max-width: 100%;
  }

  .hero-grid__form {
    padding: var(--space-4, 16px);
    border-radius: var(--radius-lg, 16px);
  }

  .features-header {
    padding: 0 var(--space-3, 12px);
    margin-bottom: var(--space-6, 24px);
  }

  .features-title {
    font-size: 22px;
  }

  .features-subtitle {
    font-size: 14px;
  }
}
</style>