<template>
  <div class="container py-5">
    <div class="row align-items-center">
      <!-- Image -->
      <div class="col-md-6 text-center">
        <img src="../assets/duo.png" alt="Language Learning" class="img-fluid w-75">
      </div>

      <!-- Form Section -->
      <div class="col-md-6">
        <h1 class="fw-bold text-dark">
          Learn, practice and master new languages with Lingo.
        </h1>
        <p class="lead">Learn a new language with fun and interactive lessons.</p>
        <hr />
        <p>Choose from a variety of languages and start your journey today!</p>

        <!-- Form -->
        <form @submit.prevent="isLogin ? handleLogin() : handleSignUp()" class="mb-3">
          <div class="mb-3">
            <input v-model="email" type="email" class="form-control" placeholder="Enter your email" required />
          </div>
          <div class="mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Enter your password" required />
          </div>
          <button type="submit" class="btn btn-get-started w-100">
            {{ isLogin ? 'LOGIN' : 'CREATE ACCOUNT' }}
          </button>
        </form>

        <!-- Toggle Button -->
        <button class="btn btn-outline-success w-100" @click="toggleForm">
          {{ isLogin ? "I don't have an account" : "I already have an account" }}
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
      isLogin: false, // 🚨 Add this flag
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
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.clearForm();
    },
    clearForm() {
      this.email = '';
      this.password = '';
      this.alert.show = false;
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
.btn-get-started {
  background-color: #58cc02;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
}
</style>
