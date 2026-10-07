<template>
  <div class="lessons-container">
    <DashboardHeader
      :streak="userStats.streakDays"
      :gems="userStats.totalXP"
      :hearts="5"
      :user-name="userName"
      :user-email="userEmail"
      active-nav="learn"
      @profile="handleProfile"
      @settings="handleSettings"
      @change-password="handleChangePassword"
      @logout="handleLogout"
    />

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
    <div v-else-if="error" class="container-tight py-5">
      <div class="alert alert-danger">
        <h5>⚠️ Hata</h5>
        <p>{{ error }}</p>
        <button class="btn btn-primary" @click="loadData">Tekrar Dene</button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="currentLesson" class="container-tight main-content">
      <div class="row mt-4">
        <!-- LEFT -->
        <div class="col-lg-3 mb-4">
          <div class="sticky-top pt-3">
            <LessonPathCard
              :lesson-path="lessonPath"
              :current-lesson-id="currentLesson._id"
              :stats="userStats"
              @select="selectLesson"
            />
          </div>
        </div>

        <!-- CENTER -->
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
                <b-progress-bar :value="lessonProgress" variant="primary" striped animated></b-progress-bar>
              </b-progress>
            </div>

            <div class="card-body">
              <QuestionCard
                v-if="!lessonCompleted"
                :question="currentQuestion"
                :selected-answer="selectedAnswer"
                :translation-answer="translationAnswer"
                :answer-submitted="answerSubmitted"
                :english-words="englishWords"
                :spanish-words="spanishWords"
                @select-option="selectOption"
                @update:translationAnswer="translationAnswer = $event"
                @check-translation="checkTranslation"
                @drag-start="dragStart"
                @drop="drop"
                @check-pairs="checkPairs"
              />

              <div v-if="feedbackMessage && !lessonCompleted" class="feedback mt-4">
                <b-alert :variant="feedbackType" show class="d-flex align-items-center">
                  <b-icon :icon="feedbackIcon" scale="1.5" class="me-3"></b-icon>
                  <div>
                    <strong>{{ feedbackTitle }}</strong><br />
                    {{ feedbackMessage }}
                  </div>
                </b-alert>
              </div>

              <AIFeedback v-if="!lessonCompleted" ref="aiFeedback" />

              <div v-if="!lessonCompleted" class="action-buttons mt-4">
                <div class="d-flex justify-content-between">
                  <b-button variant="outline-secondary" :disabled="answerSubmitted" @click="hint">
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

              <LessonComplete
                v-if="lessonCompleted"
                :lesson-title="currentLesson.title"
                :xp-reward="currentLesson.xpReward"
                :gem-reward="currentLesson.gemReward"
                @continue="continueLearning"
                @dashboard="continueLearning"
              />
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="col-lg-3 mb-4">
          <div class="sticky-top pt-3">
            <VocabularyCard
              :vocabulary="currentLesson.vocabulary || []"
              class="mb-4"
              @pronounce="pronounceWord"
            />
            <TipsCard />
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Modals -->
    <ConfirmModal
      :visible="showLogoutModal"
      icon="🚪"
      title="Çıkış yapmak istiyor musun?"
      message="Hesabından çıkış yapmak üzeresin. Devam etmek istiyor musun?"
      confirm-text="Çıkış Yap"
      cancel-text="İptal"
      @confirm="confirmLogout"
      @update:visible="showLogoutModal = $event"
    />

    <ConfirmModal
      :visible="showChangePasswordModal"
      icon="🔒"
      title="Şifre Değiştir"
      message="Şifre değiştirme özelliği yakında eklenecek."
      confirm-text="Tamam"
      cancel-text="Kapat"
      @confirm="showChangePasswordModal = false"
      @update:visible="showChangePasswordModal = $event"
    />
  </div>
</template>

<script>
import AIFeedback from './AIFeedback.vue';
import DashboardHeader from './dashboard/DashboardHeader.vue';
import LessonPathCard from './dashboard/LessonPathCard.vue';
import QuestionCard from './dashboard/QuestionCard.vue';
import VocabularyCard from './dashboard/VocabularyCard.vue';
import TipsCard from './dashboard/TipsCard.vue';
import LessonComplete from './dashboard/LessonComplete.vue';
import ConfirmModal from './ui/ConfirmModal.vue';
import { lessonsApi, progressApi } from '@/axios';

export default {
  name: 'Lessons',
  components: {
    AIFeedback,
    DashboardHeader,
    LessonPathCard,
    QuestionCard,
    VocabularyCard,
    TipsCard,
    LessonComplete,
    ConfirmModal,
  },
  data() {
    return {
      // User
      userName: '',
      userEmail: '',

      // Data
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

      // Modals
      showLogoutModal: false,
      showChangePasswordModal: false,
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
      return ((this.currentQuestionIndex + 1) / this.currentLesson.questions.length) * 100;
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
          progressApi.get().catch(() => ({
            completedLessons: [],
            totalXP: 0,
            streakDays: 0,
            accuracy: 0,
            wordsLearned: 0,
          })),
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
        this.error = e.message;
      }
    },

    // =========================
    // ANSWER HANDLING
    // =========================
    selectOption(index) {
      if (!this.answerSubmitted) this.selectedAnswer = index;
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
      const correctAnswer = (this.currentQuestion.correctAnswer || '').toLowerCase().trim();
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

      const fromList = draggedLang === 'english' ? this.englishWords : this.spanishWords;
      const toList = targetLanguage === 'english' ? this.englishWords : this.spanishWords;

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
          this.feedbackMessage = `The correct answer is: "${correctOption?.text || '—'}"`;
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

      if (this.$refs.aiFeedback) this.$refs.aiFeedback.close();

      if (this.currentQuestion.type === 'match-pairs') this.initPairs();
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
        this.feedbackMessage = correctIdx % 2 === 0
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
      if (next) await this.loadLesson(next.id);
    },

    // =========================
    // DROPDOWN / MODAL HANDLERS
    // =========================
    handleProfile() {
      console.log('[profile] Profile page');
    },

    handleSettings() {
      console.log('[settings] Settings page');
    },

    handleChangePassword() {
      this.showChangePasswordModal = true;
    },

    handleLogout() {
      this.showLogoutModal = true;
    },

    confirmLogout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
  },
  async mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userEmail = payload.email || '';
      this.userName = this.userEmail ? this.userEmail.split('@')[0] : 'User';
    } catch (e) {
      console.warn('[auth] Invalid token:', e.message);
    }

    await this.loadData();
  },
};
</script>

<style scoped>
.lessons-container {
  background-color: #FFFFFF;
  min-height: 100vh;
}

.main-content {
  padding-top: 20px;
  padding-bottom: 40px;
}

:deep(.sticky-top) {
  z-index: 1 !important;
}
</style>