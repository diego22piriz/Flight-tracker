# Product Context

## Problema que resuelve

Consultar el **estado en tiempo real** de vuelos comerciales sin instalar apps propietarias ni montar un backend: ideal para laboratorio y demostración de consumo de APIs públicas.

## Usuarios

- Estudiantes / evaluadores del lab.
- Usuario final que quiere comprobar salida, llegada, retrasos y aerolínea de un vuelo concreto.

## Experiencia de usuario

| Paso | Acción |
|------|--------|
| 1 | Entrar en la página principal (layout sidebar + resultados) |
| 2 | Elegir aeropuertos origen y/o destino en desplegables del panel izquierdo |
| 3 | Abrir desplegable de N° vuelo y elegir un vuelo |
| 4 | Pulsar Buscar; revisar tarjetas apiladas a la derecha |
| 5 | «Detalles» (azul) abre vista con mapa; «Guardar» (naranja) añade a favoritos |
| 6 | Consultar guardados en `/favoritos` (nav «Guardados») |

## Mensajes y estados UI

- Dropdown de vuelos deshabilitado hasta seleccionar origen y/o destino.
- Dropdowns de aeropuertos se cargan al montar el formulario.
- Paleta oscura del sketch; acciones «Detalles» (azul claro) y «Guardar» (naranja).
- Placeholders: «Cargando vuelos…», «Sin vuelos en esta ruta», errores de API en rojo.
- Badges de estado: programado, en vuelo, aterrizado, cancelado (Bootstrap).

## Fuera de alcance (por diseño)

- Notificaciones push, cuentas de usuario en servidor.
- Historial de búsquedas en servidor (solo LocalStorage local).
