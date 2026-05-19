# Prompt 001 — Enunciado del lab y stack

**Fecha:** 2025-05-19  
**Herramienta:** Cursor (agente Auto)

## Prompt del usuario

```
Desarrollar una aplicación RIA funcional que consuma APIs públicas...
Frameworks permitidos: Vue 3, React o Angular.
UI: Bootstrap o Material Design.
Navegación: Mínimo 2 rutas/páginas diferentes.
Backend: No se permite lógica de negocio propia ni bases de datos persistentes (excepto LocalStorage).
Registro de Prompts en prompts/
Memory Bank: 00-memory-bank.md
Declaración de herramientas IA en README.md
Objetivo: página de tracking de vuelos con AviationStack
```

## Respuesta / decisiones tomadas

- Stack: **Vue 3 + Vite + Vue Router + Bootstrap 5**
- API: **AviationStack** vía proxy (`/api/aviation`) por limitación HTTP del plan gratuito
- Rutas: `/`, `/favoritos`, `/vuelo/:flightKey`
- Persistencia: `localStorage` (favoritos) + `sessionStorage` (detalle tras búsqueda)
- Sin servidor de aplicación con lógica de negocio
