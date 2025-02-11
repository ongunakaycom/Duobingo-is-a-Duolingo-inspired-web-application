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
                  <a class="dropdown-item" href="#" @click="changeLanguage('English', 'us-flag.png')" :class="{ 'active': selectedLanguage === 'English' }">
                    <img :src="require(`@/assets/${selectedLanguage === 'English' ? 'us-flag.png' : 'us-flag.png'}`)" alt="US Flag" class="flag-icon" /> ENGLISH
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="changeLanguage('German', 'german-flag.png')" :class="{ 'active': selectedLanguage === 'German' }">
                    <img :src="require(`@/assets/${selectedLanguage === 'German' ? 'german-flag.png' : 'german-flag.png'}`)" alt="German Flag" class="flag-icon" /> GERMAN
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="changeLanguage('Turkish', 'tr-flag.png')" :class="{ 'active': selectedLanguage === 'Turkish' }">
                    <img :src="require(`@/assets/${selectedLanguage === 'Turkish' ? 'tr-flag.png' : 'tr-flag.png'}`)" alt="Turkish Flag" class="flag-icon" /> TURKISH
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
      selectedLanguageFlag: 'us-flag.png' // Default flag for English
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
  width: 20px; /* Adjust flag size */
  height: auto;
  margin-right: 8px; /* Add spacing between flag and text */
}

/* Highlight the selected language in the dropdown */
.dropdown-item.active,
.dropdown-item:hover {
  color: black !important; /* Black text for active and hover states */
  background-color: #f8f9fa; /* Light background for active item */
  font-weight: 400; /* Bold text for active item */
  font-size: 12px;
}

.dropdown-item{
  font-size:12px;
  font-weight: 400;
}
</style>