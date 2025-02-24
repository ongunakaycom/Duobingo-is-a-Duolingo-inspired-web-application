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
        <div class="buttons">
          <button class="btn-get-started">GET STARTED</button>
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

.btn-get-started {
  background-color: rgb(88, 204, 2); /* Updated color */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px; /* Add margin to separate buttons */
  display: block; /* Ensure the button is a block element */
  width: 100%; /* Make the button full width */
}

.btn-have-account {
  background-color: white;
  color: rgb(88, 204, 2); /* Updated color */
  padding: 10px 20px;
  border: 1px solid rgb(88, 204, 2); /* Updated color */
  border-radius: 5px;
  cursor: pointer;
  display: block; /* Ensure the button is a block element */
  width: 100%; /* Make the button full width */
}

.btn-get-started:hover {
  background-color: rgb(70, 160, 2); /* Darker shade for hover */
}

.btn-have-account:hover {
  background-color: #f8f9fa;
}
</style>