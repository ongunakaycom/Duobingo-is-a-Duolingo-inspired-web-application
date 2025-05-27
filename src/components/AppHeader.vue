<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container d-flex justify-content-between align-items-center">
        <!-- Logo (links to / or /dashboard depending on auth) -->
        <router-link class="navbar-brand" :to="isAuthenticated ? '/dashboard' : '/'">
          <img src="@/assets/Duolingo_logo.svg.png" alt="Duobingo Logo" class="logo" />
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

        <!-- Language Dropdown -->
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
                LANGUAGE: {{ selectedLanguage.toUpperCase() }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li v-for="lang in languages" :key="lang.name">
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="changeLanguage(lang.name, lang.flag)"
                    :class="{ active: selectedLanguage === lang.name }"
                  >
                    <img :src="require(`@/assets/${lang.flag}`)" alt="" class="flag-icon" />
                    {{ lang.name.toUpperCase() }}
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
  name: 'AppHeader',
  data() {
    return {
      selectedLanguage: 'English',
      selectedLanguageFlag: 'us-flag.png',
      languages: [
        { name: 'English', flag: 'us-flag.png' },
        { name: 'German', flag: 'german-flag.png' },
        { name: 'Turkish', flag: 'tr-flag.png' }
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    changeLanguage(language, flag) {
      this.selectedLanguage = language;
      this.selectedLanguageFlag = flag;
      // Persist language choice as needed
    }
  }
};
</script>

<style scoped>
.logo {
  height: 40px;
  cursor: pointer;
}

.navbar-nav {
  display: grid;
  gap: 10px;
}

.nav-link.dropdown-toggle {
  color: #afafaf;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.flag-icon {
  width: 20px;
  height: auto;
  margin-right: 8px;
}

.dropdown-item {
  font-size: 12px;
  font-weight: 400;
}

.dropdown-item.active,
.dropdown-item:hover {
  color: black !important;
  background-color: #f8f9fa;
}
</style>
