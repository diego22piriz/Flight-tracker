<template>
  <div class="card flight-card shadow-sm border-0 h-100">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
        <div>
          <h3 class="h5 mb-1">
            {{ flight.airline?.name || 'Aerolínea' }}
            <span class="text-muted fw-normal">· {{ flightLabel }}</span>
          </h3>
          <p class="text-muted small mb-0">{{ flight.flight_date }}</p>
        </div>
        <span class="badge status-badge" :class="statusBadgeClass(flight.flight_status)">
          {{ flight.flight_status || 'desconocido' }}
        </span>
      </div>

      <div class="row g-3 mt-1">
        <div class="col-sm-6">
          <p class="small text-uppercase text-muted mb-1">Salida</p>
          <p class="mb-0 fw-semibold">{{ flight.departure?.iata || '—' }}</p>
          <p class="small mb-0">{{ flight.departure?.airport }}</p>
          <p class="small text-muted mb-0">
            Programada: {{ formatDateTime(flight.departure?.scheduled) }}
          </p>
          <p v-if="flight.departure?.actual" class="small text-success mb-0">
            Real: {{ formatDateTime(flight.departure?.actual) }}
          </p>
        </div>
        <div class="col-sm-6">
          <p class="small text-uppercase text-muted mb-1">Llegada</p>
          <p class="mb-0 fw-semibold">{{ flight.arrival?.iata || '—' }}</p>
          <p class="small mb-0">{{ flight.arrival?.airport }}</p>
          <p class="small text-muted mb-0">
            Programada: {{ formatDateTime(flight.arrival?.scheduled) }}
          </p>
          <p v-if="flight.arrival?.actual" class="small text-success mb-0">
            Real: {{ formatDateTime(flight.arrival?.actual) }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-footer bg-white border-0 d-flex flex-wrap gap-2 pb-3">
      <router-link
        class="btn btn-sm btn-outline-primary"
        :to="{ name: 'flight-detail', params: { flightKey: key } }"
        @click="saveForDetail"
      >
        Ver detalle
      </router-link>
      <button
        type="button"
        class="btn btn-sm"
        :class="favorite ? 'btn-warning' : 'btn-outline-warning'"
        @click="onToggleFavorite"
      >
        {{ favorite ? '★ En favoritos' : '☆ Guardar' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  flightKey,
  formatDateTime,
  statusBadgeClass,
} from '../services/aviationstack.js'
import { isFavorite, toggleFavorite } from '../services/favorites.js'

const props = defineProps({
  flight: { type: Object, required: true },
})

const key = computed(() => flightKey(props.flight))
const flightLabel = computed(
  () => props.flight.flight?.iata || props.flight.flight?.number || '—',
)
const favorite = computed(() => isFavorite(props.flight))

function onToggleFavorite() {
  toggleFavorite(props.flight)
  window.dispatchEvent(new Event('favorites-updated'))
}

function saveForDetail() {
  sessionStorage.setItem(`flight:${key.value}`, JSON.stringify(props.flight))
}
</script>
