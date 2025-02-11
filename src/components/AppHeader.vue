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
                SITE LANGUAGE: {{ selectedLanguage.toUpperCase() }}
              </a>
              <!-- Language Dropdown Menu -->
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#" @click="changeLanguage('English', '🇺🇸')" :class="{ 'active': selectedLanguage === 'English' }">
                    <span class="flag-icon">🇺🇸</span> ENGLISH
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="changeLanguage('Spanish', '🇪🇸')" :class="{ 'active': selectedLanguage === 'Spanish' }">
                    <span class="flag-icon">🇪🇸</span> SPANISH
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="changeLanguage('Turkish', '🇹🇷')" :class="{ 'active': selectedLanguage === 'Turkish' }">
                    <span class="flag-icon">🇹🇷</span> TURKISH
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
      selectedLanguage: 'English', // Default selected language
      selectedLanguageFlag: '🇺🇸' // Default flag for English
    };
  },
  methods: {
    // Change language function
    changeLanguage(language, flag) {
      this.selectedLanguage = language;
      this.selectedLanguageFlag = flag;
      // You can store the selected language in a global state (like Vuex)
      // or you can implement routing or localization if needed.
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
  font-size: 12px; /* Adjusted font size */
  font-weight: 700; /* Font weight */
  text-transform: uppercase; /* Ensure text is always uppercase */
}

/* Style for flag icons */
.flag-icon {
  font-size: 12px; /* Match font size with text */
  margin-right: 5px; /* Add spacing between flag and text */
}

/* Highlight the selected language in the dropdown */
.dropdown-item.active {
  background-color: #f8f9fa; /* Light background for active item */
  font-weight: bold; /* Bold text for active item */
}
</style>