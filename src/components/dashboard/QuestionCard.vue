<template>
  <div class="question-card">
    <!-- Question -->
    <div class="question mb-4">
      <h5 class="question-text">{{ question.question }}</h5>
      <div v-if="question.example" class="example-text p-3 rounded mt-3">
        <em>"{{ question.example }}"</em>
      </div>
    </div>

    <!-- Answer Options -->
    <div class="answer-options">
      <!-- =============================
           Multiple Choice
           ============================= -->
      <div v-if="question.type === 'multiple-choice'">
        <div class="options-list">
          <button
            v-for="(option, index) in question.options"
            :key="`${index}-${option.text}`"
            type="button"
            class="option-item"
            :class="{
              selected: selectedAnswer === index,
              correct: answerSubmitted && option.correct,
              incorrect:
                answerSubmitted && selectedAnswer === index && !option.correct,
            }"
            :disabled="answerSubmitted"
            @click="$emit('select-option', index)"
          >
            <span class="option-text">{{ option.text }}</span>
            <span
              v-if="answerSubmitted && option.correct"
              class="option-mark correct-mark"
              >✓</span
            >
            <span
              v-if="answerSubmitted && selectedAnswer === index && !option.correct"
              class="option-mark incorrect-mark"
              >✗</span
            >
          </button>
        </div>
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
        <button
          type="button"
          class="btn-duo btn-duo-primary w-100"
          :disabled="!translationAnswer || answerSubmitted"
          @click="$emit('check-translation')"
        >
          Check Answer
        </button>
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
                  class="pair-item mb-2 p-3"
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
                  class="pair-item mb-2 p-3"
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
            <button
              type="button"
              class="btn-duo btn-duo-primary"
              :disabled="answerSubmitted"
              @click="$emit('check-pairs')"
            >
              Check Matching
            </button>
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
  'update:translation-answer',
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
.options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  background-color: #ffffff;
  border: 2px solid var(--color-border, #e5e5e5);
  border-bottom: 4px solid var(--color-border, #e5e5e5);
  border-radius: 12px;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: 16px;
  color: var(--color-text, #3c3c3c);
  text-align: left;
  transition: transform 0.1s ease,
              background-color 0.15s ease,
              border-color 0.15s ease,
              border-bottom-width 0.1s ease;
}

.option-item:hover:not(:disabled) {
  background-color: var(--color-bg-hover, #f7f7f7);
  border-color: var(--color-border-hover, #c4c4c4);
  border-bottom-color: var(--color-border-hover, #c4c4c4);
}

.option-item:active:not(:disabled) {
  transform: translateY(2px);
  border-bottom-width: 2px;
}

.option-item.selected {
  border-color: var(--color-primary, #58cc02);
  border-bottom-color: var(--color-primary-dark, #3d9900);
  background-color: rgba(88, 204, 2, 0.08);
  color: var(--color-primary-dark, #3d9900);
}

.option-item.correct {
  border-color: var(--color-success, #58cc02);
  border-bottom-color: var(--color-success-dark, #3d9900);
  background-color: rgba(88, 204, 2, 0.12);
  color: var(--color-success-dark, #3d9900);
}

.option-item.incorrect {
  border-color: var(--color-error, #ff4b4b);
  border-bottom-color: #cc3b3b;
  background-color: rgba(255, 75, 75, 0.08);
  color: #cc3b3b;
}

.option-item:disabled {
  cursor: not-allowed;
}

.option-text {
  flex: 1;
}

.option-mark {
  font-size: 20px;
  font-weight: 900;
  margin-left: 12px;
}
.correct-mark { color: var(--color-success, #58cc02); }
.incorrect-mark { color: var(--color-error, #ff4b4b); }

/* =============================
   Match Pairs
   ============================= */
.pairs-container {
  background-color: var(--color-bg-input, #f7f7f7);
  padding: 1rem;
  border-radius: 12px;
}

.draggable-list {
  min-height: 200px;
}

.pair-item {
  cursor: grab;
  user-select: none;
  transition: all 0.2s ease;
  border: 2px solid var(--color-border, #e5e5e5);
  border-radius: 8px;
  background-color: #ffffff;
}

.pair-item:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-color: var(--color-border-hover, #c4c4c4);
}

.pair-item:active {
  cursor: grabbing;
}
</style>