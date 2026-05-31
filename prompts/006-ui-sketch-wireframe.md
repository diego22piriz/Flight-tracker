# Prompt 006 — UI según sketch wireframe

**Fecha:** 2026-05-30  
**Herramienta:** Cursor (agente Auto)

## Prompt del usuario

```
haz que la apariencia de la pagina siga la idea de este sketch.
Recuerda actualizar el memory bank y la carpeta de prompts
```

*(Se adjuntó wireframe: header oscuro, sidebar con filtros, panel de resultados con tarjetas apiladas, acciones Detalles/Guardar.)*

## Respuesta / implementación

- **Tema oscuro** en `src/assets/main.css` con variables CSS (`--sketch-bg`, `--sketch-panel`, `--sketch-link`, `--sketch-accent`, etc.).
- **Header** (`AppNavbar.vue`): título «Rastreador de vuelos» a la izquierda; enlaces «Buscar» y «Guardados» a la derecha.
- **Layout búsqueda** (`HomeView.vue`): sidebar izquierdo (~280px) con formulario; panel principal derecho con resultados.
- **Formulario** (`FlightSearchForm.vue`): fila Origen|Destino, luego N° vuelo y Estado a ancho completo; estilos `sketch-form`.
- **Resultados** (`FlightList.vue` + `FlightCard.vue`): tarjetas apiladas verticalmente sobre fondo gris; acciones «Detalles» (azul claro) y «Guardar» (naranja).
- **Vistas secundarias** (`FavoritesView.vue`, `FlightDetailView.vue`) adaptadas al mismo tema.
- **Alertas** (`AlertMessage.vue`): variantes oscuras coherentes.

## Archivos modificados

- `src/assets/main.css`
- `src/App.vue`
- `src/components/AppNavbar.vue`
- `src/components/FlightSearchForm.vue`
- `src/components/FlightList.vue`
- `src/components/FlightCard.vue`
- `src/components/AlertMessage.vue`
- `src/views/HomeView.vue`
- `src/views/FavoritesView.vue`
- `src/views/FlightDetailView.vue`
- `memory-bank/*`
