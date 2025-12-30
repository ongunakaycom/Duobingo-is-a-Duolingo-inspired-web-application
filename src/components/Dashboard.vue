<template>
  <div class="container py-5 min-vh-100">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">👋 Welcome to Duobingo!</h2>
      <button class="btn btn-danger" @click="logout">Logout</button>
    </div>

    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">👤 Profile</h5>
        <p class="card-text"><strong>Email:</strong> {{ user?.email }}</p>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">🎯 Your Progress</h5>
        <p class="card-text">Feature coming soon!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    this.user = { email: payload.email };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.card + .card {
  margin-top: 1rem;
}
</style>
