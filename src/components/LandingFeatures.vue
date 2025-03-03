<template>
  <div class="container py-5">
    <div class="row align-items-center">
      <!-- Left Grid -->
      <div class="col-md-6 text-md-start text-center">
        <h2 class="left-grid-text">free. fun. effective.</h2>
        <p class="left-grid-description">
          Learning with Duolingo is fun, and research shows that it works! With quick, bite-sized lessons, you’ll earn points and unlock new levels while gaining real-world communication skills.
        </p>
      </div>

      <!-- Right Grid -->
      <div class="col-md-6 text-center">
        <img src="../assets/duo-banner.png" alt="Duolingo Banner" class="right-grid-image img-fluid" />
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
/* Left Grid Text */
.left-grid-text {
  font-size: 2.5rem; /* 48px */
  color: rgb(88, 204, 2);
  margin-bottom: 20px;
  text-transform: lowercase;
}

/* Left Grid Description */
.left-grid-description {
  font-size: 1.0625rem; /* 17px */
  color: rgb(119, 119, 119);
  line-height: 1.6;
}

/* Right Grid Image */
.right-grid-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  width: 100%; /* Full width for responsive images */
  max-width: 350px; /* Limit the width on larger screens */
}
</style>
