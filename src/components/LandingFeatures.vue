<template>
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
  name: 'LandingFeatures'
};
</script>

<style scoped>
.features {
  text-align: center;
  padding: 20px;
}

.feature-list {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.feature-item {
  max-width: 300px;
  text-align: left;
}
</style>
