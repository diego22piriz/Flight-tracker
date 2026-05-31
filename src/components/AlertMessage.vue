<template>
  <div v-if="message" class="sketch-alert" :class="alertClass" role="alert">
    {{ message }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: { type: String, default: '' },
  variant: { type: String, default: 'danger' },
})

const alertClass = computed(() => `sketch-alert--${props.variant}`)
</script>
