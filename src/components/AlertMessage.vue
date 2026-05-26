<template>
  <div v-if="message" class="alert" :class="alertClass" role="alert">
    {{ message }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: { type: String, default: '' },
  variant: { type: String, default: 'danger' },
})

const alertClass = computed(() => `alert-${props.variant}`)
</script>
