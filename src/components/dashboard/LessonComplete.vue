<template>
  <div class="lesson-completed text-center py-5">
    <div class="celebration mb-4">
      <span class="display-1">🎉</span>
    </div>
    <h3 class="text-success">Lesson Complete!</h3>
    <p class="text-muted">Great job! You've completed "{{ lessonTitle }}"</p>

    <div class="rewards-card p-4 bg-light rounded mx-auto mt-4" style="max-width: 400px">
      <h5 class="mb-3">🏆 Your Rewards</h5>
      <div class="d-flex justify-content-around">
        <div class="text-center">
          <div class="reward-value text-warning fs-3">{{ xpReward }}</div>
          <div class="reward-label">XP Earned</div>
        </div>
        <div class="text-center">
          <div class="reward-value text-info fs-3">{{ gemReward }}</div>
          <div class="reward-label">Gems Earned</div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <b-button variant="primary" size="lg" class="me-3" @click="$emit('continue')">
        Continue Learning
      </b-button>
      <b-button variant="outline-secondary" block @click="$emit('dashboard')">
        <b-icon icon="house-door"></b-icon> Dashboard
      </b-button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  lessonTitle: { type: String, required: true },
  xpReward: { type: Number, default: 0 },
  gemReward: { type: Number, default: 0 },
});

defineEmits(['continue', 'dashboard']);
</script>

<style scoped>
.rewards-card {
  border: 2px dashed #dee2e6;
}

.reward-value {
  font-weight: bold;
}
</style>