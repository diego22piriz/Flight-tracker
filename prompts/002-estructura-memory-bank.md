# Prompt 002 — Memory Bank y cursor-bank

**Fecha:** 2025-05-19  
**Herramienta:** Cursor (agente Auto)

## Prompt del usuario

Pregunta sobre cómo usar memory bank; intento de `npx cursor-bank init` falló porque `npx` no estaba en PATH (Node.js no instalado globalmente).

## Respuesta / acciones

- Instalación manual de `.cursor/rules/` y carpeta `memory-bank/`
- Creación posterior de `00-memory-bank.md` según enunciado oficial del lab
- Recomendación: instalar Node.js LTS para `npm`/`npx`, o usar Docker para build

## Actualización 2026-05-19

- `memory-bank/` sincronizado con estado real del proyecto (ver prompt `005`)
- `00-memory-bank.md` es el documento maestro; `memory-bank/*.md` el detalle por tema
