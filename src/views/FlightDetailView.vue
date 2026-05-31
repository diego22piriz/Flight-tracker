<template>
  <div class="page-panel">
    <router-link to="/" class="back-link">← Volver a búsqueda</router-link>

    <div v-if="flight" class="detail-card">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h1 class="page-panel__title mb-0">
          {{ flight.airline?.name }} — {{ flight.flight?.iata || flight.flight?.number }}
        </h1>
        <span class="badge status-badge" :class="statusBadgeClass(flight.flight_status)">
          {{ flight.flight_status }}
        </span>
      </div>

      <p class="page-panel__lead">Fecha del vuelo: {{ flight.flight_date }}</p>

      <div class="row g-3">
        <div class="col-md-6">
          <div class="detail-card__section h-100">
            <h2>Salida</h2>
            <p><strong>{{ flight.departure?.airport }}</strong></p>
            <p>Terminal: {{ flight.departure?.terminal || '—' }}</p>
            <p>Puerta: {{ flight.departure?.gate || '—' }}</p>
            <p>Programada: {{ formatDateTime(flight.departure?.scheduled) }}</p>
            <p>Estimada: {{ formatDateTime(flight.departure?.estimated) }}</p>
            <p v-if="flight.departure?.delay" class="sketch-form__hint--error mb-0">
              Retraso: {{ flight.departure.delay }} min
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="detail-card__section h-100">
            <h2>Llegada</h2>
            <p><strong>{{ flight.arrival?.airport }}</strong></p>
            <p>Terminal: {{ flight.arrival?.terminal || '—' }}</p>
            <p>Puerta: {{ flight.arrival?.gate || '—' }}</p>
            <p>Programada: {{ formatDateTime(flight.arrival?.scheduled) }}</p>
            <p>Estimada: {{ formatDateTime(flight.arrival?.estimated) }}</p>
            <p v-if="flight.arrival?.delay" class="sketch-form__hint--error mb-0">
              Retraso: {{ flight.arrival.delay }} min
            </p>
          </div>
        </div>
      </div>

      <div class="mt-3">
        <p class="page-panel__lead mb-2">
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
        <p v-if="livePosition" class="sketch-form__hint mt-1 mb-0">
          lat {{ livePosition.lat }}, lon {{ livePosition.lon }},
          alt {{ livePosition.altitude }} m
        </p>
      </div>

      <div class="d-flex flex-wrap gap-2 mt-3">
        <button
          type="button"
          class="sketch-btn"
          :disabled="refreshing"
          @click="refreshLivePosition"
        >
          {{ refreshing ? 'Actualizando…' : 'Actualizar posición' }}
        </button>
        <button type="button" class="sketch-btn sketch-btn--primary" @click="toggle">
          {{ isFav ? 'Quitar de guardados' : 'Guardar' }}
        </button>
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
