<template>
  <div class="question-card">
    <!-- Question -->
    <div class="question mb-4">
      <h5 class="question-text">{{ question.question }}</h5>
      <div
        v-if="question.example"
        class="example-text p-3 bg-light rounded mt-3"
      >
        <em>"{{ question.example }}"</em>
      </div>
    </div>

    <!-- Answer Options -->
    <div class="answer-options">
      <!-- Multiple Choice -->
      <div v-if="question.type === 'multiple-choice'">
        <b-list-group>
          <b-list-group-item
            v-for="(option, index) in question.options"
            :key="`${index}-${option.text}`"
            button
            class="mb-2 option-item"
            :class="{
              selected: selectedAnswer === index,
              correct: answerSubmitted && option.correct,
              incorrect:
                answerSubmitted && selectedAnswer === index && !option.correct,
            }"
            :disabled="answerSubmitted"
            @click="$emit('select-option', index)"
          >
            <div class="d-flex justify-content-between align-items-center">
              <span>{{ option.text }}</span>
              <span v-if="answerSubmitted && option.correct" class="text-success">✓</span>
              <span
                v-if="answerSubmitted && selectedAnswer === index && !option.correct"
                class="text-danger"
                >✗</span
              >
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>

      <!-- Translation -->
      <div v-else-if="question.type === 'translation'">
        <b-form-group>
          <b-form-input
            :model-value="translationAnswer"
            placeholder="Type the translation here..."
            size="lg"
            :disabled="answerSubmitted"
            @update:model-value="$emit('update:translationAnswer', $event)"
            @keyup.enter="$emit('check-translation')"
          ></b-form-input>
          <div class="mt-3">
            <b-button
              variant="primary"
              size="lg"
              :disabled="!translationAnswer || answerSubmitted"
              class="w-100"
              @click="$emit('check-translation')"
            >
              Check Answer
            </b-button>
          </div>
        </b-form-group>
      </div>

      <!-- Match Pairs -->
      <div v-else-if="question.type === 'match-pairs'">
        <div class="pairs-container">
          <div class="row">
            <div class="col-6">
              <h6 class="text-center mb-3">English</h6>
              <div class="draggable-list">
                <div
                  v-for="word in englishWords"
                  :key="word.id"
                  class="pair-item mb-2 p-3 bg-white border rounded"
                  draggable="true"
                  @dragstart="$emit('drag-start', word.id, 'english')"
                  @dragover.prevent
                  @drop="$emit('drop', word.id, 'english')"
                >
                  {{ word.text }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <h6 class="text-center mb-3">Spanish</h6>
              <div class="draggable-list">
                <div
                  v-for="word in spanishWords"
                  :key="word.id"
                  class="pair-item mb-2 p-3 bg-white border rounded"
                  draggable="true"
                  @dragstart="$emit('drag-start', word.id, 'spanish')"
                  @dragover.prevent
                  @drop="$emit('drop', word.id, 'spanish')"
                >
                  {{ word.text }}
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-3">
            <b-button
              variant="primary"
              :disabled="answerSubmitted"
              @click="$emit('check-pairs')"
            >
              Check Matching
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: { type: Object, required: true },
  selectedAnswer: { type: Number, default: null },
  translationAnswer: { type: String, default: '' },
  answerSubmitted: { type: Boolean, default: false },
  englishWords: { type: Array, default: () => [] },
  spanishWords: { type: Array, default: () => [] },
});

defineEmits([
  'select-option',
  'update:translationAnswer',
  'check-translation',
  'drag-start',
  'drop',
  'check-pairs',
]);
</script>

<style scoped>
.question-text {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.example-text {
  font-size: 1rem;
  color: #6c757d;
  border-left: 3px solid var(--color-primary);
}

.option-item {
  border: 2px solid #dee2e6;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.option-item.selected {
  border-color: var(--color-primary);
  background-color: rgba(88, 204, 2, 0.1);
}

.option-item.correct {
  border-color: #28a745;
  background-color: rgba(40, 167, 69, 0.1);
}

.option-item.incorrect {
  border-color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
}

.pairs-container {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.draggable-list {
  min-height: 200px;
}

.pair-item {
  cursor: move;
  user-select: none;
  transition: all 0.2s ease;
}

.pair-item:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>