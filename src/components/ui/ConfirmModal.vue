<template>
  <transition name="modal-fade">
    <div v-if="visible" class="confirm-modal-overlay" @click.self="handleCancel">
      <div class="confirm-modal">
        <!-- Icon -->
        <div class="confirm-modal__icon">
          {{ icon }}
        </div>

        <!-- Title -->
        <h3 class="confirm-modal__title">{{ title }}</h3>

        <!-- Message -->
        <p class="confirm-modal__message">{{ message }}</p>

        <!-- Actions -->
        <div class="confirm-modal__actions">
          <button
            class="confirm-modal__btn confirm-modal__btn--ghost"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
          <button
            class="confirm-modal__btn confirm-modal__btn--danger"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: 'Emin misin?' },
  message: { type: String, default: '' },
  icon: { type: String, default: '⚠️' },
  confirmText: { type: String, default: 'Tamam' },
  cancelText: { type: String, default: 'İptal' },
});

const emit = defineEmits(['confirm', 'cancel', 'update:visible']);

function handleConfirm() {
  emit('confirm');
  emit('update:visible', false);
}

function handleCancel() {
  emit('cancel');
  emit('update:visible', false);
}
</script>

<style scoped>
.confirm-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: var(--space-4);
}

.confirm-modal {
  background-color: #ffffff;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.confirm-modal__icon {
  font-size: 48px;
  line-height: 1;
  margin-bottom: var(--space-4);
}

.confirm-modal__title {
  font-family: var(--font-family);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-black);
  color: var(--color-text);
  margin: 0 0 var(--space-3);
}

.confirm-modal__message {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-6);
  line-height: var(--line-height-relaxed);
}

.confirm-modal__actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

@media (min-width: 480px) {
  .confirm-modal__actions {
    flex-direction: row-reverse;
  }
}

.confirm-modal__btn {
  flex: 1;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all var(--transition-fast);
}

.confirm-modal__btn--ghost {
  background-color: #ffffff;
  color: var(--color-text-secondary);
  border-color: var(--color-border);
}

.confirm-modal__btn--ghost:hover {
  background-color: #f7f7f7;
}

.confirm-modal__btn--danger {
  background-color: var(--color-error);
  color: #ffffff;
  box-shadow: 0 4px 0 0 #cc0000;
}

.confirm-modal__btn--danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 0 #cc0000;
}

.confirm-modal__btn--danger:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 0 #cc0000;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-active .confirm-modal,
.modal-fade-leave-active .confirm-modal {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .confirm-modal,
.modal-fade-leave-to .confirm-modal {
  transform: scale(0.9);
  opacity: 0;
}
</style>