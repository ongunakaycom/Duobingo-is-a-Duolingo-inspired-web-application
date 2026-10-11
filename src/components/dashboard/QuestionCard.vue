<template>
  <div class="question-card">
    <!-- Question -->
    <div class="question mb-4">
      <h5 class="question-text">{{ question.question }}</h5>
      <div
        v-if="question.example"
        class="example-text p-3 rounded mt-3"
      >
        <em>"{{ question.example }}"</em>
      </div>
    </div>

    <!-- Answer Options -->
    <div class="answer-options">
      <!-- =============================
           Multiple Choice
           ============================= -->
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

      <!-- =============================
           Translation
           ============================= -->
      <div v-else-if="question.type === 'translation'">
        <div class="mb-3">
          <input
            :value="translationAnswer"
            type="text"
            class="form-control form-control-lg translation-input"
            placeholder="Type the translation here..."
            :disabled="answerSubmitted"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            @input="$emit('update:translation-answer', $event.target.value)"
            @keyup.enter="$emit('check-translation')"
          />
        </div>
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

      <!-- =============================
           Match Pairs
           ============================= -->
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
  'update:translation-answer', // Vue 3 kebab-case convention
  'check-translation',
  'drag-start',
  'drop',
  'check-pairs',
]);
</script>

<style scoped>
/* =============================
   Question / Example
   ============================= */
.question-text {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold, 700);
  margin-bottom: 1rem;
}

.example-text {
  font-size: 1rem;
  color: var(--color-text-secondary, #6c757d);
  background-color: var(--color-bg-input, #f7f7f7);
  border-left: 3px solid var(--color-primary, #58cc02);
  border-radius: var(--radius-sm, 8px);
}

/* =============================
   Translation Input (native)
   ============================= */
.translation-input {
  cursor: text;
  border: 2px solid var(--color-border, #e5e5e5);
  border-radius: var(--radius-md, 12px);
  background-color: var(--color-bg-input, #f7f7f7);
  color: var(--color-text, #3c3c3c);
  font-size: var(--font-size-lg, 18px);
  padding: var(--space-4, 16px);
  transition: all 0.2s ease;
}

.translation-input::placeholder {
  color: var(--color-text-muted, #afafaf);
}

.translation-input:hover:not(:disabled) {
  border-color: #c4c4c4;
  background-color: #ffffff;
}

.translation-input:focus {
  border-color: var(--color-primary, #58cc02);
  background-color: #ffffff;
  box-shadow: 0 0 0 0.25rem rgba(88, 204, 2, 0.25);
  outline: none;
}

.translation-input:disabled {
  cursor: not-allowed;
  background-color: #f0f0f0;
  color: var(--color-text-muted, #afafaf);
}

/* =============================
   Multiple-Choice Options
   ============================= */
.option-item {
  border: 2px solid #dee2e6;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: #ffffff;
}

.option-item:hover:not(:disabled) {
  background-color: #f7f7f7;
  border-color: #c4c4c4;
}

.option-item.selected {
  border-color: var(--color-primary, #58cc02);
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

.option-item:disabled {
  cursor: not-allowed;
}

/* =============================
   Match Pairs
   ============================= */
.pairs-container {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.draggable-list {
  min-height: 200px;
}

.pair-item {
  cursor: grab;
  user-select: none;
  transition: all 0.2s ease;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  background-color: #ffffff;
}

.pair-item:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-color: #c4c4c4;
}

.pair-item:active {
  cursor: grabbing;
}
</style>