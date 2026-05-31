# Progress

## Completado

- [x] Estructura del proyecto (`src/`, `tests/`, `docker/`, `prompts/`)
- [x] Vue 3 + Bootstrap 5 + Vue Router (3 rutas)
- [x] Integración AviationStack (`searchFlights`, proxy Vite/nginx)
- [x] Dropdown de números de vuelo (`listFlightOptions`)
- [x] Dropdown de aeropuertos origen/destino (`listAirportOptions`)
- [x] UI según sketch wireframe (tema oscuro, sidebar, tarjetas apiladas)
- [x] Favoritos en LocalStorage
- [x] Detalle de vuelo (sessionStorage + favoritos)
- [x] Mapa Leaflet con ruta orígen → destino
- [x] Popup informativo en aeropuerto de salida
- [x] Posición en vivo del avión (cuando API la provee)
- [x] Actualización de posición desde API (botón refresco)
- [x] Carga de coordenadas de aeropuertos (`fetchAirportCoords`)
- [x] Tests Vitest (favoritos, helpers, validación dropdown)
- [x] Docker + docker-compose
- [x] `00-memory-bank.md`, `memory-bank/`, `.cursor/rules/`
- [x] README con declaración de herramientas IA
- [x] Git: init, commit inicial, merge README remoto

## En progreso

- [ ] Push final a GitHub (permisos de cuenta)

## Pendiente

- [ ] Pruebas manuales documentadas con capturas (si el lab lo pide)
- [ ] Nombres de integrantes en README

## Problemas conocidos

| Problema | Mitigación |
|----------|------------|
| `npx` no en PATH (Windows) | Instalar Node LTS o usar Docker para build |
| Plan free AviationStack solo HTTP | Proxy en Vite/nginx |
| Plan free no incluye `live` data | Mapa muestra ruta entre aeropuertos como fallback |
| Push Git 403 | Colaborador en repo o login como `diego22piriz` |
| Pocas req/mes en plan free | Caché de opciones y aeropuertos implementada |
