import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  flightKey,
  formatDateTime,
  listAirportOptions,
  listFlightOptions,
  resetAirportOptionsCache,
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

  it('exige origen o destino para listar vuelos del dropdown', async () => {
    await expect(listFlightOptions({})).rejects.toThrow(/origen o destino/i)
  })

  it('lista aeropuertos únicos para dropdown de origen/destino', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [
            { iata_code: 'MAD', airport_name: 'Adolfo Suárez Madrid-Barajas', city: 'Madrid', country_iso2: 'ES' },
            { iata_code: 'mad', airport_name: 'Duplicado', city: 'Madrid', country_iso2: 'ES' },
            { iata_code: 'BCN', airport_name: 'Barcelona-El Prat', city: 'Barcelona', country_iso2: 'ES' },
            { iata_code: null, airport_name: 'Sin IATA' },
          ],
        }),
      }),
    )

    const options = await listAirportOptions()
    expect(options).toHaveLength(2)
    expect(options[0].value).toBe('BCN')
    expect(options[1].value).toBe('MAD')
    expect(options[1].label).toMatch(/Madrid-Barajas/)
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
  resetAirportOptionsCache()
})
