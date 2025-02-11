<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container d-flex justify-content-between">
        <!-- Logo and Branding -->
        <a class="navbar-brand" href="#">
          <img src="@/assets/Duolingo_logo.svg.png" alt="Duolingo Logo" style="height: 40px;">
        </a>

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
                <div class="d-flex align-items-center">
                  <img :src="getFlag(selectedLanguage)" alt="Flag" class="flag-icon me-2" />
                  <span>SITE LANGUAGE: {{ selectedLanguage }}</span>
                </div>
              </a>
              <!-- Language Dropdown Menu -->
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#" @click="changeLanguage('English')">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/flags/us-flag.png" alt="US Flag" class="flag-icon me-2" />
                      <span>ENGLISH</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="changeLanguage('Spanish')">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/flags/es-flag.png" alt="Spanish Flag" class="flag-icon me-2" />
                      <span>SPANISH</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="changeLanguage('Turkish')">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/flags/tr-flag.png" alt="Turkish Flag" class="flag-icon me-2" />
                      <span>TURKISH</span>
                    </div>
                  </a>
                </li>
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
    },
    // Get flag based on language
    getFlag(language) {
      switch (language) {
        case 'English':
          return require('@/assets/flags/us-flag.png');
        case 'Spanish':
          return require('@/assets/flags/es-flag.png');
        case 'Turkish':
          return require('@/assets/flags/tr-flag.png');
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
/* Add the following styles */
.container {
  max-width: 1024px;
  margin: 0 auto;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: white; /* Set background to white */
}

.navbar-nav {
  display: grid;
  grid-template-columns: repeat(1, auto);
  gap: 10px; /* Add gap between grid items */
}

.nav-item {
  display: block;
}

/* Ensure the logo fits well */
.navbar-brand img {
  height: 40px; /* Adjust height as needed */
}

/* Style for the [SITE LANGUAGE] text */
.nav-link.dropdown-toggle {
  color: rgb(175, 175, 175); /* Font color */
  font-size: 15px; /* Font size */
  font-weight: 700; /* Font weight */
}

/* Flag icon styling */
.flag-icon {
  width: 20px; /* Adjust flag size */
  height: auto;
}

/* Dropdown item styling */
.dropdown-item {
  display: flex;
  align-items: center;
  color: rgb(175, 175, 175); /* Font color */
  font-size: 14px; /* Font size */
  font-weight: 400; /* Font weight */
}

.dropdown-item img {
  margin-right: 8px; /* Space between flag and text */
}
</style>