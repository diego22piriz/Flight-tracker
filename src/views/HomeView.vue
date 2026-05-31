<template>
  <div class="search-layout">
    <aside class="search-layout__sidebar">
      <div class="sketch-panel">
        <FlightSearchForm :loading="loading" @search="handleSearch" />
      </div>
    </aside>

    <section class="search-layout__main">
      <AlertMessage :message="error" />
      <AlertMessage
        v-if="!hasApiKey"
        variant="warning"
        message="Configura VITE_AVIATIONSTACK_API_KEY en el archivo .env (copia .env.example)."
      />

      <div class="sketch-panel sketch-panel--results">
        <h2 v-if="flights.length" class="sketch-panel__title">
          Resultados ({{ flights.length }})
        </h2>
        <FlightList :flights="flights" :searched="searched" :loading="loading" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AlertMessage from '../components/AlertMessage.vue'
import FlightList from '../components/FlightList.vue'
import FlightSearchForm from '../components/FlightSearchForm.vue'
import { searchFlights } from '../services/aviationstack.js'

const loading = ref(false)
const error = ref('')
const flights = ref([])
const searched = ref(false)
const hasApiKey = Boolean(import.meta.env.VITE_AVIATIONSTACK_API_KEY)

async function handleSearch(filters) {
  if (!filters) {
    flights.value = []
    searched.value = false
    error.value = ''
    return
  }

  loading.value = true
  error.value = ''
  searched.value = true

  try {
    flights.value = await searchFlights({
      flightIata: filters.flightIata,
      depIata: filters.depIata,
      arrIata: filters.arrIata,
      flightStatus: filters.flightStatus,
      limit: 12,
    })
  } catch (err) {
    flights.value = []
    error.value = err.message || 'No se pudo completar la búsqueda.'
  } finally {
    loading.value = false
  }
}
</script>
