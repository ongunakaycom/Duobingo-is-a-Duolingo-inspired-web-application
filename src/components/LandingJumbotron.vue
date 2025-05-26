<template> 
  <div class="container py-5">
    <div class="row align-items-center">
      <!-- Image Section -->
      <div class="col-12 col-md-6 text-center">
        <img src="../assets/duo.png" alt="Language Learning" class="img-fluid w-75" />
      </div>

      <!-- Text & Form Section -->
      <div class="col-12 col-md-6">
        <h1 class="fw-bold text-dark">Practice and master new languages.</h1>
        <p class="lead">Learn a new language with fun and interactive lessons.</p>
        <hr />
        <p>Choose from a variety of languages and start your journey today!</p>

        <!-- Auth Form -->
        <form @submit.prevent="handleAuth" class="mb-3">
          <div class="mb-3">
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Enter your email"
              required
              autocomplete="email"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Enter your password"
              required
              :autocomplete="isLoginMode ? 'current-password' : 'new-password'"
            />
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
