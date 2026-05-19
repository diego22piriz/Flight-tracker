# 00 — Memory Bank · RastreadorDeeVuelosLab2

> Documento maestro de contexto (requisito del lab). Actualizar al cerrar cada sesión de desarrollo.

## Resumen del proyecto

| Campo | Valor |
|-------|--------|
| Nombre | RastreadorDeeVuelosLab2 |
| Tipo | RIA (Rich Internet Application) |
| API | [AviationStack](https://aviationstack.com/) — vuelos en tiempo real |
| Framework | **Vue 3** + Vite + Vue Router |
| UI | **Bootstrap 5** |
| Persistencia | Solo **LocalStorage** (favoritos). Sin backend de negocio ni BD |

## Requisitos del laboratorio (cumplidos)

- [x] Framework permitido: Vue 3
- [x] UI: Bootstrap 5
- [x] Navegación: `/` (buscar), `/favoritos`, `/vuelo/:flightKey` (≥2 rutas)
- [x] Sin lógica de negocio en servidor ni bases de datos persistentes
- [x] Carpeta `prompts/` con interacciones relevantes
- [x] Este archivo `00-memory-bank.md`
- [x] Declaración de herramientas IA en `README.md`

## Arquitectura

```
src/
  components/   AppNavbar, FlightSearchForm, FlightCard, FlightList, AlertMessage
  views/        HomeView, FavoritesView, FlightDetailView
  services/     aviationstack.js (API), favorites.js (LocalStorage)
  router/       index.js
tests/          Vitest — favoritos y helpers API
docker/         Dockerfile + nginx (proxy HTTP → AviationStack)
```

## API AviationStack

- Base (plan gratuito): `http://api.aviationstack.com/v1`
- Autenticación: query `access_key`
- Proxy en dev: Vite `/api/aviation` → evita CORS y fuerza HTTP
- Proxy en prod: nginx en contenedor Docker

**Limitaciones plan free:** ~100 req/mes, solo HTTP, algunos filtros restringidos.

## Variables de entorno

```env
VITE_AVIATIONSTACK_API_KEY=<tu_clave>
```

Copiar desde `.env.example`.

## Estado actual

| Área | Estado |
|------|--------|
| Scaffold Vue + Bootstrap | ✅ |
| Búsqueda de vuelos | ✅ |
| Favoritos LocalStorage | ✅ |
| Detalle de vuelo | ✅ (sessionStorage + favoritos) |
| Tests unitarios | ✅ |
| Docker / compose | ✅ |
| Documentación README | ✅ |

## Próximos pasos (opcional)

- Ampliar pruebas E2E
- Mejorar accesibilidad (ARIA)
- Añadir más filtros si el plan API lo permite

## Decisiones técnicas

1. **Proxy nginx/Vite** — No es backend de negocio; solo reenvía peticiones HTTP (requisito plan free).
2. **sessionStorage** en detalle — Permite ver detalle tras búsqueda sin re-consultar API.
3. **Vue 3 Composition API** — `<script setup>` en todos los componentes.

## Enlaces

- Docs API: https://docs.apilayer.com/aviationstack/docs/api-documentation/
- Memory bank extendido: carpeta `memory-bank/`
