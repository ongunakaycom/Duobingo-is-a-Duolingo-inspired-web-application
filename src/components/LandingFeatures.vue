<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 class="fw-bold text-dark">
          Learn, practice and master new languages with Lingo.
        </h1>
        <p class="lead">
          Your fun, effective way to learn languages — anytime, anywhere.
        </p>
        <hr />
        <p>Why people choose us:</p>
        <ul>
          <li>✓ Gamified lessons make learning fun and addictive</li>
          <li>✓ Track your progress with daily goals and streaks</li>
          <li>✓ Over 30 languages to choose from</li>
          <li>✓ Perfect for beginners and advanced learners</li>
          <li>✓ 100% free with optional premium features</li>
          <li>✓ Learn on your schedule — at your own pace</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingInfoOnly',
};
</script>

<style scoped>
ul {
  padding-left: 1rem;
  line-height: 1.8;
  list-style-type: none;
}
li::before {
  content: '• ';
  color: #58cc02;
  font-weight: bold;
}
</style>
