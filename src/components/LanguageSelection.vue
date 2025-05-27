<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container d-flex justify-content-between">
        <!-- Logo -->
        <router-link class="navbar-brand" :to="isAuthenticated ? '/dashboard' : '/'">
          Duobingo
        </router-link>

        <!-- Mobile Toggle -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav-collapse"
          aria-controls="nav-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Dropdown -->
        <div class="collapse navbar-collapse" id="nav-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                SITE LANGUAGE: {{ selectedLanguage }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><button class="dropdown-item" @click="changeLanguage('English')">ENGLISH</button></li>
                <li><button class="dropdown-item" @click="changeLanguage('Spanish')">SPANISH</button></li>
                <li><button class="dropdown-item" @click="changeLanguage('Turkish')">TURKISH</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      selectedLanguage: 'English'
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    changeLanguage(language) {
      this.selectedLanguage = language;
    }
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
