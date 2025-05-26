<template>
  <div class="container py-5">
    <div class="row align-items-center">
      <!-- Image Section -->
      <div class="col-12 col-md-6 text-center">
        <img src="../assets/duo.png" alt="Language Learning" class="img-fluid w-75">
      </div>

      <!-- Text & Form Section -->
      <div class="col-12 col-md-6">
        <h1 class="fw-bold text-dark">Learn, practice and master new languages with Lingo.</h1>
        <p class="lead">Learn a new language with fun and interactive lessons.</p>
        <hr />
        <p>Choose from a variety of languages and start your journey today!</p>

        <!-- Auth Form -->
        <form @submit.prevent="handleAuth" class="mb-3">
          <div class="mb-3">
            <input v-model="email" type="email" class="form-control" placeholder="Enter your email" required />
          </div>
          <div class="mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Enter your password" required />
          </div>
          <button type="submit" class="btn btn-get-started w-100">
            {{ isLoginMode ? 'LOGIN' : 'CREATE ACCOUNT' }}
          </button>
        </form>

        <!-- Toggle Mode -->
        <button class="btn btn-outline-success w-100" @click="toggleMode">
          {{ isLoginMode ? "I DON'T HAVE AN ACCOUNT" : "I ALREADY HAVE ACCOUNT" }}
        </button>

        <!-- Alert -->
        <div v-if="alert.show" :class="['alert', `alert-${alert.type}`, 'mt-3']" role="alert">
          {{ alert.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from '../axios';

export default {
  name: 'LandingJumbotron',
  data() {
    return {
      email: '',
      password: '',
      isLoginMode: false, // Toggle state
      alert: {
        show: false,
        message: '',
        type: '',
      },
    };
  },
  methods: {
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
    },
    async handleAuth() {
      try {
        const endpoint = this.isLoginMode ? '/auth/login' : '/auth/signup';
        const response = await axiosInstance.post(endpoint, {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('token', response.data.token);
        this.showAlert(this.isLoginMode ? 'Login successful!' : 'Account created successfully!', 'success');
        this.$router.push('/dashboard');
      } catch (error) {
        const msg = error.response?.data?.message || 'An error occurred!';
        this.showAlert(msg, 'danger');
      }
    },
    showAlert(message, type) {
      this.alert.message = message;
      this.alert.type = type;
      this.alert.show = true;
      setTimeout(() => {
        this.alert.show = false;
      }, 5000);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1024px;
}
.btn-get-started {
  background-color: #58cc02;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  display: block;
  width: 100%;
}
@media (max-width: 768px) {
  .text-center {
    text-align: center;
  }
}
</style>
