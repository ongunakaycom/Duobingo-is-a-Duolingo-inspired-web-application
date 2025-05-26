<template>
  <div class="container py-4">
    <h1 class="mb-4 text-success fw-bold">Welcome to Duobingo 🎉</h1>

    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h5 class="card-title">Your Language Progress</h5>
            <p class="card-text">Spanish — Level 3</p>
            <div class="progress">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                style="width: 60%;"
                aria-valuenow="60"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                60%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h5 class="card-title">Daily Streak</h5>
            <p class="display-6 text-warning">🔥 5 Days</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-sm-6 col-lg-4">
        <div class="card text-white bg-primary h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">Start New Lesson</h5>
            <button class="btn btn-light mt-3">Go</button>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-lg-4">
        <div class="card text-white bg-success h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">Practice Skills</h5>
            <button class="btn btn-light mt-3">Review</button>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-lg-4">
        <div class="card text-white bg-info h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">Check Leaderboard</h5>
            <button class="btn btn-light mt-3">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>
