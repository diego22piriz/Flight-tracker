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
          <p v-if="flight.live" class="mb-0 small text-muted">
            Última posición: lat {{ flight.live.latitude }}, lon {{ flight.live.longitude }},
            altitud {{ flight.live.altitude }} m
          </p>
        </div>

        <button
          type="button"
          class="btn btn-warning mt-3"
          @click="toggle"
        >
          {{ isFav ? 'Quitar de favoritos' : 'Añadir a favoritos' }}
        </button>
      </div>
    </div>

    <AlertMessage v-else :message="error || 'Vuelo no encontrado.'" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import AlertMessage from '../components/AlertMessage.vue'
import {
  flightKey,
  formatDateTime,
  statusBadgeClass,
} from '../services/aviationstack.js'
import { getFavorites, isFavorite, toggleFavorite } from '../services/favorites.js'

const props = defineProps({
  flightKey: { type: String, required: true },
})

const flight = ref(null)
const error = ref('')
const isFav = computed(() => (flight.value ? isFavorite(flight.value) : false))

function loadFromStorage() {
  const item = getFavorites().find((f) => f.key === props.flightKey)
  if (item) {
    flight.value = item.flight
    return
  }
  error.value =
    'Abre el detalle desde los resultados de búsqueda o guarda el vuelo en favoritos.'
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
      flight.value = JSON.parse(cached)
      return
    } catch {
      /* ignore */
    }
  }
  loadFromStorage()
})
</script>
