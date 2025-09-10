<!-- components/ui/ProgressBar.vue -->
<template>
  <div class="progress-bar-container">
    <div class="progress-info" v-if="showInfo">
      <span>{{ label }}</span>
      <span>{{ progress }}%</span>
    </div>
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${progress}%` }"
        :class="{
          'progress-success': progress === 100,
          'progress-error': error,
          'progress-warning': progress > 0 && progress < 100
        }"
      ></div>
    </div>
    <div class="progress-message" v-if="message">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    default: 'Progreso'
  },
  message: {
    type: String,
    default: ''
  },
  error: {
    type: Boolean,
    default: false
  },
  showInfo: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.progress-bar-container {
  width: 100%;
  margin: 1rem 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.progress-bar {
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-success {
  background-color: #10b981;
}

.progress-error {
  background-color: #ef4444;
}

.progress-warning {
  background-color: #f59e0b;
}

.progress-message {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
}
</style>