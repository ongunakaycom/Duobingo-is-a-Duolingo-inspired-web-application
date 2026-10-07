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
      {{ loading ? 'Logging in...' : 'Login' }}
    </TactileButton>

    <!-- Secondary -->
    <TactileButton
      type="button"
      variant="ghost"
      size="lg"
      block
      @click="$emit('signup')"
    >
      I don't have an account
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
});

const emit = defineEmits(['submit', 'signup']);

const email = ref(props.initialEmail);
const password = ref('');
const showPassword = ref(false);

function handleSubmit() {
  emit('submit', { email: email.value, password: password.value });
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  width: 100%;
  padding: var(--space-4) 0;
}

.login-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);                           /* ← 2 → 3 */
}

.login-form__label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.login-form__label {
  font-size: var(--font-size-base);              /* ← sm → base */
  font-weight: var(--font-weight-black);         /* ← bold → black */
  color: var(--color-text);
  letter-spacing: 0.3px;
  margin-bottom: var(--space-1);
}

.login-form__forgot {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-secondary);
  text-decoration: none;
}

.login-form__forgot:hover {
  text-decoration: underline;
}

.login-form__input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--color-bg-input);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.login-form__input-wrap:focus-within {
  background-color: #ffffff;
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 4px rgba(28, 176, 246, 0.1);
}

.login-form__icon {
  padding: 0 var(--space-3) 0 var(--space-4);
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.login-form__input {
  flex: 1;
  padding: var(--space-5) var(--space-3) var(--space-5) 0;  /* ← 4 → 5 */
  border: none;
  background: transparent;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  outline: none;
  min-width: 0;
}

.login-form__input::placeholder {
  color: var(--color-text-muted);
  font-weight: var(--font-weight-regular);
}

.login-form__toggle-password {
  padding: 0 var(--space-4) 0 var(--space-2);
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: var(--font-size-lg);
  display: flex;
  align-items: center;
}

.login-form__toggle-password:hover {
  color: var(--color-text);
}

.login-form__error {
  padding: var(--space-3) var(--space-4);
  background-color: rgba(255, 75, 75, 0.1);
  border: 1px solid rgba(255, 75, 75, 0.2);
  border-radius: var(--radius-md);
  color: var(--color-error);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.login-form__terms {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-align: center;
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.login-form__terms a {
  color: var(--color-text-secondary);
  text-decoration: underline;
  font-weight: var(--font-weight-semibold);
}

.login-form__terms a:hover {
  color: var(--color-text);
}
</style>