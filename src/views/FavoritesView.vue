<template>
  <div class="container">
    <h1 class="display-6 fw-bold mb-2">Mis vuelos favoritos</h1>
    <p class="text-muted mb-4">
      Guardados en <code>LocalStorage</code> del navegador. No se usa base de datos en servidor.
    </p>

    <div v-if="!items.length" class="alert alert-secondary" role="alert">
      Aún no tienes favoritos. Busca un vuelo y pulsa «Guardar».
      <router-link to="/" class="alert-link ms-1">Ir a buscar</router-link>
    </div>

    <div v-else class="row g-3">
      <div v-for="item in items" :key="item.key" class="col-md-6 col-xl-4">
        <FlightCard :flight="item.flight" />
        <button
          type="button"
          class="btn btn-sm btn-link text-danger mt-1"
          @click="remove(item.key)"
        >
          Quitar de favoritos
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import FlightCard from '../components/FlightCard.vue'
import { getFavorites, removeFavorite } from '../services/favorites.js'

const items = ref([])

function load() {
  items.value = getFavorites()
}

function remove(key) {
  removeFavorite(key)
  window.dispatchEvent(new Event('favorites-updated'))
  load()
}

onMounted(load)
</script>
