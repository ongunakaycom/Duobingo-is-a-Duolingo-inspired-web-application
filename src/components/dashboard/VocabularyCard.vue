<template>
  <div class="card border-0 shadow-sm">
    <div class="card-body">
      <h5 class="card-title d-flex justify-content-between align-items-center">
        <span>📖 Vocabulary</span>
        <b-badge variant="light">{{ vocabulary.length }} words</b-badge>
      </h5>

      <b-list-group flush>
        <b-list-group-item
          v-for="(word, i) in vocabulary"
          :key="`${i}-${word.english}`"
          class="d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{{ word.english }}</strong><br />
            <small class="text-muted">{{ word.spanish }}</small>
          </div>
          <b-icon
            icon="volume-up"
            variant="primary"
            class="clickable"
            @click="$emit('pronounce', word.english)"
          ></b-icon>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script setup>
defineProps({
  vocabulary: { type: Array, default: () => [] },
});

defineEmits(['pronounce']);
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>