<template>
  <article class="flight-card">
    <div class="flight-card__body">
      <span class="badge status-badge" :class="statusBadgeClass(flight.flight_status)">
        {{ flight.flight_status || 'desconocido' }}
      </span>
      <h3 class="flight-card__title">
        {{ flightLabel }}
      </h3>
      <p class="flight-card__subtitle">
        {{ flight.airline?.name || 'Aerolínea' }} · {{ flight.flight_date }}
      </p>
      <p class="flight-card__route">
        {{ flight.departure?.iata || '—' }} → {{ flight.arrival?.iata || '—' }}
      </p>
      <p class="flight-card__meta">
        Salida {{ formatDateTime(flight.departure?.scheduled) }}
        · Llegada {{ formatDateTime(flight.arrival?.scheduled) }}
      </p>
    </div>
    <footer class="flight-card__footer">
      <router-link
        class="flight-card__action flight-card__action--details"
        :to="{ name: 'flight-detail', params: { flightKey: key } }"
        @click="saveForDetail"
      >
        Detalles
      </router-link>
      <button
        type="button"
        class="flight-card__action flight-card__action--save"
        :class="{ 'flight-card__action--saved': favorite }"
        @click="onToggleFavorite"
      >
        {{ favorite ? 'Guardado' : 'Guardar' }}
      </button>
    </footer>
  </article>
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
  index: { type: Number, default: 0 },
})

const key = computed(() => flightKey(props.flight))
const flightLabel = computed(
  () => props.flight.flight?.iata || props.flight.flight?.number || `Resultado ${props.index}`,
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
