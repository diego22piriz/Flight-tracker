# Prompt 005 — Dropdown de aeropuertos (origen y destino)

**Fecha:** 2026-05-30  
**Herramienta:** Cursor (agente Auto)

## Prompt del usuario

```
obten el contexto de la carpeta memory-bank y haz que en el formulario de buscador de vuelos
en origen y destino en vez de ser un imput de texto sea un dropdown con las opciones disponibles.
Al finalizar actualiza la carpeta de memory-bank y la carpeta de prompts
```

## Respuesta / implementación

- Nuevo método `listAirportOptions()` en `src/services/aviationstack.js`:
  - Consulta `GET /airports` con `limit` (por defecto 100).
  - Devuelve lista única `{ value, label }` ordenada por IATA (ej. `MAD — Adolfo Suárez Madrid-Barajas · Madrid (ES)`).
  - Caché en memoria (`airportOptionsCache`) para no repetir la petición en la sesión.
- `FlightSearchForm.vue`:
  - Campos texto de origen/destino reemplazados por `<select>`.
  - Carga de aeropuertos en `onMounted` con estados de carga y error.
  - `canLoadFlights` pasa a comprobar selección en dropdown (no longitud ≥3).
  - Mensajes de ayuda actualizados («Selecciona origen y/o destino…»).
- Test Vitest: `listAirportOptions` deduplica IATA y ordena resultados (fetch mockeado).

## Archivos modificados

- `src/services/aviationstack.js`
- `src/components/FlightSearchForm.vue`
- `tests/aviationstack.test.js`
- `memory-bank/*` (actualización de contexto)
- `00-memory-bank.md`
