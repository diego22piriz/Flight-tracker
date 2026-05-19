import { beforeEach, describe, expect, it } from 'vitest'
import {
  addFavorite,
  getFavorites,
  isFavorite,
  removeFavorite,
  toggleFavorite,
} from '../src/services/favorites.js'
import { flightKey } from '../src/services/aviationstack.js'

const sampleFlight = {
  flight_date: '2025-05-19',
  flight_status: 'scheduled',
  flight: { iata: 'IB3251', number: '3251' },
  departure: { iata: 'MAD', airport: 'Madrid' },
  arrival: { iata: 'BCN', airport: 'Barcelona' },
}

describe('favorites service', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('añade y detecta favoritos', () => {
    addFavorite(sampleFlight)
    expect(isFavorite(sampleFlight)).toBe(true)
    expect(getFavorites()).toHaveLength(1)
  })

  it('alterna favorito con toggle', () => {
    expect(toggleFavorite(sampleFlight)).toBe(true)
    expect(toggleFavorite(sampleFlight)).toBe(false)
    expect(getFavorites()).toHaveLength(0)
  })

  it('elimina por clave', () => {
    addFavorite(sampleFlight)
    const key = flightKey(sampleFlight)
    removeFavorite(key)
    expect(getFavorites()).toHaveLength(0)
  })
})
