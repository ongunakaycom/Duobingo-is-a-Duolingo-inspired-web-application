<template>
  <div class="lesson-path-card">
    <!-- Your Path -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <h5 class="card-title d-flex justify-content-between align-items-center">
          <span>📚 Your Path</span>
          <b-badge variant="info" pill>{{ completedLessons }}/{{ totalLessons }}</b-badge>
        </h5>

        <div class="lesson-path mt-3">
          <div
            v-for="lesson in lessonPath"
            :key="lesson.id"
            class="path-node d-flex align-items-center mb-3"
            :class="{
              active: lesson.id === currentLessonId,
              completed: lesson.completed,
            }"
            @click="$emit('select', lesson)"
          >
            <div class="node-icon me-3">
              <div class="circle" :class="lesson.status">
                <span v-if="lesson.completed">✓</span>
                <span v-else>{{ lesson.order }}</span>
              </div>
            </div>
            <div class="node-info">
              <div class="node-title">{{ lesson.title }}</div>
              <div class="node-desc small text-muted">{{ lesson.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Your Stats -->
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">📊 Your Stats</h5>
        <div class="stats-grid">
          <div class="stat-item text-center p-2">
            <div class="stat-value text-primary fw-bold">{{ stats.streakDays }}</div>
            <div class="stat-label small">Day Streak</div>
          </div>
          <div class="stat-item text-center p-2">
            <div class="stat-value text-success fw-bold">{{ stats.totalXP }}</div>
            <div class="stat-label small">Total XP</div>
          </div>
          <div class="stat-item text-center p-2">
            <div class="stat-value text-info fw-bold">{{ stats.accuracy }}%</div>
            <div class="stat-label small">Accuracy</div>
          </div>
          <div class="stat-item text-center p-2">
            <div class="stat-value text-warning fw-bold">{{ stats.wordsLearned }}</div>
            <div class="stat-label small">Words Learned</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  lessonPath: { type: Array, required: true },
  currentLessonId: { type: String, default: '' },
  stats: { type: Object, required: true },
});

defineEmits(['select']);

const completedLessons = computed(
  () => props.lessonPath.filter((l) => l.completed).length
);
const totalLessons = computed(() => props.lessonPath.length);
</script>

<style scoped>
.path-node {
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.path-node:hover:not(.active) {
  background-color: rgba(88, 204, 2, 0.1);
}

.path-node.active {
  background-color: rgba(88, 204, 2, 0.15);
  border-left: 4px solid var(--color-primary);
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
}

.circle.completed {
  background-color: #28a745;
}

.circle.current {
  background-color: #007bff;
}

.circle.locked {
  background-color: #6c757d;
  opacity: 0.6;
}

.node-title {
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.stat-item {
  background-color: #f8f9fa;
  border-radius: 8px;
}

.stat-value {
  font-size: 1.5rem;
}
</style>