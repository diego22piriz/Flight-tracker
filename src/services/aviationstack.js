const API_BASE = '/api/aviation'

function buildUrl(path, params = {}) {
  const search = new URLSearchParams()
  const apiKey = import.meta.env.VITE_AVIATIONSTACK_API_KEY

  if (apiKey) {
    search.set('access_key', apiKey)
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      search.set(key, String(value).trim())
    }
  })

  const query = search.toString()
  return `${API_BASE}${path}${query ? `?${query}` : ''}`
}

async function request(path, params = {}) {
  const url = buildUrl(path, params)
  const response = await fetch(url)

  let payload
  try {
    payload = await response.json()
  } catch {
    throw new Error('La API devolvió una respuesta no válida.')
  }

  if (!response.ok) {
    const message =
      payload?.error?.message ||
      payload?.error?.info ||
      `Error HTTP ${response.status}`
    throw new Error(message)
  }

  if (payload?.error) {
    throw new Error(payload.error.message || payload.error.info || 'Error de AviationStack')
  }

  return payload
}

/**
 * Busca vuelos por número IATA (ej. IB3251), aeropuertos o estado.
 * @param {{ flightIata?: string, depIata?: string, arrIata?: string, flightStatus?: string, limit?: number }} filters
 */
export async function searchFlights(filters = {}) {
  const params = {
    limit: filters.limit ?? 10,
  }

  if (filters.flightIata) params.flight_iata = filters.flightIata.toUpperCase()
  if (filters.depIata) params.dep_iata = filters.depIata.toUpperCase()
  if (filters.arrIata) params.arr_iata = filters.arrIata.toUpperCase()
  if (filters.flightStatus) params.flight_status = filters.flightStatus

  const hasFilter = params.flight_iata || params.dep_iata || params.arr_iata || params.flight_status
  if (!hasFilter) {
    throw new Error('Indica al menos un criterio de búsqueda.')
  }

  const result = await request('/flights', params)
  return result.data ?? []
}

let airportOptionsCache = null

/**
 * Lista aeropuertos disponibles (para dropdowns de origen/destino).
 * @returns {Promise<Array<{ value: string, label: string }>>}
 */
export async function listAirportOptions({ limit = 100 } = {}) {
  if (airportOptionsCache) return airportOptionsCache

  const result = await request('/airports', { limit })
  const airports = result.data ?? []
  const seen = new Set()
  const options = []

  for (const ap of airports) {
    const iata = ap?.iata_code?.trim()?.toUpperCase()
    if (!iata || iata.length !== 3 || seen.has(iata)) continue
    seen.add(iata)

    const name = ap.airport_name || iata
    const city = ap.city ? ` · ${ap.city}` : ''
    const country = ap.country_iso2 ? ` (${ap.country_iso2})` : ''

    options.push({
      value: iata,
      label: `${iata} — ${name}${city}${country}`,
    })
  }

  airportOptionsCache = options.sort((a, b) => a.value.localeCompare(b.value))
  return airportOptionsCache
}

/** Limpia la caché de aeropuertos (útil en tests). */
export function resetAirportOptionsCache() {
  airportOptionsCache = null
}

/**
 * Lista números de vuelo disponibles según origen/destino (para dropdown).
 * @returns {Promise<Array<{ value: string, label: string }>>}
 */
export async function listFlightOptions(filters = {}) {
  const params = { limit: filters.limit ?? 50 }

  if (filters.depIata) params.dep_iata = filters.depIata.toUpperCase()
  if (filters.arrIata) params.arr_iata = filters.arrIata.toUpperCase()
  if (filters.flightStatus) params.flight_status = filters.flightStatus

  if (!params.dep_iata && !params.arr_iata) {
    throw new Error('Indica al menos origen o destino para cargar vuelos.')
  }

  const result = await request('/flights', params)
  const flights = result.data ?? []
  const seen = new Set()
  const options = []

  for (const flight of flights) {
    const code =
      flight?.flight?.iata ||
      (flight?.airline?.iata && flight?.flight?.number
        ? `${flight.airline.iata}${flight.flight.number}`
        : null)

    if (!code || seen.has(code)) continue
    seen.add(code)

    const dep = flight.departure?.iata || '—'
    const arr = flight.arrival?.iata || '—'
    const airline = flight.airline?.name ? ` · ${flight.airline.name}` : ''

    options.push({
      value: code,
      label: `${code} — ${dep} → ${arr}${airline}`,
    })
  }

  return options.sort((a, b) => a.value.localeCompare(b.value))
}

/**
 * Obtiene datos actualizados de un vuelo por su código IATA.
 * @param {string} flightIata - código IATA del vuelo (ej. "AV2568")
 * @returns {Promise<object|null>} datos del vuelo con live position o null
 */
export async function fetchFlightByIata(flightIata) {
  if (!flightIata) return null
  const result = await request('/flights', {
    flight_iata: flightIata.toUpperCase(),
    limit: 1,
  })
  return result.data?.[0] ?? null
}

/**
 * Obtiene coordenadas de un aeropuerto por su código IATA.
 * @param {string} iata - código IATA del aeropuerto (ej. "MAD")
 * @returns {Promise<{ lat: number, lon: number, name: string } | null>}
 */
const airportCache = {}
export async function fetchAirportCoords(iata) {
  if (!iata) return null
  const key = iata.toUpperCase()
  if (airportCache[key]) return airportCache[key]
  try {
    const result = await request('/airports', { iata_code: key, limit: 1 })
    const ap = result.data?.[0]
    if (ap?.latitude && ap?.longitude) {
      const coords = {
        lat: parseFloat(ap.latitude),
        lon: parseFloat(ap.longitude),
        name: ap.airport_name || key,
      }
      airportCache[key] = coords
      return coords
    }
  } catch {
    /* ignore */
  }
  return null
}

export function flightKey(flight) {
  const iata = flight?.flight?.iata || flight?.flight?.number || 'unknown'
  const date = flight?.flight_date || ''
  return `${iata}-${date}`.replace(/\s+/g, '')
}

export function formatDateTime(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export function statusBadgeClass(status) {
  const map = {
    scheduled: 'bg-secondary',
    active: 'bg-primary',
    landed: 'bg-success',
    cancelled: 'bg-danger',
    incident: 'bg-warning text-dark',
    diverted: 'bg-info text-dark',
  }
  return map[status] || 'bg-secondary'
}
