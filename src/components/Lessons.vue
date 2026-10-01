<template>
  <div class="lessons-container">
    <!-- Loading -->
    <div
      v-if="loading"
      class="d-flex flex-column justify-content-center align-items-center py-5"
      style="min-height: 60vh"
    >
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem">
        <span class="visually-hidden">Yükleniyor...</span>
      </div>
      <p class="mt-3 text-muted">Dersler yükleniyor...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="container py-5">
      <div class="alert alert-danger">
        <h5>⚠️ Hata</h5>
        <p>{{ error }}</p>
        <button class="btn btn-primary" @click="loadData">Tekrar Dene</button>
      </div>
    </div>

    <!-- Main Content -->
    <b-container v-else-if="currentLesson" class="main-content">
      <div class="row mt-4">
        <!-- LEFT: Lesson Path + Stats -->
        <div class="col-lg-3 mb-4">
          <div class="sticky-top pt-3">
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
                      active: lesson.id === currentLesson._id,
                      completed: lesson.completed,
                    }"
                    @click="selectLesson(lesson)"
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

            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">📊 Your Stats</h5>
                <div class="stats-grid">
                  <div class="stat-item text-center p-2">
                    <div class="stat-value text-primary fw-bold">{{ userStats.streakDays }}</div>
                    <div class="stat-label small">Day Streak</div>
                  </div>
                  <div class="stat-item text-center p-2">
                    <div class="stat-value text-success fw-bold">{{ userStats.totalXP }}</div>
                    <div class="stat-label small">Total XP</div>
                  </div>
                  <div class="stat-item text-center p-2">
                    <div class="stat-value text-info fw-bold">{{ userStats.accuracy }}%</div>
                    <div class="stat-label small">Accuracy</div>
                  </div>
                  <div class="stat-item text-center p-2">
                    <div class="stat-value text-warning fw-bold">{{ userStats.wordsLearned }}</div>
                    <div class="stat-label small">Words Learned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CENTER: Current Lesson -->
        <div class="col-lg-6 mb-4">
          <div class="card border-0 shadow-sm lesson-card">
            <div class="card-header bg-white border-0 pt-4">
              <h4 class="card-title mb-1">{{ currentLesson.title }}</h4>
              <p class="text-muted mb-0">{{ currentLesson.description }}</p>

              <div class="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <b-badge variant="light" class="me-2 p-2">
                    <span class="text-primary">⭐ XP:</span> {{ currentLesson.xpReward }}
                  </b-badge>
                  <b-badge variant="light" class="p-2">
                    <span class="text-success">💎 Gems:</span> {{ currentLesson.gemReward }}
                  </b-badge>
                </div>
                <div>
                  <span class="text-muted small">
                    Question {{ currentQuestionIndex + 1 }} of {{ currentLesson.questions.length }}
                  </span>
                </div>
              </div>

              <b-progress height="6px" :value="lessonProgress" :max="100" class="mt-2">
                <b-progress-bar
                  :value="lessonProgress"
                  variant="primary"
                  striped
                  animated
                ></b-progress-bar>
              </b-progress>
            </div>

            <div class="card-body">
              <!-- Question Area -->
              <div v-if="!lessonCompleted" class="question-area">
                <div class="question mb-4">
                  <h5 class="question-text">{{ currentQuestion.question }}</h5>
                  <div
                    v-if="currentQuestion.example"
                    class="example-text p-3 bg-light rounded mt-3"
                  >
                    <em>"{{ currentQuestion.example }}"</em>
                  </div>
                </div>

                <!-- Answer Options -->
                <div class="answer-options">
                  <!-- Multiple Choice -->
                  <div v-if="currentQuestion.type === 'multiple-choice'">
                    <b-list-group>
                      <b-list-group-item
                        v-for="(option, index) in currentQuestion.options"
                        :key="`${index}-${option.text}`"
                        button
                        class="mb-2 option-item"
                        :class="{
                          selected: selectedAnswer === index,
                          correct: answerSubmitted && option.correct,
                          incorrect:
                            answerSubmitted &&
                            selectedAnswer === index &&
                            !option.correct,
                        }"
                        :disabled="answerSubmitted"
                        @click="selectOption(index)"
                      >
                        <div class="d-flex justify-content-between align-items-center">
                          <span>{{ option.text }}</span>
                          <span
                            v-if="answerSubmitted && option.correct"
                            class="text-success"
                            >✓</span
                          >
                          <span
                            v-if="
                              answerSubmitted &&
                              selectedAnswer === index &&
                              !option.correct
                            "
                            class="text-danger"
                            >✗</span
                          >
                        </div>
                      </b-list-group-item>
                    </b-list-group>
                  </div>

                  <!-- Translation -->
                  <div v-else-if="currentQuestion.type === 'translation'">
                    <b-form-group>
                      <b-form-input
                        v-model="translationAnswer"
                        placeholder="Type the translation here..."
                        size="lg"
                        :disabled="answerSubmitted"
                        @keyup.enter="checkTranslation"
                      ></b-form-input>
                      <div class="mt-3">
                        <b-button
                          variant="primary"
                          size="lg"
                          :disabled="!translationAnswer || answerSubmitted"
                          class="w-100"
                          @click="checkTranslation"
                        >
                          Check Answer
                        </b-button>
                      </div>
                    </b-form-group>
                  </div>

                  <!-- Match Pairs -->
                  <div v-else-if="currentQuestion.type === 'match-pairs'">
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
                              @dragstart="dragStart(word.id, 'english')"
                              @dragover.prevent
                              @drop="drop(word.id, 'english')"
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
                              @dragstart="dragStart(word.id, 'spanish')"
                              @dragover.prevent
                              @drop="drop(word.id, 'spanish')"
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
                          @click="checkPairs"
                        >
                          Check Matching
                        </b-button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Feedback Message -->
                <div v-if="feedbackMessage" class="feedback mt-4">
                  <b-alert :variant="feedbackType" show class="d-flex align-items-center">
                    <b-icon :icon="feedbackIcon" scale="1.5" class="me-3"></b-icon>
                    <div>
                      <strong>{{ feedbackTitle }}</strong><br />
                      {{ feedbackMessage }}
                    </div>
                  </b-alert>
                </div>

                <!-- AI Feedback -->
                <AIFeedback ref="aiFeedback" />

                <!-- Action Buttons -->
                <div class="action-buttons mt-4">
                  <div class="d-flex justify-content-between">
                    <b-button
                      variant="outline-secondary"
                      :disabled="answerSubmitted"
                      @click="hint"
                    >
                      <b-icon icon="lightbulb"></b-icon> Hint
                    </b-button>

                    <div v-if="!answerSubmitted">
                      <b-button
                        variant="primary"
                        :disabled="selectedAnswer === null && !translationAnswer"
                        @click="submitAnswer"
                      >
                        Submit Answer
                      </b-button>
                    </div>
                    <div v-else>
                      <b-button variant="success" @click="nextQuestion">
                        {{ isLastQuestion ? 'Complete Lesson' : 'Next Question' }}
                        <b-icon icon="arrow-right" class="ms-1"></b-icon>
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Lesson Completed -->
              <div v-else class="lesson-completed text-center py-5">
                <div class="celebration mb-4">
                  <span class="display-1">🎉</span>
                </div>
                <h3 class="text-success">Lesson Complete!</h3>
                <p class="text-muted">
                  Great job! You've completed "{{ currentLesson.title }}"
                </p>

                <div
                  class="rewards-card p-4 bg-light rounded mx-auto mt-4"
                  style="max-width: 400px"
                >
                  <h5 class="mb-3">🏆 Your Rewards</h5>
                  <div class="d-flex justify-content-around">
                    <div class="text-center">
                      <div class="reward-value text-warning fs-3">
                        {{ currentLesson.xpReward }}
                      </div>
                      <div class="reward-label">XP Earned</div>
                    </div>
                    <div class="text-center">
                      <div class="reward-value text-info fs-3">
                        {{ currentLesson.gemReward }}
                      </div>
                      <div class="reward-label">Gems Earned</div>
                    </div>
                  </div>
                </div>

                <div class="mt-5">
                  <b-button
                    variant="primary"
                    size="lg"
                    class="me-3"
                    @click="continueLearning"
                  >
                    Continue Learning
                  </b-button>
                  <b-button variant="outline-secondary" block @click="goToDashboard">
                    <b-icon icon="house-door"></b-icon> Dashboard
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Vocabulary + Tips -->
        <div class="col-lg-3 mb-4">
          <div class="sticky-top pt-3">
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body">
                <h5 class="card-title d-flex justify-content-between align-items-center">
                  <span>📖 Vocabulary</span>
                  <b-badge variant="light">
                    {{ currentLesson.vocabulary?.length || 0 }} words
                  </b-badge>
                </h5>

                <b-list-group flush>
                  <b-list-group-item
                    v-for="(word, i) in currentLesson.vocabulary"
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
                      @click="pronounceWord(word.english)"
                    ></b-icon>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </div>

            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">💡 Tips</h5>
                <div class="tip-item mb-3">
                  <strong>Daily Practice</strong>
                  <p class="small text-muted mb-0">
                    Consistent daily practice is more effective than occasional long
                    sessions.
                  </p>
                </div>
                <div class="tip-item">
                  <strong>Review Mistakes</strong>
                  <p class="small text-muted mb-0">
                    Review incorrect answers to reinforce learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import AIFeedback from './AIFeedback.vue';
