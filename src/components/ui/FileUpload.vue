<!-- components/ui/FileUpload.vue -->
<template>
  <div class="file-upload-container">
    <input
      type="file"
      :id="id"
      :accept="accept"
      @change="handleFileSelect"
      class="file-input"
      ref="fileInput"
    />
    
    <label :for="id" class="file-upload-label">
      <div class="upload-content">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <span>{{ label }}</span>
      </div>
    </label>
    
    <div v-if="selectedFile" class="file-info">
      <span class="file-name">{{ selectedFile.name }}</span>
      <button 
        @click="removeFile" 
        class="remove-file-button"
        type="button"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <ProgressBar
      v-if="showProgress"
      :progress="progress"
      :message="progressMessage"
      :error="!!error"
    />
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProgressBar from './ProgressBar.vue'

const props = defineProps({
  id: {
    type: String,
    default: 'file-upload'
  },
  accept: {
    type: String,
    default: '.glb'
  },
  label: {
    type: String,
    default: 'Seleccionar archivo'
  },
  progress: {
    type: Number,
    default: 0
  },
  error: {
    type: String,
    default: ''
  },
  showProgress: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['file-selected', 'file-removed'])

const fileInput = ref(null)
const selectedFile = ref(null)

const progressMessage = computed(() => {
  if (props.progress === 0) return 'Preparando subida...'
  if (props.progress === 100) return '¡Subida completada!'
  return `Subiendo... ${props.progress}%`
})

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validar tipo de archivo
    if (props.accept && !file.name.toLowerCase().endsWith('.glb')) {
      emit('file-selected', null)
      return
    }
    
    selectedFile.value = file
    emit('file-selected', file)
  }
}

const removeFile = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('file-removed')
}
</script>

<style scoped>
.file-upload-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.file-input {
  display: none;
}

.file-upload-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.file-upload-label:hover {
  background-color: #f1f5f9;
  border-color: #93c5fd;
}

.upload-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #f1f5f9;
  border-radius: 6px;
}

.file-name {
  font-size: 0.875rem;
  color: #475569;
}

.remove-file-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  padding: 0.25rem;
  border-radius: 4px;
}

.remove-file-button:hover {
  color: #ef4444;
  background-color: #fef2f2;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>