<template>
  <div v-if="flights.length" class="row g-3">
    <div v-for="flight in flights" :key="flightKey(flight)" class="col-md-6 col-xl-4">
      <FlightCard :flight="flight" />
    </div>
  </div>
  <div v-else-if="searched" class="alert alert-info" role="alert">
    No se encontraron vuelos con esos criterios.
  </div>
</template>

<script setup>
import FlightCard from './FlightCard.vue'
import { flightKey } from '../services/aviationstack.js'

defineProps({
  flights: { type: Array, default: () => [] },
  searched: { type: Boolean, default: false },
})
</script>
