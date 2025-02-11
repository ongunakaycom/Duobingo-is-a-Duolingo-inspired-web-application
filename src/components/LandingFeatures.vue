<template>
  <div class="grid-container">
    <!-- Left Grid -->
    <div class="left-grid">
      <h2 class="left-grid-text">free. fun. effective.</h2>
      <p class="left-grid-description">
        Learning with Duolingo is fun, and research shows that it works! With quick, bite-sized lessons, you’ll earn points and unlock new levels while gaining real-world communication skills.
      </p>
    </div>

    <!-- Right Grid -->
    <div class="right-grid">
      <img src="../assets/duo-banner.png" alt="Duolingo Banner" class="right-grid-image" />
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
  max-width: 1024px;
  margin: 0 auto;
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
  width: 350px;
}
</style>