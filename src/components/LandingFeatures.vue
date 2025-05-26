<template>
  <div class="container py-5">
    <div class="row align-items-center">
      <!-- Image -->
      <div class="col-md-6 text-center">
        <img src="../assets/duo.png" alt="Language Learning" class="img-fluid w-75">
      </div>

      <!-- Info Section -->
      <div class="col-md-6">
        <h1 class="fw-bold text-dark">
          Learn, practice and master new languages with Lingo.
        </h1>
        <p class="lead">Your fun, effective way to learn languages — anytime, anywhere.</p>
        <hr />
        <p>Why learners choose Lingo:</p>
        <ul class="list-unstyled">
          <li>✅ Gamified lessons that keep you engaged</li>
          <li>✅ Track progress and earn rewards</li>
          <li>✅ Choose from 30+ global languages</li>
          <li>✅ Bite-sized daily goals — perfect for busy people</li>
          <li>✅ Free and accessible for everyone</li>
        </ul>

        <!-- Optional call-to-action -->
        <router-link to="/signup" class="btn btn-get-started mt-3 w-100">
          Get Started for Free
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingJumbotronInfo',
};
</script>

<style scoped>
.btn-get-started {
  background-color: #58cc02;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
</style>
