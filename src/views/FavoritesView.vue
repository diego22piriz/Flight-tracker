<template>
  <div class="page-panel">
    <h1 class="page-panel__title">Guardados</h1>
    <p class="page-panel__lead">
      Vuelos guardados en el navegador. No se usa base de datos en servidor.
    </p>

    <div v-if="!items.length" class="sketch-panel results-empty">
      Aún no tienes vuelos guardados. Busca un vuelo y pulsa «Guardar».
      <router-link to="/" class="flight-card__action flight-card__action--details ms-1">
        Ir a buscar
      </router-link>
    </div>

    <div v-else class="sketch-panel">
      <div class="results-stack">
        <div v-for="(item, index) in items" :key="item.key">
          <FlightCard :flight="item.flight" :index="index + 1" />
          <button
            type="button"
            class="flight-card__action flight-card__action--save mt-2"
            @click="remove(item.key)"
          >
            Quitar de guardados
          </button>
        </div>
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
