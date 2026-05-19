# Flight-tracker

**Real-time Flight Status & Global Aviation**

Aplicación **RIA** de laboratorio para consultar y rastrear vuelos en tiempo real usando la API pública [**AviationStack**](https://aviationstack.com/).

## Requisitos del lab

| Requisito | Implementación |
|-----------|----------------|
| Framework Vue 3 / React / Angular | **Vue 3** + Vite |
| Bootstrap o Material Design | **Bootstrap 5** |
| ≥ 2 rutas | `/`, `/favoritos`, `/vuelo/:flightKey` |
| Sin backend de negocio ni BD | Solo frontend; proxy HTTP en Vite/nginx |
| LocalStorage permitido | Favoritos de vuelos |
| `prompts/` | Registro de prompts en esta carpeta |
| `00-memory-bank.md` | Contexto del proyecto |
| Herramientas IA en README | Ver sección abajo |

## Herramientas de IA utilizadas

| Herramienta | Uso en el proyecto |
|-------------|-------------------|
| **Cursor** (IDE + agente) | Generación de código, estructura, documentación y memory bank |
| **Cursor Rules** (`.cursor/rules/`) | Modos PLAN/ACT y guía del memory bank |
| Registro manual | Carpeta `prompts/` con prompts relevantes |

> Declaración explícita exigida por el enunciado: se usó **Cursor** como asistente de desarrollo. Cada interacción relevante debe quedar registrada en `prompts/`.

## Estructura del repositorio

```
├── src/
│   ├── components/
│   ├── views/
│   ├── services/
│   └── router/
├── tests/
├── docker/
├── prompts/
├── memory-bank/          # contexto extendido (cursor-bank)
├── 00-memory-bank.md       # contexto maestro (requisito lab)
├── docker-compose.yml
└── README.md
```

## Configuración

### 1. API Key de AviationStack

1. Regístrate en https://aviationstack.com/signup  
2. Copia tu **Access Key** del dashboard  
3. Crea `.env` desde la plantilla:

```bash
cp .env.example .env
```

Edita `.env`:

```env
VITE_AVIATIONSTACK_API_KEY=tu_clave_real
```

> El plan gratuito usa **HTTP** (no HTTPS). El proxy de Vite/Docker evita problemas de CORS y de redirección HTTPS del navegador.

### 2. Desarrollo local (requiere Node.js LTS)

```bash
npm install
npm run dev
```

Abre http://localhost:5173

### 3. Tests

```bash
npm test
```

### 4. Despliegue con Docker

```bash
# PowerShell
$env:VITE_AVIATIONSTACK_API_KEY="tu_clave"
docker compose up --build
```

App en http://localhost:8080

## Funcionalidades

- **Buscar vuelos** por número IATA, origen/destino (códigos IATA) o estado.
- **Ver detalle** de salida, llegada, retrasos y posición en vivo (si la API la devuelve).
- **Favoritos** guardados en `localStorage` del navegador.
- **Navegación** entre páginas con Vue Router y barra Bootstrap.

## Ejemplos de búsqueda

| Campo | Ejemplo |
|-------|---------|
| Nº vuelo IATA | `IB3251` |
| Origen | `MAD` |
| Destino | `BCN` |
| Estado | `active`, `landed`, `scheduled` |

## Documentación adicional

- Contexto del proyecto: [`00-memory-bank.md`](./00-memory-bank.md)
- Prompts registrados: [`prompts/`](./prompts/)
- API AviationStack: https://docs.apilayer.com/aviationstack/docs/api-documentation/

## Autores

Grupo Lab 2 — *(añadir nombres del equipo)*
