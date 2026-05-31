# 00 — Memory Bank · Flight-tracker / RastreadorDeeVuelosLab2

> Documento maestro de contexto (requisito del lab). Última actualización: 2026-05-30.

## Resumen del proyecto

| Campo | Valor |
|-------|--------|
| Nombre local | RastreadorDeeVuelosLab2 |
| Repositorio GitHub | [diego22piriz/Flight-tracker](https://github.com/diego22piriz/Flight-tracker) |
| Tipo | RIA (Rich Internet Application) |
| API | [AviationStack](https://aviationstack.com/) — vuelos en tiempo real |
| Framework | **Vue 3** + Vite + Vue Router |
| UI | **Bootstrap 5** |
| Mapas | **Leaflet** + OpenStreetMap |
| Persistencia | **LocalStorage** (favoritos), **sessionStorage** (detalle tras búsqueda) |
| Backend | No permitido (solo proxy HTTP en Vite/nginx) |

## Requisitos del laboratorio

- [x] Vue 3 + Bootstrap 5
- [x] ≥ 2 rutas: `/`, `/favoritos`, `/vuelo/:flightKey`
- [x] Sin backend de negocio ni BD persistentes
- [x] `prompts/` con interacciones relevantes
- [x] `00-memory-bank.md`
- [x] Declaración IA en `README.md`
- [ ] Push a GitHub completado (pendiente permisos cuenta `diego22piriz`)

## Arquitectura

```
src/
  components/   AppNavbar, FlightSearchForm, FlightCard, FlightList, AlertMessage, FlightMap
  views/        HomeView, FavoritesView, FlightDetailView
  services/     aviationstack.js (searchFlights, listAirportOptions, listFlightOptions, fetchFlightByIata, fetchAirportCoords), favorites.js
  router/       index.js
tests/          Vitest
docker/         Dockerfile + nginx
prompts/        Registro de prompts IA
memory-bank/    Contexto extendido por archivo
.cursor/rules/  PLAN/ACT + guía memory bank
```

## API AviationStack

| Función | Endpoint / uso |
|---------|------------------|
| `searchFlights()` | `GET /flights` con filtros (vuelo, origen, destino, estado) |
| `listAirportOptions()` | `GET /airports` → opciones para dropdown origen/destino (caché sesión) |
| `listFlightOptions()` | `GET /flights` por ruta → opciones para dropdown de vuelo |
| `fetchFlightByIata()` | `GET /flights` con `flight_iata` → datos frescos + live |
| `fetchAirportCoords()` | `GET /airports` con `iata_code` → coordenadas (con caché) |

- Base plan free: `http://api.aviationstack.com/v1`
- Auth: `access_key` en query (variable `VITE_AVIATIONSTACK_API_KEY`)
- Proxy dev: Vite `/api/aviation`
- Proxy prod: nginx en Docker

**Límites plan free:** ~100 req/mes, solo HTTP, algunos parámetros restringidos.

## UX del formulario de búsqueda

**Layout:** sidebar izquierdo (filtros) + panel derecho (resultados apilados), según wireframe del lab.

1. Al cargar el formulario se llama `listAirportOptions()` y se rellenan los desplegables de **origen** y **destino**.
2. Usuario elige origen y/o destino en los `<select>` del panel gris izquierdo.
3. Al abrir el **dropdown de nº vuelo**, se llama `listFlightOptions()` y se muestran códigos tipo `IB3251 — MAD → BCN · Iberia`.
4. Cambiar ruta o estado **resetea** el dropdown de vuelos y su caché.
5. **Buscar** envía filtros a `searchFlights()`; las tarjetas aparecen apiladas en el panel derecho con acciones **Detalles** (azul) y **Guardar** (naranja).

**Tema visual:** variables `--sketch-*` en `src/assets/main.css` (fondo oscuro, paneles grises, tarjetas navy).

## Variables de entorno

```env
VITE_AVIATIONSTACK_API_KEY=<clave_aviationstack>
```

Plantilla: `.env.example` (nunca commitear `.env`).

## Estado actual

| Área | Estado |
|------|--------|
| App Vue 3 + Bootstrap | ✅ |
| Dropdown aeropuertos + vuelos desde API | ✅ |
| UI sketch wireframe (sidebar + tarjetas) | ✅ |
| Favoritos LocalStorage | ✅ |
| Detalle vuelo | ✅ |
| Mapa interactivo Leaflet (ruta + popup salida) | ✅ |
| Posición en vivo (cuando API la provee) | ✅ |
| Tests (favoritos, helpers, listFlightOptions) | ✅ |
| Docker / compose | ✅ |
| Git init + commit local | ✅ |
| Git push remoto | ⏳ Requiere acceso a `diego22piriz` |

## Git / despliegue

```powershell
cd RastreadorDeeVuelosLab2
git remote -v   # origin → diego22piriz/Flight-tracker
git push -u origin main   # cuando tengas permisos
npm install && npm run dev
```

Error conocido: push denegado si la sesión Git es otra cuenta (p. ej. `antonygs`).

## Decisiones técnicas

1. **Proxy** — Infraestructura, no lógica de negocio; necesario por HTTP/CORS del plan free.
2. **Dropdown** — Evita entrada manual errónea; datos reales de la ruta seleccionada.
3. **Caché de opciones** — Clave `dep|arr|status`; no re-fetch si no cambian los filtros.
4. **Composition API** — `<script setup>` en componentes.
5. **Leaflet directo** — Sin wrapper Vue; control total del mapa, popups y eventos.
6. **Caché de aeropuertos** — `airportCache` en memoria evita llamadas repetidas a `/airports`.

## Enlaces

- API: https://docs.apilayer.com/aviationstack/docs/api-documentation/
- Repo: https://github.com/diego22piriz/Flight-tracker
- Contexto detallado: `memory-bank/`
