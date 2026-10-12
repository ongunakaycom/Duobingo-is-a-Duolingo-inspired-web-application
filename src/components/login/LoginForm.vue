<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <!-- Email -->
    <div class="login-form__field">
      <label for="login-email" class="login-form__label">
        Email or Username
      </label>
      <div class="login-form__input-wrap">
        <i class="bi bi-envelope login-form__icon"></i>
        <input
          id="login-email"
          v-model="email"
          type="email"
          class="login-form__input"
          placeholder="alex.learner@duobingo.app"
          autocomplete="email"
          required
        />
      </div>
    </div>

    <!-- Password -->
    <div class="login-form__field">
      <div class="login-form__label-row">
        <label for="login-password" class="login-form__label">
          Password
        </label>
        <a href="#" class="login-form__forgot" @click.prevent>
          Forgot?
        </a>
      </div>
      <div class="login-form__input-wrap">
        <i class="bi bi-lock login-form__icon"></i>
        <input
          id="login-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="login-form__input"
          placeholder="DuoBingoSecret2025"
          autocomplete="current-password"
          required
        />
        <button
          type="button"
          class="login-form__toggle-password"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          @click="showPassword = !showPassword"
        >
          <i :class="['bi', showPassword ? 'bi-eye-slash' : 'bi-eye']"></i>
        </button>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="login-form__error">
      {{ error }}
    </div>

    <!-- Submit -->
    <TactileButton
      type="submit"
      variant="primary"
      size="lg"
      block
      :disabled="loading"
    >
      {{ loading
          ? (isLoginMode ? 'Logging in...' : 'Creating account...')
          : (isLoginMode ? 'Login' : 'Create Account') }}
    </TactileButton>

    <!-- Secondary -->
    <TactileButton
      type="button"
      variant="ghost"
      size="lg"
      block
      @click="$emit('toggle-mode')"
    >
      {{ isLoginMode ? "I don't have an account" : 'I already have an account' }}
    </TactileButton>

    <!-- Terms -->
    <p class="login-form__terms">
      By signing in, you agree to DuoBingo's
      <a href="#" @click.prevent>Terms</a> &
      <a href="#" @click.prevent>Privacy</a>.
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import TactileButton from '@/components/ui/TactileButton.vue';

const props = defineProps({
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  initialEmail: { type: String, default: '' },
  isLoginMode: { type: Boolean, default: true },
});

const emit = defineEmits(['submit', 'toggle-mode']);

const email = ref(props.initialEmail);
const password = ref('');
const showPassword = ref(false);

function handleSubmit() {
  emit('submit', { email: email.value, password: password.value });
}
</script>

<style scoped>
/* =============================
 * Form shell
 * ============================= */
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5, 20px);
  width: 100%;
  padding: var(--space-4, 16px) 0;
}

.login-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-3, 12px);
}

.login-form__label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* =============================
 * Labels
 * ============================= */
.login-form__label {
  font-size: var(--font-size-base, 16px);
  font-weight: var(--font-weight-black, 800);
  color: var(--color-text);
  letter-spacing: 0.3px;
  margin-bottom: var(--space-1, 4px);
}

.login-form__forgot {
  font-size: var(--font-size-sm, 14px);
  font-weight: var(--font-weight-bold, 700);
  color: var(--color-secondary);
  text-decoration: none;
}

.login-form__forgot:hover {
  text-decoration: underline;
}

/* =============================
 * Input wrapper
 * ============================= */
.login-form__input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--color-bg-input, #F7F7F7);
  border: 2px solid transparent;
  border-radius: var(--radius-md, 12px);
  transition: all var(--transition-fast, 0.1s ease);
}

.login-form__input-wrap:focus-within {
  background-color: #ffffff;
  border-color: var(--color-secondary, #1CB0F6);
  box-shadow: 0 0 0 4px rgba(28, 176, 246, 0.1);
}

.login-form__icon {
  padding: 0 var(--space-3, 12px) 0 var(--space-4, 16px);
  font-size: var(--font-size-lg, 18px);
  color: var(--color-text-muted, #AFAFAF);
  flex-shrink: 0;
}

.login-form__input {
  flex: 1;
  padding: var(--space-5, 20px) var(--space-3, 12px) var(--space-5, 20px) 0;
  border: none;
  background: transparent;
  font-family: var(--font-family);
  font-size: var(--font-size-base, 16px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-text);
  outline: none;
  min-width: 0;
}

.login-form__input::placeholder {
  color: var(--color-text-muted, #AFAFAF);
  font-weight: var(--font-weight-regular, 400);
}

.login-form__toggle-password {
  padding: 0 var(--space-4, 16px) 0 var(--space-2, 8px);
  background: transparent;
  border: none;
  color: var(--color-text-muted, #AFAFAF);
  cursor: pointer;
  font-size: var(--font-size-lg, 18px);
  display: flex;
  align-items: center;
}

.login-form__toggle-password:hover {
  color: var(--color-text);
}

/* =============================
 * Error
 * ============================= */
.login-form__error {
  padding: var(--space-3, 12px) var(--space-4, 16px);
  background-color: rgba(255, 75, 75, 0.1);
  border: 1px solid rgba(255, 75, 75, 0.2);
  border-radius: var(--radius-md, 12px);
  color: var(--color-error);
  font-size: var(--font-size-sm, 14px);
  font-weight: var(--font-weight-medium, 500);
}

/* =============================
 * Terms
 * ============================= */
.login-form__terms {
  font-size: var(--font-size-xs, 12px);
  color: var(--color-text-muted, #AFAFAF);
  text-align: center;
  line-height: var(--line-height-relaxed, 1.7);
  margin: 0;
}

.login-form__terms a {
  color: var(--color-text-secondary, #777);
  text-decoration: underline;
  font-weight: var(--font-weight-semibold, 600);
}

.login-form__terms a:hover {
  color: var(--color-text);
}

/* =============================
 * Mobile (≤ 480px) — compact typography
 * ============================= */
@media (max-width: 480px) {
  .login-form {
    gap: var(--space-4, 16px);
    padding: var(--space-3, 12px) 0;
  }

  .login-form__field {
    gap: var(--space-2, 8px);
  }

  .login-form__label {
    font-size: 13px;
    letter-spacing: 0.2px;
  }

  .login-form__forgot {
    font-size: 12px;
  }

  .login-form__input-wrap {
    border-radius: var(--radius-md, 10px);
  }

  .login-form__icon {
    font-size: 15px;
    padding: 0 10px 0 14px;
  }

  .login-form__input {
    padding: 14px 10px 14px 0;
    font-size: 14px;
  }

  .login-form__toggle-password {
    font-size: 15px;
    padding: 0 12px 0 6px;
  }

  .login-form__error {
    font-size: 12px;
    padding: 10px 12px;
  }

  .login-form__terms {
    font-size: 11px;
    line-height: 1.6;
  }

  /* Compact buttons on mobile */
  :deep(.tactile-button) {
    font-size: 12px;
    padding: 12px 16px;
    letter-spacing: 0.4px;
    min-height: 44px;
  }
}
</style>