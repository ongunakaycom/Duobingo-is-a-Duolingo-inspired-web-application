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

        <!-- Signup Form -->
        <form @submit.prevent="handleSignUp" class="mb-3">
          <div class="mb-3">
            <input v-model="email" type="email" class="form-control" placeholder="Enter your email" required />
          </div>
          <div class="mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Enter your password" required />
          </div>
          <button type="submit" class="btn btn-success w-100">CREATE ACCOUNT</button>
        </form>

        <!-- Login Button -->
        <button class="btn btn-outline-success w-100" @click="handleLogin">I ALREADY HAVE ACCOUNT</button>

        <!-- Bootstrap Alert -->
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
      alert: {
        show: false,
        message: '',
        type: '',
      },
    };
  },
  methods: {
    async handleSignUp() {
      try {
        const response = await axiosInstance.post('/auth/signup', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        this.showAlert('Account created successfully!', 'success');
        this.$router.push('/dashboard');
      } catch (error) {
        this.showAlert(error.response?.data?.message || 'Error creating account!', 'danger');
      }
    },
    async handleLogin() {
      try {
        const response = await axiosInstance.post('/auth/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        this.showAlert('Login successful!', 'success');
        this.$router.push('/dashboard');
      } catch (error) {
        this.showAlert('Invalid credentials!', 'danger');
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
/* Ensure responsiveness */
.container {
  max-width: 1024px;
}

/* Mobile-friendly adjustments */
@media (max-width: 768px) {
  .text-center {
    text-align: center;
  }
}
</style>
