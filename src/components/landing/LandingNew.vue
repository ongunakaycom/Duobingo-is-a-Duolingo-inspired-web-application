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
              :title="isLoginMode ? 'Welcome Back!' : 'Create Your Account'"
              :subtitle="
                isLoginMode
                  ? 'Login to continue your playful language quest and keep your streak alive.'
                  : 'Join DuoBingo and start mastering languages the fun way.'
              "
            />
          </div>

          <!-- Right: Form -->
          <div class="hero-grid__form">
            <LoginForm
              :loading="isLoading"
              :error="error"
              :initial-email="email"
              @submit="handleLogin"
              @signup="toggleMode"
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

      // Feature kartları
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
.landing-new {
  background-color: var(--color-bg);
  min-height: 100vh;
}

/* =============================
 * Hero Section
 * ============================= */
.hero-section {
  padding: var(--space-8) 0;
}

@media (min-width: 1024px) {
  .hero-section {
    padding: var(--space-16) 0;
  }
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
  }
}

.hero-grid__form {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-card);
}

@media (min-width: 1024px) {
  .hero-grid__form {
    padding: var(--space-10);
  }
}

/* =============================
 * Sections
 * ============================= */
.section {
  padding: var(--space-8) 0;
}

@media (min-width: 1024px) {
  .section {
    padding: var(--space-12) 0;
  }
}

/* =============================
 * Features
 * ============================= */
.features-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto var(--space-10);
}

.features-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: rgba(88, 204, 2, 0.1);
  color: var(--color-primary);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: var(--space-4);
}

.features-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-black);
  color: var(--color-text);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-tight);
}

@media (min-width: 1024px) {
  .features-title {
    font-size: var(--font-size-4xl);
  }
}

.features-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>