# Project Brief

## Objetivo

Desarrollar una **RIA** de rastreo de vuelos que consuma la API pública **AviationStack**, con ciclo completo: diseño, implementación, tests, documentación y despliegue (Docker).

## Alcance funcional

- Buscar vuelos por **origen/destino** (IATA en desplegables) y **estado**.
- Seleccionar **origen, destino y número de vuelo** desde desplegables alimentados por la API (sin entrada manual).
- Ver **listado** y **detalle** de vuelo.
- **Favoritos** persistidos en LocalStorage.

## Restricciones del lab

- Framework: Vue 3 (elegido).
- UI: Bootstrap 5.
- Mínimo 2 rutas.
- Sin backend de negocio ni BD (excepto LocalStorage).
- Registro de prompts IA, memory bank, declaración en README.

## Entregables

| Entregable | Ubicación |
|------------|-----------|
| Código fuente | `src/` |
| Tests | `tests/` |
| Docker | `docker/`, `docker-compose.yml` |
| Prompts IA | `prompts/` |
| Memory bank | `00-memory-bank.md`, `memory-bank/` |
| Repo remoto | https://github.com/diego22piriz/Flight-tracker |

## Criterios de éxito

- La app consulta AviationStack y muestra resultados coherentes.
- El formulario guía al usuario con dropdown de vuelos por ruta.
- Documentación y trazabilidad de uso de IA completas.
