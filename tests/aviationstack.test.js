import { describe, expect, it } from 'vitest'
import {
  flightKey,
  formatDateTime,
  statusBadgeClass,
} from '../src/services/aviationstack.js'

describe('aviationstack helpers', () => {
  it('genera clave estable de vuelo', () => {
    const flight = {
      flight_date: '2025-05-19',
      flight: { iata: 'IB3251' },
    }
    expect(flightKey(flight)).toBe('IB3251-2025-05-19')
  })

  it('formatea fechas vacías', () => {
    expect(formatDateTime(null)).toBe('—')
  })

  it('asigna clase bootstrap por estado', () => {
    expect(statusBadgeClass('landed')).toBe('bg-success')
    expect(statusBadgeClass('unknown')).toBe('bg-secondary')
  })
})
