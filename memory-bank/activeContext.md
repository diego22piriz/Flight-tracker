# Active Context

**Última sesión:** 2026-05-30

## Foco actual

- **UI según sketch wireframe**: tema oscuro, sidebar de filtros, panel de resultados apilados.
- Formulario con dropdowns (origen, destino, vuelo) alimentados por API.
- Mapa Leaflet en vista de detalle.

## Cambios recientes

- Rediseño visual completo alineado con wireframe del lab:
  - Header «Rastreador de vuelos» + nav Buscar/Guardados.
  - Layout sidebar + panel principal en `HomeView`.
  - Tarjetas de resultado con acciones Detalles (azul) y Guardar (naranja).
  - Variables CSS `--sketch-*` en `main.css`.
- `prompts/006-ui-sketch-wireframe.md` registrado.
- Memory bank actualizado.

## Próximos pasos

1. Completar `git push` a GitHub (permisos de cuenta).
2. Probar con API key real y vuelos activos.
3. Añadir nombres del grupo en `README.md`.

## Decisiones abiertas

- El plan gratuito de AviationStack no incluye `live` data para la mayoría de vuelos; el mapa muestra la ruta entre aeropuertos como alternativa.
