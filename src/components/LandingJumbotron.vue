<template>
  <div class="container py-5">
    <div class="row align-items-center">
      <div class="col-12 col-md-6 text-center">
        <img src="../assets/duo.png" alt="Language Learning" class="img-fluid w-75" />
      </div>

      <div class="col-12 col-md-6">
        <h1 class="fw-bold text-dark">
          {{ isLoginMode ? 'Welcome Back' : 'Create Your Account' }}
        </h1>
        <p class="lead">
          {{ isLoginMode ? 'Login to continue your learning journey.' : 'Join and start learning today!' }}
        </p>

        <form @submit.prevent="handleAuth" class="mb-3">
          <div class="mb-3">
            <input
              v-model="email"
              type="email"
              autocomplete="email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="mb-3">
            <input
              v-model="password"
              type="password"
              autocomplete="current-password"
              class="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" class="btn btn-get-started w-100">
            {{ isLoginMode ? 'LOGIN' : 'CREATE ACCOUNT' }}
          </button>
        </form>

        <button class="btn btn-outline-success w-100" @click="toggleMode">
          {{ isLoginMode ? "I DON'T HAVE AN ACCOUNT" : "I ALREADY HAVE AN ACCOUNT" }}
        </button>

        <div
          v-if="alert.show"
          :class="['alert', `alert-${alert.type}`, 'mt-3']"
          role="alert"
        >
          {{ alert.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, signUp } from '../axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoginMode: true,
      alert: {
        show: false,
        message: '',
        type: '',
      },
      isLoading: false
    };
  },
  methods: {
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
    },
    async handleAuth() {
      try {
        this.isLoading = true;

        const fn = this.isLoginMode ? login : signUp;
        const { token } = await fn(this.email, this.password);

        if (token) {
          localStorage.setItem('token', token);
          this.showAlert(this.isLoginMode ? 'Login successful!' : 'Signup successful!', 'success');

          // Show alert briefly before transitioning
          setTimeout(() => {
            window.location.reload(); // reload App.vue and show Dashboard via token check
          }, 1000);
        }
      } catch (err) {
        const message = err?.response?.data?.error || 'Authentication failed';
        this.showAlert(message, 'danger');
      } finally {
        this.isLoading = false;
      }
    },
    showAlert(message, type) {
      this.alert = { show: true, message, type };
      setTimeout(() => (this.alert.show = false), 5000);
    }
  }
};
</script>

