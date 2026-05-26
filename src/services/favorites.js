import { flightKey } from './aviationstack.js'

const STORAGE_KEY = 'rastreador_vuelos_favoritos'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function getFavorites() {
  return readAll()
}

export function isFavorite(flight) {
  const key = flightKey(flight)
  return readAll().some((item) => item.key === key)
}

export function addFavorite(flight) {
  const key = flightKey(flight)
  const items = readAll().filter((item) => item.key !== key)
  items.unshift({ key, savedAt: new Date().toISOString(), flight })
  writeAll(items)
  return items
}

export function removeFavorite(key) {
  const items = readAll().filter((item) => item.key !== key)
  writeAll(items)
  return items
}

export function toggleFavorite(flight) {
  const key = flightKey(flight)
  if (isFavorite(flight)) {
    removeFavorite(key)
    return false
  }
  addFavorite(flight)
  return true
}
