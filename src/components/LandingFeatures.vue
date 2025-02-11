<template>
  <div class="grid-container">
    <!-- Left Grid -->
    <div class="left-grid">
      <p class="left-grid-text">free. fun. effective.</p>
      <p class="left-grid-description">
        Learning with Duolingo is fun, and research shows that it works! With quick, bite-sized lessons, you’ll earn points and unlock new levels while gaining real-world communication skills.
      </p>
    </div>

    <!-- Right Grid -->
    <div class="right-grid">
      <img src="src/assets/duo-banner-1.png" alt="Duolingo Banner" class="right-grid-image" />
    </div>
  </div>

  <!-- Features Section -->
  <div class="features">
    <h2>Why Choose Duolingo?</h2>
    <div class="feature-list">
      <div class="feature-item">
        <h3>Interactive Lessons</h3>
        <p>Enjoy engaging and interactive language lessons.</p>
      </div>
      <div class="feature-item">
        <h3>Variety of Languages</h3>
        <p>Choose from a wide range of languages to learn.</p>
      </div>
      <div class="feature-item">
        <h3>Track Your Progress</h3>
        <p>See your progress and level up as you go.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
};
</script>

<style scoped>
/* Grid Container */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: center;
  padding: 50px;
  background-color: #ffffff;
}

/* Left Grid */
.left-grid {
  text-align: left;
}

.left-grid-text {
  font-size: 48px;
  color: rgb(88, 204, 2);
  margin-bottom: 20px;
  text-transform: lowercase;
}

.left-grid-description {
  font-size: 17px;
  color: rgb(119, 119, 119);
  line-height: 1.6;
}

/* Right Grid */
.right-grid {
  text-align: center;
}

.right-grid-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Features Section */
.features {
  text-align: center;
  padding: 50px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

.features h2 {
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 40px;
}

.feature-list {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.feature-item {
  max-width: 300px;
  text-align: left;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.feature-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.feature-item h3 {
  font-size: 1.75rem;
  color: #007bff;
  margin-bottom: 15px;
}

.feature-item p {
  color: #6c757d;
  font-size: 1.125rem;
}
</style>