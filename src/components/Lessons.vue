<template>
  <div class="lessons-container">
    <!-- Header with progress and user info -->
    <b-navbar class="lessons-header" fixed="top" variant="light" type="light">
      <b-container>
        <b-navbar-brand class="d-flex align-items-center">
          <span class="logo-text text-primary fw-bold">🌍 Duobingo</span>
        </b-navbar-brand>
        
        <div class="progress-section d-flex align-items-center">
          <div class="me-3 d-none d-md-block">
            <span class="text-muted">Day Streak</span>
            <div class="text-center">
              <span class="fs-4 fw-bold text-warning">🔥 7</span>
            </div>
          </div>
          
          <div class="xp-progress me-3">
            <span class="text-muted small">XP Today: {{ userXP }}/50</span>
            <b-progress height="8px" :value="userXP" :max="50" class="mt-1">
              <b-progress-bar :value="userXP" variant="success" animated></b-progress-bar>
            </b-progress>
          </div>
          
          <b-avatar variant="primary" :text="userInitials" class="fw-bold"></b-avatar>
        </div>
      </b-container>
    </b-navbar>

    <!-- Main Content -->
    <b-container class="main-content pt-5">
      <div class="row mt-4">
        <!-- Left sidebar - Lesson path -->
        <div class="col-lg-3 mb-4">
          <div class="sticky-top pt-3">
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body">
                <h5 class="card-title d-flex justify-content-between align-items-center">
                  <span>📚 Your Path</span>
                  <b-badge variant="info" pill>{{ completedLessons }}/{{ totalLessons }}</b-badge>
                </h5>
                
                <!-- Lesson Path Visualization -->
                <div class="lesson-path mt-3">
                  <div 
                    v-for="lesson in lessonPath" 
                    :key="lesson.id"
                    class="path-node d-flex align-items-center mb-3"
                    :class="{ 'active': lesson.id === currentLesson.id, 'completed': lesson.completed }"
                    @click="selectLesson(lesson)"
                  >
                    <div class="node-icon me-3">
                      <div class="circle" :class="lesson.status">
                        <span v-if="lesson.completed">✓</span>
                        <span v-else>{{ lesson.id }}</span>
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
            
            <!-- Stats Card -->
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">📊 Your Stats</h5>
                <div class="stats-grid">
                  <div class="stat-item text-center p-2">
                    <div class="stat-value text-primary fw-bold">{{ streakDays }}</div>
                    <div class="stat-label small">Day Streak</div>
                  </div>
                  <div class="stat-item text-center p-2">
                    <div class="stat-value text-success fw-bold">{{ totalXP }}</div>
                    <div class="stat-label small">Total XP</div>
                  </div>
                  <div class="stat-item text-center p-2">
                    <div class="stat-value text-info fw-bold">{{ accuracy }}%</div>
                    <div class="stat-label small">Accuracy</div>
                  </div>
                  <div class="stat-item text-center p-2">
                    <div class="stat-value text-warning fw-bold">{{ wordsLearned }}</div>
                    <div class="stat-label small">Words Learned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Center - Current Lesson -->
        <div class="col-lg-6 mb-4">
          <div class="card border-0 shadow-sm lesson-card">
            <div class="card-header bg-white border-0 pt-4">
              <h4 class="card-title mb-1">{{ currentLesson.title }}</h4>
              <p class="text-muted mb-0">{{ currentLesson.description }}</p>
              
              <!-- Lesson Progress -->
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
                  <span class="text-muted small">Question {{ currentQuestionIndex + 1 }} of {{ currentLesson.questions.length }}</span>
                </div>
              </div>
              
              <b-progress height="6px" :value="lessonProgress" :max="100" class="mt-2">
                <b-progress-bar :value="lessonProgress" variant="primary" striped animated></b-progress-bar>
              </b-progress>
            </div>

            <div class="card-body">
              <!-- Question Area -->
              <div v-if="!lessonCompleted" class="question-area">
                <!-- Current Question -->
                <div class="question mb-4">
                  <h5 class="question-text">{{ currentQuestion.question }}</h5>
                  <div v-if="currentQuestion.example" class="example-text p-3 bg-light rounded mt-3">
                    <em>"{{ currentQuestion.example }}"</em>
                  </div>
                </div>

                <!-- Answer Options -->
                <div class="answer-options">
                  <div v-if="currentQuestion.type === 'multiple-choice'">
                    <b-list-group>
                      <b-list-group-item 
                        v-for="(option, index) in currentQuestion.options" 
                        :key="index"
                        href="#"
                        class="mb-2 option-item"
                        :class="{
                          'selected': selectedAnswer === index,
                          'correct': answerSubmitted && option.correct,
                          'incorrect': answerSubmitted && selectedAnswer === index && !option.correct
                        }"
                        @click="selectOption(index)"
                        :disabled="answerSubmitted"
                      >
                        <div class="d-flex justify-content-between align-items-center">
                          <span>{{ option.text }}</span>
                          <span v-if="answerSubmitted && option.correct" class="text-success">✓</span>
                          <span v-if="answerSubmitted && selectedAnswer === index && !option.correct" class="text-danger">✗</span>
                        </div>
                      </b-list-group-item>
                    </b-list-group>
                  </div>

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
                          @click="checkTranslation"
                          class="w-100"
                        >
                          Check Answer
                        </b-button>
                      </div>
                    </b-form-group>
                  </div>

                  <div v-else-if="currentQuestion.type === 'match-pairs'">
                    <div class="pairs-container">
                      <div class="row">
                        <div class="col-6">
                          <h6 class="text-center mb-3">English</h6>
                          <draggable 
                            v-model="englishWords" 
                            group="pairs" 
                            class="draggable-list"
                            @end="checkPairs"
                          >
                            <div 
                              v-for="word in englishWords" 
                              :key="word.id"
                              class="pair-item mb-2 p-3 bg-white border rounded"
                            >
                              {{ word.text }}
                            </div>
                          </draggable>
                        </div>
                        <div class="col-6">
                          <h6 class="text-center mb-3">Spanish</h6>
                          <draggable 
                            v-model="spanishWords" 
                            group="pairs" 
                            class="draggable-list"
                            @end="checkPairs"
                          >
                            <div 
                              v-for="word in spanishWords" 
                              :key="word.id"
                              class="pair-item mb-2 p-3 bg-white border rounded"
                            >
                              {{ word.text }}
                            </div>
                          </draggable>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Feedback Message -->
                <div v-if="feedbackMessage" class="feedback mt-4">
                  <b-alert 
                    :variant="feedbackType" 
                    show
                    class="d-flex align-items-center"
                  >
                    <b-icon :icon="feedbackIcon" scale="1.5" class="me-3"></b-icon>
                    <div>
                      <strong>{{ feedbackTitle }}</strong><br>
                      {{ feedbackMessage }}
                    </div>
                  </b-alert>
                </div>

                <!-- Action Buttons -->
                <div class="action-buttons mt-4">
                  <div class="d-flex justify-content-between">
                    <b-button 
                      variant="outline-secondary"
                      @click="hint"
                      :disabled="answerSubmitted"
                    >
                      <b-icon-lightbulb></b-icon-lightbulb> Hint
                    </b-button>
                    
                    <div v-if="!answerSubmitted">
                      <b-button 
                        variant="primary"
                        @click="submitAnswer"
                        :disabled="selectedAnswer === null && !translationAnswer"
                      >
                        Submit Answer
                      </b-button>
                    </div>
                    <div v-else>
                      <b-button 
                        variant="success"
                        @click="nextQuestion"
                      >
                        {{ isLastQuestion ? 'Complete Lesson' : 'Next Question' }}
                        <b-icon-arrow-right class="ms-1"></b-icon-arrow-right>
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Lesson Completed View -->
              <div v-else class="lesson-completed text-center py-5">
                <div class="celebration mb-4">
                  <span class="display-1">🎉</span>
                </div>
                <h3 class="text-success">Lesson Complete!</h3>
                <p class="text-muted">Great job! You've completed "{{ currentLesson.title }}"</p>
                
                <div class="rewards-card p-4 bg-light rounded mx-auto mt-4" style="max-width: 400px;">
                  <h5 class="mb-3">🏆 Your Rewards</h5>
                  <div class="d-flex justify-content-around">
                    <div class="text-center">
                      <div class="reward-value text-warning fs-3">{{ currentLesson.xpReward }}</div>
                      <div class="reward-label">XP Earned</div>
                    </div>
                    <div class="text-center">
                      <div class="reward-value text-info fs-3">{{ currentLesson.gemReward }}</div>
                      <div class="reward-label">Gems Earned</div>
                    </div>
                    <div class="text-center">
                      <div class="reward-value text-success fs-3">{{ streakBonus }}</div>
                      <div class="reward-label">Streak Bonus</div>
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
                  <b-button 
                    variant="outline-primary" 
                    size="lg"
                    @click="goToDashboard"
                  >
                    Back to Dashboard
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right sidebar - Vocabulary and Tips -->
        <div class="col-lg-3 mb-4">
          <div class="sticky-top pt-3">
            <!-- Vocabulary Card -->
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body">
                <h5 class="card-title d-flex justify-content-between align-items-center">
                  <span>📖 Vocabulary</span>
                  <b-badge variant="light">{{ currentLesson.vocabulary.length }} words</b-badge>
                </h5>
                
                <b-list-group flush>
                  <b-list-group-item 
                    v-for="word in currentLesson.vocabulary" 
                    :key="word.id"
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{{ word.english }}</strong><br>
                      <small class="text-muted">{{ word.spanish }}</small>
                    </div>
                <b-icon-volumeUp 
                    variant="primary" 
                    class="clickable"
                    @click="pronounceWord(word.english)"
                    ></b-icon-volumeUp>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </div>

            <!-- Tips Card -->
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">💡 Tips</h5>
                <div class="tip-item mb-3">
                  <strong>Daily Practice</strong>
                  <p class="small text-muted mb-0">Consistent daily practice is more effective than occasional long sessions.</p>
                </div>
                <div class="tip-item mb-3">
                  <strong>Listen & Repeat</strong>
                  <p class="small text-muted mb-0">Use the pronunciation feature to improve your accent.</p>
                </div>
                <div class="tip-item">
                  <strong>Review Mistakes</strong>
                  <p class="small text-muted mb-0">Review incorrect answers to reinforce learning.</p>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="mt-3">
              <b-button 
                variant="outline-danger" 
                block 
                class="mb-2"
                @click="logout"
              >
                <b-icon-box-arrow-right></b-icon-box-arrow-right> Logout
              </b-button>
              <b-button 
                variant="outline-secondary" 
                block
                @click="goToDashboard"
              >
                <b-icon-house-door></b-icon-house-door> Dashboard
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: "Lessons",
  components: {
    draggable
  },
  data() {
    return {
      // User stats
      userXP: 15,
      totalXP: 1250,
      streakDays: 7,
      accuracy: 92,
      wordsLearned: 245,
      streakBonus: 5,
      
      // Current lesson state
      currentQuestionIndex: 0,
      selectedAnswer: null,
      translationAnswer: '',
      answerSubmitted: false,
      feedbackMessage: '',
      feedbackTitle: '',
      feedbackType: 'info',
      feedbackIcon: 'info-circle',
      lessonCompleted: false,
      
      // Matching pairs state
      englishWords: [
        { id: 1, text: 'Hello', pairId: 1 },
        { id: 2, text: 'Goodbye', pairId: 2 },
        { id: 3, text: 'Thank you', pairId: 3 }
      ],
      spanishWords: [
        { id: 4, text: 'Adiós', pairId: 2 },
        { id: 5, text: 'Hola', pairId: 1 },
        { id: 6, text: 'Gracias', pairId: 3 }
      ],
      
      // Lesson path data
      lessonPath: [
        { id: 1, title: 'Basics 1', description: 'Greetings and essentials', completed: true, status: 'completed' },
        { id: 2, title: 'Basics 2', description: 'Common phrases', completed: true, status: 'completed' },
        { id: 3, title: 'Food', description: 'Restaurant vocabulary', completed: true, status: 'completed' },
        { id: 4, title: 'Travel', description: 'Directions and transportation', completed: false, status: 'current' },
        { id: 5, title: 'Family', description: 'Family members', completed: false, status: 'locked' },
        { id: 6, title: 'Shopping', description: 'Store vocabulary', completed: false, status: 'locked' }
      ],
      
      // Current lesson data
      currentLesson: {
        id: 4,
        title: 'Travel',
        description: 'Learn vocabulary for directions and transportation',
        xpReward: 25,
        gemReward: 10,
        vocabulary: [
          { id: 1, english: 'Airport', spanish: 'Aeropuerto' },
          { id: 2, english: 'Train station', spanish: 'Estación de tren' },
          { id: 3, english: 'Taxi', spanish: 'Taxi' },
          { id: 4, english: 'Map', spanish: 'Mapa' },
          { id: 5, english: 'Directions', spanish: 'Direcciones' }
        ],
        questions: [
          {
            id: 1,
            type: 'multiple-choice',
            question: 'How do you say "Airport" in Spanish?',
            example: 'I need to go to the airport.',
            options: [
              { text: 'Aeropuerto', correct: true },
              { text: 'Aeroplano', correct: false },
              { text: 'Avión', correct: false },
              { text: 'Terminal', correct: false }
            ]
          },
          {
            id: 2,
            type: 'translation',
            question: 'Translate to Spanish: "Where is the train station?"',
            example: 'This phrase is useful when traveling.',
            correctAnswer: '¿Dónde está la estación de tren?'
          },
          {
            id: 3,
            type: 'match-pairs',
            question: 'Match the English words with their Spanish translations',
            example: 'Drag and drop to match the pairs'
          },
          {
            id: 4,
            type: 'multiple-choice',
            question: 'What does "Taxi" mean in English?',
            example: 'We took a taxi to the hotel.',
            options: [
              { text: 'Bus', correct: false },
              { text: 'Train', correct: false },
              { text: 'Taxi (same word)', correct: true },
              { text: 'Airplane', correct: false }
            ]
          }
        ]
      }
    };
  },
  computed: {
    userInitials() {
      const user = JSON.parse(localStorage.getItem('user') || '{"email": "user@example.com"}');
      const email = user.email || 'user@example.com';
      return email.substring(0, 2).toUpperCase();
    },
    currentQuestion() {
      return this.currentLesson.questions[this.currentQuestionIndex];
    },
    isLastQuestion() {
      return this.currentQuestionIndex === this.currentLesson.questions.length - 1;
    },
    lessonProgress() {
      return ((this.currentQuestionIndex + 1) / this.currentLesson.questions.length) * 100;
    },
    completedLessons() {
      return this.lessonPath.filter(lesson => lesson.completed).length;
    },
    totalLessons() {
      return this.lessonPath.length;
    }
  },
  methods: {
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
    checkTranslation() {
      if (!this.translationAnswer) return;
      
      const userAnswer = this.translationAnswer.toLowerCase().trim();
      const correctAnswer = this.currentQuestion.correctAnswer.toLowerCase().trim();
      const isCorrect = userAnswer === correctAnswer;
      
      this.showFeedback(isCorrect);
      this.answerSubmitted = true;
    },
    checkPairs() {
      // Check if all pairs are correctly matched
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
    showFeedback(isCorrect) {
      if (isCorrect) {
        this.feedbackType = 'success';
        this.feedbackIcon = 'check-circle';
        this.feedbackTitle = 'Correct!';
        this.feedbackMessage = 'Great job! You earned 5 XP.';
        this.userXP += 5;
        this.totalXP += 5;
      } else {
        this.feedbackType = 'danger';
        this.feedbackIcon = 'exclamation-circle';
        this.feedbackTitle = 'Not quite right';
        
        if (this.currentQuestion.type === 'multiple-choice') {
          const correctOption = this.currentQuestion.options.find(opt => opt.correct);
          this.feedbackMessage = `The correct answer is: "${correctOption.text}"`;
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
      
      // Reset matching pairs
      if (this.currentQuestion.type === 'match-pairs') {
        this.englishWords = this.shuffleArray([...this.englishWords]);
        this.spanishWords = this.shuffleArray([...this.spanishWords]);
      }
    },
    shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    completeLesson() {
      this.lessonCompleted = true;
      
      // Mark current lesson as completed
      const currentLessonIndex = this.lessonPath.findIndex(lesson => lesson.id === this.currentLesson.id);
      if (currentLessonIndex !== -1) {
        this.lessonPath[currentLessonIndex].completed = true;
        this.lessonPath[currentLessonIndex].status = 'completed';
        
        // Unlock next lesson
        if (currentLessonIndex + 1 < this.lessonPath.length) {
          this.lessonPath[currentLessonIndex + 1].status = 'current';
        }
      }
      
      // Add rewards
      this.userXP += this.currentLesson.xpReward;
      this.totalXP += this.currentLesson.xpReward + this.streakBonus;
      this.wordsLearned += this.currentLesson.vocabulary.length;
    },
    hint() {
      this.feedbackType = 'warning';
      this.feedbackIcon = 'lightbulb';
      this.feedbackTitle = 'Hint';
      
      if (this.currentQuestion.type === 'multiple-choice') {
        const correctOption = this.currentQuestion.options.find(opt => opt.correct);
        const options = this.currentQuestion.options.map(opt => opt.text);
        const correctIndex = options.indexOf(correctOption.text);
        
        if (correctIndex === 0 || correctIndex === 2) {
          this.feedbackMessage = 'The correct answer is in the first or third position.';
        } else {
          this.feedbackMessage = 'The correct answer is in the second or fourth position.';
        }
      } else if (this.currentQuestion.type === 'translation') {
        const answer = this.currentQuestion.correctAnswer;
        const hint = answer.substring(0, Math.floor(answer.length / 2)) + '...';
        this.feedbackMessage = `Starts with: "${hint}"`;
      } else {
        this.feedbackMessage = 'Try matching "Hello" with "Hola" first.';
      }
    },
    selectLesson(lesson) {
      if (lesson.status !== 'locked') {
        // In a real app, this would load the selected lesson
        this.$bvToast.toast(`Loading ${lesson.title}...`, {
          title: 'Lesson Selected',
          variant: 'info',
          solid: true
        });
      }
    },
    pronounceWord(word) {
      // In a real app, this would use the Web Speech API
      this.$bvToast.toast(`Pronouncing: "${word}"`, {
        title: 'Pronunciation',
        variant: 'info',
        solid: true,
        autoHideDelay: 1000
      });
    },
    continueLearning() {
      // Find next unlocked lesson
      const nextLesson = this.lessonPath.find(lesson => lesson.status === 'current');
      if (nextLesson) {
        // Reset for new lesson
        this.currentQuestionIndex = 0;
        this.lessonCompleted = false;
        this.resetQuestionState();
        
        // Update current lesson (in real app, would fetch new lesson data)
        this.currentLesson.title = nextLesson.title;
        this.currentLesson.description = nextLesson.description;
        
        this.$bvToast.toast(`Starting ${nextLesson.title}`, {
          title: 'New Lesson',
          variant: 'success',
          solid: true
        });
      }
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  },
  mounted() {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.lessons-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.lessons-header {
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 0.5rem 0;
}

.logo-text {
  font-size: 1.5rem;
}

.progress-section {
  min-width: 250px;
}

.main-content {
  padding-top: 80px;
}

/* Lesson Path Styles */
.path-node {
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.path-node:hover:not(.active) {
  background-color: rgba(0,123,255,0.1);
}

.path-node.active {
  background-color: rgba(0,123,255,0.15);
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

/* Question Styles */
.question-text {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.example-text {
  font-size: 1rem;
  color: #6c757d;
  border-left: 3px solid #007bff;
}

/* Answer Options */
.option-item {
  border: 2px solid #dee2e6;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.option-item:hover:not(.disabled) {
  border-color: #007bff;
  background-color: rgba(0,123,255,0.05);
}

.option-item.selected {
  border-color: #007bff;
  background-color: rgba(0,123,255,0.1);
}

.option-item.correct {
  border-color: #28a745;
  background-color: rgba(40,167,69,0.1);
}

.option-item.incorrect {
  border-color: #dc3545;
  background-color: rgba(220,53,69,0.1);
}

/* Matching Pairs */
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
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* Stats Grid */
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

/* Rewards */
.rewards-card {
  border: 2px dashed #dee2e6;
}

.reward-value {
  font-weight: bold;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .progress-section {
    min-width: auto;
  }
  
  .lesson-card {
    margin-top: 1rem;
  }
}

.clickable {
  cursor: pointer;
}
</style>