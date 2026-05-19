# System Patterns

## Arquitectura

```
views/       → pantallas y rutas de página
components/  → UI reutilizable
services/    → llamadas API y lógica de datos
router/      → definición de rutas
```

## Convenciones

- Los servicios no importan componentes Vue/React.
- Las vistas componen componentes y llaman a servicios.
- Estado global (si hace falta): documentar aquí la decisión (Pinia, Context, etc.).

## Patrones a seguir

- Un servicio por dominio (p. ej. `flightService`).
- Manejo de errores de API centralizado en servicios.
