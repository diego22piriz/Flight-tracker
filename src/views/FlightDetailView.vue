<template>
  <div class="container">
    <router-link to="/" class="btn btn-link ps-0 mb-3">← Volver a búsqueda</router-link>

    <div v-if="flight" class="card shadow border-0">
      <div class="card-body">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <h1 class="h3 mb-0">
            {{ flight.airline?.name }} — {{ flight.flight?.iata || flight.flight?.number }}
          </h1>
          <span class="badge fs-6 status-badge" :class="statusBadgeClass(flight.flight_status)">
            {{ flight.flight_status }}
          </span>
        </div>

        <p class="text-muted">Fecha del vuelo: {{ flight.flight_date }}</p>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="border rounded p-3 h-100 bg-light">
              <h2 class="h6 text-uppercase text-muted">Salida</h2>
              <p class="mb-1"><strong>{{ flight.departure?.airport }}</strong></p>
              <p class="mb-1">Terminal: {{ flight.departure?.terminal || '—' }}</p>
              <p class="mb-1">Puerta: {{ flight.departure?.gate || '—' }}</p>
              <p class="mb-1">Programada: {{ formatDateTime(flight.departure?.scheduled) }}</p>
              <p class="mb-0">Estimada: {{ formatDateTime(flight.departure?.estimated) }}</p>
              <p v-if="flight.departure?.delay" class="text-danger mb-0 mt-1">
                Retraso: {{ flight.departure.delay }} min
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="border rounded p-3 h-100 bg-light">
              <h2 class="h6 text-uppercase text-muted">Llegada</h2>
              <p class="mb-1"><strong>{{ flight.arrival?.airport }}</strong></p>
              <p class="mb-1">Terminal: {{ flight.arrival?.terminal || '—' }}</p>
              <p class="mb-1">Puerta: {{ flight.arrival?.gate || '—' }}</p>
              <p class="mb-1">Programada: {{ formatDateTime(flight.arrival?.scheduled) }}</p>
              <p class="mb-0">Estimada: {{ formatDateTime(flight.arrival?.estimated) }}</p>
              <p v-if="flight.arrival?.delay" class="text-danger mb-0 mt-1">
                Retraso: {{ flight.arrival.delay }} min
              </p>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <p class="mb-1">
            Aeronave: {{ flight.aircraft?.registration || '—' }}
            <span v-if="flight.aircraft?.iata">({{ flight.aircraft.iata }})</span>
          </p>
          <FlightMap
            v-if="departureAirport || arrivalAirport"
            :departure="departureAirport"
            :arrival="arrivalAirport"
            :live="livePosition"
            :flight-label="flight.flight?.iata || flight.flight?.number"
            class="mt-2"
          />
          <p v-if="livePosition" class="small text-muted mt-1 mb-0">
            lat {{ livePosition.lat }}, lon {{ livePosition.lon }},
            alt {{ livePosition.altitude }} m
          </p>
        </div>

        <div class="d-flex gap-2 mt-3">
          <button
            type="button"
            class="btn btn-outline-secondary"
            :disabled="refreshing"
            @click="refreshLivePosition"
          >
            {{ refreshing ? 'Actualizando...' : '🔄 Actualizar posición' }}
          </button>
          <button
            type="button"
            class="btn btn-warning"
            @click="toggle"
          >
            {{ isFav ? 'Quitar de favoritos' : 'Añadir a favoritos' }}
          </button>
        </div>
      </div>
    </div>

    <AlertMessage v-else :message="error || 'Vuelo no encontrado.'" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import AlertMessage from '../components/AlertMessage.vue'
import FlightMap from '../components/FlightMap.vue'
import {
  flightKey,
  fetchFlightByIata,
  fetchAirportCoords,
  formatDateTime,
  statusBadgeClass,
} from '../services/aviationstack.js'
import { getFavorites, isFavorite, toggleFavorite } from '../services/favorites.js'

const props = defineProps({
  flightKey: { type: String, required: true },
})

const flight = ref(null)
const error = ref('')
const refreshing = ref(false)
const departureAirport = ref(null)
const arrivalAirport = ref(null)
const isFav = computed(() => (flight.value ? isFavorite(flight.value) : false))

const livePosition = computed(() => {
  if (!flight.value?.live) return null
  return {
    lat: flight.value.live.latitude,
    lon: flight.value.live.longitude,
    altitude: flight.value.live.altitude,
  }
})

function loadFromStorage() {
  const item = getFavorites().find((f) => f.key === props.flightKey)
  if (item) {
    flight.value = item.flight
    return
  }
  error.value =
    'Abre el detalle desde los resultados de búsqueda o guarda el vuelo en favoritos.'
}

async function loadAirports() {
  if (!flight.value) return
  const dep = flight.value.departure
  const arr = flight.value.arrival
  if (dep?.iata) {
    fetchAirportCoords(dep.iata).then((c) => {
      if (c) departureAirport.value = { ...c, iata: dep.iata, details: dep }
    })
  }
  if (arr?.iata) {
    fetchAirportCoords(arr.iata).then((c) => {
      if (c) arrivalAirport.value = { ...c, iata: arr.iata, details: arr }
    })
  }
}

async function refreshLivePosition() {
  const iata = flight.value?.flight?.iata
  if (!iata) return
  refreshing.value = true
  try {
    const fresh = await fetchFlightByIata(iata)
    if (fresh?.live) {
      flight.value = { ...flight.value, live: fresh.live }
    }
  } catch {
    /* ignore, keep existing data */
  } finally {
    refreshing.value = false
  }
}

function toggle() {
  if (!flight.value) return
  toggleFavorite(flight.value)
  window.dispatchEvent(new Event('favorites-updated'))
}

onMounted(() => {
  const cached = sessionStorage.getItem(`flight:${props.flightKey}`)
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      flight.value = parsed
      loadAirports()
      if (parsed.flight?.iata) {
        refreshLivePosition()
      }
      return
    } catch {
      /* ignore */
    }
  }
  loadFromStorage()
  loadAirports()
})
</script>