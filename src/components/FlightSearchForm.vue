<template>
  <form class="sketch-form" @submit.prevent="onSubmit">
    <div class="sketch-form__row">
      <div class="sketch-form__field">
        <label class="sketch-form__label" for="depIata">Origen</label>
        <select
          id="depIata"
          v-model="form.depIata"
          class="sketch-form__control"
          :disabled="loadingAirports"
          @change="onRouteChange"
        >
          <option value="">{{ originPlaceholder }}</option>
          <option v-for="opt in airportOptions" :key="'dep-' + opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
      <div class="sketch-form__field">
        <label class="sketch-form__label" for="arrIata">Destino</label>
        <select
          id="arrIata"
          v-model="form.arrIata"
          class="sketch-form__control"
          :disabled="loadingAirports"
          @change="onRouteChange"
        >
          <option value="">{{ destinationPlaceholder }}</option>
          <option v-for="opt in airportOptions" :key="'arr-' + opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="airportsLoadError" class="sketch-form__hint sketch-form__hint--error">
      {{ airportsLoadError }}
    </div>

    <div class="sketch-form__field">
      <label class="sketch-form__label" for="flightIata">N° vuelo</label>
      <select
        id="flightIata"
        v-model="form.flightIata"
        class="sketch-form__control"
        :disabled="loading || loadingFlights || !canLoadFlights"
        @focus="loadFlightOptions"
        @click="loadFlightOptions"
      >
        <option value="">{{ selectPlaceholder }}</option>
        <option v-for="opt in flightOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <p v-if="flightsLoadError" class="sketch-form__hint sketch-form__hint--error">
        {{ flightsLoadError }}
      </p>
      <p v-else-if="!canLoadFlights" class="sketch-form__hint">
        Selecciona origen y/o destino para ver vuelos disponibles.
      </p>
      <p v-else-if="flightOptions.length === 0 && optionsLoaded" class="sketch-form__hint">
        No hay vuelos para esa ruta. Prueba otros aeropuertos.
      </p>
    </div>

    <div class="sketch-form__field">
      <label class="sketch-form__label" for="status">Estado</label>
      <select
        id="status"
        v-model="form.flightStatus"
        class="sketch-form__control"
        @change="onRouteChange"
      >
        <option value="">Cualquiera</option>
        <option value="scheduled">Programado</option>
        <option value="active">En vuelo</option>
        <option value="landed">Aterrizado</option>
        <option value="cancelled">Cancelado</option>
      </select>
    </div>

    <div class="sketch-form__actions">
      <button type="submit" class="sketch-btn sketch-btn--primary" :disabled="loading || loadingFlights">
        <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status" />
        Buscar
      </button>
      <button
        type="button"
        class="sketch-btn sketch-btn--ghost"
        :disabled="loading || loadingFlights"
        @click="reset"
      >
        Limpiar
      </button>
    </div>
  </form>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { listAirportOptions, listFlightOptions } from '../services/aviationstack.js'

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

const airportOptions = ref([])
const loadingAirports = ref(false)
const airportsLoadError = ref('')

const flightOptions = ref([])
const loadingFlights = ref(false)
const flightsLoadError = ref('')
const optionsLoaded = ref(false)
const lastOptionsKey = ref('')

const canLoadFlights = computed(() => !!form.depIata || !!form.arrIata)

const originPlaceholder = computed(() => {
  if (loadingAirports.value) return 'Cargando…'
  return 'Selecciona'
})

const destinationPlaceholder = computed(() => {
  if (loadingAirports.value) return 'Cargando…'
  return 'Selecciona'
})

const selectPlaceholder = computed(() => {
  if (!canLoadFlights.value) return 'Primero origen o destino'
  if (loadingFlights.value) return 'Cargando vuelos…'
  if (flightOptions.value.length === 0 && optionsLoaded.value) return 'Sin vuelos en esta ruta'
  return 'Selecciona un vuelo'
})

function optionsCacheKey() {
  return `${form.depIata}|${form.arrIata}|${form.flightStatus}`.toUpperCase()
}

async function loadAirportOptions() {
  if (loadingAirports.value || airportOptions.value.length > 0) return

  loadingAirports.value = true
  airportsLoadError.value = ''

  try {
    airportOptions.value = await listAirportOptions()
  } catch (err) {
    airportsLoadError.value = err.message || 'No se pudieron cargar los aeropuertos.'
  } finally {
    loadingAirports.value = false
  }
}

function onRouteChange() {
  form.flightIata = ''
  flightOptions.value = []
  optionsLoaded.value = false
  flightsLoadError.value = ''
  lastOptionsKey.value = ''
}

onMounted(() => {
  loadAirportOptions()
})

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
