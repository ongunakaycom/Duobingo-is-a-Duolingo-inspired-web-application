<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container d-flex justify-content-between">
        <!-- Logo and Branding -->
        <a class="navbar-brand" href="#">Duolingo</a>

        <!-- Mobile Toggle Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-collapse" aria-controls="nav-collapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Links -->
        <div class="collapse navbar-collapse" id="nav-collapse">
          <ul class="navbar-nav ms-auto">
            <!-- Language Selection Dropdown -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                SITE LANGUAGE: {{ selectedLanguage }}
              </a>
              <!-- Language Dropdown Menu -->
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#" @click="changeLanguage('English')">ENGLISH</a></li>
                <li><a class="dropdown-item" href="#" @click="changeLanguage('Spanish')">SPANISH</a></li>
                <li><a class="dropdown-item" href="#" @click="changeLanguage('Turkish')">TURKISH</a></li>
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
      selectedLanguage: 'English' // Default selected language
    };
  },
  methods: {
    // Change language function
    changeLanguage(language) {
      this.selectedLanguage = language;
      // You can store the selected language in a global state (like Vuex)
      // or you can implement routing or localization if needed.
    }
  }
};
</script>

<style scoped>
@import '../../src/assets/css/language-selection.css';
</style>
