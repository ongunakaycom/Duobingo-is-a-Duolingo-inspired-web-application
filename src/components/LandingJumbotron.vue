<template>
  <div class="container">
    <div class="grid">
      <div class="image-section">
        <img src="../assets/duo.png" alt="Language Learning" class="image" />
      </div>
      <div class="text-section">
        <h1 class="title">Learn, practice and master new languages with Lingo.</h1>
        <p class="lead">Learn a new language with fun and interactive lessons.</p>
        <hr class="divider" />
        <p>Choose from a variety of languages and start your journey today!</p>
        <div class="buttons">
          <button class="btn-get-started">Get Started</button>
          <button class="btn-have-account">I already have an account</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingJumbotron'
};
</script>

<style scoped>
.container {
  padding: 50px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.image-section {
  display: flex;
  justify-content: center;
}

.image {
  max-width: 100%;
  height: auto;
}

.text-section {
  text-align: left;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.lead {
  font-size: 1.25rem;
  margin-bottom: 20px;
}

.divider {
  margin: 20px 0;
  border: 0;
  border-top: 1px solid #ddd;
}

.buttons {
  margin-top: 30px;
}

.btn-get-started {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-have-account {
  background-color: white;
  color: #28a745;
  padding: 10px 20px;
  border: 1px solid #28a745;
  border-radius: 5px;
  cursor: pointer;
}

.btn-get-started:hover {
  background-color: #218838;
}

.btn-have-account:hover {
  background-color: #f8f9fa;
}
</style>