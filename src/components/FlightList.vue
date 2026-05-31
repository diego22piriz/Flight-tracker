<template>
  <div v-if="loading" class="results-empty">Buscando vuelos…</div>
  <div v-else-if="flights.length" class="results-stack">
    <FlightCard v-for="(flight, index) in flights" :key="flightKey(flight)" :flight="flight" :index="index + 1" />
  </div>
  <div v-else-if="searched" class="results-empty">
    No se encontraron vuelos con esos criterios.
  </div>
  <div v-else class="results-empty">
    Usa los filtros de la izquierda y pulsa Buscar para ver resultados.
  </div>
</template>

<script setup>
import FlightCard from './FlightCard.vue'
import { flightKey } from '../services/aviationstack.js'

defineProps({
  flights: { type: Array, default: () => [] },
  searched: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})
</script>
