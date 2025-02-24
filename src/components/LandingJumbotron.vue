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
        <div class="buttons">
          <input v-model="email" type="email" placeholder="Enter your email" class="input" />
          <input v-model="password" type="password" placeholder="Enter your password" class="input" />
          <button class="btn-get-started" @click="handleSignUp">CREATE ACCOUNT</button>
          <button class="btn-have-account" @click="handleLogin">I ALREADY HAVE ACCOUNT</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios'; // Import the axios instance

export default {
  name: 'LandingJumbotron',
  data() {
    return {
      email: '', // Store the email input
      password: '', // Store the password input
    };
  },
  methods: {
    async handleSignUp() {
      try {
        // Send signup request to the backend
        const response = await axios.post('/api/auth/signup', {
          email: this.email,
          password: this.password,
        });

        // Handle successful signup (e.g., store the JWT token)
        localStorage.setItem('token', response.data.token);
        alert('Account created successfully!');
        // Redirect to the dashboard after successful signup (optional)
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Signup failed', error);
        alert(error.response.data.message || 'Error creating account!');
      }
    },
    async handleLogin() {
      try {
        // Send login request to the backend
        const response = await axios.post('/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        // Handle successful login (e.g., store the JWT token)
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        // Redirect to the main page after successful login (optional)
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed', error);
        alert('Invalid credentials!');
      }
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
  color: rgb(88, 204, 2);
  padding: 10px 20px;
  border: 1px solid rgb(88, 204, 2);
  border-radius: 5px;
  cursor: pointer;
  display: block;
  width: 100%;
}

.btn-get-started:hover {
  background-color: rgb(70, 160, 2);
}

.btn-have-account:hover {
  background-color: #f8f9fa;
}
</style>
