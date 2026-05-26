# Prompt 004 — Mapa interactivo con ruta del vuelo

**Fecha:** 2026-05-26
**Herramienta:** opencode (CLI)

## Prompt del usuario

```
can i make a map showing where the selected airplane is?
```

A partir de ahí, múltiples iteraciones hasta el resultado final: mapa Leaflet con la ruta del vuelo (origen → destino), popup auto-abierto en el aeropuerto de salida, y actualización de posición en vivo cuando la API la proporciona.

## Respuesta / implementación

### Dependencias añadidas

- `leaflet` ^1.9.4 — librería de mapas open-source (OpenStreetMap)

### Nuevo componente: `src/components/FlightMap.vue`

- Mapa Leaflet con tiles de OpenStreetMap.
- Marcadores azules para aeropuerto de salida y llegada.
- Línea de ruta (discontinua si no hay datos en vivo, sólida si los hay).
- Popup informativo en el marcador de salida con nombre del aeropuerto, terminal, puerta y hora programada.
- Popup automático al cargar el mapa (tras completar animación `moveend`).
- Si la API devuelve `flight.live` (lat, lon, altitud), se muestra un marcador adicional con la posición del avión.
- `autoClose: false` en los popups para que puedan coexistir.

### Servicio nuevo: `fetchAirportCoords()` en `aviationstack.js`

- Consulta el endpoint `/airports` de AviationStack con `iata_code`.
- Cachea resultados en memoria para evitar llamadas repetidas.
- Devuelve `{ lat, lon, name }`.

### Servicio nuevo: `fetchFlightByIata()` en `aviationstack.js`

- Consulta `/flights` con `flight_iata` para obtener datos frescos del vuelo.
- Se usa al cargar el detalle para intentar obtener posición en vivo.

### Modificado: `src/views/FlightDetailView.vue`

- Ahora carga coordenadas de aeropuertos (salida y llegada) desde AviationStack.
- Renderiza `<FlightMap>` siempre con la ruta, incluso sin datos en vivo.
- Botón "🔄 Actualizar posición" para refrescar datos desde la API.
- Muestra coordenadas en vivo como texto si están disponibles.

### Soporte de proxy

- El endpoint `/airports` de AviationStack se sirve tras el mismo proxy que `/flights` (Vite en dev, nginx en producción).

## Archivos creados

- `src/components/FlightMap.vue`

## Archivos modificados

- `src/services/aviationstack.js` — `fetchFlightByIata()`, `fetchAirportCoords()`
- `src/views/FlightDetailView.vue` — integración del mapa, carga de coordenadas, botón refresco
- `package.json` — dependencia `leaflet`
- `README.md` — nuevas funcionalidades documentadas
- `00-memory-bank.md`, `memory-bank/*` — contexto actualizado

## Notas

- El plan gratuito de AviationStack **no incluye datos de `live`** para la mayoría de vuelos; el mapa muestra igual la ruta entre aeropuertos.
- Los tiles de OpenStreetMap son gratuitos y no requieren API key.
- Leaflet se integró directamente (sin wrapper Vue) para máximo control.