import { lessonsApi, progressApi } from '@/axios';

export default {
  name: 'Lessons',
  components: { AIFeedback },
  data() {
    return {
      // API'den gelecek
      lessonPath: [],
      currentLesson: null,
      userStats: {
        totalXP: 0,
        streakDays: 0,
        accuracy: 0,
        wordsLearned: 0,
      },

      // UI state
      loading: true,
      error: null,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      translationAnswer: '',
      answerSubmitted: false,
      feedbackMessage: '',
      feedbackTitle: '',
      feedbackType: 'info',
      feedbackIcon: 'info-circle',
      lessonCompleted: false,

      // Matching pairs
      englishWords: [],
      spanishWords: [],
      draggedItem: null,
    };
  },
  computed: {
    currentQuestion() {
      if (!this.currentLesson?.questions?.length) return {};
      return this.currentLesson.questions[this.currentQuestionIndex] || {};
    },
    isLastQuestion() {
      if (!this.currentLesson?.questions) return false;
      return this.currentQuestionIndex === this.currentLesson.questions.length - 1;
    },
    lessonProgress() {
      if (!this.currentLesson?.questions?.length) return 0;
      return (
        ((this.currentQuestionIndex + 1) / this.currentLesson.questions.length) * 100
      );
    },
    completedLessons() {
      return this.lessonPath.filter((l) => l.completed).length;
    },
    totalLessons() {
      return this.lessonPath.length;
    },
  },
  methods: {
    // =========================
    // DATA LOADING
    // =========================
    async loadData() {
      this.loading = true;
      this.error = null;

      try {
        const [lessons, progress] = await Promise.all([
          lessonsApi.getAll(),
          progressApi.get().catch((err) => {
            console.warn('[progress] API error, using empty:', err.message);
            return {
              completedLessons: [],
              totalXP: 0,
              streakDays: 0,
              accuracy: 0,
              wordsLearned: 0,
            };
          }),
        ]);

        const completedIds = new Set(
          (progress.completedLessons || []).map((l) =>
            typeof l === 'string' ? l : l._id
          )
        );

        this.lessonPath = lessons.map((l, idx) => ({
          id: l._id,
          title: l.title,
          description: l.description,
          order: l.order || idx + 1,
          completed: completedIds.has(l._id),
          status: completedIds.has(l._id)
            ? 'completed'
            : idx === 0 || completedIds.has(lessons[idx - 1]?._id)
            ? 'current'
            : 'locked',
        }));

        this.userStats = {
          totalXP: progress.totalXP || 0,
          streakDays: progress.streakDays || 0,
          accuracy: progress.accuracy || 0,
          wordsLearned: progress.wordsLearned || 0,
        };

        const current =
          this.lessonPath.find((l) => l.status === 'current') || this.lessonPath[0];
        if (current) {
          await this.loadLesson(current.id);
        }
      } catch (e) {
        console.error('[loadData] error:', e);
        this.error = e.message || 'Veri yüklenemedi.';
      } finally {
        this.loading = false;
      }
    },

    async loadLesson(lessonId) {
      try {
        const lesson = await lessonsApi.getById(lessonId);
        if (!lesson) throw new Error('Lesson not found');

        this.currentLesson = lesson;
        this.currentQuestionIndex = 0;
        this.lessonCompleted = false;
        this.resetQuestionState();
      } catch (e) {
        console.error('[loadLesson] error:', e);
        this.error = e.message;
      }
    },

    // =========================
    // ANSWER HANDLING
    // =========================
    selectOption(index) {
      if (!this.answerSubmitted) {
        this.selectedAnswer = index;
      }
    },

    submitAnswer() {
      if (this.currentQuestion.type === 'multiple-choice') {
        const isCorrect = this.currentQuestion.options[this.selectedAnswer].correct;
        this.showFeedback(isCorrect);
      }
      this.answerSubmitted = true;
    },

    async checkTranslation() {
      if (!this.translationAnswer) return;

      const userAnswer = this.translationAnswer.toLowerCase().trim();
      const correctAnswer = (this.currentQuestion.correctAnswer || '')
        .toLowerCase()
        .trim();
      const isCorrect = userAnswer === correctAnswer;

      this.showFeedback(isCorrect);
      this.answerSubmitted = true;

      try {
        if (this.$refs.aiFeedback) {
          await this.$refs.aiFeedback.evaluate(this.translationAnswer, 'translation');
        }
      } catch (e) {
        console.error('AI evaluation failed:', e);
      }
    },

    checkPairs() {
      let allCorrect = true;
      for (let i = 0; i < this.englishWords.length; i++) {
        if (this.englishWords[i].pairId !== this.spanishWords[i].pairId) {
          allCorrect = false;
          break;
        }
      }
      this.showFeedback(allCorrect);
      this.answerSubmitted = true;
    },

    dragStart(wordId, language) {
      if (!this.answerSubmitted) {
        this.draggedItem = { id: wordId, language };
      }
    },

    drop(targetId, targetLanguage) {
      if (!this.draggedItem || this.answerSubmitted) return;

      const { language: draggedLang, id: draggedId } = this.draggedItem;
      if (draggedLang === targetLanguage) return;

      const fromList =
        draggedLang === 'english' ? this.englishWords : this.spanishWords;
      const toList =
        targetLanguage === 'english' ? this.englishWords : this.spanishWords;

      const fromIdx = fromList.findIndex((w) => w.id === draggedId);
      const toIdx = toList.findIndex((w) => w.id === targetId);
      if (fromIdx === -1 || toIdx === -1) return;

      const temp = fromList[fromIdx];
      fromList[fromIdx] = toList[toIdx];
      toList[toIdx] = temp;

      this.draggedItem = null;
    },

    showFeedback(isCorrect) {
      if (isCorrect) {
        this.feedbackType = 'success';
        this.feedbackIcon = 'check-circle';
        this.feedbackTitle = 'Correct!';
        this.feedbackMessage = 'Great job! You earned 5 XP.';
        this.userStats.totalXP += 5;
      } else {
        this.feedbackType = 'danger';
        this.feedbackIcon = 'exclamation-circle';
        this.feedbackTitle = 'Not quite right';

        if (this.currentQuestion.type === 'multiple-choice') {
          const correctOption = this.currentQuestion.options.find((o) => o.correct);
          this.feedbackMessage = `The correct answer is: "${
            correctOption?.text || '—'
          }"`;
        } else if (this.currentQuestion.type === 'translation') {
          this.feedbackMessage = `The correct translation is: "${this.currentQuestion.correctAnswer}"`;
        } else {
          this.feedbackMessage = 'Try matching the pairs again.';
        }
      }
    },

    nextQuestion() {
      if (this.isLastQuestion) {
        this.completeLesson();
      } else {
        this.currentQuestionIndex++;
        this.resetQuestionState();
      }
    },

    resetQuestionState() {
      this.selectedAnswer = null;
      this.translationAnswer = '';
      this.answerSubmitted = false;
      this.feedbackMessage = '';

      if (this.$refs.aiFeedback) {
        this.$refs.aiFeedback.close();
      }

      if (this.currentQuestion.type === 'match-pairs') {
        this.initPairs();
      }
    },

    initPairs() {
      const pairs = this.currentQuestion.pairs || [];
      this.englishWords = this.shuffleArray(
        pairs.map((p, i) => ({ id: i, text: p.english, pairId: i }))
      );
      this.spanishWords = this.shuffleArray(
        pairs.map((p, i) => ({ id: i + 100, text: p.spanish, pairId: i }))
      );
    },

    shuffleArray(array) {
      return [...array].sort(() => Math.random() - 0.5);
    },

    async completeLesson() {
      this.lessonCompleted = true;

      const idx = this.lessonPath.findIndex((l) => l.id === this.currentLesson._id);
      if (idx !== -1) {
        this.lessonPath[idx].completed = true;
        this.lessonPath[idx].status = 'completed';
        if (idx + 1 < this.lessonPath.length) {
          this.lessonPath[idx + 1].status = 'current';
        }
      }

      this.userStats.totalXP += this.currentLesson.xpReward || 0;
      this.userStats.wordsLearned += this.currentLesson.vocabulary?.length || 0;

      try {
        await progressApi.update({
          lessonId: this.currentLesson._id,
          xp: this.currentLesson.xpReward || 0,
          words: this.currentLesson.vocabulary?.length || 0,
        });
      } catch (e) {
        console.warn('Progress update failed:', e);
      }
    },

    hint() {
      this.feedbackType = 'warning';
      this.feedbackIcon = 'lightbulb';
      this.feedbackTitle = 'Hint';

      if (this.currentQuestion.type === 'multiple-choice') {
        const correctIdx = this.currentQuestion.options.findIndex((o) => o.correct);
        this.feedbackMessage =
          correctIdx % 2 === 0
            ? 'The correct answer is in the first or third position.'
            : 'The correct answer is in the second or fourth position.';
      } else if (this.currentQuestion.type === 'translation') {
        const answer = this.currentQuestion.correctAnswer || '';
        const hint = answer.substring(0, Math.floor(answer.length / 2)) + '...';
        this.feedbackMessage = `Starts with: "${hint}"`;
      } else {
        this.feedbackMessage = 'Try matching the first pair.';
      }
    },

    // =========================
    // NAVIGATION
    // =========================
    async selectLesson(lesson) {
      if (lesson.status === 'locked') return;
      await this.loadLesson(lesson.id);
    },

    pronounceWord(word) {
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(word);
        u.lang = 'en-US';
        speechSynthesis.speak(u);
      }
    },

    async continueLearning() {
      const next = this.lessonPath.find((l) => l.status === 'current');
      if (next) {
        await this.loadLesson(next.id);
      }
    },

    goToDashboard() {
      this.$router.push('/dashboard');
    },
  },
  async mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }
    await this.loadData();
  },
};
</script>

<style scoped>
.lessons-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}
.main-content {
  padding-top: 20px;
}
.path-node {
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.path-node:hover:not(.active) {
  background-color: rgba(0, 123, 255, 0.1);
}
.path-node.active {
  background-color: rgba(0, 123, 255, 0.15);
  border-left: 4px solid #007bff;
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
.question-text {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.example-text {
  font-size: 1rem;
  color: #6c757d;
  border-left: 3px solid #007bff;
}
.option-item {
  border: 2px solid #dee2e6;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}
.option-item.selected {
  border-color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
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
.rewards-card {
  border: 2px dashed #dee2e6;
}
.reward-value {
  font-weight: bold;
}
.clickable {
  cursor: pointer;
}
</style>