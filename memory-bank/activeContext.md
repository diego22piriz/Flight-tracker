# Active Context

**Última sesión:** 2026-05-26

## Foco actual

- Mapa Leaflet interactivo con ruta del vuelo (origen → destino).
- Popup informativo en aeropuerto de salida con terminal, puerta y hora.
- Posición en vivo del avión cuando la API la proporciona.
- Actualización de documentación (prompts, memory-bank, README).

## Cambios recientes

- Nuevo componente `FlightMap.vue` con Leaflet + OpenStreetMap.
- Nuevas funciones en `aviationstack.js`: `fetchFlightByIata()`, `fetchAirportCoords()`.
- `FlightDetailView.vue`: integración del mapa, carga de coordenadas de aeropuertos, botón de refresco de posición.
- Dependencia `leaflet` añadida a `package.json`.
- README actualizado con nuevas funcionalidades.
- `prompts/004-mapa-interactivo-leaflet.md` registrado.
- Memory bank actualizado.

## Próximos pasos

1. Completar `git push` a GitHub (permisos de cuenta).
2. Probar con API key real y vuelos activos.
3. Añadir nombres del grupo en `README.md`.

## Decisiones abiertas

- El plan gratuito de AviationStack no incluye `live` data para la mayoría de vuelos; el mapa muestra la ruta entre aeropuertos como alternativa.
