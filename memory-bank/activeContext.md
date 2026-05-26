# Active Context

**Última sesión:** 2026-05-19

## Foco actual

- Documentación al día (memory bank + prompts).
- Funcionalidad principal estable: búsqueda con dropdown de vuelos.

## Cambios recientes

- `FlightSearchForm`: input manual → `<select>` con `listFlightOptions()`.
- `aviationstack.js`: nueva función `listFlightOptions()` para poblar dropdown.
- Test añadido: validación origen/destino obligatorios para listar vuelos.
- Intento de subida a GitHub `diego22piriz/Flight-tracker` (commit local OK, push pendiente permisos).

## Próximos pasos

1. Completar `git push` con cuenta/colaborador de `diego22piriz`.
2. Probar flujo completo con API key real (MAD ↔ BCN u otra ruta).
3. Añadir nombres del grupo en `README.md`.
4. Registrar en `prompts/` nuevos prompts que uses en Cursor.

## Decisiones abiertas

- Ninguna bloqueante en código; entrega depende de API key y acceso GitHub.
