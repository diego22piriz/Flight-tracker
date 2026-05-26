<template>
  <div ref="mapContainer" class="flight-map"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const props = defineProps({
  departure: { type: Object, default: null },
  arrival: { type: Object, default: null },
  live: { type: Object, default: null },
  flightLabel: { type: String, default: '' },
})

const mapContainer = ref(null)
let map = null
let routeLine = null
let depMarker = null
let arrMarker = null
let liveMarker = null

function makePopupContent(airport, label) {
  const d = airport.details || {}
  let html = `<b>${airport.name || airport.iata}</b><br><span class="text-muted">${label}</span>`
  if (d.terminal) html += `<br>Terminal: ${d.terminal}`
  if (d.gate) html += `<br>Puerta: ${d.gate}`
  if (d.scheduled) {
    const t = new Date(d.scheduled).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })
    html += `<br>Programada: ${t}`
  }
  return html
}

function initMap() {
  if (map) return

  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  })

  const hasDep = props.departure?.lat != null
  const hasArr = props.arrival?.lat != null
  const hasLive = props.live?.lat != null
  const popupOpts = { autoClose: false, closeButton: true }

  const points = []
  if (hasDep) points.push([props.departure.lat, props.departure.lon])
  if (hasLive) points.push([props.live.lat, props.live.lon])
  if (hasArr) points.push([props.arrival.lat, props.arrival.lon])

  const center = points.length
    ? points.reduce((a, p) => [a[0] + p[0] / points.length, a[1] + p[1] / points.length], [0, 0])
    : [0, 0]

  map = L.map(mapContainer.value, {
    center,
    zoom: points.length > 1 ? 4 : 8,
    zoomControl: true,
    scrollWheelZoom: true,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map)

  const blueIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  const routeCoords = []

  if (hasDep) {
    const d = props.departure
    depMarker = L.marker([d.lat, d.lon], { icon: blueIcon })
      .addTo(map)
      .bindPopup(makePopupContent(d, 'Salida'), popupOpts)
    routeCoords.push([d.lat, d.lon])
  }

  if (hasLive) {
    const lines = [props.flightLabel || 'Vuelo']
    if (props.live.altitude != null) lines.push(`Altitud: ${props.live.altitude} m`)
    liveMarker = L.marker([props.live.lat, props.live.lon])
      .addTo(map)
      .bindPopup(lines.join('<br>'))
    routeCoords.push([props.live.lat, props.live.lon])
  }

  if (hasArr) {
    const a = props.arrival
    arrMarker = L.marker([a.lat, a.lon], { icon: blueIcon })
      .addTo(map)
      .bindPopup(makePopupContent(a, 'Llegada'), popupOpts)
    routeCoords.push([a.lat, a.lon])
  }

  if (routeCoords.length >= 2) {
    routeLine = L.polyline(routeCoords, {
      color: hasLive ? '#0d6efd' : '#6c757d',
      weight: 2,
      dashArray: hasLive ? null : '8, 8',
    }).addTo(map)

    if (routeCoords.length > 1) {
      map.fitBounds(routeLine.getBounds().pad(0.3))
      map.once('moveend', () => {
        if (depMarker) depMarker.openPopup()
      })
    }
  } else if (depMarker) {
    depMarker.openPopup()
  }
}

function updatePosition() {
  if (!map) return
  if (liveMarker && props.live?.lat != null) {
    liveMarker.setLatLng([props.live.lat, props.live.lon])
    const lines = [props.flightLabel || 'Vuelo']
    if (props.live.altitude != null) lines.push(`Altitud: ${props.live.altitude} m`)
    liveMarker.setPopupContent(lines.join('<br>'))
  }
}

onMounted(() => {
  initMap()
})

watch(() => [props.live?.lat, props.live?.lon], updatePosition)

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
.flight-map {
  height: 300px;
  width: 100%;
  border-radius: 8px;
  z-index: 1;
}
</style>
