<template>
  <div :class="['icon-badge', `icon-badge--${color}`, `icon-badge--${size}`]">
    <i :class="[`bi`, `bi-${icon}`]" aria-hidden="true"></i>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true, // Bootstrap Icons name, e.g. 'controller', 'fire', 'globe'
  },
  color: {
    type: String,
    default: 'green', // green | orange | blue | purple | red | yellow
  },
  size: {
    type: String,
    default: 'md', // sm | md | lg
  },
});
</script>

<style scoped>
.icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

/* =============================
 * Sizes
 * ============================= */
.icon-badge--sm {
  width: 40px;
  height: 40px;
  font-size: 18px;
}
.icon-badge--md {
  width: 56px;
  height: 56px;
  font-size: 24px;
}
.icon-badge--lg {
  width: 72px;
  height: 72px;
  font-size: 32px;
}

/* =============================
 * Colors (Duolingo palette — pastel backgrounds)
 * ============================= */
.icon-badge--green {
  background-color: #E5F8D5;
  color: #58CC02;
}
.icon-badge--orange {
  background-color: #FFF2D9;
  color: #FF9600;
}
.icon-badge--blue {
  background-color: #DDF4FF;
  color: #1CB0F6;
}
.icon-badge--purple {
  background-color: #F3E5FF;
  color: #CE82FF;
}
.icon-badge--red {
  background-color: #FFDFE0;
  color: #FF4B4B;
}
.icon-badge--yellow {
  background-color: #FFF6D1;
  color: #FFC800;
}
</style>