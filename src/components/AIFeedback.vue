<template>
  <div v-if="visible" class="ai-feedback card border-0 shadow-sm mt-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-3">
        <h6 class="card-title mb-0">
          <span v-if="loading">🤖 AI Düşünüyor...</span>
          <span v-else-if="result?.is_correct" class="text-success">✅ Doğru!</span>
          <span v-else-if="result" class="text-danger">❌ Düzeltme Gerekli</span>
          <span v-else class="text-muted">🤖 AI Asistanı</span>
        </h6>
        <button
          v-if="!loading && result"
          class="btn-close btn-sm"
          @click="close"
          aria-label="Kapat"
        ></button>
      </div>

      <!-- Yükleniyor -->
      <div v-if="loading" class="text-center py-3">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Yükleniyor...</span>
        </div>
      </div>

      <!-- Hata -->
      <div v-else-if="error" class="alert alert-warning py-2 mb-0">
        ⚠️ {{ error }}
      </div>

      <!-- Sonuç -->
      <div v-else-if="result">
        <p class="mb-2">
          <strong>Senin cümlen:</strong>
          <em>{{ originalSentence }}</em>
        </p>

        <div v-if="!result.is_correct" class="mb-3">
          <p class="mb-1"><strong>Doğru hali:</strong></p>
          <p class="text-success fst-italic mb-2">{{ result.corrected }}</p>

          <ul class="list-unstyled mb-0">
            <li
              v-for="(err, i) in result.grammar_errors"
              :key="i"
              class="mb-2 small"
            >
              <span class="badge bg-warning text-dark me-2">{{ err.rule }}</span>
              <span>{{ err.explanation }}</span>
            </li>
          </ul>
        </div>

        <p class="text-muted small mb-2">
          <strong>Seviye:</strong> {{ result.cefr_level_estimate }}
          <span v-if="result.past_mistakes_used > 0" class="ms-3">
            <strong>Geçmiş hatalar:</strong> {{ result.past_mistakes_used }}
          </span>
          <span v-if="result.cached" class="ms-3 badge bg-info">cached</span>
        </p>

        <p class="fst-italic mb-0">💪 {{ result.encouragement }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { evaluateAnswer } from '@/axios';

export default {
  name: 'AIFeedback',
  data() {
    return {
      visible: false,
      loading: false,
      result: null,
      error: null,
      originalSentence: '',
    };
  },
  methods: {
    async evaluate(sentence, targetRule = 'general') {
      this.visible = true;
      this.loading = true;
      this.result = null;
      this.error = null;
      this.originalSentence = sentence;

      try {
        this.result = await evaluateAnswer(sentence, targetRule);
      } catch (e) {
        console.error('AI evaluation error:', e);
        this.error =
          e.response?.data?.error ||
          e.response?.data?.detail ||
          e.message ||
          'AI değerlendirme başarısız oldu.';
      } finally {
        this.loading = false;
      }
    },
    close() {
      this.visible = false;
      this.result = null;
      this.error = null;
    },
  },
};
</script>

<style scoped>
.ai-feedback {
  border-left: 4px solid #7c3aed !important;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>