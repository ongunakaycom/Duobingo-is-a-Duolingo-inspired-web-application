<template>
  <button
    :class="[
      'tactile-btn',
      `tactile-btn--${variant}`,
      `tactile-btn--${size}`,
      { 'tactile-btn--block': block },
    ]"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary', // primary | secondary | ghost | warning
  },
  size: {
    type: String,
    default: 'md', // sm | md | lg
  },
  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button', // button | submit | reset
  },
});

defineEmits(['click']);
</script>

<style scoped>
.tactile-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-family);
  font-weight: var(--font-weight-black);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
  white-space: nowrap;
}

.tactile-btn--block {
  display: flex;
  width: 100%;
}

/* =============================
 * Sizes
 * ============================= */
.tactile-btn--sm {
  padding: 10px 20px;
  font-size: var(--font-size-sm);
}
.tactile-btn--md {
  padding: 14px 28px;
  font-size: var(--font-size-base);
}
.tactile-btn--lg {
  padding: 18px 32px;
  font-size: var(--font-size-lg);
}

/* =============================
 * Primary (Duolingo green)
 * ============================= */
.tactile-btn--primary {
  background-color: var(--color-primary);
  color: #ffffff;
  box-shadow: var(--shadow-3d-primary);
}
.tactile-btn--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 0 var(--color-primary-dark);
}
.tactile-btn--primary:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow: 0 2px 0 0 var(--color-primary-dark);
}

/* =============================
 * Secondary (Blue)
 * ============================= */
.tactile-btn--secondary {
  background-color: var(--color-secondary);
  color: #ffffff;
  box-shadow: var(--shadow-3d-secondary);
}
.tactile-btn--secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 0 var(--color-secondary-dark);
}
.tactile-btn--secondary:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow: 0 2px 0 0 var(--color-secondary-dark);
}

/* =============================
 * Ghost (White with border)
 * ============================= */
.tactile-btn--ghost {
  background-color: #ffffff;
  color: var(--color-secondary);
  border: 2px solid var(--color-border);
  box-shadow: 0 2px 0 0 var(--color-border);
}
.tactile-btn--ghost:hover:not(:disabled) {
  background-color: #f8f8f8;
  transform: translateY(-2px);
  box-shadow: 0 4px 0 0 var(--color-border);
}
.tactile-btn--ghost:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow: 0 0 0 0 var(--color-border);
}

/* =============================
 * Warning (Orange)
 * ============================= */
.tactile-btn--warning {
  background-color: var(--color-warning);
  color: #ffffff;
  box-shadow: var(--shadow-3d-warning);
}
.tactile-btn--warning:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 0 #E58600;
}
.tactile-btn--warning:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow: 0 2px 0 0 #E58600;
}

/* =============================
 * Disabled
 * ============================= */
.tactile-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}
</style>