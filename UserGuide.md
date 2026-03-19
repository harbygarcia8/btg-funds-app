## Manual de Usuario

### 1) Vista general

La aplicación inicia en el **Dashboard** y muestra:

- Activos bajo gestión (saldo disponible)
- Rendimiento estimado
- Acciones rápidas
- Inversiones activas
- Catálogo de inversiones

Saldo inicial del usuario: **COP $500.000**.

### 2) Cambiar tema visual (claro/oscuro)

- Usa el botón **"Modo oscuro / Modo claro"** en el encabezado.
- El tema se guarda automáticamente para próximas visitas.

### 3) Suscribirse a un fondo

1. En el catálogo, selecciona **"Invertir ahora"** en un fondo.
2. En el modal de suscripción:
   - Ingresa un monto (igual o mayor al mínimo del fondo).
   - Selecciona método de notificación (**Correo electrónico** o **SMS**).
3. Confirma con **"Confirmar Suscripción"**.

Durante la operación:
- Se muestra un **loader** global.
- Al finalizar, aparece un mensaje de **éxito** o **error**.

### 4) Cancelar una suscripción

Puedes cancelar desde:

- Dashboard (bloque de inversiones activas), o
- Página **Historial**.

Al cancelar:
- El saldo se actualiza.
- El movimiento queda registrado en el historial.
- Verás feedback visual reutilizable (éxito/error), sin alertas nativas del navegador.

### 5) Página de historial de movimientos

En la ruta **`/historial`** encontrarás:

- Resumen de métricas (totales, suscripciones, cancelaciones, monto movido).
- Filtros por tipo de movimiento:
  - Todos
  - Suscripciones
  - Cancelaciones
- Tabla responsive:
  - Formato tabla en desktop.
  - Formato tarjetas en móvil.

### 6) Validaciones funcionales

- No permite suscribir montos por debajo del mínimo del fondo.
- Si el saldo es insuficiente, la operación falla con mensaje de error.
- Una suscripción ya cancelada no puede volver a cancelarse.

### 7) Instalación y ejecución

```bash
git clone https://github.com/harbygarcia8/btg-funds-app.git`
cd btg-funds-app/
npm install
npm start
```

Abrir: [http://localhost:4200](http://localhost:4200)
