# Product Context

## Problema que resuelve

Consultar el **estado en tiempo real** de vuelos comerciales sin instalar apps propietarias ni montar un backend: ideal para laboratorio y demostración de consumo de APIs públicas.

## Usuarios

- Estudiantes / evaluadores del lab.
- Usuario final que quiere comprobar salida, llegada, retrasos y aerolínea de un vuelo concreto.

## Experiencia de usuario

| Paso | Acción |
|------|--------|
| 1 | Entrar en la página principal |
| 2 | Indicar aeropuertos origen y/o destino (ej. MAD, BCN) |
| 3 | Abrir desplegable y elegir un vuelo de la lista |
| 4 | Buscar y revisar tarjetas de resultados |
| 5 | Ver detalle o guardar en favoritos |
| 6 | Consultar favoritos en `/favoritos` |

## Mensajes y estados UI

- Dropdown deshabilitado hasta tener origen o destino (≥3 caracteres IATA).
- Placeholders: «Cargando vuelos…», «Sin vuelos en esta ruta», errores de API en rojo.
- Badges de estado: programado, en vuelo, aterrizado, cancelado (Bootstrap).

## Fuera de alcance (por diseño)

- Mapa en vivo, notificaciones push, cuentas de usuario en servidor.
- Historial de búsquedas en servidor (solo LocalStorage local).
