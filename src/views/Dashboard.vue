<template>
  <div class="container py-5">
    <h2 class="mb-4">Welcome to Duobingo Dashboard 🎯</h2>

    <div class="row g-4">
      <div class="col-md-6 col-lg-4" v-for="lang in languages" :key="lang.name">
        <div class="card h-100 shadow-sm">
          <img :src="lang.flag" class="card-img-top" :alt="`${lang.name} flag`" style="height: 150px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">{{ lang.name }}</h5>
            <p class="card-text">Progress: {{ lang.progress }}%</p>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{ width: lang.progress + '%' }"
                :aria-valuenow="lang.progress"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      languages: [
        {
          name: 'English',
          flag: require('@/assets/us-flag.png'),
          progress: 75,
        },
        {
          name: 'German',
          flag: require('@/assets/german-flag.png'),
          progress: 45,
        },
        {
          name: 'Turkish',
          flag: require('@/assets/tr-flag.png'),
          progress: 20,
        },
      ],
    };
  },
};
</script>

<style scoped>
.card-img-top {
  border-bottom: 1px solid #ddd;
}
</style>
