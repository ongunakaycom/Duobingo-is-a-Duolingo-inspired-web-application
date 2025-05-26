<template>
  <div class="container py-5">
    <div class="row align-items-center">
      <!-- Left Grid (Text & Form) -->
      <div class="col-md-6 text-md-start text-center">
        <h2 class="left-grid-text">free. fun. effective.</h2>
        <p class="left-grid-description">
          Learning with Duolingo is fun, and research shows that it works! With quick, bite-sized lessons, you’ll earn points and unlock new levels while gaining real-world communication skills.
        </p>

        <hr />

        <!-- Form Title -->
        <h4 class="mb-3">{{ isLogin ? 'Login to your account' : 'Create a new account' }}</h4>

        <!-- Signup/Login Form -->
        <form @submit.prevent="isLogin ? handleLogin() : handleSignUp()">
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
        <button class="btn btn-outline-secondary w-100 mt-2" @click="isLogin = !isLogin">
          {{ isLogin ? 'I NEED AN ACCOUNT' : 'I ALREADY HAVE AN ACCOUNT' }}
        </button>

        <!-- Alert -->
        <div v-if="alert.show" :class="['alert', `alert-${alert.type}`, 'mt-3']" role="alert">
          {{ alert.message }}
        </div>
      </div>

      <!-- Right Grid (Image) -->
      <div class="col-md-6 text-center">
        <img src="../assets/duo-banner.png" alt="Duolingo Banner" class="right-grid-image img-fluid" />
      </div>
    </div>
  </div>
</template>


<script>
import { axiosInstance } from '../axios'; // your centralized axios setup

export default {
  name: 'LandingPage',
  data() {
    return {
      // Form state
      email: '',
      password: '',
      isLogin: false, // false = signup, true = login

      // Alert system
      alert: {
        show: false,
        message: '',
        type: '', // 'success' | 'danger'
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
        this.$router.push('/dashboard'); // redirect to dashboard
      } catch (error) {
        this.showAlert(error.response?.data?.message || 'Signup failed!', 'danger');
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
        this.showAlert(error.response?.data?.message || 'Invalid login!', 'danger');
      }
    },
    showAlert(message, type) {
      this.alert = {
        show: true,
        message,
        type,
      };
      setTimeout(() => {
        this.alert.show = false;
      }, 4000);
    },
  },
};
</script>


<style scoped>
/* Left Grid Text */
.left-grid-text {
  font-size: 2.5rem; /* 48px */
  color: rgb(88, 204, 2);
  margin-bottom: 20px;
  text-transform: lowercase;
}

/* Left Grid Description */
.left-grid-description {
  font-size: 1.0625rem; /* 17px */
  color: rgb(119, 119, 119);
  line-height: 1.6;
}

/* Right Grid Image */
.right-grid-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  width: 100%; /* Full width for responsive images */
  max-width: 350px; /* Limit the width on larger screens */
}
</style>
