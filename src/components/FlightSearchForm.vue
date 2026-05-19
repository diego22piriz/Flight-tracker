<template>
  <form class="card shadow-sm border-0" @submit.prevent="onSubmit">
    <div class="card-body">
      <h2 class="h5 card-title mb-3">Buscar vuelos en tiempo real</h2>
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label" for="flightIata">Nº vuelo (IATA)</label>
          <input
            id="flightIata"
            v-model="form.flightIata"
            type="text"
            class="form-control"
            placeholder="Ej. IB3251"
            maxlength="8"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label" for="depIata">Origen (IATA)</label>
          <input
            id="depIata"
            v-model="form.depIata"
            type="text"
            class="form-control"
            placeholder="MAD"
            maxlength="3"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label" for="arrIata">Destino (IATA)</label>
          <input
            id="arrIata"
            v-model="form.arrIata"
            type="text"
            class="form-control"
            placeholder="BCN"
            maxlength="3"
          />
        </div>
        <div class="col-md-2">
          <label class="form-label" for="status">Estado</label>
          <select id="status" v-model="form.flightStatus" class="form-select">
            <option value="">Cualquiera</option>
            <option value="scheduled">Programado</option>
            <option value="active">En vuelo</option>
            <option value="landed">Aterrizado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      </div>
      <div class="d-flex flex-wrap gap-2 mt-3">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status" />
          Buscar
        </button>
        <button type="button" class="btn btn-outline-secondary" :disabled="loading" @click="reset">
          Limpiar
        </button>
      </div>
      <p class="form-text mb-0 mt-2">
        Usa el código IATA del vuelo o combina origen/destino. Requiere API key en
        <code>.env</code>.
      </p>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

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

function onSubmit() {
  emit('search', { ...form })
}

function reset() {
  form.flightIata = ''
  form.depIata = ''
  form.arrIata = ''
  form.flightStatus = ''
  emit('search', null)
}
</script>
