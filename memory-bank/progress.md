# Progress

## Completado

- [x] Estructura del proyecto (`src/`, `tests/`, `docker/`, `prompts/`)
- [x] Vue 3 + Bootstrap 5 + Vue Router (3 rutas)
- [x] Integración AviationStack (`searchFlights`, proxy Vite/nginx)
- [x] Dropdown de números de vuelo (`listFlightOptions`)
- [x] Favoritos en LocalStorage
- [x] Detalle de vuelo (sessionStorage + favoritos)
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
- [ ] Más entradas en `prompts/` por cada sesión relevante con IA

## Problemas conocidos

| Problema | Mitigación |
|----------|------------|
| `npx` no en PATH (Windows) | Instalar Node LTS o usar Docker para build |
| Plan free AviationStack solo HTTP | Proxy en Vite/nginx |
| Push Git 403 | Colaborador en repo o login como `diego22piriz` |
| Pocas req/mes en plan free | Evitar recargar dropdown en cada click (caché implementada) |
