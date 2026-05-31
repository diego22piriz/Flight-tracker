<template>
  <header class="sketch-header">
    <div class="sketch-header__inner">
      <router-link class="sketch-header__title" to="/">Rastreador de vuelos</router-link>
      <ul class="sketch-header__nav">
        <li>
          <router-link class="sketch-header__link" active-class="router-link-active" to="/">
            Buscar
          </router-link>
        </li>
        <li>
          <router-link
            class="sketch-header__link"
            active-class="router-link-active"
            to="/favoritos"
          >
            Guardados
            <span v-if="favoriteCount" class="sketch-header__badge">{{ favoriteCount }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { getFavorites } from '../services/favorites.js'

const favoriteCount = ref(0)

function refreshCount() {
  favoriteCount.value = getFavorites().length
}

onMounted(() => {
  refreshCount()
  window.addEventListener('favorites-updated', refreshCount)
})

onUnmounted(() => {
  window.removeEventListener('favorites-updated', refreshCount)
})
</script>
