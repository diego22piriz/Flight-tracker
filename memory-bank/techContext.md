# Tech Context

## Stack

| Capa | Tecnología | Notas |
|------|------------|--------|
| Frontend | Vue 3.5 + Composition API | `<script setup>` |
| Routing | Vue Router 4 | History mode |
| UI | Bootstrap 5.3 | CSS + bundle JS |
| Mapas | Leaflet 1.9 + OpenStreetMap | Sin wrapper Vue, integración directa |
| Build | Vite 6 | Proxy dev para API |
| API | AviationStack REST | Plan free, HTTP |
| Tests | Vitest 2 + jsdom | `npm test` |
| Contenedores | Docker + nginx 1.27 | Puerto 8080 |

## Estructura de servicios

```javascript
// aviationstack.js
searchFlights(filters)          // búsqueda principal
listFlightOptions(filters)      // dropdown de vuelos
fetchFlightByIata(iata)         // datos frescos + live position
fetchAirportCoords(iata)        // coordenadas de aeropuertos (con caché)
flightKey, formatDateTime, statusBadgeClass

// favorites.js
getFavorites, addFavorite, removeFavorite, toggleFavorite, isFavorite
```

## Componentes

| Componente | Responsabilidad |
|------------|-----------------|
| `FlightMap` | Mapa Leaflet con ruta, marcadores y popups |

## Entorno de desarrollo

- **SO:** Windows 10/11 / Linux
- **IDE:** Cursor (reglas en `.cursor/rules/`), opencode (CLI)
- **Node:** Puede no estar en PATH; instalar LTS desde nodejs.org o build con Docker
- **Git:** Remoto `https://github.com/diego22piriz/Flight-tracker.git`

## Comandos

```bash
npm install
npm run dev      # http://localhost:5173
npm test
npm run build
docker compose up --build   # http://localhost:8080
```

## Configuración API

```env
# .env (no versionar)
VITE_AVIATIONSTACK_API_KEY=xxxxxxxx
```

El proxy de Vite inyecta `access_key` si falta en la query (ver `vite.config.js`).
En Docker/npm run build, la key se incrusta en el bundle via `import.meta.env`.

## Restricciones técnicas del lab

- No Express/Spring/backend propio con lógica de negocio.
- No MySQL/MongoDB/etc.; solo LocalStorage (+ sessionStorage para UX de detalle).
- Proxy nginx/Vite permitido como pasarela HTTP.
