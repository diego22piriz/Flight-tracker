# Prompt 003 — Dropdown de números de vuelo

**Fecha:** 2026-05-19  
**Herramienta:** Cursor (agente Auto)

## Prompt del usuario

```
haz que en el formulario en vez de pedir que se ingrese el n° de vuelo manualmente
tenga un dropdown que al hacer click muestre los n° de vuelo posibles
```

## Respuesta / implementación

- Nuevo método `listFlightOptions()` en `src/services/aviationstack.js`:
  - Consulta `/flights` con `dep_iata` y/o `arr_iata`.
  - Devuelve lista única `{ value, label }` ordenada (ej. `IB3251 — MAD → BCN · Iberia`).
- `FlightSearchForm.vue`:
  - Campo texto reemplazado por `<select>`.
  - Carga al `@focus` / `@click` si hay origen o destino (≥3 chars).
  - Caché por clave `dep|arr|status`; reset al cambiar ruta.
  - Mensajes: cargando, sin vuelos, error API.
- Test: `listFlightOptions` exige origen o destino.

## Archivos modificados

- `src/services/aviationstack.js`
- `src/components/FlightSearchForm.vue`
- `tests/aviationstack.test.js`
