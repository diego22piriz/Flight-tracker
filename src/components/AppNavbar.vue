<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-semibold" to="/">
        ✈ Rastreador de Vuelos
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Menú"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="mainNav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/">Buscar</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/favoritos">
              Favoritos
              <span v-if="favoriteCount" class="badge text-bg-light ms-1">{{ favoriteCount }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
