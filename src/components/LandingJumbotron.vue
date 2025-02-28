<template>
  <div class="container">
    <div class="grid">
      <div class="image-section">
        <img src="../assets/duo.png" alt="Language Learning" class="image" />
      </div>
      <div class="text-section">
        <h1 class="title">Learn, practice and master new languages with Lingo.</h1>
        <p class="lead">Learn a new language with fun and interactive lessons.</p>
        <hr class="divider" />
        <p>Choose from a variety of languages and start your journey today!</p>

        <!-- Signup Section -->
        <form @submit.prevent="handleSignUp">
          <div class="buttons">
            <input v-model="email" type="email" placeholder="Enter your email" class="input" required />
            <input v-model="password" type="password" placeholder="Enter your password" class="input" required />
            <button type="submit" class="btn-get-started">CREATE ACCOUNT</button>
          </div>
        </form>

        <!-- Login Section -->
        <button class="btn-have-account" @click="handleLogin">I ALREADY HAVE ACCOUNT</button>

        <!-- Bootstrap Alert for Success/Failure -->
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
      email: '', // Store the email input
      password: '', // Store the password input
      alert: {
        show: false, // Whether to show the alert
        message: '', // Alert message
        type: '', // Bootstrap alert variant (e.g., 'success', 'danger')
      },
    };
  },
  methods: {
    async handleSignUp() {
  try {
    // Send signup request using the custom axios instance
    const response = await axiosInstance.post('/auth/signup', {
      email: this.email,  // Email from form input
      password: this.password,  // Password from form input
    });

    // Handle successful signup (e.g., store the JWT token)
    localStorage.setItem('token', response.data.token);
    this.showAlert('Account created successfully!', 'success');
    // Redirect to the dashboard after successful signup (optional)
    this.$router.push('/dashboard');
  } catch (error) {
    console.error('Signup failed', error);
    this.showAlert(error.response?.data?.message || 'Error creating account!', 'danger');
  }
},

async handleLogin() {
  try {
    // Send login request using the custom axios instance
    const response = await axiosInstance.post('/auth/login', {
      email: this.email,  // Email from form input
      password: this.password,  // Password from form input
    });

    // Handle successful login (e.g., store the JWT token)
    localStorage.setItem('token', response.data.token);
    this.showAlert('Login successful!', 'success');
    // Redirect to the main page after successful login (optional)
    this.$router.push('/dashboard');
  } catch (error) {
    console.error('Login failed', error);
    this.showAlert('Invalid credentials!', 'danger');
  }
},
    showAlert(message, type) {
      this.alert.message = message;
      this.alert.type = type;
      this.alert.show = true;

      // Optionally, hide the alert after a few seconds
      setTimeout(() => {
        this.alert.show = false;
      }, 5000);
    },
  },
};
</script>

<style scoped>
.container {
  padding: 50px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.image-section {
  display: flex;
  justify-content: center;
}

.image {
  max-width: 100%;
  height: auto;
  width: 400px;
}

.text-section {
  text-align: left;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.lead {
  font-size: 1.25rem;
  margin-bottom: 20px;
}

.divider {
  margin: 20px 0;
  border: 0;
  border-top: 1px solid #ddd;
}

.buttons {
  margin-top: 30px;
}

.input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.btn-get-started {
  background-color: rgb(88, 204, 2); /* Updated color */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  display: block;
  width: 100%;
}

.btn-have-account {
  background-color: white;
  color: rgb(88, 204, 2); /* Updated color */
  padding: 10px 20px;
  border: 1px solid rgb(88, 204, 2); /* Updated color */
  border-radius: 5px;
  cursor: pointer;
  display: block;
  width: 100%;
}

.btn-get-started:hover {
  background-color: rgb(70, 160, 2); /* Darker shade for hover */
}

.btn-have-account:hover {
  background-color: #f8f9fa;
}

.alert {
  font-size: 1.25rem;
  margin-top: 20px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
