<template>
  <form class="card shadow-sm border-0" @submit.prevent="onSubmit">
    <div class="card-body">
      <h2 class="h5 card-title mb-3">Buscar vuelos en tiempo real</h2>
      <div class="row g-3">
        <div class="col-md-3">
          <label class="form-label" for="depIata">Origen (IATA)</label>
          <input
            id="depIata"
            v-model="form.depIata"
            type="text"
            class="form-control text-uppercase"
            placeholder="MAD"
            maxlength="3"
            @input="onRouteChange"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label" for="arrIata">Destino (IATA)</label>
          <input
            id="arrIata"
            v-model="form.arrIata"
            type="text"
            class="form-control text-uppercase"
            placeholder="BCN"
            maxlength="3"
            @input="onRouteChange"
          />
        </div>
        <div class="col-md-4">
          <label class="form-label" for="flightIata">Nº vuelo (IATA)</label>
          <select
            id="flightIata"
            v-model="form.flightIata"
            class="form-select"
            :disabled="loading || loadingFlights || !canLoadFlights"
            @focus="loadFlightOptions"
            @click="loadFlightOptions"
          >
            <option value="">{{ selectPlaceholder }}</option>
            <option v-for="opt in flightOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
          <div v-if="flightsLoadError" class="form-text text-danger">{{ flightsLoadError }}</div>
          <div v-else-if="!canLoadFlights" class="form-text">
            Escribe origen y/o destino para ver vuelos disponibles.
          </div>
          <div v-else-if="flightOptions.length === 0 && optionsLoaded" class="form-text">
            No hay vuelos para esa ruta. Prueba otros aeropuertos.
          </div>
        </div>
        <div class="col-md-2">
          <label class="form-label" for="status">Estado</label>
          <select
            id="status"
            v-model="form.flightStatus"
            class="form-select"
            @change="onRouteChange"
          >
            <option value="">Cualquiera</option>
            <option value="scheduled">Programado</option>
            <option value="active">En vuelo</option>
            <option value="landed">Aterrizado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      </div>
      <div class="d-flex flex-wrap gap-2 mt-3">
        <button type="submit" class="btn btn-primary" :disabled="loading || loadingFlights">
          <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status" />
          Buscar
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          :disabled="loading || loadingFlights"
          @click="reset"
        >
          Limpiar
        </button>
      </div>
      <p class="form-text mb-0 mt-2">
        Elige origen/destino y abre el desplegable de vuelos para cargar números desde la API.
        Requiere API key en <code>.env</code>.
      </p>
    </div>
  </form>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { listFlightOptions } from '../services/aviationstack.js'

defineProps({
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['search'])

const form = reactive({
  flightIata: '',
  depIata: '',
  arrIata: '',
  flightStatus: '',
})

const flightOptions = ref([])
const loadingFlights = ref(false)
const flightsLoadError = ref('')
const optionsLoaded = ref(false)
const lastOptionsKey = ref('')

const canLoadFlights = computed(
  () => form.depIata.trim().length >= 3 || form.arrIata.trim().length >= 3,
)

const selectPlaceholder = computed(() => {
  if (!canLoadFlights.value) return 'Primero origen o destino'
  if (loadingFlights.value) return 'Cargando vuelos…'
  if (flightOptions.value.length === 0 && optionsLoaded.value) return 'Sin vuelos en esta ruta'
  return 'Selecciona un vuelo'
})

function optionsCacheKey() {
  return `${form.depIata}|${form.arrIata}|${form.flightStatus}`.toUpperCase()
}

function onRouteChange() {
  form.flightIata = ''
  flightOptions.value = []
  optionsLoaded.value = false
  flightsLoadError.value = ''
  lastOptionsKey.value = ''
}

async function loadFlightOptions() {
  if (!canLoadFlights.value || loadingFlights.value) return

  const key = optionsCacheKey()
  if (key === lastOptionsKey.value && flightOptions.value.length > 0) return

  loadingFlights.value = true
  flightsLoadError.value = ''

  try {
    flightOptions.value = await listFlightOptions({
      depIata: form.depIata,
      arrIata: form.arrIata,
      flightStatus: form.flightStatus,
      limit: 50,
    })
    lastOptionsKey.value = key
    optionsLoaded.value = true
  } catch (err) {
    flightOptions.value = []
    optionsLoaded.value = true
    flightsLoadError.value = err.message || 'No se pudieron cargar los vuelos.'
  } finally {
    loadingFlights.value = false
  }
}

function onSubmit() {
  emit('search', { ...form })
}

function reset() {
  form.flightIata = ''
  form.depIata = ''
  form.arrIata = ''
  form.flightStatus = ''
  onRouteChange()
  emit('search', null)
}
</script>
