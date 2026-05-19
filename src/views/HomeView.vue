<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col-lg-8">
        <h1 class="display-6 fw-bold mb-2">Rastreador de vuelos</h1>
        <p class="lead text-muted mb-0">
          Consulta vuelos en tiempo real con la API pública
          <strong>AviationStack</strong>. Sin backend propio: solo frontend y
          <code>LocalStorage</code> para favoritos.
        </p>
      </div>
    </div>

    <FlightSearchForm :loading="loading" @search="handleSearch" />

    <AlertMessage class="mt-3" :message="error" />
    <AlertMessage
      v-if="!hasApiKey"
      class="mt-3"
      variant="warning"
      message="Configura VITE_AVIATIONSTACK_API_KEY en el archivo .env (copia .env.example)."
    />

    <section v-if="flights.length" class="mt-4">
      <h2 class="h5 mb-3">Resultados ({{ flights.length }})</h2>
      <FlightList :flights="flights" :searched="searched" />
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
